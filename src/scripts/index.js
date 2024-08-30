import {createCard, likeCard} from "./card.js";
import {openModal, closeModal} from "./modal.js";
import {ValidationService} from "./validation";
import '../pages/index.css';
import {ApiService} from "./api";

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const editAvatarButton = document.querySelector('.profile__image_edit-button');
const plusButton = document.querySelector('.profile__add-button');

const popups = document.querySelectorAll('.popup');

const editPopup = document.querySelector('.popup_type_edit');
const editProfileForm = document.forms["edit-profile"];

const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = document.forms["new-place"];

const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupTitle = imagePopup.querySelector('.popup__caption')

const profileElement = document.querySelector('.profile');
const profileTitle = profileElement.querySelector('.profile__title');
const profileDescription = profileElement.querySelector('.profile__description');
const profileAvatar = profileElement.querySelector('.profile__image');
const avatarPopup = document.querySelector('.popup_type_edit-avatar');
const avatarEditForm = document.forms["edit-avatar"];

const confirmationPopup = document.querySelector('.popup_type_confirm')
const confirmationForm = document.forms["submit"];

let profileId = '';
let confirmationMethod;

editButton.addEventListener('click', () => openEditProfilePopup());
plusButton.addEventListener('click', () => openNewCardPopup());
editAvatarButton.addEventListener('click', () => openEditAvatarPopup());

editProfileForm.addEventListener('submit', editProfile);
newCardForm.addEventListener('submit', addCard);
avatarEditForm.addEventListener('submit', editAvatar);
confirmationForm.addEventListener('submit', () => {
    confirmationMethod();
    closeConfirmationPopup();
});

const validationService = new ValidationService({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error-show'
});

const apiService = new ApiService('https://nomoreparties.co/v1/wff-cohort-21/', '06e37664-dae8-425c-9b1a-fb1b9b710a57')

validationService.subscribeForms();

popups.forEach(popup => {
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => closeModal(popup));
    popup.addEventListener('click', evt => {
        if (evt.target === popup) {
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
    apiService.get('cards')
        .then(json => json.map(card => createCard(cardTemplate, card, deleteCard, showCard, likeCard, profileId, apiService)))
        .then(cards => updateCardList(cards))
        .catch(err => console.error(err));
}

function updateCardList(cards) {
    for (const card of cards) {
        placesList.append(card);
    }
}

function editProfile(event) {
    event.preventDefault();
    apiService.path('users/me', {
        name: editProfileForm.name.value,
        about: editProfileForm.description.value
    })
        .then(json => {
            console.log(json);
            profileTitle.textContent = json.name ?? editProfileForm.name.value;
            profileDescription.textContent = json.description ?? editProfileForm.description.value;
            closeModal(editPopup);
        })
        .catch(err => console.error(err));
}

function openEditProfilePopup() {
    validationService.clearErrors(editProfileForm);
    editProfileForm.name.value = profileTitle.textContent;
    editProfileForm.description.value = profileDescription.textContent;
    validationService.setButtonOn(editProfileForm.querySelector('button'));
    openModal(editPopup);
}

function openNewCardPopup() {
    openModal(newCardPopup);
}

function addCard(event) {
    event.preventDefault();
    const newCard = {
        name: newCardForm["place-name"].value,
        link: newCardForm.link.value,
    };
    apiService.post('cards', newCard)
        .then(json => {
            newCardForm.reset();
            // newCardForm["place-name"].value = '';
            // newCardForm.link.value = '';
            validationService.setButtonOff(newCardForm.querySelector('button'));
            closeModal(newCardPopup);
            const createdCard = createCard(cardTemplate, json, deleteCard, showCard, likeCard, profileId, apiService);
            placesList.prepend(createdCard);
        });
}

function deleteCard(card, cardId) {
    confirmationMethod = () => {
        apiService.deleteCard(cardId)
            .then((json) => {
                    if (json != undefined) {
                        card.remove();
                    }
                }
            );
        };
    openConfirmationPopup();
}

function loadProfile() {
    apiService.get('users/me')
        .then(json => {
            profileTitle.textContent = json.name;
            profileDescription.textContent = json.about;
            profileAvatar.style.backgroundImage = `url(${json.avatar})`;
            profileId = json._id;
        })
}

function openEditAvatarPopup() {
    avatarEditForm.link.value = profileAvatar.style.backgroundImage.slice(5, -2);
    validationService.clearErrors(avatarEditForm);
    openModal(avatarPopup);
}

function editAvatar(event) {
    event.preventDefault();
    apiService.checkImageLink(avatarEditForm.link.value)
        .then(() => apiService.sendAvatar(avatarEditForm.link.value))
        .then(res => {
            return loadProfile();
        })
        .then(() => closeModal(avatarPopup))
        .catch(err => {
            validationService.showError(avatarEditForm.link, err)
        });
}

function openConfirmationPopup() {
    openModal(confirmationPopup);
}

function closeConfirmationPopup() {
    closeModal(confirmationPopup);
}

loadProfile();
loadCards();