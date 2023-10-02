import { useEffect, useState, useContext } from "react";
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setTitle(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeAbout(e) {
        setTitle(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: title,
        });
    }

    return (
        <PopupWithForm
            title='Редактировать профиль'
            name={"edit-profile"}
            isOpen={isOpen}
            buttonName={"Сохранить"}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input value={name || ''} onChange={handleChangeName} className="popup__field popup__field_type_name" type="text" name="name" id="name-profile" placeholder="Имя" required minLength="2" maxLength="40" />
            <span className="popup__field-error name-profile-error"></span>
            <input value={title || ''} onChange={handleChangeAbout} className="popup__field popup__field_type_about-me" type="text" name="about" placeholder="Обо мне" id="about-me" required minLength="2" maxLength="200" />
            <span className="popup__field-error about-me-error"></span>
        </PopupWithForm>
    )
}
export default EditProfilePopup;