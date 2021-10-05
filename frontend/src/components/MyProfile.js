import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import { useHistory } from 'react-router-dom';
function MyProfile(props) {
    const history = useHistory();
    function onSignOut() {
        localStorage.removeItem('jwt');
        history.push('/sign-in');
    }
    return (
        <>
            <Header >
                <div className={'header__signOut'}>
                    <p className={'header__email'}>{props.email}</p>
                    <button className={'header__button-signOut'} onClick={onSignOut}>Выйти</button>
                </div>
            </Header>
            <Main cards={props.cards} onEditProfile={props.onEditProfile} onAddPlace={props.onAddPlace} onEditAvatar={props.onEditAvatar} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onDeleteClick={props.onDeleteClick} />
            <Footer />
        </>
    );
}

export default MyProfile;
