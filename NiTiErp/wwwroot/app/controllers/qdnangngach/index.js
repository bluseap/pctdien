﻿var qdnangngachController = function () {
    var userCorporationId = $("#hidUserCorporationId").val();
    var addeditNangNgach = new addeditnangngachController();    

    this.initialize = function () {
        loadKhuVuc();

        registerEvents();

        addeditNangNgach.initialize();

        loadData();
    }

    function registerEvents() {
        $('#ddlKhuVuc').on('change', function () {
            var corporationId = $('#ddlKhuVuc').val();
            loadPhongKhuVuc(corporationId);

            tedu.notify('Danh mục phòng theo khu vực.', 'success');
        });

        $('body').on('click', '.btnQDNangLuong', function (e) {
            e.preventDefault();
            var url = window.location.href;       // Hiển thị đường dẫn url
            //var tieude = window.document.title;    // Hiển thị tiêu đề trang  
            var win = window.open(url, '_blank');
            win.focus();
        });

        $("#btn-create").on('click', function () {

            resetFormAddEditQDNN();

            $('#hidInsertQDNNIdId').val(1); // insert

            $('#modal-add-edit-QDNN').modal('show');

            $('#row-AddEditQDNN').show();
            $('#tblHoSoNhanVienQDNN').show();
            $('#row-AddEditQDNN-infoHoSoQDNN').show();

        });

        $('#btnSaveQDNN').on('click', function (e) {
            var insertQDNN = $('#hidInsertQDNNIdId').val(); // update

            if (insertQDNN === "2") {
                UpdateQDNN(e);
            }
            else {
                SaveQDNN(e);
            }

        });

        $("#ddl-show-pageQDNN").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            loadTableKhenThuong(true);
        });

        $('body').on('click', '.btn-editQDNN', function (e) {
            e.preventDefault();

            $('#hidInsertQDNNIdId').val(2); // update

            var ngangngachId = $(this).data('id');

            $('#hidQDNNId').val(ngangngachId);

            loadNangNgach(ngangngachId);

            $('#modal-add-edit-QDNN').modal('show');

            $('#row-AddEditQDNN').hide();
            $('#tblHoSoNhanVienQDNN').hide();
            $('#row-AddEditQDNN-infoHoSoQDNN').hide();

        });

        $('#btnTimNhanVien').on('click', function () {
            loadTableNangNgach();
        });

        $('#txtTimNhanVien').on('keypress', function (e) {
            if (e.which === 13) {
                loadTableNangNgach();
            }
        });

        $('#btnXuatExcel').on('click', function (e) {
            e.preventDefault();
            XuatExcelQDNN();
        });

    }

    function loadKhuVuc() {
        return $.ajax({
            type: 'GET',
            url: '/admin/hoso/GetListCorNhanSu',
            dataType: 'json',
            success: function (response) {
                var render = "<option value='%' >-- Lựa chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Name + "</option>";
                });
                $('#ddlKhuVuc').html(render);

                var userCorporationId = $("#hidUserCorporationId").val();
                if (userCorporationId !== "PO") {
                    $('#ddlKhuVuc').prop('disabled', true);
                }
                else {
                    $('#ddlKhuVuc').prop('disabled', false);
                }

                $("#ddlKhuVuc")[0].selectedIndex = 1;

                loadPhongKhuVuc($("#ddlKhuVuc").val());

                loadTableNangNgach();

                loadDataAddEditChucVuKhuVuc($("#ddlKhuVuc").val());

            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

    function loadPhongKhuVuc(makhuvuc) {
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
                $('#ddlPhongBan').html(render);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    }

    function resetFormAddEditQDNN() {
        $('#hidQDNNId').val('0');
        $('#hidHoSoNangNgachId').val('0');
        $('#hidInsertQDNNIdId').val('0');

        $('#txtAddEditHoTen').val('');
        $('#txtAddEditPhongTo').val('');
        $('#txtLyDoQuyetDinh').val('');       

        $('#txtHeSoCu').val('0');
        $('#txtMucLuongCu').val('0');
        $('#txtHeSoMoi').val('0'); 
        $('#txtMucLuongMoi').val('0');

        $('#txtGhiChuQuyetDinh').val('');
        $('#txtSoQuyetDinh').val('');
        $('#txtNgaKyQuyetDinh').val('');
        $('#txtTenNguoiKyQuyetDinh').val('');
        $('#txtNgayHieuLuc').val('');
        $('#txtNgayHetHan').val('');
    }

    function SaveQDNN(e) {
        e.preventDefault();

        var nangngachId = $('#hidQDNNId').val();
        var hosoId = $('#hidHoSoNangNgachId').val();
        var insertqdnnId = $('#hidInsertQDNNIdId').val();

        var loaiquyetdinh = $('#ddlLoaiQuyetDinh').val();
        var lydoqd = $('#txtLyDoQuyetDinh').val();

        var ghichuqd = $('#txtGhiChuQuyetDinh').val();
        var soquyetdinh = $('#txtSoQuyetDinh').val();
        var ngaykyquyetdinh = tedu.getFormatDateYYMMDD($('#txtNgaKyQuyetDinh').val());
        var tennguoikyquyetdinh = $('#txtTenNguoiKyQuyetDinh').val();
        var ngayhieuluc = tedu.getFormatDateYYMMDD($('#txtNgayHieuLuc').val());
        var ngayhethan = tedu.getFormatDateYYMMDD($('#txtNgayHetHan').val());


        var hesoluongdanhmuccuId = $('#hidHeSoLuongDanhMucCuId').val(); 
        var chucvucu = $('#ddlChucVuCu').val(); 
        var bacluongcu = $('#ddlBacLuongCu').val(); 
        var hesocu = $('#txtHeSoCu').val(); 
        var mucluongcu = $('#txtMucLuongCu').val(); 

        var hesoluongdanhmucmoiId = $('#hidHeSoLuongDanhMucId').val(); 
        var chucvumoi = $('#ddlChucVuMoi').val(); 
        var bacluongmoi = $('#ddlBacLuongMoi').val(); 
        var hesomoi = $('#txtHeSoMoi').val(); 
        var mucluongmoi = $('#txtMucLuongMoi').val();


        $.ajax({
            type: "POST",
            url: "/Admin/qdnangngach/AddUpdateQDNangNgach",
            data: {
                Id: nangngachId,
                HoSoNhanVienId: hosoId,
                InsertqdnnId: insertqdnnId,

                LoaiQuyetDinhId: loaiquyetdinh,
                LyDoQuyetDinh: lydoqd,                
                GhiChuQuyetDinh: ghichuqd,
                SoQuyetDinh: soquyetdinh,
                NgayKyQuyetDinh: ngaykyquyetdinh,
                TenNguoiKyQuyetDinh: tennguoikyquyetdinh,
                NgayHieuLuc: ngayhieuluc,
                NgayKetThuc: ngayhethan,

                HeSoLuongDanhMucCuId: hesoluongdanhmuccuId,
                ChucVuNhanVienCuId: chucvucu,
                BacLuongCuId: bacluongcu,
                HeSoCu: hesocu,
                MucLuongCu: mucluongcu,

                HeSoLuongDanhMucMoiId: hesoluongdanhmucmoiId,
                ChucVuNhanVienMoiId: chucvumoi,
                BacLuongMoiId: bacluongmoi,
                HeSoMoi: hesomoi,
                MucLuongMoi: mucluongmoi

            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Success === false) {
                    tedu.notify(response.Message, "error");
                }
                else {
                    tedu.notify('Tạo quyết định nhân viên.', 'success');

                    loadTableNangNgach(true);

                    $('#modal-add-edit-QDNN').modal('hide');

                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể lưu Quyết định nâng ngạch', 'error');
                tedu.stopLoading();
            }
        });
    }

    function loadTableNangNgach(isPageChanged) {
        var template = $('#table-QDNN').html();
        var render = "";

        var makhuvuc = $('#ddlKhuVuc').val();
        var phongId = $('#ddlPhongBan').val();
        var timnhanvien = $('#btnTimNhanVien').val();

        $.ajax({
            type: 'GET',
            data: {
                corporationId: makhuvuc,
                phongId: phongId,
                keyword: timnhanvien,
                page: tedu.configs.pageIndex,
                pageSize: tedu.configs.pageSize
            },
            url: '/admin/qdnangngach/GetListNangNgach',
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
                            //HinhNhanVien: item.Image === null ? '<img src="/admin-side/images/user.png?h=90"' : '<img src="' + item.HinhNhanVien + '?h=90" />',
                            TenKhuVuc: item.TenKhuVuc,
                            TenPhong: item.TenPhong,
                            TenChucVu: item.TenChucVu,
                            LyDoQuyetDinh: item.LyDoQuyetDinh,
                            CreateDate: tedu.getFormattedDate(item.CreateDate),
                            Status: tedu.getHoSoNhanVienStatus(item.Status)
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                $('#lblQDNNTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentQDNN').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingQDNN(response.Result.RowCount, function () {
                        loadTableNangNgach();
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
    function wrapPagingQDNN(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULQDNN a').length === 0 || changePageSize === true) {
            $('#paginationULQDNN').empty();
            $('#paginationULQDNN').removeData("twbs-pagination");
            $('#paginationULQDNN').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULQDNN').twbsPagination({
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

    function loadNangNgach(nangngachid) {
        $.ajax({
            type: "GET",
            url: "/Admin/qdnangngach/GetListNangNgachId",
            data: { nangngachId: nangngachid },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var nangngach = response.Result.Results[0];

                $('#hidQDNNId').val(nangngach.Id);
                $('#hidHoSoNangNgachId').val(nangngach.HoSoNhanVienId);

                $('#txtAddEditHoTen').val(nangngach.Ten);
                $('#txtAddEditPhongTo').val(nangngach.TenPhong);

                $('#ddlLoaiQuyetDinh').val(nangngach.LoaiQuyetDinhId);
                $('#txtLyDoQuyetDinh').val(nangngach.LyDoQuyetDinh);               
             
                $('#txtGhiChuQuyetDinh').val(nangngach.GhiChuQuyetDinh);
                $('#txtSoQuyetDinh').val(nangngach.SoQuyetDinh);
                $('#txtNgaKyQuyetDinh').val(tedu.getFormattedDate(nangngach.NgayKyQuyetDinh));
                $('#txtTenNguoiKyQuyetDinh').val(nangngach.TenNguoiKyQuyetDinh);
                $('#txtNgayHieuLuc').val(tedu.getFormattedDate(nangngach.NgayHieuLuc));
                $('#txtNgayHetHan').val(tedu.getFormattedDate(nangngach.NgayKetThuc));


                $('#hidHeSoLuongDanhMucCuId').val(nangngach.HeSoLuongDanhMucCuId);
                $('#ddlChucVuCu').val(nangngach.ChucVuNhanVienCuId);
                $('#ddlBacLuongCu').val(nangngach.BacLuongCuId);
                $('#txtHeSoCu').val(nangngach.HeSoCu);
                $('#txtMucLuongCu').val(nangngach.MucLuongCu);

                $('#hidHeSoLuongDanhMucId').val(nangngach.HeSoLuongDanhMucMoiId);
                $('#ddlChucVuMoi').val(nangngach.ChucVuNhanVienMoiId);
                $('#ddlBacLuongMoi').val(nangngach.BacLuongMoiId);
                $('#txtHeSoMoi').val(nangngach.HeSoMoi);
                $('#txtMucLuongMoi').val(nangngach.MucLuongMoi);


                tedu.stopLoading();
            },
            error: function (status) {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function UpdateQDNN(e) {
        e.preventDefault();

        var nangngachId = $('#hidQDNNId').val();
        var hosoId = $('#hidHoSoNangNgachId').val();
        var insertqdnnId = $('#hidInsertQDNNIdId').val();

        var loaiquyetdinh = $('#ddlLoaiQuyetDinh').val();
        var lydoqd = $('#txtLyDoQuyetDinh').val();
        //var loaihinhthuckt = $('#ddlLoaiHinhThucKhenThuong').val();
        //var tienkhenthuong = $('#txtTienKhenThuong').val();
        var ghichuqd = $('#txtGhiChuQuyetDinh').val();
        var soquyetdinh = $('#txtSoQuyetDinh').val();
        var ngaykyquyetdinh = tedu.getFormatDateYYMMDD($('#txtNgaKyQuyetDinh').val());
        var tennguoikyquyetdinh = $('#txtTenNguoiKyQuyetDinh').val();
        var ngayhieuluc = tedu.getFormatDateYYMMDD($('#txtNgayHieuLuc').val());
        var ngayhethan = tedu.getFormatDateYYMMDD($('#txtNgayHetHan').val());

        var hesoluongdanhmuccuId = $('#hidHeSoLuongDanhMucCuId').val();
        var chucvucu = $('#ddlChucVuCu').val();
        var bacluongcu = $('#ddlBacLuongCu').val();
        var hesocu = $('#txtHeSoCu').val();
        var mucluongcu = $('#txtMucLuongCu').val();

        var hesoluongdanhmucmoiId = $('#hidHeSoLuongDanhMucId').val();
        var chucvumoi = $('#ddlChucVuMoi').val();
        var bacluongmoi = $('#ddlBacLuongMoi').val();
        var hesomoi = $('#txtHeSoMoi').val();
        var mucluongmoi = $('#txtMucLuongMoi').val();

        $.ajax({
            type: "POST",
            url: "/Admin/qdnangngach/AddUpdateQDNangNgach",
            data: {
                Id: nangngachId,
                HoSoNhanVienId: hosoId,
                InsertqdnnId: insertqdnnId,

                LoaiQuyetDinhId: loaiquyetdinh,
                LyDoQuyetDinh: lydoqd,
                //TienKhenThuong: tienkhenthuong,
                //HinhThucKhenThuongId: loaihinhthuckt,
                GhiChuQuyetDinh: ghichuqd,
                SoQuyetDinh: soquyetdinh,
                NgayKyQuyetDinh: ngaykyquyetdinh,
                TenNguoiKyQuyetDinh: tennguoikyquyetdinh,
                NgayHieuLuc: ngayhieuluc,
                NgayKetThuc: ngayhethan,

                HeSoLuongDanhMucCuId: hesoluongdanhmuccuId,
                ChucVuNhanVienCuId: chucvucu,
                BacLuongCuId: bacluongcu,
                HeSoCu: hesocu,
                MucLuongCu: mucluongcu,

                HeSoLuongDanhMucMoiId: hesoluongdanhmucmoiId,
                ChucVuNhanVienMoiId: chucvumoi,
                BacLuongMoiId: bacluongmoi,
                HeSoMoi: hesomoi,
                MucLuongMoi: mucluongmoi

            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Success === false) {
                    tedu.notify(response.Message, "error");
                }
                else {
                    tedu.notify('Tạo quyết định nhân viên.', 'success');

                    loadTableNangNgach(true);

                    $('#modal-add-edit-QDNN').modal('hide');

                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể lưu Quyết định nâng ngạch', 'error');
                tedu.stopLoading();
            }
        });
    }

    function XuatExcelQDNN() {
        //tedu.notify("Excel ho so", "success");
        var makhuvuc = $('#ddlKhuVuc').val();
        var phongId = $('#ddlPhongBan').val();
        var timnhanvien = '';

        var that = $('#hidId').val();
        $.ajax({
            type: "POST",
            url: "/Admin/qdnangngach/ExportExcel",
            data: {
                corporationId: makhuvuc,
                phongId: phongId,
                keyword: timnhanvien
            },
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                window.location.href = response;
                tedu.stopLoading();
            }
        });
    }

    function loadData() {
        loadDataAddEditChucVu();
        loadDataAddEditBac();
    }

    function loadDataAddEditChucVu() {
        $.ajax({
            type: 'GET',
            url: '/admin/hoso/ChucVuNhanVienGetList',
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='%' >--- Lựa chọn ---</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenChucVu + "</option>";
                });
                $('#ddlChucVuCu').html(render);
                $('#ddlChucVuMoi').html(render);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh Chức vụ hợp đồng.', 'error');
            }
        });
    }

    function loadDataAddEditChucVuKhuVuc(makhuvuc) {
        $.ajax({
            type: 'GET',
            url: '/admin/hoso/ChucVuNhanVienKhuVuc',
            data: {
                makv: makhuvuc
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='%' >--- Lựa chọn ---</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenChucVu + "</option>";
                });                
                $('#ddlChucVuMoi').html(render);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh Chức vụ hợp đồng.', 'error');
            }
        });
    }

    function loadDataAddEditBac() {
        $.ajax({
            type: 'GET',
            url: '/admin/qdnangngach/BacLuongGetList',
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='%' >--- Lựa chọn ---</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenBacLuong + "</option>";
                });
                $('#ddlBacLuongCu').html(render);
                $('#ddlBacLuongMoi').html(render);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có Bậc lương nhân viên.', 'error');
            }
        });
    }


}