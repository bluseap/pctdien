var duyetthietkeController = function () {    

    var addeditddn = new addeditddnController();

    this.loadDuyetThietKeNuoc = function (giaydenghidmcungcapnuocId) {
        loadDuyetThietKeNuoc(giaydenghidmcungcapnuocId);
    }

    this.initialize = function () {        
        registerEvents();
        clearDuyetThietKe();
    }

    function registerEvents() {
        $('#txtNgayDuyetThietKe ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        $('#btnSaveDuyetThietKe').on('click', function () {
            var isgiaydenghi = $('#hidInsertGDNThietKeNuocId').val(); // 1: insert; 2: update;             

            if (isgiaydenghi == 2) {
                upDuyetThietKeNuoc();
            }           
            else {
                tedu.notify('Không lưu được Duyệt thiết kế.', 'error')
            }
        });

    }

    function clearDuyetThietKe() {
        var datenow = new Date();

        $('#hidGiayDeNghiDMCungCapNuocId').val(0);
        $('#hidInsertGDNThietKeNuocId').val(0);

        $('#txtNgayDuyetThietKe').val(tedu.getFormattedDate(datenow));
        $('#txtNhanVienDuyetTK').val('');
        $('#txtGhiChuThietKe').val('');      

    }

    function loadDuyetThietKeNuoc(giaydenghidmcungcapnuocId) {        

        $.ajax({
            type: "GET",
            url: "/Admin/DDNuocKSTK/GetGDNTKNuocId",
            data: {
                id: giaydenghidmcungcapnuocId
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var gdnthietke = response.Result;

                var ttthietke = gdnthietke.TTThietKe;

                if (ttthietke == 5 || ttthietke == 8) { // cho thiet ke
                    tedu.notify('Đang chờ thiết kế.', 'error');
                }
                else {
                    $('#hidGiayDeNghiDMCungCapNuocId').val(giaydenghidmcungcapnuocId);
                    $('#hidInsertGDNThietKeNuocId').val(2); // 1: insert; 2: update;

                    $('#modal-add-edit-DuyetThietKe').modal('show');

                    var datenow = new Date();
                    $('#txtNgayDuyetThietKe').val(tedu.getFormattedDate(gdnthietke.NgayDuyet == "0001-01-01T00:00:00" ?
                        datenow : gdnthietke.NgayDuyet));
                    $('#txtNhanVienDuyetTK').val(gdnthietke.TenNhanVienDuyet);
                    $('#txtGhiChuThietKe').val(gdnthietke.GhiChu);
                }

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra. Kiểm tra lại quy trình.', 'error');
                tedu.stopLoading();
            }
        });

    }

    function isFormMainValidate() {
        if ($('#frmMainDuyetThietKe').valid()) {
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
        $('#frmMainDuyetThietKe').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                txtNgayDuyetThietKe: {
                    required: true,
                    isDateVietNam: true
                },
            },
        });
    }

    function upDuyetThietKeNuoc() {
        var giaydenghidmcungcapnuocId = $('#hidGiayDeNghiDMCungCapNuocId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var ngayduyetthietke = tedu.getFormatDateYYMMDD($('#txtNgayDuyetThietKe').val());
            var tennhanvientk = $('#txtNhanVienDuyetTK').val();
            var ghichutk = $('#txtGhiChuThietKe').val();           

            $.ajax({
                type: "POST",
                url: "/Admin/ddnuockstk/UpDuyetTK",
                data: {
                    GiayDeNghiDMCungCapNuocId: giaydenghidmcungcapnuocId,

                    NgayDuyet: ngayduyetthietke,
                    TenNhanVienDuyet: tennhanvientk,
                    GhiChu: ghichutk
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Duyệt thiết kế nước.", "error");
                    }
                    else {
                        tedu.notify('Duyệt thiết kế nước.', 'success');

                        addeditddn.loadTableGiayDeNghiDMCungCapNuoc(true);

                        clearDuyetThietKe();

                        $('#modal-add-edit-DuyetThietKe').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Duyệt thiết kế nước.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }
    
}