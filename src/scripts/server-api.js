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
    return res.json();
  }
};

export const catchError = (err) => {
    console.log(err);
}

const changeElementText = (element, textContent) => {
  element.textContent = textContent;
}

export const showSaving = (isLoading, buttonElement) => {
  if (isLoading) {
    changeElementText(buttonElement, 'Сохранение...');
    buttonElement.style.cursor = 'progress';
  } else {
    buttonElement.style.cursor = null;
    changeElementText(buttonElement, 'Сохраннено!');
    setTimeout(changeElementText, 3000, buttonElement, 'Сохранить')
  }
}

/* Загрузка профиля */
export const getProfile = () => {
  return fetch(`${config.baseUrl}users/me`, {
  headers: {
    authorization: config.headers.authorization
  }
  })
  .then(handleResponse)
  .catch(catchError)
};

/* Получение начальных карточек */
export const getCards = () => {
  return fetch(`${config.baseUrl}cards`, {
  headers: {
    authorization: config.headers.authorization
  }
  })
  .then(handleResponse)
  .catch(catchError)
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
  .catch(catchError)
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
  .catch(catchError)
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
    .catch(catchError)
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

/* Функция лайка*/
export const addCardLike = (cardID) => {
  return fetch(`${config.baseUrl}cards/likes/${cardID}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(handleResponse)
  .catch(catchError)
}

export const removeCardLike = (cardID) => {
  return fetch(`${config.baseUrl}cards/likes/${cardID}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(handleResponse)
  .catch(catchError)
}