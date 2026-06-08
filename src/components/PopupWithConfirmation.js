import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._handleDeleteClick = this._popup.querySelector(
      ".popup__button_delete",
    );
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._handleDeleteClick.addEventListener("click", () => {
      this._handleConfirm(this._card);
    });
  }
}
