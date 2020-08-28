import {userCards, inputNameAdd, inputDescriptionAdd, apiAddLike, apiDelLike} from './constants.js';

export function btnSendDisabled (button) { // функция отключения кнопки
  button.classList.add('form__btn-send_disabled');
  button.setAttribute('disabled', true);
}

export function btnSendEnabled (button) { // функция включения кнопки
  button.classList.remove('form__btn-send_disabled');
  button.removeAttribute('disabled');
}

export function clearBorderError (inputElement, config) { // очистка красной границы
  inputElement.classList.remove(config.inputError);
}

export function createObjectUserCard() {   // создание массива с данными карточки пользователя
  userCards.name = inputNameAdd.value;
  userCards.link = inputDescriptionAdd.value;
  return userCards;
}

// Когда впервые отрисовывается страница, то идет поиск наших лайков и если есть они
// помечаются классом btn_like_active,
// поэтому при динамическом изменении лайков, я сначала ищу есть ли этот класс:

export function togleLikes(target, id, likeCount) {
  if(target.classList.contains('btn_like_active')) {
    apiDelLike.dislike(id)
    .then(res => {
      target.classList.remove('btn_like_active');
      const likes = res.likes;
      likeCount.textContent = likes.length;
    })
    .catch(err => console.log(err))
  } else {
    apiAddLike.like(id)
    .then(res => {
      target.classList.add('btn_like_active');
      const likes = res.likes;
      likeCount.textContent = likes.length;
    })
    .catch(err => console.log(err))
  }
}
