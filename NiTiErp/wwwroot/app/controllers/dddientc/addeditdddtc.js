var addeditdddtcController = function () {

    this.loadDDGDNThiCongDien = function (giaydenghiDMCCDVDienId) {
        loadDDGDNThiCongDien(giaydenghiDMCCDVDienId);
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

        $('#txtNgayDuyetThiCong ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        $('#btnSaveDuyetThiCong').on('click', function () {
            var isgiaydenghiThiCong = $('#hidInsertGDNThiCongDienId').val(); // 1: insert; 2: update; 

            if (isgiaydenghiThiCong == 1) {
                saveGDNThiCongDien();
            } else if (isgiaydenghiThiCong == 2) {
                updateGDNThiCongDien();
            }
        });       

    }

    function loadAddEditData() {
        
    }

    function addeditClearData() {
        var datenow = new Date();

        $('#hidGDNThiCongDienId').val(0);
        $('#hidGiayDeNghiDMCungCapDienId').val(0);
        //$('#hidInsertGiayDeNghiDMCungCapNuocId').val(0); // 1: insert; 2: update;
        $('#hidInsertGDNThiCongDienId').val(0); // 1: insert; 2: update;
        $('#hidTrangThaiThiCong').val(0);

        $('#txtNgayDuyetThiCong').val(tedu.getFormattedDate(datenow));
        $('#txtNhanVienDuyetTC').val('');
        $('#txtGhiChuThiCong').val('');  

        //$('#ddlDMCungCapDichVu')[0].selectedIndex = 0;
        //$('#tbl-contentDMCungCapDichVu').html('');            
    }

    function loadTableGiayDeNghiDMCungCapDien(isPageChanged) {
        var template = $('#table-DiDoiDienTC').html();
        var render = "";

        var makhuvuc = $('#ddlKhuVuc').val();
        var phongtoid = $('#ddlPhongTo').val();
        var timnoidung = $('#txtTimNoiDung').val();

        $.ajax({
            type: 'GET',
            url: '/admin/DDDienTC/ListGDNDienTTTC',
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
                            TTThiCong: tedu.getGiayDeNghiTT(item.TTThiCong)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            //Price: tedu.formatNumber(item.Price, 0),
                        });
                    });
                }

                $('#lbDiDoiDienTCTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentDiDoiDienTC').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingDiDoiDienTC(response.Result.RowCount, function () {
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
    function wrapPagingDiDoiDienTC(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULDiDoiDienTC a').length === 0 || changePageSize === true) {
            $('#paginationULDiDoiDienTC').empty();
            $('#paginationULDiDoiDienTC').removeData("twbs-pagination");
            $('#paginationULDiDoiDienTC').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULDiDoiDienTC').twbsPagination({
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

    function loadDDGDNThiCongDien(giaydenghiDMCCDVDienId) {
        $.ajax({
            type: "GET",
            url: "/Admin/DDDienTC/GetGDNDMCCDienId",
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
                $('#hidTrangThaiThiCong').val(gdndmccnuoc.TTThiCong);

                var ttthicong = gdndmccnuoc.TTThiCong;

                if (ttthicong == 0) { // cho kiem tra
                    $('#modal-add-edit-DDDienTC').modal('show');

                    $('#hidInsertGDNThiCongDienId').val(1); // 1: insert; 2: update;                                     
                }
                else if (ttthicong == 2){ // Nhap - duyet thi cong ok
                    $('#modal-add-edit-DDDienTC').modal('show');

                    $('#hidInsertGDNThiCongDienId').val(2); // 1: insert; 2: update; 

                    loadDDGDNThiCongDienUpdate(giaydenghiDMCCDVDienId);                     
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
        if ($('#frmMainDDDienTC').valid()) {
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
        $('#frmMainDDDienTC').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                txtNgayDuyetThiCong: {
                    required: true,
                    isDateVietNam: true
                }       
            },
            //messages: {
            //    txtTrichYeu: { required: "Nhập nội dung trích yếu của văn bản.." }
            //}
        });
    }

    function saveGDNThiCongDien() {
        var giaydenghidmcungcapdienId = $('#hidGiayDeNghiDMCungCapDienId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var ngayduyet = tedu.getFormatDateYYMMDD($('#txtNgayDuyetThiCong').val());
            var tenhanvienduyet = $('#txtNhanVienDuyetTC').val();
            var ghichu = $('#txtGhiChuThiCong').val();           

            $.ajax({
                type: "POST",
                url: "/Admin/dddientc/CreateGDNTCDien",
                data: {
                    GiayDeNghiDMCungCapDienId: giaydenghidmcungcapdienId,

                    NgayDuyet: ngayduyet,
                    TenNhanVienDuyet: tenhanvienduyet,
                    GhiChu: ghichu
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu thi công điện.", "error");
                    }
                    else {
                        tedu.notify('Lưu thi công điện.', 'success');

                        loadTableGiayDeNghiDMCungCapDien(true);

                        addeditClearData();

                        $('#modal-add-edit-DDDienTC').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu thi công điện.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function updateGDNThiCongDien() {
        var giaydenghidmcungcapdienId = $('#hidGiayDeNghiDMCungCapDienId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var ngayduyet = tedu.getFormatDateYYMMDD($('#txtNgayDuyetThiCong').val());
            var tenhanvienduyet = $('#txtNhanVienDuyetTC').val();
            var ghichu = $('#txtGhiChuThiCong').val();

            $.ajax({
                type: "POST",
                url: "/Admin/dddientc/UpGDNTCDien",
                data: {
                    GiayDeNghiDMCungCapDienId: giaydenghidmcungcapdienId,

                    NgayDuyet: ngayduyet,
                    TenNhanVienDuyet: tenhanvienduyet,
                    GhiChu: ghichu
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu thi công điện.", "error");
                    }
                    else {
                        tedu.notify('Lưu thi công điện.', 'success');

                        loadTableGiayDeNghiDMCungCapDien(true);

                        addeditClearData();

                        $('#modal-add-edit-DDDienTC').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu thi công điện.', 'error');
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
        $('#txtNhanVienDuyetTC').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {
                //$('#txtChucVu1').val(suggestion.TenChucVu);
            }
        });
    }

    function loadDDGDNThiCongDienUpdate(giaydenghiDMCCDVDienId) {
        $.ajax({
            type: "GET",
            url: "/Admin/DDDienTC/GetGDNTCDienId",
            data: {
                id: giaydenghiDMCCDVDienId
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var gdndmccnuoc = response.Result;

                $('#txtNgayDuyetThiCong').val(tedu.getFormattedDate(gdndmccnuoc.NgayDuyet));
                $('#txtNhanVienDuyetTC').val(gdndmccnuoc.TenNhanVienDuyet);
                $('#txtGhiChuThiCong').val(gdndmccnuoc.GhiChu);  

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }
    
}