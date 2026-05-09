import { Card } from "./Card.js";
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
} from "./utils.js";

initialCards.forEach(function (card) {
  console.log(card);
});

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

// typeNameInput.addEventListener("input", (e) => {
//   const inputError = document.querySelector(".name-input-error");
//   if (e.target.value.length < 2 || e.target.value.length > 40) {
//     inputError.innerText = 'O campo "Nome" deve ter entre 2 e 40 caracteres';
//     button.disabled = true;
//   } else {
//     inputError.innerText = "";
//     button.disabled = false;
//   }
// });

// descriptionNameInput.addEventListener("input", (e) => {
//   const inputError = document.querySelector(".description-input-error");
//   if (e.target.value.length < 2 || e.target.value.length > 200) {
//     inputError.innerText = 'O campo "Sobre" deve ter entre 2 e 200 caracteres.';
//     button.disabled = true;
//   } else {
//     inputError.innerText = "";
//     button.disabled = false;
//   }
// });

// const titleNameInput = document.querySelector(".popup__input_type_card-name");
// const linkInput = document.querySelector(".popup__input_type_url");
// const buttonCard = addLocalPopup.querySelector(".popup__button");

// cardNameInput.addEventListener("input", (e) => {
//   const inputError = document.querySelector(".title-input-error");
//   if (e.target.value.length < 2 || e.target.value.length > 30) {
//     inputError.innerText = 'O campo "Título" deve ter entre 2 e 30 caracteres';
//     buttonCard.disabled = true;
//   } else {
//     inputError.innerText = "";
//     buttonCard.disabled = false;
//   }
// });

// linkInput.addEventListener("input", (e) => {
//   const inputError = document.querySelector(".link-input-error");
//   const inputURL = document.querySelector(".popup__input_type_url");
//   if (inputURL.checkValidity()) {
//     inputError.innerText = "";
//     buttonCard.disabled = false;
//   } else {
//     inputError.innerText = "Insira uma URL";
//     buttonCard.disabled = true;
//   }
// });

editButton.addEventListener("click", (e) => {
  openModal(editPopup);
});

const popups = document.querySelectorAll(".popup");

popups.forEach((element) => {
  element.addEventListener("click", handlePopClose);
});

popups.forEach((element) => {
  document.addEventListener("keydown", (evt) => {
    handlePopEscClose(evt);
  });
});
