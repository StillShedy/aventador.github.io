window.elements = document.getElementsByClassName('clickable');
for (var el of window.elements) {
    el.addEventListener('click', function () {
        for (var element of window.elements) {
            element.classList.remove('nav-item-active');
        }
        this.classList.add('nav-item-active');
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



$('.popup-close').on('click', () => {
    $('.images-popup').hide();
    $('.image-open-container').slick('unslick')
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
        adaptiveHeight: false,
        dots: true,
        infinite: true,
    });
})