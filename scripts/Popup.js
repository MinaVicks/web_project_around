export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

    if (!this._popup) {
      throw new Error(`Popup element not found: ${popupSelector}`);
    }
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    if (this._popup) {
      this._popup.classList.add("active");
    } else {
      console.log("oh no");
    }
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popup.classList.remove("active");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup
      .querySelector(".popup__close")
      .addEventListener("click", () => this.close());

    this._popup.addEventListener("click", (event) => {
      if (event.target === this._popup) {
        this.close();
      }
    });
  }
}
