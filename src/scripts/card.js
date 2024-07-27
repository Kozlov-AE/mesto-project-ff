export function createCard(cardTemplate, card, deleteCardFunction, openPopup, likeCard) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    const delButton = newCard.querySelector('.card__delete-button');
    const likeButton = newCard.querySelector('.card__like-button');

    const tTitle = newCard.querySelector('.card__title');
    tTitle.textContent = card.name;

    const tImg = newCard.querySelector('.card__image');
    tImg.src = card.link;
    tImg.alt = card.alt;

    delButton.addEventListener('click', () => deleteCardFunction(newCard));
    tImg.addEventListener('click', () => openPopup(card.link, card.alt, card.name));
    likeButton.addEventListener('click', () => likeCard(newCard));

    return newCard;
}

export function deleteCard(card) {
    card.remove();
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
