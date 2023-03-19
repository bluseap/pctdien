var dichvunuocController = function () {

    var filehosodvnuoc = new filehosodvnuocController();
    var tuchoidvnuoc = new tuchoidvnuocController();
    var editdvnuoc = new editdvnuocController();
    var xacnhandvnuoc = new xacnhandvnuocController();

    this.loadTableTTDichVuNuoc = function () {
        loadTableTTDichVuNuoc(true);
    }

    this.initialize = function () {
        registerEvents();

    }

    function registerEvents() {
        $("#ddl-show-pageTTDangKyDVNuoc").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            loadTableTTDichVuNuoc(true);
        });

        $('#txtTimKhachHangTenSDTDVNuoc').on('keypress', function (e) {
            if (e.which === 13) {
                loadTableTTDichVuNuoc(true);
            }
        });
        $('#btnTimKhachHangTenSDTDVNuoc').on('click', function () {
            loadTableTTDichVuNuoc(true);
        });

        $('body').on('click', '.btn-XacNhanDVNuoc', function (e) {
            e.preventDefault();
            var ttdichvunuocId = $(this).data('id');
            $('#hidTTCacDichVuNuoc').val(ttdichvunuocId);
            $('#hidInsertUpdateTTCacDichVuNuoc').val(2); // 1: insert; 2: update

            xacnhandvnuoc.loadEditXacNhanDVNuoc();
            $('#modal-add-edit-XacNhanDVNuoc').modal('show');
        });

        $('body').on('click', '.btn-FileDinhKemDVNuoc', function (e) {
            e.preventDefault();
            var ttdichvunuocId = $(this).data('id');
            $('#hidTTCacDichVuNuoc').val(ttdichvunuocId);

            filehosodvnuoc.loadTableTTDMDangKy();
            $('#modal-add-edit-FileHoSoDVNuoc').modal('show');
        });

        $('body').on('click', '.btn-TuChoiDVNuoc', function (e) {
            e.preventDefault();
            var ttdichvunuocId = $(this).data('id');
            $('#hidTTCacDichVuNuoc').val(ttdichvunuocId);
            $('#hidInsertUpdateTTCacDichVuNuoc').val(2); // 1: insert; 2: update

            tuchoidvnuoc.loadEditTuChoiDVNuoc();
            $('#modal-add-edit-TuChoiDVNuoc').modal('show');
        });

        $('body').on('click', '.btn-EditDangKyDVNuoc ', function (e) {
            e.preventDefault();
            var ttdichvunuocId = $(this).data('id');
            $('#hidTTCacDichVuNuoc').val(ttdichvunuocId);
            $('#hidInsertUpdateTTCacDichVuNuoc').val(2); // 1: insert; 2: update

            editdvnuoc.loadEditDVNuoc();
            $('#modal-add-edit-EditDVNuoc').modal('show');
        });

    }

    function loadTableTTDichVuNuoc(isPageChanged) {
        var template = $('#table-TTDangKyDVNuoc').html();
        var render = "";

        var Huyen = $('#ddlKhuVuc').val();
        var tensdt = $('#txtTimKhachHangTenSDTDVNuoc').val();

        var trangthainuoc = $('#ddlLocTheoTrangThaiDVNuoc').val();

        $.ajax({
            type: 'GET',
            url: '/admin/ttdangkytt/ListDvNuocTT',//GetListDvNuoc',
            data: {
                tinh: '89',
                huyen: Huyen,
                theotrangthai: trangthainuoc,
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