var duyetthietkeController = function () {    

    var addeditddn = new addeditdddController();

    this.loadDuyetThietKeDien = function (giaydenghidmcungcapdienId) {
        loadDuyetThietKeDien(giaydenghidmcungcapdienId);
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
            var isgiaydenghi = $('#hidInsertGDNThietKeDienId').val(); // 1: insert; 2: update;             

            if (isgiaydenghi == 2) {
                upDuyetThietKeDien();
            }           
            else {
                tedu.notify('Không lưu được Duyệt thiết kế.', 'error')
            }
        });

    }

    function clearDuyetThietKe() {
        var datenow = new Date();

        $('#hidGiayDeNghiDMCungCapDienId').val(0);
        $('#hidInsertGDNThietKeDienId').val(0);

        $('#txtNgayDuyetThietKe').val(tedu.getFormattedDate(datenow));
        $('#txtNhanVienDuyetTK').val('');
        $('#txtGhiChuThietKe').val('');  

    }

    function loadDuyetThietKeDien(giaydenghidmcungcapdienId) {        

        $.ajax({
            type: "GET",
            url: "/Admin/DDDienKSTK/GetGDNTKDienId",
            data: {
                id: giaydenghidmcungcapdienId
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
                    $('#hidGiayDeNghiDMCungCapDienId').val(giaydenghidmcungcapdienId);
                    $('#hidInsertGDNThietKeDienId').val(2); // 1: insert; 2: update;

                    $('#modal-add-edit-DuyetThietKe').modal('show');

                    var datenow = new Date();
                    $('#txtNgayDuyetThietKe').val(tedu.getFormattedDate(gdnthietke.NgayDuyetTK == "0001-01-01T00:00:00" ? datenow : gdnthietke.NgayDuyetTK));
                    $('#txtNhanVienDuyetTK').val(gdnthietke.TenNhanVienDuyetTK);
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

    function upDuyetThietKeDien() {
        var giaydenghidmcungcapdienId = $('#hidGiayDeNghiDMCungCapDienId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var ngayduyetthietke = tedu.getFormatDateYYMMDD($('#txtNgayDuyetThietKe').val());
            var tennhanvientk = $('#txtNhanVienDuyetTK').val();
            var ghichutk = $('#txtGhiChuThietKe').val();           

            $.ajax({
                type: "POST",
                url: "/Admin/dddienkstk/UpDuyetTK",
                data: {
                    GiayDeNghiDMCungCapDienId: giaydenghidmcungcapdienId,

                    NgayDuyetTK: ngayduyetthietke,
                    TenNhanVienDuyetTK: tennhanvientk,
                    GhiChu: ghichutk
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Duyệt thiết kế điện.", "error");
                    }
                    else {
                        tedu.notify('Duyệt thiết kế điện.', 'success');

                        addeditddn.loadTableGiayDeNghiDMCungCapDien(true);

                        clearDuyetThietKe();

                        $('#modal-add-edit-DuyetThietKe').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Duyệt thiết kế điện.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }
    
}