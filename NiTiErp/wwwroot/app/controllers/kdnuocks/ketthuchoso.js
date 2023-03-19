﻿var ketthuchosoController = function () {

    var addeditkdn = new addeditkdnController();

    this.loadKetThucHoSo = function (giaydenghidmcungcapnuocId) {
        loadKetThucHoSo(giaydenghidmcungcapnuocId);
    }

    this.initialize = function () {
        registerEvents();
        clearKetThucHoSo();
    }

    function registerEvents() {
        $('#txtNgayKetThucHoSo ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        $('#btnSaveKetThucHoSo').on('click', function () {
            var isgiaydenghi = $('#hidInsertGDNXuLyKiemDinhNuocId').val(); // 1: insert; 2: update;             

            if (isgiaydenghi == 2) {
                upKetThucHoSo();
            }
            else {
                tedu.notify('Không lưu được Kết thúc hồ sơ.', 'error')
            }
        });
    }

    function clearKetThucHoSo() {
        var datenow = new Date();

        $('#hidGiayDeNghiDMCungCapNuocId').val(0);
        $('#hidInsertGDNXuLyKiemDinhNuocId').val(0);

        $('#txtNgayKetThucHoSo').val(tedu.getFormattedDate(datenow));
        $('#txtNhanVienKetThucHoSo').val('');
        $('#txtGhiChuKetThucHoSo').val('');
    }

    function loadKetThucHoSo(giaydenghidmcungcapnuocId) {

        $.ajax({
            type: "GET",
            url: "/Admin/KDNuocKS/GetGDNKDNuocId",
            data: {
                id: giaydenghidmcungcapnuocId
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var gdnxulykiemdinhnuoc = response.Result;

                clearKetThucHoSo();

                $('#hidGiayDeNghiDMCungCapNuocId').val(giaydenghidmcungcapnuocId);

                $('#hidInsertGDNXuLyKiemDinhNuocId').val(2); // 1: insert; 2: update;

                $('#modal-add-edit-KetThucHoSo').modal('show');
             
                $('#txtNgayKetThucHoSo').val(tedu.getFormattedDate(gdnxulykiemdinhnuoc.NgayKetThucHoSo == "0001-01-01T00:00:00" ?
                    datenow : gdnxulykiemdinhnuoc.NgayKetThucHoSo));
                $('#txtNhanVienKetThucHoSo').val(gdnxulykiemdinhnuoc.TenNhanVienNhapKetThucHoSo);
                $('#txtGhiChuKetThucHoSo').val(gdnxulykiemdinhnuoc.GhiChuKetThucHoSo);

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });

    }

    function isFormMainValidate() {
        if ($('#frmMainKetThucHoSo').valid()) {
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
        $('#frmMainKetThucHoSo').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                txtNgayKetThucHoSo: {
                    required: true,
                    isDateVietNam: true
                },
            },
        });
    }

    function upKetThucHoSo() {
        var giaydenghidmcungcapnuocId = $('#hidGiayDeNghiDMCungCapNuocId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var ngayketthuchoso = tedu.getFormatDateYYMMDD($('#txtNgayKetThucHoSo').val());
            var tennhanvienkthoso = $('#txtNhanVienKetThucHoSo').val();
            var ghichuketthuchoso = $('#txtGhiChuKetThucHoSo').val();

            $.ajax({
                type: "POST",
                url: "/Admin/KDNuocKS/UpKetThucKDNuoc",
                data: {
                    GiayDeNghiDMCungCapNuocId: giaydenghidmcungcapnuocId,

                    NgayKetThucHoSo: ngayketthuchoso,
                    TenNhanVienNhapKetThucHoSo: tennhanvienkthoso,
                    GhiChuKetThucHoSo: ghichuketthuchoso
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Kết thúc hồ sơ.", "error");
                    }
                    else {
                        tedu.notify('Kết thúc hồ sơ.', 'success');

                        addeditkdn.loadTableGiayDeNghiDMCungCapNuoc(true);

                        clearKetThucHoSo();

                        $('#modal-add-edit-KetThucHoSo').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Kết thúc hồ sơ.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

}