var dsdakhoasopctController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var addeditpctdien = new addeditpctdienController();

    this.loadTableDsDaKhoaSoPCT = function () {
        loadTableDsDaKhoaSoPCT();
    }

    this.initialize = function () {
        registerEvents();
        loadData();
        ClearData();
    }

    function registerEvents() {        

        $("#ddl-show-pagePCTDienDSDaKhoaSoPCT").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            loadTableDsDaKhoaSoPCT();
        });

        $('body').on('click', '.btn-addeditDSDaKhoaSoPCT', function (e) {
            e.preventDefault();
            const pctdienid = $(this).data('id');
            const PCTDienCode = $('#hidPCTDienCode').val();
            addeditpctdien.loaEditPCTDienDaKhoaSo(pctdienid, PCTDienCode);
            $('#modal-add-edit-DsDaKhoaSoPCT').modal('hide');
        });

    }

    function loadData() {
       
    }

    function ClearData() {
        var datenow = new Date();
        
    }

    function loadTableDsDaKhoaSoPCT(isPageChanged) {
        var template = $('#template-table-DSDaKhoaSoPCT').html();
        var render = "";

        let makhuvuc = $('#ddlKhuVuc').val();
        let phongtoid = $('#ddlPhongTo').val();        
        let trangthai = 8; // 8 : Da khoa phieu cong tac

        $.ajax({
            type: 'GET',
            url: '/admin/pctdiennhap/ListPCTDienByTrThai',
            data: {
                KhuVuc: makhuvuc,
                PhongTo: phongtoid,
                TrangThai: trangthai, 

                page: tedu.configs.pageIndex,
                pageSize: tedu.configs.pageSize
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.Results.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result.Results, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,

                            DiaDiemCongTac: item.DiaDiemCongTac,
                            CacNoiDungCongTac: item.CacNoiDungCongTac,
                            TuNgayDenNgay: item.TuNgayDenNgay,

                            TrangThaiPCT: tedu.getPhieuCongTacDien(item.TrangThaiPCT)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                $('#lbPCTDienDSDaKhoaSoPCTTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentPCTDienDSDaKhoaSoPCT').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingPCTDienDSDaKhoaSoPCT(response.Result.RowCount, function () {
                        loadTableDsDaKhoaSoPCT();
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
    function wrapPagingPCTDienDSDaKhoaSoPCT(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULPCTDienDSDaKhoaSoPCT a').length === 0 || changePageSize === true) {
            $('#paginationULPCTDienDSDaKhoaSoPCT').empty();
            $('#paginationULPCTDienDSDaKhoaSoPCT').removeData("twbs-pagination");
            $('#paginationULPCTDienDSDaKhoaSoPCT').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULPCTDienDSDaKhoaSoPCT').twbsPagination({
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