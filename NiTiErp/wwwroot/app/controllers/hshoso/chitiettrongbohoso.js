var chitiettrongbohosoController = function () {

    var userName = $("#hidUserName").val();

    this.loadTableChiTietBoHoSo = function () {
        loadTableChiTietBoHoSo();
    }

    this.initialize = function () {
        registerEvents();
        clearData();
    }

    function registerEvents() {
        

        $('#btnHoSoKhachHangNuoc').on('click', function (e) {
            loadTableDSKhachHangNuoc(true);
            $('#hidKhachHangDienNuoc').val(2); // 1 Dien ; 2 Nuoc
            // 'KHNuocSttToBoHoSo'; 'KHDienSttToBoHoSo' 
            $('#hidCodeMaChiTietTrongBoHoSoId').val('KHNuocSttToBoHoSo');
        });

        $('#btnHoSoKhachHangDien').on('click', function (e) {
            loadTableDSKhachHangDien(true);
            $('#hidKhachHangDienNuoc').val(1); // 1 Dien ; 2 Nuoc
            // 'KHNuocSttToBoHoSo'; 'KHDienSttToBoHoSo'
            $('#hidCodeMaChiTietTrongBoHoSoId').val('KHDienSttToBoHoSo');
        });

        $("#ddl-show-pageChiTietBoHSKhachHang").on('change', function () {
            var dienuoc = $('#hidKhachHangDienNuoc').val();
            if (dienuoc == 1) {// 1 Dien ; 2 Nuoc
                tedu.configs.pageSize = $(this).val();
                tedu.configs.pageIndex = 1;
                loadTableDSKhachHangDien(true);
            }
            else {
                tedu.configs.pageSize = $(this).val();
                tedu.configs.pageIndex = 1;
                loadTableDSKhachHangNuoc(true);
            }            
        });

        $('body').on('click', '.btn-editSoTTChiTietBoHoSo', function (e) {
            e.preventDefault();
            var makhachhang = $(this).data('id');

            $('#hidMaKhachHangId').val(makhachhang);
            $('#hidInsertChiTietTrongBoHoSoId').val(2);

            loadEditSTTKhachHang();            
        });

        $('#btnChiTietBoHSKhachHangAddSTT').on('click', function (e) {
            var insert = $('#hidInsertChiTietTrongBoHoSoId').val();
            if (insert == 2) {
                updateSoTTKhachHang();
            }
        });

        $('body').on('click', '.btn-editKhachHangVaoBoHoSo', function (e) {
            e.preventDefault();
            var makhachhang = $(this).data('id');

            $('#hidMaKhachHangId').val(makhachhang);
            $('#hidInsertChiTietTrongBoHoSoId').val(1);

            var insert = $('#hidInsertChiTietTrongBoHoSoId').val();
            if (insert == 1) {
                insertChiTietBoHoSo();
            }
        });

        $('body').on('click', '.btn-deleteChiTietBoHoSo', function (e) {
            e.preventDefault();
            var chitietbohosiid = $(this).data('id');

            $('#hidChiTietTrongBoHoSoId').val(chitietbohosiid);
            $('#hidInsertChiTietTrongBoHoSoId').val(3);

            deleteChiTietBoHoSo();           

            $('#modal-add-edit-ChiTietTrongBoHoSo').modal('show');
        });
        
    }

    function clearData() {
        $('#txtSoThuTuBoHoSo').val(0);
    }

    function loadTableDSKhachHangNuoc(isPageChanged) {
        $('#table-contentFileChiTietBoHSKhachHang').html('');

        var template = $('#template-table-ChiTietBoHSKhachHang').html();
        var render = "";

        var makhuvuc = $('#ddlKhuVuc').val();
        var tukhoa = $('#txtChiTietHoSoTuKhoa').val();
        var sothutu = $('#txtSoThuTuBoHoSo').val();        

        $.ajax({
            type: 'GET',
            url: '/admin/hshoso/ListKHNuoc',
            data: {
                corporationId: makhuvuc,
                keyword: tukhoa,
                SoThuTu: sothutu,

                page: tedu.configs.pageIndex,
                pageSize: tedu.configs.pageSize
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.Results.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result.Results, function (i, item) {
                        render += Mustache.render(template, {
                            MaKhachHang: item.MaKhachHang,
                            TenKhachHang: item.TENKH,
                            DanhSo: item.DanhSo,
                            SoTTBoHoSo: item.STTTS

                            //TrangThaiBoHoSo: tedu.getHoSoLuuTru(item.TrangThaiBoHoSo)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                $('#lbChiTietBoHSKhachHangTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#table-contentFileChiTietBoHSKhachHang').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingDSKhachHangNuoc(response.Result.RowCount, function () {
                        loadTableDSKhachHangNuoc();
                    },
                        isPageChanged);
                }
            },
            error: function (status) {                
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }
    function wrapPagingDSKhachHangNuoc(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULChiTietBoHSKhachHang a').length === 0 || changePageSize === true) {
            $('#paginationULChiTietBoHSKhachHang').empty();
            $('#paginationULChiTietBoHSKhachHang').removeData("twbs-pagination");
            $('#paginationULChiTietBoHSKhachHang').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULChiTietBoHSKhachHang').twbsPagination({
            totalPages: totalsize,
            visiblePages: 7,
            first: 'Đầu',
            prev: 'Trước',
            next: 'Tiếp',
            last: 'Cuối',
            onPageClick: function (event, p) {
                //tedu.configs.pageIndex = p;
                //setTimeout(callBack(), 200);
                if (tedu.configs.pageIndex !== p) {
                    tedu.configs.pageIndex = p;
                    setTimeout(callBack(), 200);
                }
            }
        });
    }

    function loadEditSTTKhachHang() {
        var dienuoc = $('#hidKhachHangDienNuoc').val();
        var MaKhachHang = $('#hidMaKhachHangId').val();

        if (dienuoc == 1) {// 1 Dien ; 2 Nuoc
            $.ajax({
                type: "GET",
                url: "/Admin/hsHoSo/GetKhacHangPo",
                data: {
                    makhachhang: MaKhachHang
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    var khachhang = response.Result;

                    clearData();

                    $("#txtSoThuTuBoHoSo").val(khachhang.STTTS);

                    tedu.stopLoading();
                },
                error: function () {
                    tedu.notify('Có lỗi xảy ra', 'error');
                    tedu.stopLoading();
                }
            });
        }
        else {
            $.ajax({
                type: "GET",
                url: "/Admin/hsHoSo/GetKhacHang",
                data: {
                    makhachhang: MaKhachHang
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    var khachhang = response.Result;

                    clearData();

                    $("#txtSoThuTuBoHoSo").val(khachhang.STTTS);

                    tedu.stopLoading();
                },
                error: function () {
                    tedu.notify('Có lỗi xảy ra', 'error');
                    tedu.stopLoading();
                }
            });
        }   
    }

    function updateSoTTKhachHang() {
        var makhachhang = $('#hidMaKhachHangId').val();
        var sothutu = $('#txtSoThuTuBoHoSo').val();

        var dienuoc = $('#hidKhachHangDienNuoc').val();

        if (dienuoc == 1) {// 1 Dien ; 2 Nuoc
            $.ajax({
                type: "POST",
                url: "/Admin/hshoso/UpdateSTTDien",
                data: {
                    MaKhachHang: makhachhang,
                    SoThuTu: sothutu
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Stt Bộ hồ sơ Điện.", "error");
                    }
                    else {
                        tedu.notify('Lưu Stt Bộ hồ sơ Điện.', 'success');

                        nguyen.appUserLoginLogger(userName, 'Update Số thứ tự Bộ hồ sơ Điện');

                        loadTableDSKhachHangDien(true);

                        clearData();

                        $('#hidMaKhachHangId').val('');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu Stt Bộ hồ sơ Điện.', 'error');
                    tedu.stopLoading();
                }
            });
        }
        else {
            $.ajax({
                type: "POST",
                url: "/Admin/hshoso/UpdateSTT",
                data: {
                    MaKhachHang: makhachhang,
                    SoThuTu: sothutu
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Stt Bộ hồ sơ Nước.", "error");
                    }
                    else {
                        tedu.notify('Lưu Stt Bộ hồ sơ Nước.', 'success');

                        nguyen.appUserLoginLogger(userName, 'Update Số thứ tự Bộ hồ sơ Nước');

                        loadTableDSKhachHangNuoc(true);

                        clearData();

                        $('#hidMaKhachHangId').val('');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu Stt Bộ hồ sơ Nước.', 'error');
                    tedu.stopLoading();
                }
            });
        }         
    }

    function insertChiTietBoHoSo() {
        var hsbohosoid = $('#hidHsBoHoSoId').val(); 
        var codemaHsBoHoSo = $('#hidCodeMaChiTietTrongBoHoSoId').val();// 'KHNuocSttToBoHoSo'; 'KHDienSttToBoHoSo'
        var makhachhang = $('#hidMaKhachHangId').val();

        var dienuoc = $('#hidKhachHangDienNuoc').val();

        if (dienuoc == 1) {// 1 Dien ; 2 Nuoc
            $.ajax({
                type: "POST",
                url: "/Admin/hshoso/InsChiTietBHS",
                data: {
                    BoHoSoId: hsbohosoid,
                    CodeMa: codemaHsBoHoSo,
                    MaKhachHang: makhachhang
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Chi tiết Bộ hồ sơ Điện.", "error");
                    }
                    else {
                        tedu.notify('Lưu Chi tiết Bộ hồ sơ Điện.', 'success');

                        nguyen.appUserLoginLogger(userName, 'Lưu Chi tiết Bộ hồ sơ Điện.');

                        loadTableChiTietBoHoSo();

                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu Chi tiết Bộ hồ sơ Điện.', 'error');
                    tedu.stopLoading();
                }
            });
        }
        else {
            $.ajax({
                type: "POST",
                url: "/Admin/hshoso/InsChiTietBHS",
                data: {
                    BoHoSoId: hsbohosoid,
                    CodeMa: codemaHsBoHoSo,
                    MaKhachHang: makhachhang
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Chi tiết Bộ hồ sơ Nước.", "error");
                    }
                    else {
                        tedu.notify('Lưu Chi tiết Bộ hồ sơ Nước.', 'success');

                        nguyen.appUserLoginLogger(userName, 'Lưu Chi tiết Bộ hồ sơ Nước.');

                        loadTableChiTietBoHoSo();

                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu Chi tiết Bộ hồ sơ Nước.', 'error');
                    tedu.stopLoading();
                }
            });
        }          

    }

    function loadTableChiTietBoHoSo() {
        var template = $('#template-table-ChiTietBoHoSo').html();
        var render = "";
       
        var hsbohosoid = $('#hidHsBoHoSoId').val();       

        $.ajax({
            type: 'GET',
            url: '/admin/hshoso/ListChiTietBHS',
            data: {                
                HsBoHoSoId: hsbohosoid
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,

                            SoThuTu: item.SoThuTu,
                            MaKH: item.MaKhachHang,
                            TenKH: item.TENKH,
                            DanhSo: item.DanhSo,
                            STTHoSo: item.STTTS

                            //TrangThaiBoHoSo: tedu.getHoSoLuuTru(item.TrangThaiBoHoSo)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }
                
                if (render !== '') {
                    $('#tblContentChiTietBoHoSo').html(render);
                }
                
            },
            error: function (status) {
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function deleteChiTietBoHoSo() {
        var chitietbohosiid = $('#hidChiTietTrongBoHoSoId').val();

        var dienuoc = $('#hidKhachHangDienNuoc').val();

        if (dienuoc == 1) {// 1 Dien ; 2 Nuoc
            $.ajax({
                type: "POST",
                url: "/Admin/hshoso/DelChiTietBHS",
                data: {
                    chitietbohosiId: chitietbohosiid,

                    UpdateBy: userName
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Xóa Chi tiết Bộ hồ sơ Điện.", "error");
                    }
                    else {
                        tedu.notify('Xóa Chi tiết Bộ hồ sơ Điện.', 'success');

                        nguyen.appUserLoginLogger(userName, 'Xóa Chi tiết Bộ hồ sơ Điện.');

                        loadTableChiTietBoHoSo();

                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Xóa Chi tiết Bộ hồ sơ Điện.', 'error');
                    tedu.stopLoading();
                }
            });
        }
        else {
            $.ajax({
                type: "POST",
                url: "/Admin/hshoso/DelChiTietBHS",
                data: {
                    chitietbohosiId: chitietbohosiid,

                    UpdateBy: userName
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Xóa Chi tiết Bộ hồ sơ Nước.", "error");
                    }
                    else {
                        tedu.notify('Xóa Chi tiết Bộ hồ sơ Nước.', 'success');

                        nguyen.appUserLoginLogger(userName, 'Xóa Chi tiết Bộ hồ sơ Nước.');

                        loadTableChiTietBoHoSo();

                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Xóa Chi tiết Bộ hồ sơ Nước.', 'error');
                    tedu.stopLoading();
                }
            });
        }  
        
    }

    function loadTableDSKhachHangDien(isPageChanged) {
        $('#table-contentFileChiTietBoHSKhachHang').html('');

        var template = $('#template-table-ChiTietBoHSKhachHang').html();        
        var render = "";

        var makhuvuc = $('#ddlKhuVuc').val();
        var tukhoa = $('#txtChiTietHoSoTuKhoa').val();
        var sothutu = $('#txtSoThuTuBoHoSo').val();

        $.ajax({
            type: 'GET',
            url: '/admin/hshoso/ListKHDien',
            data: {
                corporationId: makhuvuc,
                keyword: tukhoa,
                SoThuTu: sothutu,

                page: tedu.configs.pageIndex,
                pageSize: tedu.configs.pageSize
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.Results.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result.Results, function (i, item) {
                        render += Mustache.render(template, {
                            MaKhachHang: item.MaKhachHangPo,
                            TenKhachHang: item.TENKH,
                            DanhSo: item.DanhSo,
                            SoTTBoHoSo: item.STTTS                                       
                        });
                    });
                }

                $('#lbChiTietBoHSKhachHangTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#table-contentFileChiTietBoHSKhachHang').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingDSKhachHangDien(response.Result.RowCount, function () {
                        loadTableDSKhachHangDien();
                    },
                        isPageChanged);
                }
            },
            error: function (status) {
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }
    function wrapPagingDSKhachHangDien(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULChiTietBoHSKhachHang a').length === 0 || changePageSize === true) {
            $('#paginationULChiTietBoHSKhachHang').empty();
            $('#paginationULChiTietBoHSKhachHang').removeData("twbs-pagination");
            $('#paginationULChiTietBoHSKhachHang').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULChiTietBoHSKhachHang').twbsPagination({
            totalPages: totalsize,
            visiblePages: 7,
            first: 'Đầu',
            prev: 'Trước',
            next: 'Tiếp',
            last: 'Cuối',
            onPageClick: function (event, p) {
                //tedu.configs.pageIndex = p;
                //setTimeout(callBack(), 200);
                if (tedu.configs.pageIndex !== p) {
                    tedu.configs.pageIndex = p;
                    setTimeout(callBack(), 200);
                }
            }
        });
    }
    
    

}