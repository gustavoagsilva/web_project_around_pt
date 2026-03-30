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
    Name: "Montanhas Carecas",
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
}
formElement.addEventListener("submit", handleProfileFormSubmit);
