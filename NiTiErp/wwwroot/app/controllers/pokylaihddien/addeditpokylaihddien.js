var addeditpokylaihddienController = function () {

    var userName = $("#hidUserName").val();

    this.addeditClearData = function () {
        addeditClearData();
    }

    this.loadEditThayDongHo = function () {
        loadEditThayDongHo();
    }

    this.loadTableThayHopDongDien = function () {
        loadTableThayHopDongDien(true);
    }

    this.initialize = function () {
        loadEditData();
        registerEvents();
    }

    function registerEvents() {

        $('#txtTHDTNgayKTHD, #txtTHDNgayHL, #txtTHDNgayHetHan, #txtTHDNgaySinhKH, #txtTHDNgayUyQuyen, #txtTHDNgayCapKH').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        $("#ddlThanhPhoHuyenTinhNoiLD").on('change', function () {
            let huyen = $("#ddlThanhPhoHuyenTinhNoiLD").val();
            PhuongXa(huyen);
            //// 883: Long Xuyen
            //if (huyen == 883) {                
            //    $('#ddlThanhPhoHuyenTinhNoiLD')[0].selectedIndex = 0;
            //} else {
            //    PhuongXa(huyen);
            //}
        });

        $("#ddlTinhKhachHang").on('change', function () {
            let tinh = $("#ddlTinhKhachHang").val();
            HuyenKhachHang(tinh);
        });

        $("#ddlThanhPhoHuyenKhachHang").on('change', function () {
            let huyen = $("#ddlThanhPhoHuyenKhachHang").val();
            PhuongXaKhachHang(huyen);
        });

        $("#btnTimKhachHang").on('click', function () {
            $('#modal-add-edit-TimKhachHang').modal('show');
        });

        $('#btnSaveEditThayHD').on('click', function () {
            var isthayhopdong = $('#hidInsertUpdateThayHopDongPoId').val(); // 1: insert; 2: update; 
            var thayhopdongtheo = $('#ddlTHDThayHopDongTheo').val();

            if (thayhopdongtheo !== "0") { //Kiem tra truoc khi dua vao thay doi chi tiet
                loadKhoaSo();
            }
            else {
                if (isthayhopdong == "1") {
                    saveThayHopDong();
                } else if (isthayhopdong == "2") {
                    updateThayHopDong();
                }
            }
        });       

    }

    function loadEditData() {
        ThayHopDongTheoTDCT();

        MucDichSuDung();

        tinhHuyenXa();
        PhuongXaAll();

        tinhAll();

        var render1 = "<option value='0' >--- Bỏ chọn ---</option>";
        $('#ddlThanhPhoHuyenKhachHang').html(render1);
        $("#ddlThanhPhoHuyenKhachHang")[0].selectedIndex = 0;

        var render2 = "<option value='0' >--- Bỏ chọn ---</option>";
        $('#ddlPhuongXaKhachHang').html(render2);
        $("#ddlPhuongXaKhachHang")[0].selectedIndex = 0;
    }

    function addeditClearData() {
        var datenow = new Date();

        $("#ddlTHDThayHopDongTheo")[0].selectedIndex = 0;
        $("#ddlTHDLoaiHopDong")[0].selectedIndex = 0;

        $("#txtTHDNamThay").val(tedu.getFormattedDateYYYY(datenow));
        $("#txtTHDKyThay").val(tedu.getFormattedDateMM(datenow));

        $('#txtTHDTNgayKTHD').val(tedu.getFormattedDate(datenow));
        $('#txtTHDNgayHL').val(tedu.getFormattedDate(datenow));
        $('#txtTHDNgayHetHan').val(tedu.getFormattedDate(datenow));

        $('#txtTHDTenKhachHangCu').val('');
        $('#txtTHDDiaChiLDCu').val('');
        $('#ddlTHDMaMDSDCu')[0].selectedIndex = 0;
        $('#txtTHDMaSoThueCu').val('');

        $('#txtTHDTenKhachHangMoi').val('');
        $('#ddlTinhNoiLD')[0].selectedIndex = 0;
        $('#ddlThanhPhoHuyenTinhNoiLD')[0].selectedIndex = 0;
        $('#ddlPhuongXaTinhNoiLD')[0].selectedIndex = 0;
        $('#txtTenDuongApToTinhNoiLD').val('');
        $('#txtSONHA2').val('');

        $('#ddlTHDMaMDSDMoi')[0].selectedIndex = 0;
        $('#txtTHDMaSoThueMoi').val('');

        $('#txtTHDTenNguoiUyQuyen').val('');
        $('#txtTHDTenChucVu').val('');
        $('#txtTHDSoGiayUyQuyen').val('');
        $('#txtTHDNgayUyQuyen').val(tedu.getFormattedDate(datenow));
        $('#txtTHDDonViUyQuyen').val('');
        $('#txtTHDNgaySinhKH').val(tedu.getFormattedDate(datenow));

        $('#txtTHDSoCCCDCMND').val('');
        $('#txtTHDNgayCapKH').val(tedu.getFormattedDate(datenow));
        $('#txtTHDNoiCapKH').val('');

        $('#ddlTinhKhachHang')[0].selectedIndex = 0;
        $('#ddlThanhPhoHuyenKhachHang')[0].selectedIndex = 0;
        $('#ddlPhuongXaKhachHang')[0].selectedIndex = 0;
        $('#txtTenDuongKhachHang').val('');
        $('#txtSoNhaKhachHang').val('');
        $('#txtSoDienThoaiKH').val('');

        $('#txtGhiChuThayHopDong').val('');
    }

    function isFormMainValidate() {
        if ($('#frmMainEditThayHopDongDien').valid()) {
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
        $('#frmMainEditThayHopDongDien').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                ddlTHDLoaiHopDong: {
                    required: true,
                    isDanhMuc: true
                },
                ddlTHDKhuVuc: {
                    required: true,
                    isDanhMuc: true
                },
                txtTHDKyThay: {
                    required: true,
                },
                txtTHDNamThay: {
                    required: true,
                },
                txtTHDTNgayKTHD: {
                    required: true,
                    isDateVietNam: true
                },
                txtTHDNgayHL: {
                    required: true,
                    isDateVietNam: true
                },
                txtTHDNgayHetHan: {
                    required: true,
                    isDateVietNam: true
                },
                txtTHDTenKhachHangMoi: {
                    required: true,
                },
                ddlTinhNoiLD: {
                    required: true,
                    isDanhMuc: true
                },
                ddlThanhPhoHuyenTinhNoiLD: {
                    required: true,
                    isDanhMuc: true
                },
                ddlPhuongXaTinhNoiLD: {
                    required: true,
                    isDanhMuc: true
                },
                ddlTHDMaMDSDMoi: {
                    required: true,
                    isDanhMuc: true
                },

            },
            //messages: {
            //    txtTrichYeu: { required: "Nhập nội dung trích yếu của văn bản.." }
            //}
        });
    }

    function tinhHuyenXa() {
        var render = "<option value='89' >Tỉnh An Giang</option>";
        $('#ddlTinhNoiLD').html(render);
        $("#ddlTinhNoiLD")[0].selectedIndex = 0;

        let tinh = $('#ddlTinhNoiLD').val();
        Huyen(tinh);

        //var render2 = "<option value='0' >--- Bỏ chọn ---</option>";
        //$('#ddlPhuongXaTinhNoiLD').html(render2);
        //$("#ddlPhuongXaTinhNoiLD")[0].selectedIndex = 0;
    }

    function Huyen(tinh) {
        return $.ajax({
            type: 'GET',
            url: '/ttdangkytt/Huyen',
            data: {
                Tinh: tinh
            },
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >--- Bỏ chọn ---</option>";
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenQuanHuyen + "</option>";
                });
                $('#ddlThanhPhoHuyenTinhNoiLD').html(render);
                $("#ddlThanhPhoHuyenTinhNoiLD")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục Huyện / Thành Phố.', 'error');
            }
        });
    }

    function PhuongXa(huyen) {
        return $.ajax({
            type: 'GET',
            url: '/ttdangkytt/PhuongXa',
            data: {
                Huyen: huyen
            },
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >--- Bỏ chọn ---</option>";
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenPhuongXa + "</option>";
                });
                $('#ddlPhuongXaTinhNoiLD').html(render);
                $("#ddlPhuongXaTinhNoiLD")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục phường / xã.', 'error');
            }
        });
    }

    function PhuongXaAll() {
        return $.ajax({
            type: 'GET',
            url: '/ttdangkytt/PhuongXaAll',
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >--- Bỏ chọn ---</option>";
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenPhuongXa + "</option>";
                });
                $('#ddlPhuongXaTinhNoiLD').html(render);
                $("#ddlPhuongXaTinhNoiLD")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục phường / xã.', 'error');
            }
        });
    }

    function tinhAll() {
        return $.ajax({
            type: 'GET',
            url: '/PoKyLaiHDNuoc/ListTinh',
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >--- Bỏ chọn ---</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenTinh + "</option>";
                });
                $("#ddlTinhKhachHang").html(render);
                $("#ddlTinhKhachHang")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục Tỉnh.', 'error');
            }
        });
    }

    function HuyenKhachHang(tinh) {
        return $.ajax({
            type: 'GET',
            url: '/ttdangkytt/Huyen',
            data: {
                Tinh: tinh
            },
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >--- Bỏ chọn ---</option>";
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenQuanHuyen + "</option>";
                });
                $('#ddlThanhPhoHuyenKhachHang').html(render);
                $("#ddlThanhPhoHuyenKhachHang")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục Huyện / Thành Phố.', 'error');
            }
        });
    }

    function PhuongXaKhachHang(huyen) {
        return $.ajax({
            type: 'GET',
            url: '/ttdangkytt/PhuongXa',
            data: {
                Huyen: huyen
            },
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >--- Bỏ chọn ---</option>";
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenPhuongXa + "</option>";
                });
                $('#ddlPhuongXaKhachHang').html(render);
                $("#ddlPhuongXaKhachHang")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục phường / xã.', 'error');
            }
        });
    }

    function ThayHopDongTheoTDCT() {
        return $.ajax({
            type: 'GET',
            url: '/admin/PoKyLaiHDNuoc/PoDieuKien',
            data: { DieuKien: 'ThayHopDongTheoTDCT' },
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >-- Bỏ chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Ten + "</option>";
                });
                $('#ddlTHDThayHopDongTheo').html(render);

                $("#ddlTHDThayHopDongTheo")[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

    function MucDichSuDung() {
        return $.ajax({
            type: 'GET',
            url: '/admin/PoKyLaiHDDien/ListMDSD',
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >-- Bỏ chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.MAMDSDPO + "'>" + item.TENMDSD + "</option>";
                });
                $('#ddlTHDMaMDSDCu').html(render);
                $("#ddlTHDMaMDSDCu")[0].selectedIndex = 1;

                $('#ddlTHDMaMDSDMoi').html(render);
                $("#ddlTHDMaMDSDMoi")[0].selectedIndex = 1;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

    function loadTableThayHopDongDien(isPageChanged) {
        var template = $('#table-THAYHOPDONG').html();
        var render = "";

        var khuvuc = $('#ddlKhuVuc').val();
        var loaihopdong = $('#ddlLoaiHopDong').val();
        var dshopdongtheo = $('#ddlDanhSachHopDongTheo').val();
        var timnoidung = $('#txtTimNoiDung').val();

        $.ajax({
            type: 'GET',
            url: '/admin/PoKyLaiHDDien/GetListTHD',
            data: {
                KhuVuc: khuvuc,
                LoaiHopDong: loaihopdong,
                DSHopDongTheo: dshopdongtheo,
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
                            IDTHDPO: item.IDTHDPO,
                            ThayHopDongPoIdMaKvPo: item.ThayHopDongPoIdMaKvPo,

                            MaKhachHangPo: item.MaKhachHangPo,
                            KyThayHopDong: item.KyThayHopDong,
                            TENKHMOI: item.TENKHMOI,
                            TENKV: item.TENKV,
                            NGAYHL: tedu.getFormattedDate(item.NGAYHL),
                            NgayHetHan: tedu.getFormattedDate(item.NgayHetHan !== "0001-01-01T00:00:00" ? item.NgayHetHan : ""),
                            TTThayHopDongDien: nguyen.getTTThayHopDongNuoc(item.TTThayHopDongDien)
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                $('#lbTHAYHOPDONGTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentTHAYHOPDONG').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingThayHopDongDien(response.Result.RowCount, function () {
                        loadTableThayHopDongDien();
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
    function wrapPagingThayHopDongDien(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULTHAYHOPDONG a').length === 0 || changePageSize === true) {
            $('#paginationULTHAYHOPDONG').empty();
            $('#paginationULTHAYHOPDONG').removeData("twbs-pagination");
            $('#paginationULTHAYHOPDONG').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULTHAYHOPDONG').twbsPagination({
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

    function saveThayHopDong() {
        var thayhopdongid = $('#hidThayHopDongPoId').val();

        var makhachhang = $('#hidMaKhachHangPoId').val();

        var thayhopdongtheo = $("#ddlTHDThayHopDongTheo").val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var loaihopdong = $("#ddlTHDLoaiHopDong").val();

            var namthay = $("#txtTHDNamThay").val();
            var thangthay = $("#txtTHDKyThay").val();

            var ngaykyhopdong = tedu.getFormatDateYYMMDD($('#txtTHDTNgayKTHD').val());
            var ngayhieuluc = tedu.getFormatDateYYMMDD($('#txtTHDNgayHL').val());
            var ngayhethan = tedu.getFormatDateYYMMDD($('#txtTHDNgayHetHan').val());

            var tenkhachhangmoild = $('#txtTHDTenKhachHangMoi').val();
            var tinhkhld = $('#ddlTinhNoiLD').val();
            var thanhphokhld = $('#ddlThanhPhoHuyenTinhNoiLD').val();
            var phuongxald = $('#ddlPhuongXaTinhNoiLD').val();
            var tenduongaptold = $('#txtTenDuongApToTinhNoiLD').val();
            var sonhald = $('#txtSONHA2').val();

            var mdsdmoi = $('#ddlTHDMaMDSDMoi').val();
            var masothuemoi = $('#txtTHDMaSoThueMoi').val();

            var tennguoiuyquyen = $('#txtTHDTenNguoiUyQuyen').val();
            var tenchucvu = $('#txtTHDTenChucVu').val();
            var sogiayuyquyen = $('#txtTHDSoGiayUyQuyen').val();
            var ngayuyquyen = tedu.getFormatDateYYMMDD($('#txtTHDNgayUyQuyen').val());
            var donviuyquyen = $('#txtTHDDonViUyQuyen').val();
            var ngaysinhkh = tedu.getFormatDateYYMMDD($('#txtTHDNgaySinhKH').val());

            var socccd = $('#txtTHDSoCCCDCMND').val();
            var ngaycapkh = tedu.getFormatDateYYMMDD($('#txtTHDNgayCapKH').val());
            var noicapkh = $('#txtTHDNoiCapKH').val();

            var tinhkh = $('#ddlTinhKhachHang').val();
            var thanhphohuyenkh = $('#ddlThanhPhoHuyenKhachHang').val();
            var phuongxakh = $('#ddlPhuongXaKhachHang').val();
            var tenduongkh = $('#txtTenDuongKhachHang').val();
            var sonhakh = $('#txtSoNhaKhachHang').val();
            var sodienthoaikh = $('#txtSoDienThoaiKH').val();

            var ghichuhopdong = $('#txtGhiChuThayHopDong').val();

            $.ajax({
                type: "POST",
                url: "/Admin/PoKyLaiHDDien/SaveThayHDong",
                data: {
                    IDTHDPO: thayhopdongid,

                    MaKhachHangPo: makhachhang,

                    ThayHopDongPoIdMaKvPo: thayhopdongtheo,

                    HopDongLoaiId: loaihopdong,

                    NAM: namthay,
                    THANG: thangthay,

                    NGAYKT: ngaykyhopdong,
                    NGAYHL: ngayhieuluc,
                    NgayHetHan: ngayhethan,

                    TENKHMOI: tenkhachhangmoild,
                    ThanhPhoTinhIdLD: tinhkhld,
                    QuanHuyenIdLD: thanhphokhld,
                    PhuongXaIdLD: phuongxald,
                    TenDuongLD: tenduongaptold,
                    SoNhaLD: sonhald,

                    MaMDSDMoi: mdsdmoi,
                    MaSoThueMoi: masothuemoi,

                    UYQUYEN: tennguoiuyquyen,
                    TENCHUCVU: tenchucvu,
                    SoGiayUyQuyen: sogiayuyquyen,
                    NgayUyQuyen: ngayuyquyen,
                    DonViUyQuyen: donviuyquyen,
                    NGAYSINH: ngaysinhkh,

                    CMND: socccd,
                    CAPNGAY: ngaycapkh,
                    TAI: noicapkh,

                    ThanhPhoTinhIdKH: tinhkh,
                    QuanHuyenIdKH: thanhphohuyenkh,
                    PhuongXaIdKH: phuongxakh,
                    TenDuongApToKH: tenduongkh,
                    SoNhaKH: sonhakh,
                    DIENTHOAI: sodienthoaikh,

                    LYDO: ghichuhopdong
                },
                dataType: "json",
                beforeSend: function () {
                    nguyen.startLoading();
                    $('#modal-add-edit-EditThayHopDongDien').modal('hide');
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Thay hợp đồng.", "error");
                    }
                    else {
                        tedu.notify('Lưu Thay hợp đồng.', 'success');

                        nguyen.appUserLoginLogger(userName, 'Nhập thay hợp đồng Điện mới');

                        loadTableThayHopDongDien(true);

                        addeditClearData();

                        nguyen.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể lưu Thay hợp đồng.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function loadKhoaSo() {
        var makhachhang = $('#hidMaKhachHangPoId').val();
        var namthay = $("#txtTHDNamThay").val();
        var thangthay = $("#txtTHDKyThay").val();

        $.ajax({
            type: "POST",
            url: "/Admin/PoKyLaiHDDien/KhoaSo",
            data: {
                MaKhachHangPo: makhachhang,
                NAM: namthay,
                THANG: thangthay
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var lockstatus = response.Result;

                if (lockstatus.LOCKTINHCUOC == 1) {
                    tedu.notify("Khách hàng đã khóa sổ.Chọn khách hàng khác.", "error");
                }
                else if (lockstatus.LOCKTINHCUOC == 0) {
                    var isthayhopdong = $('#hidInsertUpdateThayHopDongPoId').val(); // 1: insert; 2: update; 
                    if (isthayhopdong == "1") {
                        saveThayHopDong();
                    } else if (isthayhopdong == "2") {
                        updateThayHopDong();
                    }
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không load dữ liệu.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function loadEditThayDongHo() {
        var thayhopdongidmakv = $('#hidThayHopDongPoIdMaKvPo').val();
        var datenow = new Date();
        $.ajax({
            type: "GET",
            url: "/Admin/PoKyLaiHDDien/GetTHDId",
            data: {
                ThayHopDongPoIdMakvPo: thayhopdongidmakv
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var thayhopdong = response.Result;

                addeditClearData();

                $("#ddlTHDThayHopDongTheo").val(thayhopdong.MaThayHopDongTheoTDCT !== null ? thayhopdong.MaThayHopDongTheoTDCT : "0");
                $("#ddlTHDLoaiHopDong").val(thayhopdong.HopDongLoaiId !== null ? thayhopdong.HopDongLoaiId : "0");

                $("#txtTHDNamThay").val(thayhopdong.NAM !== null ? thayhopdong.NAM : '');
                $("#txtTHDKyThay").val(thayhopdong.THANG !== null ? thayhopdong.THANG : '');

                $('#txtTHDTNgayKTHD').val(thayhopdong.NGAYKT !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(thayhopdong.NGAYKT) : tedu.getFormattedDate(datenow));
                $('#txtTHDNgayHL').val(thayhopdong.NGAYHL !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(thayhopdong.NGAYHL) : tedu.getFormattedDate(datenow));
                $('#txtTHDNgayHetHan').val(thayhopdong.NgayHetHan !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(thayhopdong.NgayHetHan) : tedu.getFormattedDate(datenow));

                $('#txtTHDTenKhachHangCu').val(thayhopdong.TENKHCU !== null ? thayhopdong.TENKHCU : '');
                //$('#txtTHDDiaChiLDCu').val(thayhopdong.NgayHetHan !== null ? thayhopdong.NgayHetHan : '');
                //$('#ddlTHDMaMDSDCu').val('');
                //$('#txtTHDMaSoThueCu').val('');

                $('#txtTHDTenKhachHangMoi').val(thayhopdong.TENKHMOI !== null ? thayhopdong.TENKHMOI : '');
                $('#ddlTinhNoiLD').val('89');
                $('#ddlThanhPhoHuyenTinhNoiLD').val(thayhopdong.QuanHuyenIdLD !== null ? thayhopdong.QuanHuyenIdLD : '0');
                $('#ddlPhuongXaTinhNoiLD').val(thayhopdong.PhuongXaIdLD !== null ? thayhopdong.PhuongXaIdLD : '0');
                $('#txtTenDuongApToTinhNoiLD').val(thayhopdong.TenDuongLD !== null ? thayhopdong.TenDuongLD : '');
                $('#txtSONHA2').val(thayhopdong.SoNhaLD !== null ? thayhopdong.SoNhaLD : '');

                $('#ddlTHDMaMDSDMoi').val(thayhopdong.MaMDSDMoi !== null ? thayhopdong.MaMDSDMoi : 'S');
                $('#txtTHDMaSoThueMoi').val(thayhopdong.MaSoThueMoi !== null ? thayhopdong.MaSoThueMoi : '');

                $('#txtTHDTenNguoiUyQuyen').val(thayhopdong.UYQUYEN !== null ? thayhopdong.UYQUYEN : '');
                $('#txtTHDTenChucVu').val(thayhopdong.TENCHUCVU !== null ? thayhopdong.TENCHUCVU : '');
                $('#txtTHDSoGiayUyQuyen').val(thayhopdong.SoGiayUyQuyen !== null ? thayhopdong.SoGiayUyQuyen : '');
                $('#txtTHDNgayUyQuyen').val(thayhopdong.NgayUyQuyen !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(thayhopdong.NgayUyQuyen) : tedu.getFormattedDate(datenow));
                $('#txtTHDDonViUyQuyen').val(thayhopdong.DonViUyQuyen !== null ? thayhopdong.DonViUyQuyen : '');
                $('#txtTHDNgaySinhKH').val(thayhopdong.NGAYSINH !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(thayhopdong.NGAYSINH) : tedu.getFormattedDate(datenow));

                $('#txtTHDSoCCCDCMND').val(thayhopdong.CMND !== null ? thayhopdong.CMND : '');
                $('#txtTHDNgayCapKH').val(thayhopdong.CAPNGAY !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(thayhopdong.CAPNGAY) : tedu.getFormattedDate(datenow));
                $('#txtTHDNoiCapKH').val(thayhopdong.TAI !== null ? thayhopdong.TAI : '');

                $('#ddlTinhKhachHang').val(thayhopdong.ThanhPhoTinhIdKH !== null ? thayhopdong.ThanhPhoTinhIdKH : '0');
                $('#ddlThanhPhoHuyenKhachHang').val(thayhopdong.QuanHuyenIdKH !== null ? thayhopdong.QuanHuyenIdKH : '0');
                $('#ddlPhuongXaKhachHang').val(thayhopdong.PhuongXaIdKH !== null ? thayhopdong.PhuongXaIdKH : '0');
                $('#txtTenDuongKhachHang').val(thayhopdong.TenDuongApToKH !== null ? thayhopdong.TenDuongApToKH : '');
                $('#txtSoNhaKhachHang').val(thayhopdong.SoNhaKH !== null ? thayhopdong.SoNhaKH : '');
                $('#txtSoDienThoaiKH').val(thayhopdong.DIENTHOAI !== null ? thayhopdong.DIENTHOAI : '');

                $('#txtGhiChuThayHopDong').val(thayhopdong.LYDO !== null ? thayhopdong.LYDO : '');

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function updateThayHopDong() {
        var thaydonghoidmakv = $('#hidThayHopDongPoIdMaKvPo').val();

        var thayhopdongtheo = $("#ddlTHDThayHopDongTheo").val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var loaihopdong = $("#ddlTHDLoaiHopDong").val();

            var namthay = $("#txtTHDNamThay").val();
            var thangthay = $("#txtTHDKyThay").val();

            var ngaykyhopdong = tedu.getFormatDateYYMMDD($('#txtTHDTNgayKTHD').val());
            var ngayhieuluc = tedu.getFormatDateYYMMDD($('#txtTHDNgayHL').val());
            var ngayhethan = tedu.getFormatDateYYMMDD($('#txtTHDNgayHetHan').val());

            var tenkhachhangmoild = $('#txtTHDTenKhachHangMoi').val();
            var tinhkhld = $('#ddlTinhNoiLD').val();
            var thanhphokhld = $('#ddlThanhPhoHuyenTinhNoiLD').val();
            var phuongxald = $('#ddlPhuongXaTinhNoiLD').val();
            var tenduongaptold = $('#txtTenDuongApToTinhNoiLD').val();
            var sonhald = $('#txtSONHA2').val();

            var mdsdmoi = $('#ddlTHDMaMDSDMoi').val();
            var masothuemoi = $('#txtTHDMaSoThueMoi').val();

            var tennguoiuyquyen = $('#txtTHDTenNguoiUyQuyen').val();
            var tenchucvu = $('#txtTHDTenChucVu').val();
            var sogiayuyquyen = $('#txtTHDSoGiayUyQuyen').val();
            var ngayuyquyen = tedu.getFormatDateYYMMDD($('#txtTHDNgayUyQuyen').val());
            var donviuyquyen = $('#txtTHDDonViUyQuyen').val();
            var ngaysinhkh = tedu.getFormatDateYYMMDD($('#txtTHDNgaySinhKH').val());

            var socccd = $('#txtTHDSoCCCDCMND').val();
            var ngaycapkh = tedu.getFormatDateYYMMDD($('#txtTHDNgayCapKH').val());
            var noicapkh = $('#txtTHDNoiCapKH').val();

            var tinhkh = $('#ddlTinhKhachHang').val();
            var thanhphohuyenkh = $('#ddlThanhPhoHuyenKhachHang').val();
            var phuongxakh = $('#ddlPhuongXaKhachHang').val();
            var tenduongkh = $('#txtTenDuongKhachHang').val();
            var sonhakh = $('#txtSoNhaKhachHang').val();
            var sodienthoaikh = $('#txtSoDienThoaiKH').val();

            var ghichuhopdong = $('#txtGhiChuThayHopDong').val();

            $.ajax({
                type: "POST",
                url: "/Admin/PoKyLaiHDDien/UpThayHDong",
                data: {
                    ThayHopDongPoIdMaKvPo: thaydonghoidmakv,

                    ThayHopDongTheoTDCT: thayhopdongtheo,

                    HopDongLoaiId: loaihopdong,

                    NAM: namthay,
                    THANG: thangthay,

                    NGAYKT: ngaykyhopdong,
                    NGAYHL: ngayhieuluc,
                    NgayHetHan: ngayhethan,

                    TENKHMOI: tenkhachhangmoild,
                    ThanhPhoTinhIdLD: tinhkhld,
                    QuanHuyenIdLD: thanhphokhld,
                    PhuongXaIdLD: phuongxald,
                    TenDuongLD: tenduongaptold,
                    SoNhaLD: sonhald,

                    MaMDSDMoi: mdsdmoi,
                    MaSoThueMoi: masothuemoi,

                    UYQUYEN: tennguoiuyquyen,
                    TENCHUCVU: tenchucvu,
                    SoGiayUyQuyen: sogiayuyquyen,
                    NgayUyQuyen: ngayuyquyen,
                    DonViUyQuyen: donviuyquyen,
                    NGAYSINH: ngaysinhkh,

                    CMND: socccd,
                    CAPNGAY: ngaycapkh,
                    TAI: noicapkh,

                    ThanhPhoTinhIdKH: tinhkh,
                    QuanHuyenIdKH: thanhphohuyenkh,
                    PhuongXaIdKH: phuongxakh,
                    TenDuongApToKH: tenduongkh,
                    SoNhaKH: sonhakh,
                    DIENTHOAI: sodienthoaikh,

                    LYDO: ghichuhopdong
                },
                dataType: "json",
                beforeSend: function () {
                    nguyen.startLoading();
                    $('#modal-add-edit-EditThayHopDongDien').modal('hide');
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Thay hợp đồng.", "error");
                    }
                    else {
                        tedu.notify('Lưu Thay hợp đồng.', 'success');

                        nguyen.appUserLoginLogger(userName, 'Sửa thay hợp đồng Điện mới');

                        loadTableThayHopDongDien(true);

                        addeditClearData();

                        nguyen.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể lưu Thay hợp đồng.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }


}