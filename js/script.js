
//========== объявление переменных ==========
// пока нас не обучали подключать файлы js, а все что я нагуглил - не помогло, но пытался
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

function createCards(arr) {   // будущие карточки
  const newCard = cardTemplate.cloneNode(true);
  const elementImg = newCard.querySelector('.element__img');
  newCard.querySelector('.element__title').textContent = arr.name;
  elementImg.src = arr.link;
  elementImg.alt = arr.alt;
  return newCard;
}

function addStartCards(arr){  //  добавляем начальные карточки
  cardsList.append(createCards(arr));
}

function addUserCards(arr){   // карточки от пользователя
  cardsList.prepend(createCards(arr));
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
  addUserCards(userCards);
  userCards = [];
}

function sendFormEdit(event) {  // ф-ция отправки формы редактирования профиля
  event.preventDefault();
  if (popupTitle.textContent === 'Редактировать профиль') {
    createFormEdit();
    closePopup();
  }
}

function sendFormAdd() {  // ф-ция создания новой карточки пользователя
  if (popupTitle.textContent === 'Новое место') {
    createFormAdd(inputName, inputDescription);
    closePopup();
  }
}
//========== ф-ци объявлены ==========


//========== создание стартовых карточек ==========
initialCards.forEach(addStartCards);
//========== карточки на стринице ==========

//========== лайки ==========
cardsList.addEventListener('click', (evt) => {
  const targetAttribute = evt.target.getAttribute('class');
  if(targetAttribute === 'btn btn__like' || targetAttribute === 'btn btn__like btn__like_active') {
    evt.target.classList.toggle('btn__like_active');
  }
});
//========== лайки лайкают ==========



//========== удаление карточек ==========
cardsList.addEventListener('click', (evt) => {
  if(evt.target.getAttribute('class') === 'btn btn__delete') {
    evt.target.closest('.element').remove()
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
  if(evt.target.getAttribute('data-img') === 'img') {
    imgPopup.classList.add('img-popup_opened')
    createImgPopup(target)
  } else {return}
});
//========== попапы вызваны и закрыты ==========


//========== и сабмиты ==========
btnSend.addEventListener('click', sendFormEdit);
btnSend.addEventListener('click', sendFormAdd);
