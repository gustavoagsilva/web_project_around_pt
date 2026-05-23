export class UserInfo {
  constructor(userSelector) {
    this._nameElement = document.querySelector(userSelector.profileTitle);
    this._jobElement = document.querySelector(userSelector.profileDescription);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo(userData) {
    this._nameElement.textContent = userData.name;
    this._jobElement.textContent = userData.job;
  }
}
