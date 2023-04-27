var chopheplamviecController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var loaddatatable = new loaddatatableController();

    this.loadEditChoPhepLamViec = function () {
        loadEditChoPhepLamViec();
    }

    this.initialize = function () {
        registerEvents();
        
        ClearData();        
    }

    function registerEvents() {
        $('#txtCPLVNgayDVCTBatDauCongViec ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        $('#txtCPLVCacGiayPhoiHopChoPhep').tagsInput({
            width: 'auto',
            height: '50px'
        });

        $("#btnCPLVGiayPhoiHopChoPhep").on('click', function () {
            var giayphoihopchophep = $("#txtCPLVGiayPhoiHopChoPhep").val();            
            
            if (giayphoihopchophep !== '') {
                $('#txtCPLVCacGiayPhoiHopChoPhep').addTag(giayphoihopchophep);
                $("#txtCPLVGiayPhoiHopChoPhep").val('');
            }
        });

        $('#btnSaveEditChoPhepLamViec').on('click', function () {
            var ispctdien = $('#hidInsertPCTDien').val(); // 1: insert; 2: update; 

            if (ispctdien == "2") {
                updateChoPhepLamViec();
            }
        });

    }    

    function ClearData() {
        var datenow = new Date();

        $("#txtThietBiDuongDayDaCatDien").val('');
        $("#txtDaTiepDat").val('');
        $("#txtDaLamRaoChanTreoBienBaoTai").val('');
        $("#txtPhamViDuocPhepLamViec").val('');
        $("#txtCanhBaoChiDanNguyHiem").val('');
        $("#txtNguoiChiHuyTTKiemTraDamBaoAT").val('');
        $("#txtLamTiepDatTai").val('');
        $("#txtCPLVTongHangMucDaKiemTraBHLD").val('');

        $("#txtCPLVGiayPhoiHopChoPhep").val('');
        $("#txtCPLVCacGiayPhoiHopChoPhep").val('');

        $("#txtCPLVGioDVCTBatDauCongViec").val(tedu.getFormattedDateGio(datenow));
        $("#txtCPLVPhutDVCTBatDauCongViec").val(tedu.getFormattedDatePhut(datenow));
        $("#txtCPLVNgayDVCTBatDauCongViec").val(tedu.getFormattedDate(datenow));
    }

    function isFormMainValidate() {
        if ($('#frmMainEditPCTDienChoPhepLamViec').valid() ) {
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
        $('#frmMainEditPCTDienChoPhepLamViec').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                txtThietBiDuongDayDaCatDien: { required: true },
                txtDaTiepDat: { required: true },
                txtDaLamRaoChanTreoBienBaoTai: { required: true },
                txtPhamViDuocPhepLamViec: { required: true },
                txtCanhBaoChiDanNguyHiem: { required: true },                
                txtNguoiChiHuyTTKiemTraDamBaoAT: { required: true },
                txtLamTiepDatTai: { required: true },
                txtCPLVTongHangMucDaKiemTraBHLD: { required: true },               

                txtCPLVGioDVCTBatDauCongViec: { required: true },
                txtCPLVPhutDVCTBatDauCongViec: { required: true },
                txtCPLVNgayDVCTBatDauCongViec: { required: true, isDateVietNam: true },                
                
                //txtNgaySinh: { required: true, isDateVietNam: true },
                //ddlMaMDSD: { required: true, isDanhMuc: true },               

            },
        });
    } 

    function loadEditChoPhepLamViec() {
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

                $('#txtThietBiDuongDayDaCatDien').val(pctdien.ThietBiDuongDayDaCatDien);
                $('#txtDaTiepDat').val(pctdien.DaTiepDatTai);
                $('#txtDaLamRaoChanTreoBienBaoTai').val(pctdien.DaLamRaoChanTreoBienBaoTai);
                $('#txtPhamViDuocPhepLamViec').val(pctdien.PhamViDuocPhepLamViec);
                $('#txtCanhBaoChiDanNguyHiem').val(pctdien.CanhBaoChiDanNguyHiem);
                $('#txtNguoiChiHuyTTKiemTraDamBaoAT').val(pctdien.NguoiChiHuyTTKiemTraDamBaoAT);
                $('#txtLamTiepDatTai').val(pctdien.LamTiepDatTai);
                $('#txtCPLVTongHangMucDaKiemTraBHLD').val(pctdien.TongHangMucDaKiemTraBHLD);

                var cacgiayphoihopchophep = pctdien.CacGiayPhoiHopChoPhep != null ? pctdien.CacGiayPhoiHopChoPhep : '';
                $("#txtCPLVCacGiayPhoiHopChoPhep").importTags(cacgiayphoihopchophep);

                $("#txtCPLVGioDVCTBatDauCongViec").val(pctdien.GioChoPhepDonViCT != null ? pctdien.GioChoPhepDonViCT : tedu.getFormattedDateGio(datenow));
                $("#txtCPLVPhutDVCTBatDauCongViec").val(pctdien.PhutChoPhepDonViCT != null ? pctdien.PhutChoPhepDonViCT : tedu.getFormattedDatePhut(datenow));
                $("#txtCPLVNgayDVCTBatDauCongViec").val(pctdien.NgayChoPhepDonViCT !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(pctdien.NgayChoPhepDonViCT) : tedu.getFormattedDate(datenow));
                                               
                $('#modal-add-edit-EditPCTDienChoPhepLamViec').modal('show');
                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function updateChoPhepLamViec() {
        var pctdienId = $('#hidPCTDienId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var thietbiduongdaydacatdien = $("#txtThietBiDuongDayDaCatDien").val();
            var datiepdattai = $("#txtDaTiepDat").val();
            var dalamraochantreobienbaotai = $("#txtDaLamRaoChanTreoBienBaoTai").val();
            var phamviduocpheplamviec = $("#txtPhamViDuocPhepLamViec").val();
            var canhbaochidannguyhiem = $("#txtCanhBaoChiDanNguyHiem").val();
            var nguoichihuyttkiemtradambaoat = $("#txtNguoiChiHuyTTKiemTraDamBaoAT").val();
            var lamtiepdattai = $("#txtLamTiepDatTai").val();
            var tonghangmucdakiemtrabhld = $("#txtCPLVTongHangMucDaKiemTraBHLD").val();
            var cacgiayphoihopchophep = $("#txtCPLVCacGiayPhoiHopChoPhep").val();           
            
            var giobatdaucongviec = $("#txtCPLVGioDVCTBatDauCongViec").val();
            var phutbatdaucongviec = $("#txtCPLVPhutDVCTBatDauCongViec").val();
            var ngaybatdaucongviec = tedu.getFormatDateYYMMDD($('#txtCPLVNgayDVCTBatDauCongViec').val());            

            $.ajax({
                type: "POST",
                url: "/Admin/pctdiennhap/UpChoPhepLV",
                data: {
                    Id: pctdienId,                    

                    ThietBiDuongDayDaCatDien: thietbiduongdaydacatdien,
                    DaTiepDatTai: datiepdattai,
                    DaLamRaoChanTreoBienBaoTai: dalamraochantreobienbaotai,
                    PhamViDuocPhepLamViec: phamviduocpheplamviec,
                    CanhBaoChiDanNguyHiem: canhbaochidannguyhiem,
                    NguoiChiHuyTTKiemTraDamBaoAT: nguoichihuyttkiemtradambaoat,
                    LamTiepDatTai: lamtiepdattai,
                    TongHangMucDaKiemTraBHLD: tonghangmucdakiemtrabhld,

                    CacGiayPhoiHopChoPhep: cacgiayphoihopchophep,     
                    
                    GioChoPhepDonViCT: giobatdaucongviec,
                    PhutChoPhepDonViCT: phutbatdaucongviec,
                    NgayChoPhepDonViCT: ngaybatdaucongviec,         
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

                        $('#modal-add-edit-EditPCTDienChoPhepLamViec').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Update Phiếu công tác điện.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

}