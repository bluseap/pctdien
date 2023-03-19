var addeditkdnController = function () {

    this.loadGDNXuLyKiemDinhNuoc = function (giaydenghiDMCCDVNuocId) {
        loadGDNXuLyKiemDinhNuoc(giaydenghiDMCCDVNuocId);
    }

    this.addeditClearData = function () {
        addeditClearData();
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

        $('#txtNgayLapBBYCKD, #txtNgayLapBBKiemTraDongHoKHYC,#txtThoiGianLapDat, #txtThoiGianLapDatChoKiemDinh ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        $('#btnSaveKDNuocXuLy').on('click', function () {
            var isgiaydenghi = $('#hidInsertGDNXuLyKiemDinhNuocId').val(); // 1: insert; 2: update; 

            if (isgiaydenghi == 1) {
                saveGDNXuLyKDNuoc();
            } else if (isgiaydenghi == 2) {
                var ttkiemdinh = $('#hidTrangThaiKiemTraKiemDinh').val();

                if (ttkiemdinh == '2') {
                    updateGDNXuLyKDNuoc();
                } else {
                    tedu.notify('Không lưu được bb, Khách hàng yêu cầu. Kiểm tra lại.', 'error');
                }
            }
            else {
                tedu.notify("Chưa lưu xử lý kiểm định.", "error");
            }
        });        

    }

    function loadAddEditData() {
        
    }

    function addeditClearData() {
        var datenow = new Date();

        $('#hidGDNXuLyKiemDinhNuocId').val(0);

        $('#hidGiayDeNghiDMCungCapNuocId').val(0);
        $('#hidInsertGDNXuLyKiemDinhNuocId').val(0); // 1: insert; 2: update;
        
        $('#hidTrangThaiDeNghi').val(0);
        $('#hidTrangThaiKiemTraKiemDinh').val(0);

        $('#txtHoTenKhachHang').val(0);
        $('#txtDiaChiKhachHang').val(0);

        $('#txtNgayLapBBYCKD').val(tedu.getFormattedDate(datenow));

        $('#txtTenNhanVien1').val('');
        $('#txtChucVu1').val('');
        $('#txtTenNhanVien2').val('');
        $('#txtChucVu2').val('');
        $('#txtDaiDienKhachHang').val('');
        $('#txtDanhSoKhachHang').val('');
        $('#txtNoiDungBBYeuCauKiemDinh').val('');
        $('#txtNgayLapBBKiemTraDongHoKHYC').val(tedu.getFormattedDate(datenow));
        $('#txtTenNhanVienKT1').val('');
        $('#txtChucVuKH1').val('');
        $('#txtTenNhanVienKT2').val('');
        $('#txtChucVuKT2').val('');
        $('#txtDaiDienKhachHangKT').val('');
        $('#txtDanhSoKhachHangKT').val('');
        $('#txtHieuDongHo').val('');
        $('#txtSoNoDongHo').val('');
        $('#txtNuocSanXuat').val('');
        $('#txtCoDongHo').val('');
        $('#txtChiSoTichLuy').val('');
        $('#txtThoiGianLapDat').val(tedu.getFormattedDate(datenow));
        $('#txtHieuDongHoChoKiemDinh').val('');
        $('#txtSoNoDongHoChoKiemDinh').val('');
        $('#txtNuocSanXuatChoKiemDinh').val('');
        $('#txtCoDongHoChoKiemDinh').val('');
        $('#txtChiSoTichLuyChoKiemDinh').val('0');
        $('#txtThoiGianLapDatChoKiemDinh').val(tedu.getFormattedDate(datenow));
        $('#txtChieuCaoLapDatChoKiemDinh').val('0');
        $('#txtViTriLapDatChoKiemDinh').val('');
        $('#txtKhoanCachLapDatChoKiemDinh').val('');
        $('#txtGhiChu').val('');        
        
        //$('#ddlDMCungCapDichVu')[0].selectedIndex = 0;
        //$('#tbl-contentDMCungCapDichVu').html('');            
    }

    function loadTableGiayDeNghiDMCungCapNuoc(isPageChanged) {
        var template = $('#table-KiemDinhNuocKS').html();
        var render = "";

        var makhuvuc = $('#ddlKhuVuc').val();
        var phongtoid = $('#ddlPhongTo').val();
        var timnoidung = $('#txtTimNoiDung').val();

        $.ajax({
            type: 'GET',
            url: '/admin/KDNuocKS/ListGDNNuocTTKT', //  TTDeNghi = 2 
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
                            TTKiemTraKiemDinh: tedu.getGiayDeNghiTT(item.TTKiemTraKiemDinh)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            //Price: tedu.formatNumber(item.Price, 0),
                        });
                    });
                }

                $('#lbKiemDinhNuocKSTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentKiemDinhNuocKS').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingKIemDinhNuocKT(response.Result.RowCount, function () {
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
    function wrapPagingKIemDinhNuocKT(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULKiemDinhNuocKS a').length === 0 || changePageSize === true) {
            $('#paginationULKiemDinhNuocKS').empty();
            $('#paginationULKiemDinhNuocKS').removeData("twbs-pagination");
            $('#paginationULKiemDinhNuocKS').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULKiemDinhNuocKS').twbsPagination({
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

    function loadGDNXuLyKiemDinhNuoc(giaydenghiDMCCDVNuocId) {
        $.ajax({
            type: "GET",
            url: "/Admin/KDNuocKS/GetGDNDMCCNuocId",
            data: {
                id: giaydenghiDMCCDVNuocId
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var gdndmccnuoc = response.Result;

                $('#hidGiayDeNghiDMCungCapNuocId').val(gdndmccnuoc.Id);

                $('#hidTrangThaiDeNghi').val(gdndmccnuoc.TTDeNghi);
                $('#hidTrangThaiKiemTraKiemDinh').val(gdndmccnuoc.TTKiemTraKiemDinh);

                var ttdenghi = gdndmccnuoc.TTDeNghi;
                var ttkiemtrakiemdinh = gdndmccnuoc.TTKiemTraKiemDinh;

                if (ttdenghi == 2 && ttkiemtrakiemdinh == 0) { // cho khao sat: lap bb kh yeu cau kiem dinh; lap bb thay dong ho tam
                    $('#modal-add-edit-KDNuocXuLy').modal('show');

                    $('#hidInsertGDNXuLyKiemDinhNuocId').val(1); // 1: insert; 2: update; 

                    $('#txtHoTenKhachHang').val(gdndmccnuoc.TenKhachHang);
                    $('#txtDiaChiKhachHang').val(gdndmccnuoc.DiaChiMuaNuoc);     
                }
                else if (ttdenghi == 2 && (ttkiemtrakiemdinh == 2 || ttkiemtrakiemdinh == 8)) { // 2: Ok
                    $('#modal-add-edit-KDNuocXuLy').modal('show');

                    $('#hidInsertGDNXuLyKiemDinhNuocId').val(2); // 1: insert; 2: update; 

                    $('#txtHoTenKhachHang').val(gdndmccnuoc.TenKhachHang);
                    $('#txtDiaChiKhachHang').val(gdndmccnuoc.DiaChiMuaNuoc);

                    loadGDNXuLyKiemDinhNuocUpdate(giaydenghiDMCCDVNuocId);
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
        if ($('#frmMainKDNuocXuLy').valid()) {
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
        $('#frmMainKDNuocXuLy').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                txtNgayLapBBYCKD: {
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
                //txtDanhSoKhachHang: {
                //    required: true
                //},
                txtNoiDungBBYeuCauKiemDinh: {
                    required: true
                },
                txtNgayLapBBKiemTraDongHoKHYC: {
                    required: true,
                    isDateVietNam: true
                },
                txtTenNhanVienKT1: {
                    required: true
                },
                txtChucVuKH1: {
                    required: true
                },
                txtTenNhanVienKT2: {
                    required: true
                },
                txtChucVuKT2: {
                    required: true
                },
                txtDaiDienKhachHangKT: {
                    required: true
                },
                //txtDanhSoKhachHangKT: {
                //    required: true
                //},
                txtHieuDongHo: {
                    required: true
                },
                txtSoNoDongHo: {
                    required: true
                },
                txtNuocSanXuat: {
                    required: true
                },
                txtCoDongHo: {
                    required: true
                },
                txtChiSoTichLuy: {
                    required: true
                },
                txtThoiGianLapDat: {
                    required: true,
                    isDateVietNam: true
                },
                txtHieuDongHoChoKiemDinh: {
                    required: true
                },
                txtSoNoDongHoChoKiemDinh: {
                    required: true
                },
                txtNuocSanXuatChoKiemDinh: {
                    required: true
                },
                txtCoDongHoChoKiemDinh: {
                    required: true
                },
                txtChiSoTichLuyChoKiemDinh: {
                    required: true
                },
                txtThoiGianLapDatChoKiemDinh: {
                    required: true,
                    isDateVietNam: true
                },
                //txtChieuCaoLapDatChoKiemDinh: {
                //    required: true
                //},
                //txtViTriLapDatChoKiemDinh: {
                //    required: true
                //},
                //txtKhoanCachLapDatChoKiemDinh: {
                //    required: true
                //},
                //txtGhiChu: {
                //    required: true
                //},                    
            },
            //messages: {
            //    txtTrichYeu: { required: "Nhập nội dung trích yếu của văn bản.." }
            //}
        });
    }    

    function saveGDNXuLyKDNuoc() {
        var giaydenghidmcungcapnuocId = $('#hidGiayDeNghiDMCungCapNuocId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            //var tenkhachhang = $('#txtHoTenKhachHang').val();
            //var diachikhachhang = $('#txtDiaChiKhachHang').val();

            var ngaylapbbTCKD = tedu.getFormatDateYYMMDD($('#txtNgayLapBBYCKD').val());
            var tennhanvien1 = $('#txtTenNhanVien1').val();
            var chucvu1 = $('#txtChucVu1').val();
            var tennhanvien2 = $('#txtTenNhanVien2').val();
            var chucvu2 = $('#txtChucVu2').val();
            var daidienkhachhang = $('#txtDaiDienKhachHang').val();
            var danhsokhachhang = $('#txtDanhSoKhachHang').val();
            var noidungbbyckd = $('#txtNoiDungBBYeuCauKiemDinh').val();
            var ngaylapbbktdhkhyc = tedu.getFormatDateYYMMDD($('#txtNgayLapBBKiemTraDongHoKHYC').val());
            var tennhanvienkt1 = $('#txtTenNhanVienKT1').val();
            var chucvukh1 = $('#txtChucVuKH1').val();
            var tennhanvienkt2 = $('#txtTenNhanVienKT2').val();
            var chucvukt2 = $('#txtChucVuKT2').val();
            var daidienkhachhangkt = $('#txtDaiDienKhachHangKT').val();
            var danhsokhachhangkt = $('#txtDanhSoKhachHangKT').val();
            var hieudongho = $('#txtHieuDongHo').val();
            var sonodongho = $('#txtSoNoDongHo').val();
            var nuocsanxuat = $('#txtNuocSanXuat').val();
            var codongho = $('#txtCoDongHo').val();
            var chisotichluy = $('#txtChiSoTichLuy').val();
            var thoigianlapdat = tedu.getFormatDateYYMMDD($('#txtThoiGianLapDat').val());
            var hieudonghochokiemdinh = $('#txtHieuDongHoChoKiemDinh').val();
            var sonodonghochokiemdinh = $('#txtSoNoDongHoChoKiemDinh').val();
            var nuocsanxuatchokiemdinh = $('#txtNuocSanXuatChoKiemDinh').val();
            var codonghochokiemdinh = $('#txtCoDongHoChoKiemDinh').val();
            var chisotichluychokiemdinh = $('#txtChiSoTichLuyChoKiemDinh').val();
            var thoigianlapdatchokiemdinh = tedu.getFormatDateYYMMDD($('#txtThoiGianLapDatChoKiemDinh').val()); 
            var chieucaolapdatchokiemdinh = $('#txtChieuCaoLapDatChoKiemDinh').val();
            var vitrilapdatchokiemdinh = $('#txtViTriLapDatChoKiemDinh').val();
            var khoancachlapdatchokiemdinh = $('#txtKhoanCachLapDatChoKiemDinh').val();
            var ghichu = $('#txtGhiChu').val();            

            $.ajax({
                type: "POST",
                url: "/Admin/KDNuocKS/CreateXLKDNuoc",
                data: {
                    GiayDeNghiDMCungCapNuocId: giaydenghidmcungcapnuocId,

                    NgayLapBBYeuCauKiemDinh: ngaylapbbTCKD,
                    TenNhanVienLapBBYeuCau1: tennhanvien1,
                    ChucVuNhanVienLapBBYeuCau1: chucvu1,
                    TenNhanVienLapBBYeuCau2: tennhanvien2,
                    ChucVuNhanVienLapBBYeuCau2: chucvu2,
                    TenDaiDienKhachHang: daidienkhachhang,
                    DanhSoKhachHang: danhsokhachhang,
                    NoiDungBBYeuCauKiemDinh: noidungbbyckd,
                    NgayLapBBKiemTraDongHoKHYC: ngaylapbbktdhkhyc,
                    TenNhanVienLapBBKiemTraDHKHYC1Id: tennhanvienkt1,
                    ChucVuNhanVienLapBBKiemTraDHKHYC1Id: chucvukh1,
                    TenNhanVienLapBBKiemTraDHKHYC2Id: tennhanvienkt2,
                    ChucVuNhanVienLapBBKiemTraDHKHYC2Id: chucvukt2,
                    TenDaiDienKhachHangKiemTra: daidienkhachhangkt,
                    DanhSoKhachHangKiemTra: danhsokhachhangkt,
                    HieuDongHo: hieudongho,
                    SoNo: sonodongho,
                    NuocSanXuat: nuocsanxuat,
                    CoDongHo: codongho,
                    ChiSoTichLuy: chisotichluy,
                    NgayLapDongHo: thoigianlapdat,
                    HieuDongHoChoKiemDinh: hieudonghochokiemdinh,
                    SoNoLapChoKiemDinh: sonodonghochokiemdinh,
                    NuocSanXuatChoKiemDinh: nuocsanxuatchokiemdinh,
                    CoDongHoChoKiemDinh: codonghochokiemdinh,
                    SoTichLuyChoKiemDinh: chisotichluychokiemdinh,
                    NgayLapChoKiemDinh: thoigianlapdatchokiemdinh,
                    ChieuCaoLapChoKiemDinh: chieucaolapdatchokiemdinh,
                    ViTriLapChoKiemDinh: vitrilapdatchokiemdinh,
                    KhoangCachLapChoKiemDinh: khoancachlapdatchokiemdinh,
                    GhiChu: ghichu
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Xử lý kiểm định.", "error");
                    }
                    else {
                        tedu.notify('Lưu Xử lý kiểm định.', 'success');

                        loadTableGiayDeNghiDMCungCapNuoc(true);

                        addeditClearData();

                        $('#modal-add-edit-KDNuocXuLy').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu Xử lý kiểm định.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function updateGDNXuLyKDNuoc() {
        var giaydenghidmcungcapnuocId = $('#hidGiayDeNghiDMCungCapNuocId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var ngaylapbbTCKD = tedu.getFormatDateYYMMDD($('#txtNgayLapBBYCKD').val());
            var tennhanvien1 = $('#txtTenNhanVien1').val();
            var chucvu1 = $('#txtChucVu1').val();
            var tennhanvien2 = $('#txtTenNhanVien2').val();
            var chucvu2 = $('#txtChucVu2').val();
            var daidienkhachhang = $('#txtDaiDienKhachHang').val();
            var danhsokhachhang = $('#txtDanhSoKhachHang').val();
            var noidungbbyckd = $('#txtNoiDungBBYeuCauKiemDinh').val();
            var ngaylapbbktdhkhyc = tedu.getFormatDateYYMMDD($('#txtNgayLapBBKiemTraDongHoKHYC').val());
            var tennhanvienkt1 = $('#txtTenNhanVienKT1').val();
            var chucvukh1 = $('#txtChucVuKH1').val();
            var tennhanvienkt2 = $('#txtTenNhanVienKT2').val();
            var chucvukt2 = $('#txtChucVuKT2').val();
            var daidienkhachhangkt = $('#txtDaiDienKhachHangKT').val();
            var danhsokhachhangkt = $('#txtDanhSoKhachHangKT').val();
            var hieudongho = $('#txtHieuDongHo').val();
            var sonodongho = $('#txtSoNoDongHo').val();
            var nuocsanxuat = $('#txtNuocSanXuat').val();
            var codongho = $('#txtCoDongHo').val();
            var chisotichluy = $('#txtChiSoTichLuy').val();
            var thoigianlapdat = tedu.getFormatDateYYMMDD($('#txtThoiGianLapDat').val());
            var hieudonghochokiemdinh = $('#txtHieuDongHoChoKiemDinh').val();
            var sonodonghochokiemdinh = $('#txtSoNoDongHoChoKiemDinh').val();
            var nuocsanxuatchokiemdinh = $('#txtNuocSanXuatChoKiemDinh').val();
            var codonghochokiemdinh = $('#txtCoDongHoChoKiemDinh').val();
            var chisotichluychokiemdinh = $('#txtChiSoTichLuyChoKiemDinh').val();
            var thoigianlapdatchokiemdinh = tedu.getFormatDateYYMMDD($('#txtThoiGianLapDatChoKiemDinh').val());
            var chieucaolapdatchokiemdinh = $('#txtChieuCaoLapDatChoKiemDinh').val();
            var vitrilapdatchokiemdinh = $('#txtViTriLapDatChoKiemDinh').val();
            var khoancachlapdatchokiemdinh = $('#txtKhoanCachLapDatChoKiemDinh').val();
            var ghichu = $('#txtGhiChu').val();

            $.ajax({
                type: "POST",
                url: "/Admin/KDNuocKS/UpXLKDNuoc",
                data: {
                    GiayDeNghiDMCungCapNuocId: giaydenghidmcungcapnuocId,

                    NgayLapBBYeuCauKiemDinh: ngaylapbbTCKD,
                    TenNhanVienLapBBYeuCau1: tennhanvien1,
                    ChucVuNhanVienLapBBYeuCau1: chucvu1,
                    TenNhanVienLapBBYeuCau2: tennhanvien2,
                    ChucVuNhanVienLapBBYeuCau2: chucvu2,
                    TenDaiDienKhachHang: daidienkhachhang,
                    DanhSoKhachHang: danhsokhachhang,
                    NoiDungBBYeuCauKiemDinh: noidungbbyckd,
                    NgayLapBBKiemTraDongHoKHYC: ngaylapbbktdhkhyc,
                    TenNhanVienLapBBKiemTraDHKHYC1Id: tennhanvienkt1,
                    ChucVuNhanVienLapBBKiemTraDHKHYC1Id: chucvukh1,
                    TenNhanVienLapBBKiemTraDHKHYC2Id: tennhanvienkt2,
                    ChucVuNhanVienLapBBKiemTraDHKHYC2Id: chucvukt2,
                    TenDaiDienKhachHangKiemTra: daidienkhachhangkt,
                    DanhSoKhachHangKiemTra: danhsokhachhangkt,
                    HieuDongHo: hieudongho,
                    SoNo: sonodongho,
                    NuocSanXuat: nuocsanxuat,
                    CoDongHo: codongho,
                    ChiSoTichLuy: chisotichluy,
                    NgayLapDongHo: thoigianlapdat,
                    HieuDongHoChoKiemDinh: hieudonghochokiemdinh,
                    SoNoLapChoKiemDinh: sonodonghochokiemdinh,
                    NuocSanXuatChoKiemDinh: nuocsanxuatchokiemdinh,
                    CoDongHoChoKiemDinh: codonghochokiemdinh,
                    SoTichLuyChoKiemDinh: chisotichluychokiemdinh,
                    NgayLapChoKiemDinh: thoigianlapdatchokiemdinh,
                    ChieuCaoLapChoKiemDinh: chieucaolapdatchokiemdinh,
                    ViTriLapChoKiemDinh: vitrilapdatchokiemdinh,
                    KhoangCachLapChoKiemDinh: khoancachlapdatchokiemdinh,
                    GhiChu: ghichu
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Xử lý kiểm định.", "error");
                    }
                    else {
                        tedu.notify('Lưu Xử lý kiểm định.', 'success');

                        loadTableGiayDeNghiDMCungCapNuoc(true);

                        addeditClearData();

                        $('#modal-add-edit-KDNuocXuLy').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu Xử lý kiểm định.', 'error');
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
        $('#txtTenNhanVienKT1').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {
                $('#txtChucVuKH1').val(suggestion.TenChucVu);
            }
        });
        $('#txtTenNhanVienKT2').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {
                $('#txtChucVuKT2').val(suggestion.TenChucVu);
            }
        }); 
        $('#txtNhanVienKetThucHoSo').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {
                
            }
        });
    }

    function loadGDNXuLyKiemDinhNuocUpdate(giaydenghiDMCCDVNuocId) {
        $.ajax({
            type: "GET",
            url: "/Admin/KDNuocKS/GetGDNKDNuocId",
            data: {
                id: giaydenghiDMCCDVNuocId
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var gdndmccnuoc = response.Result;

                $('#txtNgayLapBBYCKD').val(tedu.getFormattedDate(gdndmccnuoc.NgayLapBBYeuCauKiemDinh));

                $('#txtTenNhanVien1').val(gdndmccnuoc.TenNhanVienLapBBYeuCau1);
                $('#txtChucVu1').val(gdndmccnuoc.ChucVuNhanVienLapBBYeuCau1);
                $('#txtTenNhanVien2').val(gdndmccnuoc.TenNhanVienLapBBYeuCau2);
                $('#txtChucVu2').val(gdndmccnuoc.ChucVuNhanVienLapBBYeuCau2);
                $('#txtDaiDienKhachHang').val(gdndmccnuoc.TenDaiDienKhachHang);
                $('#txtDanhSoKhachHang').val(gdndmccnuoc.DanhSoKhachHang);
                $('#txtNoiDungBBYeuCauKiemDinh').val(gdndmccnuoc.NoiDungBBYeuCauKiemDinh);
                $('#txtNgayLapBBKiemTraDongHoKHYC').val(tedu.getFormattedDate(gdndmccnuoc.NgayLapBBKiemTraDongHoKHYC));
                $('#txtTenNhanVienKT1').val(gdndmccnuoc.TenNhanVienLapBBKiemTraDHKHYC1Id);
                $('#txtChucVuKH1').val(gdndmccnuoc.ChucVuNhanVienLapBBKiemTraDHKHYC1Id);
                $('#txtTenNhanVienKT2').val(gdndmccnuoc.TenNhanVienLapBBKiemTraDHKHYC2Id);
                $('#txtChucVuKT2').val(gdndmccnuoc.ChucVuNhanVienLapBBKiemTraDHKHYC2Id);
                $('#txtDaiDienKhachHangKT').val(gdndmccnuoc.TenDaiDienKhachHangKiemTra);
                $('#txtDanhSoKhachHangKT').val(gdndmccnuoc.DanhSoKhachHangKiemTra);

                $('#txtHieuDongHo').val(gdndmccnuoc.HieuDongHo);
                $('#txtSoNoDongHo').val(gdndmccnuoc.SoNo);
                $('#txtNuocSanXuat').val(gdndmccnuoc.NuocSanXuat);
                $('#txtCoDongHo').val(gdndmccnuoc.CoDongHo);
                $('#txtChiSoTichLuy').val(gdndmccnuoc.ChiSoTichLuy);
                $('#txtThoiGianLapDat').val(tedu.getFormattedDate(gdndmccnuoc.NgayLapDongHo));

                $('#txtHieuDongHoChoKiemDinh').val(gdndmccnuoc.HieuDongHoChoKiemDinh);
                $('#txtSoNoDongHoChoKiemDinh').val(gdndmccnuoc.SoNoLapChoKiemDinh);
                $('#txtNuocSanXuatChoKiemDinh').val(gdndmccnuoc.NuocSanXuatChoKiemDinh);
                $('#txtCoDongHoChoKiemDinh').val(gdndmccnuoc.CoDongHoChoKiemDinh);
                $('#txtChiSoTichLuyChoKiemDinh').val(gdndmccnuoc.SoTichLuyChoKiemDinh);
                $('#txtThoiGianLapDatChoKiemDinh').val(tedu.getFormattedDate(gdndmccnuoc.NgayLapChoKiemDinh));

                $('#txtChieuCaoLapDatChoKiemDinh').val(gdndmccnuoc.ChieuCaoLapChoKiemDinh);
                $('#txtViTriLapDatChoKiemDinh').val(gdndmccnuoc.ViTriLapChoKiemDinh);
                $('#txtKhoanCachLapDatChoKiemDinh').val(gdndmccnuoc.KhoangCachLapChoKiemDinh);
                $('#txtGhiChu').val(gdndmccnuoc.GhiChu);

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

}