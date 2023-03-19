var timkhachhangnuocController = function () {    
    
    this.clearDataTimKhachHangNuoc = function () {
        timkhachhangClearData();
    }

    this.initialize = function () {
        registerEvents();
        timkhachhangClearData();
    }

    function registerEvents() {       

        $('#btnTimKhachHangNuoc').on('click', function () {
            //tedu.notify('load tim khach hang nuoc.', 'error');
            //var insertvanbanlinhvuc = $('#hidInsertVanBanLinhVucId').val();
            loadTableTimKhachHang(true);

            //loadKhachHangNuocId("idkh");
        });

        $("#ddl-show-pageTimKhachHangNuoc").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            loadTableTimKhachHang(true);
        });    

        $('body').on('click', '.btn-TimKhachHangNuocIdkh', function (e) {
            e.preventDefault();
            var idkh = $(this).data('id');
            loadKhachHangNuocId(idkh);
        });

    }

    function timkhachhangClearData() {
        //$('#hidVanBanLinhVucId').val("");
        //$('#hidInsertVanBanLinhVucId').val(0);

        $('#txtTimKhachHangCode').val("");
        
        //$('#txtVanBanLinhVucSoThuTu').val(1);
    }

    function loadKhachHangNuocId(idkh) {        
        //$('#hidKhachHangNuocId').val('111111');
        //$('#hidKhuVucId').val('X');
        //$('#hidTenKhachHangNuoc').val('Kiem Dinh 2');
        //$('#hidDanhSoKhachHang').val('0X010009');
        //$('#hidMucDichSuDungKH').val('D');
        //$('#hidDongHoId').val('222222');
        //$('#hidDongHoMaLoai').val('Bluye a');
        //$('#hidDongHoSoNo').val('9944556644');
        //$('#txtHoTenKhachHang').val('Kiem Dinh 2');
        //$('#txtDanhSoKhachHang').val('0X010009');

        $.ajax({
            type: "GET",
            url: "/Admin/giaydn/GetKH",
            data: {
                makhachhang: idkh
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var khachhang = response;                 

                $('#hidKhachHangNuocId').val(khachhang.MaKhachHang);
                $('#hidKhuVucId').val(khachhang.MAKV);
                $('#hidTenKhachHangNuoc').val(khachhang.TENKH);     
                $('#hidDanhSoKhachHang').val(khachhang.DanhSo);
                $('#hidMucDichSuDungKH').val(khachhang.MAMDSD);
                $('#hidDongHoId').val(khachhang.DongHoId);
                $('#hidDongHoMaLoai').val(khachhang.MALDH);
                $('#hidDongHoSoNo').val(khachhang.SONO);

                $('#txtHoTenKhachHang').val(khachhang.TENKH);
                $('#txtDanhSoKhachHang').val(khachhang.DanhSo);

                $('#modal-add-edit-TimKhachHangNuoc').modal('hide');

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function loadTableTimKhachHang(isPageChanged) {
        var template = $('#table-TimKhachHangNuoc').html();
        var render = "";

        var timkhachhangkhuvuc = $('#ddlTimKhachHangKhuVuc').val();
        var timnkhachhangcode = $('#txtTimKhachHangCode').val();

        $.ajax({
            type: 'GET',
            url: '/admin/giaydn/ListKH',
            data: {
                KhuVuc: timkhachhangkhuvuc,
                PhongTo: '',
                keyword: timnkhachhangcode,
                page: tedu.configs.pageIndex,
                pageSize: tedu.configs.pageSize
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.Results.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result.Results, function (i, item) {
                        render += Mustache.render(template, {
                            MaKhachHang: item.MaKhachHang,

                            DanhSo: item.MADP + item.MADB,
                            TENKH: item.TENKH,
                            TENKV: item.TENKV,
                            DongHoSoNo: item.DongHoSoNo,                            

                            //TTDonDangKyNuoc: nguyen.getTTDonDangKyNuoc(item.TTDonDangKyNuoc)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                $('#lblTimKhachHangNuocTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentTimKhachHangNuoc').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingDonDangKyNuoc(response.Result.RowCount, function () {
                        loadTableTimKhachHang();
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
    function wrapPagingDonDangKyNuoc(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULTimKhachHangNuoc a').length === 0 || changePageSize === true) {
            $('#paginationULTimKhachHangNuoc').empty();
            $('#paginationULTimKhachHangNuoc').removeData("twbs-pagination");
            $('#paginationULTimKhachHangNuoc').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULTimKhachHangNuoc').twbsPagination({
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