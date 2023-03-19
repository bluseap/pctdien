﻿var duyettatcaController = function () {

    var vanbandenduyetfile = new vbdduyetfileController();
    var chuyenchuyenmon = new _chuyenchuyenmonController();

    var bientimClick = 0;

    this.loadCountVBDDuyetTatCa = function (makv) {
        loadCountVBDDuyetTatCa(makv);
    }

    this.initialize = function () {

        registerEvents();

    }

    this.loadTableDuyetTatCa = function () {
        loadTableDuyetTatCa();
        $('#btnTimDuyetTatCa').hide();
    }

    function registerEvents() {

        $('body').on('click', '.btnVBDDuyetTim', function (e) {
            e.preventDefault();
            if (bientimClick === 0) {
                $('#btnTimDuyetTatCa').show();
                bientimClick = 1;
            }
            else if (bientimClick === 1) {
                $('#btnTimDuyetTatCa').hide();
                bientimClick = 0;
            }
        });

        $('#btnTimDuyetTatCa').on('click', function () {
            loadTableDuyetTatCa();
        });

        $("#ddl-show-pageDuyetTatCa").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            loadTableDuyetTatCa(true);
        });

        $('body').on('click', '.btnDuyetTatCaPatchVBDFileXuLy', function (e) {
            e.preventDefault();
            var vanbandenId = $(this).data('id');
            loadPatchFileVBDXuLy(vanbandenId);
        });

        $('body').on('click', '.btnDuyetTatCaButPheLD', function (e) {
            e.preventDefault();
            var vanbandenId = $(this).data('id');
            vanbandenduyetfile.loadTableVBDDuyetFileVBDId(vanbandenId);
            $('#btnVBDDUyetFileId').hide();
            $('#modal-add-edit-VBDDuyetFile').modal('show');
        });

        $('body').on('click', '.btnDuyetTatCaChuyenCMLai', function (e) {
            e.preventDefault();
            var vanbandenduyetId = $(this).data('id');

            $('#hidVanBanDenDuyetId').val(vanbandenduyetId);
            $('#hidInsertVBDDNVXLId').val(1);
            chuyenchuyenmon.loadCCMPhoiHopXuLy();
            chuyenchuyenmon.loadNhanVienXuLyVanBanDen(vanbandenduyetId);
            $('#modal-add-edit-ChuyenChuyenMon').modal('show');  
        });

        const sliderduyettc = document.querySelector('#table-responsiveDuyetTatCa');
        let isDown = false;
        let startX;
        let scrollLeft;
        sliderduyettc.addEventListener('mousedown', (e) => {
            isDown = true;
            sliderduyettc.classList.add('active');
            startX = e.pageX - sliderduyettc.offsetLeft;
            scrollLeft = sliderduyettc.scrollLeft;
        });
        sliderduyettc.addEventListener('mouseleave', () => {
            isDown = false;
            sliderduyettc.classList.remove('active');
        });
        sliderduyettc.addEventListener('mouseup', () => {
            isDown = false;
            sliderduyettc.classList.remove('active');
        });
        sliderduyettc.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - sliderduyettc.offsetLeft;
            const walk = (x - startX) * 3; //scroll-fast
            sliderduyettc.scrollLeft = scrollLeft - walk;
            //console.log(walk);
        });

    }

    function loadPatchFileVBDXuLy(vanbandenid) {
        $.ajax({
            type: "GET",
            url: "/Admin/vbdthem/GetVanBanDenXuLyId",
            data: { vanbandenId: vanbandenid },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var vanbanden = response.Result[0];
                var win = window.open(vanbanden.VBDXuLyFilePatch, '_blank');
                win.focus();
                tedu.stopLoading();
            },
            error: function (status) {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function loadTableDuyetTatCa(isPageChanged) {
        var template = $('#table-DuyetTatCa').html();
        var render = "";

        var makhuvuc = $('#ddlKhuVuc').val();
        var namvanban = $('#txtNamVanBan').val();
        var sovanban = $('#txtSoVanBan').val();
        var kyhieuvanban = $('#txtKyHieuVanBan').val();
        var trichyeu = $('#txtTrichYeu').val();
        var coquanbanhanh = $('#ddlCoQuanBanHanh').val();

        $.ajax({
            type: 'GET',
            url: '/admin/vbdthem/GetListVBDDuyetTatCa',
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
                            TenFile: item.TenFile,
                            VBDXuLyFilePatch: item.VBDXuLyFilePatch,
                            ButPheLanhDao: item.ButPheLanhDao === "Invalid Date" ? "" : item.ButPheLanhDao
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                $('#lblDuyetTatCaTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentDuyetTatCa').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingDuyetTatCa(response.Result.RowCount, function () {
                        loadTableDuyetTatCa();
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
    function wrapPagingDuyetTatCa(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULDuyetTatCa a').length === 0 || changePageSize === true) {
            $('#paginationULDuyetTatCa').empty();
            $('#paginationULDuyetTatCa').removeData("twbs-pagination");
            $('#paginationULDuyetTatCa').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULDuyetTatCa').twbsPagination({
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

    function loadCountVBDDuyetTatCa(makv) {
        $.ajax({
            type: 'GET',
            url: '/admin/vbdthem/GetCountVBDDuyetTatCa',
            data: {
                corporationId: makv
            },
            dataType: 'json',
            success: function (response) {
                $('#spanDuyetTatCa').text(response);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

}