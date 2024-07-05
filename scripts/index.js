// @todo: Темплейт карточки
const cardtemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
export function createCard(name, link) {
    const templClone = cardtemplate.querySelector('.card').cloneNode(true);
    const delButton = templClone.querySelector('.card__delete-button');

    delButton.addEventListener('click', evt => deleteCard(evt));

    const tTitle = templClone.querySelector('.card__title');
    tTitle.insertAdjacentText = name;

    const tImg = templClone.querySelector('.card__image');
    tImg.src = link;

    placesList.append(templClone);
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
    const card = evt.target.parentElement;
    const list = document.querySelector('.places__list');
    list.removeChild(card);
}

// @todo: Вывести карточки на страницу
function updateCardList() {
    const list = document.querySelector('.places__list');
    list.replaceWith(placesList);
}