import React from 'react'
import PopupWithForm from './PopupWithForm.js';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const inputRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: inputRef.current.value,
        });
    }
    return (
        <PopupWithForm
            title={"Обновить аватар"}
            name={"update-avatar"}
            isOpen={isOpen}
            buttonName={"Сохранить"}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input ref={inputRef} className="popup__field popup__field_type_link" type="url" name="link" id="avatar-image"
                placeholder="Ссылка на картинку" required />
            <span className="popup__field-error avatar-image-error"></span>
        </PopupWithForm>
    )
}