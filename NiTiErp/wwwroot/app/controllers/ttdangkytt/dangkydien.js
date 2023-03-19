var dangkydienController = function () {

    var filehoso = new filehosoController();   
    var tuchoi = new tuchoiController();
    var editdangkydien = new editdangkydienController();
    var lichsudangkydien = new lichsudangkydienController();
    var chuyentk = new chuyentkController();

    this.loadTableTTDangKyDien = function () {
        loadTableTTDangKyDien(true);
    }

    this.initialize = function () { 
        registerEvents();
        
    }

    function registerEvents() {
        $("#ddl-show-pageTTDangKyDien").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            loadTableTTDangKyDien(true);
        });

        $('#txtTimKhachHangTenSDT').on('keypress', function (e) {
            if (e.which === 13) {
                loadTableTTDangKyDien(true);
            }
        });
        $('#btnTimKhachHangTenSDT').on('click', function () {
            loadTableTTDangKyDien(true);
        });        

        $('body').on('click', '.btn-ChuyenToTK', function (e) {
            e.preventDefault();
            var ttdangkydienId = $(this).data('id');
            $('#hidTTDangKyDien').val(ttdangkydienId);
            $('#hidInsertUpdateTTDangKyDien').val(2); // 1: insert; 2: update
            chuyentk.loadEditXacNhanDkDien();
            $('#modal-add-edit-ChuyenTK').modal('show');
        }); 

        $('body').on('click', '.btn-FileDinhKem', function (e) {
            e.preventDefault();
            var ttdangkydienId = $(this).data('id');
            $('#hidTTDangKyDien').val(ttdangkydienId);

            filehoso.loadTableTTDMDangKy();            
            $('#modal-add-edit-FileHoSo').modal('show');
        }); 

        $('body').on('click', '.btn-TuChoi', function (e) {
            e.preventDefault();
            var ttdangkydienId = $(this).data('id');
            $('#hidTTDangKyDien').val(ttdangkydienId);
            $('#hidInsertUpdateTTDangKyDien').val(2); // 1: insert; 2: update

            tuchoi.loadEditTuChoi();
            $('#modal-add-edit-TuChoiGDNDien').modal('show');
        }); 

        $('body').on('click', '.btn-EditDangKy ', function (e) {
            e.preventDefault();
            var ttdangkydienId = $(this).data('id');
            $('#hidTTDangKyDien').val(ttdangkydienId);
            $('#hidInsertUpdateTTDangKyDien').val(2); // 1: insert; 2: update

            editdangkydien.loadEditDangKyDien();
            $('#modal-add-edit-EditDangKyDien').modal('show');
        });

        $('body').on('click', '.btn-LichSuDangKyDien', function (e) {
            e.preventDefault();
            var ttdangkydienId = $(this).data('id');
            $('#hidTTDangKyDien').val(ttdangkydienId);
            lichsudangkydien.loadTableLichSuDangKyDien();
            $('#modal-add-edit-LichSuDangKyDien').modal('show');
        }); 

    }

    function loadTableTTDangKyDien(isPageChanged) {
        var template = $('#table-TTDangKyDien').html();
        var render = "";

        var Huyen = $('#ddlKhuVuc').val();
        var tensdt = $('#txtTimKhachHangTenSDT').val();

        var trangthaidien = $('#ddlLocTheoTrangThaiDien').val();

        $.ajax({
            type: 'GET',
            url: '/admin/ttdangkytt/ListDkDienTT',//GetListDkDien',
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

}