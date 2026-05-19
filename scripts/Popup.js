import { closeModal, openModal } from "./utils";

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.setEventListeners();
  }

  open() {
    this._popup.classList.add("popup_is-opened");
  }

  close() {
    this._popup.classList.remove("popup_is-opened");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this.popup.querySelector(".popup__close").addEventListener("click", () => {
      this.close();
    });

    this.popup.addEventListener("click", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}
