export function renderLoading(isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
    if (isLoading) {
        button.textContent = loadingText;
    } else {
        button.textContent = buttonText;
    }
}

export function clearValue (elem) {
    elem.forEach(item => item.value = '')
}