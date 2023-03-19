var addeditgdntController = function () {

    this.XemThongTinXuLy = function (giaydenghiDMid) {
        XemThongTinXuLy(giaydenghiDMid);
    }

    this.loadTableGiayDeNghiNuoc = function () {
        loadTableGiayDeNghi();
    }

    this.initialize = function () {       
        registerEvents();
        addeditClearData();

    }

    function registerEvents() {

       
    }    

    function addeditClearData() {
        var datenow = new Date();     
        

    } 

    function loadTableGiayDeNghi(isPageChanged) {
        var template = $('#table-TraCuuGiayDeNghiNuoc').html();
        var render = "";

        var makhuvuc = $('#ddlKhuVuc').val();
        var phongtoid = $('#ddlPhongTo').val();
        var timnoidung = $('#txtTimNoiDung').val();

        $.ajax({
            type: 'GET',
            url: '/admin/giaydnnt/GetListGDNNuoc',
            data: {
                corporationId: makhuvuc,
                phongdanhmucId: phongtoid,
                keyword: timnoidung,
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
                            Id: item.Id,
                            TenKhachHang: item.TenKhachHang,
                            //HinhNhanVien: item.Image === null ? '<img src="/admin-side/images/user.png?h=90"' : '<img src="' + item.HinhNhanVien + '?h=90" />',
                            DanhSoKhachHang: item.DanhSoKhachHang,
                            TenKhuVuc: item.TenKhuVuc,
                            DiaChiMuaNuoc: item.DiaChiMuaNuoc,
                            SoDienThoai: item.SoDienThoai,
                            TenDMCungCapDichVu: item.TenDMCungCapDichVu,
                            TTDeNghi: tedu.getGiayDeNghiTT(item.TTDeNghi)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                $('#lbTraCuuGiayDeNghiNuocTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentTraCuuGiayDeNghiNuoc').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingTraCuuGiayDeNghi(response.Result.RowCount, function () {
                        loadTableGiayDeNghi();
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
    function wrapPagingTraCuuGiayDeNghi(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULTraCuuGiayDeNghiNuoc a').length === 0 || changePageSize === true) {
            $('#paginationULTraCuuGiayDeNghiNuoc').empty();
            $('#paginationULTraCuuGiayDeNghiNuoc').removeData("twbs-pagination");
            $('#paginationULTraCuuGiayDeNghiNuoc').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULTraCuuGiayDeNghiNuoc').twbsPagination({
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

    function XemThongTinXuLy(giaydenghiDMid) {  
        var template = $('#table-XemThongTinXuLy').html();
        var render = "";

        $.ajax({
            type: 'GET',
            url: '/admin/giaydnnt/GDNQTCCN',
            data: {
                GiayDeNghiDMCungCapNuocId: giaydenghiDMid                
            },
            dataType: 'json',
            success: function (response) {       
                if (response.Result.Results.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result.Results, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,
                            GiayDeNghiDMCungCapNuocId: item.GiayDeNghiDMCungCapNuocId,                            
                            TrangThai: item.TrangThai,
                            MoTa: item.MoTa,
                            CreateDate: tedu.getFormattedDate(item.CreateDate),   
                            CreateBy: item.CreateBy             
                        });
                    });
                }

                //$('#lbTraCuuGiayDeNghiNuocTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentXemThongTinXuLy').html(render);
                }
               
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });       
    }

    

}