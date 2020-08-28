import {btnSendDisabled, btnSendEnabled} from '../utils/utils.js';

export default class FormValidator {
  constructor(data, formSelector) {
    this._form = data.form;
    this._formInput = data.formInput;
    this._inputError = data.inputError;
    this._formInputError = data.formInputError;
    this._formInputErrorHidden = data.formInputErrorHidden;
    this._btnSend = data.btnSend;
    this._btnSendDisabled = data.btnSendDisabled;
    this._formSelector = formSelector;
    this._element = this._getFormElement(); //форма
  }

  _getFormElement() { //возврат формы
    const element = document.querySelector(this._formSelector);

    return element;
  }

  _showError(inputElement, errorMessage) { //показать ошибки
    const formError = this._element.querySelector(`#${inputElement.id}-error`);
    formError.classList.remove(this._formInputErrorHidden);
    formError.textContent = errorMessage;
    inputElement.classList.add(this._inputError);
  }

  _hideError(inputElement) { //скрыть ошибки
    const formError = this._element.querySelector(`#${inputElement.id}-error`);
    formError.classList.add(this._formInputErrorHidden);
    formError.textContent = '';
    inputElement.classList.remove(this._inputError);
  }

  _isValid(inputElement) {  //валидность поля
    if(!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {  //валидность для кнопки
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState(inputList, button) { //сосотояние кнопки
    if(this._hasInvalidInput(inputList)) {
      btnSendDisabled(button);
    } else {
      btnSendEnabled(button);
    }
  }

  _setEventListener() { //слушатели
    const btnSend = this._element.querySelector(this._btnSend);
    const inputList = Array.from(this._element.querySelectorAll(this._formInput));
    inputList.forEach(inputElement => {

      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, btnSend);

     });
    })
  }

  enableValidation() { //включение
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();

    });
    this._setEventListener();
  }
}
