import '../pages/index.css';

// import initialCards from './cards-default.js';
import {createCard} from './cards-logic.js';
import {openPopup, closePopup} from './modal.js';
import {enableValidation} from './validation.js';
import {deleteCardAPI, getProfile, getCards, updateProfile, addCardAPI, addCardLike, removeCardLike, updateAvatar} from './server-api.js';

const cardList = document.querySelector('.places__list');

/* Логика попапа*/
const popupCreateCard = document.querySelector('.popup_type_new-card');
const btnOpenPopupCreateCard = document.querySelector('.profile__add-button');
const btnsClosePopups = document.querySelectorAll('.popup__close');


/* Функция для открытия попапа картинки */
const cardPopup = document.querySelector('.popup_type_image');
const cardPopupImg = cardPopup.querySelector('.popup__image');
const cardPopupImgTitile = cardPopup.querySelector('.popup__caption');

const openImgPopup = function(imgSrc, imgName) {
  openPopup(cardPopup);

  cardPopupImg.src = imgSrc;
  cardPopupImg.alt = `Изображение ${imgName}`;
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
  .catch((err) => {
    catchError(err);
  })


/* Функция удаления карточки */
function deleteCardCallback(evt, cardId) {
  deleteCardAPI(cardId)
    .then((res) => {
      if (res.ok) {
        const cardToRemove = evt.target.closest('.card');
        cardToRemove.remove();
      } else {
        return Promise.reject(`Ошибка ${res.status}`);
      }      
    })
    .catch((err) => {
      catchError(err);
    })
};

/* Функция лайка карточки */
function likeHandler(likeBtn, cardID, cardLikesCounter) {
  if (!likeBtn.classList.contains('card__like-button_is-active')) {
    addCardLike(cardID)
    .then((res) => {
      cardLikesCounter.textContent = res.likes.length;
      likeBtn.classList.toggle('card__like-button_is-active');
    })
    .catch((err) => {
      console.log(err);
    })
  } else {
    removeCardLike(cardID)
    .then((res) => {
      cardLikesCounter.textContent = res.likes.length;
      likeBtn.classList.toggle('card__like-button_is-active');
    })
    .catch((err) => {
      console.log(err);
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

/* Слишком умная логика для глупой кнопки, чтоб пользователь понимал(и прощал) */
const changeElementTextColor = (element, textContent, status = "none") => {
  element.textContent = textContent;

  switch (status.toLowerCase()) {
    case "none":
      element.classList.remove('popup__button-succes');
      element.classList.remove('popup__button-fail');
      break;
    case "success":
      element.classList.add('popup__button-succes');
      break;
    case "fail":
      element.classList.add('popup__button-fail');
      break;
  }
}

const showProgressBtn = (status, buttonElement) => {
  switch (status.toLowerCase()) {
    case "loading":  
      changeElementTextColor(buttonElement, 'Сохранение...');
      buttonElement.style.cursor = 'progress';  
      break;
    case "success":
      buttonElement.style.cursor = null; 
      changeElementTextColor(buttonElement, 'Сохранено!', "success");
      setTimeout(changeElementTextColor, 3000, buttonElement, 'Сохранить')
      break;
    case "fail":
      buttonElement.style.cursor = null; 
      changeElementTextColor(buttonElement, 'Ошибка! :С', "fail");
      setTimeout(changeElementTextColor, 3000, buttonElement, 'Сохранить')
      break;
  }
}

/* Кнопка добавления карточки */
const btnAdd = popupCreateCard.querySelector('.popup__button');
const imgName = popupCreateCard.querySelector('.popup__input_type_card-name');
const imgURL = popupCreateCard.querySelector('.popup__input_type_url');

/* Добавление карточки */
btnAdd.addEventListener('click', function(evt) {
  evt.preventDefault();

  const cardData = {link: imgURL.value, name: imgName.value};
  showProgressBtn("loading", btnAdd);
  addCardAPI(cardData.name, cardData.link)
    .then((uploadedCardData) => {
      const cardToAdd = createCard(uploadedCardData, deleteCardCallback, likeHandler,openImgPopup, userID);
      cardList.prepend(cardToAdd);
    
      imgName.value = '';
      imgURL.value = '';
    
      const popupToClose = btnAdd.closest('.popup');
      showProgressBtn("success", btnAdd);
      setTimeout(closePopup, 1500, popupToClose);
    })
    .catch((err) => {
      console.log(err);
      showProgressBtn("fail", btnAdd);
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
  showProgressBtn("loading", btnSaveNewProfile);

  updateProfile(popupEditProfile_nameValue.value, popupEditProfile_jobDesc.value)
    .then(() => {
      profileName.textContent = popupEditProfile_nameValue.value;
      profileJobDesc.textContent = popupEditProfile_jobDesc.value;
      showProgressBtn("success", btnSaveNewProfile);
    })
    .catch((err) => {
      console.log(err);
      showProgressBtn("fail", btnSaveNewProfile);
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
  showProgressBtn("loading", btnUpdateProfileAvatar);
  
  updateAvatar(popupEditProfileAvatar_url.value)
  .then(() => {
    getProfile()
    .then((updatedProfile) => {
      profileImg.style.backgroundImage = `url(${updatedProfile.avatar})`;
      showProgressBtn("success", btnUpdateProfileAvatar);
    })
  })
  .catch((err) => {
    console.log(err);
    showProgressBtn("fail", btnUpdateProfileAvatar);
  })

});

/* Включение валидации форм */

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  invalidClass: 'popup__input_invalid'
}); 