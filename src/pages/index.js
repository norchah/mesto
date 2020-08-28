import './index.css';
import {
  validationConfig,
  btnEdit,
  btnAdd,
  btnEditAvatar,
  btnSendEdit,
  btnSendAdd,
  btnSendDel,
  btnSendEditAvatar,
  inputName,
  inputDescription,
  avatar
} from '../utils/constants.js';

import {
  btnSendDisabled,
  btnSendEnabled,
  createObjectUserCard,
  togleLikes
} from '../utils/utils.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupDelete from '../components/PopupDelete.js';
import Api from '../components/Api.js';

//========== Стартовые запросы к серверу =========

// Токен: 472aece0-2f86-4f21-9fde-a58207ebc3ea
// Идентификатор группы: cohort-14

const apiGetRequire = new Api({  //  GET запрос с авторизацией, для получения стартовых данных
  cardsUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/cards',
  userUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/users/me',
  method: 'GET',
  authorization: '472aece0-2f86-4f21-9fde-a58207ebc3ea',
});

const apiDeleteCard = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/cards/',
  method: 'DELETE',
  authorization: '472aece0-2f86-4f21-9fde-a58207ebc3ea'
});


//========== Попап для подтверждения удаления ==========

const popupDelete = new PopupDelete({
  modal: '.popup-delete',
  submitHandler: (id, target) => { //колбэк в попап подтверждения
    btnSendDel.textContent = 'Удаление...';
    apiDeleteCard.deleteCard(id)
    .then(() => {
      target.closest('.element').remove();

    })
    .catch(err => console.log(err))
    .finally(
      popupDelete.close()
      );
  }
});


//========== Стартовые данные ==========

apiGetRequire.getStartData().then(items => { //отрисовка стартовых данных
  const [ CurrentUser, initialCards ] = items;
  userInfo.setUserInfo(CurrentUser); // отрисовка иноформации о пользователе
  avatar.src = CurrentUser.avatar;   // отрисовка аватарки
  const cards = new Section({        // отрисовка полученных карточек
    items: initialCards,
    renderer: (element) => {
      const card = new Card({
        name: element.name,
        link: element.link,
        like: element.likes,
        id: element._id,
        ownerId: element.owner._id,
        handleCardClick: (name, link) => { // колбэк для попапа с картинкой
          const popupWithImg = new PopupWithImage('.img-popup');
          popupWithImg.open(name, link);
        },
        handleCardDelete: (id, target) => { // колбэк для удаления
          popupDelete.open();
          popupDelete.submitAction(id, target);
        },
        handleCardLike: (target, id, likeCount) => {
          togleLikes(target, id, likeCount);
        }
      },
      '#card'
      );
      const cardElement = card.generateCard();
      cards.addStartItems(cardElement);
    }},
    '.elements__list'
  );
  cards.renderItems();
}).catch(res => console.log(res));

//========== Стартовые данные. Конец ==========



//========== Редактирование Юзер Инфо =========

const popupEditProfile = new PopupWithForm({
  modal: '.popup-edit',
  formSubmitHandler: (formValues) => {
    const changeUserInfo = new Api({  // запрос на сервер для изменения юзер инфо
      baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/users/me',
      method: 'PATCH',
      authorization: '472aece0-2f86-4f21-9fde-a58207ebc3ea',
      contentType: 'application/json',
      name: formValues.name,
      about: formValues.info
    });
    changeUserInfo.changeUserInfo().then(items => {
      userInfo.setUserInfo(items);

    }).catch(res => console.log(res))
      .finally(popupEditProfile.close());
  }
});


//========== Редактирование Юзер аватар =========

const popupEditAvatar = new PopupWithForm({
  modal: '.popup-edit-avatar',
  formSubmitHandler: (formValues) => {
    const changeUserAvatar = new Api({
      baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/users/me/avatar',
      method: 'PATCH',
      authorization: '472aece0-2f86-4f21-9fde-a58207ebc3ea',
      contentType: 'application/json',
      about: formValues.avatar
    })
    changeUserAvatar.changeAvatar()
    .then(res => {
      document.querySelector('.profile__avatar').src = res.avatar;
    })
    .finally(popupEditAvatar.close());
  }
})
//========== Добавление новой карточки =========

const popupAddImages = new PopupWithForm({
  modal: '.popup-add',
  formSubmitHandler: () => {
    let userCard = createObjectUserCard();
    const apiNewCard = new Api({  // Запрос на добавление новой карточки
      baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/cards',
      method: 'POST',
      authorization: '472aece0-2f86-4f21-9fde-a58207ebc3ea',
      contentType: 'application/json',
      name: userCard.name,
      about: userCard.link
    });
    apiNewCard.addCard().then(items => {
      const cards = new Section({
        items: items,
        renderer: (item) => {
          const card = new Card({
            name: item.name,
            link: item.link,
            like: item.likes,
            id: item._id,
            ownerId: item.owner._id,
            handleCardClick: (name, link) => { // колбэк для попапа с картинкой
              const popupWithImg = new PopupWithImage('.img-popup');
              popupWithImg.open(name, link);
            },
            handleCardDelete: (id, target) => { // колбэк для удаления
              popupDelete.open();
              popupDelete.submitAction(id, target);
            },
            handleCardLike: (target, id, likeCount) => {
              togleLikes(target, id, likeCount);
            }
          },
          '#card'
          );
          const cardElement = card.generateCard();
          cards.addItem(cardElement);
        }},
        '.elements__list'
      );
      cards.renderItem();
    })
    .catch(err => console.log(err))
    .finally(popupAddImages.close());
   }
  });

//========== копии классов ==========

const userInfo = new UserInfo ({
  name: '.profile__title',
  info: '.profile__subtitle',
  avatar: '.profile__avatar'
  },
  '.profile'
);

//========== сабмиты ==========
btnSendEdit.addEventListener('click', (evt) => {
  evt.preventDefault();
  btnSendEdit.textContent = 'Сохранение...';
  popupEditProfile.submit();

});

btnSendEditAvatar.addEventListener('click', (evt) => {
  evt.preventDefault();
  btnSendEditAvatar.textContent = 'Обновление...';
  popupEditAvatar.submit();
});

btnSendAdd.addEventListener('click', (evt) => {
  evt.preventDefault();
  btnSendAdd.textContent = 'Создание...';
  popupAddImages.submit();
});

//========== зовём попапы ==========
btnEditAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
  btnSendDisabled(btnSendEditAvatar, validationConfig); // отключается кнопка на невалидной форме до начала ввода
});

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
const formEditAvatar = new FormValidator(validationConfig, '.form-edit-avatar');
formAdd.enableValidation();
formEdit.enableValidation();
formEditAvatar.enableValidation();
