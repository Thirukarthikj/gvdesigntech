// Cloudinary Image Storage Service for GV DesignTech

const CLOUDINARY_STORAGE_KEY = 'gv_cloudinary_config';

// Default credentials provided for GV DesignTech
export const DEFAULT_CLOUDINARY_CONFIG = {
  cloudName: 'tci2igsn',
  apiKey: '474526512345773',
  apiSecret: 'IlRGfEZ7GLmR0kF2mnGbFN-W3Z0',
  uploadPreset: 'gvdesigntech',
  folder: 'gvdesigntech'
};

/**
 * Retrieves Cloudinary configuration from localStorage, falling back to Vite environment variables or defaults.
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
    cloudName: saved.cloudName || import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || DEFAULT_CLOUDINARY_CONFIG.cloudName,
    apiKey: saved.apiKey || import.meta.env.VITE_CLOUDINARY_API_KEY || DEFAULT_CLOUDINARY_CONFIG.apiKey,
    apiSecret: saved.apiSecret || DEFAULT_CLOUDINARY_CONFIG.apiSecret,
    uploadPreset: saved.uploadPreset || import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || DEFAULT_CLOUDINARY_CONFIG.uploadPreset,
    folder: saved.folder || import.meta.env.VITE_CLOUDINARY_FOLDER || DEFAULT_CLOUDINARY_CONFIG.folder
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
 * Computes SHA-1 hash for signed upload using native browser SubtleCrypto
 */
async function computeSha1(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Uploads a file (File object, Blob, or base64 data URL) to Cloudinary.
 * If Cloudinary is not configured or an upload error occurs, automatically falls back
 * to local base64 DataURL so user workflow is uninterrupted.
 *
 * @param {File|Blob|string} file - Image file or data URL
 * @param {Object} options - Optional parameters (e.g. folder, tags)
 * @returns {Promise<{ url: string, isCloudinary: boolean, publicId?: string, error?: string, needsConfig?: boolean }>}
 */
export async function uploadImageToCloudinary(file, options = {}) {
  const config = getCloudinaryConfig();

  if (config.cloudName) {
    const targetFolder = options.folder || config.folder || 'gvdesigntech';

    // Strategy A: Unsigned Upload Preset (Direct from browser without exposing secrets)
    if (config.uploadPreset) {
      try {
        const endpoint = `https://api.cloudinary.com/v1_1/${config.cloudName.trim()}/image/upload`;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', config.uploadPreset.trim());
        if (targetFolder) formData.append('folder', targetFolder);

        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          const data = await response.json();
          return {
            url: data.secure_url || data.url,
            isCloudinary: true,
            publicId: data.public_id,
            format: data.format,
            bytes: data.bytes
          };
        }
      } catch (err) {
        console.warn('Unsigned preset upload attempt:', err.message);
      }
    }

    // Strategy B: Signed Upload (Using API Key and SHA-1 Signature)
    if (config.apiKey && config.apiSecret) {
      try {
        const timestamp = Math.round(Date.now() / 1000);
        const params = {
          folder: targetFolder,
          timestamp: timestamp.toString()
        };
        const sortedKeys = Object.keys(params).sort();
        const stringToSign = sortedKeys.map(k => `${k}=${params[k]}`).join('&') + config.apiSecret.trim();
        const signature = await computeSha1(stringToSign);

        const endpoint = `https://api.cloudinary.com/v1_1/${config.cloudName.trim()}/image/upload`;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', config.apiKey.trim());
        formData.append('timestamp', timestamp.toString());
        formData.append('folder', targetFolder);
        formData.append('signature', signature);

        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          const data = await response.json();
          return {
            url: data.secure_url || data.url,
            isCloudinary: true,
            publicId: data.public_id,
            format: data.format,
            bytes: data.bytes
          };
        }
      } catch (err) {
        console.warn('Signed upload attempt:', err.message);
      }
    }
  }

  // Fallback to local DataURL so user is never blocked
  const localUrl = await fileToDataUrl(file);
  return {
    url: localUrl,
    isCloudinary: false,
    needsConfig: !config.cloudName
  };
}

