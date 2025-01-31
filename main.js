/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/cards-logic.js":
/*!************************************!*\
  !*** ./src/scripts/cards-logic.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCard: () => (/* binding */ createCard)\n/* harmony export */ });\n/* imgName, imgSrc */\nfunction createCard(cardData, delFunc, likeFunc, cardImgPopupFunc, userID) {\n  var cardTemplate = document.querySelector('#card-template').content;\n  var cardElement = cardTemplate.querySelector('.card').cloneNode(true);\n  var cardTitle = cardElement.querySelector('.card__title');\n  var cardImg = cardElement.querySelector('.card__image');\n  var cardLikes = cardElement.querySelector('.card__like-count');\n  cardTitle.textContent = cardData.name;\n  cardImg.src = cardData.link;\n  cardImg.alt = 'Картинка карточки';\n  cardLikes.textContent = cardData.likes.length;\n\n  /* Открытие картинки */\n  cardImg.addEventListener('click', function () {\n    cardImgPopupFunc(cardData.link, cardData.name);\n  });\n\n  /* Кнопка удаления карточки */\n  if (userID === cardData.owner._id) {\n    var deleteBtn = cardElement.querySelector('.card__delete-button');\n    deleteBtn.setAttribute('aria-label', 'Удалить карточку');\n    deleteBtn.addEventListener('click', function (evt) {\n      delFunc(evt, cardData._id);\n    });\n  } else {\n    cardElement.querySelector('.card__delete-button').remove();\n  }\n\n  /* Кнопка лайка */\n  var likeBtn = cardElement.querySelector('.card__like-button');\n  likeBtn.setAttribute('aria-label', 'Поставить лайк');\n  likeBtn.addEventListener('click', function (evt) {\n    likeBtn.classList.toggle('card__like-button_is-active');\n    likeFunc(likeBtn, cardData._id, cardLikes);\n  });\n  if (cardData.likes.some(function (user) {\n    return (user === null || user === void 0 ? void 0 : user._id) === userID;\n  })) {\n    likeBtn.classList.add('card__like-button_is-active');\n  }\n  return cardElement;\n}\n\n\n//# sourceURL=webpack://mesto-project-ff/./src/scripts/cards-logic.js?");

