const pressEscToClosePopup = function (evt) {
  if (evt.key === 'Escape') {
    const popupToClose = document.querySelector('.popup_is-opened');
    popupToClose.classList.toggle('popup_is-opened');
    document.removeEventListener('keydown', pressEscToClosePopup)
  }
}

const clickOutOfPopup = function(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    evt.target.classList.toggle('popup_is-opened');
  }
}

const closeOpenedPopup = function() {
  const popupToClose = document.querySelector('.popup_is-opened');
  popupToClose.classList.toggle('popup_is-opened');
}


export {pressEscToClosePopup, clickOutOfPopup, closeOpenedPopup}