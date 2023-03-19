var tuchoiController = function () {
    var userName = $("#hidUserName").val();

    this.loadEditTuChoi = function () {
        loadEditTuChoi();
    }
    
    this.initialize = function () {
        registerEvents();
        clearTuChoi();
    }

    function registerEvents() {       
        $('#txtNgayTuChoiGDNDien ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        $('#btnSaveTuChoiGDNDien').on('click', function () {
            var inup = $('#hidInsertUpdateTTDangKyDien').val()
            //1: insert; 2: update
            if (inup == 2) {
                saveTuChoi();
            }            
        });

        $('#btnPhucHoiTuChoiGDNDien').on('click', function () {
            var inup = $('#hidInsertUpdateTTDangKyDien').val()
            //1: insert; 2: update
            if (inup == 2) {
                phuchoiTuChoi();
            }
        });

    }

    function clearTuChoi() {
        var datenow = new Date();
        $('#txtNgayTuChoiGDNDien').val(tedu.getFormattedDate(datenow));
        $("#txtNhanVienTuChoiGDNDien").val('');
        $("#txtGhiChuTuChoiGDNDien").val('');        
    }

    function loadEditTuChoi(){
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

                clearTuChoi();
                var datenow = new Date();

                $('#txtNgayTuChoiGDNDien').val(tuchoi.NgayTuChoi == "0001-01-01T00:00:00" ?
                    tedu.getFormattedDate(datenow) : tedu.getFormattedDate(tuchoi.NgayTuChoi));
                $("#txtNhanVienTuChoiGDNDien").val(tuchoi.TenNhanVienTuChoi == "null" ? '' : tuchoi.TenNhanVienTuChoi);
                $("#txtGhiChuTuChoiGDNDien").val(tuchoi.LyDoTuChoi == "null" ? '' : tuchoi.LyDoTuChoi);   
                
                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function saveTuChoi() {
        var dangkydienid = $('#hidTTDangKyDien').val();

        var ngaytuchoi = tedu.getFormatDateYYMMDD($('#txtNgayTuChoiGDNDien').val());
        //var nhanvientuchoi = $("#txtNhanVienTuChoiGDNDien").val();
        var ghichutuchoi = $("#txtGhiChuTuChoiGDNDien").val();

        $.ajax({
            type: "POST",
            url: "/Admin/ttdangkytt/TuChoiDien",
            data: {
                dangkydienId: dangkydienid,

                NgayTuChoi: ngaytuchoi,               
                LyDoTuChoi: ghichutuchoi
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Lưu từ chối giấy đăng ký điện hồ sơ.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Lưu chối giấy đăng ký điện.");

                    tedu.notify('Lưu từ chối giấy đăng ký điện hồ sơ.', 'success');

                    loadTableTTDangKyDien(true);                   

                    $('#modal-add-edit-TuChoiGDNDien').modal('hide');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu từ chối giấy đăng ký điện hồ sơ.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function phuchoiTuChoi() {
        var dangkydienid = $('#hidTTDangKyDien').val(); 

        //var ngaytuchoi = tedu.getFormatDateYYMMDD($('#txtNgayTuChoiGDNDien').val());
        var ghichutuchoi = $("#txtGhiChuTuChoiGDNDien").val();

        $.ajax({
            type: "POST",
            url: "/Admin/ttdangkytt/PhucHoiDien",
            data: {
                dangkydienId: dangkydienid,

                //NgayTuChoi: ngaytuchoi,
                LyDoTuChoi: ghichutuchoi
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Phục hồi từ chối giấy đăng ký điện hồ sơ.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Phục hồi từ chối giấy đăng ký điện.");

                    tedu.notify('Lưu Phục hồi từ chối giấy đăng ký điện hồ sơ.', 'success');

                    loadTableTTDangKyDien(true);

                    clearTuChoi();

                    $('#modal-add-edit-TuChoiGDNDien').modal('hide');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu Phục hồi từ chối giấy đăng ký điện hồ sơ.', 'error');
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

}