// Отправил работу на третью проверку, которая было отклонена, незаметив что она вернулась! А я загружал как раз испрвденный
// esc для попапа с картинкой. Прошу прощения - недосмотрел.

// объект для валидации в файле ./js/objects.js, там же и начальные карточки

//========== объявление переменных ==========

const cardsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#card').content;

const btnEdit = document.querySelector('.btn_edit');
const btnAdd = document.querySelector('.btn_add');
const btnCloseAdd = document.querySelector('.btn-close-add');
const btnCloseEdit = document.querySelector('.btn-close-edit');
const btnCloseImg = document.querySelector('.img-popup__btn-close');

const btnSendEdit = document.querySelector('.form__btn-send-edit');
const btnSendAdd = document.querySelector('.form__btn-send-add');

const inputName = document.querySelector('.form__input_name');
const inputDescription = document.querySelector('.form__input_description');
const inputNameAdd = document.querySelector('.form__input_name-add');
const inputDescriptionAdd = document.querySelector('.form__input_description-add');
const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__subtitle');

const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const imgPopup = document.querySelector('.img-popup');
const popupContainers = document.querySelectorAll('.popup__container');
const imgPopupContainer = document.querySelector('.img-popup__container');

const formInputs = document.querySelectorAll('.form__input');
const formErrors = document.querySelectorAll('.form__input-error');

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

function handlerEsc (evt) { //закрытие на esc
  if (evt.key !== 'Escape') {
    return;
  } else {
    closePopup(popupAdd);
    closePopup(popupEdit);
  }
}

function btnSendDisabled (button, config) { // функция отключения кнопки
  button.classList.add(config.btnSendDisabled);
  button.setAttribute('disabled', true);
}

function btnSendEnabled (button, config) { // функция включения кнопки
  button.classList.remove(config.btnSendDisabled);
  button.removeAttribute('disabled');
}

function openPopup(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keyup', handlerEsc); // esc-детектед
}

function openPopupEdit() {     //  попап для редактирования
  openPopup(popupEdit);
  inputDescription.value = userDescription.textContent;
  inputName.value = userName.textContent;
}

function openPopupAdd() {  // попап для добавления
  openPopup(popupAdd);
  btnSendDisabled (btnSendAdd, validationConfig); // отключается кнопка на невалидной форме до начала ввода
}

function clearFields () { //очистка полей
  inputNameAdd.value = '';
  inputDescriptionAdd.value = '';

}

function clearBorderError (inputElement, config) { // очистка красной границы
  inputElement.classList.remove(config.formInputError);
}

function clearErrorFields (element) {
  element.textContent = '';
}

function closePopup() {
  popupAdd.classList.remove('popup_opened');
  popupEdit.classList.remove('popup_opened');
  clearFields ()
  document.removeEventListener('keyup', handlerEsc); // удаление esc-детектед
  formInputs.forEach(inputElement => {  // очистка красной границы при закрытии (не сабмит) невалидной формы
    clearBorderError(inputElement, validationConfig);
  });
  btnSendEnabled (btnSendEdit, validationConfig); // включение кнопки отправки формы при закрытии (не сабмит) невалидной формы
  formErrors.forEach(clearErrorFields); //очистка полей с текстом ошибок
  closePopupImg()
}

function closePopupImg() {
  imgPopup.classList.remove('img-popup_opened');
  document.removeEventListener('keyup', handlerEsc);
}

function createImgPopup(target) {  // заполнение попапа с картинкой
  const elementTitle = target.closest('.element').querySelector('.element__title');
  document.querySelector('.img-popup__img').src = target.src;
  document.querySelector('.img-popup__img-name').textContent = elementTitle.textContent;
  document.addEventListener('keyup', handlerEsc);
}

function createFormEdit() {  // создание формы для редактирования
  userName.textContent = inputName.value;
  userDescription.textContent = inputDescription.value;
}

function createFormAdd() {   // создание формы для добавления контента
  userCards.name = inputNameAdd.value;
  userCards.link = inputDescriptionAdd.value;
  userCards.alt = inputNameAdd.value;
  addUserCard(userCards)
  userCards = [];
}

function profileFormSubmitHandler(evt) {  // ф-ция отправки формы редактирования профиля
  evt.preventDefault();
  createFormEdit();
  closePopup(popupEdit);
}

function userCardFormSubmitHandler(evt) {  // ф-ция создания новой карточки пользователя
  evt.preventDefault();
  createFormAdd(inputNameAdd, inputDescriptionAdd);
  closePopup(popupAdd);
}
//========== ф-ци объявлены ==========


//========== создание стартовых карточек ==========
initialCards.forEach(addStartCard);
//========== карточки на странице ==========



//========== лайки ==========
cardsList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('btn_like')) {
    evt.target.classList.toggle('btn_like_active');
  }
});
//========== лайки лайкают ==========



//========== удаление карточек ==========
cardsList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('btn_delete')) {
    evt.target.closest('.element').remove();
  }
});
//========== удалились ==========



//========== зовём попапы и закрываем ==========
btnEdit.addEventListener('click', openPopupEdit);
btnAdd.addEventListener('click', openPopupAdd);

btnCloseAdd.addEventListener('click', closePopup);
btnCloseEdit.addEventListener('click', closePopup);
btnCloseImg.addEventListener('click', closePopupImg);

// зовём попап с картинкой
document.addEventListener('click', (evt) => {
  const target = evt.target;
  if (evt.target.classList.contains('element__img')) {
    imgPopup.classList.add('img-popup_opened');
    createImgPopup(target);
  } else {return}
});
//========== попапы вызваны и закрыты ==========



//========== и сабмиты ==========
btnSendEdit.addEventListener('click', profileFormSubmitHandler);
btnSendAdd.addEventListener('click', userCardFormSubmitHandler);

//========== Закрытие по оверлею ==========
popupAdd.addEventListener('click', closePopup); // Закрытие на оверлей
popupEdit.addEventListener('click', closePopup);
imgPopup.addEventListener('click', closePopup);
popupContainers.forEach(element => {
  element.addEventListener('click', (evt) => {// остановка всплытия при клике на оверлей
  evt.stopImmediatePropagation();
  })
});
imgPopupContainer.addEventListener('click', (evt) => {
  evt.stopImmediatePropagation();
});
