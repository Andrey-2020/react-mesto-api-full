export const options = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-21',
    headers: {
        authorization: 'c4582077-8562-4c7d-9d43-345a93912f9e',
        'Content-Type': 'application/json'
    },
    cardUrl: 'cards',
    userUrl: 'users/me'
}



export const formEditElement = document.querySelector(".form_type_edit");
export const formUpdateAvatar = document.querySelector(".form_type_update-avatar");
export const nameInput = document.querySelector(".form__input_type_name-input")
export const professionInput = document.querySelector(".form__input_type_job-input")
export const openButton = document.querySelector(".profile__button_edit");


export const formAvatar = document.querySelector(".form_type_update-avatar");
export const avatarEditButton = document.querySelector(".profile__cover-avatar");

export const parametersCard = {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
}

export const addButton = document.querySelector(".profile__button_add");

export const formAddElement = document.querySelector(".form_type_add");