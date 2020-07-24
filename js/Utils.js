
function btnSendDisabled (button) { // функция отключения кнопки
  button.classList.add('form__btn-send_disabled');
  button.setAttribute('disabled', true);
}

function btnSendEnabled (button) { // функция включения кнопки
  button.classList.remove('form__btn-send_disabled');
  button.removeAttribute('disabled');
}

export {btnSendDisabled, btnSendEnabled};
