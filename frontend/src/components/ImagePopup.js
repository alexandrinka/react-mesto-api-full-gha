import React from 'react'

export default function ImagePopup({ card: { isOpen, element: { name, link }}, onClose }) {
    return (
        <div className={`popup popup_image ${isOpen ? `popup_opened` : ""}`}>
            <div className="popup__content">
                <button type="button" className="popup__close popup__close_image" onClick={onClose}></button>
                <img className="popup__image" src={link} alt={name} />
                <p className="popup__signature">{name}</p>
            </div>
        </div>
    )
}
