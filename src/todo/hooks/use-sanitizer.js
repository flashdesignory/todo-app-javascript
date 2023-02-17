/**
 * Collection of helper methods to clean strings.
 *
 * @returns Methods to interact with useSanitizer.
 */
export const useSanitizer = () => {
  /**
   * Method to escape special characters in a string.
   *
   * @param {string} string
   * @returns A sanitized string.
   */
  const sanitize = (string) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "/": "&#x2F;",
    };
    const reg = /[&<>"'/]/gi;
    return string.replace(reg, (match) => map[match]);
  };

  return { sanitize };
};
