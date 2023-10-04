class Api {
    constructor({ address }) {
        this._address = address;
        this._token = localStorage.getItem('jwt');
        this._headers = {
            authorization: `Bearer ${this._token}`,
            "Content-Type": "application/json",
        };
    }

    _handleResponse = (res) => {
        return res.ok
            ? res.json()
            : Promise.reject(`Ошибка ${res.status}`);
    };

    getCards() {
        this._token = localStorage.getItem('jwt');
        return fetch(`${this._address}/cards`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${this._token}`,
                "Content-Type": "application/json",
            },
        }).then(
            this._handleResponse);
    }

    getUserInfo() {
        this._token = localStorage.getItem('jwt');
        return fetch(`${this._address}/users/me`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${this._token}`,
                "Content-Type": "application/json",
            },
        }).then(this._handleResponse);
    }

    updateInfoUser({ name, about }) {
        this._token = localStorage.getItem('jwt');
        return fetch(`${this._address}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${this._token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                about,
            }),
        }).then(this._handleResponse);
    }

    createCard({ name, link }) {
        this._token = localStorage.getItem('jwt');
        return fetch(`${this._address}/cards`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${this._token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                link,
            }),
        }).then(this._handleResponse);
    }

    deleteCard(id) {
        this._token = localStorage.getItem('jwt');
        return fetch(`${this._address}/cards/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${this._token}`,
                "Content-Type": "application/json",
            },
        }).then(this._handleResponse);
    }

    _putLike(id) {
        this._token = localStorage.getItem('jwt');
        return fetch(`${this._address}/cards/${id}/likes`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${this._token}`,
                "Content-Type": "application/json",
            },
        }).then(this._handleResponse);
    }

    _deleteLike(id) {
        this._token = localStorage.getItem('jwt');
        return fetch(`${this._address}/cards/${id}/likes`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${this._token}`,
                "Content-Type": "application/json",
            },
        }).then(this._handleResponse);
    }

    likeCard(cardId, isLiked) {
        return isLiked ? this._deleteLike(cardId) : this._putLike(cardId);
    }

    updateAvatar({avatar}) {
        this._token = localStorage.getItem('jwt');
        return fetch(`${this._address}/users/me/avatar`, {
            method: "PATCH",
            body: JSON.stringify({
                avatar,
            }),
            headers: {
                authorization: `Bearer ${this._token}`,
                "Content-Type": "application/json",
            },
        }).then(this._handleResponse);
    }
}

export const api = new Api({
    address: "http://localhost:3000",
});