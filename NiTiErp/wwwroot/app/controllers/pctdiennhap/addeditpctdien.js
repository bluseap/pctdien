var addeditpctdienController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var arrayReturn = [];

    var themnoidungcongtac = new themnoidungcongtacController();  
    var themdieukienatd = new themdieukienatdController();  
    var themtrangbiatbhld = new themtrangbiatbhldController();  

    var loaddatatable = new loaddatatableController();

    this.loaEditPCTDien = function () {
        loaEditPCTDien();
    }

    this.AddToTableDSNhanVienDonViCT = function (id) {
        AddToTableDSNhanVienDonViCT(id);
    }

    this.addeditClearData = function () {
        addeditClearData();
    }

    this.loadTablePCTDien = function () {
        loadTablePCTDien(true);
    }    

    this.initialize = function () {
        registerEvents();
        loadEditData();
        addeditClearData();

        themnoidungcongtac.initialize();
        themdieukienatd.initialize();
        themtrangbiatbhld.initialize();
    }

    function registerEvents() {

        $('#txtPCTDienNgayBatDauCongViec, #txtPCTDienNgayKetThucCongViec, #txtPCTDienNgayCapPCT ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        loadTagsInput();        

        $('#ddlPCTDienNhap1KhuVuc').on('change', function () {
            var corporationId = $('#ddlPCTDienNhap1KhuVuc').val();
            loadPCTDienNhapPhongKhuVuc(corporationId);            
        });       

        loadThemCacNoiDung();        

        $('body').on('click', '.btn-deletePCTThemNhanVien', function (e) {
            e.preventDefault();
            var pctnhanviencongtac = $(this).data('id');            

            deletePCTNhanVienCongTac(pctnhanviencongtac);
        });

        loadTenHoSoNhanVien();        

        loadChonCacThuocTinhDll();        

        $('#btnSaveEditPCTDien').on('click', function () {
            var ispctdien = $('#hidInsertPCTDien').val(); // 1: insert; 2: update; 

            if (ispctdien == "1") {
                savePCTDien();
            } else if (ispctdien == "2") {
                updatePCTDien();
            }
        });

    }

    function loadAddEditPhongBanTheoKhuVuc(makhuvuc, maphongban) {
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
                $('#ddlPCTDienNhap1PhongBan').html(render);            
                $("#ddlPCTDienNhap1PhongBan").val(maphongban);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    }

    function loadThemCacNoiDung() {
        $('#btnThemNoiDungCongTac').on('click', function () {
            $('#hidInsertThemNoiDungCongTac').val(1);
            themnoidungcongtac.loadTablePCTDienThemNoiDungCongTac();
            $('#modal-add-edit-ThemMoiNoiDungCongTac').modal('show');
        });

        $('#btnThemDieuKienATD').on('click', function () {
            $('#hidInsertThemDieuKienATD').val(1);
            themdieukienatd.loadTablePCTDienThemDieuKienATD();
            $('#modal-add-edit-ThemMoiDieuKienATD').modal('show');
        });

        $('#btnThemTrangBiATBHLDLamViec').on('click', function () {
            $('#hidInsertThemTrangBiATBHLDLamViec').val(1);
            themtrangbiatbhld.loadTablePCTDienThemTrangBiATBHLD();
            $('#modal-add-edit-ThemTrangBiATBHLD').modal('show');
        });
    }

    function loadTenHoSoNhanVien() {
        $('#ddlNguoiLanhDaoCongViecBacATD').on('change', function () {
            var hosonhanvienid = $('#hidPCTDienNguoiLanhDaoCongViecId').val();
            var bacantoandienid = $('#ddlNguoiLanhDaoCongViecBacATD').val();

            addBacATDToHoSoNhanVien(hosonhanvienid, bacantoandienid);
        });

        $('#ddlNguoiChiHuyTrucTiepBacATD').on('change', function () {
            var hosonhanvienid = $('#hidPCTDienNguoiChiHuyTrucTiepId').val();
            var bacantoandienid = $('#ddlNguoiChiHuyTrucTiepBacATD').val();

            addBacATDToHoSoNhanVien(hosonhanvienid, bacantoandienid);
        });

        $('#ddlPCTDienNguoiGiamSatATDBacATD').on('change', function () {
            var hosonhanvienid = $('#hidPCTDienNguoiGiamSatATDId').val();
            var bacantoandienid = $('#ddlPCTDienNguoiGiamSatATDBacATD').val();

            addBacATDToHoSoNhanVien(hosonhanvienid, bacantoandienid);
        });

        $('#ddlPCTDienNguoiChoPhepATDATD').on('change', function () {
            var hosonhanvienid = $('#hidPCTDienNguoiChoPhepId').val();
            var bacantoandienid = $('#ddlPCTDienNguoiChoPhepATDATD').val();

            addBacATDToHoSoNhanVien(hosonhanvienid, bacantoandienid);
        });
    }

    function loadChonCacThuocTinhDll() {
        $("#ddlPCTDienChonThuocCongTyDonVi").on('change', function () {
            var thuoccongtydonvi = $("#ddlPCTDienChonThuocCongTyDonVi").val();
            var thuoccongtydonviSelect = $("#ddlPCTDienChonThuocCongTyDonVi").find(":selected").text();

            if (thuoccongtydonvi !== '%') {
                $('#txtPCTDienThuocCongTyDonVi').addTag(thuoccongtydonviSelect);
            }
        });

        $("#ddlPCTDienChonNoiDungCongTac").on('change', function () {
            var chonnoidungct = $("#ddlPCTDienChonNoiDungCongTac").val();
            var chonnoidungctSelect = $("#ddlPCTDienChonNoiDungCongTac").find(":selected").text();

            if (chonnoidungct !== '%') {
                $('#txtPCTDienNoiDungCongTac').addTag(chonnoidungctSelect);
            }
        });

        $("#ddlPCTDienChonDieuKienATD").on('change', function () {
            var dieukienatd = $("#ddlPCTDienChonDieuKienATD").val();
            var dieukienatdSelect = $("#ddlPCTDienChonDieuKienATD").find(":selected").text();

            if (dieukienatd !== '%') {
                $('#txtPCTDienDieuKienATD').addTag(dieukienatdSelect);
            }
        });

        $("#ddlPCTDienChonTrangBiATBHLDLamViec").on('change', function () {
            var trangbiatd = $("#ddlPCTDienChonTrangBiATBHLDLamViec").val();
            var trangbiatdSelect = $("#ddlPCTDienChonTrangBiATBHLDLamViec").find(":selected").text();

            if (trangbiatd !== '%') {
                $('#txtPCTDienTrangBiATBHLDLamViec').addTag(trangbiatdSelect);
            }
        });
    }

    function loadTagsInput() {
        $('#txtPCTDienThuocCongTyDonVi').tagsInput({
            width: 'auto',
            height: '50px'
        });        
        $('#txtPCTDienNoiDungCongTac').tagsInput({
            width: 'auto',
            height: '50px'
        });
        $('#txtPCTDienDieuKienATD').tagsInput({
            width: 'auto',
            height: '50px'
        });
        $('#txtPCTDienTrangBiATBHLDLamViec').tagsInput({
            width: 'auto',
            height: '100px'
        });
    }

    function loadEditData() {
        $('#txtSoPhieuCongTac').prop('disabled', true);

        loadBacAnToanDien(true);

        loaddatatable.loadCodeDanhMucNoiDungCongTac('DMNoiDungCT');
        loaddatatable.loadCodeDanhMucDieuKienATD('DMDieuKienATD'); 
        loaddatatable.loadCodeDanhMucThietBiATBHLD('DMThietBiATBHLD');
    }    
   
    function addeditClearData() {
        var datenow = new Date();

        //$('#hidPCTDienId').val(0);
        //$('#hidInsertPCTDien').val(0);

        $('#hidPCTDienCode').val(0);

        $('#hidPCTDienNguoiLanhDaoCongViecId').val(0);
        $('#hidPCTDienNguoiChiHuyTrucTiepId').val(0);
        $('#hidPCTDienNguoiGiamSatATDId').val(0);
        $('#hidPCTDienNguoiChoPhepId').val(0);
        $('#hidPCTDienTenNguoiCapPCTId').val(0);

        $("#ddlPCTDienNhap1KhuVuc")[0].selectedIndex = 1;
        $("#ddlPCTDienNhap1PhongBan")[0].selectedIndex = 0; 
        $("#txtSoPhieuCongTac").val('');

        $("#txtNguoiLanhDaoCongViec").val('');
        $("#ddlNguoiLanhDaoCongViecBacATD")[0].selectedIndex = 0;
        $("#txtNguoiChiHuyTrucTiep").val('');
        $("#ddlNguoiChiHuyTrucTiepBacATD")[0].selectedIndex = 0;

        $("#ddlPCTDienChonThuocCongTyDonVi")[0].selectedIndex = 0;
        $("#txtPCTDienThuocCongTyDonVi").val('');
        $("#txtPCTDiaDiemCongTac").val('');
        $("#ddlPCTDienChonNoiDungCongTac")[0].selectedIndex = 0;
        $("#txtPCTDienNoiDungCongTac").val('');

        $("#txtPCTDienGioBatDauCongViec").val(tedu.getFormattedDateGio(datenow));
        $("#txtPCTDienPhutBatDauCongViec").val(tedu.getFormattedDatePhut(datenow));
        $("#txtPCTDienNgayBatDauCongViec").val(tedu.getFormattedDate(datenow));
        $("#txtPCTDienGioKetThucCongViec").val(tedu.getFormattedDateGio(datenow));
        $("#txtPCTDienPhutKetThucCongViec").val(tedu.getFormattedDatePhut(datenow));
        $("#txtPCTDienNgayKetThucCongViec").val(tedu.getFormattedDate(datenow));

        $("#ddlPCTDienChonDieuKienATD")[0].selectedIndex = 0;
        $("#txtPCTDienDieuKienATD").val('');
        $("#ddlPCTDienChonTrangBiATBHLDLamViec")[0].selectedIndex = 0;
        $("#txtPCTDienTrangBiATBHLDLamViec").val('');

        $("#txtPCTDienTongHangMucDaTrangCap").val('');
        $("#txtPCTDienCacDonViQLVHCoLienQuan").val('');

        $("#txtPCTDienNguoiGiamSatATD").val('');
        $("#ddlPCTDienNguoiGiamSatATDBacATD")[0].selectedIndex = 0;
        $("#txtPCTDienNguoiChoPhep").val('');
        $("#ddlPCTDienNguoiChoPhepATDATD")[0].selectedIndex = 0;

        $("#txtPCTDienNgayCapPCT").val(tedu.getFormattedDate(datenow));
        $("#txtPCTDienTenNguoiCapPCT").val('');       

    }    

    function loadBacAnToanDien(Active){
        $.ajax({
            type: 'GET',
            url: '/admin/pctdiennhap/ListBacATD',
            data: { active: Active },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='0' >-- Lựa chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenBacAnToanDien + "</option>";
                });
                $('#ddlNguoiLanhDaoCongViecBacATD').html(render);
                $("#ddlNguoiLanhDaoCongViecBacATD")[0].selectedIndex = 0;

                $('#ddlNguoiChiHuyTrucTiepBacATD').html(render);
                $("#ddlNguoiChiHuyTrucTiepBacATD")[0].selectedIndex = 0;

                $('#ddlPCTDienNguoiGiamSatATDBacATD').html(render);
                $("#ddlPCTDienNguoiGiamSatATDBacATD")[0].selectedIndex = 0;

                $('#ddlPCTDienNguoiChoPhepATDATD').html(render);
                $("#ddlPCTDienNguoiChoPhepATDATD")[0].selectedIndex = 0;

                $('#ddlTenNhanVienThayDoiCongTacBacATD').html(render);
                $("#ddlTenNhanVienThayDoiCongTacBacATD")[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Bậc an toàn điện.', 'error');
            }
        });
    }
   
    function loadPCTDienNhapPhongKhuVuc(makhuvuc) {
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
                $('#ddlPCTDienNhap1PhongBan').html(render);
                $("#ddlPCTDienNhap1PhongBan")[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    } 

    function loadTablePCTDien(isPageChanged) {
        var template = $('#table-PCTDien').html();
        var render = "";

        var makhuvuc = $('#ddlKhuVuc').val();
        var phongtoid = $('#ddlPhongTo').val();        
        var timnoidung = $('#txtTimNoiDung').val();

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
                //tedu.configs.pageIndex = p;
                //setTimeout(callBack(), 200);
                if (tedu.configs.pageIndex !== p) {
                    tedu.configs.pageIndex = p;
                    setTimeout(callBack(), 200);
                }
            }
        });
    }

    function isFormMainValidate() {
        if ($('#frmMainEditPCTDienNhap1').valid() && $('#frmMainEditPCTDienNhap2').valid()) {
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
        $('#frmMainEditPCTDienNhap1').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                ddlPCTDienNhap1KhuVuc: { required: true, isDanhMuc: true },  
                ddlPCTDienNhap1PhongBan: { required: true, isDanhMuc: true },  
                txtNguoiChiHuyTrucTiep: { required: true },
                ddlNguoiChiHuyTrucTiepBacATD: { required: true, isDanhMuc: true },  
            },
        });

        $('#frmMainEditPCTDienNhap2').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {         
                txtPCTDienThuocCongTyDonVi_tag: { required: true },
                txtPCTDiaDiemCongTac: { required: true },
                txtPCTDienNoiDungCongTac_tag: { required: true },

                txtPCTDienGioBatDauCongViec: { required: true },
                txtPCTDienPhutBatDauCongViec: { required: true },
                txtPCTDienNgayBatDauCongViec: { required: true, isDateVietNam: true },
                txtPCTDienGioKetThucCongViec: { required: true },
                txtPCTDienPhutKetThucCongViec: { required: true },
                txtPCTDienNgayKetThucCongViec: { required: true, isDateVietNam: true },

                txtPCTDienDieuKienATD_tag: { required: true },
                txtPCTDienTrangBiATBHLDLamViec_tag: { required: true },
                txtPCTDienTongHangMucDaTrangCap: { required: true },
                txtPCTDienCacDonViQLVHCoLienQuan: { required: true },

                txtPCTDienNguoiChoPhep: { required: true },
                ddlPCTDienNguoiChiHuyTrucTiepBacATD: { required: true, isDanhMuc: true },
                txtPCTDienNgayCapPCT: { required: true, isDateVietNam: true },
                txtPCTDienTenNguoiCapPCT: { required: true }

                //txtTenKhachHang: { required: true },
                //txtNgaySinh: { required: true, isDateVietNam: true },
                //ddlMaMDSD: { required: true, isDanhMuc: true },               

            },
        });
    }    

    function AddToTableDSNhanVienDonViCT(id) {
        var pctdiencode = $('#hidPCTDienCode').val();

        $.ajax({
            type: "POST",
            url: "/Admin/pctdiennhap/AddDsNVCT",
            data: {
                TenNhanVienCongTacId: id,
                PCTDienCode: pctdiencode
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Lưu PCT Nhân viên công tác.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Lưu PCT Nhân viên công tác. Id: " + id);

                    tedu.notify('Lưu PCT Nhân viên công tác.', 'success');

                    loadTableDSNhanVienDonViCT();

                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu PCT Nhân viên công tác.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function loadTableDSNhanVienDonViCT() {
        var template = $('#template-table-PCTThemNhanVienCT').html();
        var render = "";

        var pctdiencode = $('#hidPCTDienCode').val();

        $.ajax({
            type: 'GET',
            url: '/admin/pctdiennhap/ListNVCongTac',
            data: {
                Code: pctdiencode
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,

                            STT: item.Stt,
                            TenNhanVienCongTac: item.TenNhanVienCongTac,
                            BacATDNhanVienCongTac: item.BacATDNhanVienCongTac,
                            TenKhuVuc: item.TenKhuVuc,
                            TenPhong: item.TenPhong,

                            //TrangThaiPCT: tedu.getPhieuCongTacDien(item.TrangThaiBoHoSo)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }               

                if (render !== '') {
                    $('#table-contentPCTThemNhanVienCT').html(render);
                }
                
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function deletePCTNhanVienCongTac(pctnhanviencongtacid) {
        tedu.confirm('Bạn có chắc chắn xóa nhân viên công tác này?', function () {
            $.ajax({
                type: "POST",
                url: "/Admin/pctdiennhap/DelNVCongTac",
                data: {
                    pctnhanviencongtacId: pctnhanviencongtacid
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Xóa PCT Nhân viên công tác.", "error");
                    }
                    else {
                        nguyen.appUserLoginLogger(userName, "Xóa PCT Nhân viên công tác. Id: " + pctnhanviencongtacid);                        

                        tedu.notify('Xóa PCT Nhân viên công tác.', 'success');

                        loadTableDSNhanVienDonViCT();                        

                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Xóa PCT Nhân viên công tác.', 'error');
                    tedu.stopLoading();
                }
            });
        });  
    }

    function addBacATDToHoSoNhanVien(hosonhanvienid, bacantoandienid) {
        $.ajax({
            type: "POST",
            url: "/Admin/pctdiennhap/addBacATDHsNV",
            data: {
                HoSoNhanVienId: hosonhanvienid,
                BacAnToanDienId: bacantoandienid
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Lưu bậc an toàn điện vào hồ sơ nhân viên.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Lưu bậc an toàn điện vào hồ sơ nhân viên. Id: " + hosonhanvienid);

                    tedu.notify('Lưu bậc an toàn điện vào hồ sơ nhân viên.', 'success');                    

                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu bậc an toàn điện vào hồ sơ nhân viên.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function savePCTDien() {
        //var pctdienid = $('#hidPCTDienId').val();        

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var diencode = $('#hidPCTDienCode').val();

            var khuvuc1 = $("#ddlPCTDienNhap1KhuVuc").val();
            var phongban1 = $("#ddlPCTDienNhap1PhongBan").val();

            var nguoilanhdaocongviecId = $('#hidPCTDienNguoiLanhDaoCongViecId').val();
            var nguoichihuytructiepId = $('#hidPCTDienNguoiChiHuyTrucTiepId').val();
            var nguoigiamsatatdId = $('#hidPCTDienNguoiGiamSatATDId').val();
            var nguoichophepId = $('#hidPCTDienNguoiChoPhepId').val();
            var tennguoicappctId = $('#hidPCTDienTenNguoiCapPCTId').val();            

            var tennguoilanhdaocongviec = $("#txtNguoiLanhDaoCongViec").val();
            var nguoilanhdaocongviecbacatd = $("#ddlNguoiLanhDaoCongViecBacATD").val();
            var tennguoichihuytructiep = $("#txtNguoiChiHuyTrucTiep").val();
            var nguoichihuytructiepbacatd = $("#ddlNguoiChiHuyTrucTiepBacATD").val();

            var diadiemcongtac = $("#txtPCTDiaDiemCongTac").val();            

            var giobatdaucongviec = $("#txtPCTDienGioBatDauCongViec").val();
            var phutbatdaucongviec = $("#txtPCTDienPhutBatDauCongViec").val();
            var ngaybatdaucongviec = tedu.getFormatDateYYMMDD($('#txtPCTDienNgayBatDauCongViec').val());
            var gioketthuccongviec = $("#txtPCTDienGioKetThucCongViec").val();
            var phutketthuccongviec = $("#txtPCTDienPhutKetThucCongViec").val();
            var ngayketthuccongviec = tedu.getFormatDateYYMMDD($('#txtPCTDienNgayKetThucCongViec').val());

            var thuoccongtydonvi = $("#txtPCTDienThuocCongTyDonVi").val();
            var noidungcongtac = $("#txtPCTDienNoiDungCongTac").val();
            var dieukienantoandien = $("#txtPCTDienDieuKienATD").val();           
            var trangbiatbhldlamviec = $("#txtPCTDienTrangBiATBHLDLamViec").val();

            var tonghangmucdatrangcap = $("#txtPCTDienTongHangMucDaTrangCap").val();
            var cacdonviqlvhcolienquan = $("#txtPCTDienCacDonViQLVHCoLienQuan").val();

            var tennguoigiamsatatd = $("#txtPCTDienNguoiGiamSatATD").val();
            var nguoigiamsatatdbacatd = $("#ddlPCTDienNguoiGiamSatATDBacATD").val();
            var nguoichophep = $("#txtPCTDienNguoiChoPhep").val();
            var nguoichiphepbacatd = $("#ddlPCTDienNguoiChoPhepATDATD").val();

            var ngaycapphieucongtac = tedu.getFormatDateYYMMDD($('#txtPCTDienNgayCapPCT').val());
            var tennguoicappct = $("#txtPCTDienTenNguoiCapPCT").val();        

            $.ajax({
                type: "POST",
                url: "/Admin/pctdiennhap/SavePCTD",
                data: {
                    Code: diencode,

                    CorporationId: khuvuc1,
                    PhongBanDanhMucId: phongban1,

                    NguoiLanhDaoCongViecId: nguoilanhdaocongviecId,
                    NguoiChiHuyTrucTiepId: nguoichihuytructiepId,
                    NguoiGiamSatATDId: nguoigiamsatatdId,
                    NguoiChoPhepId: nguoichophepId,
                    TenNguoiCapPCTId: tennguoicappctId,

                    TenNguoiLanhDaoCongViec: tennguoilanhdaocongviec,
                    BacATDNguoiLanhDaoCongViecId: nguoilanhdaocongviecbacatd,
                    TenNguoiChiHuyTrucTiep: tennguoichihuytructiep,
                    BacATDNguoiChiHuyTrucTiepId: nguoichihuytructiepbacatd,

                    DiaDiemCongTac: diadiemcongtac,

                    GioBatDauKH: giobatdaucongviec,
                    PhutBatDauKH: phutbatdaucongviec,
                    NgayBatDauKH: ngaybatdaucongviec,
                    GioKetThucKH: gioketthuccongviec,
                    PhutKetThucKH: phutketthuccongviec,
                    NgayKetThucKH: ngayketthuccongviec,

                    CacCongTyDonVi: thuoccongtydonvi,
                    CacNoiDungCongTac: noidungcongtac,
                    CacDieuKiemATLD: dieukienantoandien,
                    CacTrangBiATBHLDLamViec: trangbiatbhldlamviec,

                    TongHangMucDaTrangCap: tonghangmucdatrangcap,
                    CacDonViQLVHCoLienQuan: cacdonviqlvhcolienquan,

                    TenNguoiGiamSatATD: tennguoigiamsatatd,
                    BacATDNguoiGiamSatATD: nguoigiamsatatdbacatd,
                    TenNguoiChoPhep: nguoichophep,
                    BacNguoiChoPhep: nguoichiphepbacatd,

                    NgayCapPCT: ngaycapphieucongtac,
                    TenNguoiCapPCT: tennguoicappct
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Phiếu công tác điện.", "error");
                    }
                    else {
                        nguyen.appUserLoginLogger(userName, "Lưu Phiếu công tác điện. code: " + diencode);

                        tedu.notify('Lưu Phiếu công tác điện.', 'success');

                        loadTablePCTDien(true);

                        addeditClearData();

                        $('#modal-add-edit-EditPCTDienNhap').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu Phiếu công tác điện.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function updatePCTDien() {
        var pctdienId = $('#hidPCTDienId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var diencode = $('#hidPCTDienCode').val();

            var khuvuc1 = $("#ddlPCTDienNhap1KhuVuc").val();
            var phongban1 = $("#ddlPCTDienNhap1PhongBan").val();

            var nguoilanhdaocongviecId = $('#hidPCTDienNguoiLanhDaoCongViecId').val();
            var nguoichihuytructiepId = $('#hidPCTDienNguoiChiHuyTrucTiepId').val();
            var nguoigiamsatatdId = $('#hidPCTDienNguoiGiamSatATDId').val();
            var nguoichophepId = $('#hidPCTDienNguoiChoPhepId').val();
            var tennguoicappctId = $('#hidPCTDienTenNguoiCapPCTId').val();

            var tennguoilanhdaocongviec = $("#txtNguoiLanhDaoCongViec").val();
            var nguoilanhdaocongviecbacatd = $("#ddlNguoiLanhDaoCongViecBacATD").val();
            var tennguoichihuytructiep = $("#txtNguoiChiHuyTrucTiep").val();
            var nguoichihuytructiepbacatd = $("#ddlNguoiChiHuyTrucTiepBacATD").val();

            var diadiemcongtac = $("#txtPCTDiaDiemCongTac").val();

            var giobatdaucongviec = $("#txtPCTDienGioBatDauCongViec").val();
            var phutbatdaucongviec = $("#txtPCTDienPhutBatDauCongViec").val();
            var ngaybatdaucongviec = tedu.getFormatDateYYMMDD($('#txtPCTDienNgayBatDauCongViec').val());
            var gioketthuccongviec = $("#txtPCTDienGioKetThucCongViec").val();
            var phutketthuccongviec = $("#txtPCTDienPhutKetThucCongViec").val();
            var ngayketthuccongviec = tedu.getFormatDateYYMMDD($('#txtPCTDienNgayKetThucCongViec').val());

            var thuoccongtydonvi = $("#txtPCTDienThuocCongTyDonVi").val();
            var noidungcongtac = $("#txtPCTDienNoiDungCongTac").val();
            var dieukienantoandien = $("#txtPCTDienDieuKienATD").val();
            var trangbiatbhldlamviec = $("#txtPCTDienTrangBiATBHLDLamViec").val();

            var tonghangmucdatrangcap = $("#txtPCTDienTongHangMucDaTrangCap").val();
            var cacdonviqlvhcolienquan = $("#txtPCTDienCacDonViQLVHCoLienQuan").val();

            var tennguoigiamsatatd = $("#txtPCTDienNguoiGiamSatATD").val();
            var nguoigiamsatatdbacatd = $("#ddlPCTDienNguoiGiamSatATDBacATD").val();
            var nguoichophep = $("#txtPCTDienNguoiChoPhep").val();
            var nguoichiphepbacatd = $("#ddlPCTDienNguoiChoPhepATDATD").val();

            var ngaycapphieucongtac = tedu.getFormatDateYYMMDD($('#txtPCTDienNgayCapPCT').val());
            var tennguoicappct = $("#txtPCTDienTenNguoiCapPCT").val();

            $.ajax({
                type: "POST",
                url: "/Admin/pctdiennhap/UpdatePCTD",
                data: {
                    Id: pctdienId,
                    Code: diencode,

                    CorporationId: khuvuc1,
                    PhongBanDanhMucId: phongban1,

                    NguoiLanhDaoCongViecId: nguoilanhdaocongviecId,
                    NguoiChiHuyTrucTiepId: nguoichihuytructiepId,
                    NguoiGiamSatATDId: nguoigiamsatatdId,
                    NguoiChoPhepId: nguoichophepId,
                    TenNguoiCapPCTId: tennguoicappctId,

                    TenNguoiLanhDaoCongViec: tennguoilanhdaocongviec,
                    BacATDNguoiLanhDaoCongViecId: nguoilanhdaocongviecbacatd,
                    TenNguoiChiHuyTrucTiep: tennguoichihuytructiep,
                    BacATDNguoiChiHuyTrucTiepId: nguoichihuytructiepbacatd,

                    DiaDiemCongTac: diadiemcongtac,

                    GioBatDauKH: giobatdaucongviec,
                    PhutBatDauKH: phutbatdaucongviec,
                    NgayBatDauKH: ngaybatdaucongviec,
                    GioKetThucKH: gioketthuccongviec,
                    PhutKetThucKH: phutketthuccongviec,
                    NgayKetThucKH: ngayketthuccongviec,

                    CacCongTyDonVi: thuoccongtydonvi,
                    CacNoiDungCongTac: noidungcongtac,
                    CacDieuKiemATLD: dieukienantoandien,
                    CacTrangBiATBHLDLamViec: trangbiatbhldlamviec,

                    TongHangMucDaTrangCap: tonghangmucdatrangcap,
                    CacDonViQLVHCoLienQuan: cacdonviqlvhcolienquan,

                    TenNguoiGiamSatATD: tennguoigiamsatatd,
                    BacATDNguoiGiamSatATD: nguoigiamsatatdbacatd,
                    TenNguoiChoPhep: nguoichophep,
                    BacNguoiChoPhep: nguoichiphepbacatd,

                    NgayCapPCT: ngaycapphieucongtac,
                    TenNguoiCapPCT: tennguoicappct
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Update Phiếu công tác điện.", "error");
                    }
                    else {
                        nguyen.appUserLoginLogger(userName, "Update Phiếu công tác điện. Id: " + pctdienId);

                        tedu.notify('Update Phiếu công tác điện.', 'success');

                        loadTablePCTDien(true);

                        addeditClearData();

                        $('#modal-add-edit-EditPCTDienNhap').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Update Phiếu công tác điện.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function loaEditPCTDien() {
        var pctdienId = $('#hidPCTDienId').val();

        $.ajax({
            type: "GET",
            url: "/Admin/pctdiennhap/GetpctdId",
            data: {
                PCTDienId: pctdienId
            },
            dataType: "json",

            success: function (response) {
                var pctdien = response.Result;

                addeditClearData();

                $('#hidPCTDienCode').val(pctdien.Code);

                loadTableDSNhanVienDonViCT();

                var makhuvuc1 = pctdien.CorporationId;
                $("#ddlPCTDienNhap1KhuVuc").val(makhuvuc1);                     
                //$("#ddlPCTDienNhap1PhongBan").val(pctdien.PhongBanDanhMucId);
                loadAddEditPhongBanTheoKhuVuc(makhuvuc1, pctdien.PhongBanDanhMucId);

                $('#hidPCTDienNguoiLanhDaoCongViecId').val(pctdien.NguoiLanhDaoCongViecId);
                $('#hidPCTDienNguoiChiHuyTrucTiepId').val(pctdien.NguoiChiHuyTrucTiepId);
                $('#hidPCTDienNguoiGiamSatATDId').val(pctdien.NguoiGiamSatATDId);
                $('#hidPCTDienNguoiChoPhepId').val(pctdien.NguoiChoPhepId);
                $('#hidPCTDienTenNguoiCapPCTId').val(pctdien.TenNguoiCapPCTId);

                $("#txtSoPhieuCongTac").val(pctdien.SoPhieuCongTac);

                $("#txtNguoiLanhDaoCongViec").val(pctdien.TenNguoiLanhDaoCongViec);
                $("#ddlNguoiLanhDaoCongViecBacATD").val(pctdien.BacATDNguoiLanhDaoCongViecId);
                $("#txtNguoiChiHuyTrucTiep").val(pctdien.TenNguoiChiHuyTrucTiep);
                $("#ddlNguoiChiHuyTrucTiepBacATD").val(pctdien.BacATDNguoiChiHuyTrucTiepId);

                $("#txtPCTDiaDiemCongTac").val(pctdien.DiaDiemCongTac);

                $("#txtPCTDienGioBatDauCongViec").val(pctdien.GioBatDauKH);
                $("#txtPCTDienPhutBatDauCongViec").val(pctdien.PhutBatDauKH);
                $("#txtPCTDienNgayBatDauCongViec").val(pctdien.NgayBatDauKH !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(pctdien.NgayBatDauKH) : '');                
                $("#txtPCTDienGioKetThucCongViec").val(pctdien.GioKetThucKH);
                $("#txtPCTDienPhutKetThucCongViec").val(pctdien.PhutKetThucKH);
                $("#txtPCTDienNgayKetThucCongViec").val(pctdien.NgayKetThucKH !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(pctdien.NgayKetThucKH) : '');
               
                $("#txtPCTDienThuocCongTyDonVi").importTags(pctdien.CacCongTyDonVi != null ? pctdien.CacCongTyDonVi : '');
                $("#txtPCTDienNoiDungCongTac").importTags(pctdien.CacNoiDungCongTac != null ? pctdien.CacNoiDungCongTac : '');
                $("#txtPCTDienDieuKienATD").importTags(pctdien.CacDieuKiemATLD != null ? pctdien.CacDieuKiemATLD : '');
                $("#txtPCTDienTrangBiATBHLDLamViec").importTags(pctdien.CacTrangBiATBHLDLamViec != null ? pctdien.CacTrangBiATBHLDLamViec : '');

                $("#txtPCTDienTongHangMucDaTrangCap").val(pctdien.TongHangMucDaTrangCap);
                $("#txtPCTDienCacDonViQLVHCoLienQuan").val(pctdien.CacDonViQLVHCoLienQuan);

                $("#txtPCTDienNguoiGiamSatATD").val(pctdien.TenNguoiGiamSatATD);
                $("#ddlPCTDienNguoiGiamSatATDBacATD").val(pctdien.BacATDNguoiGiamSatATD);
                $("#txtPCTDienNguoiChoPhep").val(pctdien.TenNguoiChoPhep);
                $("#ddlPCTDienNguoiChoPhepATDATD").val(pctdien.BacNguoiChoPhep);

                $("#txtPCTDienNgayCapPCT").val(pctdien.NgayCapPCT !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(pctdien.NgayCapPCT) : '');               
                $("#txtPCTDienTenNguoiCapPCT").val(pctdien.TenNguoiCapPCT);   
                
                $('#modal-add-edit-EditPCTDienNhap').modal('show');

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

}