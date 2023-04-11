//var indicator = document.querySelector('.nav-indicator');
//var items = document.querySelectorAll('.click-active');
//var items2 = document.querySelectorAll('.click-active-2');

//function handleIndicator(el) {
//    items.forEach(function (item) {
//        item.classList.remove('active');
//        item.removeAttribute('style');
//    });
//    //indicator.style.width = "".concat(el.offsetWidth, "px");
//    //indicator.style.left = "".concat(el.offsetLeft, "px");
//    //indicator.style.backgroundColor = el.getAttribute('active-color');
//    el.classList.add('active');
//    //el.style.color = el.getAttribute('active-color');
//}
//items.forEach(function (item, index) {
//    item.addEventListener('click', function (e) {
//        handleIndicator(e.target);
//    });
//    //handleIndicator(item);
//    //item.classList.contains('active') && handleIndicator(item);
//});


$('.dropdown').hover(
    function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn();
    },
    function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut();
    }
);

$('.dropdown-menu').hover(
    function () {
        $(this).stop(true, true);
    },
    function () {
        $(this).stop(true, true).delay(100).fadeOut();
    }
);