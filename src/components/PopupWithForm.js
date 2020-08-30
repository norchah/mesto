import Popup from "./Popup.js";
import {
  validationConfig,
  formInputs,
  formErrors,
} from "../utils/constants.js";
import { clearBorderError } from "../utils/utils.js";

export default class PopupWithForm extends Popup {
  constructor({ modal, formSubmitHandler }) {
    super(modal);
    this._formSubmitHandler = formSubmitHandler;
    this._inputList = this._modal.querySelectorAll(".form__input");
  }

  getInputValues() {
    this.formValues = {};
    this._inputList.forEach((input) => {
      this.formValues[input.name] = input.value;
    });

    return this.formValues;
  }

  submit() {
    this._setEventListener();
  }

  close() {
    super.close();
    this._inputList.forEach((input) => {
      //очистка полей ошибок
      input.value = "";
    });
    formInputs.forEach((inputElement) => {
      // очистка красной границы при закрытии (не сабмит) невалидной формы
      clearBorderError(inputElement, validationConfig);
    });
    formErrors.forEach((element) => {
      element.textContent = "";
    }); //очистка полей с текстом ошибок
  }

  _setEventListener() {
    super._setEventListeners();
    this._formSubmitHandler(this.getInputValues());
  }
}
