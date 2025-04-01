document.addEventListener('DOMContentLoaded', () => {
    const formElem = document.getElementById('formElem');
  
    formElem.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent actual form submission
  
      // Create FormData object from the form
      const formData = new FormData(formElem);
  
      // Add a new field with the current date/time
      formData.append('submitted', new Date().toISOString());
  
      // Loop through all the key/value pairs and log them
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
    });
  });
  