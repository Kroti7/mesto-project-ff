/* Токен: 9d4ca5f6-6a92-4903-9788-6dcae46f4a42
Идентификатор группы: pwff-cohort-1 */

/* Конфиг для API */
const config = {
  baseUrl: 'https://nomoreparties.co/v1/pwff-cohort-1/',
  headers: {
    authorization: '9d4ca5f6-6a92-4903-9788-6dcae46f4a42',
    'Content-Type': 'application/json'
  }
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json;
  }
};

/* Загрузка профиля */
export const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
  headers: {
    authorization: config.headers.authorization
  }
  })
  .then(handleResponse)
};

  
/*   .then((profile) => {
    const profileName = document.querySelector('.profile__title');
    const profileJobDesc = document.querySelector('.profile__description');
    const profileAvatar = document.querySelector('.profile__image');

    profileName.textContent = profile.name;
    profileJobDesc.textContent = profile.about;
    const profileServerAvatar = profile.avatar
    profileAvatar.style.backgroundImage = `url(${profileServerAvatar})`;
  }); */


/* Получение начальных карточек */
export const getCards = () => {
  return fetch(`${config.baseUrl}cards `, {
  headers: {
    authorization: config.headers.authorization
  }
  })
  .then(handleResponse)
};
/* Редактирование профиля */

export const updateProfile = (profileName, profileAbout) => {
  return fetch(`${config.baseUrl}users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileAbout
    })
  })
  .then(handleResponse)
};

/* btnSaveNewProfile.addEventListener('click', function(event) {
  event.preventDefault();

  profileName.textContent = popupEditProfile_nameValue.value;
  profileJobDesc.textContent = popupEditProfile_jobDesc.value;

  fetch('https://nomoreparties.co/v1/pwff-cohort-1/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '9d4ca5f6-6a92-4903-9788-6dcae46f4a42',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: popupEditProfile_nameValue.value,
      about: popupEditProfile_jobDesc.value
    })
  });

  closePopup(popupEditProfile);
}); */

/* Добавление карточки */

export const addCardAPI = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}cards`, {
    method: 'Post',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
    .then(handleResponse)
}

/* Ответ сервера при успехе
{
  "likes": [],
  "_id": "5d1f0611d321eb4bdcd707dd",
  "name": "Байкал",
  "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  "owner": {
    "name": "Jacques Cousteau",
    "about": "Sailor, researcher",
    "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
    "_id": "ef5f7423f7f5e22bef4ad607",
    "cohort": "local"
  },
  "createdAt": "2019-07-05T08:10:57.741Z"
} */


/* Удаление карточки (нужно пробросить в создание карточки, не забыть сделать логику чтобы только создатель карточек мог их удалять) */

export const deleteCardAPI = (cardID) => {
  fetch(`${config.baseUrl}${cardID}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
}

/* Функция лайка (не забыть сделать верстку карточки) */
export const cardLikeAPI = (isLiked, cardID) => {
  if (isLiked) {
    return fetch(`${config.baseUrl}cards/likes/${cardID}`, {
      method: 'PUT'
    })

  } else {
    return fetch(`${config.baseUrl}cards/likes/${cardID}`, {
      method: 'DELETE'
    })
  }
}