import React from 'react'

export default function PopupWithForm({ title, name, buttonName, isOpen, children, onClose, onSubmit }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ""}`}>
            <div className="popup__content">
                <button type="button" className={`popup__close popup__close_${name}`} onClick={onClose}></button>
                <form className={`popup__form popup__form_${name}`} action="#" method="post"
                    name={`popup__form_${name}`} onSubmit={onSubmit}>
                    <h2 className={`popup__title popup__title_${name}`}>{title}</h2>
                    {children}
                    <button className="popup__btn popup__btn-place" type="submit">{buttonName}</button>
                </form>
            </div>
        </div>
    )
}
