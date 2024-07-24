import {initialCards} from "./cards.js";
import '../pages/index.css';

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const plusButton = document.querySelector('.profile__add-button');

const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

editButton.addEventListener('click', (e) => {
    openModal(editPopup)
    const closeButton = editPopup.querySelector('.popup__close');
    closeButton.addEventListener('click', closeModal);
    // closeButton.removeEventListener('click', closeModal);
});
plusButton.addEventListener('click', (e) => openModal(newCardPopup))

function createCard(card, deleteCardFunction) {
    const templClone = cardTemplate.querySelector('.card').cloneNode(true);
    const delButton = templClone.querySelector('.card__delete-button');

    delButton.addEventListener('click', evt => deleteCardFunction(evt));

    const tTitle = templClone.querySelector('.card__title');
    tTitle.textContent = card.name;

    const tImg = templClone.querySelector('.card__image');
    tImg.src = card.link;
    tImg.alt = card.alt;

    return templClone;
}

function deleteCard(evt) {
    const card = evt.target.parentElement;
    placesList.removeChild(card);
}

function loadCards() {
    const cards = [];
    initialCards.forEach(card => {
        cards.push(createCard(card, deleteCard));
    })
    updateCardList(cards);
}

function updateCardList(cards) {
    for (const card of cards) {
        placesList.append(card);
    }
}

loadCards();

function openModal(window) {
    window.classList.add('popup_is-opened');
}

function closeModal(window) {
    window.classList.remove('popup_is-opened');
}
