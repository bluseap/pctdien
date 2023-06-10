var loaddatatableController = function () {

    //var userCorporationId = $("#hidUserCorporationId").val();
    //var userName = $("#hidUserName").val();    

    this.loadCodeDanhMucDonViQLVH = function (code) {
        loadCodeDanhMucDonViQLVH(code);
    }

    this.loadCodeDanhMucThietBiATBHLD = function (code) {
        loadCodeDanhMucThietBiATBHLD(code);
    }

    this.loadCodeDanhMucDieuKienATD = function (code) {
        loadCodeDanhMucDieuKienATD(code);
    }

    this.loadCodeDanhMucNoiDungCongTac = function (code) {
        loadCodeDanhMucNoiDungCongTac(code);
    }

    this.loadTablePCTDien = function () {
        loadTablePCTDien(true);
    }  

    function loadCodeDanhMucNoiDungCongTac(code) {
        return $.ajax({
            type: 'GET',
            url: '/admin/pctdiennhap/ListDMPCT',
            data: {
                Code: code
            },
            dataType: 'json',
            success: function (response) {
                var render = '';
                $.each(response.Result, function (i, item) {
                    render += '<li><a><label ><input id="ndct' + item.Id
                        + '" type="checkbox" class="ul-checkbox ul-checkbox-cacnoidungct" name="amenities[]" value="'
                        + item.TenNoiDung.trim() + '"> ' + item.TenNoiDung + '</label ></a ></li >';
                });                    
                $('#ulPCTDienChonNoiDungCongTac').html(render);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Nội dung công tác.', 'error');
            }
        });
    }

    function loadCodeDanhMucDieuKienATD(code) {
        return $.ajax({
            type: 'GET',
            url: '/admin/pctdiennhap/ListDMPCT',
            data: {
                Code: code
            },
            dataType: 'json',
            success: function (response) {
                var render = '';
                $.each(response.Result, function (i, item) {
                    render += '<li><a><label ><input id="dkatd' + item.Id
                        + '" type="checkbox" class="ul-checkbox ul-checkbox-cacdieukienatd" name="amenities[]" value="'
                        + item.TenNoiDung.trim() + '"> ' + item.TenNoiDung + '</label ></a ></li >';
                });
                $('#ulPCTDienChonDieuKienATD').html(render);                
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Nội dung công tác.', 'error');
            }
        });
    }

    function loadCodeDanhMucDonViQLVH(code) {
        return $.ajax({
            type: 'GET',
            url: '/admin/pctdiennhap/ListDMPCT',
            data: {
                Code: code
            },
            dataType: 'json',
            success: function (response) {
                var render = '';
                $.each(response.Result, function (i, item) {
                    render += '<li><a><label ><input id="cdvqlvh' + item.Id
                        + '" type="checkbox" class="ul-checkbox ul-checkbox-cacdonviqlvh" name="amenities[]" value="'
                        + item.TenNoiDung.trim() + '"> ' + item.TenNoiDung + '</label ></a ></li >';
                });
                $('#ulPCTDienChonCacDonViQuanLyVanHanh').html(render);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục các đơn vị quản lý vận hành.', 'error');
            }
        });
    }

    function loadCodeDanhMucThietBiATBHLD(code) {
        return $.ajax({
            type: 'GET',
            url: '/admin/pctdiennhap/ListDMPCT',
            data: {
                Code: code
            },
            dataType: 'json',
            success: function (response) {
                var render = '';
                $.each(response.Result, function (i, item) {
                    render += '<li><a><label ><input id="tbbhldlv' + item.Id
                        + '" type="checkbox" class="ul-checkbox ul-checkbox-cactrangbibhldlv" name="amenities[]" value="'
                        + item.TenNoiDung.trim() + '"> ' + item.TenNoiDung + '</label ></a ></li >';
                });
                $('#ulPCTDienChonTrangBiATBHLDLamViec').html(render);   
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục trang bị bảo hiểm lao động.', 'error');
            }
        });
    }

    function loadTablePCTDien(isPageChanged) {
        
        var template = $('#table-PCTDien').html();
        var render = "";

        var makhuvuc = $('#ddlKhuVuc').val();
        var phongtoid = $('#ddlPhongTo').val();
        var timnoidung = $('#txtTimNoiDung').val();

        let trangthaipct = '';

        let bienloadtable = $('#hidBienLoadTable').val(); // 0 ko cho thuc hien ; 1 cho thuc hien load table
        if (bienloadtable == '1') {
            trangthaipct = $('#hidValueBienLoadTable').val();
        } else {
            trangthaipct = $('#ddlPCTDBaoCaoDieuKien').val();
        } 

        let ckTheoNgay = document.getElementById('ckPCTDBaoCaoChonTheoNgay');
        let tungaybaocao = tedu.getFormatDateYYMMDD($('#txtPCTDBaoCaoTuNgay').val());
        let denngaybaocao = tedu.getFormatDateYYMMDD($('#txtPCTDBaoCaoDenNgay').val());

        if (trangthaipct === '0' && ckTheoNgay.checked == false) {
            $.ajax({
                type: 'GET',
                url: '/admin/pctdiennhap/ListPCTDien',
                data: {
                    KhuVuc: makhuvuc,
                    PhongTo: phongtoid,
                    keyword: timnoidung,

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

                    $('#lbPCTDienTotalRecords').text(response.Result.RowCount);

                    if (render !== '') {
                        $('#tblContentPCTDien').html(render);
                    }

                    if (response.Result.RowCount !== 0) {
                        wrapPagingPCTDien(response.Result.RowCount, function () {
                            loadTablePCTDien();
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
        else if (trangthaipct === '0' && ckTheoNgay.checked == true) {
            $.ajax({
                type: 'GET',
                url: '/admin/pctdiennhap/ListPCTByTrThaiTuDenNgay',
                data: {
                    KhuVuc: makhuvuc,
                    PhongTo: phongtoid,
                    TrangThai: trangthaipct,

                    TuNgayBaoCao: tungaybaocao,
                    DenNgayBaoCao: denngaybaocao,

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
                            });
                        });
                    }

                    $('#lbPCTDienTotalRecords').text(response.Result.RowCount);

                    if (render !== '') {
                        $('#tblContentPCTDien').html(render);
                    }

                    if (response.Result.RowCount !== 0) {
                        wrapPagingPCTDien(response.Result.RowCount, function () {
                            loadTablePCTDien();
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
        else {
            $.ajax({
                type: 'GET',
                url: '/admin/pctdiennhap/ListPCTDienByTrThai',
                data: {
                    KhuVuc: makhuvuc,
                    PhongTo: phongtoid,
                    TrangThai: trangthaipct,

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
                            });
                        });
                    }

                    $('#lbPCTDienTotalRecords').text(response.Result.RowCount);

                    if (render !== '') {
                        $('#tblContentPCTDien').html(render);
                    }

                    if (response.Result.RowCount !== 0) {
                        wrapPagingPCTDien(response.Result.RowCount, function () {
                            loadTablePCTDien();
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

    }
    function wrapPagingPCTDien(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULPCTDien a').length === 0 || changePageSize === true) {
            $('#paginationULPCTDien').empty();
            $('#paginationULPCTDien').removeData("twbs-pagination");
            $('#paginationULPCTDien').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULPCTDien').twbsPagination({
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