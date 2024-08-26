export function handleLikeIcon(evt) {
    evt.target.classList.toggle("card__like-button_is-active")
}

export function handleDeleteCard(evt) {
    evt.target.closest(".card").remove()
}

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content

// Функция создания карточки
export function createCard(item, {openImage, likeCard, deleteCard}) {
    const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true)
    const cardImage = cardElement.querySelector(".card__image")

    cardImage.src = item.link
    cardImage.alt = item.name
    cardElement.querySelector(".card__title").textContent = item.name


    const deleteButton = cardElement.querySelector(".card__delete-button")
    const likeButton = cardElement.querySelector(".card__like-button")

    if (likeCard) {
        likeButton.addEventListener("click", likeCard)
    }

    if (deleteCard) {
        deleteButton.addEventListener("click", deleteCard)
    }

    if (openImage) {
        cardImage.addEventListener("click", () => openImage(item))
    }

    return cardElement;
}