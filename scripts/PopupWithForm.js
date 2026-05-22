import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    // 1. Encontra todos os campos de entrada do formulário
    this._inputList = this._popup.querySelectorAll(".popup__input");

    // 2. Cria um objeto vazio para armazenar os valores
    this._formValues = {};

    // 3. Percorre cada campo e adiciona seu valor ao objeto
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    // 4. Retorna o objeto com todos os valores
    return this._formValues;
  }

  setEventListeners() {
    // Chama o método da classe pai primeiro
    super.setEventListeners();

    // Adiciona funcionalidade específica para formulários
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    // Primeiro, chama o método close() da classe pai
    super.close();

    // Depois, adiciona a funcionalidade específica: redefinir o formulário
    this._formElement.reset();
  }
}
