var xacnhandvdienController = function () {
    var userName = $("#hidUserName").val();

    this.loadEditXacNhanDVDien = function () {
        loadEditXacNhanDVDien();
    }

    this.initialize = function () {
        registerEvents();
        clearXacNhanDVDien();
    }

    function registerEvents() {
        $('#txtNgayXacNhanDVDien ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        $('#btnSaveXacNhanDVDien').on('click', function () {
            var inup = $('#hidInsertUpdateTTCacDichVuDien').val()
            //1: insert; 2: update
            if (inup == 2) {
                saveXacNhanDVDien();
            }
        });

        //$('#btnPhucHoiTuChoiDVDien').on('click', function () {
        //    var inup = $('#hidInsertUpdateTTCacDichVuDien').val()
        //    //1: insert; 2: update
        //    if (inup == 2) {
        //        phuchoiTuChoiDVDien();
        //    }
        //});

    }

    function clearXacNhanDVDien() {
        var datenow = new Date();
        $('#txtNgayXacNhanDVDien').val(tedu.getFormattedDate(datenow));
        $("#txtNhanVienXacNhanDVDien").val('');
        $("#txtGhiChuXacNhanDVDien").val('');
    }

    function loadEditXacNhanDVDien() {
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
                var xacnhan = response.Result;

                clearXacNhanDVDien();
                var datenow = new Date();

                $('#txtNgayXacNhanDVDien').val(xacnhan.NgayXacNhan == "0001-01-01T00:00:00" ?
                    tedu.getFormattedDate(datenow) : tedu.getFormattedDate(xacnhan.NgayXacNhan));
                $("#txtNhanVienXacNhanDVDien").val(xacnhan.TenNhanVienXacNhan == "null" ? '' : xacnhan.TenNhanVienXacNhan);
                $("#txtGhiChuXacNhanDVDien").val(xacnhan.LyDoXacNhan == "null" ? '' : xacnhan.LyDoXacNhan);

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function saveXacNhanDVDien() {
        var dichvudienid = $('#hidTTCacDichVuDien').val();

        var ngayxacnhan = tedu.getFormatDateYYMMDD($('#txtNgayXacNhanDVDien').val());
        //var nhanvientuchoi = $("#txtNhanVienTuChoiGDNDien").val();
        var ghichuxacnhan = $("#txtGhiChuXacNhanDVDien").val();

        $.ajax({
            type: "POST",
            url: "/Admin/ttdangkytt/XacNhanDvDien",
            data: {
                dichvudienId: dichvudienid,

                NgayXacNhan: ngayxacnhan,
                LyDoXacNhan: ghichuxacnhan
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Lưu xác nhận dịch vụ điện.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Lưu xác nhận dịch vụ điện.");

                    tedu.notify('Lưu xác nhận dịch vụ điện.', 'success');

                    loadTableTTCacDichVuDien(true);

                    $('#modal-add-edit-XacNhanDVDien').modal('hide');
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