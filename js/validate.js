//========== Функции для валидации ==========

function showError (formElement, inputElement, errorMessage, config) { //показать ошибки
  const formError = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.formInputError);
  formError.classList.remove(config.formInputErrorHidden);
  formError.textContent = errorMessage;
}

function hideError (formElement, inputElement, config) { //скрыть ошибки
  const formError = formElement.querySelector(`#${inputElement.id}-error`);
  clearBorderError (inputElement, config);
  formError.classList.add(config.formInputErrorHidden);
  formError.textContent = '';
}

function isValid (formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideError(formElement, inputElement, config);
  }
};

function hasInvalidInput(inputList) {  //проверка на валидность для кнопки
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, button, config) {
  if(hasInvalidInput(inputList)) {
    btnSendDisabled (button, config);
  } else {
    btnSendEnabled (button, config);
  }
}

function setEventListeners (formElement, config) {  //слушатели инпутов и управление кнопкой
  const inputList = Array.from(formElement.querySelectorAll(config.formInput));
  const btnSend = formElement.querySelector(config.btnSend);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, btnSend, config);
    });
  });
}

function enableValidation (config) {
  const formList = Array.from(document.querySelectorAll(config.form));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
}

enableValidation(validationConfig);
