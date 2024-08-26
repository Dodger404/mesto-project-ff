import "../index.css"
import { initialCards } from "./cards.js"
import { createCard, handleLikeIcon, handleDeleteCard } from "./card.js"
import { openModal, closeModal, closeModalEvtListeners } from "./modal.js"

// DOM узлы
const cardsContainer = document.querySelector(".places__list")

const profileEditButton = document.querySelector(".profile__edit-button")
const cardAddButton = document.querySelector(".profile__add-button")

const profileTitle = document.querySelector(".profile__title")
const profileDescription = document.querySelector(".profile__description")

const profileModal = document.querySelector(".popup_type_edit")
const profileForm = profileModal.querySelector(".popup__form")
const nameInput = profileForm.querySelector(".popup__input_type_name")
const jobInput = profileForm.querySelector(".popup__input_type_description")

const newCardModal = document.querySelector(".popup_type_new-card")
const newCardForm = newCardModal.querySelector(".popup__form")
const newCardName = newCardForm.querySelector(".popup__input_type_card-name")
const newCardLink = newCardForm.querySelector(".popup__input_type_url")

const imageModal = document.querySelector(".popup_type_image")
const imageElement = imageModal.querySelector(".popup__image")
const imageCaption = imageModal.querySelector(".popup__caption")

function handleOpenCard({ name, link }) {
    imageElement.src = link
    imageElement.alt = `Изображение ${name}`
    imageCaption.textContent = name
    openModal(imageModal)
}

function handleProfileFormSubmit (evt) {
    evt.preventDefault()
    profileTitle.textContent = nameInput.value
    profileDescription.textContent = jobInput.value
    closeModal(profileModal)
}

function handleNewCardFormSubmit (evt) {
    evt.preventDefault()
    cardsContainer.prepend(
        createCard(
            {
                name: newCardName.value,
                link: newCardLink.value,
            },
            {
                openImage: handleOpenCard,
                likeCard: handleLikeIcon,
                deleteCard: handleDeleteCard,
            }
        )
    )

    closeModal(newCardModal)
    newCardForm.reset()
}

// Обработчики событий
profileForm.addEventListener("submit", handleProfileFormSubmit)
newCardForm.addEventListener("submit", handleNewCardFormSubmit)

profileEditButton.addEventListener("click", () => {
    nameInput.value = profileTitle.textContent
    jobInput.value = profileDescription.textContent
    openModal(profileModal)
})

cardAddButton.addEventListener("click", () => {
    openModal(newCardModal)
})

// Вывести карточки на страницу
initialCards.forEach((item) => {
    cardsContainer.append(
        createCard(item, {
            openImage: handleOpenCard,
            likeCard: handleLikeIcon,
            deleteCard: handleDeleteCard,
        })
    )
})

closeModalEvtListeners(profileModal)
closeModalEvtListeners(newCardModal)
closeModalEvtListeners(imageModal)