import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import {
  initialCards,
  cardNameInput,
  cardLinkInput,
  cardForm,
  addLocalPopup,
  editPopup,
} from "../components/utils.js";

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: ".popup__input-error",
};

const profileForm = document.querySelector("#edit-profile-form");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = editPopup.querySelector(".popup__close");
const formElement = document.querySelector("#edit-profile-form");
const addButton = document.querySelector(".profile__add-button");
const closeCardButton = document.querySelector("#close-card");
const popups = document.querySelectorAll(".popup");
const button = document.querySelector(".popup__button");
const typeNameInput = document.querySelector(".popup__input_type_name");
const descriptionNameInput = document.querySelector(
  ".popup__input_type_description",
);

const profileValidator = new FormValidator(config, profileForm);
profileValidator.setEventListeners();

const cardValidator = new FormValidator(config, cardForm);
cardValidator.setEventListeners();

function renderCard(name, link, container) {
  const card = new Card(name, link, "#card-template", () => {
    imagePopup.open(name, link);
  }).getCard();
  cardSection.addItem(card);
}

function handleCardFormSubmit(evt) {
  renderCard(
    cardNameInput.value,
    cardLinkInput.value,
    document.querySelector(".cards__list"),
  );
}

function handleProfileFormSubmit(evt) {
  const nameInput = document.querySelector(".popup__input_type_name");
  const jobInput = document.querySelector(".popup__input_type_description");

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  user.setUserInfo({ name: nameValue, job: jobValue });
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, "#card-template", () => {
        imagePopup.open(item.name, item.link);
      });
      cardSection.addItem(card.getCard());
    },
  },
  ".cards__list",
);
cardSection.renderItems();

editButton.addEventListener("click", () => {
  const userInfo = user.getUserInfo();
  typeNameInput.value = userInfo.name;
  descriptionNameInput.value = userInfo.job;
  editProfilePopup.open();
});
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

// Instância para o abrir o pop-up grande
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const user = new UserInfo({
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
});
