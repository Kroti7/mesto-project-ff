import '../pages/index.css';

import initialCards from './cards-default.js';
import {deleteCardCallback, createCard} from './cards-logic.js';
import {pressEscToClosePopup, clickOutOfPopup, closeOpenedPopup} from './modual.js';

/* Функция добавления карточки */
const cardList = document.querySelector('.places__list');

/* Логика попапа*/
const popupCreateCard = document.querySelector('.popup_type_new-card');
const btnOpenPopupCreateCard = document.querySelector('.profile__add-button');
const btnsClosePopups = document.querySelectorAll('.popup__close');

btnOpenPopupCreateCard.addEventListener('click', function() {
  popupCreateCard.classList.toggle('popup_is-opened');

  popupCreateCard.addEventListener('click', clickOutOfPopup, { once: true });
  document.addEventListener('keydown', pressEscToClosePopup, { once: true });
});

btnsClosePopups.forEach(btn => {
  btn.addEventListener('click', closeOpenedPopup);
});

/* Кнопка добавления карточки */
const btnAdd = popupCreateCard.querySelector('.popup__button');
const imgName = popupCreateCard.querySelector('.popup__input_type_card-name');
const imgURL = popupCreateCard.querySelector('.popup__input_type_url');


btnAdd.addEventListener('click', function() {
  const cardToAdd = createCard(imgName.value, imgURL.value, deleteCardCallback);
  cardList.append(cardToAdd)

  imgName.value = '';
  imgURL.value = '';

  const popupToClose = btnAdd.closest('.popup');
  popupToClose.classList.toggle('popup_is-opened');
});

/* Вывод начальных карточек на страницу */
initialCards.forEach(card => {
  const cardToAdd = createCard(card.name, card.link, deleteCardCallback);
  cardList.append(cardToAdd)
});


/* Редактирование профиля */

const btnEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');

const profileName = document.querySelector('.profile__title');
const profileJobDesc = document.querySelector('.profile__description');

const popupEditProfile_nameValue = document.querySelector('.popup__input_type_name');
const popupEditProfile_jobDesc = document.querySelector('.popup__input_type_description');

btnEditProfile.addEventListener('click', function() {
  popupEditProfile.classList.toggle('popup_is-opened');

  popupEditProfile_nameValue.value = profileName.textContent;
  popupEditProfile_jobDesc.value = profileJobDesc.textContent;

  popupEditProfile.addEventListener('click', clickOutOfPopup, { once: true });
  document.addEventListener('keydown', pressEscToClosePopup, { once: true });  
});


const btnSaveNewProfile = popupEditProfile.querySelector('.popup__button');

btnSaveNewProfile.addEventListener('click', function(event) {
  profileName.textContent = popupEditProfile_nameValue.value;
  profileJobDesc.textContent = popupEditProfile_jobDesc.value;

  popupEditProfile.removeEventListener('click', clickOutOfPopup);
  document.removeEventListener('keydown', pressEscToClosePopup); 

  popupEditProfile.classList.toggle('popup_is-opened');
  event.preventDefault();
});


