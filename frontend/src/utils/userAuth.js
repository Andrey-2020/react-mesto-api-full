const BASE_URL = 'http://api.andrey.students.nomoredomains.monster';
const checkResponse = (res) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(new Error(`Ошибка ${res.status}`))
}
export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
        .then(checkResponse)
};

export function authorize(email, password) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
        .then(checkResponse)
};
export const getContent = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    })
        .then(checkResponse)
}