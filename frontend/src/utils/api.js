class Api {
    constructor({ address, token }) {
        this._address = address;
        this._token = token;
        this._headers = {
            authorization: this._token,
            "Content-Type": "application/json",
        };
    }

    _handleResponse = (res) => {
        return res.ok
            ? res.json()
            : Promise.reject(`Ошибка ${res.status}`);
    };

    getCards() {
        return fetch(`${this._address}/cards`, {
            method: "GET",
            headers: this._headers,
        }).then(this._handleResponse);
    }

    getUserInfo() {
        return fetch(`${this._address}/users/me`, {
            method: "GET",
            headers: this._headers,
        }).then(this._handleResponse);
    }

    updateInfoUser({ name, about }) {
        return fetch(`${this._address}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name,
                about,
            }),
        }).then(this._handleResponse);
    }

    createCard({ name, link }) {
        return fetch(`${this._address}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link,
            }),
        }).then(this._handleResponse);
    }

    deleteCard(id) {
        return fetch(`${this._address}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._handleResponse);
    }

    _putLike(id) {
        return fetch(`${this._address}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers,
        }).then(this._handleResponse);
    }

    _deleteLike(id) {
        return fetch(`${this._address}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._handleResponse);
    }

    likeCard(cardId, isLiked) {
        return isLiked ? this._deleteLike(cardId) : this._putLike(cardId);
    }

    updateAvatar({avatar}) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: "PATCH",
            body: JSON.stringify({
                avatar,
            }),
            headers: this._headers,
        }).then(this._handleResponse);
    }
}

export const api = new Api({
    address: "https://mesto.nomoreparties.co/v1/cohort-69",
    token: "2106ca69-ecc4-46c7-85b7-253c3882a688",
});