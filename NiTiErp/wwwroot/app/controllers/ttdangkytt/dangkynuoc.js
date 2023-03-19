var dangkynuocController = function () {

    var filehosonuoc = new filehosonuocController();
    var tuchoinuoc = new tuchoinuocController();
    var editdangkynuoc = new editdangkynuocController();
    var lichsudangkynuoc = new lichsudangkynuocController();
    var chuyentk = new chuyentknuocController();

    this.loadTableTTDangKyNuoc = function () {
        loadTableTTDangKyNuoc(true);
    }

    this.initialize = function () {
        registerEvents();

    }

    function registerEvents() {
        $("#ddl-show-pageTTDangKyNuoc").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            loadTableTTDangKyNuoc(true);
        });

        $('#txtTimKhachHangTenSDTNuoc').on('keypress', function (e) {
            if (e.which === 13) {
                loadTableTTDangKyNuoc(true);
            }
        });
        $('#btnTimKhachHangTenSDTNuoc').on('click', function () {
            loadTableTTDangKyNuoc(true);
        });       

        $('body').on('click', '.btn-ChuyenToTKNuoc', function (e) {
            e.preventDefault();
            var ttdangkynuocId = $(this).data('id');
            $('#hidTTDangKyNuoc').val(ttdangkynuocId);
            $('#hidInsertUpdateTTDangKyNuoc').val(2); // 1: insert; 2: update
            chuyentk.loadEditXacNhanDkNuoc();
            $('#modal-add-edit-ChuyenTKNuoc').modal('show');
        });

        $('body').on('click', '.btn-FileDinhKemNuoc', function (e) {
            e.preventDefault();
            var ttdangkynuocId = $(this).data('id');
            $('#hidTTDangKyNuoc').val(ttdangkynuocId);

            filehosonuoc.loadTableTTDMDangKy();
            $('#modal-add-edit-FileHoSoNuoc').modal('show');
        });

        $('body').on('click', '.btn-TuChoiNuoc', function (e) {
            e.preventDefault();
            var ttdangkynuocId = $(this).data('id');
            $('#hidTTDangKyNuoc').val(ttdangkynuocId);
            $('#hidInsertUpdateTTDangKyNuoc').val(2); // 1: insert; 2: update

            tuchoinuoc.loadEditTuChoiNuoc();
            $('#modal-add-edit-TuChoiGDNNuoc').modal('show');
        });

        $('body').on('click', '.btn-EditDangKyNuoc ', function (e) {
            e.preventDefault();
            var ttdangkynuocId = $(this).data('id');
            $('#hidTTDangKyNuoc').val(ttdangkynuocId);
            $('#hidInsertUpdateTTDangKyNuoc').val(2); // 1: insert; 2: update

            editdangkynuoc.loadEditDangKyNuoc();
            $('#modal-add-edit-EditDangKyNuoc').modal('show');
        });

        $('body').on('click', '.btn-LichSuDangKyNuoc', function (e) {
            e.preventDefault();
            var ttdangkynuocId = $(this).data('id');
            $('#hidTTDangKyNuoc').val(ttdangkynuocId);
            lichsudangkynuoc.loadTableLichSuDangKyNuoc();
            $('#modal-add-edit-LichSuDangKyNuoc').modal('show');
        }); 

    }

    function loadTableTTDangKyNuoc(isPageChanged) {
        var template = $('#table-TTDangKyNuoc').html();
        var render = "";

        var Huyen = $('#ddlKhuVuc').val();
        var tensdt = $('#txtTimKhachHangTenSDTNuoc').val();

        var trangthainuoc = $('#ddlLocTheoTrangThaiNuoc').val();

        $.ajax({
            type: 'GET',
            url: '/admin/ttdangkytt/ListDkNuocTT',//GetListDkNuoc',
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