/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pages_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pages/index.css */ \"./src/pages/index.css\");\n/* harmony import */ var _cards_logic_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cards-logic.js */ \"./src/scripts/cards-logic.js\");\n/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal.js */ \"./src/scripts/modal.js\");\n/* harmony import */ var _validation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validation.js */ \"./src/scripts/validation.js\");\n/* harmony import */ var _server_api_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./server-api.js */ \"./src/scripts/server-api.js\");\nfunction _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(r) { if (Array.isArray(r)) return r; }\n\n\n// import initialCards from './cards-default.js';\n\n\n\n\nvar cardList = document.querySelector('.places__list');\n\n/* Логика попапа*/\nvar popupCreateCard = document.querySelector('.popup_type_new-card');\nvar btnOpenPopupCreateCard = document.querySelector('.profile__add-button');\nvar btnsClosePopups = document.querySelectorAll('.popup__close');\n\n/* Функция для открытия попапа картинки */\nvar openImgPopup = function openImgPopup(imgSrc, imgName) {\n  var cardPopup = document.querySelector('.popup_type_image');\n  (0,_modal_js__WEBPACK_IMPORTED_MODULE_2__.openPopup)(cardPopup);\n  var cardPopupImg = cardPopup.querySelector('.popup__image');\n  cardPopupImg.src = imgSrc;\n  var cardPopupImgTitile = cardPopup.querySelector('.popup__caption');\n  cardPopupImgTitile.textContent = imgName;\n};\n\n/* Загрузка профиля и добавление карточек */\nvar profileElement = document.querySelector('.profile');\nvar profileName = profileElement.querySelector('.profile__title');\nvar profileJobDesc = profileElement.querySelector('.profile__description');\nvar profileImg = profileElement.querySelector('.profile__image');\nvar userID = '';\nPromise.all([(0,_server_api_js__WEBPACK_IMPORTED_MODULE_4__.getProfile)(), (0,_server_api_js__WEBPACK_IMPORTED_MODULE_4__.getCards)()]).then(function (_ref) {\n  var _ref2 = _slicedToArray(_ref, 2),\n    profileData = _ref2[0],\n    cardsData = _ref2[1];\n  profileName.textContent = profileData.name;\n  profileJobDesc.textContent = profileData.about;\n  profileImg.style.backgroundImage = \"url(\".concat(profileData.avatar, \")\");\n  userID = profileData._id;\n  cardsData.forEach(function (cardData) {\n    var cardToAdd = (0,_cards_logic_js__WEBPACK_IMPORTED_MODULE_1__.createCard)(cardData, deleteCardCallback, likeHandler, openImgPopup, userID);\n    cardList.append(cardToAdd);\n  });\n});\n\n/* Функция удаления карточки */\nfunction deleteCardCallback(evt, cardId) {\n  (0,_server_api_js__WEBPACK_IMPORTED_MODULE_4__.deleteCardAPI)(cardId).then(function () {\n    var cardToRemove = evt.target.closest('.card');\n    cardToRemove.remove();\n  }).catch(function (err) {\n    (0,_server_api_js__WEBPACK_IMPORTED_MODULE_4__.catchError)(err);\n  });\n}\n;\n\n/* Функция лайка карточки */\nfunction likeHandler(likeBtn, cardID, cardLikesCounter) {\n  if (likeBtn.classList.contains('card__like-button_is-active')) {\n    (0,_server_api_js__WEBPACK_IMPORTED_MODULE_4__.addCardLike)(cardID).then(function (res) {\n      cardLikesCounter.textContent = res.likes.length;\n    });\n  } else {\n    (0,_server_api_js__WEBPACK_IMPORTED_MODULE_4__.removeCardLike)(cardID).then(function (res) {\n      cardLikesCounter.textContent = res.likes.length;\n    });\n  }\n}\n\n/* Открытие попапа добавление карточки */\nbtnOpenPopupCreateCard.addEventListener('click', function () {\n  (0,_modal_js__WEBPACK_IMPORTED_MODULE_2__.openPopup)(popupCreateCard);\n});\n\n/* Закрытие попапов по крестику */\nbtnsClosePopups.forEach(function (btn) {\n  btn.addEventListener('click', function () {\n    (0,_modal_js__WEBPACK_IMPORTED_MODULE_2__.closePopup)(btn.closest('.popup'));\n  });\n});\n\n/* Кнопка добавления карточки */\nvar addCardForm = popupCreateCard.querySelector('.popup__form');\nvar btnAdd = popupCreateCard.querySelector('.popup__button');\nvar imgName = popupCreateCard.querySelector('.popup__input_type_card-name');\nvar imgURL = popupCreateCard.querySelector('.popup__input_type_url');\n\n/* Добавление карточки */\nbtnAdd.addEventListener('click', function (evt) {\n  evt.preventDefault();\n  var cardData = {\n    link: imgURL.value,\n    name: imgName.value\n  };\n  (0,_server_api_js__WEBPACK_IMPORTED_MODULE_4__.showSaving)(true, btnAdd);\n  (0,_server_api_js__WEBPACK_IMPORTED_MODULE_4__.addCardAPI)(cardData.name, cardData.link).then(function (uploadedCardData) {\n    var cardToAdd = (0,_cards_logic_js__WEBPACK_IMPORTED_MODULE_1__.createCard)(uploadedCardData, deleteCardCallback, likeHandler, openImgPopup, userID);\n    cardList.prepend(cardToAdd);\n    imgName.value = '';\n    imgURL.value = '';\n    var popupToClose = btnAdd.closest('.popup');\n    (0,_modal_js__WEBPACK_IMPORTED_MODULE_2__.closePopup)(popupToClose);\n  }).finally(function () {\n    (0,_server_api_js__WEBPACK_IMPORTED_MODULE_4__.showSaving)(false, btnAdd);\n  });\n});\n\n/* Редактирование профиля */\n\nvar btnEditProfile = document.querySelector('.profile__edit-button');\nvar popupEditProfile = document.querySelector('.popup_type_edit');\nvar popupEditProfile_nameValue = document.querySelector('.popup__input_type_name');\nvar popupEditProfile_jobDesc = document.querySelector('.popup__input_type_description');\nbtnEditProfile.addEventListener('click', function () {\n  (0,_modal_js__WEBPACK_IMPORTED_MODULE_2__.openPopup)(popupEditProfile);\n  popupEditProfile_nameValue.value = profileName.textContent;\n  popupEditProfile_jobDesc.value = profileJobDesc.textContent;\n});\nvar btnSaveNewProfile = popupEditProfile.querySelector('.popup__button');\nbtnSaveNewProfile.addEventListener('click', function (event) {\n  event.preventDefault();\n  (0,_server_api_js__WEBPACK_IMPORTED_MODULE_4__.showSaving)(true, btnSaveNewProfile);\n  (0,_server_api_js__WEBPACK_IMPORTED_MODULE_4__.updateProfile)(popupEditProfile_nameValue.value, popupEditProfile_jobDesc.value).then(function () {\n    profileName.textContent = popupEditProfile_nameValue.value;\n    profileJobDesc.textContent = popupEditProfile_jobDesc.value;\n    (0,_server_api_js__WEBPACK_IMPORTED_MODULE_4__.showSaving)(false, btnSaveNewProfile);\n  });\n});\n\n/* Редактирование аватара  */\nvar popupEditProfileAvatar = document.querySelector('.popup_type_upload-avatar');\nvar popupEditProfileAvatar_url = popupEditProfileAvatar.querySelector('.popup__input_avatar_url');\nprofileImg.addEventListener('click', function (event) {\n  (0,_modal_js__WEBPACK_IMPORTED_MODULE_2__.openPopup)(popupEditProfileAvatar);\n});\nvar btnUpdateProfileAvatar = popupEditProfileAvatar.querySelector('.popup__button');\nbtnUpdateProfileAvatar.addEventListener('click', function (event) {\n  event.preventDefault();\n  (0,_server_api_js__WEBPACK_IMPORTED_MODULE_4__.showSaving)(true, btnUpdateProfileAvatar);\n  (0,_server_api_js__WEBPACK_IMPORTED_MODULE_4__.updateAvatar)(popupEditProfileAvatar_url.value).then(function () {\n    (0,_server_api_js__WEBPACK_IMPORTED_MODULE_4__.getProfile)().then(function (updatedProfile) {\n      profileImg.style.backgroundImage = \"url(\".concat(updatedProfile.avatar, \")\");\n    });\n  }).finally(function () {\n    (0,_server_api_js__WEBPACK_IMPORTED_MODULE_4__.showSaving)(false, btnUpdateProfileAvatar);\n  });\n});\n\n/* Включение валидации форм */\n\n(0,_validation_js__WEBPACK_IMPORTED_MODULE_3__.enableValidation)({\n  formSelector: '.popup__form',\n  inputSelector: '.popup__input',\n  submitButtonSelector: '.popup__button',\n  inactiveButtonClass: 'popup__button_disabled',\n  inputErrorClass: 'popup__input_type_error',\n  errorClass: 'popup__error_visible'\n});\n\n//# sourceURL=webpack://mesto-project-ff/./src/scripts/index.js?");

