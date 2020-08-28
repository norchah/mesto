export default class Card { // используется и для загрузки стартовых карточек, и для пользовательских
  constructor({
      name,
      link,
      like,
      id,
      ownerId,
      handleCardClick,
      handleCardDelete,
      handleCardLike
    }, cardSelector)
    {
    this._name = name;
    this._link = link;
    this._alt = name;
    this._like = like;
    this._id = id,
    this._ownerId = ownerId,
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
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
    this._elementImg.id = this._id;
    this._element.querySelector('.element__like-count').textContent = this._like.length; // количество лайков при загрузке
    this._isOwnerCard(); // наша карточка детектед
    this._isOwnerLike(); // наш лайк детектед
    this._setEventListeners();

    return this._element;
  }

  _isOwnerLike() {
    this._like.forEach(element => { // если в списке лайков есть наш - пометим
      if (element._id === '32369f350c9deff0becce90e') {
        this._element.querySelector('.btn_like').classList.add('btn_like_active');
      }
    });
  }

  _isOwnerCard () { // если карточка наша, ставим кнопку удаления
    if (this._ownerId ==='32369f350c9deff0becce90e') {
      const btnDel = document.createElement('button');
      btnDel.className = 'btn btn_delete';
      this._element.querySelector('.element').append(btnDel);
    }
  }

  _openPopupImg(name, link) {
    this._handleCardClick(name, link);
  }

  _likes(evt) {  // лайки подготовка
    if (evt.target.classList.contains('btn_like')) {
      const target = evt.target;
      const likeCount = target.closest('.element__like').querySelector('.element__like-count');
      const id = target.closest('.element').querySelector('.element__img').id;
      this._handleCardLike(target, id, likeCount);
    }
  }

  delets(evt) {  // удаление подготовка
    if (evt.target.classList.contains('btn_delete')) {
      const target = evt.target;
      const id = target.closest('.element').querySelector('.element__img').id;
      this._handleCardDelete(id, target);
    }
  }

  _setEventListeners() {
    const card = this._element.querySelector('.element');
    card.addEventListener('click', (evt) => { // лайки
      this._likes(evt);
    });

    card.addEventListener('click', (evt) => { // удаление
      this.delets(evt);
    });

    this._elementImg.addEventListener('click', () => { // открытие попапа картинки
      this._openPopupImg(this._name, this._link);
    });

  }
}
