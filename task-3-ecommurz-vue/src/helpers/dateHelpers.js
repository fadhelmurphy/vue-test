/**
 * Formats a date string into 'dd/MM/yyyy' format.
 * @param {string|Date} dateString - The date string or Date object to format.
 * @returns {string} The formatted date string.
 */
export function formatDate(dateString) {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  