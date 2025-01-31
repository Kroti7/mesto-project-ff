import '../pages/index.css';

// import initialCards from './cards-default.js';
import {createCard} from './cards-logic.js';
import {openPopup, closePopup} from './modal.js';
import {enableValidation} from './validation.js';
import {deleteCardAPI, getProfile, getCards, updateProfile, addCardAPI, showSaving, catchError, addCardLike, removeCardLike, updateAvatar} from './server-api.js';

const cardList = document.querySelector('.places__list');

/* Логика попапа*/
const popupCreateCard = document.querySelector('.popup_type_new-card');
const btnOpenPopupCreateCard = document.querySelector('.profile__add-button');
const btnsClosePopups = document.querySelectorAll('.popup__close');


/* Функция для открытия попапа картинки */
const openImgPopup = function(imgSrc, imgName) {
  const cardPopup = document.querySelector('.popup_type_image');
  openPopup(cardPopup);

  const cardPopupImg = cardPopup.querySelector('.popup__image');
  cardPopupImg.src = imgSrc;

  const cardPopupImgTitile = cardPopup.querySelector('.popup__caption');
  cardPopupImgTitile.textContent = imgName;
};

/* Загрузка профиля и добавление карточек */
const profileElement = document.querySelector('.profile')
const profileName = profileElement.querySelector('.profile__title');
const profileJobDesc = profileElement.querySelector('.profile__description');
const profileImg = profileElement.querySelector('.profile__image');

let userID = '';

Promise.all([getProfile(), getCards()])
  .then(([profileData, cardsData]) => {
    profileName.textContent = profileData.name;
    profileJobDesc.textContent = profileData.about;
    profileImg.style.backgroundImage = `url(${profileData.avatar})`;

    userID = profileData._id;
    cardsData.forEach(cardData => {
      const cardToAdd = createCard(cardData, deleteCardCallback, likeHandler, openImgPopup, userID);
      cardList.append(cardToAdd);
    });
  })


/* Функция удаления карточки */
function deleteCardCallback(evt, cardId) {
  deleteCardAPI(cardId)
    .then(() => {
      const cardToRemove = evt.target.closest('.card');
      cardToRemove.remove();
    })
    .catch((err) => {
      catchError(err)
    })
};

/* Функция лайка карточки */
function likeHandler(likeBtn, cardID, cardLikesCounter) {
  if (likeBtn.classList.contains('card__like-button_is-active')) {
    addCardLike(cardID)
    .then((res) => {
      cardLikesCounter.textContent = res.likes.length;
    })
  } else {
    removeCardLike(cardID)
    .then((res) => {
      cardLikesCounter.textContent = res.likes.length;
    })
  }
}

/* Открытие попапа добавление карточки */
btnOpenPopupCreateCard.addEventListener('click', function() {
  openPopup(popupCreateCard);
});

/* Закрытие попапов по крестику */
btnsClosePopups.forEach(btn => {
  btn.addEventListener('click', () => {
    closePopup(btn.closest('.popup'));
  });
});

/* Кнопка добавления карточки */
const addCardForm = popupCreateCard.querySelector('.popup__form');
const btnAdd = popupCreateCard.querySelector('.popup__button');
const imgName = popupCreateCard.querySelector('.popup__input_type_card-name');
const imgURL = popupCreateCard.querySelector('.popup__input_type_url');

/* Добавление карточки */
btnAdd.addEventListener('click', function(evt) {
  evt.preventDefault();

  const cardData = {link: imgURL.value, name: imgName.value};
  showSaving(true, btnAdd);
  addCardAPI(cardData.name, cardData.link)
    .then((uploadedCardData) => {
      const cardToAdd = createCard(uploadedCardData, deleteCardCallback, likeHandler,openImgPopup, userID);
      cardList.prepend(cardToAdd);
    
      imgName.value = '';
      imgURL.value = '';
    
      const popupToClose = btnAdd.closest('.popup');
      closePopup(popupToClose);
    })
    .finally(() => {
      showSaving(false, btnAdd);
    })

});


/* Редактирование профиля */

const btnEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');

const popupEditProfile_nameValue = document.querySelector('.popup__input_type_name');
const popupEditProfile_jobDesc = document.querySelector('.popup__input_type_description');

btnEditProfile.addEventListener('click', function() {
  openPopup(popupEditProfile);

  popupEditProfile_nameValue.value = profileName.textContent;
  popupEditProfile_jobDesc.value = profileJobDesc.textContent;
});

const btnSaveNewProfile = popupEditProfile.querySelector('.popup__button');

btnSaveNewProfile.addEventListener('click', function(event) {
  event.preventDefault();
  showSaving(true, btnSaveNewProfile);

  updateProfile(popupEditProfile_nameValue.value, popupEditProfile_jobDesc.value)
    .then(() => {
      profileName.textContent = popupEditProfile_nameValue.value;
      profileJobDesc.textContent = popupEditProfile_jobDesc.value;
      showSaving(false, btnSaveNewProfile);
    })
});

/* Редактирование аватара  */
const popupEditProfileAvatar = document.querySelector('.popup_type_upload-avatar');
const popupEditProfileAvatar_url = popupEditProfileAvatar.querySelector('.popup__input_avatar_url');

profileImg.addEventListener('click', function(event) {
  openPopup(popupEditProfileAvatar);
});

const btnUpdateProfileAvatar = popupEditProfileAvatar.querySelector('.popup__button');
btnUpdateProfileAvatar.addEventListener('click', (event) => {
  event.preventDefault();
  showSaving(true, btnUpdateProfileAvatar);
  
  updateAvatar(popupEditProfileAvatar_url.value)
  .then(() => {
    getProfile()
    .then((updatedProfile) => {
      profileImg.style.backgroundImage = `url(${updatedProfile.avatar})`;
    })
  })
  .finally(() => {
    showSaving(false, btnUpdateProfileAvatar)
  })
});

/* Включение валидации форм */

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 