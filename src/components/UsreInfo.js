import Popup from './Popup.js';

export default class UserInfo extends Popup {
  constructor(modal, inputName, inputDescription) {
    super(modal);
    this._inputName = inputName;
    this._inputDescription = inputDescription;
    this._contentName = document.querySelector('.profile__title');
    this._contentDescription = document.querySelector('.profile__subtitle');
  }

  getUserInfo() {
    this._inputName.value = this._contentName.textContent;
    this._inputDescription.value = this._contentDescription.textContent;
  }

  setUserInfo() {
    this._contentName.textContent = this._inputName.value;
    this._contentDescription.textContent = this._inputDescription.value;
  }
}
