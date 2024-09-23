import {pressEscToClosePopup, clickOutOfPopup, closeOpenedPopup} from './modual.js';
/* Функция удаления карточки */

function deleteCardCallback(evt) {
  const cardToRemove = evt.target.closest('.card');
  cardToRemove.remove();
}


function createCard(imgName, imgSrc, delFunc) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImg = cardElement.querySelector('.card__image');

  cardTitle.textContent = imgName;
  cardImg.src = imgSrc;
  cardImg.alt = 'Картинка карточки';

  /* Открытие картинки */
  cardImg.addEventListener('click', function() {
    const cardPopup = document.querySelector('.popup_type_image');
    cardPopup.classList.toggle('popup_is-opened')

    const cardPopupImg = cardPopup.querySelector('.popup__image');
    cardPopupImg.src = imgSrc;

    const cardPopupImgTitile = cardPopup.querySelector('.popup__caption');
    cardPopupImgTitile.textContent = imgName;

    cardPopup.addEventListener('click', clickOutOfPopup, { once: true });
    document.addEventListener('keydown', pressEscToClosePopup, { once: true });
  });

  /* Кнопка удаления карточки */
  const deleteBtn = cardElement.querySelector('.card__delete-button');
  deleteBtn.setAttribute('aria-label', 'Удалить карточку');
  deleteBtn.addEventListener('click', delFunc);

  /* Кнопка лайка */
  const likeBtn = cardElement.querySelector('.card__like-button');
  likeBtn.setAttribute('aria-label', 'Поставить лайк');
  likeBtn.addEventListener('click', function() {
    likeBtn.classList.toggle('card__like-button_is-active');
  });

  return cardElement;
}

export {deleteCardCallback, createCard, pressEscToClosePopup}