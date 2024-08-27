export class ApiService {
    baseUrl;
    headers;
    token;

    constructor(baseUrl, token) {
        this.baseUrl = baseUrl;
        this.token = token;
        this.headers = {
            authorization: token,
            'Content-Type': 'application/json'
        }
    }

    get(address) {
        return fetch(`${this.baseUrl}${address}`, {
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ответ сервера ${res.status}`);
            })
            .catch(err => console.error(`Ошибка выполнения базового запроса GET: ${err}`));
    }

    path(address, object) {
        return fetch(`${this.baseUrl}${address}`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(object)
        })
            .then(res => {
                console.info(res);
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ответ сервера ${res.status}`);
            })
            .catch(err => console.error(`Ошибка выполнения базового запроса PATCH: ${err}`));
    }

    post(address, object) {
        return fetch(`${this.baseUrl}${address}`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(object)
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ответ сервера ${res.status}`);
            })
            .catch(err => console.error(`Ошибка выполнения базового запроса POST: ${err}`));
    }

    delete(address) {
        return fetch(`${this.baseUrl}/${address}`, {
            method: 'DELETE',
            headers: {
                authorization: this.token,
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ответ сервера ${res.status}`)
            })
            .catch(err => console.error(`Ошибка выполнения базового запроса DELETE: ${err}`));
    }

    deleteCard(cardId) {
        return this.delete(`cards/${cardId}`);
    }

    likeCard(cardId) {
        return fetch(`${this.baseUrl}cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this.token
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ответ сервера ${res.status}`);
            })
            .catch(err => console.error(`Ошибка выполнения базового запроса DELETE: ${err}`));
    }

    unlikeCard(cardId) {
        return this.delete(`/cards/likes/${cardId}`);
    }

    checkImageLink(url) {
        return fetch(url, {
            method: 'HEAD'
        })
            .then(res => {
                    if (res.ok && res.headers['content-type'].includes('image')) {
                        return Promise.resolve(true);
                    }
                    return Promise.reject("Ссылка не указывает на изображение")
                }
            )
            .catch(err => {
                console.log(`Ошибка при проверке ссылки на изображение: ${err}`);
                return Promise.reject(`Ошибка при проверке ссылки на изображение: ${err}`)
            });
    }

    sendAvatar(url) {
        const avatar = {
            avatar: url
        }
        return fetch(`${this.baseUrl}users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(avatar)
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ответ сервера ${res.status}`);
            })
            .catch(err => {
                console.error(`Ошибка при отправке ссылки на аватар: ${err}`)
                return Promise.reject(`Ошибка при отправке ссылки на аватар: ${err}`)
            });
    }
}
