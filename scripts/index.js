const cardtemplate = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');

export function createCard(name, link, deleteCardFunction) {
    const templClone = cardtemplate.querySelector('.card').cloneNode(true);
    const delButton = templClone.querySelector('.card__delete-button');

    delButton.addEventListener('click', evt => deleteCardFunction(evt));

    const tTitle = templClone.querySelector('.card__title');
    tTitle.insertAdjacentText = name;

    const tImg = templClone.querySelector('.card__image');
    tImg.src = link;
    
    return templClone;
}

export function deleteCard(evt) {
    const card = evt.target.parentElement;
    const list = document.querySelector('.places__list');
    list.removeChild(card);
}

export function updateCardList(cards) {
    const list = document.querySelector('.places__list');
    for (const card of cards) {
        list.append(card);
    }
}