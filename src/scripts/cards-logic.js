
/* imgName, imgSrc */
function createCard(cardData, delFunc, likeFunc, cardImgPopupFunc, userID) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImg = cardElement.querySelector('.card__image');
  const cardLikes = cardElement.querySelector('.card__like-count');

  cardTitle.textContent = cardData.name;
  cardImg.src = cardData.link;
  cardImg.alt = 'Картинка карточки';
  cardLikes.textContent = cardData.likes.length;

  /* Открытие картинки */
  cardImg.addEventListener('click', () => {
    cardImgPopupFunc(cardData.link, cardData.name)
  });

  /* Кнопка удаления карточки */
  if (userID === cardData.owner._id) {
    const deleteBtn = cardElement.querySelector('.card__delete-button');
    deleteBtn.setAttribute('aria-label', 'Удалить карточку');
    deleteBtn.addEventListener('click', (evt) => {
      delFunc(evt, cardData._id);
    });
  } else {
    cardElement.querySelector('.card__delete-button').remove();
  }

  /* Кнопка лайка */
  const likeBtn = cardElement.querySelector('.card__like-button');
  likeBtn.setAttribute('aria-label', 'Поставить лайк');
  likeBtn.addEventListener('click', (evt) => {
    // likeBtn.classList.toggle('card__like-button_is-active');
    likeFunc(likeBtn, cardData._id, cardLikes);
  });

  if (cardData.likes.some(user => user?._id === userID)) {
    likeBtn.classList.add('card__like-button_is-active');
  }
  
  return cardElement;
}

export {createCard}