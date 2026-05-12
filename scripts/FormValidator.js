export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = this._formElement.querySelectorAll(
      this._config.inputSelector,
    );
    this._submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector,
    );
  }

  _checkValid(inputElement, inputError) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputError);
    } else {
      this._hideInputError(inputElement, inputError);
    }
  }

  _showInputError(inputElement, inputError) {
    inputError.innerText = inputElement.validationMessage;
  }

  _hideInputError(inputElement, inputError) {
    inputError.innerText = "";
  }

  _hasInvalidInput() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(".popup__input"),
    );
    console.log(inputList);
    return inputList.some((input) => {
      if (!input.checkValidity()) {
        return true;
      } else {
        return false;
      }
    });
  }

  _toggleSubmitButton() {
    const submitButton = document.querySelector(".popup__button");
    if (this._hasInvalidInput()) {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  }

  setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._toggleSubmitButton();
        const inputError = document.querySelector(`.${input.id}-input-error`);
        this._checkValid(input, inputError);
      });
    });
  }

  _resetForm() {
    this._formElement.reset();
    this._inputList.forEach((input) => {
      const inputError = document.querySelector(`#${input.id}-error`);
      this._hideInputError(input, inputError);
    });
  }
}
