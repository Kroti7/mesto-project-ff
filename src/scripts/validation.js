/* const { forEach } = require("core-js/core/array"); */

const disableButton = (btnElement) => {
  btnElement.setAttribute('disabled', '');
};

const enableButton = (btnElement) => {
  btnElement.removeAttribute('disabled');
};

const showErrorifInvalid = (inputElement, errorElement, btnElement) => {
  if ((inputElement.validity.patternMismatch)) {
    errorElement.textContent = inputElement.dataset.errorMessage; /* ????? */
    disableButton(btnElement);
    inputElement.classList.add('popup__input_invalid');
  } else if (!inputElement.validity.valid) {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add('popup__input_invalid');
    disableButton(btnElement);
  } else {
    errorElement.textContent = "";
    inputElement.classList.remove('popup__input_invalid');
    enableButton(btnElement);
  }
}

const addListenersInForm = (formElement, inputClass, btnClass) => {
  const btnElement = formElement.querySelector(btnClass);
  const inputArray = Array.from(formElement.querySelectorAll(inputClass));
  disableButton(btnElement);


  inputArray.forEach(input => {
    const inputname = input.getAttribute('name');
    const errorElement = formElement.querySelector(`.${inputname}-input-error`);

    input.addEventListener('input', () => {
      showErrorifInvalid(input, errorElement, btnElement);
    })
  });
};

const enableValidation = (object) => {
  const formClass = object.formSelector;
  const inputClass = object.inputSelector;
  const btnClass = object.submitButtonSelector;

  const formArray = Array.from(document.querySelectorAll(formClass));
  formArray.forEach(form => {
    addListenersInForm(form, inputClass, btnClass);
  })
}

export {enableValidation};


/* enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});  */

/*
const nameRegex = /[а-яё\- ]{2,40}/i;
const descriptionRegex = /[а-яё(🟥пробелы символы и пр🟥)]{2,200}/i;
const pictureUrlRegex = /(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)\.(?:jpg|jpeg|png|gif|bmp|svg)(?:\?.*)?$/i; */