//========== Функции для валидации ==========

function createValidFormEdit() { // создание условий для валидации формы редактирования
  inputName.setAttribute('maxlength', '40');
  inputName.setAttribute('minlength', '2');
  inputDescription.setAttribute('maxlength', '200');
  inputDescription.setAttribute('minlength', '2');
}

function createValidFormAdd() { // создание условий для валидации формы добавления
  inputDescription.setAttribute('type', 'url')
  inputName.setAttribute('maxlength', '30')
  inputName.setAttribute('minlength', '1')
}

function showInputError (formElement, inputElement, errorMessage) { // показать ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('form__input_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.remove('form__input-error_hidden');
}

function hideInputError (formElement, inputElement) { //скрыть
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('form__input_error');
  errorElement.classList.add('form__input-error_hidden');
}

function checkInputValidity (formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
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

function setEventListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  toggleButtonState(inputList, btnSend);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, btnSend)
    });
  });
};