/**
 * Tests Cloudinary connection by uploading a real test image and reporting exact status.
 */
export async function testCloudinaryConnection(cloudName, uploadPreset, apiKey, apiSecret) {
  if (!cloudName) {
    return { success: false, message: 'Please provide Cloud Name.' };
  }

  // 1. First test: Unsigned Upload Preset
  if (uploadPreset) {
    try {
      const endpoint = `https://api.cloudinary.com/v1_1/${cloudName.trim()}/image/upload`;
      const formData = new FormData();
      const testPixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAA=';
      formData.append('file', testPixel);
      formData.append('upload_preset', uploadPreset.trim());
      formData.append('folder', 'gvdesigntech');

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          url: data.secure_url,
          message: `Cloudinary Unsigned Upload Preset "${uploadPreset}" is active and working perfectly!`
        };
      } else {
        const errJson = await response.json().catch(() => ({}));
        if (errJson.error?.message?.includes('Upload preset not found')) {
          return {
            success: false,
            message: `Cloud Name "${cloudName}" is reachable, but upload preset "${uploadPreset}" was not found. In Cloudinary Console go to Settings > Upload > Add upload preset > set Signing Mode to Unsigned, name it "${uploadPreset}", and save.`
          };
        }
        if (errJson.error?.message?.includes('Upload preset must be whitelisted')) {
          return {
            success: false,
            message: `Upload preset "${uploadPreset}" is currently set to Signed. In Cloudinary Console go to Settings > Upload > edit "${uploadPreset}" and change Signing Mode to "Unsigned".`
          };
        }
      }
    } catch (err) {
      console.warn('Test unsigned preset error:', err);
    }
  }

  // 2. Second test: Signed API Check
  if (apiKey && apiSecret) {
    try {
      const timestamp = Math.round(Date.now() / 1000);
      const params = { folder: 'gvdesigntech', timestamp: timestamp.toString() };
      const sortedKeys = Object.keys(params).sort();
      const stringToSign = sortedKeys.map(k => `${k}=${params[k]}`).join('&') + apiSecret.trim();
      const signature = await computeSha1(stringToSign);

      const endpoint = `https://api.cloudinary.com/v1_1/${cloudName.trim()}/image/upload`;
      const formData = new FormData();
      const testPixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAA=';
      formData.append('file', testPixel);
      formData.append('api_key', apiKey.trim());
      formData.append('timestamp', timestamp.toString());
      formData.append('folder', 'gvdesigntech');
      formData.append('signature', signature);

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          url: data.secure_url,
          message: `Cloudinary Signed API connection successful! Images will upload directly to Cloudinary.`
        };
      } else {
        const errJson = await response.json().catch(() => ({}));
        if (errJson.error?.message?.includes('missing permissions')) {
          return {
            success: false,
            message: `API Key is valid, but missing 'create' write permission. Quick Fix: In Cloudinary Console (Settings > Upload), add an Unsigned upload preset named "${uploadPreset || 'gvdesigntech'}" which enables instant direct browser uploads.`
          };
        }
        return {
          success: false,
          message: errJson.error?.message || `Cloudinary returned HTTP status ${response.status}`
        };
      }
    } catch (err) {
      return {
        success: false,
        message: err.message || 'Error communicating with Cloudinary.'
      };
    }
  }

  return {
    success: false,
    message: 'Please provide Cloud Name and Upload Preset to connect.'
  };
}

/**
 * Helper to convert File/Blob/String to optimized base64 DataURL
 * Automatically scales down high-resolution images to max 1280px to prevent localStorage quota issues
 */
function fileToDataUrl(file, maxWidth = 1280, maxHeight = 1280, quality = 0.82) {
  return new Promise((resolve) => {
    if (typeof file === 'string') {
      return resolve(file);
    }
    if (!(file instanceof Blob)) {
      return resolve('');
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          if (width / maxWidth > height / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        try {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        } catch {
          resolve(e.target.result);
        }
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}
