import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor({ modal, submitHandler }) {
    super(modal);
    this._btnSubmit = this._modal.querySelector(".popup-delete__btn-send");
    this._submitHandler = submitHandler;
  }

  submitAction(id, target) {
    this._setEventListeners(id, target);
    this._btnSubmit.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._submitHandler(id, target);
    });
  }

  _setEventListeners() {
    super._setEventListeners();
  }
}
