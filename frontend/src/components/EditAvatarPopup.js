import React from 'react';
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {
    const avatar = React.createRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatar.current.value,
        });
        avatar.current.value='';
    }


    return (
        <PopupWithForm name="update-avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText={"Сохранить"}>
            <fieldset className="form__input-container form__input-container_type_update-avatar">
                <input className="form__input form__input_type_url-avatar" type="url" name="avatar"
                    placeholder="Ссылка" minLength="2" maxLength="200" id="avatar-input" required ref={avatar} />
                <span className="avatar-input-error form__input-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}
export default EditAvatarPopup;