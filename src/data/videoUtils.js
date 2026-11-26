/**
 * Video Utilities for GV DesignTech
 * Handles automatic YouTube embed conversion and direct video format detection.
 */

export function isVideoFile(url) {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  const lower = trimmed.toLowerCase();
  return (
    lower.endsWith('.mp4') ||
    lower.endsWith('.webm') ||
    lower.endsWith('.mov') ||
    lower.endsWith('.ogg') ||
    lower.endsWith('.m4v') ||
    lower.endsWith('.mkv') ||
    lower.includes('/video/upload/') ||
    lower.startsWith('blob:') ||
    lower.startsWith('data:video/')
  );
}

export function formatVideoEmbedUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();

  // If already an embed URL or direct video file, return as is
  if (
    trimmed.includes('youtube.com/embed') ||
    trimmed.includes('youtube-nocookie.com/embed') ||
    isVideoFile(trimmed)
  ) {
    return trimmed;
  }

  // Handle youtu.be shortlinks: https://youtu.be/b68HETiNO98?si=...
  const youtuBeMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]+)/i);
  if (youtuBeMatch && youtuBeMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${youtuBeMatch[1]}`;
  }

  // Handle standard youtube.com/watch?v=VIDEO_ID
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]+)/i);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${watchMatch[1]}`;
  }

  // Handle youtube.com/shorts/VIDEO_ID
  const shortsMatch = trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/i);
  if (shortsMatch && shortsMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${shortsMatch[1]}`;
  }

  // Handle youtube.com/live/VIDEO_ID
  const liveMatch = trimmed.match(/youtube\.com\/live\/([a-zA-Z0-9_-]+)/i);
  if (liveMatch && liveMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${liveMatch[1]}`;
  }

  return trimmed;
}
