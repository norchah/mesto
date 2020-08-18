import './index.css';
import {
  validationConfig,
  initialCards,
  btnEdit,
  btnAdd,
  btnSendEdit,
  cardsList,
  btnSendAdd,
  inputName,
  inputDescription
} from '../utils/constants.js';
import {btnSendDisabled, btnSendEnabled, createObjectUserCard} from '../utils/utils.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import UserInfo from '../components/UsreInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

//========== копии классов ==========
const userInfo = new UserInfo ('.popup-edit', inputName, inputDescription);

const popupEditProfile = new PopupWithForm({
  modal: '.popup-edit',
  formSubmitHandler: () => {
    userInfo.setUserInfo();
  }
});

const popupAddImages = new PopupWithForm({
  modal: '.popup-add',
  formSubmitHandler: () => {
    const card = new Card(
      createObjectUserCard(),
      '#card'
    );
    const cardElement = card.generateCard();
    cardsList.prepend(cardElement);
  }
});

//========== сабмиты ==========
btnSendEdit.addEventListener('click', (evt) => {
  evt.preventDefault();
  popupEditProfile.submit();
  popupEditProfile.close();
});

btnSendAdd.addEventListener('click', (evt) => {
  evt.preventDefault();
  popupAddImages.submit();
  popupAddImages.close();
});

//========== стартовые карточки появляются на странице =========
const cards = new Section({
  items: initialCards,
  renderer: (element) => {
    const card = new Card(element, '#card');
    const cardElement = card.generateCard();
    cards.addItem(cardElement);
  }},
  '.elements__list'
);
cards.renderItems();

//========== зовём попапы ==========
btnEdit.addEventListener('click', () => {
  const popup = new Popup ('.popup-edit');
  popup.open();
  btnSendEnabled(btnSendEdit, validationConfig); // включается кнопка при окрытии формы редактирования
  userInfo.getUserInfo();                        // профиля, после того как закрыли невалидную форму
});

btnAdd.addEventListener('click', () => {
  const popup = new Popup ('.popup-add');
  popup.open();
  btnSendDisabled(btnSendAdd, validationConfig); // отключается кнопка на невалидной форме до начала ввода
});

//========== попап с картинкой ===========

const popupWithImg = new PopupWithImage('.img-popup');

export function handleOpenPopupImg(name, link) {
  popupWithImg.open(name, link);
}

//========== Включение валидации ==========
const formAdd = new FormValidator(validationConfig, '.form-add');
const formEdit = new FormValidator(validationConfig, '.form-edit');
formAdd.enableValidation();
formEdit.enableValidation();
