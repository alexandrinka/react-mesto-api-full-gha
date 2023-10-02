import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';

export default function Login({ handleLogin }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth.authorize(formValue.password, formValue.email)
      .then((data) => {
        if (data.token) {
          handleLogin(data.token, formValue.email);
          navigate('/', { replace: true });
        }
      })

      .catch((err) =>
        console.log(`Ошибка авторизации: ${err}`)
      );
  }

  return (
    <section className='entrance' >
      <div className='entrance__container'>
        <h3 className='entrance__title'>Вход</h3>
        <form onSubmit={handleSubmit} className='entrance__form' name='entrance-form-entrance'>
          <input
            value={formValue.email}
            onChange={handleChange}
            id="loggin-input"
            type="email"
            placeholder="Email"
            className="entrance__input"
            name="email"
            minLength="2"
            maxLength="40"
            required
          />

          <input
            value={formValue.password}
            onChange={handleChange}
            id="password-input"
            type="password"
            placeholder="Пароль"
            className="entrance__input"
            name="password"
            minLength="4"
            maxLength="10"
            required
          />

          <button className='entrance__submit-btn' type="submit">Войти</button>
        </form>
      </div>
    </section>
  )
}
