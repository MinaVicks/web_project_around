const popupProfile = document.querySelector(".popup");
const profileEditButton = document.querySelector(".profile__info-edit");
const profileNameNode = document.querySelector(".profile__info-name");
const profileAboutNode = document.querySelector(".profile__info-subtitle");
const formProfile = document.querySelector(".popup__input");
const inputNameNode = formProfile.querySelector(".popup__text_title");
const inputAboutNode = formProfile.querySelector(".popup__text_about");

const closeProfilePopupButton = popupProfile.querySelector(".popup__close");
const popupSaveButton = formProfile.querySelector(".popup__submit-btn");

profileEditButton.addEventListener("click", function () {
  clearProfileForm();
  popupProfile.classList.add("active");
});

formProfile.addEventListener("submit", function (event) {
  event.preventDefault();
  if (inputNameNode.value !== "" && inputAboutNode.value !== "") {
    profileNameNode.textContent = inputNameNode.value;
    profileAboutNode.textContent = inputAboutNode.value;
    popupProfile.classList.remove("active");
  }
});
closeProfilePopupButton.addEventListener("click", function () {
  popupProfile.classList.remove("active");
  clearProfileForm(); // Opcional: Limpia el formulario al cerrar el popup
});

// Función para limpiar los campos del formulario
function clearProfileForm() {
  inputNameNode.value = "";  // Esto asegura que el placeholder se muestre
  inputAboutNode.value = ""; // Esto asegura que el placeholder se muestre
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

const cardsContainer = document.querySelector(".elements__container");
const profileAddButton = document.querySelector(".profile__add");
const popupAddImage = document.querySelector(".popup__add");
const closeAddButton = popupAddImage.querySelector(".popup__close");
const saveAddButton = popupAddImage.querySelector(".popup__button_add");



profileAddButton.addEventListener("click", function () {
  popupAddImage.classList.add("active");
});

saveAddButton.addEventListener("click", function (event) {
  event.preventDefault();

  const inputImageTitle = document.querySelector(".popup__input_title");
  const inputImageUrl = document.querySelector(".popup__input_url");

  if (inputImageTitle.value !== "" && inputImageUrl.value !== "") {
    addImage(inputImageTitle.value, inputImageUrl.value);
    inputImageTitle.value = "";
    inputImageUrl.value = "";
    popupAddImage.classList.remove("active");
  }
});

function addImage(name, link) {
  initialCards.unshift({ name, link });
  renderCard({ name, link },true);

}

function renderCard(data, isNew = false) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('elements__item');

  cardElement.innerHTML = `
    <div class="elements__delete">
        <img
          src="./images/trash.svg"
          alt="Boton delete"
          class="elements__delete-img"
        />
    </div>

    <img src="${data.link}" 
    alt="${data.name}" 
    class="elements__image" />
    
    <div class="elements__description">
      <p class="elements__description-title">${data.name}</p>
      <div class="elements__description-like">
        <img
          src="./images/like_off.svg"
          alt="Boton like"
          class="elements__description-like"
        />
      </div>
    </div>
  `;

  const deleteButton = cardElement.querySelector('.elements__delete');
  deleteButton.addEventListener('click', function () {
    cardElement.remove();


  
  });

  if (isNew) {
    cardsContainer.prepend(cardElement); 
  } else {
    cardsContainer.append(cardElement); 
  }
}

closeAddButton.addEventListener("click", function () {
  popupAddImage.classList.remove("active");
});

function renderInitialCards() {
  initialCards.forEach(renderCard);
}

renderInitialCards();
