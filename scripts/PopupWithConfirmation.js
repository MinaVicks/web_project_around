import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    console.log("Confirmation  " + popupSelector);
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    //this._form = this._popup.querySelector(".popup__delete_form");
    this._confirmButton = this._popup.querySelector(".popup__confirm-button");
  }

  open() {
    //console.log("3._ " + cardId);
    // this._cardId = cardId;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      this._handleConfirm(this._cardId);
      this.close();
    });
  }
  /*
  (cardId) => {
  api
    .deleteCard(cardId)
    .then(() => {
      const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);

      if (cardElement) {
        cardElement.remove();
      }
    })
    .catch((err) => {
      console.log(err); // registra el error en la consola
    });
  
  close() {

    super.close();
  }*/
}
