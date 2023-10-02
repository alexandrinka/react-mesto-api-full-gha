import logo from '../images/logo.svg';
import React from 'react'
import { Link, Route, Routes } from 'react-router-dom';

export default function Header({ email, onSignOut }) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип" />
            <Routes>
                <Route path="/sign-in" element={<Link to='/sign-up' className='header__link'>Регистрация</Link>} />
                <Route path="/sign-up" element={<Link to='/sign-in' className='header__link'>Войти</Link>} />
                <Route path="/" element={
                    <div className='header__user-box'>
                        <p className='header__email'>{email}</p>
                        <button
                            onClick={() => {
                                onSignOut();
                            }}
                            className='header__link header__button'>Выйти</button>
                    </div>
                } />
            </Routes>
        </header>
    )
}
