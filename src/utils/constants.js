import Api from '../components/Api.js';

export const validationConfig = {
  form: '.form',
  formInput: '.form__input',
  inputError: 'form__input_error',
  formInputError: 'form__input-error',
  formInputErrorHidden: 'form__input-error_hidden',
  btnSend: '.form__btn-send',
  btnSendDisabled: 'form__btn-send_disabled'
}

export const imgPopupImage = document.querySelector('.img-popup__img');

export const btnEdit = document.querySelector('.btn_edit');
export const btnAdd = document.querySelector('.btn_add');
export const btnEditAvatar = document.querySelector('.profile__btn-edit-avatar');

export const btnSendEdit = document.querySelector('.form__btn-send-edit');
export const btnSendAdd = document.querySelector('.form__btn-send-add');
export const btnSendDel = document.querySelector('.popup-delete__btn-send');
export const btnSendEditAvatar = document.querySelector('.form__btn-send-edit-avatar');

export const inputName = document.querySelector('.form__input_name');
export const inputDescription = document.querySelector('.form__input_description');

export const inputNameAdd = document.querySelector('.form__input_name-add');
export const inputDescriptionAdd = document.querySelector('.form__input_description-add');

export const formInputs = document.querySelectorAll('.form__input');
export const formErrors = document.querySelectorAll('.form__input-error');

export const avatar = document.querySelector('.profile__avatar');

export let userCards = {}; //будущий массив с данными о картинке пользователя

export const apiAddLike = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/cards/likes/',
  method: 'PUT',
  authorization: '472aece0-2f86-4f21-9fde-a58207ebc3ea'
});

export const apiDelLike = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/cards/likes/',
  method: 'DELETE',
  authorization: '472aece0-2f86-4f21-9fde-a58207ebc3ea'
});
