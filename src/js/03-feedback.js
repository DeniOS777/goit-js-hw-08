import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

onLoad();

function onLoad() {
  let saveDataForm = localStorage.getItem('feedback-form-state');

  try {
    const dataLocalStorage = JSON.parse(saveDataForm);

    if (!saveDataForm) {
      return;
    }

    writeValueToFormFields(dataLocalStorage);
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
    console.error('Данные в локальном хранилище повреждены!');
  }
}

function writeValueToFormFields(data) {
  refs.input.value = data.email;
  refs.textarea.value = data.message;
}

function onInputEnterValue() {
  const {
    elements: { email, message },
  } = refs.form;

  const formData = {
    email: email.value.trim(),
    message: message.value.trim(),
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onButtonClickClearForm(e) {
  e.preventDefault();

  try {
    console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
    console.error('Данные в локальном хранилище повреждены!');
  }

  localStorage.removeItem('feedback-form-state');
  refs.form.reset();
}

refs.form.addEventListener('input', throttle(onInputEnterValue, 500));
refs.form.addEventListener('submit', onButtonClickClearForm);
