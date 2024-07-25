import {initialCards} from "./cards.js";
import {openModal} from "./modal.js";
import '../pages/index.css';

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const plusButton = document.querySelector('.profile__add-button');

const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

editButton.addEventListener('click', () => openModal(editPopup));
plusButton.addEventListener('click', () => openModal(newCardPopup));

function showCard(link, alt, title) {
    const image = imagePopup.querySelector('.popup__image');
    const pTitle = imagePopup.querySelector('.popup__caption')
    image.src = link;
    image.alt = alt;
    pTitle.textContent = title;
    openModal(imagePopup);
}

function createCard(card, deleteCardFunction, openPopup, likeCard) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    const delButton = newCard.querySelector('.card__delete-button');

    const tTitle = newCard.querySelector('.card__title');
    tTitle.textContent = card.name;

    const tImg = newCard.querySelector('.card__image');
    tImg.src = card.link;
    tImg.alt = card.alt;

    delButton.addEventListener('click', evt => deleteCardFunction(newCard));
    tImg.addEventListener('click', () => openPopup(card.link, card.alt, card.name));

    return newCard;
}

function deleteCard(card) {
    placesList.removeChild(card);
}

function loadCards() {
    const cards = [];
    initialCards.forEach(card => {
        cards.push(createCard(card, deleteCard, showCard));
    })
    updateCardList(cards);
}

function updateCardList(cards) {
    for (const card of cards) {
        placesList.append(card);
    }
}

loadCards();