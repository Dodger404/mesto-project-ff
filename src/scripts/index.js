import "../index.css"
import { createCard } from "./card.js"
import { openModal, closeModal, closeModalEvtListeners } from "./modal.js"
import { enableValidation, clearValidation } from "./validation.js"
import { getUserData, getInitialCards, editUserData, addNewCard, editAvatar } from "./api.js"
import { clearValue, renderLoading } from "./utils"
import {
    avatarForm,
    avatarLink, cardAddButton,
    cardsContainer, editAvatarModal,
    imageCaption,
    imageElement,
    imageModal, jobInput, nameInput, newCardForm, newCardLink, newCardModal, newCardName, profileAvatar,
    profileDescription, profileEditButton, profileForm,
    profileModal,
    profileTitle, validationSet
} from "./constants"

enableValidation(validationSet)

const openImage = (evt) => {
    imageElement.src = evt.target.src
    imageElement.alt = evt.target.alt
    imageCaption.textContent = evt.target.alt
    openModal(imageModal)
}

const addCard = (item, userId, openImage) => {
    const cardItem = createCard(item, userId, openImage)
    cardsContainer.append(cardItem)
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault()
    renderLoading(true, evt.submitter)
    editUserData(nameInput.value, jobInput.value)
        .then((res) => {
            profileTitle.textContent = res.name
            profileDescription.textContent = res.about

            closeModal(profileModal)
            evt.target.reset()
        })
        .catch((err) => {
            console.log(`Что-то пошло не так: ${ err }`)
        })
        .finally((res) => {
            renderLoading(false, evt.submitter)
        })
}

function handleNewCardFormSubmit(evt) {
    evt.preventDefault()
    renderLoading(true, evt.submitter)
    addNewCard(newCardName.value, newCardLink.value)
        .then((res) => {
            const card = createCard(res, res.owner._id, openImage)
            cardsContainer.prepend(card)
            clearValidation(newCardForm, validationSet)
            closeModal(newCardModal)
        })
        .catch((err) => {
            console.log(`Что-то пошло не так: ${ err }`)
        })
        .finally((res) => {
            renderLoading(false, evt.submitter)
        })
}

function handleAvatarFormSubmit(evt) {
    evt.preventDefault()
    renderLoading(true, evt.submitter)
    editAvatar(avatarLink.value)
        .then((res) => {
            profileAvatar.style = `background-image: url(${ res.avatar })`

            closeModal(editAvatarModal)
            evt.target.reset()
        })
        .catch((err) => {
            console.log(`Что-то пошло не так: ${ err }`)
        })
        .finally((res) => {
            renderLoading(false, evt.submitter)
        })
}

profileForm.addEventListener("submit", handleProfileFormSubmit)
newCardForm.addEventListener("submit", handleNewCardFormSubmit)
avatarForm.addEventListener("submit", handleAvatarFormSubmit)

profileEditButton.addEventListener("click", () => {
    clearValidation(profileForm, validationSet)
    nameInput.value = profileTitle.textContent
    jobInput.value = profileDescription.textContent
    openModal(profileModal)
})

cardAddButton.addEventListener("click", () => {
    clearValue([newCardName, newCardLink])
    openModal(newCardModal)
});

profileAvatar.addEventListener("click", () => {
    clearValue([avatarLink])
    clearValidation(avatarForm, validationSet)
    openModal(editAvatarModal)
})

closeModalEvtListeners(profileModal)
closeModalEvtListeners(newCardModal)
closeModalEvtListeners(imageModal)
closeModalEvtListeners(editAvatarModal)

Promise.all([getUserData(), getInitialCards()])
    .then(([userData, cards]) => {
        profileTitle.textContent = userData.name
        profileDescription.textContent = userData.about
        profileAvatar.style = `background-image: url(${ userData.avatar })`
        const userId = userData._id
        cards.forEach((item) => {
            addCard(item, userId, openImage);
        })
    })
    .catch((err) => {
        console.log(
            `Что-то пошло не так: ${ err }`
        )
    })