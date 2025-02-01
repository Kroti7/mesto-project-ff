/* Показываем ошибку в форме */
const showErrorifInvalid = (inputElement, errorElement, inputInvalidClass) => {
  if ((inputElement.validity.patternMismatch)) {
    errorElement.textContent = inputElement.dataset.errorMessage;
    inputElement.classList.add(inputInvalidClass);
  } else if (!inputElement.validity.valid) {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(inputInvalidClass);
  } else {
    errorElement.textContent = "";
    inputElement.classList.remove(inputInvalidClass);
  }
}

/* Логика изменения кнопки при ошибках */
const hasInvalidInput = (inputArray) => {
  return inputArray.some(input => {
    return !input.validity.valid
  })
}

const disableButton = (btnElement) => {
  btnElement.setAttribute('disabled', '');
};

const enableButton = (btnElement) => {
  btnElement.removeAttribute('disabled');
};

const changeButtonStateIfAllValid = (hasAnyInvalidForm, inputArray, btnElement) => {
  if (hasAnyInvalidForm(inputArray)) {
    disableButton(btnElement);
  } else {
    enableButton(btnElement);
  }
}

/* Добавление валидации при импуте пользователя */
const addListenersInForm = (formElement, inputClass, btnClass, invalidClass) => {
  const btnElement = formElement.querySelector(btnClass);
  const inputArray = Array.from(formElement.querySelectorAll(inputClass));
  disableButton(btnElement);

  inputArray.forEach(input => {
    const inputname = input.getAttribute('name');
    const errorElement = formElement.querySelector(`.${inputname}-input-error`);

    input.addEventListener('input', () => {
      showErrorifInvalid(input, errorElement, invalidClass);
      changeButtonStateIfAllValid(hasInvalidInput, inputArray, btnElement);
    })
  });
};

const enableValidation = (object) => {
  const formClass = object.formSelector;
  const inputClass = object.inputSelector;
  const inputInvalidClass = object.invalidClass;
  const btnClass = object.submitButtonSelector;

  const formArray = Array.from(document.querySelectorAll(formClass));
  formArray.forEach(form => {
    addListenersInForm(form, inputClass, btnClass, inputInvalidClass);
  })
}

export {enableValidation};