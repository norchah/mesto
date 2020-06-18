let btnEdit = document.querySelector('.btn_edit');
let btnClose = document.querySelector('.popup__btn-close');
let btnSend = document.querySelector('.form__btn-send');

let popup = document.querySelector('.popup');

let inputName = document.querySelector('.form__input_name');
let inputDescription = document.querySelector('.form__input_description');
let userName = document.querySelector('.profile__title');
let userDescription = document.querySelector('.profile__subtitle');


function openPopup() {
  popup.classList.remove('popup_closed');
  inputName.value = userName.textContent;
  inputDescription.value = userDescription.textContent;
}

function closePopup() {
  popup.classList.add('popup_closed');
}

function sendForm() {
  event.preventDefault();
  popup.classList.add('popup_closed')
  userName.textContent = inputName.value;
  userDescription.textContent = inputDescription.value;
}

btnEdit.addEventListener('click', openPopup);
btnClose.addEventListener('click', closePopup);
btnSend.addEventListener('click', sendForm);
