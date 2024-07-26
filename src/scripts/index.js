import {initialCards} from "./cards.js";
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

function createCard(card, deleteCardFunction, openPopup, likeCard) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    const delButton = newCard.querySelector('.card__delete-button');
    const likeButton = newCard.querySelector('.card__like-button');

    const tTitle = newCard.querySelector('.card__title');
    tTitle.textContent = card.name;

    const tImg = newCard.querySelector('.card__image');
    tImg.src = card.link;
    tImg.alt = card.alt;

    delButton.addEventListener('click', evt => deleteCardFunction(newCard));
    tImg.addEventListener('click', () => openPopup(card.link, card.alt, card.name));
    likeButton.addEventListener('click', () => likeCard(newCard));

    return newCard;
}

function deleteCard(card) {
    placesList.removeChild(card);
}

function loadCards() {
    const cards = [];
    initialCards.forEach(card => {
        cards.push(createCard(card, deleteCard, showCard, likeCard));
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
    const nc = createCard(newCard, deleteCard, showCard, likeCard);
    placesList.prepend(nc);
}

function likeCard(card){
    card.isLiked = !card.isLiked;
    const heart = card.querySelector('.card__like-button');
    if (card.isLiked){
        heart.classList.add('card__like-button_is-active');
    } else {
        heart.classList.remove('card__like-button_is-active');
    }
}

loadCards();