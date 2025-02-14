import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  descriptionSelector: ".profile__info-subtitle",
});

const imagePopup = new PopupWithImage(".popup__imageFull");
imagePopup.setEventListeners();

function handleImageClick(name, link) {
  imagePopup.open(link, name, name);
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".elements__container"
);

function renderCard(cardData) {
  const card = new Card(cardData, ".card-template", handleImageClick);
  const cardElement = card.generateCard();
  cardSection.addItem(cardElement);
}

cardSection.renderItems();

function handleProfileFormSubmit(inputValues) {
  userInfo.setUserInfo({
    name: inputValues.name,
    description: inputValues.description,
  });
  editProfilePopup.close();
}

const editProfilePopup = new PopupWithForm(".popup", handleProfileFormSubmit);
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

document.querySelector("#open-popup").addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();

  editProfilePopup.open();
  document.querySelector("#input-name").value = currentUserInfo.name;
  document.querySelector("#input-description").value =
    currentUserInfo.description;
});

document.querySelector("#open-popupAdd").addEventListener("click", () => {
  addCardPopup.open();
});

function handleAddCardFormSubmit(inputValues) {
  const newCard = {
    name: inputValues.title,
    link: inputValues.link,
  };
  const card = new Card(newCard, ".card-template", handleImageClick);
  const cardElement = card.generateCard();
  cardSection.addItem(cardElement);
  addCardPopup.close();
}

const addCardPopup = new PopupWithForm(".popup__add", handleAddCardFormSubmit);
addCardPopup.setEventListeners();

document.querySelector(".profile__add").addEventListener("click", () => {
  addCardPopup.open();
});
