// -----------------------------------------------------------
//              Alert Algorithm
// -----------------------------------------------------------
const map = document.querySelector('.map')
const popUpAlert = document.querySelector('.pop-up-alert')

let block = document.querySelector('.block')

map.addEventListener('mousedown', () => {
    popUpAlert.classList.add('clicked')
})

map.addEventListener('touchmove', () => {
    popUpAlert.classList.add('clicked')
})
// -----------------------------------------------------------

// -----------------------------------------------------------
//              Hitbox system
// -----------------------------------------------------------
const images = document.querySelectorAll('.house')
const svg = document.querySelector('svg')
const polygons = document.querySelectorAll('polygon')

polygons.forEach((polygon, PolygonIndex) => {
    polygon.addEventListener('mouseover', () => {
            images.forEach((image, ImageIndex) => {
                if(PolygonIndex === ImageIndex) {
                    image.classList.add('hovered')
                }
            })
    })
})

polygons.forEach((polygon, PolygonIndex) => {
    polygon.addEventListener('mouseout', () => {
            images.forEach((image, ImageIndex) => {
                if(PolygonIndex === ImageIndex) {
                    image.classList.remove('hovered')
                }
            })
    })
})

//                    Old <div> version (WORKING, BUT OLD)

    // blocks.forEach((block, BlockIndex) => {
    //     block.addEventListener('mouseover', (event) => {
    //         if(event.target.classList.contains('hitbox')){
    //             images.forEach((image, ImageIndex) => {
    //                 if(BlockIndex == ImageIndex) {
    //                     image.classList.add('hovered')
    //                 }
    //             })
    //         }
    //     })

    // block.addEventListener('mouseout', () => {
    //     images.forEach((image, ImageIndex) => {
    //         if(BlockIndex == ImageIndex) {
    //             image.classList.remove('hovered')
    //         }
    //     })
    // })
// })

//                   Jquery version (NOT WORKING)

// $(blocks).each((block, BlockIndex) => {
//     $(block).hover((event) => {
//         if(event.target.hasClass('hitbox')) {
//             $(images).each((image, ImageIndex) => {
//                 if(BlockIndex == ImageIndex) {
//                     $(image).fadeIn('slow')
//                 }
//             })
//         }
//     })
// })
// -----------------------------------------------------------


const cards = document.querySelectorAll('.flats-card')

cards.forEach((card) => {
    card.addEventListener('mouseover', () => {
        if(card.classList.contains('sold')) {
            card.classList.remove('sold')
            card.classList.add('error')
        }else {
            card.classList.toggle('hovered')
        }
    })
    card.addEventListener('mouseout', () => {
        if(card.classList.contains('error')) {
            card.classList.remove('error')
            card.classList.add('sold')
        }else {
            card.classList.toggle('hovered')
        }
    })
})
// -----------------------------------------------------------
//              Debug system
// -----------------------------------------------------------

// document.addEventListener('mousemove', (e) => {
//     document.querySelector('.test').innerHTML = `X = ${e.pageX}; Y = ${e.pageY} == ${e.target.tagName}`
// })

// document.addEventListener('click', (e) => {
//     navigator.clipboard.writeText(`${e.pageX},${e.pageY}`)
// })