// @todo: Темплейт карточки

// @todo: DOM узлы


// @todo: Функция создания карточки
function createCard(name, link) {
   const cardtemplate = document.querySelector('#card-template').content;
   const templClone = cardtemplate.querySelector('.card').cloneNode(true);
   const delButton = cardtemplate.querySelector('.card__delete-button');
   delButton.addEventListener('click', deleteCard);
   
   const tTitle = templClone.querySelector('.card__title');
   tTitle.insertAdjacentText = name;
   
   const tImg = templClone.querySelector('.card__image');
   tImg.src = link;
}

// @todo: Функция удаления карточки
function deleteCard() {
    
    
}

// @todo: Вывести карточки на страницу
