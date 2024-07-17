const popupProfile = document.querySelector(".popup__profile");
const profileEditButton = document.querySelector(".profile__info-edit");
const profileNameNode = document.querySelector(".profile__info-name");
const profileAboutNode = document.querySelector(".profile__info-subtitle");
const formProfile = document.querySelector(".popup__input");
const inputNameNode = formProfile.querySelector(".popup__text_title");
const inputAboutNode = formProfile.querySelector(".popup__text_about");
const closeProfilePopupButton = popupProfile.querySelector(".popup__close");
const popupSaveButton = formProfile.querySelector(".popup__submit-btn");

profileEditButton.addEventListener("click", function () {
  popupProfile.classList.add("active");
  inputNameNode.value = profileNameNode.textContent;
  inputAboutNode.value = profileAboutNode.textContent;
  popupSaveButton.classList.remove("active");
});

formProfile.addEventListener("submit", function (event) {
  event.preventDefault();
  if (inputNameNode.value !== "" && inputAboutNode.value !== "") {
    profileNameNode.textContent = inputNameNode.value;
    profileAboutNode.textContent = inputAboutNode.value;
    popupSaveButton.classList.add("active");
    popupProfile.classList.remove("active");
  }
});

closeProfilePopupButton.addEventListener("click", function () {
  popupProfile.classList.remove("active");
  popupSaveButton.classList.remove("active");
});
