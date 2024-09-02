export class ApiService {
  baseUrl;
  headers;
  token;

  constructor(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.token = token;
    this.headers = {
      authorization: token,
      "Content-Type": "application/json",
    };
  }

//#region base functions
  get(address) {
    return fetch(`${this.baseUrl}/${address}`, {
      headers: this.headers,
    })
      .then((res) => {
        return this.handleResponse(res);
      })
  }

  path(address, object) {
    return fetch(`${this.baseUrl}/${address}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(object),
    })
      .then((res) => {
        return this.handleResponse(res);
      })
  }

  post(address, object) {
    return fetch(`${this.baseUrl}/${address}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(object),
    })
      .then((res) => {
        return this.handleResponse(res);
      })
  }

  put(address) {
    return fetch(`${this.baseUrl}/${address}`, {
      method: "PUT",
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => {
        return this.handleResponse(res);
      })
  }

  delete(address) {
    return fetch(`${this.baseUrl}/${address}`, {
      method: "DELETE",
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => {
        return this.handleResponse(res);
      })
  }
//#endregion base Functions

  getProfile() {
    return this.get("users/me");
  }

  updateProfile(name, about) {
    return this.path("users/me", {
      name: name,
      about:about,
    });
  }

  addCard(card) {
    return this.post('cards', card);
  }

  getCards() {
    return this.get("cards");
  }

  deleteCard(cardId) {
    return this.delete(`cards/${cardId}`);
  }

  likeCard(cardId) {
    return this.put(`cards/likes/${cardId}`);
  }

  unlikeCard(cardId) {
    return this.delete(`cards/likes/${cardId}`);
  }

  checkImageLink(url) {
    return fetch(url, {
      method: "HEAD",
    })
      .then((res) => {
        if (res.ok) {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("image")) {
            return Promise.resolve(true);
          }
        }
        return Promise.reject();
      })
  }

  sendAvatar(url) {
    const avatar = {
      avatar: url,
    };
    return this.path('users/me/avatar', {avatar: url});
  }

  handleResponse(response) {
    return response.ok ? response.json() : Promise.reject(`Ошибка отправки запроса: ${response.status}`)
  }
}
