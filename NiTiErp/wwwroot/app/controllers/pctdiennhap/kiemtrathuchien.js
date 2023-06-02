var kiemtrathuchienController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();    

    this.loadEditKiemTraThucHien = function () {
        loadEditKiemTraThucHien();
    }

    this.initialize = function () {
        registerEvents();
        LoadData();
        ClearData();
    }

    function registerEvents() {
        $('#txtNgayKiemTraThucHien').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        $('#ddlTrangThaiKiemTraThucHien').on('change', function () {
            let trangthaikiemtrathuchien = $('#ddlTrangThaiKiemTraThucHien').val();

            if (trangthaikiemtrathuchien == '0') {
                $("#txtGhiChuKiemTraThucHien").val('');
            }
            if (trangthaikiemtrathuchien == '52') {
                const ghichu = 'Phiếu công tác thực hiện đúng qui trình, đúng biện pháp an toàn và hoàn thành toàn bộ công việc được giao';
                $("#txtGhiChuKiemTraThucHien").val(ghichu);
            }
            if (trangthaikiemtrathuchien == '54') {
                const ghichu = 'Phiếu công tác thực hiện đúng qui trình, đúng biện pháp an toàn nhưng còn tồn đọng công việc';
                $("#txtGhiChuKiemTraThucHien").val(ghichu);
            }
            if (trangthaikiemtrathuchien == '56') {
                const ghichu = 'Thiếu sót...';
                $("#txtGhiChuKiemTraThucHien").val(ghichu);
            }            
        });

        $('#btnSaveEditKiemTraThucHien').on('click', function () {
            var ispctdien = $('#hidInsertPCTDien').val(); // 1: insert; 2: update; 

            if (ispctdien == "2") {
                updateKiemTraThucHien();
            }
        });

    }

    function LoadData() {
        var render = "<option value='0' >-- Lựa chọn --</option>";
        render += "<option value=52>Hoàn thành toàn bộ công việc</option>";
        render += "<option value=54>Còn tồn đọng công việc</option>";
        render += "<option value=56>Thiếu sót công việc</option>";
        $('#ddlTrangThaiKiemTraThucHien').html(render);
        
    }

    function ClearData() {
        var datenow = new Date();

        $("#txtNgayKiemTraThucHien").val(tedu.getFormattedDate(datenow));
        $("#ddlTrangThaiKiemTraThucHien")[0].selectedIndex = 0;
        $("#txtGhiChuKiemTraThucHien").val('');
    }

    function isFormMainValidate() {
        if ($('#frmMainEditKiemTraThucHien').valid()) {
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
        $('#frmMainEditKiemTraThucHien').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                //txtNgayHuyPCT: { required: true, isDateVietNam: true },
            },
        });
    }    

    function loadEditKiemTraThucHien() {
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

                $("#txtNgayKiemTraThucHien").val(pctdien.NgayKiemTraThucHien !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(pctdien.NgayKiemTraThucHien) : tedu.getFormattedDate(datenow));
                $("#ddlTrangThaiKiemTraThucHien").val(pctdien.TrangThaiKiemTraThucHien);
                $("#txtGhiChuKiemTraThucHien").val(pctdien.GhiChuKiemTraThucHien);

                $('#modal-add-edit-EditKiemTraThucHien').modal('show');
                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function updateKiemTraThucHien() {
        var pctdienId = $('#hidPCTDienId').val();

        var ngaykiemtrathuchien = tedu.getFormatDateYYMMDD($('#txtNgayKiemTraThucHien').val());
        var trangthaikiemtrathuchien = $("#ddlTrangThaiKiemTraThucHien").val();
        var ghichukiemtrathuchien = $("#txtGhiChuKiemTraThucHien").val();

        $.ajax({
            type: "POST",
            url: "/Admin/pctdiennhap/KiemTraTH",
            data: {
                Id: pctdienId,

                NgayKiemTraThucHien: ngaykiemtrathuchien,
                TrangThaiKiemTraThucHien: trangthaikiemtrathuchien,
                GhiChuKiemTraThucHien: ghichukiemtrathuchien
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
                    nguyen.appUserLoginLogger(userName, "Update kiểm tra thực hiện phiếu công tác điện. Id: " + pctdienId);

                    tedu.notify('Update kiểm tra thực hiện  phiếu công tác điện.', 'success');

                    ClearData();                    

                    $('#modal-add-edit-EditKiemTraThucHien').modal('hide');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Update kiểm tra thực hiện phiếu công tác điện.', 'error');
                tedu.stopLoading();
            }
        });
    }

}