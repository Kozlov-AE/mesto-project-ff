import {initialCards} from "./cards.js";

const cardTemplate = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');

export function createCard(card, deleteCardFunction) {
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

export function deleteCard(evt) {
    const card = evt.target.parentElement;
    placesList.removeChild(card);
}

function loadCards(){
    const cards = [];
    initialCards.forEach(card => {
        cards.push(createCard(card, deleteCard));
    })   
    updateCardList(cards);
}

export function updateCardList(cards) {
    for (const card of cards) {
        placesList.append(card);
    }
}

loadCards();
