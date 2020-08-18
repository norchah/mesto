export const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      alt:  'Горы Архыза'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
      alt:  'Озера  в окружении заснеженных холмов и леса'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      alt:  'Советская застройка "коробками"'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
      alt:  'Один из потухших вулканов Камчатки'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
      alt:  'Железная дорога, уходящая в горизонт'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
      alt:  'Заснеженный кряж на берегу Байкала'
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

export const imgPopup = document.querySelector('.img-popup');
export const imgPopupContainer = document.querySelector('.img-popup__container');
export const imgPopupImage = document.querySelector('.img-popup__img');
export const cardsList = document.querySelector('.elements__list');

export const btnEdit = document.querySelector('.btn_edit');
export const btnAdd = document.querySelector('.btn_add');
export const btnCloseImg = document.querySelector('.img-popup__btn-close');
export const btnSendEdit = document.querySelector('.form__btn-send-edit');
export const btnSendAdd = document.querySelector('.form__btn-send-add');

export const inputName = document.querySelector('.form__input_name');
export const inputDescription = document.querySelector('.form__input_description');
export const userName = document.querySelector('.profile__title');
export const userDescription = document.querySelector('.profile__subtitle');

export const inputNameAdd = document.querySelector('.form__input_name-add');
export const inputDescriptionAdd = document.querySelector('.form__input_description-add');
export const formInputs = document.querySelectorAll('.form__input');
export const formErrors = document.querySelectorAll('.form__input-error');

export let userCards = []; //будущий массив с данными о картинке пользователя
