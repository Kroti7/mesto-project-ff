const closePopupByEsc = function(evt) {
  if(evt.key === 'Escape') {
     closePopup(document.querySelector('.popup_is-opened'));
  }
}

const clickOutOfPopup = function(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

const addEventlistenersToClosePopup = function(popupElement) {
  popupElement.addEventListener('click', clickOutOfPopup);
  document.addEventListener('keydown', closePopupByEsc);
}

const openPopup = function(popupElement) {
  popupElement.classList.add('popup_is-opened');
  addEventlistenersToClosePopup(popupElement);
};

const closePopup = function(popupElement) {
  popupElement.removeEventListener('click', clickOutOfPopup);
  document.removeEventListener('keydown', closePopupByEsc); 
  popupElement.classList.remove('popup_is-opened');
};

export { openPopup, closePopup };