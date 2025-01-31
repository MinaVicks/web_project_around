import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openPopup, closePopup, closePopupOnEsc } from "./utils.js";

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const cardContainer = document.querySelector(".elements__container");
const addCardPopup = document.querySelector(".popup__add");
const addCardForm = addCardPopup.querySelector(".popup__form");
const inputTitle = addCardForm.querySelector("#input-place");
const inputUrl = addCardForm.querySelector("#input-url");

const editProfilePopup = document.querySelector(".popup");
const editProfileForm = editProfilePopup.querySelector(".popup__form");
const inputName = editProfileForm.querySelector("#input-name");
const inputDescription = editProfileForm.querySelector("#input-description");
const profileName = document.querySelector(".profile__info-name");
const profileDescription = document.querySelector(".profile__info-subtitle");

const openEditProfileButton = document.getElementById("open-popup");
const openAddCardButton = document.querySelector(".profile__add");
const closePopupButtons = document.querySelectorAll(".popup__close");

const formValidators = {};

document.querySelectorAll(validationSettings.formSelector).forEach((form) => {
  const validator = new FormValidator(validationSettings, form);
  validator.enableValidation();
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
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(editProfilePopup);
});

editProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!formValidators[editProfileForm.name]._hasInvalidInput()) {
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup(editProfilePopup);
  }
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
      inputTitle.value,
      inputUrl.value,
      ".card-template"
    );
    cardContainer.prepend(newCard.generateCard());

    addCardForm.reset();
    formValidators[addCardForm.name]._toggleButtonState();
    closePopup(addCardPopup);
  }
});
