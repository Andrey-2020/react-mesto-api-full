import logo from '../images/logo.svg';
function Header(props) {
    return (
        <header className="header">
            <img className="logo" src={logo} alt="Логотип" />
            <div className="header__button">{props.children}</div>
        </header>
    );
}

export default Header;
