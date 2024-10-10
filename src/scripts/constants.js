export const cardsContainer = document.querySelector(".places__list")

export const profileEditButton = document.querySelector(".profile__edit-button")
export const cardAddButton = document.querySelector(".profile__add-button")

export const profileTitle = document.querySelector(".profile__title")
export const profileDescription = document.querySelector(".profile__description")
export const profileAvatar = document.querySelector(".profile__image")

export const editAvatarModal = document.querySelector(".popup_type_edit-avatar")
export const avatarForm = editAvatarModal.querySelector(".popup__form")
export const avatarLink = avatarForm.querySelector(".popup__input_type_url")

export const profileModal = document.querySelector(".popup_type_edit")
export const profileForm = profileModal.querySelector(".popup__form")
export const nameInput = profileForm.querySelector(".popup__input_type_name")
export const jobInput = profileForm.querySelector(".popup__input_type_description")

export const newCardModal = document.querySelector(".popup_type_new-card")
export const newCardForm = newCardModal.querySelector(".popup__form")
export const newCardName = newCardForm.querySelector(".popup__input_type_card-name")
export const newCardLink = newCardForm.querySelector(".popup__input_type_url")

export const imageModal = document.querySelector(".popup_type_image")
export const imageElement = imageModal.querySelector(".popup__image")
export const imageCaption = imageModal.querySelector(".popup__caption")

export const validationSet = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
}