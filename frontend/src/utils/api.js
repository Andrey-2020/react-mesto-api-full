import { options } from './constant' ;
class Api {
    constructor(config) {
        this.url = config.url;
        this._cardUrl = config.cardUrl;
        this._userUrl = config.userUrl;
    }
    _headers(jwt) {
        return {
            'authorization': jwt,
            'Content-Type': 'application/json',
        }
    };
    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(new Error(`Ошибка ${res.status}`))
    }
    getCardTasks(jwt) {
        return fetch(`${this.url}/${this._cardUrl}`, {
            headers: this._headers(jwt),
        })
            .then(this._checkResponse)
    }
    getUserTasks(jwt) {
        return fetch(`${this.url}/${this._userUrl}`, {
            headers: this._headers(jwt),
        })
            .then(this._checkResponse)
    }
    createCardTask(card, jwt) {
        return fetch(`${this.url}/${this._cardUrl}`, {
            method: 'POST',
            headers: this._headers(jwt),
            body: JSON.stringify({
                name: card.name,
                link: card.link,
            })
        })
            .then(this._checkResponse)
    }
    putTask(id, jwt) {
        return fetch(`${this.url}/${this._cardUrl}/${id}`, {
            method: 'PUT',
            headers: this._headers(jwt),
        })
            .then(this._checkResponse)
    }

    deleteTask(id, jwt) {
        return fetch(`${this.url}/${this._cardUrl}/${id}`, {
            method: 'DELETE',
            headers: this._headers(jwt),
        })
            .then(this._checkResponse)
    }

    changeLikeCardStatus(cardId, isLiked, jwt) {
        if (isLiked) {
            return fetch(`${this.url}/${this._cardUrl}/likes/${cardId}`, {
                method: 'PUT',
                headers: this._headers(jwt),
            })
                .then(this._checkResponse)
        } else {
            return fetch(`${this.url}/${this._cardUrl}/likes/${cardId}`, {
                method: 'DELETE',
                headers: this._headers(jwt),
            })
                .then(this._checkResponse)
        }
    }
    updateTask(object, url, jwt) {
        return fetch(`${this.url}/${url}`, {
            method: 'PATCH',
            headers: this._headers(jwt),
            body: JSON.stringify(object)
        })
            .then(this._checkResponse)
    }
    updateUserTask(object, url, jwt) {
        return fetch(`${this.url}/${this._userUrl}/${url}`, {
            method: 'PATCH',
            headers: this._headers(jwt),
            body: JSON.stringify(object)
        })
            .then(this._checkResponse)
    }
}
const api = new Api(options);
export default api;