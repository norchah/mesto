import {
  imgPopup,
  imgPopupImage
} from '../utils/constants.js';
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(modal) {
    super(modal)
  }

  _createPopupImg(name, link) {
    imgPopupImage.src = link;
    imgPopupImage.alt = name;
    imgPopup.querySelector('.img-popup__img-name').textContent = name;
  }

  open(name, link) {
    super.open();
    this._createPopupImg(name, link);
    this._setEventListener();
  }

  close() {
    super.close();
  }

  _setEventListeners() {
    super._setEventListeners();
  }
}
