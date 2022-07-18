elem_to_hover = $('.hitbox')
popUpWindows(elem_to_hover)
openHouse(1)
show = true
short_arr_houses = null

function setLocation(curLoc, titile, keywords, description) {
    var newurl = window.location.protocol + "//" + window.location.host + '/map_page?id=' + curLoc
    window.history.pushState(null, null, newurl)
    document.title = titile
    $('meta[name=description]').attr('content', description)
    $('meta[name=Keywords]').attr('content', keywords)
}

function popUpWindows(elem_to_hover) {
    elem_to_hover.on({
        mouseenter: function() {
            if (show && short_arr_houses !== null) {
                hov = $(this)
                selected_house = $(this).index()
                fullUpPopUpWindow(selected_house)
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
        fullUpHouseInfo(selected_house, elem_to_hover.eq(selected_house).attr('id'))
        $('.map').css({
            'filter': 'blur(5px)',
            '-webkit-filter': 'blur(5px)',
            '-moz-filter': 'blur(5px)',
            '-o-filter': 'blur(5px)',
            '-ms-filter': 'blur(5px)'
        })
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

function buildMap() {

}

// Заполняем окно с большим количеством информации
function fullUpHouseInfo(index, id) {
    $('.house-info .house-card-info .popUp-header h2').text(short_arr_houses[index]['name'])
    $('.house-info .house-card-info .popUp-header h3').text(short_arr_houses[index]['address'])
    $('.house-info .house-card-info .popUp-body ul li:nth-child(1)').find('b').text(short_arr_houses[index]['living_space'] + ' м²')
    $('.house-info .house-card-info .popUp-body ul li:nth-child(2)').find('b').text(short_arr_houses[index]['land_area'] + ' м²')
    $('.house-info .house-card-info .popUp-body ul li:nth-child(3)').find('b').text(short_arr_houses[index]['do_ready'])
    $('.house-info .house-card-info .popUp-body ul li:nth-child(4)').find('b').text(short_arr_houses[index]['price'] + ' ₽')
        // Изображения
    $('.house-info .house-recipe img').attr("src", "https://covidlist.ru/api/GET/v1/house/image/plan?house_id=" + id)
    $('.house-info .house-layout img:nth-child(1)').attr("src", "https://covidlist.ru/api/GET/v1/house/image/main1?house_id=" + id)
    $('.house-info .house-layout img:nth-child(2)').attr("src", "https://covidlist.ru/api/GET/v1/house/image/main2?house_id=" + id)


}
// Генерируем информацию в маленьком окне
function fullUpPopUpWindow(id) {
    $('.popUpWindow .popUp-header h2').text(short_arr_houses[id]['name'])
    $('.popUpWindow .popUp-header h3').text(short_arr_houses[id]['address'])
        // Маркетинговые изображения
    $('.popUpWindow .popUp-body ul li:nth-child(1)').find('b').text(short_arr_houses[id]['price'] + ' ₽')
    $('.popUpWindow .popUp-body ul li:nth-child(2)').find('b').text(short_arr_houses[id]['living_space'] + ' м²')
}

// Получаем информацию для домов
function openHouse() {
    // setLocation(selected_house)

    $.ajax({
        url: 'https://covidlist.ru/api/GET/v1/house/info/',
        method: 'get',
        dataType: 'json',
        data: {},
        success: function(data) {
            if (data.status === 'success') {
                short_arr_houses = data.data
                $(elem_to_hover).each(function(index) {
                    $(this).attr('id', data.data[index]['id'])
                });
            }
        },
        error: function(jqXHR, exception) {
            if (jqXHR.status === 0) {
                console.error('Not connect. Verify Network.')
            } else if (jqXHR.status == 404) {
                console.error('Requested page not found (404).')
            } else if (jqXHR.status == 500) {
                console.error('Internal Server Error (500).')
            } else if (exception === 'parsererror') {
                console.error('Requested JSON parse failed.')
            } else if (exception === 'timeout') {
                console.error('Time out error.')
            } else if (exception === 'abort') {
                console.error('Ajax request aborted.')
            } else {
                console.error('Uncaught Error. ' + jqXHR.responseText)
            }
        }
    });
}

//Закрывает всплывающее окно
function closePopUpWindow() {
    $('.popUpWindow').css({ top: -1000, left: -1000 })
    show = true
}