import {handleOpenPopupImg} from '../pages/index.js';

export default class Card { // используется и для загрузки стартовых карточек, и для пользовательских
  constructor({name, link}, cardSelector, handleOpenPopupImg) {
    this._name = name;
    this._link = link;
    this._alt = name;
    this._cardSelector = cardSelector;
    this._handleOpenPopupImg = handleOpenPopupImg;
  }

  _getTemplateCard() {
    const newCard = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);

    return newCard;
  }

  generateCard() {
    this._element = this._getTemplateCard();
    const elementImg = this._element.querySelector('.element__img');

    elementImg.addEventListener('click', () => { //передаём данные карточки в попап с картинкой
      handleOpenPopupImg(this._name, this._link);
    });

    this._element.querySelector('.element__title').textContent = this._name;
    elementImg.src = this._link;
    elementImg.alt = this._alt;
    this._setEventListeners();

    return this._element;
  }

  _likes(evt) {  // лайки подготовка
    if (evt.target.classList.contains('btn_like')) {
      evt.target.classList.toggle('btn_like_active');
    }
  }

  _deletes(evt) {  // удаление подготовка
    if (evt.target.classList.contains('btn_delete')) {
      evt.target.closest('.element').remove();
    }
  }

  _setEventListeners() {
    const element = this._element.querySelector('.element');
    element.addEventListener('click', (evt) => { // лайки
      this._likes(evt);
    });
    element.addEventListener('click', (evt) => { // лайки
      this._deletes(evt);
    });

  }

}
