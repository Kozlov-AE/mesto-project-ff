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

placesList.addEventListener('click', e => {
   if (e.target.classList.contains('card__image')){
       const image = imagePopup.querySelector('.popup__image');
       image.src = e.target.src;
       image.alt = e.target.alt;
       const parent = e.target.parentElement;
       const parentTitle = parent.querySelector('.card__title');
       const title = imagePopup.querySelector('.popup__caption')
       title.textContent = parentTitle.textContent;
       openModal(imagePopup);
   } 
});
editButton.addEventListener('click', () => openModal(editPopup));
plusButton.addEventListener('click', () => openModal(newCardPopup));

function createCard(card, deleteCardFunction) {
    const templClone = cardTemplate.querySelector('.card').cloneNode(true);
    const delButton = templClone.querySelector('.card__delete-button');

    const tTitle = templClone.querySelector('.card__title');
    tTitle.textContent = card.name;

    const tImg = templClone.querySelector('.card__image');
    tImg.src = card.link;
    tImg.alt = card.alt;

    delButton.addEventListener('click', evt => deleteCardFunction(templClone));

    return templClone;
}

function deleteCard(card) {
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