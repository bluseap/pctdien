var lichsudangkydienController = function () {

    var userName = $("#hidUserName").val();

    this.loadTableLichSuDangKyDien = function () {
        loadTableLichSuDangKyDien(true);
    }

    this.initialize = function () {
        registerEvents();

    }

    function registerEvents() {

    }

    function loadTableLichSuDangKyDien(isPageChanged) {
        $('#tblContentLichSuDangKyDien').html('');
        var template = $('#table-LichSuDangKyDien').html();
        var render = "";

        var ttdangkydienid = $('#hidTTDangKyDien').val();

        $.ajax({
            type: 'GET',
            url: '/admin/ttdangkytt/ListLichSuDien',
            data: {
                TTDangKyDienId: ttdangkydienid
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
                    $('#tblContentLichSuDangKyDien').html(render);
                }
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

}