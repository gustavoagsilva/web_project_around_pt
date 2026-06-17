import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { Api } from "../components/Api.js";
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

function renderCard(result, container) {
  const card = new Card(
    result,
    "#card-template",
    () => {
      imagePopup.open(result.name, result.link);
    },
    (cardInstance) => {
      deletePopup.open(cardInstance);
    },
    (_id, cardLikeButton, isLiked) => {
      isLiked
        ? api
            .removeLike(_id)
            .then(() => {
              cardLikeButton.classList.remove("card__like-button_is-active");
            })
            .catch(() => {
              console.log(err);
            })
        : api
            .addLike(_id)
            .then(() => {
              cardLikeButton.classList.add("card__like-button_is-active");
            })
            .catch(() => {
              console.log(err);
            });
    },
  ).getCard();
  cardSection.addItem(card);
}

function handleCardFormSubmit(evt) {
  api
    .addCard({ name: evt["place-name"], link: evt.link })
    .then((result) => {
      renderCard(result, document.querySelector(".cards__list"));
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleProfileFormSubmit(evt) {
  const nameInput = typeNameInput.value;
  const jobInput = descriptionNameInput.value;

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const submitImage = document.querySelector(
    "#edit-profile-form .popup__button",
  );
  submitImage.textContent = "Salvando...";
  api
    .setUserInfo({ name: nameValue, job: jobValue })
    .then((result) => {
      user.setUserInfo({
        name: result.name,
        job: result.about,
        avatar: result.avatar,
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitImage.textContent = "Salvar";
    });
}

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "23344910-5bee-4adf-910b-2a200690ba88",
    "Content-Type": "application/json",
  },
});

let cardSection = null;

api
  .getInitialCards()
  .then((result) => {
    cardSection = new Section(
      {
        items: result,
        renderer: (item) => {
          renderCard(item);
        },
      },
      ".cards__list",
    );
    cardSection.renderItems();
  })
  .catch((err) => {
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

api
  .getUserInfo()
  .then((res) => {
    user.setUserInfo({ name: res.name, job: res.about, avatar: res.avatar });
  })
  .catch((err) => {
    console.log(err);
  });

const user = new UserInfo({
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
  profileAvatar: ".profile__image",
});

const deletePopup = new PopupWithConfirmation("#delete-popup", (card) => {
  api
    .removeCard(card._id)
    .then(() => {
      card.removeCard();
    })
    .catch((errr) => {
      console.log(err);
    });

  deletePopup.close();
});

deletePopup.setEventListeners();

const popupEditAvatar = new PopupWithForm("#avatar-popup", (data) => {
  api
    .setUserAvatar({ avatar: data["avatar-url"] })
    .then((result) => {
      user.setUserInfo({
        name: result.name,
        job: result.about,
        avatar: result.avatar,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
popupEditAvatar.setEventListeners();

imagebutton.addEventListener("click", () => popupEditAvatar.open());
