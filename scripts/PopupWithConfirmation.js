import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._confirmButton = this._popup.querySelector(".popup__confirm-button");
  }
  open(cardId) {
    super.open();
    this._cardId = cardId;
    console.log("Esta tarjeta es" + cardId);
  }
  close() {
    super.close();

    console.log("cierro delete");
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      this._handleConfirm(this._cardId);
      // this.close();
    });
  }
}
