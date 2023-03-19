var tuchoidvnuocController = function () {
    var userName = $("#hidUserName").val();

    this.loadEditTuChoiDVNuoc = function () {
        loadEditTuChoiDVNuoc();
    }

    this.initialize = function () {
        registerEvents();
        clearTuChoiDVNuoc();
    }

    function registerEvents() {
        $('#txtNgayTuChoiDVNuoc ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        $('#btnSaveTuChoiDVNuoc').on('click', function () {
            var inup = $('#hidInsertUpdateTTCacDichVuNuoc').val()
            //1: insert; 2: update
            if (inup == 2) {
                saveTuChoiDVNuoc();
            }
        });

        $('#btnPhucHoiTuChoiDVNuoc').on('click', function () {
            var inup = $('#hidInsertUpdateTTCacDichVuNuoc').val()
            //1: insert; 2: update
            if (inup == 2) {
                phuchoiTuChoiDVNuoc();
            }
        });

    }

    function clearTuChoiDVNuoc() {
        var datenow = new Date();
        $('#txtNgayTuChoiDVNuoc').val(tedu.getFormattedDate(datenow));
        $("#txtNhanVienTuChoiDVNuoc").val('');
        $("#txtGhiChuTuChoiDVNuoc").val('');
    }

    function loadEditTuChoiDVNuoc() {
        var dichvunuocid = $('#hidTTCacDichVuNuoc').val();

        $.ajax({
            type: "GET",
            url: "/Admin/ttdangkytt/GetDvNuoc",
            data: {
                dichvunuocId: dichvunuocid
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var tuchoi = response.Result;

                clearTuChoiDVNuoc();
                var datenow = new Date();

                $('#txtNgayTuChoiDVNuoc').val(tuchoi.NgayTuChoi == "0001-01-01T00:00:00" ?
                    tedu.getFormattedDate(datenow) : tedu.getFormattedDate(tuchoi.NgayTuChoi));
                $("#txtNhanVienTuChoiDVNuoc").val(tuchoi.TenNhanVienTuChoi == "null" ? '' : tuchoi.TenNhanVienTuChoi);
                $("#txtGhiChuTuChoiDVNuoc").val(tuchoi.LyDoTuChoi == "null" ? '' : tuchoi.LyDoTuChoi);

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function saveTuChoiDVNuoc() {
        var dichvunuocid = $('#hidTTCacDichVuNuoc').val();

        var ngaytuchoi = tedu.getFormatDateYYMMDD($('#txtNgayTuChoiDVNuoc').val());
        //var nhanvientuchoi = $("#txtNhanVienTuChoiGDNDien").val();
        var ghichutuchoi = $("#txtGhiChuTuChoiDVNuoc").val();

        $.ajax({
            type: "POST",
            url: "/Admin/ttdangkytt/TuChoiDvNuoc",
            data: {
                dichvunuocId: dichvunuocid,

                NgayTuChoi: ngaytuchoi,
                LyDoTuChoi: ghichutuchoi
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Lưu từ chối dịch vụ nước hồ sơ.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Lưu chối dịch vụ ký nước.");

                    tedu.notify('Lưu từ chối dịch vụ nước hồ sơ.', 'success');

                    loadTableTTCacDichVuNuoc(true);

                    clearTuChoiDVNuoc();

                    $('#modal-add-edit-TuChoiDVNuoc').modal('hide');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu từ chối dịch vụ nước hồ sơ.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function phuchoiTuChoiDVNuoc() {
        var dichvunuocid = $('#hidTTCacDichVuNuoc').val();

        //var ngaytuchoi = tedu.getFormatDateYYMMDD($('#txtNgayTuChoiGDNDien').val());
        var ghichutuchoi = $("#txtGhiChuTuChoiDVNuoc").val();

        $.ajax({
            type: "POST",
            url: "/Admin/ttdangkytt/PhucHoiDvNuoc",
            data: {
                dichvunuocId: dichvunuocid,

                //NgayTuChoi: ngaytuchoi,
                LyDoTuChoi: ghichutuchoi
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Phục hồi từ chối dịch vụ nước hồ sơ.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Phục hồi từ chối dịch vụ nước.");

                    tedu.notify('Lưu Phục hồi từ chối dịch vụ nước hồ sơ.', 'success');

                    loadTableTTCacDichVuNuoc(true);

                    clearTuChoiDVNuoc();

                    $('#modal-add-edit-TuChoiDVNuoc').modal('hide');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu Phục hồi từ chối dịch vụ điện hồ sơ.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function loadTableTTCacDichVuNuoc(isPageChanged) {
        var template = $('#table-TTDangKyDVNuoc').html();
        var render = "";

        var Huyen = $('#ddlKhuVuc').val();
        var tensdt = $('#txtTimKhachHangTenSDTDVNuoc').val();

        $.ajax({
            type: 'GET',
            url: '/admin/ttdangkytt/GetListDvNuoc',
            data: {
                tinh: '89',
                huyen: Huyen,
                keyword: tensdt,
                page: tedu.configs.pageIndex,
                pageSize: tedu.configs.pageSize
            },
            dataType: 'json',
            success: function (response) {
                nguyen.appUserLoginLogger(userName, "Xem table Các dịch vụ nước.");

                if (response.Result.Results.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result.Results, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,

                            HoTenNguoiYeuCau: item.HoTenNguoiYeuCau,
                            TenQuan: item.TenQuan,
                            NoiLap: item.SoNha + ',' + item.TenDuongApTo + ',' + item.Tenphuong,
                            SoTheCCCD: item.SoTheCCCD,
                            DienThoai: item.DienThoai,

                            DichVuKhachHang: item.DichVuKhachHang,

                            ThoiGianNhanHoSo: nguyen.getFormattedDateTimeHourNguyen(item.ThoiGianNhanHoSo),
                            ThoiGianTraKetQuaHoSo: tedu.getFormattedDate(item.ThoiGianTraKetQuaHoSo),

                            TTDichVuOnline: nguyen.getTTCacDichVuNuoc(item.TTDichVuOnline)

                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                $('#lbTTDangKyDVNuocTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentTTDangKyDVNuoc').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingTTDichVuNuoc(response.Result.RowCount, function () {
                        loadTableTTDichVuNuoc();
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
    function wrapPagingTTDichVuNuoc(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULTTDangKyDVNuoc a').length === 0 || changePageSize === true) {
            $('#paginationULTTDangKyDVNuoc').empty();
            $('#paginationULTTDangKyDVNuoc').removeData("twbs-pagination");
            $('#paginationULTTDangKyDVNuoc').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULTTDangKyDVNuoc').twbsPagination({
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

}