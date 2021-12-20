import throttle from 'lodash.throttle';
// import debounce from 'lodash.debounce';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

onLoad();

function onLoad() {
  let saveDataForm = localStorage.getItem('feedback-form-state');
  const formDataLocalStorage = JSON.parse(saveDataForm);

  if (saveDataForm === null) {
    return;
  }

  refs.input.value = formDataLocalStorage.email;
  refs.textarea.value = formDataLocalStorage.message;
}

function onInputEnterValue(e) {
  const {
    elements: { email, message },
  } = e.currentTarget;

  const formData = {
    email: email.value.trim(),
    message: message.value.trim(),
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onButtonClickClearForm(e) {
  e.preventDefault();
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  localStorage.removeItem('feedback-form-state');
  refs.form.reset();
}

refs.form.addEventListener('input', throttle(onInputEnterValue, 500));
refs.form.addEventListener('submit', onButtonClickClearForm);
