export function createCard(
  cardTemplate,
  card,
  deleteCardFunction,
  openPopup,
  likeCard,
  profileId,
  apiService
) {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);
  const delButton = newCard.querySelector(".card__delete-button");
  const likeButton = newCard.querySelector(".card__like-button");
  const likeCount = newCard.querySelector(".card__like-counter");
  const heart = newCard.querySelector(".card__like-button");

  const tTitle = newCard.querySelector(".card__title");
  tTitle.textContent = card.name;

  const tImg = newCard.querySelector(".card__image");
  tImg.src = card.link;
  tImg.alt = card.name;

  likeCount.textContent = card.likes.length;

  if (card.owner._id != profileId) {
    delButton.classList.add("card__delete-button--disabled");
  } else {
    delButton.addEventListener("click", () => {
      deleteCardFunction(newCard, card._id);
    });
  }

  tImg.addEventListener("click", () =>
    openPopup(card.link, card.alt, card.name)
  );

  if (card.likes.some((x) => x._id === profileId)) {
    heart.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () =>
    likeCard(newCard, card._id, apiService)
  );

  return newCard;
}

export function deleteCard(card, cardId, apiService) {
  apiService.deleteCard(cardId).then((json) => {
    if (json != undefined) {
      card.remove();
    }
  });
}

export function likeCard(card, cardId, apiService) {
  const likeCount = card.querySelector(".card__like-counter");
  const heart = card.querySelector(".card__like-button");
  if (!heart.classList.contains("card__like-button_is-active")) {
    apiService.likeCard(cardId).then((json) => {
      if (json != undefined) {
        heart.classList.add("card__like-button_is-active");
        likeCount.textContent = json.likes.length;
      }
    });
  } else {
    apiService.unlikeCard(cardId).then((json) => {
      if (json != undefined) {
        heart.classList.remove("card__like-button_is-active");
        likeCount.textContent = json.likes.length;
      }
    });
  }
}
