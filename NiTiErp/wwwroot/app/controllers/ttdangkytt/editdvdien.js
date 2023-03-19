var editdvdienController = function () {

    this.loadEditDVDien = function () {
        loadEditDVDien();
    }

    this.initialize = function () {
        registerEvents();
        loadData();
    }

    function registerEvents() {
        $('#txtNgayCapDVDien').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });       

        $("#ddlThanhPhoHuyenDVDien").on('change', function () {
            let huyen = $("#ddlThanhPhoHuyenDVDien").val();
            // 883: Long Xuyen
            if (huyen == 883) {
                //$('#modal-add-edit-ThongBao').modal('show');
                $('#ddlThanhPhoHuyenDVDien')[0].selectedIndex = 0;
            } else {
                PhuongXa(huyen);
            }
        });

        $('#btnSaveEditDangKyDVDien').on('click', function () {
            var inup = $('#hidInsertUpdateTTCacDichVuDien').val()
            //1: insert; 2: update
            if (inup == 2) {
                editDVDien();
            }
        });

    }

    function loadData() {
        tinhHuyenXa();
        PhuongXaAll();

        dichvuKhachHangCanCungCap("DichVuKhacHangCungCapDien");  

        loaiHinhDichVu("%");
    }

    function clearDangKyDien() {
        var datenow = new Date();

        $('#txtHoTenNguoiYeuCauDVDien').val('');
        $('#txtDienThoaiDiDongDVDien').val('');

        $('#txtSoChungMinhThuDVDien').val('');
        $('#txtNgayCapDVDien').val(tedu.getFormattedDate(datenow));
        $('#txtNoiCapDVDien').val('');
        $('#ddlTinhDVDien')[0].selectedIndex = 0;
        $('#ddlThanhPhoHuyenDVDien')[0].selectedIndex = 0;
        $('#ddlPhuongXaDVDien')[0].selectedIndex = 0;
        $('#txtSoNhaDVDien').val('');
        $('#txtDuongPhoApToDVDien').val('');

        $('#ddlLoaiHinhDichVuDVDien')[0].selectedIndex = 0;       

        $('#txtGhiChuDVDien').val('');

        //$('#ddlGiayToTuyThan')[0].selectedIndex = 0;
        //$('#ddlGiayToXacDinhChuThe')[0].selectedIndex = 0;
        //$('#ddlGiayToXacDinhMucDich')[0].selectedIndex = 0;
    }

    function tinhHuyenXa() {
        var render = "<option value='89' >Tỉnh An Giang</option>";
        $('#ddlTinhDVDien').html(render);
        $("#ddlTinhDVDien")[0].selectedIndex = 0;

        let tinh = $('#ddlTinhDVDien').val();
        Huyen(tinh);

        var render = "<option value='0' >--- Chọn Xã / Phường / TT ---</option>";
        $('#ddlPhuongXaDVDien').html(render);
        $("#ddlPhuongXaDVDien")[0].selectedIndex = 0;
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
                $('#ddlThanhPhoHuyenDVDien').html(render);
                $("#ddlThanhPhoHuyenDVDien")[0].selectedIndex = 0;
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
                $('#ddlPhuongXaDVDien').html(render);
                $("#ddlPhuongXaDVDien")[0].selectedIndex = 0;
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
                $('#ddlPhuongXaDVDien').html(render);
                $("#ddlPhuongXaDVDien")[0].selectedIndex = 0;
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
                $('#ddlLoaiHinhDichVuDVDien').html(render);
                $("#ddlLoaiHinhDichVuDVDien")[0].selectedIndex = 0;
                
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
                $('#ddlLoaiHinhDichVuDVDien').html(render);
                $("#ddlLoaiHinhDichVuDVDien")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục Loại hình dịch vụ.', 'error');
            }
        });
    }

    function loadEditDVDien() {
        var dvdienid = $('#hidTTCacDichVuDien').val();

        $.ajax({
            type: "GET",
            url: "/Admin/ttdangkytt/GetDvDien",
            data: {
                dichvudienId: dvdienid
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var dangkydien = response.Result;

                clearDangKyDien();

                $('#txtHoTenNguoiYeuCauDVDien').val(dangkydien.HoTenNguoiYeuCau);
                $('#txtDienThoaiDiDongDVDien').val(dangkydien.DienThoai);

                $('#txtSoChungMinhThuDVDien').val(dangkydien.SoTheCCCD);
                $('#txtNgayCapDVDien').val(tedu.getFormattedDate(dangkydien.NgayCap));
                $('#txtNoiCapDVDien').val(dangkydien.NoiCap);

                $('#ddlTinhDVDien').val(dangkydien.ThanhPhoTinhId);
                $('#ddlThanhPhoHuyenDVDien').val(dangkydien.QuanHuyenId);
                $('#ddlPhuongXaDVDien').val(dangkydien.PhuongXaId);
                $('#txtSoNhaDVDien').val(dangkydien.SoNha);
                $('#txtDuongPhoApToDVDien').val(dangkydien.TenDuongApTo);

                $('#ddlLoaiHinhDichVuDVDien').val(dangkydien.TTDMDangKyDichVu);               

                $('#txtGhiChuDVDien').val(dangkydien.GhiChu);

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function editDVDien() {
        var ttdichvudienid = $('#hidTTCacDichVuDien').val();

        var hotennguoiyeucau = $('#txtHoTenNguoiYeuCauDVDien').val();
        var dienthoai = $('#txtDienThoaiDiDongDVDien').val();
        var sochungminhthu = $('#txtSoChungMinhThuDVDien').val();
        var ngaycap = tedu.getFormatDateYYMMDD($('#txtNgayCapDVDien').val());
        var noicap = $('#txtNoiCapDVDien').val();
        var ddltinh = $('#ddlTinhDVDien').val();
        var ddlhuyen = $('#ddlThanhPhoHuyenDVDien').val();
        var ddlxa = $('#ddlPhuongXaDVDien').val();
        var sonha = $('#txtSoNhaDien').val();
        var tenduong = $('#txtSoNhaDVDien').val();

        var laoihinhdichvu = $('#ddlLoaiHinhDichVuDVDien').val();

        //var giaytotuythan = $('#ddlGiayToTuyThan').val();
        //var giaytoxacdinhchuthe = $('#ddlGiayToXacDinhChuThe').val();
        //var giaytoxacdinhmucdich = $('#ddlGiayToXacDinhMucDich').val();

        var ghichudien = $('#txtGhiChuDVDien').val();

        $.ajax({
            type: 'POST',
            url: '/ttdangkytt/UpdateDVDien',
            data: {
                Id: ttdichvudienid,

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

                GhiChu: ghichudien
            },
            dataType: 'json',
            //beforeSend: function () {
            //    tedu.startLoading();
            //},
            success: function (response) {
                nguyen.appUserLoginLogger(userName, "Sửa dịch vụ điện.");

                if (response == true) {
                    tedu.notify('Sửa dịch vụ điện.', 'success');
                }
                else {
                    tedu.notify('Sửa dịch vụ điện.', 'error');
                }
                $('#modal-add-edit-EditDVDien').modal('hide');
                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

}