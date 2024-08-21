import {initialCards} from "./cards.js";
import {createCard, deleteCard, likeCard} from "./card.js";
import {openModal, closeModal} from "./modal.js";
import {SubscribeForms} from "./validation";
import {ValidationService} from "./validation";
import '../pages/index.css';

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const plusButton = document.querySelector('.profile__add-button');

const popups = document.querySelectorAll('.popup');

const editPopup = document.querySelector('.popup_type_edit');
const editProfileForm = document.forms["edit-profile"]; 

const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = document.forms["new-place"];

const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupTitle = imagePopup.querySelector('.popup__caption')

const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');

editButton.addEventListener('click', () => openEditProfilePopup());
plusButton.addEventListener('click', () => openNewCardPopup());

editProfileForm.addEventListener('submit', editProfile);
newCardForm.addEventListener('submit', addCard);

const validationService = new ValidationService({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error-show'
});

validationService.subscribeForms()

popups.forEach(popup => {
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => closeModal(popup));
    popup.addEventListener('click', evt => {
        if (evt.target === popup){
            closeModal(popup);
        }
    })
});

function showCard(link, alt, title) {
    popupImage.src = link;
    popupImage.alt = alt;
    popupTitle.textContent = title;
    openModal(imagePopup);
}

function loadCards() {
    const cards = [];
    initialCards.forEach(card => {
        cards.push(createCard(cardTemplate, card, deleteCard, showCard, likeCard));
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

function openEditProfilePopup() {
    validationService.clearErrors(editProfileForm);
    editProfileForm.name.value = profileTitle.textContent;
    editProfileForm.description.value = profileDescription.textContent;
    validationService.setButtonOn(editProfileForm.querySelector('button'));
    openModal(editPopup);
}

function openNewCardPopup(){
    openModal(newCardPopup);
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
    validationService.setButtonOff(newCardForm.querySelector('button'));
    closeModal(newCardPopup);
    const createdCard = createCard(cardTemplate, newCard, deleteCard, showCard, likeCard);
    placesList.prepend(createdCard);
}

loadCards();