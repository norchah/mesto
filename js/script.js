
// Объявления переменных для разных блоков, находятся в тех же блоках, что б проще искать было
// Блоки отмечены знаками равно

//========== Первоначальная загрузка карточек ==========

//Я добавил alt`ы в карточки, что бы img были с альтами. Менять картинки не стал

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

function addCards(arr) {
  const newCard = cardTemplate.cloneNode(true); // При объявлении вне функции, ничего не работает, почему-то (

  newCard.querySelector('.element__title').textContent = arr.name;
  newCard.querySelector('.element__img').src = arr.link;
  newCard.querySelector('.element__img').alt = arr.alt;

  cardsList.append(newCard);
};

initialCards.forEach(addCards);

//========== Загрузка карточек завершена ==========



//========== Лайки ==========

//Первоначально были более лаконичные лайки, но они не работали на новых картинках:

/*const likeBtn = document.querySelectorAll('.btn__like');

likeBtn.forEach(index => index.addEventListener('click', (evt) => {
  evt.target.classList.toggle('btn__like_active')
  })
);*/

// Не стал удалять, может быть я залез вперед, потому что пришлось использовать data-атрибуты
// То же самое с удалением карточек
// Зато на новых карточках все работает

document.addEventListener('click', (evt) => {
  if(evt.target.getAttribute('data-btn') === 'like') {
    evt.target.classList.toggle('btn__like_active')
  } else {return}
});
//========== Лайки кончились ==========



//========== Удаление карточек ==========

/*const deleteBtn = cardsList.querySelectorAll('.btn__delete');

deleteBtn.forEach(index => index.addEventListener('click', (evt) => {
  evt.currentTarget.closest('.element').remove()
  })
);*/

document.addEventListener('click', (evt) => {
  if(evt.target.getAttribute('data-btn') === 'del') {
    evt.target.closest('.element').remove()
  } else {return}
});

//========== Удалилось ==========




//========== Попапы ==========
const btnEdit = document.querySelector('.btn_edit');
const btnAdd = document.querySelector('.btn_add');
const btnClose = document.querySelector('.popup__btn-close');
const btnSend = document.querySelector('.form__btn-send');
const btnImg = document.querySelectorAll('.element__btn-img');
const btnCloseImg = document.querySelector('.img-popup__btn-close');


const inputName = document.querySelector('.form__input_name');
const inputDescription = document.querySelector('.form__input_description');
const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__subtitle');

const popup = document.querySelector('.popup');
const popupTitle = document.querySelector('.form__title');
const imgPopup = document.querySelector('.img-popup');

function openPopup() {
  popup.classList.add('popup_opened');
}

function openPopupEdit() {     // Общий попап => попап для редактирования
  openPopup();
  popupTitle.textContent = 'Редактировать профиль';
  inputDescription.value = userDescription.textContent;
  inputName.value = userName.textContent;
}

function openPopupAdd() {  // Общий попап => попап для добавления
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

function closePopupImg() {  // Закрываю попап с картинкой
  imgPopup.classList.remove('img-popup_opened');
}

btnEdit.addEventListener('click', openPopupEdit);
btnAdd.addEventListener('click', openPopupAdd);

btnClose.addEventListener('click', closePopup);
btnCloseImg.addEventListener('click', closePopupImg);


btnImg.forEach(index => index.addEventListener('click', (evt) => { // вызов попапа с картинкой
  const target = evt.target;
  createImgPopup(target)
  })
);

function createImgPopup(target) {  // заполнение попапа с картинкой
  const elementTitle = target.closest('.element').querySelector('.element__title');
  imgPopup.setAttribute('class', 'img-popup img-popup_opened');

  document.querySelector('.img-popup__img').src = target.src;
  document.querySelector('.img-popup__img-name').textContent = elementTitle.textContent;
}
//========== Попапы вызваны и закрыты ==========


//========== Добавление карточки пользователем и редактирование profile ==========

function addCard(name, link, alt = 'Картинка пользователя') {
  const newCard = cardTemplate.cloneNode(true);

  newCard.querySelector('.element__title').textContent = name;
  newCard.querySelector('.element__img').src = link;
  newCard.querySelector('.element__img').alt = alt;

  cardsList.prepend(newCard);
}

function sendForm() {
  event.preventDefault();
  if (popupTitle.textContent === 'Редактировать профиль') {
    popup.classList.remove('popup_opened')
    userName.textContent = inputName.value;
    userDescription.textContent = inputDescription.value;
    inputDescription.value = '';
    inputName.value = '';
  } else if (popupTitle.textContent === 'Новое место') {
    popup.classList.remove('popup_opened');
    addCard(inputName.value, inputDescription.value);
    inputDescription.value = '';
    inputName.value = '';
  }
}

btnSend.addEventListener('click', sendForm);

//Кажется, есть что сократить =))
