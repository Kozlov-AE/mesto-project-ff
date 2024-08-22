export class ApiService {
    baseUrl;
    headers;

    constructor(baseUrl, token) {
        this.baseUrl = baseUrl;
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
}
