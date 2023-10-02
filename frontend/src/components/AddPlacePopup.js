import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

export default function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlaceSubmit({
            name,
            link,
        });
    }

    return (
        <PopupWithForm
            title={"Новое место"}
            name={"add-place"}
            buttonName={"Создать"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input value={name || ''} onChange={handleChangeName} className="popup__field popup__field_type_name-place" type="text" name="name" id="name-place"
                placeholder="Название" required minLength="2" maxLength="30" />
            <span className="popup__field-error name-place-error"></span>
            <input value={link || ''} onChange={handleChangeLink} className="popup__field popup__field_type_link" type="url" name="link" id="link-place"
                placeholder="Ссылка на картинку" required />
            <span className="popup__field-error link-place-error"></span>
        </PopupWithForm>
    )
}
