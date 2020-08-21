import './index.css';
import {
  validationConfig,
  initialCards,
  btnEdit,
  btnAdd,
  btnSendEdit,
  btnSendAdd,
  inputName,
  inputDescription
} from '../utils/constants.js';
import {
  btnSendDisabled,
  btnSendEnabled,
  createObjectUserCard
} from '../utils/utils.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';


//========== стартовые карточки появляются на странице =========
const cards = new Section({
  items: initialCards,
  renderer: (element) => {
    const card = new Card({
      name: element.name,
      link: element.link,
      handleCardClick: (name, link) => {
        const popupWithImg = new PopupWithImage('.img-popup');
        popupWithImg.open(name, link);
      }
    },
    '#card'
    );
    const cardElement = card.generateCard();
    cards.addItem(cardElement);
  }},
  '.elements__list'
);
cards.renderItems();

//========== копии классов ==========
const userInfo = new UserInfo ({
  name: '.profile__title',
  info: '.profile__subtitle'
  },
  '.profile'
);


const popupEditProfile = new PopupWithForm({
  modal: '.popup-edit',
  formSubmitHandler: () => {
    userInfo.setUserInfo();
  }
});

const popupAddImages = new PopupWithForm({
  modal: '.popup-add',
  formSubmitHandler: () => {
    const userCards = createObjectUserCard();
    const card = new Card({
      name: userCards.name,
      link: userCards.link,
      handleCardClick: (name, link) => {
        const popupWithImg = new PopupWithImage('.img-popup');
        popupWithImg.open(name, link);
      }
    },
    '#card'
    );

    const cardElement = card.generateCard();
    cards.addItem(cardElement);
    const btnDel = document.createElement('button');/////////////
    btnDel.className = 'btn btn_delete';/////////////////////////
    document.querySelector('.element').append(btnDel);///////////
    console.log(document.querySelector('.element'));
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


//========== зовём попапы ==========
btnEdit.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputDescription.value = userData.info;
  popupEditProfile.open();
  btnSendEnabled(btnSendEdit, validationConfig); // включается кнопка при окрытии формы редактирования профиля, после того как закрыли невалидную форму
});

btnAdd.addEventListener('click', () => {
  popupAddImages.open();
  btnSendDisabled(btnSendAdd, validationConfig); // отключается кнопка на невалидной форме до начала ввода
});


//========== Включение валидации ==========
const formAdd = new FormValidator(validationConfig, '.form-add');
const formEdit = new FormValidator(validationConfig, '.form-edit');
formAdd.enableValidation();
formEdit.enableValidation();
