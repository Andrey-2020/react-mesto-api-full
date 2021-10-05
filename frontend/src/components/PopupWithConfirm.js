import React from 'react';
import PopupWithForm from './PopupWithForm'
function PopupWithConfirm(props) {
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onDeleteCard();
    }
    return (
        <PopupWithForm name="confirm" title="Вы уверены?" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText={"Да"} />
    );
}

export default PopupWithConfirm;