/***/ }),

/***/ "./src/scripts/modal.js":
/*!******************************!*\
  !*** ./src/scripts/modal.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   closePopup: () => (/* binding */ closePopup),\n/* harmony export */   openPopup: () => (/* binding */ openPopup)\n/* harmony export */ });\nvar closePopupByEsc = function closePopupByEsc(evt) {\n  if (evt.key === 'Escape') {\n    closePopup(document.querySelector('.popup_is-opened'));\n  }\n};\nvar clickOutOfPopup = function clickOutOfPopup(evt) {\n  if (evt.target.classList.contains('popup_is-opened')) {\n    closePopup(document.querySelector('.popup_is-opened'));\n  }\n};\nvar openPopup = function openPopup(popupElement) {\n  popupElement.classList.add('popup_is-opened');\n  popupElement.addEventListener('click', clickOutOfPopup);\n  document.addEventListener('keydown', closePopupByEsc);\n};\nvar closePopup = function closePopup(popupElement) {\n  popupElement.removeEventListener('click', clickOutOfPopup);\n  document.removeEventListener('keydown', closePopupByEsc);\n  popupElement.classList.remove('popup_is-opened');\n};\n\n\n//# sourceURL=webpack://mesto-project-ff/./src/scripts/modal.js?");

/***/ }),

