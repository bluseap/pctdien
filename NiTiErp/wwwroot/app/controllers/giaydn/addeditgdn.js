var addeditgdnController = function () {

    //var userCorporationId = $("#hidUserCorporationId").val();

    var timkhachhangnuoc = new timkhachhangnuocController();
    var quatrinhxulynuoc = new quatrinhxulyController();    

    this.editGiayDeNghiNuoc = function (giaydenghiid) {
        editGiayDeNghiNuoc(giaydenghiid);
    }

    this.loadTableGiayDeNghiNuoc = function () {
        loadTableGiayDeNghi();
    }

    this.loadTableGDNDMCCNuoc = function () {
        loadTableGDNDMCCNuoc(true);
    }

    this.clearDataAddEdit = function () {
        //AddEditClearData();
    }

    this.initialize = function () {
        loadAddEditData();
        registerEvents();
        addeditClearData();        
    }

    function registerEvents() {

        $('#txtNgayTiepNhan, #txtNgayDeNghiCungCapDichVu ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });  

        formMainValidate();

        $('#btnLoadKhachHangNuoc').on('click', function () {
            timkhachhangnuoc.clearDataTimKhachHangNuoc();

            $('#modal-add-edit-TimKhachHangNuoc').modal('show');
        });

        $('#btnSaveGiayDeNghi').on('click', function () {            
            var isgiaydenghi = $('#hidInsertGiayDeNghiId').val(); // 1: insert; 2: update

            if (isgiaydenghi == 1) {
                saveGiayDeNghiNuoc();
            } else if (isgiaydenghi == 2) {
                updateGiayDeNghiNuoc();
            }
            else {
                tedu.notify("Chưa lưu Giấy đề nghị.", "error");
            }            
        });

        $("#ddlDMCungCapDichVu").on('change', function () {
            saveGiayDeNghiDMCungCapNuoc();
        });   

        $('body').on('click', '.btnDeleteDMCungCapDichVuTen', function (e) {
            e.preventDefault();
            var giaydenghiDMCCDVNuocId = $(this).data('id'); 
            deleteGiayDeNghiDMCungCapNuoc(giaydenghiDMCCDVNuocId);
        });

        $('body').on('click', '.btn-QuaTrinhXuLyNuoc', function (e) {
            e.preventDefault();
            var giaydenghiDMCCDVNuocId = $(this).data('id');
            quatrinhxulynuoc.loadQuaTrinhXuLyNuoc(giaydenghiDMCCDVNuocId);
            $('#modal-add-edit-QuaTrinhXuLyNuoc').modal('show');
        });

    }

    function loadAddEditData() {
        return $.ajax({
            type: 'GET',
            url: '/admin/giaydn/DMCungCapDichVu',
            data: {
                loaidichvuid: 1 // 1: Nuoc; 2: Dien
            },
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >-- Lựa chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Ten + "</option>";
                });
                $('#ddlDMCungCapDichVu').html(render);  
                $("#ddlDMCungCapDichVu")[0].selectedIndex = 0;    
                //addeditqlvb.loadTableQuanLyVanBan();
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục cung cấp dịch vụ.', 'error');
            }
        });

    }

    function addeditClearData() {
        $('#hidGiayDeNghiId').val(0);
        $('#hidInsertGiayDeNghiId').val(0); 
        $('#hidGiayDeNghiDMCungCapNuocId').val(0);
        $('#hidGiayDeNghiDMCungCapNuocCodeXuLy').val(0);
        $('#hidTrangThaiGDNDMNuoc').val(0);

        $('#hidKhachHangNuocId').val(0);
        $('#hidKhuVucId').val(0);
        $('#hidTenKhachHangNuoc').val(0);

        $('#hidDanhSoKhachHang').val(0);
        $('#hidMucDichSuDungKH').val(0);

        $('#hidDongHoId').val(0);
        $('#hidDongHoMaLoai').val(0);
        $('#hidDongHoSoNo').val(0);


        $('#txtHoTenKhachHang').val("");
        $('#txtDiaChiKhachHang').val("");
        $('#txtSoDienThoai').val("");
        $('#txtEmailKhachHang').val("");
        $('#txtDiaChiMuaNuoc').val("");
        $('#txtDanhSoKhachHang').val("");
        $('#ddlDMCungCapDichVu')[0].selectedIndex = 0;

        $('#tbl-contentDMCungCapDichVu').html('');

        $('#txtThongTinHienTai').val("");
        $('#txtThongTinCanThayDoi').val("");
        $('#txtHoSoKhachHangDaCungCap').val("");
        $('#txtHoSoKhachHangCanBoSung').val("");

        var datenow = new Date();
        $('#txtNgayTiepNhan').val(tedu.getFormattedDate(datenow));
        $('#txtTenNhanVienTiepNhan').val("");
        $('#txtNgayDeNghiCungCapDichVu').val(tedu.getFormattedDate(datenow));
        $('#txtTenDaiDienCungCapDichVu').val("");
        
    }

    function isFormMainValidate() {
        if ($('#frmMainGiayDeNghi').valid()) {
            return true;
        }
        else {
            return false;
        }
    }
    function formMainValidate() {
        jQuery.validator.addMethod("isDanhMuc", function (value, element) {
            if (value === "%")
                return false;
            else
                return true;
        },
            "Xin chọn danh mục.."
        );

        jQuery.validator.addMethod("isDateVietNam", function (value, element) {
            return this.optional(element) || moment(value, "DD/MM/YYYY").isValid();
        },
            "Nhập theo định dạng ngày, tháng, năm."
        );

        //Init validation
        $('#frmMainGiayDeNghi').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {                                                
                txtNgayTiepNhan: {
                    required: true,
                    isDateVietNam: true
                },
                txtNgayDeNghiCungCapDichVu: {
                    required: true,
                    isDateVietNam: true
                },                
                //txtSoVanBanDen: { required: true },               
                //ddlCoQuanBanHanh: {
                //    required: true,
                //    isDanhMuc: true
                //},         
            },
            //messages: {
            //    txtTrichYeu: { required: "Nhập nội dung trích yếu của văn bản.." }
            //}
        });
    }

    function saveGiayDeNghiDMCungCapNuoc() {   
        var codeGiayDeNghiDMCCNuocGuid = $('#hidGiayDeNghiDMCungCapNuocCodeXuLy').val();
        var dmCungCapDichVuId = $('#ddlDMCungCapDichVu').val();
        //var thoihangiaiquyet = tedu.getFormatDateYYMMDD($('#txtThoiHanGiaiQuyet').val());           

        $.ajax({
            type: "POST",
            url: "/Admin/giaydn/CreateGDNDMCCNuoc",
            data: {
                CodeXuLy: codeGiayDeNghiDMCCNuocGuid,
                DMCungCapDichVuId: dmCungCapDichVuId
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify(response.Message, "error");
                }
                else {
                    tedu.notify('Lưu Giấy đề nghị DM Cung cấp nước.', 'success');
                    loadTableGDNDMCCNuoc(true);

                    //$('#modal-add-edit-GiayDeNghi').modal('hide');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể lưu Giấy đề nghị DM Cung cấp nước.', 'error');
                tedu.stopLoading();
            }
        });
    } 

    function deleteGiayDeNghiDMCungCapNuoc(giaydenghiccdichvunuocid) {   
        $.ajax({
            type: "POST",
            url: "/Admin/giaydn/DeleteGDNDMCCNuoc",
            data: {
                id: giaydenghiccdichvunuocid                
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify(response.Message, "error");
                }
                else {
                    tedu.notify('Xóa Giấy đề nghị DM Cung cấp nước.', 'success');
                    loadTableGDNDMCCNuoc(true);                    
                }
                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Xóa Giấy đề nghị DM Cung cấp nước.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function loadTableGDNDMCCNuoc(isPageChanged) {
        var template = $('#table-DMCungCapDichVu').html();
        var render = "";
       
        var codeGiayDeNghiDMCCNuocGuid = $('#hidGiayDeNghiDMCungCapNuocCodeXuLy').val();

        $.ajax({
            type: 'GET',
            data: {
                codexuly: codeGiayDeNghiDMCCNuocGuid              
            },
            url: '/admin/giaydn/GDNDMCungCapDVNuoc',
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th></tr>";
                }
                else {
                    $.each(response.Result, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,
                            TenDMCungCapDichVu: item.TenDMCungCapDichVu,
                            //HinhNhanVien: item.Image === null ? '<img src="/admin-side/images/user.png?h=90"' : '<img src="' + item.HinhNhanVien + '?h=90" />',
                            Stt: item.Stt,
                            TTDeNghi: item.TTDeNghi,
                            CreateDate: item.CreateDate !== null ? tedu.getFormattedDate(item.CreateDate) : "",
                            Status: tedu.getHoSoNhanVienStatus(item.Status)
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }   
                if (render !== '') {
                    $('#tbl-contentDMCungCapDichVu').html(render);
                }
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }    

    function saveGiayDeNghiNuoc() {        

        var codeXuLyGDNDMCCNuoc = $('#hidGiayDeNghiDMCungCapNuocCodeXuLy').val();
        var khachhangnuocId = $('#hidKhachHangNuocId').val();    
      
        var khuvucid = $('#hidKhuVucId').val();
        var tenkhachhangnuoc = $('#hidTenKhachHangNuoc').val();

        var danhsokhachhang = $('#hidDanhSoKhachHang').val();
        var muadichsusund = $('#hidMucDichSuDungKH').val();

        var donghoid = $('#hidDongHoId').val();
        var donghomaloai = $('#hidDongHoMaLoai').val();
        var donghosono = $('#hidDongHoSoNo').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var diachikhachhang = $('#txtDiaChiKhachHang').val();
            var sodienthoai = $('#txtSoDienThoai').val();
            var emailKhachHang = $('#txtEmailKhachHang').val();
            var diachimuanuoc = $('#txtDiaChiMuaNuoc').val();
            //var danhsokhachhang = $('#txtDanhSoKhachHang').val();

            var thongtinkhachhang = $('#txtThongTinHienTai').val();
            var thongtincanthaydoi = $('#txtThongTinCanThayDoi').val();
            var hosokhachhangdacungcap = $('#txtHoSoKhachHangDaCungCap').val();
            var hosokhachhangcanbosung = $('#txtHoSoKhachHangCanBoSung').val();

            var ngaytiepnhan = tedu.getFormatDateYYMMDD($('#txtNgayTiepNhan').val());
            var nhanvientiepnhan = $('#txtTenNhanVienTiepNhan').val();
            var ngaydenghicungcapdichvu = tedu.getFormatDateYYMMDD($('#txtNgayDeNghiCungCapDichVu').val());
            var tendaidiencungcapdichvu = $('#txtTenDaiDienCungCapDichVu').val();

            $.ajax({
                type: "POST",
                url: "/Admin/giaydn/CreateGDNNuoc",
                data: {         
                    KhuVucId: khuvucid,
                    TenKhachHang: tenkhachhangnuoc,
                    DongHoId: donghoid,
                    DongHoMaLoai: donghomaloai,
                    SoNo: donghosono,

                    KhachHangId: khachhangnuocId,
                    DiaChi: diachikhachhang,
                    SoDienThoai: sodienthoai,
                    Email: emailKhachHang,
                    DiaChiMuaNuoc: diachimuanuoc,
                    DanhSoKhachHang: danhsokhachhang,
                    MucDichSuDung: muadichsusund,

                    ThongTinHienTai: thongtinkhachhang,
                    ThongTinThayDoi: thongtincanthaydoi,
                    HoSoKhachHangCungCap: hosokhachhangdacungcap,
                    HoSoKhachHangCanBoSung: hosokhachhangcanbosung,
                    NgayTiepNhan: ngaytiepnhan,
                    TenNhanVienTiepNhan: nhanvientiepnhan,
                    NgayDeNghiCungCap: ngaydenghicungcapdichvu,
                    BenDeNghiCungCap: tendaidiencungcapdichvu,

                    CodeXuLy: codeXuLyGDNDMCCNuoc
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Giấy đề nghị.", "error");
                    }
                    else {
                        tedu.notify('Lưu Giấy đề nghị.', 'success');

                        loadTableGiayDeNghi(true);                        

                        addeditClearData();

                        $('#modal-add-edit-GiayDeNghi').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể lưu Giấy đề nghị.', 'error');
                    tedu.stopLoading();
                }
            });            
        }
    }

    function loadTableGiayDeNghi(isPageChanged) {
        var template = $('#table-GiayDeNghiCungCapNuoc').html();
        var render = "";

        var makhuvuc = $('#ddlKhuVuc').val();
        var phongtoid = $('#ddlPhongTo').val();
        var timnoidung = $('#txtTimNoiDung').val();

        $.ajax({
            type: 'GET',
            url: '/admin/giaydn/GetListGDNNuoc',
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
                            Id: item.GiayDeNghiCungCapNuocId,
                            TenKhachHang: item.TenKhachHang,
                            //HinhNhanVien: item.Image === null ? '<img src="/admin-side/images/user.png?h=90"' : '<img src="' + item.HinhNhanVien + '?h=90" />',
                            DanhSo: item.DanhSoKhachHang,
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

                $('#lbGiayDeNghiCungCapNuocTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentGiayDeNghiCungCapNuoc').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingGiayDeNghi(response.Result.RowCount, function () {
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
    function wrapPagingGiayDeNghi(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULGiayDeNghiCungCapNuoc a').length === 0 || changePageSize === true) {
            $('#paginationULGiayDeNghiCungCapNuoc').empty();
            $('#paginationULGiayDeNghiCungCapNuoc').removeData("twbs-pagination");
            $('#paginationULGiayDeNghiCungCapNuoc').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULGiayDeNghiCungCapNuoc').twbsPagination({
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

    function editGiayDeNghiNuoc(giaydenghiid) {
        $.ajax({
            type: "GET",
            url: "/Admin/giaydn/GetGDNNuocId",
            data: {
                giaydenghiId: giaydenghiid
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var giaydenghi = response.Result;

                $('#hidGiayDeNghiId').val(giaydenghi.Id);
                //$('#hidInsertGiayDeNghiId').val(vanbanden.TTXuLy);
                $('#hidGiayDeNghiDMCungCapNuocCodeXuLy').val(giaydenghi.CodeXuLy);
                loadTableGDNDMCCNuoc(true);

                $('#hidKhachHangNuocId').val(giaydenghi.KhachHangId);

                $('#hidKhuVucId').val(giaydenghi.KhuVucId);
                //$('#hidTenKhachHangNuoc').val(giaydenghi.TTXuLy);
                //$('#hidDongHoId').val(giaydenghi.TTXuLy);
                //$('#hidDongHoMaLoai').val(giaydenghi.TTXuLy);
                //$('#hidDongHoSoNo').val(giaydenghi.TTXuLy);
             
                $('#txtHoTenKhachHang').val(giaydenghi.TenKhachHang);
                $('#txtDiaChiKhachHang').val(giaydenghi.DiaChi);
                $('#txtSoDienThoai').val(giaydenghi.SoDienThoai);

                $('#txtEmailKhachHang').val(giaydenghi.Email);
                $('#txtDiaChiMuaNuoc').val(giaydenghi.DiaChiMuaNuoc);
                $('#txtDanhSoKhachHang').val(giaydenghi.DanhSoKhachHang);
                $('#txtThongTinHienTai').val(giaydenghi.ThongTinHienTai);
                $('#txtThongTinCanThayDoi').val(giaydenghi.ThongTinThayDoi);
                $('#txtHoSoKhachHangDaCungCap').val(giaydenghi.HoSoKhachHangCungCap);

                $('#txtHoSoKhachHangCanBoSung').val(giaydenghi.HoSoKhachHangCanBoSung);
                $('#txtNgayTiepNhan').val(tedu.getFormattedDate(giaydenghi.NgayTiepNhan));
                $('#txtTenNhanVienTiepNhan').val(giaydenghi.TenNhanVienTiepNhan);
                $('#txtNgayDeNghiCungCapDichVu').val(tedu.getFormattedDate(giaydenghi.NgayDeNghiCungCap));
                $('#txtTenDaiDienCungCapDichVu').val(giaydenghi.BenDeNghiCungCap);

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function updateGiayDeNghiNuoc() {
        var giaydenghiId = $('#hidGiayDeNghiId').val();       
        var codeXuLyGDNDMCCNuoc = $('#hidGiayDeNghiDMCungCapNuocCodeXuLy').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var diachikhachhang = $('#txtDiaChiKhachHang').val();
            var sodienthoai = $('#txtSoDienThoai').val();
            var emailKhachHang = $('#txtEmailKhachHang').val();
            var diachimuanuoc = $('#txtDiaChiMuaNuoc').val();
            var danhsokhachhang = $('#txtDanhSoKhachHang').val();

            var thongtinkhachhang = $('#txtThongTinHienTai').val();
            var thongtincanthaydoi = $('#txtThongTinCanThayDoi').val();
            var hosokhachhangdacungcap = $('#txtHoSoKhachHangDaCungCap').val();
            var hosokhachhangcanbosung = $('#txtHoSoKhachHangCanBoSung').val();

            var ngaytiepnhan = tedu.getFormatDateYYMMDD($('#txtNgayTiepNhan').val());
            var nhanvientiepnhan = $('#txtTenNhanVienTiepNhan').val();
            var ngaydenghicungcapdichvu = tedu.getFormatDateYYMMDD($('#txtNgayDeNghiCungCapDichVu').val());
            var tendaidiencungcapdichvu = $('#txtTenDaiDienCungCapDichVu').val();

            $.ajax({
                type: "POST",
                url: "/Admin/giaydn/UpdateGDNNuoc",
                data: {       
                    Id: giaydenghiId,
                    CodeXuLy: codeXuLyGDNDMCCNuoc,

                    DiaChi: diachikhachhang,
                    SoDienThoai: sodienthoai,
                    Email: emailKhachHang,
                    DiaChiMuaNuoc: diachimuanuoc,
                    DanhSoKhachHang: danhsokhachhang,
                    ThongTinHienTai: thongtinkhachhang,
                    ThongTinThayDoi: thongtincanthaydoi,
                    HoSoKhachHangCungCap: hosokhachhangdacungcap,
                    HoSoKhachHangCanBoSung: hosokhachhangcanbosung,
                    NgayTiepNhan: ngaytiepnhan,
                    TenNhanVienTiepNhan: nhanvientiepnhan,
                    NgayDeNghiCungCap: ngaydenghicungcapdichvu,
                    BenDeNghiCungCap: tendaidiencungcapdichvu
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Sửa Giấy đề nghị.", "error");
                    }
                    else {
                        tedu.notify('Sửa Giấy đề nghị.', 'success');

                        loadTableGiayDeNghi(true);

                        addeditClearData();

                        $('#modal-add-edit-GiayDeNghi').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Sửa Giấy đề nghị.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    } 

}