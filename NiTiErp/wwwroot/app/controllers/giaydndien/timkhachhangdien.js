var timkhachhangdienController = function () {

    this.clearDataTimKhachHangDien = function () {
        timkhachhangClearData();
    }

    this.initialize = function () {
        registerEvents();
        timkhachhangClearData();
    }

    function registerEvents() {

        $('#btnTimKhachHangDien').on('click', function () {
            //tedu.notify('load tim khach hang nuoc.', 'error');
            loadTableTimKhachHang(true);
        });

        $("#ddl-show-pageTimKhachHangDien").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            loadTableTimKhachHang(true);
        });

        $('body').on('click', '.btn-TimKhachHangDienIdkh', function (e) {
            e.preventDefault();
            var idkh = $(this).data('id');
            loadKhachHangDienId(idkh);
        });

    }

    function timkhachhangClearData() {
        //$('#hidVanBanLinhVucId').val("");
        //$('#hidInsertVanBanLinhVucId').val(0);

        $('#txtTimKhachHangCode').val("");

        //$('#txtVanBanLinhVucSoThuTu').val(1);
    }

    function loadKhachHangDienId(idkh) {
        //$('#modal-add-edit-TimKhachHangDien').modal('hide');
        //$('#hidKhachHangDienId').val('111111');
        //$('#hidKhuVucId').val('C'); // C: Tinh Bien
        //$('#hidTenKhachHangDien').val('Kiểm định điện 2');
        //$('#hidDanhSoKhachHang').val('0C010009');
        //$('#hidMucDichSuDungKH').val('A');
        //$('#hidDongHoId').val('222222');
        //$('#hidDongHoMaLoai').val('dien a');
        //$('#hidDongHoSoNo').val('9944556644');

        //$('#txtHoTenKhachHang').val('Kiểm định điện 2');
        //$('#txtDanhSoKhachHang').val('0C010016');

        $.ajax({
            type: "GET",
            url: "/Admin/giaydndien/GetKH",
            data: {
                makhachhang: idkh
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var khachhang = response;

                $('#hidKhachHangDienId').val(khachhang.MaKhachHangPo);
                $('#hidKhuVucId').val(khachhang.MAKVPO);
                $('#hidTenKhachHangDien').val(khachhang.TENKH);
                $('#hidDanhSoKhachHang').val(khachhang.DanhSo);
                $('#hidMucDichSuDungKH').val(khachhang.MAMDSDPO);
                $('#hidDongHoDienId').val(khachhang.DongHoPoId);
                $('#hidDongHoDienMaLoai').val(khachhang.MALDHPO);
                $('#hidDongHoDienSoNo').val(khachhang.SONO);

                $('#txtHoTenKhachHang').val(khachhang.TENKH);
                $('#txtDanhSoKhachHang').val(khachhang.DanhSo);

                $('#modal-add-edit-TimKhachHangDien').modal('hide');

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function loadTableTimKhachHang(isPageChanged) {
        var template = $('#table-TimKhachHangDien').html();
        var render = "";

        var timkhachhangkhuvuc = $('#ddlTimKhachHangKhuVuc').val();
        var timnkhachhangcode = $('#txtTimKhachHangCode').val();

        $.ajax({
            type: 'GET',
            url: '/admin/giaydndien/ListKH',
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
                            MaKhachHangPo: item.MaKhachHangPo,

                            DanhSo: item.MADPPO + item.MADBPO,
                            TENKH: item.TENKH,
                            TENKV: item.TENKV,
                            DongHoSoNo: item.DongHoSoNo

                            //TTDonDangKyNuoc: nguyen.getTTDonDangKyNuoc(item.TTDonDangKyNuoc)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                $('#lblTimKhachHangDienTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentTimKhachHangDien').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingDonDangKyDien(response.Result.RowCount, function () {
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
    function wrapPagingDonDangKyDien(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULTimKhachHangDien a').length === 0 || changePageSize === true) {
            $('#paginationULTimKhachHangDien').empty();
            $('#paginationULTimKhachHangDien').removeData("twbs-pagination");
            $('#paginationULTimKhachHangDien').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULTimKhachHangDien').twbsPagination({
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