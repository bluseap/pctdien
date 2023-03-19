var dichvudienController = function () {

    var filehosodvdien = new filehosodvdienController();
    var tuchoidvdien = new tuchoidvdienController();
    var editdvdien = new editdvdienController();
    var xacnhandvdien = new xacnhandvdienController();

    this.loadTableTTDichVuDien = function () {
        loadTableTTDichVuDien(true);
    }

    this.initialize = function () {
        registerEvents();

    }

    function registerEvents() {
        $("#ddl-show-pageTTDangKyDVDien").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            loadTableTTDichVuDien(true);
        });

        $('#txtTimKhachHangTenSDTDVDien').on('keypress', function (e) {
            if (e.which === 13) {
                loadTableTTDichVuDien(true);
            }
        });
        $('#btnTimKhachHangTenSDTDVDien').on('click', function () {
            loadTableTTDichVuDien(true);
        });

        $('body').on('click', '.btn-XacNhanDVDien', function (e) {
            e.preventDefault();
            var ttdichvudienId = $(this).data('id');
            $('#hidTTCacDichVuDien').val(ttdichvudienId);
            $('#hidInsertUpdateTTCacDichVuDien').val(2); // 1: insert; 2: update

            xacnhandvdien.loadEditXacNhanDVDien();
            $('#modal-add-edit-XacNhanDVDien').modal('show');
        });

        $('body').on('click', '.btn-FileDinhKemDVDien', function (e) {
            e.preventDefault();
            var ttdichvudienId = $(this).data('id');
            $('#hidTTCacDichVuDien').val(ttdichvudienId);

            filehosodvdien.loadTableTTDMDangKy();
            $('#modal-add-edit-FileHoSoDVDien').modal('show');
        });

        $('body').on('click', '.btn-TuChoiDVDien', function (e) {
            e.preventDefault();
            var ttdichvudienId = $(this).data('id');
            $('#hidTTCacDichVuDien').val(ttdichvudienId);
            $('#hidInsertUpdateTTCacDichVuDien').val(2); // 1: insert; 2: update

            tuchoidvdien.loadEditTuChoiDVDien();
            $('#modal-add-edit-TuChoiDVDien').modal('show');
        });

        $('body').on('click', '.btn-EditDangKyDVDien ', function (e) {
            e.preventDefault();
            var ttdichvudienId = $(this).data('id');
            $('#hidTTCacDichVuDien').val(ttdichvudienId);
            $('#hidInsertUpdateTTCacDichVuDien').val(2); // 1: insert; 2: update

            editdvdien.loadEditDVDien();
            $('#modal-add-edit-EditDVDien').modal('show');
        });

    }

    function loadTableTTDichVuDien(isPageChanged) {
        var template = $('#table-TTDangKyDVDien').html();
        var render = "";

        var Huyen = $('#ddlKhuVuc').val();
        var tensdt = $('#txtTimKhachHangTenSDTDVDien').val();

        var trangthaidien = $('#ddlLocTheoTrangThaiDVDien').val();

        $.ajax({
            type: 'GET',
            url: '/admin/ttdangkytt/ListDvDienTT',//GetListDvDien',
            data: {
                tinh: '89',
                huyen: Huyen,
                theotrangthai: trangthaidien,
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