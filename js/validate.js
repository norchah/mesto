//========== Функции для валидации ==========

// Что бы добавить все условия валидации в разметку, пришлось добавить второй попап и частично переписать JS

function showError (formElement, inputElement, errorMessage) { //показать ошибки
  const formError = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('form__input_error');
  formError.classList.remove('form__input-error_hidden');
  formError.textContent = errorMessage;
}

function hideError (formElement, inputElement) { //скрыть ошибки
  const formError = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('form__input_error');
  formError.classList.add('form__input-error_hidden');
  formError.textContent = '';
}

function isValid (formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
};

function hasInvalidInput(inputList) {  //проверка на валидность для кнопки
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, button) {
  if(hasInvalidInput(inputList)) {
    button.classList.add('form__btn-send_disabled');
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove('form__btn-send_disabled');
    button.removeAttribute('disabled');
  }
}

function setEventListeners (formElement) {  //слушатели инпутов и управление кнопкой
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const btnSend = formElement.querySelector('.form__btn-send');
  toggleButtonState(inputList, btnSend);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, btnSend);
    });
  });
}

function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}
