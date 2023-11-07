import throttle from "lodash.throttle";

const feedbackForm = document.querySelector(".feedback-form");

const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageTextarea = feedbackForm.querySelector('textarea[name="message"]');

feedbackForm.addEventListener("input", throttle(saveFormData, 500));

const savedFormData = JSON.parse(localStorage.getItem("feedback-form-state"));
if (savedFormData) {
  emailInput.value = savedFormData.email;
  messageTextarea.value = savedFormData.message;
}

feedbackForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  console.log("Form data submitted:", formData);

  localStorage.removeItem("feedback-form-state");
});

function saveFormData() {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem("feedback-form-state", JSON.stringify(formData));
}
