var tuchoidvdienController = function () {
    var userName = $("#hidUserName").val();

    this.loadEditTuChoiDVDien = function () {
        loadEditTuChoiDVDien();
    }

    this.initialize = function () {
        registerEvents();
        clearTuChoiDVDien();
    }

    function registerEvents() {
        $('#txtNgayTuChoiDVDien ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        $('#btnSaveTuChoiDVDien').on('click', function () {
            var inup = $('#hidInsertUpdateTTCacDichVuDien').val()
            //1: insert; 2: update
            if (inup == 2) {
                saveTuChoiDVDien();
            }
        });

        $('#btnPhucHoiTuChoiDVDien').on('click', function () {
            var inup = $('#hidInsertUpdateTTCacDichVuDien').val()
            //1: insert; 2: update
            if (inup == 2) {
                phuchoiTuChoiDVDien();
            }
        });

    }

    function clearTuChoiDVDien() {
        var datenow = new Date();
        $('#txtNgayTuChoiDVDien').val(tedu.getFormattedDate(datenow));
        $("#txtNhanVienTuChoiDVDien").val('');
        $("#txtGhiChuTuChoiDVDien").val('');
    }

    function loadEditTuChoiDVDien() {
        var dichvudienid = $('#hidTTCacDichVuDien').val();

        $.ajax({
            type: "GET",
            url: "/Admin/ttdangkytt/GetDvDien",
            data: {
                dichvudienId: dichvudienid
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var tuchoi = response.Result;

                clearTuChoiDVDien();
                var datenow = new Date();

                $('#txtNgayTuChoiDVDien').val(tuchoi.NgayTuChoi == "0001-01-01T00:00:00" ?
                    tedu.getFormattedDate(datenow) : tedu.getFormattedDate(tuchoi.NgayTuChoi));
                $("#txtNhanVienTuChoiDVDien").val(tuchoi.TenNhanVienTuChoi == "null" ? '' : tuchoi.TenNhanVienTuChoi);
                $("#txtGhiChuTuChoiDVDien").val(tuchoi.LyDoTuChoi == "null" ? '' : tuchoi.LyDoTuChoi);

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function saveTuChoiDVDien() {
        var dichvudienid = $('#hidTTCacDichVuDien').val();

        var ngaytuchoi = tedu.getFormatDateYYMMDD($('#txtNgayTuChoiDVDien').val());
        //var nhanvientuchoi = $("#txtNhanVienTuChoiGDNDien").val();
        var ghichutuchoi = $("#txtGhiChuTuChoiDVDien").val();

        $.ajax({
            type: "POST",
            url: "/Admin/ttdangkytt/TuChoiDvDien",
            data: {
                dichvudienId: dichvudienid,

                NgayTuChoi: ngaytuchoi,
                LyDoTuChoi: ghichutuchoi
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Lưu từ chối dịch vụ điện hồ sơ.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Lưu chối dịch vụ ký điện.");

                    tedu.notify('Lưu từ chối dịch vụ điện hồ sơ.', 'success');

                    loadTableTTCacDichVuDien(true);

                    $('#modal-add-edit-TuChoiDVDien').modal('hide');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu từ chối dịch vụ điện hồ sơ.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function phuchoiTuChoiDVDien() {
        var dichvudienid = $('#hidTTCacDichVuDien').val();

        //var ngaytuchoi = tedu.getFormatDateYYMMDD($('#txtNgayTuChoiGDNDien').val());
        var ghichutuchoi = $("#txtGhiChuTuChoiDVDien").val();

        $.ajax({
            type: "POST",
            url: "/Admin/ttdangkytt/PhucHoiDvDien",
            data: {
                dichvudienId: dichvudienid,

                //NgayTuChoi: ngaytuchoi,
                LyDoTuChoi: ghichutuchoi
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Phục hồi từ chối dịch vụ điện hồ sơ.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Phục hồi từ chối dịch vụ điện.");

                    tedu.notify('Lưu Phục hồi từ chối dịch vụ điện hồ sơ.', 'success');

                    loadTableTTCacDichVuDien(true);

                    clearTuChoiDVDien();

                    $('#modal-add-edit-TuChoiDVDien').modal('hide');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu Phục hồi từ chối dịch vụ điện hồ sơ.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function loadTableTTCacDichVuDien(isPageChanged) {
        var template = $('#table-TTDangKyDVDien').html();
        var render = "";

        var Huyen = $('#ddlKhuVuc').val();
        var tensdt = $('#txtTimKhachHangTenSDTDVDien').val();

        $.ajax({
            type: 'GET',
            url: '/admin/ttdangkytt/GetListDvDien',
            data: {
                tinh: '89',
                huyen: Huyen,
                keyword: tensdt,
                page: tedu.configs.pageIndex,
                pageSize: tedu.configs.pageSize
            },
            dataType: 'json',
            success: function (response) {
                nguyen.appUserLoginLogger(userName, "Xem table Các dịch vụ điện.");

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

                $('#lbTTDangKyDVDienTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentTTDangKyDVDien').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingTTDichVuDien(response.Result.RowCount, function () {
                        loadTableTTDichVuDien();
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
    function wrapPagingTTDichVuDien(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULTTDangKyDVDien a').length === 0 || changePageSize === true) {
            $('#paginationULTTDangKyDVDien').empty();
            $('#paginationULTTDangKyDVDien').removeData("twbs-pagination");
            $('#paginationULTTDangKyDVDien').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULTTDangKyDVDien').twbsPagination({
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