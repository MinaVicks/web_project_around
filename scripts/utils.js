export function openPopup(popup) {
  console.log("openPopup works"); // Debugging
  popup.classList.add("active");
}

export function closePopup(popup) {
  popup.classList.remove("active");
}

export function closePopupOnEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}
