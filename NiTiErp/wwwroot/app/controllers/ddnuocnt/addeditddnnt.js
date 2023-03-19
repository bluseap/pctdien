var addeditddntcController = function () {

    this.loadDDGDNNghiemThuNuoc = function (giaydenghiDMCCDVNuocId) {
        loadDDGDNNghiemThuNuoc(giaydenghiDMCCDVNuocId);
    }

    this.loadTableGiayDeNghiDMCungCapNuoc = function () {
        loadTableGiayDeNghiDMCungCapNuoc();
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
            var isgiaydenghiNghiemThu = $('#hidInsertGDNNghiemThuNuocId').val(); // 1: insert; 2: update; 

            if (isgiaydenghiNghiemThu == 1) {
                saveGDNNghiemThuNuoc();
            } else if (isgiaydenghiNghiemThu == 2) {
                updateGDNNghiemThuNuoc();
            }
        });

    }

    function loadAddEditData() {
        
    }

    function addeditClearData() {
        var datenow = new Date();

        $('#hidGDNNghiemThuNuocId').val(0);
        $('#hidGiayDeNghiDMCungCapNuocId').val(0);
        //$('#hidInsertGiayDeNghiDMCungCapNuocId').val(0); // 1: insert; 2: update;
        $('#hidInsertGDNNghiemThuNuocId').val(0); // 1: insert; 2: update;
        $('#hidTrangThaiNghiemThu').val(0);

        $('#txtNgayDuyetNghiemThu').val(tedu.getFormattedDate(datenow));
        $('#txtNhanVienDuyetNT').val('');
        $('#txtKetLuanNghiemThu').val('');
            
    }

    function loadTableGiayDeNghiDMCungCapNuoc(isPageChanged) {
        var template = $('#table-DiDoiNuocNT').html();
        var render = "";

        var makhuvuc = $('#ddlKhuVuc').val();
        var phongtoid = $('#ddlPhongTo').val();
        var timnoidung = $('#txtTimNoiDung').val();

        $.ajax({
            type: 'GET',
            url: '/admin/DDNuocNT/ListGDNNuocTTNT',
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

                $('#lbDiDoiNuocNTTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentDiDoiNuocNT').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingDiDoiNuocNT(response.Result.RowCount, function () {
                        loadTableGiayDeNghiDMCungCapNuoc();
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
    function wrapPagingDiDoiNuocNT(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULDiDoiNuocNT a').length === 0 || changePageSize === true) {
            $('#paginationULDiDoiNuocNT').empty();
            $('#paginationULDiDoiNuocNT').removeData("twbs-pagination");
            $('#paginationULDiDoiNuocNT').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULDiDoiNuocNT').twbsPagination({
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

    function loadDDGDNNghiemThuNuoc(giaydenghiDMCCDVNuocId) {
        $.ajax({
            type: "GET",
            url: "/Admin/DDNuocNT/GetGDNDMCCNuocId",
            data: {
                id: giaydenghiDMCCDVNuocId
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var gdndmccnuoc = response.Result;

                addeditClearData();

                $('#hidGiayDeNghiDMCungCapNuocId').val(gdndmccnuoc.Id);
                $('#hidTrangThaiNghiemThu').val(gdndmccnuoc.TTNghiemThu);

                var ttnghiemthu = gdndmccnuoc.TTNghiemThu;

                if (ttnghiemthu == 0) { // cho kiem tra
                    $('#modal-add-edit-DDNuocNT').modal('show');

                    $('#hidInsertGDNNghiemThuNuocId').val(1); // 1: insert; 2: update;                                     
                }
                else if (ttnghiemthu == 2) { // Nhap - duyet nghiem thu ok
                    $('#modal-add-edit-DDNuocNT').modal('show');

                    $('#hidInsertGDNNghiemThuNuocId').val(2); // 1: insert; 2: update; 

                    loadDDGDNNghiemThuNuocUpdate(giaydenghiDMCCDVNuocId);                    
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
        if ($('#frmMainDDNuocNT').valid()) {
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
        $('#frmMainDDNuocNT').validate({
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

    function saveGDNNghiemThuNuoc() {
        var giaydenghidmcungcapnuocId = $('#hidGiayDeNghiDMCungCapNuocId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var ngayduyet = tedu.getFormatDateYYMMDD($('#txtNgayDuyetNghiemThu').val());
            var tenhanvienduyet = $('#txtNhanVienDuyetNT').val();
            var ketluan = $('#txtKetLuanNghiemThu').val();

            $.ajax({
                type: "POST",
                url: "/Admin/ddnuocnt/CreateGDNTCNuoc",
                data: {
                    GiayDeNghiDMCungCapNuocId: giaydenghidmcungcapnuocId,

                    NgayDuyet: ngayduyet,
                    TenNhanVienDuyet: tenhanvienduyet,
                    KetLuan: ketluan
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu nghiệm thu nước.", "error");
                    }
                    else {
                        tedu.notify('Lưu nghiệm thu nước.', 'success');

                        loadTableGiayDeNghiDMCungCapNuoc(true);

                        addeditClearData();

                        $('#modal-add-edit-DDNuocNT').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu nghiệm thu nước.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function updateGDNNghiemThuNuoc() {
        var giaydenghidmcungcapnuocId = $('#hidGiayDeNghiDMCungCapNuocId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var ngayduyet = tedu.getFormatDateYYMMDD($('#txtNgayDuyetNghiemThu').val());
            var tenhanvienduyet = $('#txtNhanVienDuyetNT').val();
            var ketluan = $('#txtKetLuanNghiemThu').val();

            $.ajax({
                type: "POST",
                url: "/Admin/ddnuocnt/UpGDNNTNuoc",
                data: {
                    GiayDeNghiDMCungCapNuocId: giaydenghidmcungcapnuocId,

                    NgayDuyet: ngayduyet,
                    TenNhanVienDuyet: tenhanvienduyet,
                    KetLuan: ketluan
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu nghiệm thu nước.", "error");
                    }
                    else {
                        tedu.notify('Lưu nghiệm thu nước.', 'success');

                        loadTableGiayDeNghiDMCungCapNuoc(true);

                        addeditClearData();

                        $('#modal-add-edit-DDNuocNT').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu nghiệm thu nước.', 'error');
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

    function loadDDGDNNghiemThuNuocUpdate(giaydenghiDMCCDVNuocId) {
        $.ajax({
            type: "GET",
            url: "/Admin/DDNuocNT/GetGDNNTNuocId",
            data: {
                id: giaydenghiDMCCDVNuocId
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var gdndmccnuoc = response.Result;

                $('#txtNgayDuyetNghiemThu').val(tedu.getFormattedDate(gdndmccnuoc.NgayDuyet));
                $('#txtNhanVienDuyetNT').val(gdndmccnuoc.TenNhanVienDuyet);
                $('#txtKetLuanNghiemThu').val(gdndmccnuoc.KetLuan);

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

}