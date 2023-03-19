var editdangkydienController = function () {    
   
    this.loadEditDangKyDien = function () {
        loadEditDangKyDien();
    }

    this.initialize = function () {
        registerEvents();
        loadData();
    }

    function registerEvents() {
        $('#txtNgayCapDien').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        $("#ddlMucDichSuDungDien").on('change', function () {
            var mucdich = $("#ddlMucDichSuDungDien").val();
            //Kiem tra bang TTDMDangKy theo Muc dich su dung
            if (mucdich == 24) {
                loaiHinhDichVu("LoaiHinhDichVuSinhHoatGiaDinhDien");
            }
            //Kiem tra bang TTDMDangKy theo Muc dich su dung
            else if (mucdich == 25) {
                loaiHinhDichVu("LoaiHinhDichDien");
            }
        });

        $("#ddlThanhPhoHuyenDien").on('change', function () {
            let huyen = $("#ddlThanhPhoHuyenDien").val();
            // 883: Long Xuyen
            if (huyen == 883) {
                //$('#modal-add-edit-ThongBao').modal('show');
                $('#ddlThanhPhoHuyenDien')[0].selectedIndex = 0;
            } else {
                PhuongXa(huyen);
            }
        });

        $('#btnSaveEditDangKyDien').on('click', function () {
            var inup = $('#hidInsertUpdateTTDangKyDien').val()
            //1: insert; 2: update
            if (inup == 2) {
                editDangKyDien();
            }
        });

    }

    function loadData() {
        tinhHuyenXa();
        PhuongXaAll();

        mucDichSuDung("MucDichSudungDien");

        loaiHinhDichVu("%");
    }

    function clearDangKyDien() {
        var datenow = new Date();

        $('#txtHoTenNguoiYeuCauDien').val('');
        $('#txtDienThoaiDiDongDien').val('');
      
        $('#txtSoChungMinhThuDien').val('');
        $('#txtNgayCapDien').val(tedu.getFormattedDate(datenow));
        $('#txtNoiCapDien').val('');
        $('#ddlTinhDien')[0].selectedIndex = 0;
        $('#ddlThanhPhoHuyenDien')[0].selectedIndex = 0;
        $('#ddlPhuongXaDien')[0].selectedIndex = 0;
        $('#txtSoNhaDien').val('');
        $('#txtDuongPhoApToDien').val('');

        $('#ddlMucDichSuDungDien')[0].selectedIndex = 0;
        $('#ddlLoaiHinhDichVuDien')[0].selectedIndex = 0;

        $('#txtGhiChuDien').val('');

        //$('#ddlGiayToTuyThan')[0].selectedIndex = 0;
        //$('#ddlGiayToXacDinhChuThe')[0].selectedIndex = 0;
        //$('#ddlGiayToXacDinhMucDich')[0].selectedIndex = 0;
    }

    function tinhHuyenXa() {
        var render = "<option value='89' >Tỉnh An Giang</option>";
        $('#ddlTinhDien').html(render);
        $("#ddlTinhDien")[0].selectedIndex = 0;

        let tinh = $('#ddlTinhDien').val();
        Huyen(tinh);

        var render2 = "<option value='0' >--- Chọn Xã / Phường / TT ---</option>";
        $('#ddlPhuongXaDien').html(render2);
        $("#ddlPhuongXaDien")[0].selectedIndex = 0;
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
                $('#ddlThanhPhoHuyenDien').html(render);
                $("#ddlThanhPhoHuyenDien")[0].selectedIndex = 0;
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
                $('#ddlPhuongXaDien').html(render);
                $("#ddlPhuongXaDien")[0].selectedIndex = 0;
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
                $('#ddlPhuongXaDien').html(render);
                $("#ddlPhuongXaDien")[0].selectedIndex = 0;
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
                $('#ddlMucDichSuDungDien').html(render);
                $("#ddlMucDichSuDungDien")[0].selectedIndex = 0;
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
                $('#ddlLoaiHinhDichVuDien').html(render);
                $("#ddlLoaiHinhDichVuDien")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục Loại hình dịch vụ.', 'error');
            }
        });
    }

    function loadEditDangKyDien() {
        var dangkydienid = $('#hidTTDangKyDien').val();

        $.ajax({
            type: "GET",
            url: "/Admin/ttdangkytt/GetDkDien",
            data: {
                dangkydienId: dangkydienid
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var dangkydien = response.Result;

                clearDangKyDien();                

                $('#txtHoTenNguoiYeuCauDien').val(dangkydien.HoTenNguoiYeuCau);
                $('#txtDienThoaiDiDongDien').val(dangkydien.DienThoai);

                $('#txtSoChungMinhThuDien').val(dangkydien.SoTheCCCD);
                $('#txtNgayCapDien').val(tedu.getFormattedDate(dangkydien.NgayCap));
                $('#txtNoiCapDien').val(dangkydien.NoiCap);

                $('#ddlTinhDien').val(dangkydien.ThanhPhoTinhId);
                $('#ddlThanhPhoHuyenDien').val(dangkydien.QuanHuyenId);
                $('#ddlPhuongXaDien').val(dangkydien.PhuongXaId);
                $('#txtSoNhaDien').val(dangkydien.SoNha);
                $('#txtDuongPhoApToDien').val(dangkydien.TenDuongApTo);

                $('#ddlMucDichSuDungDien').val(dangkydien.TTDMDangKyMucDichSuDung);
                $('#ddlLoaiHinhDichVuDien').val(dangkydien.TTDMDangKyLoaiHinhDichVu);

                $('#txtGhiChuDien').val(dangkydien.GhiChu);

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function editDangKyDien() {
        var ttdangkydienid = $('#hidTTDangKyDien').val();

        var hotennguoiyeucau = $('#txtHoTenNguoiYeuCauDien').val();
        var dienthoai = $('#txtDienThoaiDiDongDien').val();
        var sochungminhthu = $('#txtSoChungMinhThuDien').val();
        var ngaycap = tedu.getFormatDateYYMMDD($('#txtNgayCapDien').val());
        var noicap = $('#txtNoiCapDien').val();
        var ddltinh = $('#ddlTinhDien').val();
        var ddlhuyen = $('#ddlThanhPhoHuyenDien').val();
        var ddlxa = $('#ddlPhuongXaDien').val();
        var sonha = $('#txtSoNhaDien').val();
        var tenduong = $('#txtDuongPhoApToDien').val();

        var mucdichsudung = $('#ddlMucDichSuDungDien').val();
        var laoihinhdichvu = $('#ddlLoaiHinhDichVuDien').val();

        //var giaytotuythan = $('#ddlGiayToTuyThan').val();
        //var giaytoxacdinhchuthe = $('#ddlGiayToXacDinhChuThe').val();
        //var giaytoxacdinhmucdich = $('#ddlGiayToXacDinhMucDich').val();

        var ghichudien = $('#txtGhiChuDien').val();

        $.ajax({
            type: 'POST',
            url: '/ttdangkytt/UpdateDKDien',
            data: {
                Id: ttdangkydienid,              

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
                $('#modal-add-edit-EditDangKyDien').modal('hide');
                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

}