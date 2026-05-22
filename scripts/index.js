import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { UserInfo } from "./UserInfo.js";
import { Section } from "./Section.js";
import { Popup } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import {
  openModal,
  closeModal,
  fillProfileForm,
  handleProfileFormSubmit,
  handlePopClose,
  handlePopEscClose,
  handleButtonClose,
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

const formElement = document.querySelector("#edit-profile-form");

formElement.addEventListener("submit", handleProfileFormSubmit);

function renderCard(name, link, container) {
  const card = new Card(name, link, "#card-template").getCard();
  cardSection.addItem(card);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(
    cardNameInput.value,
    cardLinkInput.value,
    document.querySelector(".cards__list"),
  );
  closeModal(addLocalPopup);
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      console.log(item);
      const card = new Card(item.name, item.link, "#card-template", () => {});
      cardSection.addItem(card.getCard());
    },
  },
  ".cards__list",
);
cardSection.renderItems();

const addButton = document.querySelector(".profile__add-button");
const closeCardButton = document.querySelector("#close-card");

cardForm.addEventListener("submit", handleCardFormSubmit);

closeCardButton.addEventListener("click", function () {
  closeModal(addLocalPopup);
});

const typeNameInput = document.querySelector(".popup__input_type_name");
const descriptionNameInput = document.querySelector(
  ".popup__input_type_description",
);
const button = document.querySelector(".popup__button");

const popups = document.querySelectorAll(".popup");

popups.forEach((element) => {
  element.addEventListener("click", handlePopClose);
});

document.addEventListener("keydown", (evt) => {
  handlePopEscClose(evt);
});

document.querySelector("#close-button").addEventListener("click", (evt) => {
  handleButtonClose(evt);
});

editButton.addEventListener("click", () => editProfilePopup.open());
addButton.addEventListener("click", () => addCardPopup.open());
// Instância para o pop-up de editar perfil
const editProfilePopup = new PopupWithForm(
  "#edit-popup",
  handleProfileFormSubmit,
);
editProfilePopup.setEventListeners();

// Instância para o pop-up de adicionar cartão
const addCardPopup = new PopupWithForm("#new-card-popup", handleCardFormSubmit);
addCardPopup.setEventListeners();
