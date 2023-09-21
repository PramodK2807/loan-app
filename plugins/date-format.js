// plugins/date-format.js

export default (context, inject) => {
  const formatDate = (date) => {
    // Parse the ISO 8601 date string into a JavaScript Date object
    const jsDate = new Date(date);

    // Extract date, month, and year components
    const day = jsDate.getDate();
    const month = jsDate.getMonth() + 1; // Months are zero-based
    const year = jsDate.getFullYear();

    // Format as "dd/mm/yyyy"
    return `${day}/${month}/${year}`;
  };

  // Inject the formatDate function into the context, making it available globally
  inject("formatDate", formatDate);
};
