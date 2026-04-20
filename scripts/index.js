let initialCards = [
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

initialCards.forEach(function (card) {
  console.log(card);
});

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const closeButton = editPopup.querySelector(".popup__close");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

editButton.addEventListener("click", function () {
  handleOpenEditModal(editPopup);
});

closeButton.addEventListener("click", function () {
  closeModal(editPopup);
});

function fillProfileForm() {
  let titleElement = document.querySelector(".profile__title");
  let descriptionElement = document.querySelector(".profile__description");
  let profileTitle = document.querySelector(".popup__input_type_name");
  let profileDescription = document.querySelector(
    ".popup__input_type_description",
  );

  profileTitle.value = titleElement.textContent;
  profileDescription.value = descriptionElement.textContent;
}

function handleOpenEditModal(modal) {
  fillProfileForm();
  openModal(modal);
}
let formElement = document.querySelector("#edit-profile-form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector(".popup__input_type_name");
  let jobInput = document.querySelector(".popup__input_type_description");

  let nameValue = nameInput.value;
  let jobValue = jobInput.value;

  let profileName = document.querySelector(".profile__title");
  let profileJob = document.querySelector(".profile__description");

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closeModal(editPopup);
}
formElement.addEventListener("submit", handleProfileFormSubmit);

function getCardElement(name, link) {
  const userTemplate = document.querySelector("#card-template").content.querySelector(".card")
  const cloneTemplate = userTemplate.cloneNode(true);
  const imageElement = cloneTemplate.querySelector(".card__image")
  const nameElement = cloneTemplate.querySelector(".card__title")

  imageElement.src = link
  imageElement.alt = name
  nameElement.textContent = name

  const LikeButton = cloneTemplate.querySelector(".card__like-button")
  LikeButton.addEventListener("click", function () {
    LikeButton.classList.toggle("card__like-button_is-active");
  });

  const DeleteButton = cloneTemplate.querySelector(".card__delete-button")
  DeleteButton.addEventListener("click", function () {
    cloneTemplate.remove();
  })

  const imageModal = document.querySelector("#image-popup");
  const modalImage = document.querySelector(".popup__image");
  const modalCaption = document.querySelector(".popup__caption");
  const closeButton = document.querySelector("#close-button");

  const CardImage = cloneTemplate.querySelector(".card__image")
  CardImage.addEventListener("click", function () {
    openModal(imageModal)
    modalImage.src = link
    modalImage.alt = name
    modalCaption.textContent = name
    closeButton.addEventListener("click", function () {
      closeModal(imageModal)
    })
  })


  return cloneTemplate
}

function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link)
  container.prepend(cardElement)
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link, document.querySelector(".cards__list"))
})

const addButton = document.querySelector(".profile__add-button")
const addLocalPopup = document.querySelector("#new-card-popup")
const cardForm = document.querySelector("#new-card-form")
const cardNameInput = cardForm.querySelector(".popup__input_type_card-name")
const cardLinkInput = document.querySelector(".popup__input_type_url")
const closeCardButton = document.querySelector("#close-card")

addButton.addEventListener("click", function () {
  handleOpenEditModal(addLocalPopup);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(cardNameInput.value, cardLinkInput.value, document.querySelector(".cards__list"))
  closeModal(addLocalPopup)
}
cardForm.addEventListener("submit", handleCardFormSubmit);

closeCardButton.addEventListener("click", function () {
  closeModal(addLocalPopup);
});

const typeNameInput = document.querySelector(".popup__input_type_name");
const descriptionNameInput = document.querySelector(".popup__input_type_description");
const button = document.querySelector(".popup__button");

typeNameInput.addEventListener("input", (e) => {
  const inputError = document.querySelector(".name-input-error");
  if (e.target.value.length < 2 || e.target.value.length > 40) {
    inputError.innerText = 'O campo "Nome" deve ter entre 2 e 40 caracteres'
    button.disabled = true;
  } else {
    inputError.innerText = "";
    button.disabled = false;
  }
});

descriptionNameInput.addEventListener("input", (e) => {
  const inputError = document.querySelector(".description-input-error");
  if (e.target.value.length < 2 || e.target.value.length > 200) {
    inputError.innerText = 'O campo "Sobre" deve ter entre 2 e 200 caracteres.'
    button.disabled = true;
  } else {
    inputError.innerText = "";
    button.disabled = false;
  }
});

const titleNameInput = document.querySelector(".popup__input_type_card-name");
const linkInput = document.querySelector(".popup__input_type_url");
const buttonCard = addLocalPopup.querySelector(".popup__button");

cardNameInput.addEventListener("input", (e) => {
  const inputError = document.querySelector(".title-input-error");
  if (e.target.value.length < 2 || e.target.value.length > 30) {
    inputError.innerText = 'O campo "Título" deve ter entre 2 e 30 caracteres'
    buttonCard.disabled = true;
  } else {
    inputError.innerText = "";
    buttonCard.disabled = false;
  }
});

linkInput.addEventListener("input", (e) => {
  const inputError = document.querySelector(".link-input-error");
  const inputURL = document.querySelector(".popup__input_type_url");
  if (inputURL.checkValidity()) {
    inputError.innerText = "";
    buttonCard.disabled = false;
  } else {
    inputError.innerText = 'Insira uma URL'
    buttonCard.disabled = true;
  }
});

editButton.addEventListener("click", (e) => {
  openModal(editPopup);
});

const popups = document.querySelectorAll(".popup");

function handlePopClose(evt) {
  if (evt.target.classList.contains("popup")) {
    console.log(evt.target)
    closeModal(evt.currentTarget);
  }
}

popups.forEach((element) => {
  element.addEventListener("click", handlePopClose)
});

function handlePopEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

popups.forEach((element) => {
  document.addEventListener("keydown", (evt) => {
    handlePopEscClose(evt);
  });
});






