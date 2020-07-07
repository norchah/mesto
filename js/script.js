
//========== объявление переменных ==========
// Спасибо большое за '.contains', совсем забыл про него и намучался в этих местах - не передать
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      alt:  'Горы Архыза'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
      alt:  'Озера  в окружении заснеженных холмов и леса'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      alt:  'Советская застройка "коробками"'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
      alt:  'Один из потухших вулканов Камчатки'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
      alt:  'Железная дорога, уходящая в горизонт'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
      alt:  'Заснеженный кряж на берегу Байкала'
  }
];

const cardsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#card').content;

const btnEdit = document.querySelector('.btn_edit');
const btnAdd = document.querySelector('.btn_add');
const btnClose = document.querySelector('.popup__btn-close');
const btnSend = document.querySelector('.form__btn-send');
const btnCloseImg = document.querySelector('.img-popup__btn-close');

const inputName = document.querySelector('.form__input_name');
const inputDescription = document.querySelector('.form__input_description');
const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__subtitle');

const popup = document.querySelector('.popup');
const popupTitle = document.querySelector('.form__title');
const imgPopup = document.querySelector('.img-popup');

let userCards = [];

//=========== объявлены ==========


//========== объявление ф-ций ===========

function createCard(arr) {   // будущие карточки
  const newCard = cardTemplate.cloneNode(true);
  const elementImg = newCard.querySelector('.element__img');
  newCard.querySelector('.element__title').textContent = arr.name;
  elementImg.src = arr.link;
  elementImg.alt = arr.alt;
  return newCard;
}

function addStartCard(arr){  //  добавляем начальные карточки
  cardsList.append(createCard(arr));
}

function addUserCard(arr){   // карточки от пользователя
  cardsList.prepend(createCard(arr));
}

function openPopup() {
  popup.classList.add('popup_opened');
}

function openPopupEdit() {     // общий попап => попап для редактирования
  openPopup();
  popupTitle.textContent = 'Редактировать профиль';
  inputDescription.value = userDescription.textContent;
  inputName.value = userName.textContent;
}

function openPopupAdd() {  // общий попап => попап для добавления
  openPopup();
  popupTitle.textContent = 'Новое место';
  inputName.placeholder = 'Название';
  inputDescription.placeholder = 'Ссылка на картинку';
}

function closePopup() {
  popup.classList.remove('popup_opened');
  inputDescription.value = '';
  inputName.value = '';
}

function closePopupImg() {
  imgPopup.classList.remove('img-popup_opened');
}

function createImgPopup(target) {  // заполнение попапа с картинкой
  const elementTitle = target.closest('.element').querySelector('.element__title');

  document.querySelector('.img-popup__img').src = target.src;
  document.querySelector('.img-popup__img-name').textContent = elementTitle.textContent;
}

function createFormEdit() {  // создание формы для редактирования
  userName.textContent = inputName.value;
  userDescription.textContent = inputDescription.value;
}

function createFormAdd() {   // создание формы для добавления контента
  userCards.name = inputName.value;
  userCards.link = inputDescription.value;
  addUserCard(userCards);
  userCards = [];
}

function profileFormSubmitHandler(event) {  // ф-ция отправки формы редактирования профиля
  event.preventDefault();
  if (popupTitle.textContent === 'Редактировать профиль') {
    createFormEdit();
    closePopup();
  }
}

function userCardFormSubmitHandler() {  // ф-ция создания новой карточки пользователя
  if (popupTitle.textContent === 'Новое место') {
    createFormAdd(inputName, inputDescription);
    closePopup();
  }
}
//========== ф-ци объявлены ==========


//========== создание стартовых карточек ==========
initialCards.forEach(addStartCard);
//========== карточки на стринице ==========

//========== лайки ==========
cardsList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('btn__like')) {
    evt.target.classList.toggle('btn__like_active');
  }
});
//========== лайки лайкают ==========



//========== удаление карточек ==========
cardsList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('btn__delete')) {
    evt.target.closest('.element').remove();
  }
});
//========== удалились ==========

//========== зовём попапы и закрываем ==========
btnEdit.addEventListener('click', openPopupEdit);
btnAdd.addEventListener('click', openPopupAdd);

btnClose.addEventListener('click', closePopup);
btnCloseImg.addEventListener('click', closePopupImg);

// зовём попап с картинкой
document.addEventListener('click', (evt) => {
  const target = evt.target;
  if (evt.target.classList.contains('element-img')) {
    imgPopup.classList.add('img-popup_opened');
    createImgPopup(target);
  } else {return}
});
//========== попапы вызваны и закрыты ==========


//========== и сабмиты ==========
btnSend.addEventListener('click', profileFormSubmitHandler);
btnSend.addEventListener('click', userCardFormSubmitHandler);
