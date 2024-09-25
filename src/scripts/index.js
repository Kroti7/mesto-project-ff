import '../pages/index.css';

import initialCards from './cards-default.js';
import {deleteCardCallback, createCard} from './cards-logic.js';
import {openPopup, closePopup} from './modal.js';

const cardList = document.querySelector('.places__list');

/* Логика попапа*/
const popupCreateCard = document.querySelector('.popup_type_new-card');
const btnOpenPopupCreateCard = document.querySelector('.profile__add-button');
const btnsClosePopups = document.querySelectorAll('.popup__close');

const closePopupByEsc = function(evt) {
  if(evt.key === 'Escape') {
     closePopup(document.querySelector('.popup_is-opened'), clickOutOfPopup, closePopupByEsc);
  }
}

const clickOutOfPopup = function(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    closePopup(document.querySelector('.popup_is-opened'), clickOutOfPopup, closePopupByEsc);
  }
}

/* Функция для открытия попапа картинки */
const openImgPopup = function(imgSrc, imgName) {
  const cardPopup = document.querySelector('.popup_type_image');
  cardPopup.classList.toggle('popup_is-opened')

  const cardPopupImg = cardPopup.querySelector('.popup__image');
  cardPopupImg.src = imgSrc;

  const cardPopupImgTitile = cardPopup.querySelector('.popup__caption');
  cardPopupImgTitile.textContent = imgName;

  cardPopup.addEventListener('click', clickOutOfPopup, { once: true });
  document.addEventListener('keydown', closePopupByEsc, { once: true });
};

btnOpenPopupCreateCard.addEventListener('click', function() {
  openPopup(popupCreateCard);

  popupCreateCard.addEventListener('click', clickOutOfPopup, { once: true });
  document.addEventListener('keydown', closePopupByEsc, { once: true });
});

btnsClosePopups.forEach(btn => {
  btn.addEventListener('click', () => {
    closePopup(btn.closest('.popup'))
  });
});

/* Кнопка добавления карточки */
const btnAdd = popupCreateCard.querySelector('.popup__button');
const imgName = popupCreateCard.querySelector('.popup__input_type_card-name');
const imgURL = popupCreateCard.querySelector('.popup__input_type_url');


btnAdd.addEventListener('click', function() {
  const cardToAdd = createCard(imgName.value, imgURL.value, deleteCardCallback, openImgPopup);
  cardList.prepend(cardToAdd)

  imgName.value = '';
  imgURL.value = '';

  const popupToClose = btnAdd.closest('.popup');
  closePopup(popupToClose);
});

/* Вывод начальных карточек на страницу */
initialCards.forEach(card => {
  const cardToAdd = createCard(card.name, card.link, deleteCardCallback, openImgPopup);
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
  openPopup(popupEditProfile);

  popupEditProfile_nameValue.value = profileName.textContent;
  popupEditProfile_jobDesc.value = profileJobDesc.textContent;

  popupEditProfile.addEventListener('click', clickOutOfPopup, { once: true });
  document.addEventListener('keydown', closePopupByEsc, { once: true });
});

const btnSaveNewProfile = popupEditProfile.querySelector('.popup__button');

btnSaveNewProfile.addEventListener('click', function(event) {
  profileName.textContent = popupEditProfile_nameValue.value;
  profileJobDesc.textContent = popupEditProfile_jobDesc.value;

  popupEditProfile.removeEventListener('click', clickOutOfPopup);
  document.removeEventListener('keydown', closePopupByEsc); 

  closePopup(popupEditProfile);
  event.preventDefault();
});