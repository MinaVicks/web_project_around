export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleCardLike,
    handleDeleteCardLike,
    handleDeleteCard
    //userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._isLiked = data._isLiked || false;
    this._cardId = data._id;
    //this._ownerId = data.owner;
    //this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleCardLike = handleCardLike;
    this._handleDeleteCardLike = handleDeleteCardLike;
    this._handleDeleteCard = handleDeleteCard;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".elements__description-like")
      .addEventListener("click", () => {
        this._toggleLike();
      });

    //delete
    this._element
      .querySelector(".elements__delete")
      .addEventListener("click", () => {
        // this._handleDeleteCard();
        this._handleDeleteCard(this._cardId);
        //this._removeCard();
      });

    //popupFULL
    this._element
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._name, this._link);
      });
  }

  _toggleLike() {
    this._element
      .querySelector(".elements__description-like")
      .classList.toggle("active");

    if (this._isLiked) {
      console.log("se le dio like");
      this._handleDeleteCardLike(this._cardId);
    } else {
      console.log("se quito el like");
      this._handleCardLike(this._cardId);
    }

    this._isLiked = !this._isLiked;
  }

  /* _removeCard() {
    this._element.remove();
  }*/

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".elements__image").src = this._link;
    this._element.querySelector(".elements__image").alt = this._name;
    this._element.querySelector(".elements__description-title").textContent =
      this._name;

    this._setEventListeners();

    return this._element;
  }
}
