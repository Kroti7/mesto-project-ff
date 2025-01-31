const disableButton = (btnElement) => {
  btnElement.setAttribute('disabled', '');
};

const enableButton = (btnElement) => {
  btnElement.removeAttribute('disabled');
};

const showErrorifInvalid = (inputElement, errorElement, btnElement) => {
  if ((inputElement.validity.patternMismatch)) {
    errorElement.textContent = inputElement.dataset.errorMessage;
    inputElement.classList.add('popup__input_invalid');
  } else if (!inputElement.validity.valid) {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add('popup__input_invalid');
  } else {
    errorElement.textContent = "";
    inputElement.classList.remove('popup__input_invalid');
  }
}

const hasInvalidInput = (inputArray) => {
  return inputArray.some(input => {
    return !input.validity.valid
  })
}

const changeButtonStateIfAllValid = (hasAnyInvalidForm, inputArray, btnElement) => {
  if (hasAnyInvalidForm(inputArray)) {
    disableButton(btnElement);
  } else {
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
      changeButtonStateIfAllValid(hasInvalidInput, inputArray, btnElement);
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