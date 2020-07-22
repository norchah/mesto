import {cardsList, Card} from './Card.js';
import {formAdd, formEdit} from './FormValidator.js';
import {validationConfig} from './objects.js';

//========== объявление переменных ==========

const btnEdit = document.querySelector('.btn_edit');
const btnAdd = document.querySelector('.btn_add');
const btnCloseAdd = document.querySelector('.btn-close-add');
const btnCloseEdit = document.querySelector('.btn-close-edit');


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

const popupContainers = document.querySelectorAll('.popup__container');


const formInputs = document.querySelectorAll('.form__input');
const formErrors = document.querySelectorAll('.form__input-error');

let userCards = []; //будущий массив с данными о картинке пользователя

//=========== объявлены ==========


//========== объявление ф-ций ===========

function createObjectUserCard() {   // создание массива с данными карточки пользователя
  userCards.name = inputNameAdd.value;
  userCards.link = inputDescriptionAdd.value;
  userCards.alt = inputNameAdd.value;
  return userCards;
}

function handlerEsc (evt) { // ф-ция закрытия на esc
  if (evt.key !== 'Escape') {
    return;
  } else {
    closePopup(popupAdd);
    closePopup(popupEdit);
  }
}

function btnSendDisabled (button) { // функция отключения кнопки
  button.classList.add('form__btn-send_disabled');
  button.setAttribute('disabled', true);
}

function btnSendEnabled (button) { // функция включения кнопки
  button.classList.remove('form__btn-send_disabled');
  button.removeAttribute('disabled');
}

function clearFields () { //очистка полей
  inputNameAdd.value = '';
  inputDescriptionAdd.value = '';
}

function clearBorderError (inputElement, config) { // очистка красной границы
  inputElement.classList.remove(config.inputError);
}

function clearErrorFields (element) {
  element.textContent = '';
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
}

function createFormEdit() {  // создание формы для редактирования
  userName.textContent = inputName.value;
  userDescription.textContent = inputDescription.value;
}

function userCardFormSubmitHandler(evt) {  // ф-ция отправки формы создания новой карточки пользователя
  evt.preventDefault();
  const card = new Card(createObjectUserCard(), '#card');
  const cardElement = card.generateCard();
  cardsList.prepend(cardElement);

  closePopup();
  userCards = []; // что б не забивать память очищаем массив с данными о картинке пользователя
}

function profileFormSubmitHandler(evt) {  // ф-ция отправки формы редактирования профиля
  evt.preventDefault();
  createFormEdit();
  closePopup(popupEdit);
}
//========== ф-ци объявлены ==========


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
//========== попапы вызваны и закрыты ==========



//========== и сабмиты ==========
btnSendEdit.addEventListener('click', profileFormSubmitHandler);
btnSendAdd.addEventListener('click', userCardFormSubmitHandler);

//========== Закрытие по оверлею ==========
popupAdd.addEventListener('click', closePopup);
popupEdit.addEventListener('click', closePopup);

popupContainers.forEach(element => {   // остановка всплытия при клике на оверлей
  element.addEventListener('click', (evt) => {
  evt.stopImmediatePropagation();
  })
});


export {btnSendDisabled, btnSendEnabled};
