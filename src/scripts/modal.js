const openPopup = function(popupElement) {
  popupElement.classList.add('popup_is-opened');
};
const closePopup = function(popupElement, clickToClose, ecpToClose) {
  popupElement.removeEventListener('click', clickToClose);
  document.removeEventListener('keydown', ecpToClose); 
  popupElement.classList.remove('popup_is-opened');
};

export { openPopup, closePopup };