import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageFull = this._popup.querySelector(".popup__imageFull-image");
    this._titleFull = this._popup.querySelector(".popup_titleFull");
  }
  open(imageSrc, imageAlt, title) {
    this._imageFull.src = imageSrc;
    this._imageFull.alt = imageAlt;
    this._titleFull.textContent = title;

    super.open();
  }
}
