popUpWindows($('.hitbox'))
show = true

function setLocation(curLoc) {
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + 'house?id=' + curLoc;
    window.history.pushState({ path: newurl }, '123', newurl);
}
// setLocation("1")

function popUpWindows(elem_to_hover) {

    elem_to_hover.on({
        mouseenter: function() {
            if (show) {
                hov = $(this)
                selected_house = $(this).attr('id')
                hovered_elem_position_left = hov.position().left - $('.popUpWindow').width() / 2
                hovered_elem_position_top = hov.position().top - hov.position().top / 2
                if (hovered_elem_position_top < 50)
                    hovered_elem_position_top = hovered_elem_position_top + 50
                if (hovered_elem_position_top >= 150)
                    hovered_elem_position_top = hovered_elem_position_top + 100
                if (hovered_elem_position_left <= 100)
                    hovered_elem_position_left = hovered_elem_position_left + $('.popUpWindow').width() + hov.width() + 100
                $('.popUpWindow').css({ top: hovered_elem_position_top, left: hovered_elem_position_left })
            }
        },
        mouseleave: function(e) {
            if (!$(e.toElement).hasClass('popUpWindow')) {
                selected_house = null
                closePopUpWindow()
            }
        }
    })
    $('.popUpWindow').on({
        mouseleave: function() {
            selected_house = null
            closePopUpWindow()
        }
    })
}
$('#more-house-info').on('click', function() {
    $('.house-info').toggleClass('hiden')
    show = false
    if (selected_house !== null && selected_house !== undefined) {
        $('.map').css({
                'filter': 'blur(5px)',
                '-webkit-filter': 'blur(5px)',
                '-moz-filter': 'blur(5px)',
                '-o-filter': 'blur(5px)',
                '-ms-filter': 'blur(5px)'
            })
            // setLocation(selected_house)
        $('.popUpWindow').css({ top: -1000, left: -1000 })

    }
})
$('.house-info .close-info-container .close-btn').on('click', function() {
    $('.house-info').toggleClass('hiden')
    $('.map').css({
        'filter': 'blur(0px)',
        '-webkit-filter': 'blur(0px)',
        '-moz-filter': 'blur(0px)',
        '-o-filter': 'blur(0px)',
        '-ms-filter': 'blur(0px)'
    })
    show = true
})

function closePopUpWindow() {
    $('.popUpWindow').css({ top: -1000, left: -1000 })
    show = true
}