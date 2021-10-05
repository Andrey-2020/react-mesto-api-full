import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithConfirm from './PopupWithConfirm'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import MyProfile from './MyProfile'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import api from '../utils/api';
import Register from './Register'
import Login from './Login'
import ProtectedRoute from './ProtectedRoute'
import { useHistory } from 'react-router-dom';
import { getContent, register, authorize } from '../utils/userAuth.js'
import InfoTooltip from './InfoTooltip'
function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditImagePopupOpen, setIsEditImagePopupOpen] = React.useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [idDeleteCard, setIdDeleteCard] = React.useState('');
    const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
    const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '', _id: '' })
    const [cards, setCards] = React.useState([]);
    const [result, setResult] = React.useState(false);
    const [isInfoTooltip, setInfoTooltip] = React.useState(false);
    function handleLogin(email, password) {
        authorize(email, password)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                    return data;
                }
            })
            .then((data) => {
                console.log(data)
                if (data && data.token) {
                    setEmail(email);
                    setLoggedIn(true);
                    setCurrentUser({ name: data.name, about: data.about, avatar: data.avatar, _id: data._id });
                    history.push('./')
                } else {
                    console.log('Неверный логин или пароль')
                }
            })
            .catch((err) => {
                return console.log(err)
            })
    }
    function handleRegister(password, email) {
        register(password, email)
            .then((res) => {
                setResult(true)
            })
            .catch((err) => {
                setResult(false)
                return console.log(err)
            })
            .finally(() => {
                setInfoTooltip(true)
            })
    }
    function handleOnSignOut() {
        setCurrentUser({ name: '', about: '', avatar: '', _id: '' })
    }
    const history = useHistory();

    React.useEffect(() => {
        tokenCheck();
    }, [])
    function tokenCheck() {
        const jwt = localStorage.getItem('jwt')
        if (jwt) {
            getContent(jwt)
                .then((res) => {
                    if (res) {
                        console.log(res.data.email)
                        setEmail(res.data.email)
                        setLoggedIn(true);
                        history.push("/")
                    }
                })
                .catch((err) => console.log(err));
        }
    }
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }
    function handleConfirmDeleteClick(deleteCard) {
        setIsConfirmPopupOpen(true);
        setIdDeleteCard(deleteCard._id);
    }

    function handleCardClick(card) {
        setIsEditImagePopupOpen(true);
        setSelectedCard({ name: card.name, link: card.link });
    }


    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsEditImagePopupOpen(false);
        setIsConfirmPopupOpen(false);
        setInfoTooltip(false);
        setIdDeleteCard('');
        setSelectedCard({ name: '', link: '' });
    }
    function handleUpdateUser(userData) {
        const jwt = localStorage.getItem('jwt')
        api.updateUserTask(userData, '', jwt)
            .then(() => {
                setCurrentUser({ name: userData.name, about: userData.about, avatar: currentUser.avatar, _id: currentUser._id })
                closeAllPopups();
            })
            .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))

    }
    function handleUpdateAvatar(avatarData) {
        const jwt = localStorage.getItem('jwt')
        api.updateUserTask(avatarData, 'avatar', jwt)
            .then(() => {
                setCurrentUser({ name: currentUser.name, about: currentUser.about, avatar: avatarData.avatar, _id: currentUser._id });
                closeAllPopups();
            })
            .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
    }

    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt')
        Promise.all([api.getUserTasks(jwt), api.getCardTasks(jwt)])
            .then(([userInform, cards]) => {
                setCurrentUser(userInform);
                setCards(cards);
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
            })
    }, [])

    function handleCardLike(card) {
        const jwt = localStorage.getItem('jwt')
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked, jwt)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => console.log(err));
    }
    function handleAddCard(сardData) {
        const jwt = localStorage.getItem('jwt')
        api.createCardTask(сardData, jwt)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
    }
    function handleCardDelete() {
        const jwt = localStorage.getItem('jwt')
        api.deleteTask(idDeleteCard, jwt)
            .then(() => {
                setCards(cards.filter((card) => { return card._id !== idDeleteCard }));
                closeAllPopups();
            })
            .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
    }

    return (
        <div className="root">
            <CurrentUserContext.Provider value={currentUser}>
                <Switch>
                    <Route path='/sign-up'>
                        <Register result={result} isInfoTooltip={isInfoTooltip} handleRegister={handleRegister} />
                    </Route>
                    <Route path='/sign-in'>
                        <Login handleLogin={handleLogin} />
                    </Route>
                    <ProtectedRoute
                        path="/"
                        loggedIn={loggedIn}
                        component={MyProfile}
                        handleOnSignOut ={handleOnSignOut}
                        email={email}
                        isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                        cards={cards} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}
                        onCardLike={handleCardLike} onDeleteClick={handleConfirmDeleteClick}
                    />
                </Switch>
                <InfoTooltip isOpen={isInfoTooltip} onClose={closeAllPopups} result={result} />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard} />
                <PopupWithConfirm isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onDeleteCard={handleCardDelete} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <ImagePopup card={selectedCard} isOpen={isEditImagePopupOpen} onClose={closeAllPopups} />
            </CurrentUserContext.Provider>
        </div >
    );
}

export default App;
