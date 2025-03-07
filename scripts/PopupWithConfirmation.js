import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    //this._form = this._popup.querySelector(".popup__delete_form");
    this._confirmButton = this._popup.querySelector(".popup__confirm-button");
  }

  // open() {
  // this._cardId = cardId;
  // super.open();
  //}

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      this._handleConfirm(this._cardId);
      this.close();
    });
  }
  /*close() {
    super.close();
  }*/
}
