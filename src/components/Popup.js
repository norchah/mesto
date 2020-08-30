import { btnSendEditAvatar, btnSendEdit, btnSendAdd } from '../utils/constants.js';

export default class Popup {
  constructor(modal) {
    this._modal = document.querySelector(modal);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  open() {
    this._modal.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);  //esc-детектед
    this._modal.addEventListener('click', this._handleOverlayClose); //overlay - детекдед
    this._setEventListeners();
  }

  close() {
    this._modal.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);  // удаление esc-детектед
    this._modal.removeEventListener('click', this._handleOverlayClose);
  }

  _handleOverlayClose(evt) { // закрытие на оверлей, вынес в отдельный метод, что б слушатель снять.
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key == 'Escape') {
      this.close();
    }
  }

  _setEventListeners() {
    this._modal
    .querySelector('.btn-close')
    .addEventListener('click', () => {
      this.close();
    });
  }
}
