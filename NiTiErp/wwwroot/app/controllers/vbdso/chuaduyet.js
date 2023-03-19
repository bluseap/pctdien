﻿var chuaduyetController = function () {

    var _quatrinhxuly = new _quatrinhxulyController();

    var bientimClick = 0;

    this.initialize = function () {

        registerEvents();

    }

    this.loadCountChuaDuyet = function (makv) {
        loadCountChuaDuyet(makv);
    }

    this.loadTableVBDChuaDuyet = function () {
        loadTableVBDChuaDuyet();
        $('#btnTimChuaDuyet').hide();
    }

    function registerEvents() {

        $('body').on('click', '.btnVBDSoTim', function (e) {
            e.preventDefault();
            if (bientimClick === 0) {
                $('#btnTimChuaDuyet').show();
                bientimClick = 1;
            }
            else if (bientimClick === 1) {
                $('#btnTimChuaDuyet').hide();
                bientimClick = 0;
            }
        });

        $('#btnTimChuaDuyet').on('click', function () {            
            loadTableVBDChuaDuyet();
        });

        $("#ddl-show-pageChuaDuyet").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            loadTableVBDChuaDuyet(true);
        });

        $('body').on('click', '.btnChuaDuyetPatchFileKyHieu', function (e) {
            e.preventDefault();
            var vanbandenId = $(this).data('id');
            loadPatchFile(vanbandenId);
        });

        $('body').on('click', '.btnChuaDuyetPatchFileTrichYeu', function (e) {
            e.preventDefault();
            var vanbandenId = $(this).data('id');
            loadPatchFile(vanbandenId);
        });

        $('body').on('click', '.btnQTChuaDuyet', function (e) {
            e.preventDefault();
            var vanbandenId = $(this).data('id');
            _quatrinhxuly.loadQuaTrinhXuLy(vanbandenId);
            $('#modal-add-edit-QuaTrinhXuLy').modal('show');
        });

    }

    function loadPatchFile(vanbandenId) {
        $.ajax({
            type: "GET",
            url: "/Admin/vbdthem/GetVanBanDenId",
            data: { vanbandenId: vanbandenId },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var vanbanden = response.Result[0];
                var win = window.open(vanbanden.DuongDanFile, '_blank');
                win.focus();
                tedu.stopLoading();
            },
            error: function (status) {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function loadTableVBDChuaDuyet(isPageChanged) {
        var template = $('#table-ChuaDuyet').html();
        var render = "";

        var makhuvuc = $('#ddlKhuVuc').val();
        var namvanban = $('#txtNamVanBan').val();
        var sovanban = $('#txtSoVanBan').val();
        var kyhieuvanban = $('#txtKyHieuVanBan').val();
        var trichyeu = $('#txtTrichYeu').val();
        var coquanbanhanh = $('#ddlCoQuanBanHanh').val();

        $.ajax({
            type: 'GET',
            url: '/admin/vbdthem/GetListVBDSoChuaDuyet',
            data: {
                corporationId: makhuvuc,
                keyword: "%",

                NamVanBan: namvanban,
                SoVanBan: sovanban,
                KyHieuVanBan: kyhieuvanban,
                TrichYeu: trichyeu,
                CoQuanBanHanh: coquanbanhanh,

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
                            Id: item.Id,
                            TenSoVanBanDen: item.NamSoVanBan.toString() + '-' + item.TenSoVanBan,
                            //HinhNhanVien: item.Image === null ? '<img src="/admin-side/images/user.png?h=90"' : '<img src="' + item.HinhNhanVien + '?h=90" />',
                            TrichYeuCuaVanBan: item.TrichYeuCuaVanBan,
                            SoKyHieuDen: item.SoVanBanDenStt.toString() + ' ' + item.SoKyHieuCuaVanBan,
                            TenCoQuanBanHanh: item.TenCoQuanBanHanh,
                            NgayBanHanhCuaVanBan: tedu.getFormattedDate(item.NgayBanHanhCuaVanBan),
                            NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),
                            TTXuLy: tedu.getVanBanDenTTXuLy(item.TTXuLy),
                            VanBanDenId: item.VanBanDenId
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });                    
                }

                $('#lblChuaDuyetTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentChuaDuyet').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingVBDSoChuaDuyet(response.Result.RowCount, function () {
                        loadTableVBDChuaDuyet();
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
    function wrapPagingVBDSoChuaDuyet(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULChuaDuyet a').length === 0 || changePageSize === true) {
            $('#paginationULChuaDuyet').empty();
            $('#paginationULChuaDuyet').removeData("twbs-pagination");
            $('#paginationULChuaDuyet').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULChuaDuyet').twbsPagination({
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

    function loadCountChuaDuyet(makv) {
        $.ajax({
            type: 'GET',
            url: '/admin/vbdthem/GetCountVBDChuaDuyet',
            data: {
                corporationId: makv
            },
            dataType: 'json',
            success: function (response) {
                $('#spanChuaDuyet').text(response);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

}