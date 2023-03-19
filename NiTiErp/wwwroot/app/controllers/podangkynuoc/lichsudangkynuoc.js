var lichsudangkynuocController = function () {

    var userName = $("#hidUserName").val();

    this.loadTableLichSuDangKyNuoc = function () {
        loadTableLichSuDangKyNuoc(true);
    }

    this.initialize = function () {
        registerEvents();
       
    }

    function registerEvents() {
       
    } 

    function loadTableLichSuDangKyNuoc(isPageChanged) {
        $('#tblContentLichSuDangKyNuoc').html('');
        var template = $('#table-LichSuDangKyNuoc').html();
        var render = "";

        var maddk = $('#hidDonDangKyMaddk').val();       

        $.ajax({
            type: 'GET',
            url: '/admin/PoDangKyNuoc/LichSuDDK',
            data: {
                MADDK: maddk
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th></tr>";
                }
                else {
                    $.each(response.Result, function (i, item) {
                        render += Mustache.render(template, {
                            NgayThucHien: item.NgayThucHien,
                            NgayThucHienGhiChu: item.NgayThucHienGhiChu                             
                        });
                    });
                }               

                if (render !== '') {
                    $('#tblContentLichSuDangKyNuoc').html(render);
                }              
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

}