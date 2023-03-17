
                        window.elements = document.getElementsByClassName('clickable');
for (var el of window.elements) {
    el.addEventListener('click', function () {
        document.getElementById(this.dataset.target).scrollIntoView({ behavior: 'smooth', block: 'start' });
    })
}

mapboxgl.accessToken = 'pk.eyJ1Ijoic3RpbGxzaGVkeSIsImEiOiJjanM0bTFvcHowNXh5NDRzYjliMmZyZGpuIn0.VZeB-SYj2f32KrqtXB54tg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [36.26480092779991, 49.98357588431605],
    zoom: 15
});

const popup = new mapboxgl.Popup({
    closeOnClick: false,
    closeButton: false,
    anchor: 'bottom',
    color: '#c0c0c036'
})
    .setLngLat([36.26460838844753, 49.98286081760102])
    .setHTML(`<div class="map-popup">
                <img class="popup-logo" src="img/logo.png">
                <div class=map-title>Графік роботи:</div>
                <div class=map-item>ПН 8:00 - 21:00</div>
                <div class=map-item>ВТ 8:00 - 21:00</div>
                <div class=map-item>СР 8:00 - 21:00</div>
                <div class=map-item>ЧТ 8:00 - 21:00</div>
                <div class=map-item>ПТ 8:00 - 21:00</div>
                <div class=map-item>СБ 8:00 - 16:00</div>
                <div class=map-item>НД 9:00 - 14:00</div>
                </div>`)
    .addTo(map);

let scrollPosition = 0;


$('.popup-close').on('click', () => {
    $('.images-popup').hide();
    $('.image-open-container').slick('unslick');
    $('body').css("overflow-y", "auto");
    $('body').css("position", "initial");
    window.scrollTo(0, scrollPosition);
})


$('.popup-preview').on('click', function () {
    $('.images-popup').show();
    var targetSrc = $(this).attr('src');
    let item;
    $('.container-item').map(x => {
        var current = $($('.container-item')[x])[0];
        if (current != undefined) {
            if ($(current.children[0]).attr('src') == targetSrc) {
                item = current;
                current.remove();
            }
        }
    })
    $('.image-open-container').prepend(item);
    $('.image-open-container').slick({
        adaptiveHeight: true,
        dots: true,
        infinite: true,
    });
    scrollPosition = window.pageYOffset;

    $('body').css("overflow-y", "hidden");
    $('body').css("position", "fixed");
    $('body').css('top', `-${scrollPosition}px`);
})

$.jMaskGlobals = {
    translation: {
        'n': { pattern: /\d/ },
    }

};
$('.phone-mask').mask('+380 (nn) nnn-nn-nn').val('+380');


// VIDEO

let video = document.getElementById("video");

$('#play-stop-button').click(function playPause() {
    if (video.paused) {
        video.play();
        $('#play-stop-button').removeClass('play-button');
        $('#play-stop-button').addClass('stop-button');
    } else {
        video.pause();
        $('#play-stop-button').removeClass('stop-button');
        $('#play-stop-button').addClass('play-button');
    }
});

video.addEventListener("ended", function () {
    video.pause();
    $('#play-stop-button').removeClass('stop-button');
    $('#play-stop-button').addClass('play-button');

})

// POP-UP

$('.button-popup').click(function () {
    $('.callback-popup').removeClass('st0');
    $('body').addClass('no-scroll');
    $('nav').addClass('st0')
    $('.mobile-menu').addClass('st0');
})

$('.callback-popup-close').click(function () {
    $('.callback-popup').addClass('st0');
    $('body').removeClass('no-scroll');
    $('nav').removeClass('st0')
})

// Menu mobile 

$('.open-menu').click(function (e) {
    e.preventDefault();
    $('.mobile-menu').removeClass('st0');
    $('body').addClass('no-scroll');
});

$('.close-menu').click(function (e) {
    e.preventDefault();
    $('.mobile-menu').addClass('st0');
    $('body').removeClass('no-scroll');
});

$('.nav-item').click(function (e) {
    e.preventDefault();
    $('body').removeClass('no-scroll');
    $('.mobile-menu').addClass('st0');

});