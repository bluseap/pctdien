var editdangkynuocController = function () {

    this.loadEditDangKyNuoc = function () {
        loadEditDangKyNuoc();
    }

    this.initialize = function () {
        registerEvents();
        loadData();
    }

    function registerEvents() {
        $('#txtNgayCapNuoc').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        $("#ddlMucDichSuDungNuoc").on('change', function () {
            var mucdich = $("#ddlMucDichSuDungNuoc").val();
            //Kiem tra bang TTDMDangKy theo Muc dich su dung
            if (mucdich == 1) {
                loaiHinhDichVu("LoaiHinhDichVuSinhHoatGiaDinh");
            }
            //Kiem tra bang TTDMDangKy theo Muc dich su dung
            else if (mucdich == 2) {
                loaiHinhDichVu("LoaiHinhDich");
            }
        });

        $("#ddlThanhPhoHuyenNuoc").on('change', function () {
            let huyen = $("#ddlThanhPhoHuyenNuoc").val();
            // 883: Long Xuyen
            if (huyen == 883) {
                //$('#modal-add-edit-ThongBao').modal('show');
                $('#ddlThanhPhoHuyenNuoc')[0].selectedIndex = 0;
            } else {
                PhuongXa(huyen);
            }
        });

        $('#btnSaveEditDangKyNuoc').on('click', function () {
            var inup = $('#hidInsertUpdateTTDangKyNuoc').val()
            //1: insert; 2: update
            if (inup == 2) {
                editDangKyNuoc();
            }
        });

    }

    function loadData() {
        tinhHuyenXa();
        PhuongXaAll();

        mucDichSuDung("MucDichSudung");

        loaiHinhDichVu("%");
    }

    function clearDangKyNuoc() {
        var datenow = new Date();

        $('#txtHoTenNguoiYeuCauNuoc').val('');
        $('#txtDienThoaiDiDongNuoc').val('');

        $('#txtSoChungMinhThuNuoc').val('');
        $('#txtNgayCapNuoc').val(tedu.getFormattedDate(datenow));
        $('#txtNoiCapNuoc').val('');
        $('#ddlTinhNuoc')[0].selectedIndex = 0;
        $('#ddlThanhPhoHuyenNuoc')[0].selectedIndex = 0;
        $('#ddlPhuongXaNuoc')[0].selectedIndex = 0;
        $('#txtSoNhaNuoc').val('');
        $('#txtDuongPhoApToNuoc').val('');

        $('#ddlMucDichSuDungNuoc')[0].selectedIndex = 0;
        $('#ddlLoaiHinhDichVuNuoc')[0].selectedIndex = 0;

        $('#txtGhiChuNuoc').val('');

        //$('#ddlGiayToTuyThan')[0].selectedIndex = 0;
        //$('#ddlGiayToXacDinhChuThe')[0].selectedIndex = 0;
        //$('#ddlGiayToXacDinhMucDich')[0].selectedIndex = 0;
    }

    function tinhHuyenXa() {
        var render = "<option value='89' >Tỉnh An Giang</option>";
        $('#ddlTinhNuoc').html(render);
        $("#ddlTinhNuoc")[0].selectedIndex = 0;

        let tinh = $('#ddlTinhNuoc').val();
        Huyen(tinh);

        var render = "<option value='0' >--- Chọn Xã / Phường / TT ---</option>";
        $('#ddlPhuongXaNuoc').html(render);
        $("#ddlPhuongXaNuoc")[0].selectedIndex = 0;
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
                $('#ddlThanhPhoHuyenNuoc').html(render);
                $("#ddlThanhPhoHuyenNuoc")[0].selectedIndex = 0;
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
                $('#ddlPhuongXaNuoc').html(render);
                $("#ddlPhuongXaNuoc")[0].selectedIndex = 0;
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
                $('#ddlPhuongXaNuoc').html(render);
                $("#ddlPhuongXaNuoc")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục phường / xã.', 'error');
            }
        });
    }

    function mucDichSuDung(tencot) {
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
                $('#ddlMucDichSuDungNuoc').html(render);
                $("#ddlMucDichSuDungNuoc")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục Mục đích sử dụng.', 'error');
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
                $('#ddlLoaiHinhDichVuNuoc').html(render);
                $("#ddlLoaiHinhDichVuNuoc")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục Loại hình dịch vụ.', 'error');
            }
        });
    }

    function loadEditDangKyNuoc() {
        var dangkynuocid = $('#hidTTDangKyNuoc').val();

        $.ajax({
            type: "GET",
            url: "/Admin/ttdangkytt/GetDkNuoc",
            data: {
                dangkynuocId: dangkynuocid
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var dangkydien = response.Result;

                clearDangKyNuoc();

                $('#txtHoTenNguoiYeuCauNuoc').val(dangkydien.HoTenNguoiYeuCau);
                $('#txtDienThoaiDiDongNuoc').val(dangkydien.DienThoai);

                $('#txtSoChungMinhThuNuoc').val(dangkydien.SoTheCCCD);
                $('#txtNgayCapNuoc').val(tedu.getFormattedDate(dangkydien.NgayCap));
                $('#txtNoiCapNuoc').val(dangkydien.NoiCap);

                $('#ddlTinhNuoc').val(dangkydien.ThanhPhoTinhId);
                $('#ddlThanhPhoHuyenNuoc').val(dangkydien.QuanHuyenId);
                $('#ddlPhuongXaNuoc').val(dangkydien.PhuongXaId);
                $('#txtSoNhaNuoc').val(dangkydien.SoNha);
                $('#txtDuongPhoApToNuoc').val(dangkydien.TenDuongApTo);

                $('#ddlMucDichSuDungNuoc').val(dangkydien.TTDMDangKyMucDichSuDung);
                $('#ddlLoaiHinhDichVuNuoc').val(dangkydien.TTDMDangKyLoaiHinhDichVu);

                $('#txtGhiChuNuoc').val(dangkydien.GhiChu);

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function editDangKyNuoc() {
        var ttdangkynuocid = $('#hidTTDangKyNuoc').val();

        var hotennguoiyeucau = $('#txtHoTenNguoiYeuCauNuoc').val();
        var dienthoai = $('#txtDienThoaiDiDongNuoc').val();
        var sochungminhthu = $('#txtSoChungMinhThuNuoc').val();
        var ngaycap = tedu.getFormatDateYYMMDD($('#txtNgayCapNuoc').val());
        var noicap = $('#txtNoiCapNuoc').val();
        var ddltinh = $('#ddlTinhNuoc').val();
        var ddlhuyen = $('#ddlThanhPhoHuyenNuoc').val();
        var ddlxa = $('#ddlPhuongXaNuoc').val();
        var sonha = $('#txtSoNhaNuoc').val();
        var tenduong = $('#txtDuongPhoApToNuoc').val();

        var mucdichsudung = $('#ddlMucDichSuDungNuoc').val();
        var laoihinhdichvu = $('#ddlLoaiHinhDichVuNuoc').val();

        //var giaytotuythan = $('#ddlGiayToTuyThan').val();
        //var giaytoxacdinhchuthe = $('#ddlGiayToXacDinhChuThe').val();
        //var giaytoxacdinhmucdich = $('#ddlGiayToXacDinhMucDich').val();

        var ghichudien = $('#txtGhiChuNuoc').val();

        $.ajax({
            type: 'POST',
            url: '/ttdangkytt/UpdateDKNuoc',
            data: {
                Id: ttdangkynuocid,

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
                TTDMDangKyMucDichSuDung: mucdichsudung,
                TTDMDangKyLoaiHinhDichVu: laoihinhdichvu,

                //TTDMDangKyGiayToTuyThan: giaytotuythan,
                //TTDMDangKyGiayToXacDinhChuThe: giaytoxacdinhchuthe,
                //TTDMDangKyGiayToXacDinhMucDich: giaytoxacdinhmucdich,

                GhiChu: ghichudien
            },
            dataType: 'json',
            //beforeSend: function () {
            //    tedu.startLoading();
            //},
            success: function (response) {
                nguyen.appUserLoginLogger(userName, "Sửa giấy đăng ký điện.");

                if (response == true) {
                    tedu.notify('Sửa Đăng ký lắp mới.', 'success');
                }
                else {
                    tedu.notify('Sửa Đăng ký lắp mới.', 'error');
                }
                $('#modal-add-edit-EditDangKyNuoc').modal('hide');
                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

}