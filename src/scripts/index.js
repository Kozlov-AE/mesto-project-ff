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
const popupImage = imagePopup.querySelector('.popup__image');
const popupTitle = imagePopup.querySelector('.popup__caption')

const editProfileForm = document.forms["edit-profile"]; 
const newCardForm = document.forms["new-place"];

const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');

editButton.addEventListener('click', () => openEditPopup());
plusButton.addEventListener('click', () => openModal(newCardPopup));

editProfileForm.addEventListener('submit', editProfile);
newCardForm.addEventListener('submit', addCard);

function showCard(link, alt, title) {
    popupImage.src = link;
    popupImage.alt = alt;
    popupTitle.textContent = title;
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
    profileTitle.textContent = editProfileForm.name.value;
    profileDescription.textContent = editProfileForm.description.value;
    closeModal(editPopup);
}

function openEditPopup() {
    editProfileForm.name.value = profileTitle.textContent;
    editProfileForm.description.value = profileDescription.textContent;
    openModal(editPopup);
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