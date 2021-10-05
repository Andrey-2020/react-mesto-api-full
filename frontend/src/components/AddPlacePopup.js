import React from 'react';
import PopupWithForm from './PopupWithForm'
function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [url, setUrl] = React.useState('');
    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleUrlChange(e) {
        setUrl(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onAddCard({
            name: name,
            link: url
        });
    }
    React.useEffect(() => {
        setName('');
        setUrl('');
    }, [props.isOpen]);
    return (
        <PopupWithForm name="add" title="Новое место" isOpen={props.isOpen} buttonText={"Создать"} onClose={props.onClose} onUpdateUser={props.onUpdateUser} onSubmit={handleSubmit}>
            <fieldset className="form__input-container form__input-container_type_add">
                <input className="form__input form__input_type_name" type="text" name="name" placeholder="Название"
                    minLength="2" maxLength="30" id="place-input" value={name} onChange={handleNameChange} required />
                <span className="place-input-error form__input-error"></span>
                <input className="form__input form__input_type_link" type="url" name="link"
                    placeholder="Ссылка на картинку" id="url-input" value={url} onChange={handleUrlChange} required />
                <span className="url-input-error form__input-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup;