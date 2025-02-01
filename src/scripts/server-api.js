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
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

/* Загрузка профиля */
export const getProfile = () => {
  return fetch(`${config.baseUrl}users/me`, {
  headers: {
    authorization: config.headers.authorization
  }
  })
  .then(handleResponse)
};

/* Получение начальных карточек */
export const getCards = () => {
  return fetch(`${config.baseUrl}cards`, {
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

export const updateAvatar = (avatarURL) => {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarURL,
    })
  })
  .then(handleResponse)
}

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

/* Удаление карточки */
export const deleteCardAPI = (cardID) => {
  return fetch(`${config.baseUrl}cards/${cardID}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
}

/* Функции лайка */
export const addCardLike = (cardID) => {
  return fetch(`${config.baseUrl}cards/likes/${cardID}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(handleResponse)
}

export const removeCardLike = (cardID) => {
  return fetch(`${config.baseUrl}cards/likes/${cardID}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(handleResponse)
}