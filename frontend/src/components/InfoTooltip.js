import React from 'react';
import ok from '../images/ok.svg';
import err from '../images/error.svg';

function InfoTooltip({ onClose, result: { isOpen, successful } }) {
    return (
        <section className={`popup popup_type_info ${isOpen ? `popup_opened` : ""}`}>
            <div className="popup__content popup__content_type_info">
                <img className="popup__image popup__image_type_info" src={successful ? ok : err} alt='Значок результата операции' />
                <h2 className={`popup__title popup__title_type_info`}>{successful ? 'Вы успешно зарегестрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
                <button onClick={onClose} className="popup__close" type="button" aria-label="Закрыть окно" />
            </div>
        </section>
    )
}
export default InfoTooltip;