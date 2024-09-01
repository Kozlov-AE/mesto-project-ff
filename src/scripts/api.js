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
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ответ сервера ${res.status}`);
      })
      .catch((err) =>
        console.error(`Ошибка выполнения базового запроса GET: ${err}`)
      );
  }

  path(address, object) {
    return fetch(`${this.baseUrl}/${address}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(object),
    })
      .then((res) => {
        console.info(res);
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ответ сервера ${res.status}`);
      })
      .catch((err) => Promise.reject(`Ошибка выполнения базового запроса PATCH: ${err}`));
  }

  post(address, object) {
    return fetch(`${this.baseUrl}/${address}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(object),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ответ сервера ${res.status}`);
      })
      .catch((err) => {
        return Promise.reject(`Ошибка выполнения базового запроса POST: ${err}`);
      });
  }

  put(address) {
    return fetch(`${this.baseUrl}/${address}`, {
      method: "PUT",
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        log.error(`Ответ сервера ${res.status}`);
        return Promise.reject();
      })
      .catch((err) => {
        return Promise.reject(`Ошибка выполнения put`);
      });
  }

  delete(address) {
    return fetch(`${this.baseUrl}/${address}`, {
      method: "DELETE",
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ответ сервера ${res.status}`);
      })
      .catch((err) => {
        return Promise.reject("Ошибка при выполнении запроса DELETE: " + err);
      });
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
      .catch((err) => {
        console.log(`Ошибка при проверке ссылки на изображение: ${err}`);
        return Promise.reject(`Ошибка при проверке ссылки на изображение`);
      });
  }

  sendAvatar(url) {
    const avatar = {
      avatar: url,
    };
    return this.path('users/me/avatar', {avatar: url});
  }
}
