import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup, closePopupOnEsc } from "./utils.js";

const cardContainer = document.querySelector(".elements__container");
const addCardPopup = document.querySelector(".popup__add");
const addCardForm = addCardPopup.querySelector(".popup__form");
const inputTitle = addCardForm.querySelector("#input-place");
const inputUrl = addCardForm.querySelector("#input-url");

const editProfilePopup = document.querySelector(".popup");
const editProfileForm = editProfilePopup.querySelector(".popup__input");
const inputName = editProfileForm.querySelector(".popup__text_title");
const inputDescription = editProfileForm.querySelector(".popup__text_about");
const profileName = document.querySelector(".profile__info-name");
const profileDescription = document.querySelector(".profile__info-subtitle");

const openEditProfileButton = document.getElementById("open-popup");
const openAddCardButton = document.querySelector(".profile__add");
const closePopupButtons = document.querySelectorAll(".popup__close");

const popupImageFull = document.querySelector(".popup__imageFull");
const popupImage = popupImageFull.querySelector(".popup__imageFull-image");
const popupImageTitle = popupImageFull.querySelector(".popup_titleFull");

function handleImageClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageTitle.textContent = name;
  openPopup(popupImageFull);
}

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

initialCards.forEach((data) => {
  const card = new Card(
    { name: data.name, link: data.link },
    ".card-template",
    handleImageClick
  );
  cardContainer.append(card.generateCard());
});

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
  console.log(validator);
  formValidators[form.name] = validator;
});

closePopupButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const popup = event.target.closest(".popup");
    closePopup(popup);
  });
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup")) {
    closePopup(event.target);
  }
});

document.addEventListener("keydown", closePopupOnEsc);

openEditProfileButton.addEventListener("click", () => {
  // clearProfileForm();
  openPopup(editProfilePopup);
});

function clearProfileForm() {
  inputName.value = "";
  inputDescription.value = "";
}

editProfileForm.addEventListener("submit", (event) => {
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(editProfilePopup);
});

openAddCardButton.addEventListener("click", () => {
  addCardForm.reset();

  formValidators[addCardForm.name]._toggleButtonState();
  openPopup(addCardPopup);
});

addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!formValidators[addCardForm.name]._hasInvalidInput()) {
    const newCard = new Card(
      { name: inputTitle.value, link: inputUrl.value },
      ".card-template"
    );
    cardContainer.prepend(newCard.generateCard());

    addCardForm.reset();
    formValidators[addCardForm.name]._toggleButtonState();
    closePopup(addCardPopup);
  }
});
