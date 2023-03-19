var tuchoinuocController = function () {
    var userName = $("#hidUserName").val();

    this.loadEditTuChoiNuoc = function () {
        loadEditTuChoiNuoc();
    }

    this.initialize = function () {
        registerEvents();
        clearTuChoiNuoc();
    }

    function registerEvents() {
        $('#txtNgayTuChoiGDNNuoc ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        $('#btnSaveTuChoiGDNNuoc').on('click', function () {
            var inup = $('#hidInsertUpdateTTDangKyNuoc').val()
            //1: insert; 2: update
            if (inup == 2) {
                saveTuChoiNuoc();
            }
        });

        $('#btnPhucHoiTuChoiGDNNuoc').on('click', function () {
            var inup = $('#hidInsertUpdateTTDangKyNuoc').val()
            //1: insert; 2: update
            if (inup == 2) {
                phuchoiTuChoiNuoc();
            }
        });

    }

    function clearTuChoiNuoc() {
        var datenow = new Date();
        $('#txtNgayTuChoiGDNNuoc').val(tedu.getFormattedDate(datenow));
        $("#txtNhanVienTuChoiGDNNuoc").val('');
        $("#txtGhiChuTuChoiGDNNuoc").val('');
    }

    function loadEditTuChoiNuoc() {
        var dangkynuocid = $('#hidTTDangKyNuoc').val();

        $.ajax({
            type: "GET",
            url: "/Admin/ttdangkytt/GetDkNuoc",
            data: {
                dangkynuocId: dangkynuocid
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var tuchoi = response.Result;

                clearTuChoiNuoc();
                var datenow = new Date();

                $('#txtNgayTuChoiGDNNuoc').val(tuchoi.NgayTuChoi == "0001-01-01T00:00:00" ?
                    tedu.getFormattedDate(datenow) : tedu.getFormattedDate(tuchoi.NgayTuChoi));
                $("#txtNhanVienTuChoiGDNNuoc").val(tuchoi.TenNhanVienTuChoi == "null" ? '' : tuchoi.TenNhanVienTuChoi);
                $("#txtGhiChuTuChoiGDNNuoc").val(tuchoi.LyDoTuChoi == "null" ? '' : tuchoi.LyDoTuChoi);

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function saveTuChoiNuoc() {
        var dangkynuocid = $('#hidTTDangKyNuoc').val();

        var ngaytuchoi = tedu.getFormatDateYYMMDD($('#txtNgayTuChoiGDNNuoc').val());
        //var nhanvientuchoi = $("#txtNhanVienTuChoiGDNDien").val();
        var ghichutuchoi = $("#txtGhiChuTuChoiGDNNuoc").val();

        $.ajax({
            type: "POST",
            url: "/Admin/ttdangkytt/TuChoiNuoc",
            data: {
                dangkynuocId: dangkynuocid,

                NgayTuChoi: ngaytuchoi,
                LyDoTuChoi: ghichutuchoi
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Lưu từ chối giấy đăng ký nước hồ sơ.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Lưu chối giấy đăng ký nước.");

                    tedu.notify('Lưu từ chối giấy đăng ký nước hồ sơ.', 'success');

                    loadTableTTDangKyNuoc(true);

                    $('#modal-add-edit-TuChoiGDNNuoc').modal('hide');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu từ chối giấy đăng ký nước hồ sơ.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function phuchoiTuChoiNuoc() {
        var dangkynuocid = $('#hidTTDangKyNuoc').val();

        //var ngaytuchoi = tedu.getFormatDateYYMMDD($('#txtNgayTuChoiGDNDien').val());
        var ghichutuchoi = $("#txtGhiChuTuChoiGDNNuoc").val();

        $.ajax({
            type: "POST",
            url: "/Admin/ttdangkytt/PhucHoiNuoc",
            data: {
                dangkynuocId: dangkynuocid,

                //NgayTuChoi: ngaytuchoi,
                LyDoTuChoi: ghichutuchoi
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Phục hồi từ chối giấy đăng ký nước hồ sơ.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Phục hồi từ chối giấy đăng ký nước.");

                    tedu.notify('Lưu Phục hồi từ chối giấy đăng ký nước hồ sơ.', 'success');

                    loadTableTTDangKyNuoc(true);

                    clearTuChoiNuoc();

                    $('#modal-add-edit-TuChoiGDNNuoc').modal('hide');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu Phục hồi từ chối giấy đăng ký nước hồ sơ.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function loadTableTTDangKyNuoc(isPageChanged) {
        var template = $('#table-TTDangKyNuoc').html();
        var render = "";

        var Huyen = $('#ddlKhuVuc').val();
        var tensdt = $('#txtTimKhachHangTenSDTNuoc').val();

        $.ajax({
            type: 'GET',
            url: '/admin/ttdangkytt/GetListDkNuoc',
            data: {
                tinh: '89',
                huyen: Huyen,
                keyword: tensdt,
                page: tedu.configs.pageIndex,
                pageSize: tedu.configs.pageSize
            },
            dataType: 'json',
            success: function (response) {
                nguyen.appUserLoginLogger(userName, "Xem table Giấy đề nghị nước.");

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

                            ThoiGianNhanHoSo: nguyen.getFormattedDateTimeHourNguyen(item.ThoiGianNhanHoSo),
                            ThoiGianTraKetQuaHoSo: tedu.getFormattedDate(item.ThoiGianTraKetQuaHoSo),

                            TTDangyOnline: nguyen.getTTDangKyNuoc(item.TTDangyOnline)

                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                $('#lbTTDangKyNuocTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentTTDangKyNuoc').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingTTDangKyNuoc(response.Result.RowCount, function () {
                        loadTableTTDangKyNuoc();
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
    function wrapPagingTTDangKyNuoc(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULTTDangKyNuoc a').length === 0 || changePageSize === true) {
            $('#paginationULTTDangKyNuoc').empty();
            $('#paginationULTTDangKyNuoc').removeData("twbs-pagination");
            $('#paginationULTTDangKyNuoc').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULTTDangKyNuoc').twbsPagination({
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