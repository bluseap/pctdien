var addeditddnController = function () {    

    this.loadDDGDNThietKeNuoc = function (giaydenghiDMCCDVNuocId) {
        loadDDGDNThietKeNuoc(giaydenghiDMCCDVNuocId);
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

        $('#txtNgayLapBBKiemTra, #txtNgayGioYeuCauKHDenXN ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        $('#btnSaveDDNuocKSTK').on('click', function () {            
            var isgiaydenghi = $('#hidInsertGiayDeNghiDMCungCapNuocId').val(); // 1: insert; 2: update; 

            if (isgiaydenghi == 1) {
                saveGDNThietKeNuoc();
            } else if (isgiaydenghi == 2) {
                updateGDNThietKeNuoc();
            } 
            else {
                tedu.notify("Chưa lưu di dời khảo sát thiết kế nước.", "error");
            }  
        });

        $('#btnSaveKetThucDDNuocKSTK').on('click', function () {
            var isgiaydenghi = $('#hidInsertGiayDeNghiDMCungCapNuocId').val(); // 1: insert; 2: update; 
            var trangthaithietke = $('#hidTrangThaiThietKe').val();

            if (isgiaydenghi == 2) {
                if (trangthaithietke == "5") { // 5: cho thiet ke
                    saveKetThucGDNThietKeNuoc();
                }
                else {
                    tedu.notify('Đang thiết kế hoặc đang kiểm tra. Không được Kết thúc kiểm tra.', 'error');
                }
            } 
            else {
                tedu.notify("Chưa lưu Kết thúc di dời khảo sát thiết kế nước.", "error");
            }
        });          

    }

    function loadAddEditData() {
        
    }

    function addeditClearData() {
        var datenow = new Date(); 

        $('#hidGDNThietKeNuocId').val(0);
        $('#hidGiayDeNghiDMCungCapNuocId').val(0);
        $('#hidInsertGiayDeNghiDMCungCapNuocId').val(0); // 1: insert; 2: update;
        $('#hidInsertGDNThietKeNuocId').val(0); // 1: insert; 2: update;
        $('#hidTrangThaiThietKe').val(0);

        $('#txtHoTenKhachHang').val('');
        $('#txtDiaChiKhachHang').val('');
        $('#txtNgayLapBBKiemTra').val(tedu.getFormattedDate(datenow)); 
        $('#txtTenNhanVien1').val('');
        $('#txtChucVu1').val('');
        $('#txtTenNhanVien2').val('');
        $('#txtChucVu2').val('');
        $('#txtDaiDienKhachHang').val('');
        $('#txtDanhSoKhachHang').val('');
        $('#txtChiSoDongHo').val(0);
        $('#txtMucDichSuDung').val(''); 
        $('#txtTinhTrangDongHoNuoc').val(''); 
        $('#txtTinhTrangOngNhanhTruocDongHoNuoc').val(''); 
        $('#txtCacVanDeKetLuan').val(''); 
        $('#txtGioYeuCauKHDenXN').val('00:00'); 
        $('#txtNgayGioYeuCauKHDenXN').val(tedu.getFormattedDate(datenow)); 
        $('#txtNhanVienLapBBKiemTra').val(''); 
               
        //$('#ddlDMCungCapDichVu')[0].selectedIndex = 0;
        //$('#tbl-contentDMCungCapDichVu').html('');            
    }

    function loadTableGiayDeNghiDMCungCapNuoc(isPageChanged) {
        var template = $('#table-DiDoiNuocKSTK').html();
        var render = "";

        var makhuvuc = $('#ddlKhuVuc').val();
        var phongtoid = $('#ddlPhongTo').val();
        var timnoidung = $('#txtTimNoiDung').val();

        $.ajax({
            type: 'GET',
            url: '/admin/DDNuocKSTK/ListGDNNuocTTTK',
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
                            TTThietKe: tedu.getGiayDeNghiTT(item.TTThietKe)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            //Price: tedu.formatNumber(item.Price, 0),
                        });
                    });
                }

                $('#lbDiDoiNuocKSTKTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentDiDoiNuocKSTK').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingDiDoiNuocKSTK(response.Result.RowCount, function () {
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
    function wrapPagingDiDoiNuocKSTK(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULDiDoiNuocKSTK a').length === 0 || changePageSize === true) {
            $('#paginationULDiDoiNuocKSTK').empty();
            $('#paginationULDiDoiNuocKSTK').removeData("twbs-pagination");
            $('#paginationULDiDoiNuocKSTK').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULDiDoiNuocKSTK').twbsPagination({
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

    function loadDDGDNThietKeNuoc(giaydenghiDMCCDVNuocId) {
        $.ajax({
            type: "GET",
            url: "/Admin/DDNuocKSTK/GetGDNDMCCNuocId",
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
                $('#hidTrangThaiThietKe').val(gdndmccnuoc.TTThietKe);

                var ttthietke = gdndmccnuoc.TTThietKe;

                $('#modal-add-edit-DDNuocKSTK').modal('show');

                if (ttthietke == 4) { // cho kiem tra 
                    $('#hidInsertGiayDeNghiDMCungCapNuocId').val(1); // 1: insert; 2: update; 

                    $('#txtHoTenKhachHang').val(gdndmccnuoc.TenKhachHang);
                    $('#txtDiaChiKhachHang').val(gdndmccnuoc.DiaChiMuaNuoc);
                    $('#txtDanhSoKhachHang').val(gdndmccnuoc.DanhSoKhachHang);
                    $('#txtMucDichSuDung').val(gdndmccnuoc.MucDichSuDung);
                }
                // 3: cho duyet; 5: cho thiet ke; 2: Ok; 8: ket thuc kiem tra    
                else if (ttthietke == 3 || ttthietke == 5 || ttthietke == 2 || ttthietke == 8) { 
                    $('#hidInsertGiayDeNghiDMCungCapNuocId').val(2); // 1: insert; 2: update; 

                    loadDDGDNThietKeNuocUpdate(giaydenghiDMCCDVNuocId);                    
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
        if ($('#frmMainDDNuocKSTK').valid()) {
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
        $('#frmMainDDNuocKSTK').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                txtNgayLapBBKiemTra: {
                    required: true,
                    isDateVietNam: true
                },
                txtTenNhanVien1: {
                    required: true
                },
                txtChucVu1: {
                    required: true
                },
                txtTenNhanVien2: {
                    required: true
                },
                txtChucVu2: {
                    required: true
                },
                txtDaiDienKhachHang: {
                    required: true
                },
                txtChiSoDongHo: {
                    required: true
                },
                txtTinhTrangDongHoNuoc: {
                    required: true
                },
                txtTinhTrangOngNhanhTruocDongHoNuoc: {
                    required: true
                },
                txtCacVanDeKetLuan: {
                    required: true
                },
                txtGioYeuCauKHDenXN: {
                    required: true
                },
                txtNgayGioYeuCauKHDenXN: {
                    required: true,
                    isDateVietNam: true
                },
                //txtSoVanBanDen: { required: true },               
                //ddlCoQuanBanHanh: {
                //    required: true,
                //    isDanhMuc: true
                //},         
            },
            //messages: {
            //    txtTrichYeu: { required: "Nhập nội dung trích yếu của văn bản.." }
            //}
        });
    }

    function saveKetThucGDNThietKeNuoc() {
        
        var giaydenghidmcungcapnuocId = $('#hidGiayDeNghiDMCungCapNuocId').val();        

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var tenkhachhang = $('#txtHoTenKhachHang').val();
            var diachikhachhang = $('#txtDiaChiKhachHang').val();
            var ngaylapbbkiemtra = tedu.getFormatDateYYMMDD($('#txtNgayLapBBKiemTra').val());
            var tennhanvien1 = $('#txtTenNhanVien1').val();
            var chucvunhanvien1 = $('#txtChucVu1').val();
            var tennhanvien2 = $('#txtTenNhanVien2').val();
            var tenchucvu2 = $('#txtChucVu2').val();
            var daidienkhachhang = $('#txtDaiDienKhachHang').val();
            var danhsaokhachhang = $('#txtDanhSoKhachHang').val();
            var chisodongho = $('#txtChiSoDongHo').val();
            var mucdichsudung = $('#txtMucDichSuDung').val();
            var tinhtrangdongho = $('#txtTinhTrangDongHoNuoc').val();
            var tinhtrangongnhanh = $('#txtTinhTrangOngNhanhTruocDongHoNuoc').val();
            var cacvandeketluan = $('#txtCacVanDeKetLuan').val();
            var gioyeucaukhachhang = $('#txtGioYeuCauKHDenXN').val();
            var ngaygioyeucaukhachhang = tedu.getFormatDateYYMMDD($('#txtNgayGioYeuCauKHDenXN').val());
            var nhanvienlapbbkiemtra = $('#txtNhanVienLapBBKiemTra').val();            

            $.ajax({
                type: "POST",
                url: "/Admin/ddnuockstk/CreateKetThucDDNuoc",
                data: {
                    GiayDeNghiDMCungCapNuocId: giaydenghidmcungcapnuocId,

                    TenKhachHang: tenkhachhang,
                    DiaChiLapDat: diachikhachhang,
                    NgayLapKiemTra: ngaylapbbkiemtra,
                    TenNhanVien1: tennhanvien1,
                    ChucVu1: chucvunhanvien1,
                    TenNhanVien2: tennhanvien2,
                    ChucVu2: tenchucvu2,
                    TenDaiDienKH: daidienkhachhang,
                    DanhSoKhachHang: danhsaokhachhang,
                    ChiSoDongHo: chisodongho,
                    MucDichSuDung: mucdichsudung,
                    TinhTrangDongHo: tinhtrangdongho,
                    TinhTrangOngNhanhTruocDongHo: tinhtrangongnhanh,
                    CacVanDeKetLuan: cacvandeketluan,
                    GioYeuCauKHDenXN: gioyeucaukhachhang,
                    NgayGioYeuCauKHDenXN: ngaygioyeucaukhachhang,
                    TenNhanVienLapKiemTra: nhanvienlapbbkiemtra
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu thiết kế nước.", "error");
                    }
                    else {
                        tedu.notify('Lưu thiết kế nước.', 'success');

                        loadTableGiayDeNghiDMCungCapNuoc(true);

                        addeditClearData();

                        $('#modal-add-edit-DDNuocKSTK').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu thiết kế nước.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function saveGDNThietKeNuoc() {
        var giaydenghidmcungcapnuocId = $('#hidGiayDeNghiDMCungCapNuocId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var tenkhachhang = $('#txtHoTenKhachHang').val();
            var diachikhachhang = $('#txtDiaChiKhachHang').val();
            var ngaylapbbkiemtra = tedu.getFormatDateYYMMDD($('#txtNgayLapBBKiemTra').val());
            var tennhanvien1 = $('#txtTenNhanVien1').val();
            var chucvunhanvien1 = $('#txtChucVu1').val();
            var tennhanvien2 = $('#txtTenNhanVien2').val();
            var tenchucvu2 = $('#txtChucVu2').val();
            var daidienkhachhang = $('#txtDaiDienKhachHang').val();
            var danhsaokhachhang = $('#txtDanhSoKhachHang').val();
            var chisodongho = $('#txtChiSoDongHo').val();
            var mucdichsudung = $('#txtMucDichSuDung').val();
            var tinhtrangdongho = $('#txtTinhTrangDongHoNuoc').val();
            var tinhtrangongnhanh = $('#txtTinhTrangOngNhanhTruocDongHoNuoc').val();
            var cacvandeketluan = $('#txtCacVanDeKetLuan').val();
            var gioyeucaukhachhang = $('#txtGioYeuCauKHDenXN').val();
            var ngaygioyeucaukhachhang = tedu.getFormatDateYYMMDD($('#txtNgayGioYeuCauKHDenXN').val());
            var nhanvienlapbbkiemtra = $('#txtNhanVienLapBBKiemTra').val();

            $.ajax({
                type: "POST",
                url: "/Admin/ddnuockstk/CreateGDNTKNuoc",
                data: {
                    GiayDeNghiDMCungCapNuocId: giaydenghidmcungcapnuocId,

                    TenKhachHang: tenkhachhang,
                    DiaChiLapDat: diachikhachhang,
                    NgayLapKiemTra: ngaylapbbkiemtra,
                    TenNhanVien1: tennhanvien1,
                    ChucVu1: chucvunhanvien1,
                    TenNhanVien2: tennhanvien2,
                    ChucVu2: tenchucvu2,
                    TenDaiDienKH: daidienkhachhang,
                    DanhSoKhachHang: danhsaokhachhang,
                    ChiSoDongHo: chisodongho,
                    MucDichSuDung: mucdichsudung,
                    TinhTrangDongHo: tinhtrangdongho,
                    TinhTrangOngNhanhTruocDongHo: tinhtrangongnhanh,
                    CacVanDeKetLuan: cacvandeketluan,
                    GioYeuCauKHDenXN: gioyeucaukhachhang,
                    NgayGioYeuCauKHDenXN: ngaygioyeucaukhachhang,
                    TenNhanVienLapKiemTra: nhanvienlapbbkiemtra
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu thiết kế nước.", "error");
                    }
                    else {
                        tedu.notify('Lưu thiết kế nước.', 'success');

                        loadTableGiayDeNghiDMCungCapNuoc(true);

                        addeditClearData();

                        $('#modal-add-edit-DDNuocKSTK').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu thiết kế nước.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function updateGDNThietKeNuoc() {
        var trangthaithietke = $('#hidTrangThaiThietKe').val();

        if (trangthaithietke == 5) { // 5: cho thiet ke
            //tedu.notify('update thiet ke nuoc', 'success');
            var giaydenghidmcungcapnuocId = $('#hidGiayDeNghiDMCungCapNuocId').val();

            var isMainValidate = isFormMainValidate();
            if (isMainValidate === true) {
                var tenkhachhang = $('#txtHoTenKhachHang').val();
                var diachikhachhang = $('#txtDiaChiKhachHang').val();
                var ngaylapbbkiemtra = tedu.getFormatDateYYMMDD($('#txtNgayLapBBKiemTra').val());
                var tennhanvien1 = $('#txtTenNhanVien1').val();
                var chucvunhanvien1 = $('#txtChucVu1').val();
                var tennhanvien2 = $('#txtTenNhanVien2').val();
                var tenchucvu2 = $('#txtChucVu2').val();
                var daidienkhachhang = $('#txtDaiDienKhachHang').val();
                var danhsaokhachhang = $('#txtDanhSoKhachHang').val();
                var chisodongho = $('#txtChiSoDongHo').val();
                var mucdichsudung = $('#txtMucDichSuDung').val();
                var tinhtrangdongho = $('#txtTinhTrangDongHoNuoc').val();
                var tinhtrangongnhanh = $('#txtTinhTrangOngNhanhTruocDongHoNuoc').val();
                var cacvandeketluan = $('#txtCacVanDeKetLuan').val();
                var gioyeucaukhachhang = $('#txtGioYeuCauKHDenXN').val();
                var ngaygioyeucaukhachhang = tedu.getFormatDateYYMMDD($('#txtNgayGioYeuCauKHDenXN').val());
                var nhanvienlapbbkiemtra = $('#txtNhanVienLapBBKiemTra').val();

                $.ajax({
                    type: "POST",
                    url: "/Admin/ddnuockstk/UpGDNTKNuoc",
                    data: {
                        GiayDeNghiDMCungCapNuocId: giaydenghidmcungcapnuocId,

                        TenKhachHang: tenkhachhang,
                        DiaChiLapDat: diachikhachhang,
                        NgayLapKiemTra: ngaylapbbkiemtra,
                        TenNhanVien1: tennhanvien1,
                        ChucVu1: chucvunhanvien1,
                        TenNhanVien2: tennhanvien2,
                        ChucVu2: tenchucvu2,
                        TenDaiDienKH: daidienkhachhang,
                        DanhSoKhachHang: danhsaokhachhang,
                        ChiSoDongHo: chisodongho,
                        MucDichSuDung: mucdichsudung,
                        TinhTrangDongHo: tinhtrangdongho,
                        TinhTrangOngNhanhTruocDongHo: tinhtrangongnhanh,
                        CacVanDeKetLuan: cacvandeketluan,
                        GioYeuCauKHDenXN: gioyeucaukhachhang,
                        NgayGioYeuCauKHDenXN: ngaygioyeucaukhachhang,
                        TenNhanVienLapKiemTra: nhanvienlapbbkiemtra
                    },
                    dataType: "json",
                    beforeSend: function () {
                        tedu.startLoading();
                    },
                    success: function (response) {
                        if (response.Result === false) {
                            tedu.notify("Đã duyệt thiết kế.", "error");
                        }
                        else {
                            tedu.notify('Lưu thiết kế nước.', 'success');

                            loadTableGiayDeNghiDMCungCapNuoc(true);

                            addeditClearData();

                            $('#modal-add-edit-DDNuocKSTK').modal('hide');
                            tedu.stopLoading();
                        }
                    },
                    error: function () {
                        tedu.notify('Có lỗi! Không thể Lưu thiết kế nước.', 'error');
                        tedu.stopLoading();
                    }
                });
            }
        }
        else {
            tedu.notify('Đã thiết kế. Không được sửa kiểm tra thiết kế.', 'error');
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
        $('#txtTenNhanVien1').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {                
                $('#txtChucVu1').val(suggestion.TenChucVu);
            }
        });
        $('#txtTenNhanVien2').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {                
                $('#txtChucVu2').val(suggestion.TenChucVu);
            }
        });
        $('#txtNhanVienLapBBKiemTra').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {                
                //$('#txtChucVuNguoiKy').val(suggestion.TenChucVu);
            }
        });
        $('#txtNhanVienNhapThietKeKSTK').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {                
                //$('#txtChucVuNguoiKy').val(suggestion.TenChucVu);
            }
        });
        $('#txtNhanVienDuyetTK').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {
                //$('#txtChucVuNguoiKy').val(suggestion.TenChucVu);
            }
        });
    }

    function loadDDGDNThietKeNuocUpdate(giaydenghiDMCCDVNuocId) {
        $.ajax({
            type: "GET",
            url: "/Admin/DDNuocKSTK/GetGDNTKNuocId",
            data: {
                id: giaydenghiDMCCDVNuocId
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var gdndmccnuoc = response.Result;

                $('#txtHoTenKhachHang').val(gdndmccnuoc.TenKhachHang);
                $('#txtDiaChiKhachHang').val(gdndmccnuoc.DiaChiMuaNuoc);
                //$('#txtDanhSoKhachHang').val(gdndmccnuoc.DanhSoKhachHang);
                $('#txtMucDichSuDung').val(gdndmccnuoc.MucDichSuDung);

                $('#txtNgayLapBBKiemTra').val(tedu.getFormattedDate(gdndmccnuoc.NgayLapKiemTra));
                $('#txtTenNhanVien1').val(gdndmccnuoc.TenNhanVien1);
                $('#txtChucVu1').val(gdndmccnuoc.ChucVu1);
                $('#txtTenNhanVien2').val(gdndmccnuoc.TenNhanVien2);
                $('#txtChucVu2').val(gdndmccnuoc.ChucVu2);
                $('#txtDaiDienKhachHang').val(gdndmccnuoc.TenDaiDienKH);
                $('#txtDanhSoKhachHang').val(gdndmccnuoc.DanhSoKhachHang);
                $('#txtChiSoDongHo').val(gdndmccnuoc.ChiSoDongHo);
                $('#txtMucDichSuDung').val(gdndmccnuoc.MucDichSuDung);
                $('#txtTinhTrangDongHoNuoc').val(gdndmccnuoc.TinhTrangDongHo);
                $('#txtTinhTrangOngNhanhTruocDongHoNuoc').val(gdndmccnuoc.TinhTrangOngNhanhTruocDongHo);
                $('#txtCacVanDeKetLuan').val(gdndmccnuoc.CacVanDeKetLuan);
                $('#txtGioYeuCauKHDenXN').val(gdndmccnuoc.GioYeuCauKHDenXN);
                $('#txtNgayGioYeuCauKHDenXN').val(tedu.getFormattedDate(gdndmccnuoc.NgayGioYeuCauKHDenXN));
                $('#txtNhanVienLapBBKiemTra').val(gdndmccnuoc.TenNhanVienLapKiemTra);

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

}