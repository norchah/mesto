import {clearBorderError, clearErrorFields} from '../utils/utils.js';
import {
  validationConfig,
  inputNameAdd,
  inputDescriptionAdd,
  formInputs,
  formErrors
} from '../utils/constants.js';

export default class Popup {
  constructor(modal) {
    this._modal = document.querySelector(modal);
  }

  open() {
    this._modal.classList.add('popup_opened');
    document.addEventListener('keyup', (evt) => { //esc-детектед
      this._handleEscClose(evt);
    });
    this._modal.addEventListener('click', (evt) => { // закрытие на оверлей
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
    this._setEventListener();
  }

  close() {
    this._modal.classList.remove('popup_opened');
    document.removeEventListener('keyup', (evt) => { // удаление esc-детектед
      this._handleEscClose(evt);
    });
    formInputs.forEach(inputElement => {  // очистка красной границы при закрытии (не сабмит) невалидной формы
      clearBorderError(inputElement, validationConfig);
    });
    formErrors.forEach(clearErrorFields); //очистка полей с текстом ошибок
    inputNameAdd.value = ''; // очистка полей при закрытии попапа
    inputDescriptionAdd.value = '';
  }

  _handleEscClose(evt) {
    if (evt.key == 'Escape') {
      this.close();
    }
  }

  _setEventListener() {
    this._modal         //клик на кнопку закрытия и закрытие
    .querySelector('.btn-close')
    .addEventListener('click', () => {
      this.close();
    });
  }

}
