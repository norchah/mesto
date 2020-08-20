import {userCards, inputNameAdd, inputDescriptionAdd} from './constants.js';

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
