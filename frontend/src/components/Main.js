import Jacques_Yves_Cousteau from '../images/Jacques_Yves_Cousteau.jpg';
import React from 'react'
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Main({ onEditAvatar, onAddPlace, onEditProfile, onCardClick, onCardLike, onCardDelete, cards }) {
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__content">
                    <div className="profile__image" onClick={onEditAvatar}>
                        <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
                    </div>
                    <div className="profile__info">
                        <div className="profile__edit">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button type="button" className="profile__symbol-edit" onClick={onEditProfile}></button>
                        </div>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((item) => (
                        <Card
                            key={item['_id']}
                            card={item}
                            onCardClick = {onCardClick}
                            onCardLike = {onCardLike} 
                            onCardDelete = {onCardDelete}/>)
                    )}
                </ul>
            </section>
        </main>
    )
}
