import React from 'react';
import remove from '../images/Delete.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
function Card({ card, onCardClick, onCardLike, onDeleteClick }) {
    const currentUser = React.useContext(CurrentUserContext);
    function handleClick() {
        onCardClick(card);
    }
    function handleLikeClick() {
        onCardLike(card);
    }
    function handleDeleteClick() {
        onDeleteClick(card);
    }
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `place__delete ${isOwn ? 'card__delete-button_visible' : 'place__delete-none'}`
    );
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (`place__like ${isLiked ? 'place__like_active' : ''}`);

    return (
        <li className="place">
            <div className="place__image" style={{ backgroundImage: `url(${card.link})` }} onClick={handleClick} ></div>
            <img className={cardDeleteButtonClassName} src={remove} alt="Удалить" onClick={handleDeleteClick} />
            <div className="place__info">
                <h2 className="place__title">{card.name}</h2>
                <div className="place__like-container">
                    <button className={cardLikeButtonClassName} type="button" aria-label="like" onClick={handleLikeClick} ></button>
                    <div className="place__number-of-like">{card.likes.length}</div>
                </div>
            </div>
        </li>
    );
}

export default Card;
