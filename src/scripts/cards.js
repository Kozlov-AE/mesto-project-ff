export const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
        alt: "Горный пейзаж Архыза",
        isLiked: false
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
        alt: "Живописный пейзаж Челябинской области с озером и лесистыми берегами",
        isLiked: false
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
        alt: "Городской пейзаж Иваново",
        isLiked: false
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
        alt: "Живописный пейзаж Камчатки с вулканом",
        isLiked: false
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
        alt: "Панорамный вид на реку и леса Холмогорского района",
        isLiked: false
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
        alt: "Живописный вид на озеро Байкал",
        isLiked: false
    }
]

export function createCard(cardTemplate, placesList, card, deleteCardFunction, openPopup, likeCard) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    const delButton = newCard.querySelector('.card__delete-button');
    const likeButton = newCard.querySelector('.card__like-button');

    const tTitle = newCard.querySelector('.card__title');
    tTitle.textContent = card.name;

    const tImg = newCard.querySelector('.card__image');
    tImg.src = card.link;
    tImg.alt = card.alt;

    delButton.addEventListener('click', evt => deleteCardFunction(newCard, placesList));
    tImg.addEventListener('click', () => openPopup(card.link, card.alt, card.name));
    likeButton.addEventListener('click', () => likeCard(newCard));

    return newCard;
}

export function deleteCard(card, placesList) {
    placesList.removeChild(card);
}

export function likeCard(card){
    card.isLiked = !card.isLiked;
    const heart = card.querySelector('.card__like-button');
    if (card.isLiked){
        heart.classList.add('card__like-button_is-active');
    } else {
        heart.classList.remove('card__like-button_is-active');
    }
}
