var addeditddntcController = function () {

    this.loadDDGDNThiCongNuoc = function (giaydenghiDMCCDVNuocId) {
        loadDDGDNThiCongNuoc(giaydenghiDMCCDVNuocId);
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

        $('#txtNgayDuyetThiCong ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        $('#btnSaveDuyetThiCong').on('click', function () {
            var isgiaydenghiThiCong = $('#hidInsertGDNThiCongNuocId').val(); // 1: insert; 2: update; 

            if (isgiaydenghiThiCong == 1) {
                saveGDNThiCongNuoc();
            } else if (isgiaydenghiThiCong == 2) {
                updateGDNThiCongNuoc();
            }
        });       

    }

    function loadAddEditData() {
        
    }

    function addeditClearData() {
        var datenow = new Date();

        $('#hidGDNThiCongNuocId').val(0);
        $('#hidGiayDeNghiDMCungCapNuocId').val(0);
        //$('#hidInsertGiayDeNghiDMCungCapNuocId').val(0); // 1: insert; 2: update;
        $('#hidInsertGDNThiCongNuocId').val(0); // 1: insert; 2: update;
        $('#hidTrangThaiThiCong').val(0);

        $('#txtNgayDuyetThiCong').val(tedu.getFormattedDate(datenow));
        $('#txtNhanVienDuyetTC').val('');
        $('#txtGhiChuThiCong').val('');  

        //$('#ddlDMCungCapDichVu')[0].selectedIndex = 0;
        //$('#tbl-contentDMCungCapDichVu').html('');            
    }

    function loadTableGiayDeNghiDMCungCapNuoc(isPageChanged) {
        var template = $('#table-DiDoiNuocTC').html();
        var render = "";

        var makhuvuc = $('#ddlKhuVuc').val();
        var phongtoid = $('#ddlPhongTo').val();
        var timnoidung = $('#txtTimNoiDung').val();

        $.ajax({
            type: 'GET',
            url: '/admin/DDNuocTC/ListGDNNuocTTTC',
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

                $('#lbDiDoiNuocTCTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentDiDoiNuocTC').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingDiDoiNuocTC(response.Result.RowCount, function () {
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
    function wrapPagingDiDoiNuocTC(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULDiDoiNuocTC a').length === 0 || changePageSize === true) {
            $('#paginationULDiDoiNuocTC').empty();
            $('#paginationULDiDoiNuocTC').removeData("twbs-pagination");
            $('#paginationULDiDoiNuocTC').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULDiDoiNuocTC').twbsPagination({
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

    function loadDDGDNThiCongNuoc(giaydenghiDMCCDVNuocId) {
        $.ajax({
            type: "GET",
            url: "/Admin/DDNuocTC/GetGDNDMCCNuocId",
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
                $('#hidTrangThaiThiCong').val(gdndmccnuoc.TTThiCong);

                var ttthicong = gdndmccnuoc.TTThiCong;

                if (ttthicong == 0) { // cho kiem tra
                    $('#modal-add-edit-DDNuocTC').modal('show');

                    $('#hidInsertGDNThiCongNuocId').val(1); // 1: insert; 2: update;                                     
                }
                else if (ttthicong == 2){ // Nhap - duyet thi cong ok
                    $('#modal-add-edit-DDNuocTC').modal('show');

                    $('#hidInsertGDNThiCongNuocId').val(2); // 1: insert; 2: update; 

                    loadDDGDNThiCongNuocUpdate(giaydenghiDMCCDVNuocId);                    
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
        if ($('#frmMainDDNuocTC').valid()) {
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
        $('#frmMainDDNuocTC').validate({
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

    function saveGDNThiCongNuoc() {
        var giaydenghidmcungcapnuocId = $('#hidGiayDeNghiDMCungCapNuocId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var ngayduyet = tedu.getFormatDateYYMMDD($('#txtNgayDuyetThiCong').val());
            var tenhanvienduyet = $('#txtNhanVienDuyetTC').val();
            var ghichu = $('#txtGhiChuThiCong').val();           

            $.ajax({
                type: "POST",
                url: "/Admin/ddnuoctc/CreateGDNTCNuoc",
                data: {
                    GiayDeNghiDMCungCapNuocId: giaydenghidmcungcapnuocId,

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
                        tedu.notify("Lưu thi công nước.", "error");
                    }
                    else {
                        tedu.notify('Lưu thi công nước.', 'success');

                        loadTableGiayDeNghiDMCungCapNuoc(true);

                        addeditClearData();

                        $('#modal-add-edit-DDNuocTC').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu thi công nước.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function updateGDNThiCongNuoc() {
        var giaydenghidmcungcapnuocId = $('#hidGiayDeNghiDMCungCapNuocId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var ngayduyet = tedu.getFormatDateYYMMDD($('#txtNgayDuyetThiCong').val());
            var tenhanvienduyet = $('#txtNhanVienDuyetTC').val();
            var ghichu = $('#txtGhiChuThiCong').val();

            $.ajax({
                type: "POST",
                url: "/Admin/ddnuoctc/UpGDNTCNuoc",
                data: {
                    GiayDeNghiDMCungCapNuocId: giaydenghidmcungcapnuocId,

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
                        tedu.notify("Lưu thi công nước.", "error");
                    }
                    else {
                        tedu.notify('Lưu thi công nước.', 'success');

                        loadTableGiayDeNghiDMCungCapNuoc(true);

                        addeditClearData();

                        $('#modal-add-edit-DDNuocTC').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu thi công nước.', 'error');
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

    function loadDDGDNThiCongNuocUpdate(giaydenghiDMCCDVNuocId) {
        $.ajax({
            type: "GET",
            url: "/Admin/DDNuocTC/GetGDNTCNuocId",
            data: {
                id: giaydenghiDMCCDVNuocId
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