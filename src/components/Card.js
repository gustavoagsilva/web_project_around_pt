export class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleLikeClick = handleLikeClick;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  removeCard() {
    this._element.remove();
  }

  _handleDeleteClick() {
    this.removeCard();
  }

  _getElements() {
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._cardLikeButton = this._element.querySelector(".card__like-button");
    this._cardDeleteButton = this._element.querySelector(
      ".card__delete-button",
    );
  }

  _setData() {
    this._isLiked
      ? this._cardLikeButton.classList.add("card__like-button_is-active")
      : this._cardLikeButton.classList.remove("card__like-button_is-active");
    this._cardTitle.textContent = this._name;
    this._cardImage.setAttribute("src", this._link);
    this._cardImage.setAttribute("alt", this._name);
  }

  _setEventListeners() {
    // this._cardLikeButton.addEventListener("click", () => {
    //   this._handleLikeClick(this._id, this._cardLikeButton, this._isLiked);
    // });
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id, this._cardLikeButton, this._isLiked);
      this._isLiked = !this._isLiked;
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  getCard() {
    this._element = this._getTemplate();
    this._getElements();
    this._setData();
    this._setEventListeners();

    return this._element;
  }
}
