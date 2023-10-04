import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Card({ onCardClick, card, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner === currentUser._id;

    const isLiked = card.likes.some(id => id === currentUser._id);
    const cardLikeButtonClassName = (
        `elements__heart ${isLiked && 'elements__heart_active'}`
    );

    function handleCardClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleCardDelete() {
        onCardDelete(card);
    }

    return (
        <li className="elements__list-item">
            {isOwn && <button type="button" className='elements__trash' onClick={handleCardDelete}/>}
            <div className="elements__container_img">
                <img className="elements__img" src={card.link} alt={`${card.name}`} onClick={handleCardClick} />
            </div>
            <div className="elements__description">
                <h2 className="elements__name">{card.name}</h2>
                <div className="elements__like">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="elements__count-like">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}
