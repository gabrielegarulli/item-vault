/**
 * Converts Google Drive shareable link to preview URL for embedding
 * Handles formats:
 * - https://drive.google.com/file/d/FILE_ID/view
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - Just FILE_ID
 * 
 * Returns preview URL: https://drive.google.com/uc?export=view&id=FILE_ID
 */
export function convertGoogleDriveUrl(url: string): string {
  if (!url) return '';

  // If it's already a preview URL, return it as-is
  if (url.includes('drive.google.com/uc?export=view')) {
    return url;
  }

  // Extract FILE_ID from shareable link
  const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
  const fileId = fileIdMatch ? fileIdMatch[1] : url.trim();

  // If fileId looks like a Drive ID (alphanumeric, hyphens, underscores), convert it
  if (/^[a-zA-Z0-9-_]+$/.test(fileId)) {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }

  // Return original URL if it doesn't match expected patterns
  return url;
}

/**
 * Validates if a URL is a valid image URL (Google Drive preview or standard URL)
 */
export function isValidImageUrl(url: string): boolean {
  if (!url) return false;

  try {
    // Check if it's a Google Drive URL
    if (url.includes('drive.google.com')) {
      return true;
    }

    // Check if it's a valid URL
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
