import './index.css';
import {
  validationConfig,
  btnEdit,
  btnAdd,
  btnEditAvatar,
  btnSendEdit,
  btnSendAdd,
  btnSendEditAvatar,
  inputName,
  inputDescription,
  avatar,
  api
} from '../utils/constants.js';

import {
  btnSendDisabled,
  btnSendEnabled,
  renderCards
} from '../utils/utils.js';

import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api.js';

//========== Стартовые запросы к серверу =========

// Токен: 472aece0-2f86-4f21-9fde-a58207ebc3ea
// Идентификатор группы: cohort-14


//========== Стартовые данные ==========

api.getStartData().then(items => { //отрисовка стартовых данных
  const [ CurrentUser, initialCards ] = items;
  userInfo.setUserInfo(CurrentUser); // отрисовка иноформации о пользователе
  avatar.src = CurrentUser.avatar;   // отрисовка аватарки
  const cards = new Section({        // отрисовка полученных карточек
    items: initialCards,
    renderer: (item) => {
      cards.addStartItems(renderCards(item));
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
      authorization: '472aece0-2f86-4f21-9fde-a58207ebc3ea',
      name: formValues.name,
      about: formValues.info
    });
    changeUserInfo.changeUserInfo().then(items => {
      userInfo.setUserInfo(items);
    })
    .catch(res => console.log(res))
    .finally(() => {
      popupEditProfile.close();
      btnSendEdit.textContent = 'Сохранить'
    });
  }
});

//========== Редактирование Юзер аватар =========

const popupEditAvatar = new PopupWithForm({
  modal: '.popup-edit-avatar',
  formSubmitHandler: (formValues) => {
    const changeUserAvatar = new Api({
      baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/users/me/avatar',
      authorization: '472aece0-2f86-4f21-9fde-a58207ebc3ea',
      about: formValues.avatar
    })
    changeUserAvatar.changeAvatar()
    .then(res => {
      document.querySelector('.profile__avatar').src = res.avatar;
    })
    .finally(() => {
      popupEditAvatar.close();
      btnSendEditAvatar.textContent = 'Сохранить'
    });
  }
})
//========== Добавление новой карточки =========

const popupAddImages = new PopupWithForm({
  modal: '.popup-add',
  formSubmitHandler: (data) => {
    let userCard = data;
    const apiNewCard = new Api({  // Запрос на добавление новой карточки
      baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/',
      authorization: '472aece0-2f86-4f21-9fde-a58207ebc3ea',
      name: userCard['name-add'],
      about: userCard['description-add']
    });
    apiNewCard.addCard().then(items => {
      const cards = new Section({
        items: items,
        renderer: (item) => {
          cards.addItem(renderCards(item));
        }},
        '.elements__list'
      );
      cards.renderItem();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupAddImages.close();
      btnSendAdd.textContent = 'Создать'
    });
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
