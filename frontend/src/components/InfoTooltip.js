import React from 'react';
import confirmed from '../images/UnionDone.jpg';
import cross from '../images/UnionFail.jpg';
function InfoTooltip(props) {


    return (
        <section className={`popup popup_type_infoTooltip ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__container`}>
                    <div className={'form__infoTooltip-container'}>
                        <img className={'form__infoTooltip-image'} src={props.result ? confirmed : cross} alt ={props.result ? 'Успешно' : 'Не удачно'} />
                        <p className={'form__infoTooltip-description'}>{props.result ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
                    </div>
                <button className="popup__button" type="button" aria-label="close" onClick={props.onClose}></button>
            </div>
        </section>
    );
}

export default InfoTooltip;