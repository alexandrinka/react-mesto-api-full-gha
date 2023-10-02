import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import * as auth from '../utils/auth';

export default function Register({ handleRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.register(password, email).then((res) => {
            if (typeof res.error == "undefined") {
                navigate('/sign-in', { replace: true });
                handleRegister(true);
            } else {
                handleRegister(false);
            }
        })
            .catch((err) =>
                console.log(`Ошибка регистрации: ${err}`)
            );;
    }

    return (
        <section className='entrance page__center' >
            <div className='entrance__container'>
                <h3 className='entrance__title'>Регистрация</h3>
                <form onSubmit={handleSubmit} className='entrance__form' name='entrance-form-register'>
                    <input
                        value={email}
                        onChange={handleChangeEmail}
                        id='email-input'
                        type='email'
                        placeholder='Email'
                        className='entrance__input'
                        name='email'
                        minLength='2'
                        maxLength='40'
                        required
                    />

                    <input
                        value={password}
                        onChange={handleChangePassword}
                        id="password-input"
                        type="password"
                        placeholder="Пароль"
                        className="entrance__input"
                        name="password"
                        minLength="4"
                        maxLength="10"
                        required
                    />

                    <button className='entrance__submit-btn' type="submit">Зарегистрироваться</button>
                    <Link to='sign-in' className='entrance__link'>Уже зарегестрированы? Войти</Link>
                </form>
            </div>
        </section>
    )
}
