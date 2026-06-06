import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Api } from "../components/Api.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
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
const imagebutton = document.querySelector(".profile__image-edit-button");

const profileValidator = new FormValidator(config, profileForm);
profileValidator.setEventListeners();

const cardValidator = new FormValidator(config, cardForm);
cardValidator.setEventListeners();

function renderCard(name, link, container) {
  const card = new Card(name, link, "#card-template", () => {
    imagePopup.open(name, link); (cardInstance) => {
      deletePopup.open(cardInstance);
    }
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

  api.setUserInfo({ name: nameValue, job: jobValue }).then((result) => {
    user.setUserInfo({ name: result.name, job: result.about });
  }).catch((err) => {
    console.log(err);
  });
}

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "23344910-5bee-4adf-910b-2a200690ba88",
    "Content-Type": "application/json"
  }
});

let cardSection = null;

api.getInitialCards().then((result) => {
  cardSection = new Section(
    {
      items: result,
      renderer: (item) => {
        const card = new Card(item.name, item.link, "#card-template", () => {
          imagePopup.open(item.name, item.link);
        }, (cardInstance) => {
          deletePopup.open(cardInstance);
        });
        cardSection.addItem(card.getCard());
      },
    },
    ".cards__list",
  );
  cardSection.renderItems();
}).catch((err) => {
  console.log(err);
});

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

const deletePopup = new PopupWithConfirmation(
  "#delete-popup",
  (card) => {
    card.removeCard();
    deletePopup.close();
  }
);

deletePopup.setEventListeners();

const popupEditAvatar = new PopupWithForm("#avatar-popup", (data) => {
  api.setUserAvatar({ avatar: data.avatar }).then((result) => {
    user.setUserAvatar(result.avatar);
  }).catch((err) => {
    console.log(err);
  });
  popupEditAvatar.setEventListeners();
});

imagebutton.addEventListener("click", () => popupEditAvatar.open());