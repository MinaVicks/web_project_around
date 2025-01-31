export function openPopup(popup) {
  popup.classList.add("active");
  document.addEventListener("keydown", closePopupOnEsc);
}

export function closePopup(popup) {
  popup.classList.remove("active");
  document.removeEventListener("keydown", closePopupOnEsc);
}

export function closePopupOnEsc(event) {
  if (event.key === "Escape") {
    const activePopup = document.querySelector(".popup.active");
    if (activePopup) {
      closePopup(activePopup);
    }
  }
}
