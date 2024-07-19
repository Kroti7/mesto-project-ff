import initialCards from './cards.js';

/* Функция добавления карточки */
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

/* Функция удаления карточки */
function deleteCard(evt) {
  const cardToRemove = evt.target.closest('.card');
  cardToRemove.remove();
}

function createCard(imgName, imgSrc) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImg = cardElement.querySelector('.card__image');

  cardTitle.textContent = imgName;
  cardImg.src = imgSrc;
  cardImg.alt = 'Картинка карточки';

  /* Кнопка удаления карточки */
  const deleteBtn = cardElement.querySelector('.card__delete-button');
  deleteBtn.setAttribute('aria-label', 'Удалить карточку');
  deleteBtn.addEventListener('click', deleteCard); /* Я не понял как сделать, надеюсь что так 😅 */

  /* Кнопка лайка */
  const likeBtn = cardElement.querySelector('.card__like-button');
  likeBtn.setAttribute('aria-label', 'Поставить лайк');
  likeBtn.addEventListener('click', function() {
    likeBtn.classList.toggle('card__like-button_is-active');
  });

  return cardElement;
}


/* Логика попапа*/
const popupCreateCard = document.querySelector('.popup_type_new-card');
const btnOpenPopupCreateCard = document.querySelector('.profile__add-button');
const btnsClosePopups = document.querySelectorAll('.popup__close');

btnOpenPopupCreateCard.addEventListener('click', function() {
  popupCreateCard.classList.toggle('popup_is-opened');
});

btnsClosePopups.forEach(btn => {
  btn.addEventListener('click', function() {
    const popupToClose = btn.closest('.popup');
    popupToClose.classList.toggle('popup_is-opened');
  });
});

/* Кнопка добавления карточки */
const btnAdd = popupCreateCard.querySelector('.popup__button');
const imgName = popupCreateCard.querySelector('.popup__input_type_card-name');
const imgURL = popupCreateCard.querySelector('.popup__input_type_url');

btnAdd.addEventListener('click', function() {
  const cardToAdd = createCard(imgName.value, imgURL.value);
  cardList.append(cardToAdd)

  imgName.value = '';
  imgURL.value = '';

  const popupToClose = btnAdd.closest('.popup');
  popupToClose.classList.toggle('popup_is-opened');
});

/* Вывод начальных карточек на страницу */
initialCards.forEach(card => {
  const cardToAdd = createCard(card.name, card.link);
  cardList.append(cardToAdd)
});