/***/ "./src/scripts/server-api.js":
/*!***********************************!*\
  !*** ./src/scripts/server-api.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addCardAPI: () => (/* binding */ addCardAPI),\n/* harmony export */   addCardLike: () => (/* binding */ addCardLike),\n/* harmony export */   catchError: () => (/* binding */ catchError),\n/* harmony export */   deleteCardAPI: () => (/* binding */ deleteCardAPI),\n/* harmony export */   getCards: () => (/* binding */ getCards),\n/* harmony export */   getProfile: () => (/* binding */ getProfile),\n/* harmony export */   removeCardLike: () => (/* binding */ removeCardLike),\n/* harmony export */   showSaving: () => (/* binding */ showSaving),\n/* harmony export */   updateAvatar: () => (/* binding */ updateAvatar),\n/* harmony export */   updateProfile: () => (/* binding */ updateProfile)\n/* harmony export */ });\n/* Конфиг для API */\nvar config = {\n  baseUrl: 'https://nomoreparties.co/v1/pwff-cohort-1/',\n  headers: {\n    authorization: '9d4ca5f6-6a92-4903-9788-6dcae46f4a42',\n    'Content-Type': 'application/json'\n  }\n};\nvar handleResponse = function handleResponse(res) {\n  if (res.ok) {\n    return res.json();\n  }\n};\nvar catchError = function catchError(err) {\n  console.log(err);\n};\nvar changeElementText = function changeElementText(element, textContent) {\n  element.textContent = textContent;\n};\nvar showSaving = function showSaving(isLoading, buttonElement) {\n  if (isLoading) {\n    changeElementText(buttonElement, 'Сохранение...');\n    buttonElement.style.cursor = 'progress';\n  } else {\n    buttonElement.style.cursor = null;\n    changeElementText(buttonElement, 'Сохраннено!');\n    setTimeout(changeElementText, 3000, buttonElement, 'Сохранить');\n  }\n};\n\n/* Загрузка профиля */\nvar getProfile = function getProfile() {\n  return fetch(\"\".concat(config.baseUrl, \"users/me\"), {\n    headers: {\n      authorization: config.headers.authorization\n    }\n  }).then(handleResponse).catch(catchError);\n};\n\n/* Получение начальных карточек */\nvar getCards = function getCards() {\n  return fetch(\"\".concat(config.baseUrl, \"cards\"), {\n    headers: {\n      authorization: config.headers.authorization\n    }\n  }).then(handleResponse).catch(catchError);\n};\n\n/* Редактирование профиля */\nvar updateProfile = function updateProfile(profileName, profileAbout) {\n  return fetch(\"\".concat(config.baseUrl, \"users/me\"), {\n    method: 'PATCH',\n    headers: config.headers,\n    body: JSON.stringify({\n      name: profileName,\n      about: profileAbout\n    })\n  }).then(handleResponse).catch(catchError);\n};\nvar updateAvatar = function updateAvatar(avatarURL) {\n  return fetch(\"\".concat(config.baseUrl, \"users/me/avatar\"), {\n    method: 'PATCH',\n    headers: config.headers,\n    body: JSON.stringify({\n      avatar: avatarURL\n    })\n  }).then(handleResponse).catch(catchError);\n};\n\n/* Добавление карточки */\nvar addCardAPI = function addCardAPI(cardName, cardLink) {\n  return fetch(\"\".concat(config.baseUrl, \"cards\"), {\n    method: 'Post',\n    headers: config.headers,\n    body: JSON.stringify({\n      name: cardName,\n      link: cardLink\n    })\n  }).then(handleResponse).catch(catchError);\n};\n\n/* Удаление карточки */\nvar deleteCardAPI = function deleteCardAPI(cardID) {\n  return fetch(\"\".concat(config.baseUrl, \"cards/\").concat(cardID), {\n    method: 'DELETE',\n    headers: {\n      authorization: config.headers.authorization\n    }\n  });\n};\n\n/* Функции лайка */\nvar addCardLike = function addCardLike(cardID) {\n  return fetch(\"\".concat(config.baseUrl, \"cards/likes/\").concat(cardID), {\n    method: 'PUT',\n    headers: {\n      authorization: config.headers.authorization\n    }\n  }).then(handleResponse).catch(catchError);\n};\nvar removeCardLike = function removeCardLike(cardID) {\n  return fetch(\"\".concat(config.baseUrl, \"cards/likes/\").concat(cardID), {\n    method: 'DELETE',\n    headers: {\n      authorization: config.headers.authorization\n    }\n  }).then(handleResponse).catch(catchError);\n};\n\n//# sourceURL=webpack://mesto-project-ff/./src/scripts/server-api.js?");

/***/ }),

