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
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .catch(err => console.error(err));
    }
}
