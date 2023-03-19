var addnhanviennhomxlController = function () {

    var tableHoSo = [];
    var tableDaoTaoNhanVien = [];

    this.loadNhomNhanVien = function () {
        loadTableNhomNhanVien();
    }

    this.initialize = function () {
        loadKhuVucDangKy();

        registerEvents();

        ClearData();
    }

    function registerEvents() {

        $('body').on('click', '.btn-editHoSoDaoTaoDangKy', function (e) {
            e.preventDefault();

            var hosoId = $(this).data('id');
            addDangKyNhanVien(hosoId);
        });        

        $('#btnTimNhanVienAddEditDangKy').on('click', function () {
            LoadTableHoSo();
        });

        $('#txtTimNhanVienAddEditDangKy').on('keypress', function (e) {
            if (e.which === 13) {
                LoadTableHoSo();
            }
        });

        $("#ddl-show-pageHoSoDaoTaoDangKy").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            LoadTableHoSo(true);
        });

        $('body').on('click', '.btn-deleteDangKyNhomNhanVien', function (e) {
            e.preventDefault();

            var nhomxulyid = $('#hidVanBanNhomXuLyId').val();
            var hosonhanvienid = $(this).data("id");                  

            $.ajax({
                type: "POST",
                url: "/Admin/vbnhom/XoaNhanVien",
                data: {
                    nhomxulyId: nhomxulyid,
                    hosonhanvienId: hosonhanvienid
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    tedu.notify('Xóa thành công', 'success');

                    ClearData();
                    //var tongnhanvien = parseInt($(".findStrong").parent().find("strong").text());
                    //$('#lblDangKyDaoTaoNhanVienTotalRecords').text((tongnhanvien - 1).toString());

                    tedu.stopLoading();
                },
                error: function (status) {
                    tedu.notify('Xóa Nhân viên lỗi! Kiểm tra lại.', 'error');
                    tedu.stopLoading();
                }
            });

            $(this).closest('tr').remove();
        });
       
    }

    function ClearData() {
        $('#hidVanBanNhomNhanVienId').val(0);
        $('#hidInsertVanBanNhomNhanVien').val(1);       

        tableHoSo = [];
        tableDaoTaoNhanVien = [];
    }

    function loadKhuVucDangKy() {
        return $.ajax({
            type: 'GET',
            url: '/admin/hoso/GetListCorNhanSu',
            dataType: 'json',
            success: function (response) {
                var render = "<option value='%' >-- Lựa chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Name + "</option>";
                });
                $('#ddlKhuVucAddEditDangKy').html(render);

                var userCorporationId = $("#hidUserCorporationId").val();
                if (userCorporationId !== "PO") {
                    $('#ddlKhuVucAddEditDangKy').prop('disabled', true);
                }
                else {
                    $('#ddlKhuVucAddEditDangKy').prop('disabled', false);
                }
                
                $("#ddlKhuVucAddEditDangKy")[0].selectedIndex = 1;

                loadPhongKhuVucDangKy($("#ddlKhuVucAddEditDangKy").val());

            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

    function loadPhongKhuVucDangKy(makhuvuc) {
        $.ajax({
            type: 'GET',
            url: '/admin/hoso/GetListPhongKhuVuc',
            data: { makv: makhuvuc },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='%' >-- Lựa chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenPhong + "</option>";
                });
                $('#ddlPhongBanAddEditDangKy').html(render);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    }

    function LoadTableHoSo(isPageChanged) {
        var template = $('#table-HoSoDaoTaoDangKy').html();
        var render = "";

        var makhuvuc = $('#ddlKhuVucAddEditDangKy').val();
        var phongId = $('#ddlPhongBanAddEditDangKy').val();
        var timnhanvien = $('#txtTimNhanVienAddEditDangKy').val();

        tedu.notify(timnhanvien, "success");

        $.ajax({
            type: 'GET',
            data: {
                corporationId: makhuvuc,
                phongId: phongId,
                keyword: timnhanvien,
                page: tedu.configs.pageIndex,
                pageSize: tedu.configs.pageSize
            },
            url: '/admin/hoso/GetAllPaging',
            dataType: 'json',
            success: function (response) {
                if (response.Result.Results.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result.Results, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,
                            Ten: item.Ten,
                            HinhNhanVien: item.Image === null ? '<img src="/admin-side/images/user.png?h=90"' : '<img src="' + item.HinhNhanVien + '?h=90" />',
                            TenKhuVuc: item.CorporationName,
                            TenPhong: item.TenPhong,
                            TenChucVu: item.TenChucVu,
                            NgaySinh: tedu.getFormattedDate(item.NgaySinh),
                            CreateDate: tedu.getFormattedDate(item.CreateDate),
                            Status: tedu.getHoSoNhanVienStatus(item.Status)
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                tableHoSo = response.Result.Results;

                $('#lblHoSoDaoTaoDangKyTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentHoSoDaoTaoDangKy').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingHoSo(response.Result.RowCount, function () {
                        LoadTableHoSo();
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
    function wrapPagingHoSo(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULHoSoDaoTaoDangKy a').length === 0 || changePageSize === true) {
            $('#paginationULHoSoDaoTaoDangKy').empty();
            $('#paginationULHoSoDaoTaoDangKy').removeData("twbs-pagination");
            $('#paginationULHoSoDaoTaoDangKy').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULHoSoDaoTaoDangKy').twbsPagination({
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

    function addDangKyNhanVien(hosoid) {

        var nhomxulyid = $('#hidVanBanNhomXuLyId').val();

        $.ajax({
            type: "GET",
            url: "/Admin/vbnhom/NvToNhom",
            data: {                
                nhomxulyId: nhomxulyid,
                hosonhanvienId: hosoid                
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Nhập nhân viên vào nhóm xử lý.", "error");
                }
                else {
                    tedu.notify('Lưu nhân viên vào nhóm xử lý.', 'success');

                    loadTableNhomNhanVien();

                    ClearData();
                  
                    tedu.stopLoading();
                }                
            },
            error: function (status) {
                tedu.notify('Nhập nhân viên vào nhóm xử lý.', 'error');
                tedu.stopLoading();
            }
        });
    }   

    function loadTableNhomNhanVien(isPageChanged) {
        var template = $('#template-table-AddNhanVien').html();
        var render = "";
        var nhomxulyid = $('#hidVanBanNhomXuLyId').val();

        $.ajax({
            type: 'GET',
            data: {
                nhomxulyId: nhomxulyid
            },
            url: '/admin/vbnhom/GetNVByNhomXL',
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    var query = response.Result;
                    $.each(query, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.HoSoNhanVienId,
                            
                            TenNhanVien: item.TenNhanVien,
                            TenKhuVuc: item.TenKhuVuc,
                            TenPhong: item.TenPhong,
                            TenChucVu: item.TenChucVu,

                            hosoId: item.Id
                            //Status: tedu.getHoSoNhanVienStatus(item.Status)
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                if (render !== '') {
                    $('#table-contentAddNhanVien').html(render);
                }
              
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }
    
   

   

}