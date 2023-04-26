var huycongtacController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    this.loadEditHuyCongTac = function () {
        loadEditHuyCongTac();
    }

    this.initialize = function () {
        registerEvents();        
        ClearData();
    }

    function registerEvents() {
        $('#txtNgayHuyPCT').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        $('#btnSaveEditHuyPCT').on('click', function () {
            var ispctdien = $('#hidInsertPCTDien').val(); // 1: insert; 2: update; 

            if (ispctdien == "2") {
                //updateHuyCongTac();
            }
        });

    }    

    function ClearData() {
        var datenow = new Date();        

        $("#txtNgayHuyPCT").val(tedu.getFormattedDate(datenow));        
        $("#txtGhiChuHuyPCT").val('');        
    }

    function isFormMainValidate() {
        if ($('#frmMainEditPCTDienHuyCongTac').valid()) {
            return true;
        }
        else {
            return false;
        }
    }
    function formMainValidate() {
        jQuery.validator.addMethod("isDanhMuc", function (value, element) {
            if (value === "%")
                return false;
            else
                return true;
        },
            "Xin chọn danh mục.."
        );

        jQuery.validator.addMethod("isDateVietNam", function (value, element) {
            return this.optional(element) || moment(value, "DD/MM/YYYY").isValid();
        },
            "Nhập theo định dạng ngày, tháng, năm."
        );

        //Init validation 
        $('#frmMainEditPCTDienHuyCongTac').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {                
                txtNgayHuyPCT: { required: true, isDateVietNam: true },

            },
        });
    }

    function loadEditHuyCongTac() {
        var pctdienId = $('#hidPCTDienId').val();
        var datenow = new Date();

        $.ajax({
            type: "GET",
            url: "/Admin/pctdiennhap/GetpctdId",
            data: {
                PCTDienId: pctdienId
            },
            dataType: "json",

            success: function (response) {
                var pctdien = response.Result;                

                $("#txtNgayHuyPCT").val(pctdien.NgayHuyPCT !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(pctdien.NgayHuyPCT) : tedu.getFormattedDate(datenow));
                $("#txtGhiChuHuyPCT").val(pctdien.GhiChuHuyPCT);                 

                $('#modal-add-edit-EditPCTDienHuyCongTac').modal('show');
                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    //function updateKetThucCongTac() {
    //    var pctdienId = $('#hidPCTDienId').val();

    //    var isMainValidate = isFormMainValidate();
    //    if (isMainValidate === true) {
    //        var tenongba = $("#txtTraLamViecTenOngBa").val();
    //        var ongbachucvu = $("#txtTraLamViecOngBaTenChucVu").val();
    //        var daidienquanlyvanhanh = $("#txtTenDaiDienQuanLyVanHanh").val();

    //        var giongaytralamviec = $("#txtKTCTGioNgayTraLamViec").val();
    //        var phuttralamviec = $("#txtKTCTPhutNgayTraLamViec").val();
    //        var ngaytralamviec = tedu.getFormatDateYYMMDD($('#txtKTCTNgayTraLamViec').val());

    //        var lydotonchuathuchien = $("#txtLyDoTonChuaThucHien").val();
    //        var lydochuathuchien = $("#txtLyDoChuaThucHien").val();

    //        var nguoichihuytructiepid = $("#hidPCTDienNguoiChiHuyTrucTiepId").val();
    //        var tennguoichihuytructiep = $("#txtKTCTTenNguoiChiHuyTrucTiep").val();

    //        var giongaykhoapct = $("#txtKTCTGioNgayKhoaPCT").val();
    //        var phutkhoapct = $("#txtKTCTPhutNgayKhoaPCT").val();
    //        var ngaykhoapct = tedu.getFormatDateYYMMDD($('#txtKTCTNgayNgayKhoaPCT').val());

    //        var nguoichophepid = $("#hidPCTDienNguoiChoPhepId").val();
    //        var tennguoichophep = $("#txtKTCTTenNguoiChoPhep").val();

    //        var ngayhoanthanhpct = tedu.getFormatDateYYMMDD($('#txtKTCTNgayKiemTraHoanThanhPCT').val());

    //        var tennguoicapid = $("#hidPCTDienTenNguoiCapPCTId").val();
    //        var tennguoicap = $("#txtKTCTTenNguoiCapPCT").val();

    //        var tennguoicapphieutaihientruongid = $("#hidPCTDienTenNguoiCapPhieuTaiHienTruongId").val();
    //        var tennguoicapphieutaihientruong = $("#txtKTCTTenNguoiKiemTraATLDTaiHienTruong").val();
    //        var chucvutennguoicapphieutaihientruong = $("#txtKTCTChucVuNguoiKiemTraATLDTaiHienTruong").val();

    //        $.ajax({
    //            type: "POST",
    //            url: "/Admin/pctdiennhap/UpKeTThucCT",
    //            data: {
    //                Id: pctdienId,

    //                TraLamViecTenOngBa: tenongba,
    //                TraLamViecOngBaTenChucVu: ongbachucvu,
    //                TenDaiDienQuanLyVanHanh: daidienquanlyvanhanh,

    //                GioTraLamViec: giongaytralamviec,
    //                PhutTraLamViec: phuttralamviec,
    //                NgayTraLamViec: ngaytralamviec,

    //                LyDoTonChuaThucHien: lydotonchuathuchien,
    //                LyDoChuaThucHien: lydochuathuchien,

    //                NguoiChiHuyTrucTiepId: nguoichihuytructiepid,
    //                TenNguoiChiHuyTrucTiep: tennguoichihuytructiep,

    //                GioKhoaPCT: giongaykhoapct,
    //                PhutKhoaPCT: phutkhoapct,
    //                NgayKhoaPCT: ngaykhoapct,

    //                NguoiChoPhepId: nguoichophepid,
    //                TenNguoiChoPhep: tennguoichophep,
    //                NgayKiemTraHoanThanhPCT: ngayhoanthanhpct,

    //                TenNguoiCapPCTId: tennguoicapid,
    //                TenNguoiCapPCT: tennguoicap,

    //                NguoiKiemTraATLDTaiHienTruongId: tennguoicapphieutaihientruongid,
    //                TenNguoiKiemTraATLDTaiHienTruong: tennguoicapphieutaihientruong,
    //                ChucVuNguoiKiemTraATLDTaiHienTruong: chucvutennguoicapphieutaihientruong
    //            },
    //            dataType: "json",
    //            beforeSend: function () {
    //                tedu.startLoading();
    //            },
    //            success: function (response) {
    //                if (response.Result === false) {
    //                    tedu.notify("Update Phiếu công tác điện.", "error");
    //                }
    //                else {
    //                    nguyen.appUserLoginLogger(userName, "Update Phiếu công tác điện. Id: " + pctdienId);

    //                    tedu.notify('Update Phiếu công tác điện.', 'success');

    //                    ClearData();

    //                    $('#modal-add-edit-EditPCTDienKetThucCongTac').modal('hide');
    //                    tedu.stopLoading();
    //                }
    //            },
    //            error: function () {
    //                tedu.notify('Có lỗi! Không thể Update Phiếu công tác điện.', 'error');
    //                tedu.stopLoading();
    //            }
    //        });
    //    }
    //}

}