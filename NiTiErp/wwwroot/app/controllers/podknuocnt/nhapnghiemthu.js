var nhapnghiemthuController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    this.loadEditNhapNghiemThu = function () {
        loadEditNhapNghiemThu();
    }

    this.loadTenNhanVien = function (corporationid) {
        loadTenNhanVien(corporationid);
    }

    this.addeditClearData = function () {
        addeditClearData();
    }

    this.loadTableNhapNghiemThuNuoc = function () {
        loadTableNhapNghiemThuNuoc(true);
    }

    this.loadPhongKhuVucNhapNghiemThu = function () {
        loadPhongKhuVucNhapNghiemThu();
    }

    this.initialize = function () {        
        registerEvents();
        addeditClearData();
        loadDataAddEdit();
    }

    function registerEvents() {
        $('#txtNhapNTNgayNhanHoSo, #txtNhapNTNgayLapBienBan, #txtNhapNTNgayChuyenHoSo ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        $('#ddlNhapNTKhuVuc').on('change', function () {
            var khuvuc = $('#ddlNhapNTKhuVuc').val();
            loadPhongKhuVucNhapNghiemThu(khuvuc);
        });

        $('#btnNhapNTTimKhachHang').on('click', function () {
            loadTableChuanbiNghiemThu();
        });

        $('body').on('click', '.btn-EditNhapNghiemThuChuanBi', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            const myArray = maddk.split("-");
            $('#hidDonDangKyMaddk').val(myArray[0]);

            $('#txtNhapNTMaDonDangKyKH').val(myArray[0]);
            $('#txtNhapNTTenKhachHangKH').val(myArray[1]);
            $('#txtNhapNTDiaChiLD').val(myArray[2]);

            $('#txtNhapNTDanhSo').val(myArray[3]);
            $('#txtNhapNTLoaiDongHo').val(myArray[4]);
            $('#txtNhapNTNuocSanXuat').val(myArray[5]);
            $('#txtNhapNTSoNoDongHo').val(myArray[6]);
            $('#txtNhapNTChiSoBatDauDongHo').val(myArray[7]);
            $('#txtNhapNTMaChiMat1').val(myArray[8]);
            $('#txtNhapNTMaChiMat2').val(myArray[9]);
        });

        $('#btnSaveNhapNghiemThu').on('click', function () {
            var isdondangky = $('#hidInsertDonDangKyMaddk').val(); // 1: insert; 2: update; 

            if (isdondangky == "1") {
                saveNghiemThu();
            } else if (isdondangky == "2") {
                updateNghiemThu();
            }
        });
    }

    function addeditClearData() {
        var datenow = new Date();

        $("#txtNhapNTMaDonDangKyKH").val('');
        $("#txtNhapNTTenKhachHangKH").val('');
        $("#txtNhapNTDiaChiLD").val('');

        $("#txtNhapNTDanhSo").val('');
        $("#txtNhapNTLoaiDongHo").val('');
        $("#txtNhapNTHieuDongHo").val('');

        $("#txtNhapNTNuocSanXuat").val('');
        $("#txtNhapNTSoNoDongHo").val('');
        $("#txtNhapNTChiSoBatDauDongHo").val('0');

        $("#txtNhapNTNgayNhanHoSo").val(tedu.getFormattedDate(datenow));
        $("#txtNhapNTNgayLapBienBan").val(tedu.getFormattedDate(datenow));
        $("#txtNhapNTHeThongCapNuoc").val('');

        $("#txtNhapNTNhanVienBB1").val('');        
        $("#txtNhapNTNhanVienBB2").val('');
        $("#txtNhapNTNhanVienBB3").val('');

        $("#txtNhapNTChiSoDongHo").val('0');
        $("#txtNhapNTChieuCaoLap").val('0');
        $("#txtNhapNTKhoanCachTuOngDenDH").val('0');

        $("#txtNhapNTViTriLapDongHo").val('');
        $("#txtNhapNTMaChiMat1").val('');
        $("#txtNhapNTMaChiMat2").val('');

        $("#txtNhapNTMaSoKimMat1").val('');
        $("#txtNhapNTMaSoKimMat2").val('');
        $("#txtNhapNTKetLuanSauChayThu").val('');

        $("#txtNhapNTNgayChuyenHoSo").val(tedu.getFormattedDate(datenow));
        $("#txtNhapNTGhiChuBBNT").val('');
    }

    function loadDataAddEdit() {

    }

    function isFormMainValidate() {
        if ($('#frmMainNhapNghiemThu').valid()) {
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
        $('#frmMainNhapNghiemThu').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                txtNhapNTNgayNhanHoSo: {
                    required: true,
                    isDateVietNam: true
                },
                txtNhapNTNgayLapBienBan: {
                    required: true,
                    isDateVietNam: true
                },
                txtNhapNTNhanVienBB1: {
                    required: true
                },
                txtNhapNTNhanVienBB2: {
                    required: true
                },
                txtNhapNTNhanVienBB3: {
                    required: true
                },   
                txtNhapNTNgayChuyenHoSo: {                   
                    isDateVietNam: true
                },
            },
            //messages: {
            //    txtTrichYeu: { required: "Nhập nội dung trích yếu của văn bản.." }
            //}
        });
    }

    function loadPhongKhuVucNhapNghiemThu(makhuvuc) {
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
                $('#ddlNhapNTPhongTo').html(render);
                $("#ddlNhapNTPhongTo")[0].selectedIndex = 0;
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
        $('#txtNhapNTNhanVienBB1').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {                
                $('#hidMaNhanVien1Id').val(suggestion.Id);
            }
        });
        $('#txtNhapNTNhanVienBB2').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {                
                $('#hidMaNhanVien2Id').val(suggestion.Id);
            }
        });
        $('#txtNhapNTNhanVienBB3').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {                
                $('#hidMaNhanVien3Id').val(suggestion.Id);
            }
        });
    }

    function loadTableNhapNghiemThuNuoc(isPageChanged) {
        var template = $('#table-DONDANGKY').html();
        var render = "";

        var khuvuc = $('#ddlKhuVuc').val();
        var phongto = $('#ddlPhongTo').val();
        var timnoidung = $('#txtTimNoiDung').val();
        
        $.ajax({
            type: 'GET',
            url: '/admin/PoDKNuocNT/ListNT',
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
                        loadTableNhapNghiemThuNuoc();
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

    function loadTableChuanbiNghiemThu() {
        var template = $('#template-table-NhapNTKhachHang').html();
        var render = "";

        var khuvuc = $('#ddlNhapNTKhuVuc').val();
        var phongto = $('#ddlNhapNTPhongTo').val();
        var timnoidung = $('#txtNhapNTTenKhachHang').val();

        $.ajax({
            type: 'GET',
            url: '/admin/PoDKNuocNT/ListChuanBiNT',
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
                            DIACHILD: item.DIACHILD,

                            DanhSo: item.DanhSo,
                            DongHoMaLDH: item.DongHoMaLDH,
                            DongHoSXTai: item.DongHoSXTai,
                            DongHoSoNo: item.DongHoSoNo,
                            ThiCongChiSoDau: item.ThiCongChiSoDau,                            
                            CHIKDM1: item.CHIKDM1,
                            CHIKDM2: item.CHIKDM2
                        });
                    });
                }

                if (render !== '') {
                    $('#table-contentNhapNTKhachHang').html(render);
                }

            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function saveNghiemThu() {
        var madondangky = $('#hidDonDangKyMaddk').val();
        var corporationid = $('#ddlKhuVuc').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            //var danhsokhachhahng = $("#txtNhapNTDanhSo").val();
            //var loaidongho = $("#txtNhapNTLoaiDongHo").val();
            //var hieudongho = $("#txtNhapNTHieuDongHo").val();

            //var nuocsanxuat = $("#txtNhapNTNuocSanXuat").val();
            //var sonodongho = $("#txtNhapNTSoNoDongHo").val();
            //var chisobatdau = $("#txtNhapNTChiSoBatDauDongHo").val();

            var ngaynhanhoso = tedu.getFormatDateYYMMDD($('#txtNhapNTNgayNhanHoSo').val());
            var ngaylapbb = tedu.getFormatDateYYMMDD($('#txtNhapNTNgayLapBienBan').val());            
            var hethongcapnuoc = $("#txtNhapNTHeThongCapNuoc").val();

            var manhanvien1 = $("#hidMaNhanVien1Id").val();
            var manhanvien2 = $("#hidMaNhanVien2Id").val();
            var manhanvien3 = $("#hidMaNhanVien3Id").val();
            var tennhanvien1 = $("#txtNhapNTNhanVienBB1").val();
            var tennhanvien2 = $("#txtNhapNTNhanVienBB2").val();
            var tennhanvien3 = $("#txtNhapNTNhanVienBB3").val();            

            var chisodongho = $("#txtNhapNTChiSoDongHo").val();
            var chieucaolap = $("#txtNhapNTChieuCaoLap").val();
            var khoancachtuongdendongho = $("#txtNhapNTKhoanCachTuOngDenDH").val();

            var vitrilapdongho = $("#txtNhapNTViTriLapDongHo").val();
            //var machimatkd1 = $("#txtNhapNTMaChiMat1").val();
            //var machimatkd2 = $("#txtNhapNTMaChiMat2").val();

            var masokimm1 = $("#txtNhapNTMaSoKimMat1").val();
            var masokimm2 = $("#txtNhapNTMaSoKimMat2").val();
            var ketluanvakiennghi = $("#txtNhapNTKetLuanSauChayThu").val();

            var ngaychuyenhoso = tedu.getFormatDateYYMMDD($('#txtNhapNTNgayChuyenHoSo').val());            
            var ghichubbnghiemthu = $("#txtNhapNTGhiChuBBNT").val();            

            $.ajax({
                type: "POST",
                url: "/Admin/PoDkNuocNT/SaveNT",
                data: {
                    MADDK: madondangky,
                    CorporationId: corporationid,

                    NGAYNHANHSTC: ngaynhanhoso,
                    NGAYLAPBB: ngaylapbb,
                    HETHONGCN: hethongcapnuoc,

                    MANV1: manhanvien1,
                    MANV2: manhanvien2,
                    MANV3: manhanvien3,
                    HOTEN1: tennhanvien1,
                    HOTEN2: tennhanvien2,
                    HOTEN3: tennhanvien3,

                    MADH: chisodongho,
                    CHIEUCAO: chieucaolap,
                    KHOANGCACH: khoancachtuongdendongho,

                    VITRI: vitrilapdongho,

                    CHINIEMM1: masokimm1,
                    CHINIEMM2: masokimm2,
                    KETLUAN: ketluanvakiennghi,

                    NGAYCHUYENHSKTOAN: ngaychuyenhoso,
                    GHICHU: ghichubbnghiemthu
                },
                dataType: "json",
                beforeSend: function () {
                    nguyen.startLoading();
                    $('#modal-add-edit-NhapNghiemThu').modal('hide');
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Nhập nghiệm thu.", "error");
                    }
                    else {
                        tedu.notify('Lưu Nhập nghiệm thu.', 'success');

                        nguyen.appUserLoginLogger(userName, 'Nhập nghiệm thu nước mới');

                        loadTableNhapNghiemThuNuoc(true);

                        addeditClearData();

                        nguyen.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể lưu Nhập nghiệm thu nước.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function updateNghiemThu() {
        var madondangky = $('#hidDonDangKyMaddk').val();
        var corporationid = $('#ddlKhuVuc').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {       
            var ngaynhanhoso = tedu.getFormatDateYYMMDD($('#txtNhapNTNgayNhanHoSo').val());
            var ngaylapbb = tedu.getFormatDateYYMMDD($('#txtNhapNTNgayLapBienBan').val());
            var hethongcapnuoc = $("#txtNhapNTHeThongCapNuoc").val();

            var manhanvien1 = $("#hidMaNhanVien1Id").val();
            var manhanvien2 = $("#hidMaNhanVien2Id").val();
            var manhanvien3 = $("#hidMaNhanVien3Id").val();
            var tennhanvien1 = $("#txtNhapNTNhanVienBB1").val();
            var tennhanvien2 = $("#txtNhapNTNhanVienBB2").val();
            var tennhanvien3 = $("#txtNhapNTNhanVienBB3").val();

            var chisodongho = $("#txtNhapNTChiSoDongHo").val();
            var chieucaolap = $("#txtNhapNTChieuCaoLap").val();
            var khoancachtuongdendongho = $("#txtNhapNTKhoanCachTuOngDenDH").val();

            var vitrilapdongho = $("#txtNhapNTViTriLapDongHo").val();           

            var masokimm1 = $("#txtNhapNTMaSoKimMat1").val();
            var masokimm2 = $("#txtNhapNTMaSoKimMat2").val();
            var ketluanvakiennghi = $("#txtNhapNTKetLuanSauChayThu").val();

            var ngaychuyenhoso = tedu.getFormatDateYYMMDD($('#txtNhapNTNgayChuyenHoSo').val());
            var ghichubbnghiemthu = $("#txtNhapNTGhiChuBBNT").val();

            $.ajax({
                type: "POST",
                url: "/Admin/PoDkNuocNT/UpNT",
                data: {
                    MADDK: madondangky,
                    CorporationId: corporationid,

                    NGAYNHANHSTC: ngaynhanhoso,
                    NGAYLAPBB: ngaylapbb,
                    HETHONGCN: hethongcapnuoc,

                    MANV1: manhanvien1,
                    MANV2: manhanvien2,
                    MANV3: manhanvien3,
                    HOTEN1: tennhanvien1,
                    HOTEN2: tennhanvien2,
                    HOTEN3: tennhanvien3,

                    MADH: chisodongho,
                    CHIEUCAO: chieucaolap,
                    KHOANGCACH: khoancachtuongdendongho,

                    VITRI: vitrilapdongho,

                    CHINIEMM1: masokimm1,
                    CHINIEMM2: masokimm2,
                    KETLUAN: ketluanvakiennghi,

                    NGAYCHUYENHSKTOAN: ngaychuyenhoso,
                    GHICHU: ghichubbnghiemthu
                },
                dataType: "json",
                beforeSend: function () {
                    nguyen.startLoading();
                    $('#modal-add-edit-NhapNghiemThu').modal('hide');
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Sửa nghiệm thu.", "error");
                    }
                    else {
                        tedu.notify('Lưu Sửa nghiệm thu.', 'success');

                        nguyen.appUserLoginLogger(userName, 'Sửa nghiệm thu nước mới');

                        loadTableNhapNghiemThuNuoc(true);

                        addeditClearData();

                        nguyen.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể lưu Sửa nghiệm thu nước.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function loadEditNhapNghiemThu() {
        var madondangky = $("#hidDonDangKyMaddk").val();

        $.ajax({
            type: "GET",
            url: "/Admin/PoDkNuocNT/GetNTNuocId",
            data: {
                DangKyNuocId: madondangky
            },
            dataType: "json",
            beforeSend: function () {
                nguyen.startLoading();                
            },
            success: function (response) {
                var nghiemthu = response;

                addeditClearData();              

                $("#txtNhapNTMaDonDangKyKH").val(nghiemthu.MADDK);
                $("#txtNhapNTTenKhachHangKH").val(nghiemthu.TENKH);
                $("#txtNhapNTDiaChiLD").val(nghiemthu.SONHA);

                $("#txtNhapNTDanhSo").val(nghiemthu.DanhSo);
                $("#txtNhapNTLoaiDongHo").val(nghiemthu.DongHoMaLDH);
                $("#txtNhapNTHieuDongHo").val('');

                $("#txtNhapNTNuocSanXuat").val(nghiemthu.DongHoSXTai);
                $("#txtNhapNTSoNoDongHo").val(nghiemthu.DongHoSoNo);
                $("#txtNhapNTChiSoBatDauDongHo").val(nghiemthu.ThiCongChiSoDau);

                $("#txtNhapNTNgayNhanHoSo").val(nghiemthu.NGAYNHANHSTC !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(nghiemthu.NGAYNHANHSTC) : '');
                $("#txtNhapNTNgayLapBienBan").val(nghiemthu.NGAYLAPBB !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(nghiemthu.NGAYLAPBB) : '');
                $("#txtNhapNTHeThongCapNuoc").val(nghiemthu.HETHONGCN);

                $("#txtNhapNTNhanVienBB1").val(nghiemthu.HOTEN1);
                $("#txtNhapNTNhanVienBB2").val(nghiemthu.HOTEN2);
                $("#txtNhapNTNhanVienBB3").val(nghiemthu.HOTEN3);

                $("#txtNhapNTChiSoDongHo").val(nghiemthu.MADH);
                $("#txtNhapNTChieuCaoLap").val(nghiemthu.CHIEUCAO);
                $("#txtNhapNTKhoanCachTuOngDenDH").val(nghiemthu.KHOANGCACH);

                $("#txtNhapNTViTriLapDongHo").val(nghiemthu.VITRI);
                $("#txtNhapNTMaChiMat1").val(nghiemthu.CHIKDM1);
                $("#txtNhapNTMaChiMat2").val(nghiemthu.CHIKDM2);

                $("#txtNhapNTMaSoKimMat1").val(nghiemthu.CHINIEMM1);
                $("#txtNhapNTMaSoKimMat2").val(nghiemthu.CHINIEMM2);
                $("#txtNhapNTKetLuanSauChayThu").val(nghiemthu.KETLUAN);

                $("#txtNhapNTNgayChuyenHoSo").val(nghiemthu.NGAYCHUYENHSKTOAN !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(nghiemthu.NGAYCHUYENHSKTOAN) : '');
                $("#txtNhapNTGhiChuBBNT").val(nghiemthu.GHICHU);                

                nguyen.stopLoading();

                $('#modal-add-edit-NhapNghiemThu').modal('show');                
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

}