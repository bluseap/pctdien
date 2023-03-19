
var nhaphopdongController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();
    
    this.loadEditNhapHopDong = function () {
        loadEditNhapHopDong();
    }

    this.loadTableNhapHopDongNuoc = function () {
        loadTableNhapHopDongNuoc(true);
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

        $('#txtNhapHDNgayNhapHopDong, #txtNhapHDNgayHieuLuc, #txtNhapHDNgayHetHanHopDong ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        $('#ddlNhapHDKhuVuc').on('change', function () {
            var khuvuc = $('#ddlNhapHDKhuVuc').val();
            loadPhongKhuVucNhapThietKe(khuvuc);
        });

        $('#btnNhapHDTimKhachHang').on('click', function () {
            loadTableChuanbiHopDong();
        });

        $('body').on('click', '.btn-EditNhapHopDongChuanBi', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            const myArray = maddk.split("-");
            $('#hidDonDangKyMaddk').val(myArray[0]);

            $('#txtNhapHDMaDonDangKyKH').val(myArray[0]);
            $('#txtNhapHDTenKhachHangKH').val(myArray[1]);
            $('#txtNhapHDDiaChiLD').val(myArray[2]);
        });

        $('#btnSaveNhapHopDong').on('click', function () {
            var isdondangky = $('#hidInsertDonDangKyMaddk').val(); // 1: insert; 2: update; 

            if (isdondangky == "1") {
                saveHopDong();
            } else if (isdondangky == "2") {
                updateHopDong();
            }
        });

    }

    function addeditClearData() {
        var datenow = new Date();

        $("#txtNhapHDMaDonDangKyKH").val('');
        $("#txtNhapHDTenKhachHangKH").val('');
        $("#txtNhapHDDiaChiLD").val('');

        $("#ddlNhapHDHinhThucThanhToan")[0].selectedIndex = 2;
        $("#ddlNhapHDCoDongHo")[0].selectedIndex = 1;
        $("#txtNhapHDNgayNhapHopDong").val(tedu.getFormattedDate(datenow));

        $("#txtNhapHDNgayHieuLuc").val(tedu.getFormattedDate(datenow));
        $("#ddlNhapHDLoaiHopDong")[0].selectedIndex = 0;
        $("#txtNhapHDNgayHetHanHopDong").val(tedu.getFormattedDate(datenow));

        $("#ddlNhapHDMucDichSuDung")[0].selectedIndex = 1;
        $("#txtNhapHDLoaiOngNhanh").val('');
        $("#txtNhapHDDinhMucSuDung").val('1');

        $("#txtNhapHDSoHo").val('1');
        $("#txtNhapHDSoNhanKhau").val('1');
        $("#txtNhapHDSoCMND").val('');

        $("#txtNhapHDMaSoThue").val('');
        $("#txtNhapHDDanhSo").val('');
    }

    function loadDataAddEdit() {
        loadDataLoaiHopDong();
        loadDataHinhThucThanhToan();
        loadDataCoDOngHo();
        MucDichSuDung();
    }   

    function isFormMainValidate() {
        if ($('#frmMainNhapHopDong').valid()) {
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
        $('#frmMainNhapHopDong').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                txtNhapHDNgayNhapHopDong: {
                    required: true,
                    isDateVietNam: true
                },
                txtNhapHDNgayHieuLuc: {
                    required: true,
                    isDateVietNam: true
                },
                ddlNhapHDLoaiHopDong: {
                    required: true,
                    isDanhMuc: true
                },
                txtNhapHDNgayHetHanHopDong: {
                    required: true,
                    isDateVietNam: true
                },
                ddlNhapHDMucDichSuDung: {
                    required: true,
                    isDanhMuc: true
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
                $('#ddlNhapHDPhongTo').html(render);
                $("#ddlNhapHDPhongTo")[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    }

    function loadDataLoaiHopDong() {
        return $.ajax({
            type: 'GET',
            url: '/admin/PoKyLaiHDNuoc/PoDieuKien',
            data: { DieuKien: 'LoaiHopDong' },
            dataType: 'json',
            success: function (response) {
                var render = "<option value='%' >-- Bỏ chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Ten + "</option>";
                });
                $('#ddlNhapHDLoaiHopDong').html(render);
                $("#ddlNhapHDLoaiHopDong")[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Hợp đồng.', 'error');
            }
        });
    }

    function loadDataHinhThucThanhToan() {
        var render = "<option value='%' >-- Bỏ chọn --</option> <option value='0' >-- Không thu tiền --</option> <option value='1' >-- Tiền mặt --</option> <option value='2' >-- Thu khác --</option> <option value='CK' >-- Chuyển khoản --</option> <option value='TM' >-- Tiền mặt --</option> <option value='TT' >-- Trừ lương --</option>";

        $('#ddlNhapHDHinhThucThanhToan').html(render);
        $("#ddlNhapHDHinhThucThanhToan")[0].selectedIndex = 2;
    }

    function loadDataCoDOngHo() {
        var render = "<option value='%' >-- Bỏ chọn --</option> <option value='15' >-- 15 --</option> <option value='20' >-- 20 --</option> <option value='34' >-- 34 --</option> <option value='42' >-- 42 --</option> <option value='49' >-- 49 --</option> <option value='60' >-- 60 --</option> <option value='100' >-- 100 --</option>";

        $('#ddlNhapHDCoDongHo').html(render);
        $("#ddlNhapHDCoDongHo")[0].selectedIndex = 1;
    }

    function MucDichSuDung() {
        return $.ajax({
            type: 'GET',
            url: '/admin/PoKyLaiHDNuoc/ListMDSD',
            dataType: 'json',
            success: function (response) {
                var render = "<option value='%' >-- Bỏ chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.MAMDSD + "'>" + item.TENMDSD + "</option>";
                });
                $('#ddlNhapHDMucDichSuDung').html(render);
                $("#ddlNhapHDMucDichSuDung")[0].selectedIndex = 1;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

    function loadTableNhapHopDongNuoc(isPageChanged) {
        var template = $('#table-DONDANGKY').html();
        var render = "";

        var khuvuc = $('#ddlKhuVuc').val();
        var phongto = $('#ddlPhongTo').val();
        var timnoidung = $('#txtTimNoiDung').val();

        $.ajax({
            type: 'GET',
            url: '/admin/PoDKNuocHD/ListHD',
            data: {
                KhuVuc: khuvuc,
                PhongTo: phongto,
                keyword: timnoidung,
                page: tedu.configs.pageIndex,
                pageSize: tedu.configs.pageSize
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.Results.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
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

    function loadTableChuanbiHopDong() {
        var template = $('#template-table-NhapHDKhachHang').html();
        var render = "";

        var khuvuc = $('#ddlNhapHDKhuVuc').val();
        var phongto = $('#ddlNhapHDPhongTo').val();
        var timnoidung = $('#txtNhapHDTenKhachHang').val();

        $.ajax({
            type: 'GET',
            url: '/admin/PoDKNuocHD/ListChuanBiHD',
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
                    $('#table-contentNhapHDKhachHang').html(render);
                }

            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function loadEditNhapHopDong() {
        var madondangky = $("#hidDonDangKyMaddk").val();

        $.ajax({
            type: "GET",
            url: "/Admin/PoDkNuocHD/GetHDNuocId",
            data: {
                DangKyNuocId: madondangky
            },
            dataType: "json",

            success: function (response) {
                var hopdong = response;

                addeditClearData();

                $("#txtNhapHDMaDonDangKyKH").val(hopdong.MADDK);
                $("#txtNhapHDTenKhachHangKH").val(hopdong.TENKH);
                $("#txtNhapHDDiaChiLD").val(hopdong.SONHA);

                $("#ddlNhapHDHinhThucThanhToan").val(hopdong.MAHTTT !== null ? hopdong.MAHTTT : '');
                $("#ddlNhapHDCoDongHo").val(hopdong.CODH !== null ? hopdong.CODH : '');
                $("#txtNhapHDNgayNhapHopDong").val(hopdong.NGAYTAO !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(hopdong.NGAYTAO) : '');

                $("#txtNhapHDNgayHieuLuc").val(hopdong.NGAYHL !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(hopdong.NGAYHL) : '');
                $("#ddlNhapHDLoaiHopDong").val(hopdong.HopDongLoaiId);
                $("#txtNhapHDNgayHetHanHopDong").val(hopdong.NgayHetHan !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(hopdong.NgayHetHan) : '');

                $("#ddlNhapHDMucDichSuDung").val(hopdong.MAMDSD);
                $("#txtNhapHDLoaiOngNhanh").val(hopdong.LOAIONG);
                $("#txtNhapHDDinhMucSuDung").val(hopdong.DINHMUCSD);

                $("#txtNhapHDSoHo").val(hopdong.SOHO);
                $("#txtNhapHDSoNhanKhau").val(hopdong.SONHANKHAU);
                $("#txtNhapHDSoCMND").val(hopdong.CMND);

                $("#txtNhapHDMaSoThue").val(hopdong.MST);
                $("#txtNhapHDDanhSo").val(hopdong.MADP + hopdong.MADB);                

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function saveHopDong() {
        var madondangky = $('#hidDonDangKyMaddk').val();
        var corporationid = $('#ddlKhuVuc').val();                

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
          
            var sonha = $("#txtNhapHDDiaChiLD").val();

            var mahttt = $("#ddlNhapHDHinhThucThanhToan").val();
            var codh = $("#ddlNhapHDCoDongHo").val();
            var ngaytao = tedu.getFormatDateYYMMDD($('#txtNhapHDNgayNhapHopDong').val()); 

            var ngayhieuluc = tedu.getFormatDateYYMMDD($('#txtNhapHDNgayHieuLuc').val());
            var hopdongloai = $("#ddlNhapHDLoaiHopDong").val();
            var ngayhethan = tedu.getFormatDateYYMMDD($('#txtNhapHDNgayHetHanHopDong').val());

            var mamdsd = $("#ddlNhapHDMucDichSuDung").val();
            var loaiong = $("#txtNhapHDLoaiOngNhanh").val();
            var dinhmucsd = $("#txtNhapHDDinhMucSuDung").val();

            var soho = $("#txtNhapHDSoHo").val();
            var sonhankhau = $("#txtNhapHDSoNhanKhau").val();
            var socmnd = $("#txtNhapHDSoCMND").val();

            var masothue = $("#txtNhapHDMaSoThue").val();
            var danhso = $("#txtNhapHDDanhSo").val();
            
            $.ajax({
                type: "POST",
                url: "/Admin/PoDkNuocHD/SaveHopDong",
                data: {
                    MADDK: madondangky,
                    CorporationId: corporationid,

                    SONHA: sonha,
                    MAHTTT: mahttt,
                    CODH: codh,
                    NGAYTAO: ngaytao,
                    NGAYHL: ngayhieuluc,
                    HopDongLoaiId: hopdongloai,
                    NgayHetHan: ngayhethan,
                    
                    MAMDSD: mamdsd,
                    LOAIONG: loaiong,
                    DINHMUCSD: dinhmucsd,
                    SOHO: soho,
                    SONHANKHAU: sonhankhau,
                    CMND: socmnd,

                    MST: masothue,
                    DanhSo: danhso
                },
                dataType: "json",
                beforeSend: function () {                    
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Nhập hợp đồng.", "error");
                    }
                    else {
                        tedu.notify('Lưu Nhập hợp đồng.', 'success');

                        nguyen.appUserLoginLogger(userName, 'Nhập hợp đồng Nước mới');

                        loadTableNhapHopDongNuoc(true);

                        $('#modal-add-edit-NhapHopDong').modal('hide');

                        addeditClearData();

                        nguyen.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể lưu Nhập hợp đồng nước.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function updateHopDong() {
        var madondangky = $('#hidDonDangKyMaddk').val();
        var corporationid = $('#ddlKhuVuc').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var sonha = $("#txtNhapHDDiaChiLD").val();

            var mahttt = $("#ddlNhapHDHinhThucThanhToan").val();
            var codh = $("#ddlNhapHDCoDongHo").val();
            var ngaytao = tedu.getFormatDateYYMMDD($('#txtNhapHDNgayNhapHopDong').val());

            var ngayhieuluc = tedu.getFormatDateYYMMDD($('#txtNhapHDNgayHieuLuc').val());
            var hopdongloai = $("#ddlNhapHDLoaiHopDong").val();
            var ngayhethan = tedu.getFormatDateYYMMDD($('#txtNhapHDNgayHetHanHopDong').val());

            var mamdsd = $("#ddlNhapHDMucDichSuDung").val();
            var loaiong = $("#txtNhapHDLoaiOngNhanh").val();
            var dinhmucsd = $("#txtNhapHDDinhMucSuDung").val();

            var soho = $("#txtNhapHDSoHo").val();
            var sonhankhau = $("#txtNhapHDSoNhanKhau").val();
            var socmnd = $("#txtNhapHDSoCMND").val();

            var masothue = $("#txtNhapHDMaSoThue").val();
            var danhso = $("#txtNhapHDDanhSo").val();

            $.ajax({
                type: "POST",
                url: "/Admin/PoDkNuocHD/UpHopDong",
                data: {
                    MADDK: madondangky,
                    CorporationId: corporationid,

                    SONHA: sonha,
                    MAHTTT: mahttt,
                    CODH: codh,
                    NGAYTAO: ngaytao,
                    NGAYHL: ngayhieuluc,
                    HopDongLoaiId: hopdongloai,
                    NgayHetHan: ngayhethan,

                    MAMDSD: mamdsd,
                    LOAIONG: loaiong,
                    DINHMUCSD: dinhmucsd,
                    SOHO: soho,
                    SONHANKHAU: sonhankhau,
                    CMND: socmnd,

                    MST: masothue,
                    DanhSo: danhso
                },
                dataType: "json",
                beforeSend: function () {
                    nguyen.startLoading();
                    $('#modal-add-edit-NhapHopDong').modal('hide');
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Sửa hợp đồng.", "error");
                    }
                    else {
                        tedu.notify('Lưu Sửa hợp đồng.', 'success');

                        nnguyen.appUserLoginLogger(userName, 'Sửa hợp đồng Nước mới');

                        loadTableNhapHopDongNuoc(true);

                        $('#modal-add-edit-NhapHopDong').modal('hide');

                        addeditClearData();

                        nguyen.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể lưu Nhập hợp đồng.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }
   

}