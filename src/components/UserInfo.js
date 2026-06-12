export class UserInfo {
  constructor(userSelector) {
    this._nameElement = document.querySelector(userSelector.profileTitle);
    this._jobElement = document.querySelector(userSelector.profileDescription);
    this._avatarElement = document.querySelector(userSelector.profileAvatar);
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
    this._avatarElement.src = userData.avatar;
  }
}
