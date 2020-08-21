
export default class Card { // используется и для загрузки стартовых карточек, и для пользовательских
  constructor({name, link, handleCardClick}, cardSelector) {
    this._name = name;
    this._link = link;
    this._alt = name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplateCard();
    this._elementImg = this._element.querySelector('.element__img');
  }

  _getTemplateCard() {
    const newCard = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);

    return newCard;
  }

  generateCard() {
    this._element.querySelector('.element__title').textContent = this._name;
    this._elementImg.src = this._link;
    this._elementImg.alt = this._alt;
    this._setEventListeners();

    return this._element;
  }

  _openPopupImg(name, link) {
    this._handleCardClick(name, link);
  }

  _likes(evt) {  // лайки подготовка
    if (evt.target.classList.contains('btn_like')) {
      evt.target.classList.toggle('btn_like_active');
    }
  }

  _delets(evt) {  // удаление подготовка
    if (evt.target.classList.contains('btn_delete')) {
      evt.target.closest('.element').remove();
    }
  }

  _setEventListeners() {
    const card = this._element.querySelector('.element');
    card.addEventListener('click', (evt) => { // лайки
      this._likes(evt);
    });

    card.addEventListener('click', (evt) => { // удаления
      this._delets(evt);
    });

    this._elementImg.addEventListener('click', () => { // открытие попапа картинки
      this._openPopupImg(this._name, this._link);
    });

  }
}
