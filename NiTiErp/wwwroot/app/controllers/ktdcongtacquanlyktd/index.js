var ktdcongtacquanlyController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();    

    var loaddatatable = new loaddatatableController();  

    var addeditcongtacquanly = new addeditcongtacquanlyController();    

    this.initialize = function () {        
        loaddatatable.loadKhuVuc();       

        registerEvents();

        loadData();
        clearData();        

        addeditcongtacquanly.initialize();        
    }

    function registerEvents() {

        $("#btnTraCuuBaoCao").on('click', function () {
            loaddatatable.loadTableThayTheVatTu();
            loaddatatable.loadTablePhatTrienLuoiDien();
        });

        $("#btnKhoiTaoDanhMucBaoCao").on('click', function () {
            const dmkhoitaobaocao = $("#ddlDanhMucKhoiTaoBaoCao").val();
            if (dmkhoitaobaocao == "0") {
                khoitaobaocao();
            }
            else {
                khoitaobaocao();
            }
        });

        $('body').on('click', '.btn-addeditKTDThayTheVatTu', function (e) {
            e.preventDefault();
            const thaythevattuid = $(this).data('id');         
            $('#hidThayTheVatTuId').val(thaythevattuid);
            loaddatatable.editThayTheVatTu();
            $('#modal-add-edit-EditKTDThayTheVatTu').modal('show');
        });
        $('body').on('click', '.btn-addeditKTDPhatTrienLuoiDien', function (e) {
            e.preventDefault();
            const phattrienluoidienid = $(this).data('id');
            $('#hidPhatTrienLuoiDienId').val(phattrienluoidienid);
            $('#modal-add-edit-EditKTDThayTheVatTu').modal('show');
        });

        //$('#txtKTDBaoCaoCongTacQuanLyKTDTuNgay, #txtKTDBaoCaoCongTacQuanLyKTDDenNgay ').datepicker({
        //    autoclose: true,
        //    format: 'dd/mm/yyyy',
        //    language: 'vi'
        //}); 

        //$('#ckKTDBaoCaoCongTacQuanLyKTDChonTheoNgay').on('click', function () {
        //    var ckTheoNgay = document.getElementById('ckKTDBaoCaoCongTacQuanLyKTDChonTheoNgay');
        //    if (ckTheoNgay.checked) {
        //        $('#txtKTDBaoCaoCongTacQuanLyKTDTuNgay').prop('disabled', false);
        //        $('#txtKTDBaoCaoCongTacQuanLyKTDDenNgay').prop('disabled', false);
        //    }
        //    else {
        //        $('#txtKTDBaoCaoCongTacQuanLyKTDTuNgay').prop('disabled', true);
        //        $('#txtKTDBaoCaoCongTacQuanLyKTDDenNgay').prop('disabled', true);
        //    }
        //});        

    }   

    function clearData() {
        var datenow = new Date();

        $('#txtNam').val(tedu.getFormattedDateYYYY(datenow));
        $('#txtThang').val(tedu.getFormattedDateMM(datenow));

        $("#ddlDanhMucKhoiTaoBaoCao")[0].selectedIndex = 0;

        //$('#txtKTDBaoCaoCongTacQuanLyKTDTuNgay').prop('disabled', true);
        //$('#txtKTDBaoCaoCongTacQuanLyKTDDenNgay').prop('disabled', true);
        //var ckTheoNgay = document.getElementById('ckKTDBaoCaoCongTacQuanLyKTDChonTheoNgay');
        //ckTheoNgay.checked = false;        
    }

    function loadData() {
        var render = "<option value='0' >-- Tất cả --</option>";
        render += "<option value='TTVTTB'>1. Thay thế vật tư, thiết bị</option>";
        render += "<option value='CTPTLD'>2. Công tác phát triển lưới điện</option>";
        render += "<option value='NCSCMTBA'>3. Công tác nâng công suất, cấy mới TBA</option>";
        render += "<option value='PTKH'>4. Công tác phát triển khách hàng</option>";
        render += "<option value='CTXLK'>5. Công tác xử lý khác</option>";
        render += "<option value='DTBDLD'>6. Công tác duy tu bảo dưỡng lưới điện</option>";
        render += "<option value='CTSCTKH'>7. Công tác cải tạo, sửa chữa theo kế hoạch</option>";
        render += "<option value='CTAT'>II. Công tác an toàn</option>";          
        $('#ddlDanhMucKhoiTaoBaoCao').html(render);

    }

    function khoitaobaocao() {
        var dmkhoitaobaocao = $('#ddlDanhMucKhoiTaoBaoCao').val();
        var xinghiep = $('#ddlXiNghiep').val();
        var nam = $('#txtNam').val();
        var thang = $('#txtThang').val();

        $.ajax({
            type: "POST",
            url: "/Admin/ktdcongtacquanlyktd/KhoiTaoBaoCao",
            data: {
                DmKhoiTao: dmkhoitaobaocao,
                MaKhuVuc: xinghiep,
                Nam: nam,
                Thang: thang
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Khởi tạo báo cáo lỗi.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Khởi tạo báo cáo. dmkhoitao: " + DmKhoiTao + ", Khu vực: " + xinghiep + ", Năm: " + nam + ", Tháng: " + thang);

                    tedu.notify('Khởi tạo báo cáo.', 'success');

                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu Khởi tạo báo cáo.', 'error');
                tedu.stopLoading();
            }
        });
    }
    

}