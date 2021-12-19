import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

let saveDataForm;

onLoad();

function onLoad() {
  saveDataForm = localStorage.getItem('feedback-form-state');
  const dataLS = JSON.parse(saveDataForm);
  if (!saveDataForm) {
    return;
  }
  refs.input.value = dataLS.email;
  refs.textarea.value = dataLS.message;
}

function onInput(evt) {
  const {
    elements: { email, message },
  } = evt.currentTarget;
  const obj = {
    email: email.value.trim(),
    message: message.value.trim(),
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(obj));
}

function onButtonClickClearForm(evt) {
  evt.preventDefault();
  console.log(JSON.parse(saveDataForm));
  localStorage.removeItem('feedback-form-state');
  refs.form.reset();
}

refs.form.addEventListener('input', throttle(onInput, 500));
refs.form.addEventListener('submit', onButtonClickClearForm);
