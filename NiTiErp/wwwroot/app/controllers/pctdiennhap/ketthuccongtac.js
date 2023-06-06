var ketthuccongtacController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var loaddatatable = new loaddatatableController();

    this.loadEditKetThucCongTac = function () {
        loadEditKetThucCongTac();
    }

    this.initialize = function () {
        registerEvents();
        loadEditData();
        ClearData();
    }

    function registerEvents() {
        $('#txtKTCTNgayTraLamViec, #txtKTCTNgayNgayKhoaPCT, #txtKTCTNgayKiemTraHoanThanhPCT ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        loadTagsInput();

        $('#btnSaveEditKTCTKetThucCT').on('click', function () {
            const ispctdien = $('#hidInsertPCTDien').val(); // 1: insert; 2: update; 
            const trangthaipct = $('#hidPCTDienTrangThaiPCT').val(); // 3: Xac nhan da cap PCT ; 

            const isnguoicapphieu = $('#hidisNGUOICAPPHIEU').val();
            const isnguoichihuytt = $('#hidisNGUOICHIHUYTT').val();

            if (isnguoicapphieu == 'true' || isnguoichihuytt == 'true') {
                if (trangthaipct == '3') {
                    if (ispctdien == "2") {
                        updateKhoaPhieuCongTac();
                    }
                }
                else {
                    if (ispctdien == "2") {
                        updateKetThucCongTac();
                    }
                }
            }
            else {
                tedu.notify('Phải là người có chức danh cấp phiếu hoặc người chỉ huy trực tiếp.', 'error');             
            }            
        });

        $('#btnLayDSDDCTChuaHoanThanh').on('click', function () {
            loaEditPCTDien();
        });

    }

    function loadEditData() {       
        $('#txtKTCTTenNguoiChiHuyTrucTiep').prop('disabled', true);
        $('#txtKTCTTenNguoiChoPhep').prop('disabled', true);
        $('#txtKTCTTenNguoiCapPCT').prop('disabled', true);
    }

    function ClearData() {
        var datenow = new Date();

        $("#txtTraLamViecTenOngBa").val('');
        $("#txtTraLamViecOngBaTenChucVu").val('');
        $("#txtTenDaiDienQuanLyVanHanh").val('');

        $("#txtKTCTGioNgayTraLamViec").val(tedu.getFormattedDateGio(datenow));
        $("#txtKTCTPhutNgayTraLamViec").val(tedu.getFormattedDatePhut(datenow));
        $("#txtKTCTNgayTraLamViec").val(tedu.getFormattedDate(datenow));

        $("#txtLyDoTonChuaThucHien").val('');
        $("#txtLyDoChuaThucHien").val('');
        $("#txtKTCTTenNguoiChiHuyTrucTiep").val('');       

        $("#txtKTCTGioNgayKhoaPCT").val(tedu.getFormattedDateGio(datenow));
        $("#txtKTCTPhutNgayKhoaPCT").val(tedu.getFormattedDatePhut(datenow));
        $("#txtKTCTNgayNgayKhoaPCT").val(tedu.getFormattedDate(datenow));

        $("#txtKTCTTenNguoiChoPhep").val('');
        $("#txtKTCTNgayKiemTraHoanThanhPCT").val(tedu.getFormattedDate(datenow));

        $("#txtKTCTTenNguoiCapPCT").val('');
        $("#txtKTCTTenNguoiKiemTraATLDTaiHienTruong").val('');
        $("#txtKTCTChucVuNguoiKiemTraATLDTaiHienTruong").val('');
    }

    function loadTagsInput() {        
        $('#txtLyDoTonChuaThucHien').tagsInput({
            width: 'auto',
            height: '60px',
            allowDuplicates: false
        });

    }

    function isFormMainValidate() {
        if ($('#frmMainEditPCTDienKetThucCongTac').valid()) {
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
        $('#frmMainEditPCTDienKetThucCongTac').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                txtTraLamViecTenOngBa: { required: true },
                txtTraLamViecOngBaTenChucVu: { required: true },
                txtTenDaiDienQuanLyVanHanh: { required: true },

                txtKTCTGioNgayTraLamViec: { required: true },
                txtKTCTPhutNgayTraLamViec: { required: true },
                txtKTCTNgayTraLamViec: { required: true, isDateVietNam: true },

                //txtLyDoTonChuaThucHien: { required: true },
                //txtLyDoChuaThucHien: { required: true },
                txtKTCTTenNguoiChiHuyTrucTiep: { required: true },

                txtKTCTGioNgayKhoaPCT: { required: true },
                txtKTCTPhutNgayKhoaPCT: { required: true },
                txtKTCTNgayNgayKhoaPCT: { required: true, isDateVietNam: true },

                txtKTCTTenNguoiChoPhep: { required: true },
                txtKTCTNgayKiemTraHoanThanhPCT: { required: true },
                txtKTCTTenNguoiCapPCT: { required: true },
                //txtKTCTTenNguoiKiemTraATLDTaiHienTruong: { required: true },
                //txtKTCTChucVuNguoiKiemTraATLDTaiHienTruong: { required: true },

                //txtNgaySinh: { required: true, isDateVietNam: true },
                //ddlMaMDSD: { required: true, isDanhMuc: true }, 
            },
        });
    } 

    function loadEditKetThucCongTac() {
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

                ClearData();

                $('#hidPCTDienCode').val(pctdien.Code);
                $('#hidPCTDienTrangThaiPCT').val(pctdien.TrangThaiPCT);

                $('#txtTraLamViecTenOngBa').val(pctdien.TraLamViecTenOngBa);
                $('#txtTraLamViecOngBaTenChucVu').val(pctdien.TraLamViecOngBaTenChucVu);
                $('#txtTenDaiDienQuanLyVanHanh').val(pctdien.TenDaiDienQuanLyVanHanh); 

                $("#txtKTCTGioNgayTraLamViec").val(pctdien.GioTraLamViec != null ? pctdien.GioTraLamViec : tedu.getFormattedDateGio(datenow));
                $("#txtKTCTPhutNgayTraLamViec").val(pctdien.PhutTraLamViec != null ? pctdien.PhutTraLamViec : tedu.getFormattedDatePhut(datenow));
                $("#txtKTCTNgayTraLamViec").val(pctdien.NgayTraLamViec !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(pctdien.NgayTraLamViec) : tedu.getFormattedDate(datenow));

                let cacvieclydotonchuathuchien = pctdien.LyDoTonChuaThucHien != null ? pctdien.LyDoTonChuaThucHien : '';
                $("#txtLyDoTonChuaThucHien").importTags(cacvieclydotonchuathuchien);
                //$('#txtLyDoTonChuaThucHien').val(pctdien.LyDoTonChuaThucHien);
                $('#txtLyDoChuaThucHien').val(pctdien.LyDoChuaThucHien);

                $('#hidPCTDienNguoiChiHuyTrucTiepId').val(pctdien.NguoiChiHuyTrucTiepId); 
                $('#txtKTCTTenNguoiChiHuyTrucTiep').val(pctdien.TenNguoiChiHuyTrucTiep); 

                $("#txtKTCTGioNgayKhoaPCT").val(pctdien.GioKhoaPCT != null ? pctdien.GioKhoaPCT : tedu.getFormattedDateGio(datenow));
                $("#txtKTCTPhutNgayKhoaPCT").val(pctdien.PhutKhoaPCT != null ? pctdien.PhutKhoaPCT : tedu.getFormattedDatePhut(datenow));
                $("#txtKTCTNgayNgayKhoaPCT").val(pctdien.NgayKhoaPCT !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(pctdien.NgayKhoaPCT) : tedu.getFormattedDate(datenow));

                $('#hidPCTDienNguoiChoPhepId').val(pctdien.NguoiChoPhepId);
                $('#txtKTCTTenNguoiChoPhep').val(pctdien.TenNguoiChoPhep);

                $('#txtKTCTNgayKiemTraHoanThanhPCT').val(pctdien.NgayKiemTraHoanThanhPCT !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(pctdien.NgayKiemTraHoanThanhPCT) : tedu.getFormattedDate(datenow));

                $('#hidPCTDienTenNguoiCapPCTId').val(pctdien.TenNguoiCapPCTId); 
                $('#txtKTCTTenNguoiCapPCT').val(pctdien.TenNguoiCapPCT); 

                $('#hidPCTDienTenNguoiCapPhieuTaiHienTruongId').val(pctdien.NguoiKiemTraATLDTaiHienTruongId);
                $('#txtKTCTTenNguoiKiemTraATLDTaiHienTruong').val(pctdien.TenNguoiKiemTraATLDTaiHienTruong);
                $('#txtKTCTChucVuNguoiKiemTraATLDTaiHienTruong').val(pctdien.ChucVuNguoiKiemTraATLDTaiHienTruong); 

                $('#modal-add-edit-EditPCTDienKetThucCongTac').modal('show');
                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function updateKetThucCongTac() {
        var pctdienId = $('#hidPCTDienId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var tenongba = $("#txtTraLamViecTenOngBa").val();
            var ongbachucvu = $("#txtTraLamViecOngBaTenChucVu").val();
            var daidienquanlyvanhanh = $("#txtTenDaiDienQuanLyVanHanh").val();

            var giongaytralamviec = $("#txtKTCTGioNgayTraLamViec").val();
            var phuttralamviec = $("#txtKTCTPhutNgayTraLamViec").val();
            var ngaytralamviec = tedu.getFormatDateYYMMDD($('#txtKTCTNgayTraLamViec').val());

            var lydotonchuathuchien = $("#txtLyDoTonChuaThucHien").val();
            var lydochuathuchien = $("#txtLyDoChuaThucHien").val();
            let kiemtranhaplydoton = lydotonchuathuchien === '' ? 0 : (lydochuathuchien === '' ? 1 : 0);

            var nguoichihuytructiepid = $("#hidPCTDienNguoiChiHuyTrucTiepId").val();
            var tennguoichihuytructiep = $("#txtKTCTTenNguoiChiHuyTrucTiep").val();

            var giongaykhoapct = $("#txtKTCTGioNgayKhoaPCT").val();
            var phutkhoapct = $("#txtKTCTPhutNgayKhoaPCT").val();
            var ngaykhoapct = tedu.getFormatDateYYMMDD($('#txtKTCTNgayNgayKhoaPCT').val());

            var nguoichophepid = $("#hidPCTDienNguoiChoPhepId").val();
            var tennguoichophep = $("#txtKTCTTenNguoiChoPhep").val();

            var ngayhoanthanhpct = tedu.getFormatDateYYMMDD($('#txtKTCTNgayKiemTraHoanThanhPCT').val());

            var tennguoicapid = $("#hidPCTDienTenNguoiCapPCTId").val();
            var tennguoicap = $("#txtKTCTTenNguoiCapPCT").val();

            var tennguoicapphieutaihientruongid = $("#hidPCTDienTenNguoiCapPhieuTaiHienTruongId").val();
            var tennguoicapphieutaihientruong = $("#txtKTCTTenNguoiKiemTraATLDTaiHienTruong").val();
            var chucvutennguoicapphieutaihientruong = $("#txtKTCTChucVuNguoiKiemTraATLDTaiHienTruong").val();

            if (kiemtranhaplydoton == '0') {
                $.ajax({
                    type: "POST",
                    url: "/Admin/pctdiennhap/UpKeTThucCT",
                    data: {
                        Id: pctdienId,

                        TraLamViecTenOngBa: tenongba,
                        TraLamViecOngBaTenChucVu: ongbachucvu,
                        TenDaiDienQuanLyVanHanh: daidienquanlyvanhanh,

                        GioTraLamViec: giongaytralamviec,
                        PhutTraLamViec: phuttralamviec,
                        NgayTraLamViec: ngaytralamviec,

                        LyDoTonChuaThucHien: lydotonchuathuchien,
                        LyDoChuaThucHien: lydochuathuchien,

                        NguoiChiHuyTrucTiepId: nguoichihuytructiepid,
                        TenNguoiChiHuyTrucTiep: tennguoichihuytructiep,

                        GioKhoaPCT: giongaykhoapct,
                        PhutKhoaPCT: phutkhoapct,
                        NgayKhoaPCT: ngaykhoapct,

                        NguoiChoPhepId: nguoichophepid,
                        TenNguoiChoPhep: tennguoichophep,
                        NgayKiemTraHoanThanhPCT: ngayhoanthanhpct,

                        TenNguoiCapPCTId: tennguoicapid,
                        TenNguoiCapPCT: tennguoicap,

                        NguoiKiemTraATLDTaiHienTruongId: tennguoicapphieutaihientruongid,
                        TenNguoiKiemTraATLDTaiHienTruong: tennguoicapphieutaihientruong,
                        ChucVuNguoiKiemTraATLDTaiHienTruong: chucvutennguoicapphieutaihientruong
                    },
                    dataType: "json",
                    beforeSend: function () {
                        tedu.startLoading();
                    },
                    success: function (response) {
                        if (response.Result === false) {
                            tedu.notify("Update Phiếu công tác điện.", "error");
                        }
                        else {
                            nguyen.appUserLoginLogger(userName, "Update Phiếu công tác điện. Id: " + pctdienId);

                            tedu.notify('Update Phiếu công tác điện.', 'success');

                            ClearData();

                            loaddatatable.loadTablePCTDien();

                            $('#modal-add-edit-EditPCTDienKetThucCongTac').modal('hide');
                            tedu.stopLoading();
                        }
                    },
                    error: function () {
                        tedu.notify('Có lỗi! Không thể Update Phiếu công tác điện.', 'error');
                        tedu.stopLoading();
                    }
                });
            }
            else {
                tedu.notify('Đề nghị nhập lý do chưa thực hiện', 'error');
            }
        }
    }

    function updateKhoaPhieuCongTac() {
        var pctdienId = $('#hidPCTDienId').val();

        var tenongba = '';
        var ongbachucvu = '';
        var daidienquanlyvanhanh = '';

        var giongaytralamviec = $("#txtKTCTGioNgayTraLamViec").val();
        var phuttralamviec = $("#txtKTCTPhutNgayTraLamViec").val();
        var ngaytralamviec = tedu.getFormatDateYYMMDD($('#txtKTCTNgayTraLamViec').val());

        var lydotonchuathuchien = $("#txtLyDoTonChuaThucHien").val();
        var lydochuathuchien = $("#txtLyDoChuaThucHien").val();
        let kiemtranhaplydoton = lydotonchuathuchien === '' ? 0 : (lydochuathuchien === '' ? 1 : 0);

        var nguoichihuytructiepid = $("#hidPCTDienNguoiChiHuyTrucTiepId").val();
        var tennguoichihuytructiep = $("#txtKTCTTenNguoiChiHuyTrucTiep").val();

        var giongaykhoapct = $("#txtKTCTGioNgayKhoaPCT").val();
        var phutkhoapct = $("#txtKTCTPhutNgayKhoaPCT").val();
        var ngaykhoapct = tedu.getFormatDateYYMMDD($('#txtKTCTNgayNgayKhoaPCT').val());

        var nguoichophepid = $("#hidPCTDienNguoiChoPhepId").val();
        var tennguoichophep = $("#txtKTCTTenNguoiChoPhep").val();

        var ngayhoanthanhpct = tedu.getFormatDateYYMMDD($('#txtKTCTNgayKiemTraHoanThanhPCT').val());

        var tennguoicapid = $("#hidPCTDienTenNguoiCapPCTId").val();
        var tennguoicap = $("#txtKTCTTenNguoiCapPCT").val();

        var tennguoicapphieutaihientruongid = $("#hidPCTDienTenNguoiCapPhieuTaiHienTruongId").val();
        var tennguoicapphieutaihientruong = $("#txtKTCTTenNguoiKiemTraATLDTaiHienTruong").val();
        var chucvutennguoicapphieutaihientruong = $("#txtKTCTChucVuNguoiKiemTraATLDTaiHienTruong").val();

        if (kiemtranhaplydoton == '0') {
            $.ajax({
                type: "POST",
                url: "/Admin/pctdiennhap/UpKeTThucCT",
                data: {
                    Id: pctdienId,

                    TraLamViecTenOngBa: tenongba,
                    TraLamViecOngBaTenChucVu: ongbachucvu,
                    TenDaiDienQuanLyVanHanh: daidienquanlyvanhanh,

                    GioTraLamViec: giongaytralamviec,
                    PhutTraLamViec: phuttralamviec,
                    NgayTraLamViec: ngaytralamviec,

                    LyDoTonChuaThucHien: lydotonchuathuchien,
                    LyDoChuaThucHien: lydochuathuchien,

                    NguoiChiHuyTrucTiepId: nguoichihuytructiepid,
                    TenNguoiChiHuyTrucTiep: tennguoichihuytructiep,

                    GioKhoaPCT: giongaykhoapct,
                    PhutKhoaPCT: phutkhoapct,
                    NgayKhoaPCT: ngaykhoapct,

                    NguoiChoPhepId: nguoichophepid,
                    TenNguoiChoPhep: tennguoichophep,
                    NgayKiemTraHoanThanhPCT: ngayhoanthanhpct,

                    TenNguoiCapPCTId: tennguoicapid,
                    TenNguoiCapPCT: tennguoicap,

                    NguoiKiemTraATLDTaiHienTruongId: tennguoicapphieutaihientruongid,
                    TenNguoiKiemTraATLDTaiHienTruong: tennguoicapphieutaihientruong,
                    ChucVuNguoiKiemTraATLDTaiHienTruong: chucvutennguoicapphieutaihientruong
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Update Phiếu công tác điện.", "error");
                    }
                    else {
                        nguyen.appUserLoginLogger(userName, "Update Khóa Phiếu công tác điện. Id: " + pctdienId);

                        tedu.notify('Update Khóa Phiếu công tác điện.', 'success');

                        ClearData();

                        loaddatatable.loadTablePCTDien();

                        $('#modal-add-edit-EditPCTDienKetThucCongTac').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Update Khóa Phiếu công tác điện.', 'error');
                    tedu.stopLoading();
                }
            });
        }
        else {
            tedu.notify('Đề nghị nhập lý do chưa thực hiện', 'error');
        }
    }

    function loaEditPCTDien() {
        var pctdienId = $('#hidPCTDienId').val();

        $.ajax({
            type: "GET",
            url: "/Admin/pctdiennhap/GetDDCTIdHoanThanh",
            data: {
                PCTDienId: pctdienId
            },
            dataType: "json",

            success: function (response) {
                var ddcongtac = response.Result;

                let lydotonchuathuchien = ddcongtac.TenDiaDiemCongTac != null ? ddcongtac.TenDiaDiemCongTac : ''               

                $("#txtLyDoTonChuaThucHien").importTags(lydotonchuathuchien);               
               
                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

}