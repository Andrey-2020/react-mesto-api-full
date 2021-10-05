import { options } from './constant' ;
class Api {
    constructor(config) {
        this.url = config.url;
        this._cardUrl = config.cardUrl;
        this._userUrl = config.userUrl;
        this.headers = config.headers;
    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(new Error(`Ошибка ${res.status}`))
    }
    getCardTasks() {
        return fetch(`${this.url}/${this._cardUrl}`, {
            headers: this.headers,
        })
            .then(this._checkResponse)
    }
    getUserTasks() {
        return fetch(`${this.url}/${this._userUrl}`, {
            headers: this.headers,
        })
            .then(this._checkResponse)
    }
    createCardTask(card) {
        return fetch(`${this.url}/${this._cardUrl}`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link,
            })
        })
            .then(this._checkResponse)
    }
    putTask(id) {
        return fetch(`${this.url}/${this._cardUrl}/${id}`, {
            method: 'PUT',
            headers: this.headers,
        })
            .then(this._checkResponse)
    }

    deleteTask(id) {
        return fetch(`${this.url}/${this._cardUrl}/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then(this._checkResponse)
    }
    // likeCard(cardId) {
    //     return fetch(`${this.url}/${this._cardUrl}/likes/${cardId}`, {
    //         method: 'PUT',
    //         headers: this.headers,
    //     })
    //         .then(this._checkResponse)
    // }
    // deleteLikeCard(cardId) {
    //     return fetch(`${this.url}/${this._cardUrl}/likes/${cardId}`, {
    //         method: 'DELETE',
    //         headers: this.headers,
    //     })
    //         .then(this._checkResponse)
    // }
    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return fetch(`${this.url}/${this._cardUrl}/likes/${cardId}`, {
                method: 'PUT',
                headers: this.headers,
            })
                .then(this._checkResponse)
        } else {
            return fetch(`${this.url}/${this._cardUrl}/likes/${cardId}`, {
                method: 'DELETE',
                headers: this.headers,
            })
                .then(this._checkResponse)
        }
    }
    updateTask(object, url) {
        return fetch(`${this.url}/${url}`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(object)
        })
            .then(this._checkResponse)
    }
    updateUserTask(object, url) {
        return fetch(`${this.url}/${this._userUrl}/${url}`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(object)
        })
            .then(this._checkResponse)
    }
}
const api = new Api(options);
export default api;