﻿var chuachuyenController = function () {

    var vanbandenduyetfile = new vbdduyetfileController();
    var _quatrinhxuly = new _quatrinhxulyController();

    var bientimClick = 0;

    this.initialize = function () {

        registerEvents();

    }

    this.loadCountChuaChuyen = function (makv) {
        loadCountChuuaChuyen(makv);
    }

    this.loadTableVBDSoChuaChuyen = function () {
        loadTableVBDSoChuaChuyen();
        $('#btnTimChuaChuyen').hide();
    }

    function registerEvents() {

        $('body').on('click', '.btnVBDSoTim', function (e) {
            e.preventDefault();
            if (bientimClick === 0) {
                $('#btnTimChuaChuyen').show();
                bientimClick = 1;
            }
            else if (bientimClick === 1) {
                $('#btnTimChuaChuyen').hide();
                bientimClick = 0;
            }
        });

        $('#btnTimChuaChuyen').on('click', function () {            
            loadTableVBDSoChuaChuyen();
        });

        $("#ddl-show-pageChuaChuyen").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            loadTableVBDSoChuaChuyen(true);
        });

        $('body').on('click', '.btnChuaChuyenPatchFileKyHieu', function (e) {
            e.preventDefault();
            var vanbandenId = $(this).data('id');
            loadPatchFile(vanbandenId);
        });

        $('body').on('click', '.btnChuaChuyenPatchFileTrichYeu', function (e) {
            e.preventDefault();
            var vanbandenId = $(this).data('id');
            loadPatchFile(vanbandenId);
        });

        $('body').on('click', '.btnChuaChuyenXuLy', function (e) {
            e.preventDefault();
            var vanbandenId = $(this).data('id');
            _quatrinhxuly.loadQuaTrinhXuLy(vanbandenId);
            $('#modal-add-edit-QuaTrinhXuLy').modal('show');
        });

        $('body').on('click', '.btnChuaChuyenButPheLD', function (e) {
            e.preventDefault();
            var vanbandenId = $(this).data('id');
            vanbandenduyetfile.loadTableVBDDuyetFileVBDId(vanbandenId);
            $('#btnVBDDUyetFileId').hide();
            $('#modal-add-edit-VBDDuyetFile').modal('show');
        });

        const sliderchuachuyen = document.querySelector('#table-responsiveChuaChuyen');
        let isDown = false;
        let startX;
        let scrollLeft;
        sliderchuachuyen.addEventListener('mousedown', (e) => {
            isDown = true;
            sliderchuachuyen.classList.add('active');
            startX = e.pageX - sliderchuachuyen.offsetLeft;
            scrollLeft = sliderchuachuyen.scrollLeft;
        });
        sliderchuachuyen.addEventListener('mouseleave', () => {
            isDown = false;
            sliderchuachuyen.classList.remove('active');
        });
        sliderchuachuyen.addEventListener('mouseup', () => {
            isDown = false;
            sliderchuachuyen.classList.remove('active');
        });
        sliderchuachuyen.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - sliderchuachuyen.offsetLeft;
            const walk = (x - startX) * 3; //scroll-fast
            sliderchuachuyen.scrollLeft = scrollLeft - walk;
            //console.log(walk);
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

    function loadTableVBDSoChuaChuyen(isPageChanged) {
        var template = $('#table-ChuaChuyen').html();
        var render = "";

        var makhuvuc = $('#ddlKhuVuc').val();
        var namvanban = $('#txtNamVanBan').val();
        var sovanban = $('#txtSoVanBan').val();
        var kyhieuvanban = $('#txtKyHieuVanBan').val();
        var trichyeu = $('#txtTrichYeu').val();
        var coquanbanhanh = $('#ddlCoQuanBanHanh').val();

        $.ajax({
            type: 'GET',
            url: '/admin/vbdthem/GetListVBDSoChuaChuyen',
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
                            TenSoVanBanDen: item.NamSoVanBan + '-' + item.TenSoVanBan,
                            //HinhNhanVien: item.Image === null ? '<img src="/admin-side/images/user.png?h=90"' : '<img src="' + item.HinhNhanVien + '?h=90" />',
                            TrichYeuCuaVanBan: item.TrichYeuCuaVanBan,
                            SoKyHieuDen: item.SoVanBanDenStt + ' ' + item.SoKyHieuCuaVanBan,
                            TenCoQuanBanHanh: item.TenCoQuanBanHanh,
                            NgayBanHanhCuaVanBan: tedu.getFormattedDate(item.NgayBanHanhCuaVanBan),
                            NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),
                            TTXuLy: tedu.getVanBanDenTTXuLy(item.TTXuLy),
                            VanBanDenId: item.VanBanDenId,
                            ButPheLanhDao: item.ButPheLanhDao === "Invalid Date" ? "" : item.ButPheLanhDao
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                $('#lblChuaChuyenTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentChuaChuyen').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingVBDSoChuaChuyen(response.Result.RowCount, function () {
                        loadTableVBDSoChuaChuyen();
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
    function wrapPagingVBDSoChuaChuyen(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULChuaChuyen a').length === 0 || changePageSize === true) {
            $('#paginationULChuaChuyen').empty();
            $('#paginationULChuaChuyen').removeData("twbs-pagination");
            $('#paginationULChuaChuyen').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULChuaChuyen').twbsPagination({
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

    function loadCountChuuaChuyen(makv) {
        $.ajax({
            type: 'GET',
            url: '/admin/vbdthem/GetCountVBDSoChuaChuyen',
            data: {
                corporationId: makv
            },
            dataType: 'json',
            success: function (response) {
                $('#spanChuaChuyen').text(response);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }


}