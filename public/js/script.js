console.log("validation script loaded");

document.addEventListener("DOMContentLoaded", () => {

  const forms = document.querySelectorAll('.needs-validation');
  console.log("Forms found:", forms.length);

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      console.log("SUBMIT EVENT TRIGGERED");

      if (!form.checkValidity()) {
        console.log("INVALID FORM");
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add('was-validated');
      console.log("Form classes:", form.classList);
    });
  });

});