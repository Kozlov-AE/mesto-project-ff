import {initialCards, createCard, deleteCard, likeCard} from "./cards.js";
import {openModal, closeModal} from "./modal.js";
import '../pages/index.css';

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const plusButton = document.querySelector('.profile__add-button');

const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const editProfileForm = document.forms["edit-profile"]; 
const newCardForm = document.forms["new-place"];

const profile = document.querySelector('.profile');

editButton.addEventListener('click', () => openModal(editPopup));
plusButton.addEventListener('click', () => openModal(newCardPopup));

editProfileForm.addEventListener('submit', editProfile);
newCardForm.addEventListener('submit', addCard);

function showCard(link, alt, title) {
    const image = imagePopup.querySelector('.popup__image');
    const pTitle = imagePopup.querySelector('.popup__caption')
    image.src = link;
    image.alt = alt;
    pTitle.textContent = title;
    openModal(imagePopup);
}

function loadCards() {
    const cards = [];
    initialCards.forEach(card => {
        cards.push(createCard(cardTemplate, placesList, card, deleteCard, showCard, likeCard));
    })
    updateCardList(cards);
}

function updateCardList(cards) {
    for (const card of cards) {
        placesList.append(card);
    }
}

function editProfile(event) {
    event.preventDefault();
    const profileTitle = profile.querySelector('.profile__title');
    const profileDescription = profile.querySelector('.profile__description');
    profileTitle.textContent = editProfileForm.name.value;
    profileDescription.textContent = editProfileForm.description.value;
    editProfileForm.name.value = '';
    editProfileForm.description.value = '';
    closeModal(editPopup);
}

function addCard(event) {
    event.preventDefault();

    const newCard = {
        name: newCardForm["place-name"].value,
        link: newCardForm.link.value,
        alt: `На карточке изображен ${newCardForm["place-name"].value}`,
        isLiked: false
    };
    newCardForm["place-name"].value = '';
    newCardForm.link.value = '';
    closeModal(newCardPopup);
    const nc = createCard(cardTemplate, placesList, newCard, deleteCard, showCard, likeCard);
    placesList.prepend(nc);
}

loadCards();