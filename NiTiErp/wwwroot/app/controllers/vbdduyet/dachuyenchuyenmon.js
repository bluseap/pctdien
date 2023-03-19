﻿var dachuyenchuyenmonController = function () {

    var vanbandenduyetfile = new vbdduyetfileController();

    var bientimClick = 0;

    this.initialize = function () {

        registerEvents();

    }

    this.loadCountVanBanDenCCM = function (makhuvuc) {
        loadCountVanBanDenChuyenChuyenMon(makhuvuc);
    }

    this.loadTableDaCCM = function () {
        loadTableDaCCM();
        $('#btnTimDaChuyenChuyenMon').hide();
    }

    function registerEvents() {

        $('body').on('click', '.btnVBDDuyetTim', function (e) {
            e.preventDefault();
            if (bientimClick === 0) {
                $('#btnTimDaChuyenChuyenMon').show();
                bientimClick = 1;
            }
            else if (bientimClick === 1) {
                $('#btnTimDaChuyenChuyenMon').hide();
                bientimClick = 0;
            }
        });

        $('#btnTimDaChuyenChuyenMon').on('click', function () {            
            loadTableDaCCM();
        });   

        $('body').on('click', '.btnDaCCMButPheLD', function (e) {
            e.preventDefault();
            var vanbandenId = $(this).data('id');
            vanbandenduyetfile.loadTableVBDDuyetFileVBDId(vanbandenId);
            $('#btnVBDDUyetFileId').hide();
            $('#modal-add-edit-VBDDuyetFile').modal('show');
        });
       
        $("#ddl-show-pageDaChuyenChuyenMon").on('change', function () {           
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            loadTableDaCCM(true);
        });  

        const sliderdacccm = document.querySelector('#table-responsiveDaChuyenChuyenMon');
        let isDown = false;
        let startX;
        let scrollLeft;
        sliderdacccm.addEventListener('mousedown', (e) => {
            isDown = true;
            sliderdacccm.classList.add('active');
            startX = e.pageX - sliderdacccm.offsetLeft;
            scrollLeft = sliderdacccm.scrollLeft;
        });
        sliderdacccm.addEventListener('mouseleave', () => {
            isDown = false;
            sliderdacccm.classList.remove('active');
        });
        sliderdacccm.addEventListener('mouseup', () => {
            isDown = false;
            sliderdacccm.classList.remove('active');
        });
        sliderdacccm.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - sliderdacccm.offsetLeft;
            const walk = (x - startX) * 3; //scroll-fast
            sliderdacccm.scrollLeft = scrollLeft - walk;
            //console.log(walk);
        });

    }    

    function loadCountVanBanDenChuyenChuyenMon(makv) {
        $.ajax({
            type: 'GET',
            url: '/admin/vbdthem/GetCountVBDenDuyetCCM',
            data: {
                corporationId: makv
            },
            dataType: 'json',
            success: function (response) {
                $('#spanDaChuyenChuyenMon').text(response);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function loadTableDaCCM(isPageChanged) {
        var template = $('#table-DaChuyenChuyenMon').html();
        var render = "";

        var makhuvuc = $('#ddlKhuVuc').val();
        var namvanban = $('#txtNamVanBan').val();
        var sovanban = $('#txtSoVanBan').val();
        var kyhieuvanban = $('#txtKyHieuVanBan').val();
        var trichyeu = $('#txtTrichYeu').val();
        var coquanbanhanh = $('#ddlCoQuanBanHanh').val();

        $.ajax({
            type: 'GET',
            url: '/admin/vbdthem/GetListVBDenTTDuyetCCM',
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

                $('#lblDaChuyenChuyenMonTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentDaChuyenChuyenMon').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingDaCCM(response.Result.RowCount, function () {
                        loadTableDaCCM();
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
    function wrapPagingDaCCM(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULDaChuyenChuyenMon a').length === 0 || changePageSize === true) {
            $('#paginationULDaChuyenChuyenMon').empty();
            $('#paginationULDaChuyenChuyenMon').removeData("twbs-pagination");
            $('#paginationULDaChuyenChuyenMon').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULDaChuyenChuyenMon').twbsPagination({
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