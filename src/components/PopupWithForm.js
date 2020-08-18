import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({modal, formSubmitHandler}) {
    super(modal);
    this._formSubmitHandler = formSubmitHandler;
  }

  _getInputValues() {
    this._inputList = this._modal.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })
    return this._formValues;
   }

  submit() {
    this._setEventListener();
  }

  close() {
    super.close();
  }

  _setEventListener() {
    this._formSubmitHandler(this._getInputValues());
  }
}
