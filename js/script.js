//========== Первоначальная загрузка карточек ==========
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

function addCard(arr) {
  const cardsList = document.querySelector('.elements__list');
  const cardTemplate = document.querySelector('#card').content;
  const newCard = cardTemplate.cloneNode(true);

  newCard.querySelector('.element__title').textContent = arr.name;
  newCard.querySelector('.element__img').src = arr.link;
  newCard.querySelector('.element__img').alt = arr.alt;

  cardsList.prepend(newCard);    // Последние добавленные - сверху
};

initialCards.forEach(addCard);

//========== Загрузка карточек завершена ==========









let btnEdit = document.querySelector('.btn_edit');
let btnClose = document.querySelector('.popup__btn-close');
let btnSend = document.querySelector('.form__btn-send');

let popup = document.querySelector('.popup');

let inputName = document.querySelector('.form__input_name');
let inputDescription = document.querySelector('.form__input_description');
let userName = document.querySelector('.profile__title');
let userDescription = document.querySelector('.profile__subtitle');


function openPopup() {
  popup.classList.remove('popup_closed');
  inputName.value = userName.textContent;
  inputDescription.value = userDescription.textContent;
}

function closePopup() {
  popup.classList.add('popup_closed');
}

function sendForm() {
  event.preventDefault();
  popup.classList.add('popup_closed')
  userName.textContent = inputName.value;
  userDescription.textContent = inputDescription.value;
}

btnEdit.addEventListener('click', openPopup);
btnClose.addEventListener('click', closePopup);
btnSend.addEventListener('click', sendForm);
