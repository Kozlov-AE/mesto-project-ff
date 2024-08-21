export class apiService {
    baseUrl;
    headers;

    constructor(baseUrl, token) {
        this.baseUrl = baseUrl;
        this.headers = {
            authorization: token,
            'Content-Type': 'application/json'
        }
    }

    getMe(cohortId) {
        return fetch(`${this.baseUrl}/users/me`, {
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
