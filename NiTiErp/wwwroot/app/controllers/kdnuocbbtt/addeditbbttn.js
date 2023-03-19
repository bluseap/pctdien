var addeditbbttnController = function () {

    this.loadGDNXuLyKiemDinhNuoc = function (giaydenghiDMCCDVNuocId) {
        loadGDNXuLyKiemDinhNuoc(giaydenghiDMCCDVNuocId);
    }

    this.loadTableGiayDeNghiDMCungCapNuoc = function () {
        loadTableGiayDeNghiDMCungCapNuoc();
    }

    this.initialize = function () {
        loadAddEditData();
        registerEvents();
        addeditClearData();
    }

    function registerEvents() {

        $('#txtNgayBBTTDieuChinhSanLuong ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        $('#btnSaveBBTTDieuChinhSanLuong').on('click', function () {
            var isgiaydenghi = $('#hidInsertGDNXuLyKiemDinhNuocId').val(); // 1: insert; 2: update; 

            if (isgiaydenghi == 1) {
                saveGDNXuLyKDNuocBBTT();
            } else if (isgiaydenghi == 2) {
                updateGDNXuLyKDNuocBBTT();
            }
            else {
                tedu.notify("Chưa lưu Biên bản thỏa thuận.", "error");
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
        $('#hidTrangThaiXuLyKiemDinh').val(0);
       
        $('#txtNgayBBTTDieuChinhSanLuong').val(tedu.getFormattedDate(datenow));
        $('#txtTenDaiDienKH').val('');
        $('#txtNoiDungLapBBThoaThuan').val('');            

        //$('#ddlDMCungCapDichVu')[0].selectedIndex = 0;
        //$('#tbl-contentDMCungCapDichVu').html('');            
    }

    function loadTableGiayDeNghiDMCungCapNuoc(isPageChanged) {
        var template = $('#table-KiemDinhNuocBBTT').html();
        var render = "";

        var makhuvuc = $('#ddlKhuVuc').val();
        var phongtoid = $('#ddlPhongTo').val();
        var timnoidung = $('#txtTimNoiDung').val();

        $.ajax({
            type: 'GET',
            url: '/admin/KDNuocBBTT/ListGDNNuocTTXL', //  TTKiemTraKiemDinh = 2 
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
                            TTXuLyKiemDinh: tedu.getGiayDeNghiTT(item.TTXuLyKiemDinh)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            //Price: tedu.formatNumber(item.Price, 0),
                        });
                    });
                }

                $('#lbKiemDinhNuocBBTTTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentKiemDinhNuocBBTT').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingKiemDinhNuocBBTT(response.Result.RowCount, function () {
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
    function wrapPagingKiemDinhNuocBBTT(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULKiemDinhNuocBBTT a').length === 0 || changePageSize === true) {
            $('#paginationULKiemDinhNuocBBTT').empty();
            $('#paginationULKiemDinhNuocBBTT').removeData("twbs-pagination");
            $('#paginationULKiemDinhNuocBBTT').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULKiemDinhNuocBBTT').twbsPagination({
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
            url: "/Admin/KDNuocBBTT/GetGDNDMCCNuocId",
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

                $('#hidTrangThaiDeNghi').val(gdndmccnuoc.TTDeNghi);
                $('#hidTrangThaiKiemTraKiemDinh').val(gdndmccnuoc.TTKiemTraKiemDinh);
                $('#hidTrangThaiXuLyKiemDinh').val(gdndmccnuoc.TTXuLyKiemDinh);

                var ttdenghi = gdndmccnuoc.TTDeNghi;
                var ttkiemtrakiemdinh = gdndmccnuoc.TTKiemTraKiemDinh;
                var ttxulykiemdinh = gdndmccnuoc.TTXuLyKiemDinh;

                if (ttkiemtrakiemdinh == 2 && ttxulykiemdinh == 3) { // 
                    $('#modal-add-edit-BBTTDieuChinhSanLuong').modal('show');

                    $('#hidInsertGDNXuLyKiemDinhNuocId').val(1); // 1: insert; 2: update;                     
                }
                else if (ttkiemtrakiemdinh == 2 && ttxulykiemdinh == 2) { // 2: Ok
                    $('#modal-add-edit-BBTTDieuChinhSanLuong').modal('show');

                    $('#hidInsertGDNXuLyKiemDinhNuocId').val(2); // 1: insert; 2: update; 

                    loadGDNXuLyKiemDinhNuocUp(giaydenghiDMCCDVNuocId);
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
        if ($('#frmMainBBTTDieuChinhSanLuong').valid()) {
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
        $('#frmMainBBTTDieuChinhSanLuong').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                txtNgayBBTTDieuChinhSanLuong: {
                    required: true,
                    isDateVietNam: true
                },
                txtTenDaiDienKH: {
                    required: true
                },
                txtNoiDungLapBBThoaThuan: {
                    required: true
                },                
            },
            //messages: {
            //    txtTrichYeu: { required: "Nhập nội dung trích yếu của văn bản.." }
            //}
        });
    }

    function saveGDNXuLyKDNuocBBTT() {
        var giaydenghidmcungcapnuocId = $('#hidGiayDeNghiDMCungCapNuocId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {            

            var ngaylap = tedu.getFormatDateYYMMDD($('#txtNgayBBTTDieuChinhSanLuong').val());
            var tendaidien = $('#txtTenDaiDienKH').val();
            var noidunglapbb = $('#txtNoiDungLapBBThoaThuan').val();            

            $.ajax({
                type: "POST",
                url: "/Admin/KDNuocBBTT/XLKDNuocBBTT",
                data: {
                    GiayDeNghiDMCungCapNuocId: giaydenghidmcungcapnuocId,

                    NgayLapBBThoaThuan: ngaylap,
                    TenDaiDienKH: tendaidien,
                    NoiDungLapBBThoaThuan: noidunglapbb
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu biên bản thỏa thuận.", "error");
                    }
                    else {
                        tedu.notify('Lưu biên bản thỏa thuận.', 'success');

                        loadTableGiayDeNghiDMCungCapNuoc(true);

                        addeditClearData();

                        $('#modal-add-edit-BBTTDieuChinhSanLuong').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu biên bản thỏa thuận.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function updateGDNXuLyKDNuocBBTT() {
        var giaydenghidmcungcapnuocId = $('#hidGiayDeNghiDMCungCapNuocId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var ngaylap = tedu.getFormatDateYYMMDD($('#txtNgayBBTTDieuChinhSanLuong').val());
            var tendaidien = $('#txtTenDaiDienKH').val();
            var noidunglapbb = $('#txtNoiDungLapBBThoaThuan').val();

            $.ajax({
                type: "POST",
                url: "/Admin/KDNuocBBTT/XLKDNuocBBTTUp",
                data: {
                    GiayDeNghiDMCungCapNuocId: giaydenghidmcungcapnuocId,

                    NgayLapBBThoaThuan: ngaylap,
                    TenDaiDienKH: tendaidien,
                    NoiDungLapBBThoaThuan: noidunglapbb
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu biên bản thỏa thuận.", "error");
                    }
                    else {
                        tedu.notify('Lưu biên bản thỏa thuận.', 'success');

                        loadTableGiayDeNghiDMCungCapNuoc(true);

                        addeditClearData();

                        $('#modal-add-edit-BBTTDieuChinhSanLuong').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu biên bản thỏa thuận.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function loadGDNXuLyKiemDinhNuocUp(giaydenghiDMCCDVNuocId) {
        $.ajax({
            type: "GET",
            url: "/Admin/KDNuocBBTT/GetGDNKDNuocId",
            data: {
                id: giaydenghiDMCCDVNuocId
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var gdndmccnuoc = response.Result;

                $('#txtNgayBBTTDieuChinhSanLuong').val(tedu.getFormattedDate(gdndmccnuoc.NgayLapBBThoaThuan));
                $('#txtTenDaiDienKH').val(gdndmccnuoc.TenDaiDienKH);
                $('#txtNoiDungLapBBThoaThuan').val(gdndmccnuoc.NoiDungLapBBThoaThuan);

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }


}