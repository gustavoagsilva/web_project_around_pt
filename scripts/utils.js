import { Card } from "./Card.js";
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const editPopup = document.querySelector("#edit-popup");
const cardForm = document.querySelector("#new-card-form");
const cardNameInput = cardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");
const addLocalPopup = document.querySelector("#new-card-popup");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function handlePopClose(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.currentTarget);
  }
}

function handleButtonClose(evt) {
  const imagePopup = document.querySelector(".popup_is-opened");
  closeModal(imagePopup);
}

function handlePopEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

function handleImageClick(imageLink, name) {
  const image = document.querySelector(".popup__image");
  image.src = imageLink;
  const text = document.querySelector(".popup__caption");
  text.textContent = name;
  openModal(document.querySelector("#image-popup"));
}

export {
  openModal,
  closeModal,
  handlePopClose,
  handlePopEscClose,
  handleButtonClose,
  handleImageClick,
  initialCards,
  editPopup,
  cardForm,
  cardNameInput,
  cardLinkInput,
  addLocalPopup,
};
