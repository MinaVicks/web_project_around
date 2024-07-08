function createPopup(id) {
  let popupNode = document.querySelector(id);
  let closeEditPopup = popupNode.querySelector(".popup__close");
  let closeOverlay = popupNode.querySelector(".popup__overlay");

  function openPopup() {
    popupNode.classList.add("active");
  }

  function closePopup() {
    popupNode.classList.remove("active");
  }
  closeOverlay.addEventListener("click", closePopup);
  closeEditPopup.addEventListener("click", closePopup);
  return openPopup;
}

let popup = createPopup("#popup");
document.querySelector("#open-popup").addEventListener("click", popup);

let container = document.querySelector(".popup__input");
let addButton = container.querySelector(".popup__submit-btn_action_add");

function editProfile() {
  let changeName = document.querySelector(".profile__info-name");
  let changeAbout = document.querySelector(".profile__info-subtitle");

  let newName = document.querySelector(".popup__text_title");
  let newAbout = document.querySelector(".popup__text_about");

  changeName.textContent = newName.value;
  changeAbout.textContent = newAbout.value;
}

addButton.addEventListener("click", editProfile);
