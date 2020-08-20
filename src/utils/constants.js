export const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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

export const btnSendEdit = document.querySelector('.form__btn-send-edit');
export const btnSendAdd = document.querySelector('.form__btn-send-add');

export const inputName = document.querySelector('.form__input_name');
export const inputDescription = document.querySelector('.form__input_description');

export const inputNameAdd = document.querySelector('.form__input_name-add');
export const inputDescriptionAdd = document.querySelector('.form__input_description-add');

export const formInputs = document.querySelectorAll('.form__input');
export const formErrors = document.querySelectorAll('.form__input-error');

export let userCards = {}; //будущий массив с данными о картинке пользователя
