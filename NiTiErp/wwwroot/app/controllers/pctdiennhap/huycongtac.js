var huycongtacController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var loaddatatable = new loaddatatableController();

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
                updateHuyCongTac();
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

    function updateHuyCongTac() {
        var pctdienId = $('#hidPCTDienId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var ngayhuyct = tedu.getFormatDateYYMMDD($('#txtNgayHuyPCT').val());
            var ghichuhuyct = $("#txtGhiChuHuyPCT").val();            

            $.ajax({
                type: "POST",
                url: "/Admin/pctdiennhap/UpHuyCT",
                data: {
                    Id: pctdienId,

                    NgayHuyPCT: ngayhuyct,
                    GhiChuHuyPCT: ghichuhuyct                    
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
                        nguyen.appUserLoginLogger(userName, "Update Hủy phiếu công tác điện. Id: " + pctdienId);

                        tedu.notify('Update Hủy phiếu công tác điện.', 'success');

                        ClearData();

                        loaddatatable.loadTablePCTDien();

                        $('#modal-add-edit-EditPCTDienHuyCongTac').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Update Hủy phiếu công tác điện.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

}