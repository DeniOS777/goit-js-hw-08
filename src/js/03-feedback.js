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
    console.log('✅ Данные успешно восстановлены из локального хранилища');
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
    console.error('❌ Данные в локальном хранилище повреждены!');
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
  localStorage.removeItem('feedback-form-state');
  const emailValue = refs.input.value;
  const messageValue = refs.textarea.value;

  if (emailValue === '' || messageValue === '') {
    return alert('Заполните обязательные поля Email и Message:');
  }

  console.log({ email: emailValue, message: messageValue });
  refs.form.reset();
}

refs.form.addEventListener('input', throttle(onInputEnterValue, 500));
refs.form.addEventListener('submit', onButtonClickClearForm);
