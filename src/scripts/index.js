import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { ValidationService } from "./validation";
import "../pages/index.css";
import { ApiService } from "./api";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const editButton = document.querySelector(".profile__edit-button");
const editAvatarButton = document.querySelector(".profile__image_edit-button");
const plusButton = document.querySelector(".profile__add-button");

const popups = document.querySelectorAll(".popup");

const editPopup = document.querySelector(".popup_type_edit");
const editProfileForm = document.forms["edit-profile"];

const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardForm = document.forms["new-place"];

const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupTitle = imagePopup.querySelector(".popup__caption");

const profileElement = document.querySelector(".profile");
const profileTitle = profileElement.querySelector(".profile__title");
const profileDescription = profileElement.querySelector(
  ".profile__description"
);
const profileAvatar = profileElement.querySelector(".profile__image");
const avatarPopup = document.querySelector(".popup_type_edit-avatar");
const avatarEditForm = document.forms["edit-avatar"];

const confirmationPopup = document.querySelector(".popup_type_confirm");
const confirmationForm = document.forms["submit"];

let profileId = "";
let confirmationMethod;

editButton.addEventListener("click", () => openEditProfilePopup());
plusButton.addEventListener("click", () => openNewCardPopup());
editAvatarButton.addEventListener("click", () => openEditAvatarPopup());

editProfileForm.addEventListener("submit", editProfile);
newCardForm.addEventListener("submit", addCard);
avatarEditForm.addEventListener("submit", editAvatar);
confirmationForm.addEventListener("submit", confirmMethod);

function changeButtonText(button, text = "Сохранение...") {
  const oldText = button.textContent;
  button.textContent = text;
  return oldText;
}

const validationService = new ValidationService({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error-show",
});

const apiService = new ApiService(
  "https://nomoreparties.co/v1/wff-cohort-21/",
  "06e37664-dae8-425c-9b1a-fb1b9b710a57"
);

validationService.subscribeForms();

popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closeModal(popup));
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

function confirmMethod(event) {
  event.preventDefault();
  confirmationMethod();
  closeConfirmationPopup();
}

function showCard(link, alt, title) {
  popupImage.src = link;
  popupImage.alt = alt;
  popupTitle.textContent = title;
  openModal(imagePopup);
}

function updateCardList(cards) {
  for (const card of cards) {
    placesList.append(card);
  }
}

function editProfile(event) {
  event.preventDefault();
  const btn = event.target.querySelector(".button");
  const txt = changeButtonText(btn);
  apiService.updateProfile(editProfileForm.name.value, editProfileForm.description.value)
    .then((json) => {
      profileTitle.textContent = json.name ?? editProfileForm.name.value;
      profileDescription.textContent =
        json.description ?? editProfileForm.description.value;
      changeButtonText(btn, txt);
      closeModal(editPopup);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      changeButtonText(btn, txt);
    });
}

function openEditProfilePopup() {
  validationService.clearErrors(editProfileForm);
  editProfileForm.name.value = profileTitle.textContent;
  editProfileForm.description.value = profileDescription.textContent;
  validationService.setButtonOn(editProfileForm.querySelector("button"));
  openModal(editPopup);
}

function openNewCardPopup() {
  openModal(newCardPopup);
  if (!newCardForm["place-name"].value || !newCardForm.link.value) {
    validationService.clearErrors(newCardForm);
  }
}

function closeNewCardPopup() {
  closeModal(newCardPopup);
}

function addCard(event) {
  event.preventDefault();
  const btn = event.target.querySelector(".button");
  const txt = changeButtonText(btn);
  const newCard = {
    name: newCardForm["place-name"].value,
    link: newCardForm.link.value,
  };
  apiService.addCard(newCard)
    .then((json) => {
      newCardForm.reset();
      closeNewCardPopup();
      const createdCard = createCard(cardTemplate, json, deleteCardFunc, showCard, likeCard, profileId, apiService);
      placesList.prepend(createdCard);
    })
    .catch((err) => console.error(err))
    .finally(() => changeButtonText(btn, txt));
}

function deleteCardFunc(card, cardId) {
  openConfirmationPopup();
  confirmationMethod = () => deleteCard(card, cardId, apiService);
}

function openEditAvatarPopup() {
  validationService.clearErrors(avatarEditForm);
  avatarEditForm.link.value = profileAvatar.style.backgroundImage.slice(5, -2);
  openModal(avatarPopup);
}

function editAvatar(event) {
  event.preventDefault();
  const btn = event.target.querySelector(".button");
  const txt = changeButtonText(btn);
  apiService
    .checkImageLink(avatarEditForm.link.value)
    .then(() => apiService.sendAvatar(avatarEditForm.link.value))
    .then(() => {
      profileAvatar.style.backgroundImage = `url(${avatarEditForm.link.value})`;
      closeModal(avatarPopup);
    })
    .catch((err) => {
      validationService.showError(avatarEditForm.link, err);
    })
    .finally(() => {
      changeButtonText(btn, txt);
    });
}

function openConfirmationPopup() {
  openModal(confirmationPopup);
}

function closeConfirmationPopup() {
  closeModal(confirmationPopup);
}

Promise.all([apiService.getProfile(), apiService.getCards()])
.then(([profile, cards]) => {
  profileTitle.textContent = profile.name;
  profileDescription.textContent = profile.about;
  profileAvatar.style.backgroundImage = `url(${profile.avatar})`;
  profileId = profile._id
  const mappedCards = cards.map((card) => createCard(cardTemplate, card, deleteCardFunc, showCard, likeCard, profileId, apiService));
  updateCardList(mappedCards);
})
.catch((err) => console.error(err));