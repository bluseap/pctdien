var chuyentkController = function () {
    var userName = $("#hidUserName").val();

    this.loadEditXacNhanDkDien = function () {
        loadEditXacNhanDkDien();
    }

    this.initialize = function () {
        registerEvents();
        loadDataChuyenTK();
        clearChuyenTK();
    }

    function registerEvents() {
        $('#txtNgayChuyenTKGDNDien ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        $('#btnSaveChuyenTKDien').on('click', function () {
            var inup = $('#hidInsertUpdateTTDangKyDien').val()
            //1: insert; 2: update
            if (inup == 2) {
                saveXacNhan();
            }
        });
       
    }

    function clearChuyenTK() {
        var datenow = new Date();
        $('#txtNgayChuyenTKGDNDien').val(tedu.getFormattedDate(datenow));
        $("#txtNhanVienChuyenTKGDNDien").val('');
        //$("#ddlToPhongGDNDien")[0].selectedIndex = 0;
        $("#txtGhiChuChuyenTKGDNDien").val('');
    }    

    function loadDataChuyenTK() {

    }

    function saveXacNhan() {
        var dangkydienid = $('#hidTTDangKyDien').val();

        var ngayxacnhan = tedu.getFormatDateYYMMDD($('#txtNgayChuyenTKGDNDien').val());
        //var nhanvientuchoi = $("#txtNhanVienTuChoiGDNDien").val();
        var ghichuxacnhan = $("#txtGhiChuChuyenTKGDNDien").val();

        $.ajax({
            type: "POST",
            url: "/Admin/ttdangkytt/XacNhanDkDien",
            data: {
                dangkydienId: dangkydienid,

                NgayChuyenTK: ngayxacnhan,
                LyDoChuyenTK: ghichuxacnhan
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Lưu xác nhận đăng ký điện hồ sơ.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Lưu xác nhận giấy đăng ký điện.");

                    tedu.notify('Lưu xác nhận đăng ký điện hồ sơ.', 'success');

                    loadTableTTDangKyDien(true);

                    $('#modal-add-edit-ChuyenTK').modal('hide');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu xác nhận đăng ký điện hồ sơ.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function loadTableTTDangKyDien(isPageChanged) {
        var template = $('#table-TTDangKyDien').html();
        var render = "";

        var Huyen = $('#ddlKhuVuc').val();

        $.ajax({
            type: 'GET',
            url: '/admin/ttdangkytt/GetListDkDien',
            data: {
                tinh: '89',
                huyen: Huyen,
                keyword: '',
                page: tedu.configs.pageIndex,
                pageSize: tedu.configs.pageSize
            },
            dataType: 'json',
            success: function (response) {
                nguyen.appUserLoginLogger(userName, "Xem table Giấy đề nghị điện.");

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

                $('#lbTTDangKyDienTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentTTDangKyDien').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingTTDangKyDien(response.Result.RowCount, function () {
                        loadTableTTDangKyDien();
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
    function wrapPagingTTDangKyDien(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULTTDangKyDien a').length === 0 || changePageSize === true) {
            $('#paginationULTTDangKyDien').empty();
            $('#paginationULTTDangKyDien').removeData("twbs-pagination");
            $('#paginationULTTDangKyDien').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULTTDangKyDien').twbsPagination({
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

    function loadEditXacNhanDkDien() {
        var dangkydienid = $('#hidTTDangKyDien').val();

        $.ajax({
            type: "GET",
            url: "/Admin/ttdangkytt/GetDkDien",
            data: {
                dangkydienId: dangkydienid
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var tuchoi = response.Result;

                clearChuyenTK();
                var datenow = new Date();

                $('#txtNgayChuyenTKGDNDien').val(tuchoi.NgayChuyenTK == "0001-01-01T00:00:00" ?
                    tedu.getFormattedDate(datenow) : tedu.getFormattedDate(tuchoi.NgayChuyenTK));
                $("#txtNhanVienChuyenTKGDNDien").val(tuchoi.TenNhanVienChuyenTK == "null" ? '' : tuchoi.TenNhanVienChuyenTK);
                $("#txtGhiChuChuyenTKGDNDien").val(tuchoi.LyDoChuyenTK == "null" ? '' : tuchoi.LyDoChuyenTK);

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

}