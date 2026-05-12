import { FormValidator } from "./FormValidator.js";
import {
  openModal,
  closeModal,
  fillProfileForm,
  handleOpenEditModal,
  handleProfileFormSubmit,
  renderCard,
  handleCardFormSubmit,
  handlePopClose,
  handlePopEscClose,
  initialCards,
  cardNameInput,
  cardLinkInput,
  cardForm,
  addLocalPopup,
  editPopup,
} from "./utils.js";

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: ".popup__input-error",
};

const profileForm = document.querySelector("#edit-profile-form");

const profileValidator = new FormValidator(config, profileForm);
profileValidator.setEventListeners();

const cardValidator = new FormValidator(config, cardForm);
cardValidator.setEventListeners();

const editButton = document.querySelector(".profile__edit-button");
const closeButton = editPopup.querySelector(".popup__close");

editButton.addEventListener("click", function () {
  handleOpenEditModal(editPopup);
});

closeButton.addEventListener("click", function () {
  closeModal(editPopup);
});

const formElement = document.querySelector("#edit-profile-form");

formElement.addEventListener("submit", handleProfileFormSubmit);

initialCards.forEach((card) => {
  renderCard(card.name, card.link, document.querySelector(".cards__list"));
});

const addButton = document.querySelector(".profile__add-button");
const closeCardButton = document.querySelector("#close-card");

addButton.addEventListener("click", function () {
  handleOpenEditModal(addLocalPopup);
});

cardForm.addEventListener("submit", handleCardFormSubmit);

closeCardButton.addEventListener("click", function () {
  closeModal(addLocalPopup);
});

const typeNameInput = document.querySelector(".popup__input_type_name");
const descriptionNameInput = document.querySelector(
  ".popup__input_type_description",
);
const button = document.querySelector(".popup__button");

editButton.addEventListener("click", (e) => {
  openModal(editPopup);
});

const popups = document.querySelectorAll(".popup");

popups.forEach((element) => {
  element.addEventListener("click", handlePopClose);
});

popups.forEach((element) => {
  document.addEventListener("keydown", (evt) => {
    console.log("passei");
    handlePopEscClose(evt);
  });
});
