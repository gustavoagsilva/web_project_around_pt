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
      inputError.innerText = inputElement.validationMessage;
    } else {
      inputError.innerText = "";
    }
  }

  _showInputError(inputElement, inputError) {
    inputError.innerText = inputElement.validationMessage;
  }

  _hideInputError(inputElement, inputError) {
    inputError.innerText = "";
  }

  _hasInvalidInput() {
    const inputList = this._formElement.querySelectorAll(".popup__input");
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
