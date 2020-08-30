import { popupDelete, api } from "./constants.js";

import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";

export function btnSendDisabled(button) {
  // функция отключения кнопки
  button.classList.add("form__btn-send_disabled");
  button.setAttribute("disabled", true);
}

export function btnSendEnabled(button) {
  // функция включения кнопки
  button.classList.remove("form__btn-send_disabled");
  button.removeAttribute("disabled");
}

export function clearBorderError(inputElement, config) {
  // очистка красной границы
  inputElement.classList.remove(config.inputError);
}

// Когда впервые отрисовывается страница, то идет поиск наших лайков и если есть они
// помечаются классом btn_like_active,
// поэтому при динамическом изменении лайков, я сначала ищу есть ли этот класс:

export function togleLikes(target, id, likeCount) {
  if (target.classList.contains("btn_like_active")) {
    api
      .dislike(id)
      .then((res) => {
        target.classList.remove("btn_like_active");
        const likes = res.likes;
        likeCount.textContent = likes.length;
      })
      .catch((err) => console.log(err));
  } else {
    api
      .like(id)
      .then((res) => {
        target.classList.add("btn_like_active");
        const likes = res.likes;
        likeCount.textContent = likes.length;
      })
      .catch((err) => console.log(err));
  }
}

export function renderCards(item) {
  const card = new Card(
    {
      name: item.name,
      link: item.link,
      like: item.likes,
      id: item._id,
      ownerId: item.owner._id,
      handleCardClick: (name, link) => {
        // колбэк для попапа с картинкой
        const popupWithImg = new PopupWithImage(".img-popup");
        popupWithImg.open(name, link);
      },
      handleCardDelete: (id, target) => {
        // колбэк для удаления
        popupDelete.open();
        popupDelete.submitAction(id, target);
      },
      handleCardLike: (target, id, likeCount) => {
        togleLikes(target, id, likeCount);
      },
    },
    "#card"
  );
  return card.generateCard();
}
