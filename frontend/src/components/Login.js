import React from 'react';
import Header from './Header'
import { useHistory } from 'react-router-dom';
import { authorize } from '../utils/userAuth.js'
function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();
    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        props.handleLogin(email, password);
    }

    function handleRegistrPush() {
        history.push('/sign-up');
    }
    return (
        <section className={'sign'}>
            <Header >
                <button className={'header__sign'} onClick={handleRegistrPush}>Регистрация</button>
            </Header>
            <div className={`sign__container`}>
                <h2 className={`sign__heading`}>Вход</h2>
                <form className={`form form_type_sign`} name={`form-login`} onSubmit={handleSubmit}>
                    <fieldset className="form__input-container form__input-container_type_sign">
                        <input className="form__input form__input-sign form__input_type_username" type="text" name="username" placeholder="Название"
                            minLength="2" maxLength="30" id="username-input" value={email} onChange={handleEmailChange} required />
                        <span className="username-input-error form__input-error"></span>
                        <input className="form__input form__input-sign form__input_type_password" type="password" name="password"
                            placeholder="Ссылка на картинку" id="password-input" value={password} onChange={handlePasswordChange} required />
                        <span className="password-input-error form__input-error"></span>
                    </fieldset>
                    <button className="form__button form__button_type_sign" type="submit" aria-label="submit">Войти</button>
                </form>
            </div>
        </section>
    )
}

export default Login;