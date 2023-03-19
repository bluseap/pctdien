var timkhachhangController = function () {

    var userName = $("#hidUserName").val();
    
    this.initialize = function () {
        registerEvents();

    }

    function registerEvents() {

        $("#btnTKHTimKhachHang").on('click', function () {
            loadTableTimKhachHangNuoc(true);
        });

        $('body').on('click', '.btn-timkhachhangKhachHangId', function (e) {
            e.preventDefault();
            var makhachhang = $(this).data('id');
            loadTimKhachHang(makhachhang);
            $('#modal-add-edit-TimKhachHang').modal('hide');
        });

    }

    function loadTableTimKhachHangNuoc(isPageChanged) {
        $('#tblContentTimKhachHangNuoc').html('');
        var template = $('#table-TimKhachHangNuoc').html();
        var render = "";

        var khuvuc = $('#ddlTKHKhuVuc').val();
        var dieukien = $('#txtTKHDieuKienTim').val();

        if (dieukien === '') {
            tedu.notify('Nhập điều kiện để tìm khách hàng', 'error');
        }

        $.ajax({
            type: 'GET',
            url: '/admin/PoKyLaiHDNuoc/TimKHNuoc',
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
                            MaKhachHang: item.MaKhachHang,
                            TENKH: item.TENKH,
                            DanhSo: item.DanhSo,
                            TENKV: item.TENKV
                        });
                    });
                }

                if (render !== '') {
                    $('#tblContentTimKhachHangNuoc').html(render);
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
            url: '/admin/PoKyLaiHDNuoc/GetKHId',
            data: {
                MaKhachHang: makhachhang
            },
            dataType: 'json',
            success: function (response) {
                var khachhang = response.Result;

                $("#hidMaKhachHangId").val(makhachhang);

                $("#ddlTHDKhuVuc").val(khachhang.CorporationNameMAKV);

                $("#txtTHDTenKhachHangCu").val(khachhang.TENKH);
                $("#txtTHDDiaChiLDCu").val(khachhang.SONHA);
                $("#ddlTHDMaMDSDCu").val(khachhang.MAMDSD);
                $("#txtTHDMaSoThueCu").val(khachhang.MST);

            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

}