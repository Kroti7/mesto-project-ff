import initialCards from './cards.js';

/* Функция добавления карточки */
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

function addCard(townName, imgSrc) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImg = cardElement.querySelector('.card__image');

  cardTitle.textContent = townName;
  cardImg.src = imgSrc;
  cardImg.alt = 'Фото города (наверное)';

  /* Кнопка удаления карточки */
  const deleteBtn = cardElement.querySelector('.card__delete-button');
  deleteBtn.addEventListener('click', function() {
    const cardToRemove = deleteBtn.closest('.card');
    cardToRemove.remove();
  });

  /* Кнопка лайка */
  const likeBtn = cardElement.querySelector('.card__like-button');
  likeBtn.addEventListener('click', function() {
    likeBtn.classList.toggle('card__like-button_is-active');
  });

  cardList.append(cardElement);
}

/* Логика попапа*/
const popupCreateCard = document.querySelector('.popup_type_new-card');
const btnPopup_open = document.querySelector('.profile__add-button');
const btnPopup_close = document.querySelectorAll('.popup__close');

btnPopup_open.addEventListener('click', function() {
  popupCreateCard.classList.toggle('popup_is-opened');
});

btnPopup_close.forEach(btn => {
  btn.addEventListener('click', function() {
    const popupToClose = btn.closest('.popup');
    popupToClose.classList.toggle('popup_is-opened');
  });
});

/* Кнопка добавления карточки */
const btnAdd = popupCreateCard.querySelector('.popup__button');
const townName = popupCreateCard.querySelector('.popup__input_type_card-name');
const imgURL = popupCreateCard.querySelector('.popup__input_type_url');

btnAdd.addEventListener('click', function() {
  addCard(townName.value, imgURL.value); /* Костыль, чтоб пользователь дал валидный URL для картинки: Боже, пусть пользователь даст только валидный URL, аминь 🙏*/

  townName.value = '';
  imgURL.value = '';

  const popupToClose = btnAdd.closest('.popup');
  popupToClose.classList.toggle('popup_is-opened');
});

/* Вывод начальных карточек на страницу */
initialCards.forEach(card => {
  addCard(card.name, card.link);
});
/* Спасибо за проверку 💚 */