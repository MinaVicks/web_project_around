import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";

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

const cardsContainer = document.querySelector(".elements__container");
const profileAddButton = document.querySelector(".profile__add");
const popupAddImage = document.querySelector(".popup__add");
const closeAddButton = popupAddImage.querySelector(".popup__close");
const saveAddButton = popupAddImage.querySelector(".popup__button_add");
const inputImageTitle = document.querySelector(".popup__input_title");
const inputImageUrl = document.querySelector(".popup__input_url");

profileAddButton.addEventListener("click", () => openPopup(popupAddImage));
closeAddButton.addEventListener("click", () => closePopup(popupAddImage));

saveAddButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (inputImageTitle.value !== "" && inputImageUrl.value !== "") {
    const newCard = new Card(
      { name: inputImageTitle.value, link: inputImageUrl.value },
      "#card-template",
      openImagePopup
    );
    cardsContainer.prepend(newCard.generateCard());

    inputImageTitle.value = "";
    inputImageUrl.value = "";
    closePopup(popupAddImage);
  }
});

function openImagePopup(name, link) {
  const popupImageFull = document.querySelector(".popup__imageFull");
  const popupImage = popupImageFull.querySelector(".popup__imageFull-image");
  const popupImageTitle = popupImageFull.querySelector(".popup_titleFull");

  popupImage.src = link;
  popupImage.alt = name;
  popupImageTitle.textContent = name;
  openPopup(popupImageFull);
}

function renderInitialCards() {
  initialCards.forEach((data) => {
    const card = new Card(data, "#card-template", openImagePopup);
    cardsContainer.append(card.generateCard());
  });
}

renderInitialCards();

// Validación de formularios
const formConfig = {
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const formProfile = document.querySelector(".popup__input");
const profileFormValidator = new FormValidator(formConfig, formProfile);
profileFormValidator.enableValidation();