/***/ "./src/scripts/validation.js":
/*!***********************************!*\
  !*** ./src/scripts/validation.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   enableValidation: () => (/* binding */ enableValidation)\n/* harmony export */ });\n/* Показываем ошибку в форме */\nvar showErrorifInvalid = function showErrorifInvalid(inputElement, errorElement) {\n  if (inputElement.validity.patternMismatch) {\n    errorElement.textContent = inputElement.dataset.errorMessage;\n    inputElement.classList.add('popup__input_invalid');\n  } else if (!inputElement.validity.valid) {\n    errorElement.textContent = inputElement.validationMessage;\n    inputElement.classList.add('popup__input_invalid');\n  } else {\n    errorElement.textContent = \"\";\n    inputElement.classList.remove('popup__input_invalid');\n  }\n};\n\n/* Логика изменения кнопки при ошибках */\nvar hasInvalidInput = function hasInvalidInput(inputArray) {\n  return inputArray.some(function (input) {\n    return !input.validity.valid;\n  });\n};\nvar disableButton = function disableButton(btnElement) {\n  btnElement.setAttribute('disabled', '');\n};\nvar enableButton = function enableButton(btnElement) {\n  btnElement.removeAttribute('disabled');\n};\nvar changeButtonStateIfAllValid = function changeButtonStateIfAllValid(hasAnyInvalidForm, inputArray, btnElement) {\n  if (hasAnyInvalidForm(inputArray)) {\n    disableButton(btnElement);\n  } else {\n    enableButton(btnElement);\n  }\n};\n\n/* Добавление валидации при импуте пользователя */\nvar addListenersInForm = function addListenersInForm(formElement, inputClass, btnClass) {\n  var btnElement = formElement.querySelector(btnClass);\n  var inputArray = Array.from(formElement.querySelectorAll(inputClass));\n  disableButton(btnElement);\n  inputArray.forEach(function (input) {\n    var inputname = input.getAttribute('name');\n    var errorElement = formElement.querySelector(\".\".concat(inputname, \"-input-error\"));\n    input.addEventListener('input', function () {\n      showErrorifInvalid(input, errorElement);\n      changeButtonStateIfAllValid(hasInvalidInput, inputArray, btnElement);\n    });\n  });\n};\nvar enableValidation = function enableValidation(object) {\n  var formClass = object.formSelector;\n  var inputClass = object.inputSelector;\n  var btnClass = object.submitButtonSelector;\n  var formArray = Array.from(document.querySelectorAll(formClass));\n  formArray.forEach(function (form) {\n    addListenersInForm(form, inputClass, btnClass);\n  });\n};\n\n\n//# sourceURL=webpack://mesto-project-ff/./src/scripts/validation.js?");

/***/ }),

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://mesto-project-ff/./src/pages/index.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/index.js");
/******/ 	
/******/ })()
;