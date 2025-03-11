import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "baa82528-b162-4561-afed-0ee517d16cde",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  descriptionSelector: ".profile__info-subtitle",
});

const imagePopup = new PopupWithImage(".popup__imageFull");
imagePopup.setEventListeners();

function handleImageClick(name, link) {
  imagePopup.open(link, name, name);
}

function handleCardLike(cardId) {
  return api.likeCard(cardId);
}

function handleDeleteCardLike(cardId) {
  return api.deleteLikeCard(cardId);
}

let userId;

api
  .getUserInformation()
  .then((userData) => {
    userId = userData._id;
  })
  .catch((err) => {
    console.error("Error fetching user information:", err);
  });

const deleteCardPopup = new PopupWithConfirmation("#delete-popup", (cardId) => {
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
});

deleteCardPopup.setEventListeners();

let cardSection;

api
  .getInitialCards()
  .then((initialCards) => {
    console.log("Initial Cards:", initialCards);
    cardSection = new Section(
      {
        items: initialCards,
        renderer: renderCard,
      },
      ".elements__container"
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.log(err); // registra el error en la consola
  });

function renderCard(cardData) {
  console.log("5._ " + deleteCardPopup.open);
  const card = new Card(
    cardData,
    ".card-template",
    handleImageClick,
    handleCardLike,
    handleDeleteCardLike,
    deleteCardPopup.open,
    userId
  );
  const cardElement = card.generateCard();
  cardElement.setAttribute("data-card-id", cardData._id);
  //cardSection.addItem(cardElement);
  return cardElement;
}

const editProfilePopup = new PopupWithForm(
  ".popup__profile",
  handleProfileFormSubmit
);
editProfilePopup.setEventListeners();

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const formValidators = {};

document.querySelectorAll(validationSettings.formSelector).forEach((form) => {
  const validator = new FormValidator(validationSettings, form);
  validator.enableValidation();
  formValidators[form.name] = validator;
});

function handleProfileFormSubmit(inputValues) {
  userInfo.setUserInfo({
    name: inputValues.name,
    description: inputValues.description,
  });
  editProfilePopup.close();
}
document.querySelector("#open-popup").addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  editProfilePopup.open();
  document.querySelector("#input-name").value = currentUserInfo.name;
  document.querySelector("#input-description").value =
    currentUserInfo.description;

  api
    .updateUserInformation({
      name: currentUserInfo.name,
      about: currentUserInfo.description,
    })
    .then((response) => {
      userInfo.setUserInfo(response.name, response.about);
    })
    .catch((err) => {
      console.log(err); // registra el error en la consola
    });
});

document.querySelector("#open-popupAdd").addEventListener("click", () => {
  addCardPopup.open();
});

function handleAddCardFormSubmit(inputValues) {
  const newCard = {
    name: inputValues.title,
    link: inputValues.link,
  };
  api
    .createCard(newCard)
    .then((response) => {
      const card = new Card(
        newCard,
        ".card-template",
        handleImageClick,
        handleCardLike,
        handleDeleteCardLike,
        deleteCardPopup.open,
        userId
      );
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
      addCardPopup.close();
    })

    .catch((err) => {
      console.log(err); // registra el error en la consola
    });
}

const addCardPopup = new PopupWithForm(".popup__add", handleAddCardFormSubmit);
addCardPopup.setEventListeners();

document.querySelector(".profile__add").addEventListener("click", () => {
  addCardPopup.open();
});
