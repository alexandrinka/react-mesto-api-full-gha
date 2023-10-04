import { useEffect, useState } from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { api } from "../utils/api";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from "./ProtectedRoute";
import { setToken, getToken, removeToken } from '../utils/token';
import * as auth from '../utils/auth';
import InfoTooltip from "./InfoTooltip";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isInfoTooltip, setInfoTooltip] = useState({ isOpen: false, successful: false });
    const [selectedCard, setSelectedCard] = useState({ isOpen: false, element: {} });
    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setTokenState] = useState(getToken());
    const [email, setEmail] = useState('');
    const navigate = useNavigate();


    const handleLogin = (token, newEmail) => {
        setEmail(newEmail);
        setTokenState(token);
        setLoggedIn(true);
        setToken(token);
        api._token = token;
    }

    const tokenCheck = () => {
        if (!token) {
            return;
        }

        auth.checkToken(token).then((res) => {
            if (res) {
                setLoggedIn(true);
                navigate('/', { replace: true });
                setEmail(res.email);
            }
        })
            .catch((err) =>
                console.log(`Ошибка токена: ${err}`)
            );
    }

    useEffect(() => {
        tokenCheck();
    }, []);

    const handleEditProfile = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleAddPlace = () => {
        setIsAddPlacePopupOpen(true);
    }

    const handleEditAvatar = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleCardClick = (card) => {
        setSelectedCard({ ...selectedCard, isOpen: true, element: card });
    }

    function handleInfoTooltip(result) {
        setInfoTooltip({ ...isInfoTooltip, isOpen: true, successful: result });
    }

    const handlecloseAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({ ...selectedCard, isOpen: false });
        setInfoTooltip(false);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(id => id === currentUser._id);

        api.likeCard(card._id, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch(err => console.log("Ошибка в лайке:" + err));
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            const newCards = cards.filter((c) => c._id === card._id ? false : true);
            setCards(newCards);
        })
            .catch(err => console.log("Ошибка в удалении карточки:" + err));
    }

    function handleUpdateUser(newUserData) {
        api.updateInfoUser(newUserData)
            .then(data => {
                setCurrentUser(data);
                handlecloseAllPopups();
            })
            .catch(err => console.log("Ошибка в обновлении информации о пользователе:" + err));
    }

    function handleUpdateAvatar(newAvatar) {
        api.updateAvatar(newAvatar)
            .then(data => {
                setCurrentUser(data);
                handlecloseAllPopups();
            })
            .catch(err => console.log("Ошибка в обновлении аватара пользователя:" + err));
    }

    function handleAddPlaceSubmit(cardData) {
        api.createCard(cardData)
            .then(newCard => {
                setCards([newCard, ...cards]);
                handlecloseAllPopups();
            })
            .catch(err => console.log("Ошибка в добавлении карточки:" + err));
    }

    useEffect(() => {
        if (loggedIn) {
            api.getUserInfo()
                .then(data => {
                    setCurrentUser(data);
                })
                .catch(err => {
                    console.log("Ошибка в загрузке пользователькой информации:" + err);
                })
        }
    }, [loggedIn]);

    useEffect(() => {
        if (loggedIn) {
            api.getCards()
                .then((data) => {
                    setCards(data);
                })
                .catch(err => {
                    console.log("Ошибка в загрузке информации о карточках" + err);
                })
        }
    }, [loggedIn]);

    function handleSignOut() {
        setEmail('');
        setLoggedIn(false);
        navigate('/sign-in', { replace: true });
        removeToken();
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header onSignOut={handleSignOut} email={email} />
                <Routes>
                    <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
                    <Route path="/sign-in" element={<Login handleLogin={handleLogin} />}></Route>
                    <Route path="/sign-up" element={<Register handleRegister={handleInfoTooltip} />}></Route>
                    <Route path="/" element={<ProtectedRouteElement
                        element={Main}
                        loggedIn={loggedIn}
                        onEditAvatar={handleEditAvatar}
                        onAddPlace={handleAddPlace}
                        onEditProfile={handleEditProfile}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        cards={cards}
                    />} />
                </Routes>
                <Footer />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={handlecloseAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={handlecloseAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={handlecloseAllPopups}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                />
                <ImagePopup
                    card={selectedCard}
                    onClose={handlecloseAllPopups}>
                </ImagePopup>

                <InfoTooltip
                    result={isInfoTooltip}
                    onClose={handlecloseAllPopups} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
