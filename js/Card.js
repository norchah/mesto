
//========== импорты объектов ==========
import {initialCards} from './objects.js';
//========== импортированы =========

//========= перенесённые переменные =========
const cardsList = document.querySelector('.elements__list');
const imgPopup = document.querySelector('.img-popup');
const imgPopupContainer = document.querySelector('.img-popup__container');
const btnCloseImg = document.querySelector('.img-popup__btn-close');
//========== перенесены =========


class Card { // используется и для загрузки стартовых карточек, и для пользовательских
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._cardSelector = cardSelector;
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
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    elementImg.src = this._link;
    elementImg.alt = this._alt;

    return this._element;
  }

  _createPopupImg() {
    const popupImg = document.querySelector('.img-popup__img');
    popupImg.src = this._link;
    popupImg.alt = this._name;
    document.querySelector('.img-popup__img-name').textContent = this._name;
  }

  _handleEsc(evt) {
    if (evt !== 'Escape') {
      return;
    } else {
      imgPopup.classList.remove('img-popup_opened'); //this._handleClosePopupImg(); не срабатывает
      document.removeEventListener('keyup', (evt) => { // отменяем ожидание esc`а
        this._handleEsc(evt.key);
      });
    }
  }

  _handleOpenPopupImg() {
    this._createPopupImg();
    imgPopup.classList.add('img-popup_opened');
    document.addEventListener('keyup', (evt) => { // ждём esc`а
      this._handleEsc(evt.key);
    })
  }

  _handleClosePopupImg() {
    imgPopup.classList.remove('img-popup_opened');
  }

  _setEventListeners() {
    this._element.querySelector('.element__img').addEventListener('click', () => {
      this._handleOpenPopupImg();
    });
    btnCloseImg.addEventListener('click', () => {
      this._handleClosePopupImg();
    });
    imgPopup.addEventListener('click', () =>{  //закрытие на оверлей
      this._handleClosePopupImg();
    });
    imgPopupContainer.addEventListener('click', (evt) => { //остановка всплытия
      evt.stopImmediatePropagation();
    });
  }
}

//========== стартовые карточки появляются на странице =========
  initialCards.forEach(element => {
  const card = new Card(element, '#card');
  const cardElement = card.generateCard();
  cardsList.append(cardElement);
});

//========== и экспорт =========
export {cardsList, Card};
