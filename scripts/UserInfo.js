export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._userName = document.querySelector(nameSelector);
    this._userDescription = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      description: this._userDescription.textContent,
    };
  }
  setUserInfo({ name, description }) {
    this._userName.textContent = name;
    this._userDescription.textContent = description;
  }

  setSubmitButtonText(text) {
    const submitButton = document.querySelector(".popup__submit-btn");
    if (submitButton) {
      submitButton.textContent = text;
    }
  }
}
