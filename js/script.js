const map = document.querySelector('.map')
const popUpAlert = document.querySelector('.pop-up-alert')

let block = document.querySelector('.block')

map.addEventListener('mousedown', () => {
    popUpAlert.classList.add('clicked')
})

map.addEventListener('touchmove', () => {
    popUpAlert.classList.add('clicked')
})