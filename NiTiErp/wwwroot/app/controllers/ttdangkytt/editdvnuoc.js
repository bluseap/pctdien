var editdvnuocController = function () {

    this.loadEditDVNuoc = function () {
        loadEditDVNuoc();
    }

    this.initialize = function () {
        registerEvents();
        loadData();
    }

    function registerEvents() {
        $('#txtNgayCapDVNuoc').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        $("#ddlThanhPhoHuyenDVNuoc").on('change', function () {
            let huyen = $("#ddlThanhPhoHuyenDVNuoc").val();
            // 883: Long Xuyen
            if (huyen == 883) {
                //$('#modal-add-edit-ThongBao').modal('show');
                $('#ddlThanhPhoHuyenDVNuoc')[0].selectedIndex = 0;
            } else {
                PhuongXa(huyen);
            }
        });

        $('#btnSaveEditDangKyDVNuoc').on('click', function () {
            var inup = $('#hidInsertUpdateTTCacDichVuNuoc').val()
            //1: insert; 2: update
            if (inup == 2) {
                editDVNuoc();
            }
        });

    }

    function loadData() {
        tinhHuyenXa();
        PhuongXaAll();

        dichvuKhachHangCanCungCap("DichVuKhacHangCungCapNuoc");

        loaiHinhDichVu("%");
    }

    function clearDangKyNuoc() {
        var datenow = new Date();

        $('#txtHoTenNguoiYeuCauDVNuoc').val('');
        $('#txtDienThoaiDiDongDVNuoc').val('');

        $('#txtSoChungMinhThuDVNuoc').val('');
        $('#txtNgayCapDVNuoc').val(tedu.getFormattedDate(datenow));
        $('#txtNoiCapDVNuoc').val('');
        $('#ddlTinhDVNuoc')[0].selectedIndex = 0;
        $('#ddlThanhPhoHuyenDVNuoc')[0].selectedIndex = 0;
        $('#ddlPhuongXaDVNuoc')[0].selectedIndex = 0;
        $('#txtSoNhaDVNuoc').val('');
        $('#txtDuongPhoApToDVNuoc').val('');

        $('#ddlLoaiHinhDichVuDVNuoc')[0].selectedIndex = 0;

        $('#txtGhiChuDVNuoc').val('');

        //$('#ddlGiayToTuyThan')[0].selectedIndex = 0;
        //$('#ddlGiayToXacDinhChuThe')[0].selectedIndex = 0;
        //$('#ddlGiayToXacDinhMucDich')[0].selectedIndex = 0;
    }

    function tinhHuyenXa() {
        var render = "<option value='89' >Tỉnh An Giang</option>";
        $('#ddlTinhDVNuoc').html(render);
        $("#ddlTinhDVNuoc")[0].selectedIndex = 0;

        let tinh = $('#ddlTinhDVNuoc').val();
        Huyen(tinh);

        var render = "<option value='0' >--- Chọn Xã / Phường / TT ---</option>";
        $('#ddlPhuongXaDVNuoc').html(render);
        $("#ddlPhuongXaDVNuoc")[0].selectedIndex = 0;
    }

    function Huyen(tinh) {
        return $.ajax({
            type: 'GET',
            url: '/ttdangkytt/Huyen',
            data: {
                Tinh: tinh
            },
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >--- Chọn Huyện / Thành phố ---</option>";
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenQuanHuyen + "</option>";
                });
                $('#ddlThanhPhoHuyenDVNuoc').html(render);
                $("#ddlThanhPhoHuyenDVNuoc")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục Huyện / Thành Phố.', 'error');
            }
        });
    }

    function PhuongXa(huyen) {
        return $.ajax({
            type: 'GET',
            url: '/ttdangkytt/PhuongXa',
            data: {
                Huyen: huyen
            },
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >--- Chọn Phường / Xã ---</option>";
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenPhuongXa + "</option>";
                });
                $('#ddlPhuongXaDVNuoc').html(render);
                $("#ddlPhuongXaDVNuoc")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục phường / xã.', 'error');
            }
        });
    }

    function PhuongXaAll() {
        return $.ajax({
            type: 'GET',
            url: '/ttdangkytt/PhuongXaAll',
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >--- Chọn Phường / Xã ---</option>";
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenPhuongXa + "</option>";
                });
                $('#ddlPhuongXaDVNuoc').html(render);
                $("#ddlPhuongXaDVNuoc")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục phường / xã.', 'error');
            }
        });
    }

    function dichvuKhachHangCanCungCap(tencot) {
        return $.ajax({
            type: 'GET',
            url: '/ttdangkytt/ListDMDangKy',
            data: {
                tenCot: tencot
            },
            dataType: 'json',
            success: function (response) {
                var render;
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Ten + "</option>";
                });
                $('#ddlLoaiHinhDichVuDVNuoc').html(render);
                $("#ddlLoaiHinhDichVuDVNuoc")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

    function loaiHinhDichVu(tencot) {
        return $.ajax({
            type: 'GET',
            url: '/ttdangkytt/ListDMDangKy',
            data: {
                tenCot: tencot
            },
            dataType: 'json',
            success: function (response) {
                var render;
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Ten + "</option>";
                });
                $('#ddlLoaiHinhDichVuDVNuoc').html(render);
                $("#ddlLoaiHinhDichVuDVNuoc")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục Loại hình dịch vụ.', 'error');
            }
        });
    }

    function loadEditDVNuoc() {
        var dvnuocid = $('#hidTTCacDichVuNuoc').val();

        $.ajax({
            type: "GET",
            url: "/Admin/ttdangkytt/GetDvNuoc",
            data: {
                dichvunuocId: dvnuocid
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var dangkydien = response.Result;

                clearDangKyNuoc();

                $('#txtHoTenNguoiYeuCauDVNuoc').val(dangkydien.HoTenNguoiYeuCau);
                $('#txtDienThoaiDiDongDVNuoc').val(dangkydien.DienThoai);

                $('#txtSoChungMinhThuDVNuoc').val(dangkydien.SoTheCCCD);
                $('#txtNgayCapDVNuoc').val(tedu.getFormattedDate(dangkydien.NgayCap));
                $('#txtNoiCapDVNuoc').val(dangkydien.NoiCap);

                $('#ddlTinhDVNuoc').val(dangkydien.ThanhPhoTinhId);
                $('#ddlThanhPhoHuyenDVNuoc').val(dangkydien.QuanHuyenId);
                $('#ddlPhuongXaDVNuoc').val(dangkydien.PhuongXaId);
                $('#txtSoNhaDVNuoc').val(dangkydien.SoNha);
                $('#txtDuongPhoApToDVNuoc').val(dangkydien.TenDuongApTo);

                $('#ddlLoaiHinhDichVuDVNuoc').val(dangkydien.TTDMDangKyDichVu);

                $('#txtGhiChuDVNuoc').val(dangkydien.GhiChu);

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function editDVNuoc() {
        var ttdichvunuocid = $('#hidTTCacDichVuNuoc').val();

        var hotennguoiyeucau = $('#txtHoTenNguoiYeuCauDVNuoc').val();
        var dienthoai = $('#txtDienThoaiDiDongDVNuoc').val();
        var sochungminhthu = $('#txtSoChungMinhThuDVNuoc').val();
        var ngaycap = tedu.getFormatDateYYMMDD($('#txtNgayCapDVNuoc').val());
        var noicap = $('#txtNoiCapDVNuoc').val();
        var ddltinh = $('#ddlTinhDVNuoc').val();
        var ddlhuyen = $('#ddlThanhPhoHuyenDVNuoc').val();
        var ddlxa = $('#ddlPhuongXaDVNuoc').val();
        var sonha = $('#txtSoNhaDVNuoc').val();
        var tenduong = $('#txtDuongPhoApToDVNuoc').val();

        var laoihinhdichvu = $('#ddlLoaiHinhDichVuDVNuoc').val();

        //var giaytotuythan = $('#ddlGiayToTuyThan').val();
        //var giaytoxacdinhchuthe = $('#ddlGiayToXacDinhChuThe').val();
        //var giaytoxacdinhmucdich = $('#ddlGiayToXacDinhMucDich').val();

        var ghichunuoc = $('#txtGhiChuDVNuoc').val();

        $.ajax({
            type: 'POST',
            url: '/ttdangkytt/UpdateDVNuoc',
            data: {
                Id: ttdichvunuocid,

                HoTenNguoiYeuCau: hotennguoiyeucau,
                DienThoai: dienthoai,
                SoTheCCCD: sochungminhthu,
                NgayCap: ngaycap,
                NoiCap: noicap,
                ThanhPhoTinhId: ddltinh,
                QuanHuyenId: ddlhuyen,
                PhuongXaId: ddlxa,
                SoNha: sonha,
                TenDuongApTo: tenduong,
                TTDMDangKyDichVu: laoihinhdichvu,

                //TTDMDangKyGiayToTuyThan: giaytotuythan,
                //TTDMDangKyGiayToXacDinhChuThe: giaytoxacdinhchuthe,
                //TTDMDangKyGiayToXacDinhMucDich: giaytoxacdinhmucdich,

                GhiChu: ghichunuoc
            },
            dataType: 'json',
            //beforeSend: function () {
            //    tedu.startLoading();
            //},
            success: function (response) {
                nguyen.appUserLoginLogger(userName, "Sửa dịch vụ nước.");

                if (response == true) {
                    tedu.notify('Sửa dịch vụ nước.', 'success');
                }
                else {
                    tedu.notify('Sửa dịch vụ nước.', 'error');
                }
                $('#modal-add-edit-EditDVNuoc').modal('hide');
                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

}