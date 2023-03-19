

$('body').on('click', '.btnWebsiteNganHang', function (e) {
    e.preventDefault();    

    document.getElementById('divWebsiteNganHang').style.display = "block";
    document.getElementById('divWebsiteTheATM').style.display = "none";
    document.getElementById('divWebsiteUyNhiem').style.display = "none";
    document.getElementById('divWebsiteChuyenKhoan').style.display = "none"; 
    
    $('html, body').animate({
        scrollTop: 800,
    }, 500);
});

$('body').on('click', '.btnWebsiteATM', function (e) {
    e.preventDefault();

    document.getElementById('divWebsiteNganHang').style.display = "none";
    document.getElementById('divWebsiteTheATM').style.display = "block";
    document.getElementById('divWebsiteUyNhiem').style.display = "none";
    document.getElementById('divWebsiteChuyenKhoan').style.display = "none";

    $('html, body').animate({
        scrollTop: 800,
    }, 500);

});

$('body').on('click', '.btnUyNhiemTuDong', function (e) {
    e.preventDefault();

    document.getElementById('divWebsiteNganHang').style.display = "none";
    document.getElementById('divWebsiteTheATM').style.display = "none";
    document.getElementById('divWebsiteUyNhiem').style.display = "block";
    document.getElementById('divWebsiteChuyenKhoan').style.display = "none";

    $('html, body').animate({
        scrollTop: 800,
    }, 500);
});

$('body').on('click', '.btnWebsiteUyNhiemChi', function (e) {
    e.preventDefault();

    document.getElementById('divWebsiteNganHang').style.display = "none";
    document.getElementById('divWebsiteTheATM').style.display = "none";
    document.getElementById('divWebsiteUyNhiem').style.display = "none";
    document.getElementById('divWebsiteChuyenKhoan').style.display = "block";

    $('html, body').animate({
        scrollTop: 800,
    }, 500);
});

