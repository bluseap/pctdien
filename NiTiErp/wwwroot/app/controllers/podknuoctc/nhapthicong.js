
var nhapthicongController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    this.loadTenNhanVien = function (corporationid) {
        loadTenNhanVien(corporationid);
    }

    this.loadEditNhapThiCong = function () {
        loadEditNhapThiCong();
    }

    this.addeditClearData = function () {
        addeditClearData();
    }

    this.loadTableNhapThiCongNuoc = function () {
        loadTableNhapThiCongNuoc(true);
    }

    this.loadPhongKhuVucNhapThietKe = function () {
        loadPhongKhuVucNhapThietKe();
    }

    this.initialize = function () {
        registerEvents();
        addeditClearData();
        loadDataAddEdit();
    }

    function registerEvents() {

        $('#txtNhapTCNgayGiao ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        $('#ddlNhapTCKhuVuc').on('change', function () {
            var khuvuc = $('#ddlNhapTCKhuVuc').val();
            loadPhongKhuVucNhapThietKe(khuvuc);
        });

        $('#btnNhapTCTimKhachHang').on('click', function () {
            loadTableChuanbiThiCong();
        });

        $('body').on('click', '.btn-EditNhapThiCongChuanBi', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            const myArray = maddk.split("-");
            $('#hidDonDangKyMaddk').val(myArray[0]);

            $('#txtNhapTCMaDonDangKyKH').val(myArray[0]);
            $('#txtNhapTCTenKhachHangKH').val(myArray[1]);
            $('#txtNhapTCDiaChiLD').val(myArray[2]);
        });

        $('#btnSaveNhapThiCong').on('click', function () {
            var isdondangky = $('#hidInsertDonDangKyMaddk').val(); // 1: insert; 2: update; 

            if (isdondangky == "1") {
                saveThiCong();
            } else if (isdondangky == "2") {
                updateThiCong();
            }
        });

    }

    function addeditClearData() {
        var datenow = new Date();

        $("#txtNhapTCMaDonDangKyKH").val('');
        $("#txtNhapTCTenKhachHangKH").val('');
        $("#txtNhapTCDiaChiLD").val('');

        $("#txtNhapTCTenNhanVienPhucTrach1").val('');
        $("#txtNhapTCTenNhanVienPhucTrach2").val('');
        $("#txtNhapTCNgayGiao").val(tedu.getFormattedDate(datenow));        
    }

    function loadDataAddEdit() {
        
    }

    function isFormMainValidate() {
        if ($('#frmMainNhapThiCong').valid()) {
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
        $('#frmMainNhapThiCong').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {     
                txtNhapTCTenNhanVienPhucTrach1: {
                    required: true
                }, 
                txtNhapTCTenNhanVienPhucTrach2: {
                    required: true
                }, 
                txtNhapTCNgayGiao: {
                    required: true,
                    isDateVietNam: true
                },                
            },
            //messages: {
            //    txtTrichYeu: { required: "Nhập nội dung trích yếu của văn bản.." }
            //}
        });
    }

    function loadPhongKhuVucNhapThietKe(makhuvuc) {
        $.ajax({
            type: 'GET',
            url: '/admin/hoso/GetListPhongKhuVuc',
            data: { makv: makhuvuc },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='%' >-- Lựa chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenPhong + "</option>";
                });
                $('#ddlNhapTCPhongTo').html(render);
                $("#ddlNhapTCPhongTo")[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    }

    function loadTenNhanVien(makhuvuc) {
        $.ajax({
            type: 'GET',
            url: "/admin/podknuoctk/TimNhanVien",
            data: {
                corporationId: makhuvuc,
            },
            async: true,
            dataType: 'json',
            success: function (database) {
                arrayReturn = [];
                var data = database.Result;
                for (var i = 0, len = data.length; i < len; i++) {
                    arrayReturn.push({ 'value': data[i].HOTEN, 'Id': data[i].MANV });
                }
                //send parse data to autocomplete function
                loadSuggestions(arrayReturn);
                //console.log(countries);               
            }
        });
    }

    function loadSuggestions(options) {
        $('#txtNhapTCTenNhanVienPhucTrach1').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {                
                $('#hidNVPhuTrachTC1Id').val(suggestion.Id);
            }
        });
        $('#txtNhapTCTenNhanVienPhucTrach2').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {                
                $('#hidNVPhuTrachTC2Id').val(suggestion.Id);
            }
        });
    }

    function loadTableNhapThiCongNuoc(isPageChanged) {
        var template = $('#table-DONDANGKY').html();
        var render = "";

        var khuvuc = $('#ddlKhuVuc').val();
        var phongto = $('#ddlPhongTo').val();
        var timnoidung = $('#txtTimNoiDung').val();

        var dsdieukientim = $('#ddlDsDieuKienTim').val();
        $.ajax({
            type: 'GET',
            url: '/admin/PoDKNuocTC/ListTC',
            data: {
                KhuVuc: khuvuc,
                PhongTo: phongto,
                keyword: timnoidung,
                page: tedu.configs.pageIndex,
                pageSize: tedu.configs.pageSize,

                DanhSachDieuKienTimDK: dsdieukientim
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.Results.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result.Results, function (i, item) {
                        render += Mustache.render(template, {
                            MADDK: item.MADDK,

                            TENKH: item.TENKH,
                            TENKV: item.TENKV,
                            DIACHILD: item.DIACHILD,
                            CMND: item.CMND,
                            DIENTHOAI: item.DIENTHOAI,

                            TTDonDangKyNuoc: nguyen.getTTDonDangKyNuoc(item.TTDonDangKyNuoc)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                $('#lbDONDANGKYTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentDONDANGKY').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingDonDangKyNuoc(response.Result.RowCount, function () {
                        loadTableDonDangKyNuoc();
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
    function wrapPagingDonDangKyNuoc(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULDONDANGKY a').length === 0 || changePageSize === true) {
            $('#paginationULDONDANGKY').empty();
            $('#paginationULDONDANGKY').removeData("twbs-pagination");
            $('#paginationULDONDANGKY').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULDONDANGKY').twbsPagination({
            totalPages: totalsize,
            visiblePages: 7,
            first: 'Đầu',
            prev: 'Trước',
            next: 'Tiếp',
            last: 'Cuối',
            onPageClick: function (event, p) {
                if (tedu.configs.pageIndex !== p) {
                    tedu.configs.pageIndex = p;
                    setTimeout(callBack(), 200);
                }
            }
        });
    }

    function loadTableChuanbiThiCong() {
        var template = $('#template-table-NhapTCKhachHang').html();
        var render = "";

        var khuvuc = $('#ddlNhapTCKhuVuc').val();
        var phongto = $('#ddlNhapTCPhongTo').val();
        var timnoidung = $('#txtNhapTCTenKhachHang').val();

        $.ajax({
            type: 'GET',
            url: '/admin/PoDKNuocTC/ListChuanBiTC',
            data: {
                KhuVuc: khuvuc,
                PhongTo: phongto,
                keyword: timnoidung,
                page: 1,
                pageSize: 20
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.Results.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result.Results, function (i, item) {
                        render += Mustache.render(template, {
                            MADDK: item.MADDK,

                            TENKH: item.TENKH,
                            TENKV: item.TENKV,
                            DIACHILD: item.DIACHILD

                        });
                    });
                }

                if (render !== '') {
                    $('#table-contentNhapTCKhachHang').html(render);
                }

            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function loadEditNhapThiCong() {
        var madondangky = $("#hidDonDangKyMaddk").val();

        $.ajax({
            type: "GET",
            url: "/Admin/PoDkNuocTC/GetTCNuocId",
            data: {
                DangKyNuocId: madondangky
            },
            dataType: "json",

            success: function (response) {
                var thicong = response;

                addeditClearData();

                $("#txtNhapTCMaDonDangKyKH").val(thicong.MADDK);
                $("#txtNhapTCTenKhachHangKH").val(thicong.TENKH);
                $("#txtNhapTCDiaChiLD").val(thicong.SONHA);

                $("#txtNhapTCTenNhanVienPhucTrach1").val(thicong.TenNhanVienPhuTrach1);
                $("#txtNhapTCTenNhanVienPhucTrach2").val(thicong.TenNhanVienPhuTrach1);
                $("#hidNhanVienPhuTrachMANV1").val(thicong.MANV);
                $("#hidNhanVienPhuTrachMANV2").val(thicong.MANV2);

                $("#txtNhapTCNgayGiao").val(thicong.NGAYGTC !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(thicong.NGAYGTC) : '');                    

                $('#modal-add-edit-NhapThiCong').modal('show');

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function saveThiCong() {
        var madondangky = $('#hidDonDangKyMaddk').val();
        var corporationid = $('#ddlKhuVuc').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var manhanvienphutrach1 = $("#hidNVPhuTrachTC1Id").val();
            var manhanvienphutrach2 = $("#hidNVPhuTrachTC2Id").val();
            var ngaygiao = tedu.getFormatDateYYMMDD($('#txtNhapTCNgayGiao').val());       

            var tennhanvienphtrach1 = $("#txtNhapTCTenNhanVienPhucTrach1").val();
            var tennhanvienphtrach2 = $("#txtNhapTCTenNhanVienPhucTrach2").val();
            var manhanvienphtrach1 = $("#hidNhanVienPhuTrachMANV1").val();
            var manhanvienphtrach2 = $("#hidNhanVienPhuTrachMANV2").val();

            $.ajax({
                type: "POST",
                url: "/Admin/PoDkNuocTC/SaveTC",
                data: {
                    MADDK: madondangky,
                    CorporationId: corporationid,

                    MANV: manhanvienphutrach1,
                    MANV2: manhanvienphutrach2,
                    NGAYGTC: ngaygiao,

                    TenNhanVienPhuTrach1: tennhanvienphtrach1,
                    TenNhanVienPhuTrach2: tennhanvienphtrach2,
                    MaNhanVienPhuTrach1: manhanvienphtrach1,
                    MaNhanVienPhuTrach2: manhanvienphtrach2
                },
                dataType: "json",
                beforeSend: function () {                    
                    $('#modal-add-edit-NhapThiCong').modal('hide');
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Nhập thi công.", "error");
                    }
                    else {
                        tedu.notify('Lưu Nhập thi công.', 'success');

                        nguyen.appUserLoginLogger(userName, 'Nhập thi công nước mới');

                        loadTableNhapThiCongNuoc(true);

                        addeditClearData();                        
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể lưu Nhập thi công nước.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function updateThiCong() {
        var madondangky = $('#hidDonDangKyMaddk').val();
        var corporationid = $('#ddlKhuVuc').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var manhanvienphutrach1 = ("#hidNVPhuTrachTC1Id").val();
            var manhanvienphutrach2 = ("#hidNVPhuTrachTC2Id").val();
            var ngaygiao = tedu.getFormatDateYYMMDD($('#txtNhapTCNgayGiao').val());

            var tennhanvienphtrach1 = $("#txtNhapTCTenNhanVienPhucTrach1").val();
            var tennhanvienphtrach2 = $("#txtNhapTCTenNhanVienPhucTrach2").val();
            var manhanvienphtrach1 = $("#hidNhanVienPhuTrachMANV1").val();
            var manhanvienphtrach2 = $("#hidNhanVienPhuTrachMANV2").val();

            $.ajax({
                type: "POST",
                url: "/Admin/PoDkNuocTC/UpdateTC",
                data: {
                    MADDK: madondangky,
                    CorporationId: corporationid,

                    MANV: manhanvienphutrach1,
                    MANV2: manhanvienphutrach2,
                    NGAYGTC: ngaygiao,

                    TenNhanVienPhuTrach1: tennhanvienphtrach1,
                    TenNhanVienPhuTrach2: tennhanvienphtrach2,
                    MaNhanVienPhuTrach1: manhanvienphtrach1,
                    MaNhanVienPhuTrach2: manhanvienphtrach2
                },
                dataType: "json",
                beforeSend: function () {                    
                    $('#modal-add-edit-NhapThiCong').modal('hide');
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Sửa Nhập thi công.", "error");
                    }
                    else {
                        tedu.notify('Lưu Sửa thi công.', 'success');

                        nguyen.appUserLoginLogger(userName, 'Sửa thi công nước mới');

                        loadTableNhapThiCongNuoc(true);

                        addeditClearData();                        
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể lưu Sửa thi công nước.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }


}