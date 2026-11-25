// Cloudinary Image Storage Service for GV DesignTech

const CLOUDINARY_STORAGE_KEY = 'gv_cloudinary_config';

/**
 * Retrieves Cloudinary configuration from localStorage, falling back to Vite environment variables.
 */
export function getCloudinaryConfig() {
  let saved = {};
  try {
    const raw = localStorage.getItem(CLOUDINARY_STORAGE_KEY);
    if (raw) saved = JSON.parse(raw);
  } catch (err) {
    console.warn('Could not read saved Cloudinary config', err);
  }

  return {
    cloudName: saved.cloudName || import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
    uploadPreset: saved.uploadPreset || import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '',
    folder: saved.folder || 'gv_designtech'
  };
}

/**
 * Saves Cloudinary configuration into localStorage for dynamic runtime updates.
 */
export function saveCloudinaryConfig(config) {
  try {
    localStorage.setItem(CLOUDINARY_STORAGE_KEY, JSON.stringify(config));
    window.dispatchEvent(new CustomEvent('gv_cloudinary_updated', { detail: config }));
    return true;
  } catch (err) {
    console.error('Failed to save Cloudinary config', err);
    return false;
  }
}

/**
 * Uploads a file (File object, Blob, or base64 data URL) to Cloudinary.
 * If Cloudinary is not configured or an upload error occurs, automatically falls back
 * to local base64 DataURL so users are never blocked.
 *
 * @param {File|Blob|string} file - Image file or data URL
 * @param {Object} options - Optional parameters (e.g. folder, tags)
 * @returns {Promise<{ url: string, isCloudinary: boolean, publicId?: string, error?: string, needsConfig?: boolean }>}
 */
export async function uploadImageToCloudinary(file, options = {}) {
  const config = getCloudinaryConfig();

  // If cloudName and uploadPreset are available, upload directly to Cloudinary
  if (config.cloudName && config.uploadPreset) {
    try {
      const endpoint = `https://api.cloudinary.com/v1_1/${config.cloudName.trim()}/image/upload`;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', config.uploadPreset.trim());
      
      const targetFolder = options.folder || config.folder || 'gv_designtech';
      if (targetFolder) {
        formData.append('folder', targetFolder);
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error?.message || `Cloudinary upload failed with status ${response.status}`);
      }

      const data = await response.json();
      return {
        url: data.secure_url || data.url,
        isCloudinary: true,
        publicId: data.public_id,
        format: data.format,
        bytes: data.bytes
      };
    } catch (err) {
      console.warn('Cloudinary upload error:', err.message);
      // Fallback to local DataURL so user workflow is uninterrupted
      const localUrl = await fileToDataUrl(file);
      return {
        url: localUrl,
        isCloudinary: false,
        error: err.message
      };
    }
  }

  // If Cloudinary credentials are not set, fallback to local DataURL
  const localUrl = await fileToDataUrl(file);
  return {
    url: localUrl,
    isCloudinary: false,
    needsConfig: true
  };
}

/**
 * Tests Cloudinary connection by uploading a tiny 1x1 transparent PNG.
 */
export async function testCloudinaryConnection(cloudName, uploadPreset) {
  if (!cloudName || !uploadPreset) {
    return { success: false, message: 'Please provide both Cloud Name and Upload Preset.' };
  }

  try {
    const endpoint = `https://api.cloudinary.com/v1_1/${cloudName.trim()}/image/upload`;
    const formData = new FormData();
    // 1x1 transparent pixel data URL
    const testPixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAA=';
    formData.append('file', testPixel);
    formData.append('upload_preset', uploadPreset.trim());
    formData.append('folder', 'gv_designtech/test');

    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errJson.error?.message || `Cloudinary returned status ${response.status}`
      };
    }

    const data = await response.json();
    return {
      success: true,
      url: data.secure_url,
      message: 'Cloudinary connection successful! Images will upload directly to Cloudinary.'
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || 'Network error connecting to Cloudinary.'
    };
  }
}

/**
 * Helper to convert File/Blob/String to base64 DataURL
 */
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (typeof file === 'string') {
      return resolve(file);
    }
    if (!(file instanceof Blob)) {
      return resolve('');
    }
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}
