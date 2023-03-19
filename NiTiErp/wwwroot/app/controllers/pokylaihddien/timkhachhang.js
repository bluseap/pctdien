var timkhachhangController = function () {

    var userName = $("#hidUserName").val();

    this.initialize = function () {
        registerEvents();

    }

    function registerEvents() {

        $("#btnTKHTimKhachHang").on('click', function () {
            loadTableTimKhachHangDien(true);
        });

        $('body').on('click', '.btn-timkhachhangKhachHangId', function (e) {
            e.preventDefault();
            var makhachhang = $(this).data('id');
            loadTimKhachHang(makhachhang);
            $('#modal-add-edit-TimKhachHang').modal('hide');
        });

    }

    function loadTableTimKhachHangDien(isPageChanged) {
        $('#tblContentTimKhachHangDien').html('');
        var template = $('#table-TimKhachHangDien').html();
        var render = "";

        var khuvuc = $('#ddlTKHKhuVuc').val();
        var dieukien = $('#txtTKHDieuKienTim').val();

        if (dieukien === '') {
            tedu.notify('Nhập điều kiện để tìm khách hàng', 'error');
        }

        $.ajax({
            type: 'GET',
            url: '/admin/PoKyLaiHDDien/TimKHDien',
            data: {
                KhuVuc: khuvuc,
                DieuKien: dieukien
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result, function (i, item) {
                        render += Mustache.render(template, {
                            MaKhachHangPo: item.MaKhachHangPo,
                            TENKH: item.TENKH,
                            DanhSo: item.DanhSo,
                            TENKV: item.TENKV
                        });
                    });
                }

                if (render !== '') {
                    $('#tblContentTimKhachHangDien').html(render);
                }
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function loadTimKhachHang(makhachhang) {
        $.ajax({
            type: 'GET',
            url: '/admin/PoKyLaiHDDien/GetKHId',
            data: {
                MaKhachHang: makhachhang
            },
            dataType: 'json',
            success: function (response) {
                var khachhang = response.Result;

                $("#hidMaKhachHangPoId").val(makhachhang);

                $("#ddlTHDKhuVuc").val(khachhang.CorporationNameMAKV);

                $("#txtTHDTenKhachHangCu").val(khachhang.TENKH);
                $("#txtTHDDiaChiLDCu").val(khachhang.SONHA);
                $("#ddlTHDMaMDSDCu").val(khachhang.MAMDSDPO);
                $("#txtTHDMaSoThueCu").val(khachhang.MST);

            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

}