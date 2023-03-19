
var nhapthietkeController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val(); 

    this.loadEditNhapThietKe = function () {
        loadEditNhapThietKe();
    }

    this.loadTenNhanVien = function (corporationid) {
        loadTenNhanVien(corporationid);
    }

    this.DuongPhoLX = function (corporationid) {
        DuongPhoLX(corporationid);
    }

    this.PhuongXa = function (corporationid) {
        PhuongXa(corporationid);
    }

    this.addeditClearData = function () {
        addeditClearData();
    }

    this.loadTableNhapThietKeNuoc = function () {
        loadTableNhapThietKeNuoc(true);
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

        $('#txtNhapTKNgayThietKeKH ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        $('#ddlNhapTKKhuVuc').on('change', function () {
            var khuvuc = $('#ddlNhapTKKhuVuc').val();
            loadPhongKhuVucNhapThietKe(khuvuc);            
        });

        $('#btnNhapTKTimKhachHang').on('click', function () {
            loadTableChuanbiThietKe();
        });

        $('body').on('click', '.btn-EditNhapThietKeChuanBi', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            const myArray = maddk.split("-");
            $('#hidDonDangKyMaddk').val(myArray[0]);     

            $('#txtNhapTKMaDonDangKyKH').val(myArray[0]);        
            $('#txtNhapTKTenKhachHangKH').val(myArray[1]);        
        });

        $('#btnSaveNhapThietKe').on('click', function () {
            var isdondangky = $('#hidInsertDonDangKyMaddk').val(); // 1: insert; 2: update; 

            if (isdondangky == "1") {
                saveNhapThietKe();
            } else if (isdondangky == "2") {
                updateNhapThietKe();
            }
        });

    }

    function addeditClearData() {
        var datenow = new Date();  

        $("#txtNhapTKMaDonDangKyKH").val('');        
        $("#txtNhapTKTenKhachHangKH").val('');
        $("#txtNhapTKTenThietKeKH").val('');
        $("#txtNhapTKDanhSoKH").val('');
        $("#txtNhapTKTenNhanVienKH").val('');
        $("#txtNhapTKNgayThietKeKH").val(tedu.getFormattedDate(datenow));        
        var ckthamgiaongcai = document.getElementById('ckThamGiaOngCai');
        ckthamgiaongcai.checked = false;

        $("#ddlNhapTKMADPLXKH")[0].selectedIndex = 0;
        $("#txtNhapTKDiaChiLXKH").val('');
        $("#txtNhapTKDuongHemLXKH").val('');

        $("#ddlPhuongXaTKLXKH")[0].selectedIndex = 0;
        $("#txtSoDienThoaiLXKH").val('');
        $("#txtViTriTKLXKH").val('');

        $("#txtDanhSoTKLXKH").val('');
        var ckkhachhangthanhtoan = document.getElementById('ckIsKHTT100');
        ckkhachhangthanhtoan.checked = false;

        $("#txtNhapTKChuThichKH").val('');        
    }

    function loadDataAddEdit() {

    }

    function DuongPhoLX(makhuvuc) {
        $.ajax({
            type: 'GET',
            url: '/admin/podknuoctk/DuongPhoLx',
            data: { corporationId: makhuvuc },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='%' >-- Lựa chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.MADP + "'>" + item.MADP + '-' + item.TENDP + "</option>";
                });
                $('#ddlNhapTKMADPLXKH').html(render);
                $("#ddlNhapTKMADPLXKH")[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    }  

    function PhuongXa(makhuvuc) {
        $.ajax({
            type: 'GET',
            url: '/admin/podknuoctk/PhuongXa',
            data: { corporationId: makhuvuc },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='%' >-- Lựa chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenPhuongXa + "</option>";
                });
                $('#ddlPhuongXaTKLXKH').html(render);
                $("#ddlPhuongXaTKLXKH")[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
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
                $('#ddlNhapTKPhongTo').html(render);
                $("#ddlNhapTKPhongTo")[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    }

    function loadTableNhapThietKeNuoc(isPageChanged) {
        var template = $('#table-DONDANGKY').html();
        var render = "";

        var khuvuc = $('#ddlKhuVuc').val();
        var phongto = $('#ddlPhongTo').val();
        var timnoidung = $('#txtTimNoiDung').val();

        var dsdieukientim = $('#ddlDsDieuKienTim').val();    
        $.ajax({
            type: 'GET',
            url: '/admin/PoDKNuocTK/ListTK',
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
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
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

    function loadTableChuanbiThietKe() {
        var template = $('#template-table-NhapTKKhachHang').html();
        var render = "";

        var khuvuc = $('#ddlNhapTKKhuVuc').val();
        var phongto = $('#ddlNhapTKPhongTo').val();
        var timnoidung = $('#txtNhapTKTenKhachHang').val();

        $.ajax({
            type: 'GET',
            url: '/admin/PoDKNuocTK/ListChuanBiTK',
            data: {
                KhuVuc: khuvuc,
                PhongTo: phongto,
                keyword: timnoidung,
                page: 1,
                pageSize: 50
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
                            //DIACHILD: item.DIACHILD,
                            //CMND: item.CMND,
                            //DIENTHOAI: item.DIENTHOAI,

                            //TTDonDangKyNuoc: nguyen.getTTDonDangKyNuoc(item.TTDonDangKyNuoc)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }               

                if (render !== '') {
                    $('#table-contentNhapTKKhachHang').html(render);
                }
                
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function loadTenNhanVien(makhuvuc) {
        $.ajax({
            type: 'GET',
            url: "/admin/podknuoctk/TimNhanVien",
            data: {
                corporationid: makhuvuc,
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
        $('#txtNhapTKTenNhanVienKH').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {
                //tedu.notify(suggestion.value, 'error');
                $('#hidNhanVienMANV').val(suggestion.Id);
            }
        });
    }

    function loadEditNhapThietKe() {
        var madondangky = $("#hidDonDangKyMaddk").val();

        $.ajax({
            type: "GET",
            url: "/Admin/podknuoctk/GetTKNuocId",
            data: {
                DangKyNuocId: madondangky
            },
            dataType: "json",

            success: function (response) {
                var thietke = response;

                addeditClearData();

                $("#txtNhapTKMaDonDangKyKH").val(thietke.MADDK);
                $("#txtNhapTKTenKhachHangKH").val(thietke.TENKH);
                $("#txtNhapTKTenThietKeKH").val(thietke.TENTK);
                $("#txtNhapTKDanhSoKH").val(thietke.SODB);
                $("#txtNhapTKTenNhanVienKH").val(thietke.TENNVTK);

                $("#hidNhanVienMANV").val(thietke.MANVTK);

                $("#txtNhapTKNgayThietKeKH").val(thietke.NGAYLTK !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(thietke.NGAYLTK) : '');
                var ckthamgiaongcai = document.getElementById('ckThamGiaOngCai');
                ckthamgiaongcai.checked = thietke.THAMGIAONGCAI !== null ? thietke.THAMGIAONGCAI : false;

                $("#ddlNhapTKMADPLXKH").val(thietke.MADPLX !== null ? thietke.MADPLX : '');
                $("#txtNhapTKDiaChiLXKH").val(thietke.DIACHITK);
                $("#txtNhapTKDuongHemLXKH").val(thietke.DUONGHEMTK);

                $("#ddlPhuongXaTKLXKH").val(thietke.PHUONGTK !== null ? thietke.PHUONGTK : '');
                $("#txtSoDienThoaiLXKH").val(thietke.SDTTK);
                $("#txtViTriTKLXKH").val(thietke.VITRIDHTK);

                $("#txtDanhSoTKLXKH").val(thietke.DANHSOTK);
                var ckkhachhangthanhtoan = document.getElementById('ckIsKHTT100');
                ckkhachhangthanhtoan.checked = thietke.ISKHTT100 !== null ? thietke.ISKHTT100 : false;

                $("#txtNhapTKChuThichKH").val(thietke.CHUTHICH);  

                $('#modal-add-edit-NhapThietKe').modal('show');

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function saveNhapThietKe() {
        var madondangky = $('#hidDonDangKyMaddk').val();

        var corporationid = $('#ddlKhuVuc').val();        

        var tenkhachhangtk = $("#txtNhapTKTenKhachHangKH").val(); 

        var tenthietke = $("#txtNhapTKTenThietKeKH").val();
        var danhsokh = $("#txtNhapTKDanhSoKH").val();
        var tennhanvientk = $("#txtNhapTKTenNhanVienKH").val();
        var manvtk = $("#hidNhanVienMANV").val();

        var ngaythietke = tedu.getFormatDateYYMMDD($('#txtNhapTKNgayThietKeKH').val());        
       
        var ckthamgiaongcai = document.getElementById('ckThamGiaOngCai');
        var thamgiaongcai = ckthamgiaongcai.checked = false;

        var madplx = $("#ddlNhapTKMADPLXKH").val();
        var diachilx = $("#txtNhapTKDiaChiLXKH").val();
        var motavitrilx = $("#txtNhapTKDuongHemLXKH").val();

        var phuongxalx = $("#ddlPhuongXaTKLXKH").val();
        var sodienthoailx = $("#txtSoDienThoaiLXKH").val();
        var vitridongholx = $("#txtViTriTKLXKH").val();

        var danhsothietkelx = $("#txtDanhSoTKLXKH").val();
        var ckkhachhangthanhtoan = document.getElementById('ckIsKHTT100');
        var khthanhtoan100 = ckkhachhangthanhtoan.checked;

        var chuthichkh = $("#txtNhapTKChuThichKH").val(); 
        
        $.ajax({
            type: "POST",
            url: "/Admin/podknuoctk/SaveTK",
            data: {
                MADDK: madondangky,

                CorporationId: corporationid,

                TENTK: tenthietke,
                SODB: danhsokh,
                TENNVTK: tennhanvientk,
                MANVTK: manvtk,

                NGAYLTK: ngaythietke,
                THAMGIAONGCAI: thamgiaongcai,
                MADPLX: madplx,

                DIACHITK: diachilx,
                DUONGHEMTK: motavitrilx,
                PHUONGTK: phuongxalx,
                SDTTK: sodienthoailx,
                VITRIDHTK: vitridongholx,
                DANHSOTK: danhsothietkelx,
                ISKHTT100: khthanhtoan100,

                CHUTHICH: chuthichkh
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Lưu nhập thiết kế.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Lưu nhập thiết kế. Mã đơn, tên: " + madondangky + '-' + tenkhachhangtk);

                    tedu.notify('Lưu nhập thiết kế.', 'success');

                    loadTableNhapThietKeNuoc(true);

                    $('#modal-add-edit-NhapThietKe').modal('hide');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu nhập thiết kế.', 'error');
                tedu.stopLoading();
            }
        });

    }

    function updateNhapThietKe() {
        var madondangky = $('#hidDonDangKyMaddk').val();

        var corporationid = $('#ddlKhuVuc').val();

        var tenkhachhangtk = $("#txtNhapTKTenKhachHangKH").val(); 

        var tenthietke = $("#txtNhapTKTenThietKeKH").val();
        var danhsokh = $("#txtNhapTKDanhSoKH").val();
        var tennhanvientk = $("#txtNhapTKTenNhanVienKH").val();
        var manvtk = $("#hidNhanVienMANV").val();
        var ngaythietke = tedu.getFormatDateYYMMDD($('#txtNhapTKNgayThietKeKH').val());

        var ckthamgiaongcai = document.getElementById('ckThamGiaOngCai');
        var thamgiaongcai = ckthamgiaongcai.checked = false;

        var madplx = $("#ddlNhapTKMADPLXKH").val();
        var diachilx = $("#txtNhapTKDiaChiLXKH").val();
        var motavitrilx = $("#txtNhapTKDuongHemLXKH").val();

        var phuongxalx = $("#ddlPhuongXaTKLXKH").val();
        var sodienthoailx = $("#txtSoDienThoaiLXKH").val();
        var vitridongholx = $("#txtViTriTKLXKH").val();

        var danhsothietkelx = $("#txtDanhSoTKLXKH").val();
        var ckkhachhangthanhtoan = document.getElementById('ckIsKHTT100');
        var khthanhtoan100 = ckkhachhangthanhtoan.checked;

        var chuthichkh = $("#txtNhapTKChuThichKH").val();

        $.ajax({
            type: "POST",
            url: "/Admin/podknuoctk/UpdateTK",
            data: {
                MADDK: madondangky,

                CorporationId: corporationid,

                TENTK: tenthietke,
                SODB: danhsokh,
                TENNVTK: tennhanvientk,
                MANVTK: manvtk,
                NGAYLTK: ngaythietke,
                THAMGIAONGCAI: thamgiaongcai,
                MADPLX: madplx,

                DIACHITK: diachilx,
                DUONGHEMTK: motavitrilx,
                PHUONGTK: phuongxalx,
                SDTTK: sodienthoailx,
                VITRIDHTK: vitridongholx,
                DANHSOTK: danhsothietkelx,
                ISKHTT100: khthanhtoan100,

                CHUTHICH: chuthichkh
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Lưu sửa thiết kế.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Lưu sửa thiết kế. Mã đơn, tên: " + madondangky + '-' + tenkhachhangtk);

                    tedu.notify('Lưu sửa thiết kế.', 'success');

                    loadTableNhapThietKeNuoc(true);

                    $('#modal-add-edit-NhapThietKe').modal('hide');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu sửa thiết kế.', 'error');
                tedu.stopLoading();
            }
        });
    }

}