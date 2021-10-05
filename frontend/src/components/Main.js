import React from 'react';
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__content">
                    <div className="profile__cover-avatar" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }}>
                    </div>
                    <div className="profile__info">
                        <div className="profile__text">
                            <h1 className="profile__autor">{currentUser.name}</h1>
                            <button onClick={props.onEditProfile} className="profile__button profile__button_edit" type="button" aria-label="edit"></button>
                        </div>
                        <p className="profile__profession">{currentUser.about}</p>
                    </div>
                </div>
                <button onClick={props.onAddPlace} className="profile__button profile__button_add" type="button" aria-label="add"></button>
            </section>
            <section>
                <ul className="places">
                    {props.cards.map((card) => (
                        <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onDeleteClick={props.onDeleteClick} />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;
