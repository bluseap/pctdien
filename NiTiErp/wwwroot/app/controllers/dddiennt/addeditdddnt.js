var addeditdddtcController = function () {

    this.loadDDGDNNghiemThuDien = function (giaydenghiDMCCDVDienId) {
        loadDDGDNNghiemThuDien(giaydenghiDMCCDVDienId);
    }

    this.loadTableGiayDeNghiDMCungCapDien = function () {
        loadTableGiayDeNghiDMCungCapDien();
    }

    this.initialize = function () {
        loadAddEditData();
        registerEvents();
        addeditClearData();
        loadAutocomplete();
    }

    function registerEvents() {

        $('#txtNgayDuyetNghiemThu ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        $('#btnSaveDuyetNghiemThu').on('click', function () {
            var isgiaydenghiNghiemThu = $('#hidInsertGDNNghiemThuDienId').val(); // 1: insert; 2: update; 

            if (isgiaydenghiNghiemThu == 1) {
                saveGDNNghiemThuDien();
            } else if (isgiaydenghiNghiemThu == 2) {
                updateGDNNghiemThuDien();
            }
        });

    }

    function loadAddEditData() {
        
    }

    function addeditClearData() {
        var datenow = new Date();

        $('#hidGDNNghiemThuDienId').val(0);
        $('#hidGiayDeNghiDMCungCapDienId').val(0);
        //$('#hidInsertGiayDeNghiDMCungCapNuocId').val(0); // 1: insert; 2: update;
        $('#hidInsertGDNNghiemThuDienId').val(0); // 1: insert; 2: update;
        $('#hidTrangThaiNghiemThu').val(0);

        $('#txtNgayDuyetNghiemThu').val(tedu.getFormattedDate(datenow));
        $('#txtNhanVienDuyetNT').val('');
        $('#txtKetLuanNghiemThu').val('');
            
    }

    function loadTableGiayDeNghiDMCungCapDien(isPageChanged) {
        var template = $('#table-DiDoiDienNT').html();
        var render = "";

        var makhuvuc = $('#ddlKhuVuc').val();
        var phongtoid = $('#ddlPhongTo').val();
        var timnoidung = $('#txtTimNoiDung').val();

        $.ajax({
            type: 'GET',
            url: '/admin/DDDienNT/ListGDNDienTTNT',
            data: {
                corporationId: makhuvuc,
                phongdanhmucId: phongtoid,
                keyword: timnoidung,
                page: tedu.configs.pageIndex,
                pageSize: tedu.configs.pageSize
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.Results.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result.Results, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,
                            TenKhachHang: item.TenKhachHang,
                            //HinhNhanVien: item.Image === null ? '<img src="/admin-side/images/user.png?h=90"' : '<img src="' + item.HinhNhanVien + '?h=90" />',
                            DanhSo: item.DanhSoKhachHang,
                            TenKhuVuc: item.TenKhuVuc,
                            DiaChiMuaNuoc: item.DiaChiMuaNuoc,
                            SoDienThoai: item.SoDienThoai,
                            TenDMCungCapDichVu: item.TenDMCungCapDichVu,
                            TTNghiemThu: tedu.getGiayDeNghiTT(item.TTNghiemThu)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            //Price: tedu.formatNumber(item.Price, 0),
                        });
                    });
                }

                $('#lbDiDoiDienNTTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentDiDoiDienNT').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingDiDoiDienNT(response.Result.RowCount, function () {
                        loadTableGiayDeNghiDMCungCapDien();
                    },
                        isPageChanged);
                }
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }
    function wrapPagingDiDoiDienNT(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULDiDoiDienNT a').length === 0 || changePageSize === true) {
            $('#paginationULDiDoiDienNT').empty();
            $('#paginationULDiDoiDienNT').removeData("twbs-pagination");
            $('#paginationULDiDoiDienNT').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULDiDoiDienNT').twbsPagination({
            totalPages: totalsize,
            visiblePages: 7,
            first: 'Đầu',
            prev: 'Trước',
            next: 'Tiếp',
            last: 'Cuối',
            onPageClick: function (event, p) {
                //tedu.configs.pageIndex = p;
                //setTimeout(callBack(), 200);
                if (tedu.configs.pageIndex !== p) {
                    tedu.configs.pageIndex = p;
                    setTimeout(callBack(), 200);
                }
            }
        });
    }

    function loadDDGDNNghiemThuDien(giaydenghiDMCCDVDienId) {
        $.ajax({
            type: "GET",
            url: "/Admin/DDDienNT/GetGDNDMCCDienId",
            data: {
                id: giaydenghiDMCCDVDienId
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var gdndmccnuoc = response.Result;

                addeditClearData();

                $('#hidGiayDeNghiDMCungCapDienId').val(gdndmccnuoc.Id);
                $('#hidTrangThaiNghiemThu').val(gdndmccnuoc.TTNghiemThu);

                var ttnghiemthu = gdndmccnuoc.TTNghiemThu;

                if (ttnghiemthu == 0) { // cho kiem tra
                    $('#modal-add-edit-DDDienNT').modal('show');

                    $('#hidInsertGDNNghiemThuDienId').val(1); // 1: insert; 2: update;                                     
                }
                else if (ttnghiemthu == 2) { // Nhap - duyet nghiem thu ok
                    $('#modal-add-edit-DDDienNT').modal('show');

                    $('#hidInsertGDNNghiemThuDienId').val(2); // 1: insert; 2: update; 

                    loadDDGDNNghiemThuDienUpdate(giaydenghiDMCCDVDienId); 
                }
                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function isFormMainValidate() {
        if ($('#frmMainDDDienNT').valid()) {
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
        $('#frmMainDDDienNT').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                txtNgayDuyetNghiemThu: {
                    required: true,
                    isDateVietNam: true
                }
            },
            //messages: {
            //    txtTrichYeu: { required: "Nhập nội dung trích yếu của văn bản.." }
            //}
        });
    }

    function saveGDNNghiemThuDien() {
        var giaydenghidmcungcapdienId = $('#hidGiayDeNghiDMCungCapDienId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var ngayduyet = tedu.getFormatDateYYMMDD($('#txtNgayDuyetNghiemThu').val());
            var tenhanvienduyet = $('#txtNhanVienDuyetNT').val();
            var ketluan = $('#txtKetLuanNghiemThu').val();

            $.ajax({
                type: "POST",
                url: "/Admin/dddiennt/CreateGDNTCDien",
                data: {
                    GiayDeNghiDMCungCapDienId: giaydenghidmcungcapdienId,

                    NgayDuyet: ngayduyet,
                    TenNhanVienDuyet: tenhanvienduyet,
                    KetLuanChayThu: ketluan
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu nghiệm thu điện.", "error");
                    }
                    else {
                        tedu.notify('Lưu nghiệm thu điện.', 'success');

                        loadTableGiayDeNghiDMCungCapDien(true);

                        addeditClearData();

                        $('#modal-add-edit-DDDienNT').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu nghiệm thu điện.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function updateGDNNghiemThuDien() {
        var giaydenghidmcungcapnuocId = $('#hidGiayDeNghiDMCungCapDienId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var ngayduyet = tedu.getFormatDateYYMMDD($('#txtNgayDuyetNghiemThu').val());
            var tenhanvienduyet = $('#txtNhanVienDuyetNT').val();
            var ketluan = $('#txtKetLuanNghiemThu').val();

            $.ajax({
                type: "POST",
                url: "/Admin/dddiennt/UpGDNNTDien",
                data: {
                    GiayDeNghiDMCungCapDienId: giaydenghidmcungcapnuocId,

                    NgayDuyet: ngayduyet,
                    TenNhanVienDuyet: tenhanvienduyet,
                    KetLuanChayThu: ketluan
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu nghiệm thu điện.", "error");
                    }
                    else {
                        tedu.notify('Lưu nghiệm thu điện.', 'success');

                        loadTableGiayDeNghiDMCungCapDien(true);

                        addeditClearData();

                        $('#modal-add-edit-DDDienNT').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu nghiệm thu điện.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function loadAutocomplete() {
        $.ajax({
            type: 'GET',
            url: "/admin/giaydn/GetListNVAuto",
            data: {
                codeXL: "DiDoiNuoc"
            },
            async: true,
            dataType: 'json',
            success: function (database) {
                arrayReturn = [];
                var data = database.Result;
                for (var i = 0, len = data.length; i < len; i++) {
                    arrayReturn.push({ 'value': data[i].TenNhanVien, 'TenChucVu': data[i].TenChucVu });
                }
                //send parse data to autocomplete function
                loadSuggestions(arrayReturn);
                //console.log(countries);               
            }
        });
    }
    function loadSuggestions(options) {
        $('#txtNhanVienDuyetNT').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {
                //$('#txtChucVu1').val(suggestion.TenChucVu);
            }
        });
    }

    function loadDDGDNNghiemThuDienUpdate(giaydenghiDMCCDVDienId) {
        $.ajax({
            type: "GET",
            url: "/Admin/DDDienNT/GetGDNNTDienId",
            data: {
                id: giaydenghiDMCCDVDienId
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var gdndmccnuoc = response.Result;

                $('#txtNgayDuyetNghiemThu').val(tedu.getFormattedDate(gdndmccnuoc.NgayDuyet));
                $('#txtNhanVienDuyetNT').val(gdndmccnuoc.TenNhanVienDuyet);
                $('#txtKetLuanNghiemThu').val(gdndmccnuoc.KetLuanChayThu);

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

}