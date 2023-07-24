var pctdiennhapController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var NGUOICAPPHIEU = 'NGUOICAPPHIEU';
    var NGUOICHIHUYTT = 'NGUOICHIHUYTT';
    var NGUOICHOPHEP = 'NGUOICHOPHEP';
    var NGUOIKTATLD = 'NGUOIKTATLD';
    var NGUOILANHDAOCV = 'NGUOILANHDAOCV';    

    var addeditpctdien = new addeditpctdienController();
    var chopheplamviec = new chopheplamviecController();
    var diadiemcongtac = new diadiemcongtacController();
    var ketthuccongtac = new ketthuccongtacController();
    var thaydoinguoilamviec = new thaydoinguoilamviecController();
    var huycongtac = new huycongtacController();
    var ddctaddhinh = new ddctaddhinhController();
    var kiemtrathuchien = new kiemtrathuchienController();
    var dsdakhoasopct = new dsdakhoasopctController();

    var loaddatatable = new loaddatatableController();

    this.initialize = function () {
        loadPhongUserName(userName);
        loadKhuVuc();
        loadData();

        registerEvents();

        clearData();
        
        buttonTongHopPCTDien();

        addeditpctdien.initialize();     
        chopheplamviec.initialize();  
        diadiemcongtac.initialize(); 
        ketthuccongtac.initialize(); 
        thaydoinguoilamviec.initialize(); 
        huycongtac.initialize();
        ddctaddhinh.initialize();
        kiemtrathuchien.initialize();
        dsdakhoasopct.initialize();
    }    

    function registerEvents() {
        
        $('#txtPCTDBaoCaoTuNgay, #txtPCTDBaoCaoDenNgay ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });      

        $('#ckPCTDChonHetNhanVienKhuVuc').on('click', function () {
            let ckNhanVienKhuVuc = document.getElementById('ckPCTDChonHetNhanVienKhuVuc');
            let khuvuc1nhap = $("#ddlPCTDienNhap1KhuVuc").val();
            let phongban = $("#ddlPCTDienNhap1PhongBan").val();  

            if (ckNhanVienKhuVuc.checked) {                
                //loadAutocompleteNhanVienByCor(khuvuc1nhap);
                loadAutocompleteNhanVienByCorChucDanh(khuvuc1nhap, NGUOICAPPHIEU);
                loadAutocompleteNhanVienByCorChucDanh(khuvuc1nhap, NGUOICHIHUYTT);
                loadAutocompleteNhanVienByCorChucDanh(khuvuc1nhap, NGUOICHOPHEP);
                loadAutocompleteNhanVienByCorChucDanh(khuvuc1nhap, NGUOIKTATLD);
                loadAutocompleteNhanVienByCorChucDanh(khuvuc1nhap, NGUOILANHDAOCV);
            }
            else {
                //loadAutocompleteNhanVienByCor(khuvuc1nhap);
                loadAutocompleteNhanVienByCorChucDanh(khuvuc1nhap, NGUOICAPPHIEU);
                loadAutocompleteNhanVienByCorChucDanh(khuvuc1nhap, NGUOICHIHUYTT);
                loadAutocompleteNhanVienByCorChucDanh(khuvuc1nhap, NGUOICHOPHEP);
                loadAutocompleteNhanVienByCorChucDanh(khuvuc1nhap, NGUOIKTATLD);
                loadAutocompleteNhanVienByCorChucDanh(khuvuc1nhap, NGUOILANHDAOCV);

                loadAutocompleteNhanVienByCorPhong(khuvuc1nhap, phongban)
            }
        });

        $('#ckPCTDBaoCaoChonTheoNgay').on('click', function () {
            var ckTheoNgay = document.getElementById('ckPCTDBaoCaoChonTheoNgay');
            if (ckTheoNgay.checked) {
                $('#txtPCTDBaoCaoTuNgay').prop('disabled', false);
                $('#txtPCTDBaoCaoDenNgay').prop('disabled', false);
            }
            else {
                $('#txtPCTDBaoCaoTuNgay').prop('disabled', true);
                $('#txtPCTDBaoCaoDenNgay').prop('disabled', true);
            }
        });

        $("#btn-create").on('click', function () {
            $('#hidInsertPCTDien').val(1);         
            
            addeditpctdien.addeditClearData();

            var guid = CreateGuid();
            $('#hidPCTDienCode').val(guid);

            // tai khoan thuoc Xi nghiep 
            if (userCorporationId !== "PO") {
                $("#ddlPCTDienChonThuocCongTyDonVi")[0].selectedIndex = 1;
                var ChonThuocCongTyDonVi = $('#ddlPCTDienChonThuocCongTyDonVi :selected').text();
                if (ChonThuocCongTyDonVi !== '%') {
                    $('#txtPCTDienThuocCongTyDonVi').addTag(ChonThuocCongTyDonVi);
                }
            }            

            $('#divbtnDaKhoaSoPCT').show();            

            $('#modal-add-edit-EditPCTDienNhap').modal('show');
        });

        $('body').on('click', '.btn-addeditPCTDien', function (e) {
            e.preventDefault();
            var pctdienid = $(this).data('id');
            $('#hidPCTDienId').val(pctdienid);
            
            // 2 - Update Order
            $('#hidInsertPCTDien').val(2);

            $('#divbtnDaKhoaSoPCT').hide();

            addeditpctdien.loaEditPCTDien();              
        });

        $('body').on('click', '.btn-ThayDoiNguoiCT', function (e) {
            e.preventDefault();
            var pctdienid = $(this).data('id');
            $('#hidPCTDienId').val(pctdienid);
            //1 - insert ;  2 - Update Order
            $('#hidInsertPCTDien').val(2);
            $('#hidInsertThayDoiNguoiCongTac').val(1);

            $('#modal-add-edit-EditThayDoiNguoiCongTac').modal('show');
            thaydoinguoilamviec.loadTableThayDoiNguoiLamViec();
        });

        $('body').on('click', '.btn-ChoPhepLamViec', function (e) {
            e.preventDefault();
            var pctdienid = $(this).data('id');
            $('#hidPCTDienId').val(pctdienid);
            // 2 - Update Order
            $('#hidInsertPCTDien').val(2);
            
            chopheplamviec.loadEditChoPhepLamViec();
        });

        $('body').on('click', '.btn-DiaDiemCongTac', function (e) {
            e.preventDefault();
            var pctdienid = $(this).data('id');
            $('#hidPCTDienId').val(pctdienid);
            //1 - insert ;  2 - Update Order
            $('#hidInsertPCTDien').val(2);
            $('#hidInsertDiaDiemCongTac').val(1);

            diadiemcongtac.loadTableDiaDiemCongTac();
            $('#modal-add-edit-EditPCTDienDiaDiemCongTac').modal('show');            
        });

        //$('body').on('click', '.btn-HuyCongTac', function (e) {
        //    e.preventDefault();
        //    var pctdienid = $(this).data('id');
        //    $('#hidPCTDienId').val(pctdienid);
        //    //1 - insert ;  2 - Update Order
        //    $('#hidInsertPCTDien').val(2);            

        //    $('#modal-add-edit-EditPCTDienHuyCongTac').modal('show');
        //    huycongtac.loadEditHuyCongTac();
        //});        

        $('body').on('click', '.btn-KetThucCongTac', function (e) {
            e.preventDefault();
            var pctdienid = $(this).data('id');
            $('#hidPCTDienId').val(pctdienid);
            // 2 - Update Order
            $('#hidInsertPCTDien').val(2);
            
            ketthuccongtac.loadEditKetThucCongTac();
        });

        $('body').on('click', '.btn-InPhieuCongTac', function (e) {
            e.preventDefault();
            var pctdienid = $(this).data('id');            
            $('#hidPCTDienId').val(pctdienid);

            const isnguoicapphieu = $('#hidisNGUOICAPPHIEU').val();
            const isnguoichihuytt = $('#hidisNGUOICHIHUYTT').val();

            if (isnguoicapphieu == 'true' || isnguoichihuytt == 'true') {
                inPhieuCongTac(pctdienid);
            }
            else {
                tedu.notify('Phải là người có chức danh cấp phiếu hoặc người chỉ huy trực tiếp.', 'error');
            }             
        });

        // Chon Khu vuc trong phan Nhap PCT dien de the hien ds nhan vien xi nghiep khac
        $('#ddlPCTDienNhap1KhuVuc').on('change', function () {
            var corporationId = $('#ddlPCTDienNhap1KhuVuc').val();
            //loadAutocompleteNhanVienByCor(corporationId);
            
            loadAutocompleteNhanVienByCorChucDanh(corporationId, NGUOICAPPHIEU);
            loadAutocompleteNhanVienByCorChucDanh(corporationId, NGUOICHIHUYTT);
            loadAutocompleteNhanVienByCorChucDanh(corporationId, NGUOICHOPHEP);
            loadAutocompleteNhanVienByCorChucDanh(corporationId, NGUOIKTATLD);
            loadAutocompleteNhanVienByCorChucDanh(corporationId, NGUOILANHDAOCV);
        });       

        $('#ddlKhuVuc').on('change', function () {
            var corporationId = $('#ddlKhuVuc').val();

            loadPhongKhuVuc(corporationId);            
        });

        $("#btnTimNoiDung").on('click', function () {
            $('#ddlPCTDBaoCaoDieuKien')[0].selectedIndex = 0;
            addeditpctdien.loadTablePCTDien();
            countTongHopPCTDien();
        });

        $('#txtTimNoiDung').on('keypress', function (e) {
            if (e.which === 13) {
                $('#ddlPCTDBaoCaoDieuKien')[0].selectedIndex = 0;
                addeditpctdien.loadTablePCTDien();
                countTongHopPCTDien();
            }
        });        

        $("#ddl-show-pagePCTDien").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;

            loaddatatable.loadTablePCTDien();
        });

        $('#btnPCTDBaoCaoDieuKien').on('click', function (e) {
            $('#hidBienLoadTable').val(0); // 0 ko cho thuc hien ; 1 cho thuc hien load table

            let ckTheoNgay = document.getElementById('ckPCTDBaoCaoChonTheoNgay');
            if (ckTheoNgay.checked == true) {
                loaddatatable.loadTablePCTDien();
            } else {
                addeditpctdien.loadTablePCTDien();
            }            
        });

        $('body').on('click', '.btn-KiemTraThucHien', function (e) {
            e.preventDefault();
            var pctdienid = $(this).data('id');
            $('#hidPCTDienId').val(pctdienid);
            //1 - insert ;  2 - Update Order
            $('#hidInsertPCTDien').val(2);            

            //$('#modal-add-edit-EditKiemTraThucHien').modal('show');
            kiemtrathuchien.loadEditKiemTraThucHien();
        }); 

        $('#ddlChucDanhNhanVien').on('change', function () {
            let corporationId = $('#ddlKhuVuc').val();
            let chucdanhnhanvien = $('#ddlChucDanhNhanVien').val();
            loadTenNhanVienTheoChucDanh(corporationId, chucdanhnhanvien);
        });

        $('#ddlTenNhanVienTheoChucDanh').on('change', function () {
            let corporationId = $('#ddlKhuVuc').val();
            let chucdanhnhanvien = $('#ddlChucDanhNhanVien').val();
            let tenchucdanhtheonhanvien = $('#ddlTenNhanVienTheoChucDanh').val();
            loaddatatable.loadTablePCTDienTheoTenChucDanhNhanVien(corporationId, chucdanhnhanvien, tenchucdanhtheonhanvien);
        });

    }

    function loadData() {
        $('#divbtnDaKhoaSoPCT').hide();    

        loadDataDanhSachTheo();    
        loadDataTenChucDanh();

        let tennhanvientheochucdanh = "<option value='0' >-- Lựa chọn --</option>";
        $('#ddlTenNhanVienTheoChucDanh').html(tennhanvientheochucdanh);
    }

    function loadDataDanhSachTheo() {
        var render = "<option value='0' >-- Bỏ chọn --</option>";
        render += "<option value='2' >-- D.sách Đã cấp PCT --</option>";
        render += "<option value='4' >-- D.sách Cho phép làm việc --</option>";
        render += "<option value='6' >-- D.sách Kết thúc công tác --</option>";
        render += "<option value='8' >-- D.sách Khóa phiếu công tác --</option>";
        //render += "<option value='20' >-- D.sách Hủy PCT --</option>";
        //render += "<option value='PCTXN' >-- D.sách Phiếu công tác theo Xí nghiệp --</option>";
        //render += "<option value='PCTTO' >-- D.sách Phiếu công tác theo phòng, tổ --</option>";
        //render += "<option value='PCTCT' >-- D.sách Phiếu công tác All --</option>";

        $('#ddlPCTDBaoCaoDieuKien').html(render);
    }

    function loadDataTenChucDanh() {
        let tenchucdanh = "<option value='0' >-- Lựa chọn --</option>";
        tenchucdanh += "<option value='NGUOICAPPHIEU' >Người cấp phiếu</option>";
        tenchucdanh += "<option value='NGUOICHIHUYTT' >Người chỉ huy trực tiếp</option>";
        tenchucdanh += "<option value='NGUOICHOPHEP' >Người cho phép</option>";
        tenchucdanh += "<option value='NGUOIKTATLD' >Người kiểm tra ATLĐ</option>";
        tenchucdanh += "<option value='NGUOILANHDAOCV' >Người lãnh đạo công việc</option>";
        $('#ddlChucDanhNhanVien').html(tenchucdanh);
    }

    function clearData() {
        var datenow = new Date();
        $('#txtPCTDBaoCaoTuNgay').val(tedu.getFormattedDate(datenow));
        $('#txtPCTDBaoCaoDenNgay').val(tedu.getFormattedDate(datenow));

        $('#txtPCTDBaoCaoTuNgay').prop('disabled', true);
        $('#txtPCTDBaoCaoDenNgay').prop('disabled', true);
        var ckTheoNgay = document.getElementById('ckPCTDBaoCaoChonTheoNgay');
        ckTheoNgay.checked = false;

        $("#ddlChucDanhNhanVien")[0].selectedIndex = 0;
        $("#ddlTenNhanVienTheoChucDanh")[0].selectedIndex = 0;
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
                $('#ddlPCTDienNhap1KhuVuc').html(render);

                $('#ddlPCTDienChonThuocCongTyDonVi').html(render);
                $('#ddlThayDoiNguoiCongTacKhuVuc').html(render);

                if (userCorporationId !== "PO") {
                    $('#ddlKhuVuc').prop('disabled', true);
                    $('#ddlPhongTo').prop('disabled', true);

                    $('#ddlPCTDienNhap1KhuVuc').prop('disabled', true);
                    $('#ddlPCTDienNhap1PhongBan').prop('disabled', true);

                    //$('#ddlPCTDienChonThuocCongTyDonVi').prop('disabled', true);
                    $('#ddlThayDoiNguoiCongTacKhuVuc').prop('disabled', true);
                }
                else {
                    $('#ddlKhuVuc').prop('disabled', false);
                    $('#ddlPhongTo').prop('disabled', false);

                    $('#ddlPCTDienNhap1KhuVuc').prop('disabled', false);
                    $('#ddlPCTDienNhap1PhongBan').prop('disabled', false);

                    //$('#ddlPCTDienChonThuocCongTyDonVi').prop('disabled', false);
                    $('#ddlThayDoiNguoiCongTacKhuVuc').prop('disabled', false);
                }
                $("#ddlKhuVuc")[0].selectedIndex = 1;  
                $("#ddlPCTDienNhap1KhuVuc")[0].selectedIndex = 1;
                $("#ddlThayDoiNguoiCongTacKhuVuc")[0].selectedIndex = 1;

                //$("#ddlPCTDienChonThuocCongTyDonVi")[0].selectedIndex = 0;

                let khuvuc1nhap = $("#ddlPCTDienNhap1KhuVuc").val();

                loadPhongKhuVuc($("#ddlKhuVuc").val()); 
                loadPCTDienNhapPhongKhuVuc(khuvuc1nhap); 

                //loadAutocompleteNhanVienByCor($("#ddlKhuVuc").val());

                loadAutocompleteNhanVienByCorChucDanh(corporationId, NGUOICAPPHIEU);
                loadAutocompleteNhanVienByCorChucDanh(corporationId, NGUOICHIHUYTT);
                loadAutocompleteNhanVienByCorChucDanh(corporationId, NGUOICHOPHEP);
                loadAutocompleteNhanVienByCorChucDanh(corporationId, NGUOIKTATLD);
                loadAutocompleteNhanVienByCorChucDanh(corporationId, NGUOILANHDAOCV);
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
                $('#ddlPhongTo').html(render);
                //$("#ddlPhongTo")[0].selectedIndex = 0;    

                let phongdanhmucid = $('#hidPhongDanhMucId').val();
                let tenphongto = $("#ddlPhongTo :selected").text();

                if (makhuvuc == 'PO') {                    
                    $("#ddlPhongTo").val(phongdanhmucid);   
                    
                    // chi tai khoan thuoc phong KT Điện Nước thi cho hien het de quan ly
                    if (tenphongto === "Phòng KT Điện Nước") {
                        $('#ddlPhongTo').prop('disabled', false);
                    }
                }
                else {
                    $("#ddlPhongTo").val(phongdanhmucid);

                    // chi tai khoan thuoc phong KT Điện Nước thi cho hien het de quan ly
                    if (tenphongto === "Phòng KT Điện Nước") {
                        $('#ddlPhongTo').prop('disabled', false);
                    }
                    else {
                        $("#ddlPhongTo")[0].selectedIndex = 0;    
                    }
                }

                addeditpctdien.loadTablePCTDien();
                dsdakhoasopct.loadTableDsDaKhoaSoPCT();

                countTongHopPCTDien(); 
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
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
                //$("#ddlPCTDienNhap1PhongBan")[0].selectedIndex = 0;
                var phongdanhmucid = $('#hidPhongDanhMucId').val();
                $("#ddlPCTDienNhap1PhongBan").val(phongdanhmucid);               

                loadAutocompleteNhanVienByCorPhong(makhuvuc, phongdanhmucid);

                loadAutocompleteNhanVienByCorChucDanh(makhuvuc, NGUOICAPPHIEU);
                loadAutocompleteNhanVienByCorChucDanh(makhuvuc, NGUOICHIHUYTT);
                loadAutocompleteNhanVienByCorChucDanh(makhuvuc, NGUOICHOPHEP);
                loadAutocompleteNhanVienByCorChucDanh(makhuvuc, NGUOIKTATLD);
                loadAutocompleteNhanVienByCorChucDanh(makhuvuc, NGUOILANHDAOCV);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    }     

    function loadAutocompleteNhanVienByCorChucDanh(corporationId, codeChucDanhNhanVien) {
        $.ajax({
            type: 'GET',
            url: "/admin/pctdiennhap/GetNhanVienByCorChucDanh",
            data: {
                corporationid: corporationId,
                codeChucDanhNhanVien: codeChucDanhNhanVien
            },
            async: true,
            dataType: 'json',
            success: function (database) {
                arrayReturn = [];
                var data = database.Result;
                for (var i = 0, len = data.length; i < len; i++) {
                    arrayReturn.push({
                        'value': data[i].Ten + '-' + data[i].TenChucVu,
                        'TenChucVu': data[i].TenChucVu,
                        'BacAnToanDienId': data[i].BacAnToanDienId,
                        'Ten': data[i].Ten,
                        'Id': data[i].Id
                    });
                }

                if (codeChucDanhNhanVien == 'NGUOILANHDAOCV') {
                    loadSuggestionsNguoiLanhDaoCongViec(arrayReturn);    
                }   
                else if (codeChucDanhNhanVien == 'NGUOICHIHUYTT') {
                    loadSuggestionsNguoiChiHuyTrucTiep(arrayReturn);
                } 
                else if (codeChucDanhNhanVien == 'NGUOIKTATLD') {
                    loadSuggestionsNguoiKiemTraATD(arrayReturn);
                }
                else if (codeChucDanhNhanVien == 'NGUOICHOPHEP') {
                    loadSuggestionsNguoiChoPhep(arrayReturn);
                }
                else if (codeChucDanhNhanVien == 'NGUOICAPPHIEU') {
                    loadSuggestionsNguoiCapPhieu(arrayReturn);
                }

            }
        });
    }

    function loadSuggestionsNguoiLanhDaoCongViec(options) {
        $('#txtNguoiLanhDaoCongViec').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {
                $('#hidPCTDienNguoiLanhDaoCongViecId').val(suggestion.Id);
                $('#txtNguoiLanhDaoCongViec').val(suggestion.Ten);
                $('#ddlNguoiLanhDaoCongViecBacATD').val(suggestion.BacAnToanDienId);
            }
        });       
    } 
    function loadSuggestionsNguoiChiHuyTrucTiep(options) {
        $('#txtNguoiChiHuyTrucTiep').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {
                $('#hidPCTDienNguoiChiHuyTrucTiepId').val(suggestion.Id);
                $('#txtNguoiChiHuyTrucTiep').val(suggestion.Ten);
                $('#ddlNguoiChiHuyTrucTiepBacATD').val(suggestion.BacAnToanDienId);
            }
        });
    }
    function loadSuggestionsNguoiKiemTraATD(options) {
        $('#txtPCTDienNguoiGiamSatATD').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {
                $('#hidPCTDienNguoiGiamSatATDId').val(suggestion.Id);
                $('#txtPCTDienNguoiGiamSatATD').val(suggestion.Ten);
                $('#ddlPCTDienNguoiGiamSatATDBacATD').val(suggestion.BacAnToanDienId);
            }
        });
    }
    function loadSuggestionsNguoiChoPhep(options) {
        $('#txtPCTDienNguoiChoPhep').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {
                $('#hidPCTDienNguoiChoPhepId').val(suggestion.Id);
                $('#txtPCTDienNguoiChoPhep').val(suggestion.Ten);
                $('#ddlPCTDienNguoiChoPhepATDATD').val(suggestion.BacAnToanDienId);
            }
        });
    }
    function loadSuggestionsNguoiCapPhieu(options) {
        $('#txtPCTDienTenNguoiCapPCT').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {
                $('#hidPCTDienTenNguoiCapPCTId').val(suggestion.Id);
                $('#txtPCTDienTenNguoiCapPCT').val(suggestion.Ten);
            }
        });    }
    
    function loadAutocompleteNhanVienByCor(corporationId) {
        $.ajax({
            type: 'GET',
            url: "/admin/pctdiennhap/GetNhanVienByCor",
            data: {
                corporationid: corporationId
            },
            async: true,
            dataType: 'json',
            success: function (database) {
                arrayReturn = [];
                var data = database.Result;
                for (var i = 0, len = data.length; i < len; i++) {
                    arrayReturn.push({
                        'value': data[i].Ten + '-' + data[i].TenChucVu,
                        'TenChucVu': data[i].TenChucVu,
                        'BacAnToanDienId': data[i].BacAnToanDienId,
                        'Ten': data[i].Ten,
                        'Id': data[i].Id
                    });
                }                
                //send parse data to autocomplete function
                loadSuggestions(arrayReturn);
                //console.log(countries);  
                var ckNhanVienKhuVuc = document.getElementById('ckPCTDChonHetNhanVienKhuVuc');
                if (ckNhanVienKhuVuc.checked) {
                    loadSuggestionsByPhongDanhMuc(arrayReturn);
                }                
            }
        });
    }

    function loadSuggestions(options) {
        //$('#txtNguoiLanhDaoCongViec').autocomplete({
        //    lookup: options,
        //    onSelect: function (suggestion) {
        //        $('#hidPCTDienNguoiLanhDaoCongViecId').val(suggestion.Id);
        //        $('#txtNguoiLanhDaoCongViec').val(suggestion.Ten);
        //        $('#ddlNguoiLanhDaoCongViecBacATD').val(suggestion.BacAnToanDienId);                
        //    }
        //});
        
        //$('#txtPCTDienNguoiGiamSatATD').autocomplete({
        //    lookup: options,
        //    onSelect: function (suggestion) {
        //        $('#hidPCTDienNguoiGiamSatATDId').val(suggestion.Id);
        //        $('#txtPCTDienNguoiGiamSatATD').val(suggestion.Ten);
        //        $('#ddlPCTDienNguoiGiamSatATDBacATD').val(suggestion.BacAnToanDienId);
        //    }
        //});
    }    

    function loadAutocompleteNhanVienByCorPhong(corporationId, phongdanhmucid) {
        $.ajax({
            type: 'GET',
            url: "/admin/pctdiennhap/GetNVByCorPhong",
            data: {
                corporationid: corporationId,
                phongbandanhmucid: phongdanhmucid
            },
            async: true,
            dataType: 'json',
            success: function (database) {
                arrayReturn = [];
                var data = database.Result;
                for (var i = 0, len = data.length; i < len; i++) {
                    arrayReturn.push({
                        'value': data[i].Ten + '-' + data[i].TenChucVu,
                        'TenChucVu': data[i].TenChucVu,
                        'BacAnToanDienId': data[i].BacAnToanDienId,
                        'Ten': data[i].Ten,
                        'Id': data[i].Id
                    });
                }
                //send parse data to autocomplete function
                loadSuggestionsByPhongDanhMuc(arrayReturn);                              
            }
        });
    }

    function loadSuggestionsByPhongDanhMuc(options) {
        //$('#txtNguoiChiHuyTrucTiep').autocomplete({
        //    lookup: options,
        //    onSelect: function (suggestion) {
        //        $('#hidPCTDienNguoiChiHuyTrucTiepId').val(suggestion.Id);
        //        $('#txtNguoiChiHuyTrucTiep').val(suggestion.Ten);
        //        $('#ddlNguoiChiHuyTrucTiepBacATD').val(suggestion.BacAnToanDienId);
        //    }
        //});
        $('#txtPCTThemDsNhanVienDonViCongTac').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {
                const isnguoicapphieu = $('#hidisNGUOICAPPHIEU').val();

                $('#txtPCTThemDsNhanVienDonViCongTac').val('');                
                if (isnguoicapphieu == 'true') {
                    addeditpctdien.AddToTableDSNhanVienDonViCT(suggestion.Id);
                }
                else {
                    tedu.notify('Phải là người có chức danh cấp phiếu.', 'error');
                }
            }
        });
        //$('#txtPCTDienNguoiChoPhep').autocomplete({
        //    lookup: options,
        //    onSelect: function (suggestion) {
        //        $('#hidPCTDienNguoiChoPhepId').val(suggestion.Id);
        //        $('#txtPCTDienNguoiChoPhep').val(suggestion.Ten);
        //        $('#ddlPCTDienNguoiChoPhepATDATD').val(suggestion.BacAnToanDienId);                
        //    }
        //});
        //$('#txtPCTDienTenNguoiCapPCT').autocomplete({
        //    lookup: options,
        //    onSelect: function (suggestion) {
        //        $('#hidPCTDienTenNguoiCapPCTId').val(suggestion.Id);
        //        $('#txtPCTDienTenNguoiCapPCT').val(suggestion.Ten);
        //    }
        //});
        //Danh sach thay doi nguoi cong tac
        $('#txtTenNhanVienThayDoiCongTac').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {
                $('#hidThayDoiNguoiCongTacTenNhanVienThayDoiId').val(suggestion.Id);
                $('#txtTenNhanVienThayDoiCongTac').val(suggestion.Ten);
                $('#ddlTenNhanVienThayDoiCongTacBacATD').val(suggestion.BacAnToanDienId);
            }
        });
        // Danh sach dia diem lam viec
        $('#txtDDLVNguoiChiHuyTrucTiep').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {
                $('#hidDDLVNguoiChiHuyTrucTiepId').val(suggestion.Id);
                $('#txtDDLVNguoiChiHuyTrucTiep').val(suggestion.Ten);
            }
        });
        $('#txtDDLVNguoiChoPhep').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {
                $('#hidDDLVNguoiChoPhepId').val(suggestion.Id);
                $('#txtDDLVNguoiChoPhep').val(suggestion.Ten);
            }
        });      
    }

    // new guid()
    function CreateGuid() {
        var d = new Date().getTime();
        var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return guid;
    }

    function inPhieuCongTac(pctdienid) {
        //tedu.notify('in phieu cong tac dien', 'success');
        $.ajax({
            type: 'GET',
            url: '/admin/pctdiennhap/InPCTD',
            data: {
                PCTDienId: pctdienid
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                nguyen.appUserLoginLogger(userName, "In Phiếu công tác điện.");

                if (response.Result.length !== 0) {
                    window.open('/Admin/RpPCTDienInPCT/Index', '_blank');
                }
                else {
                    window.open('/Admin/RpPCTDienInPCT/Index', '_blank');
                }
                tedu.stopLoading();
            },
        });
    }

    function loadPhongUserName(username) {
        $.ajax({
            type: 'GET',
            url: '/admin/podangkynuoc/PhongByUserName',
            data: {
                UserName: username
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                $('#hidPhongDanhMucId').val(response.Result.PhongBanDanhMucId);
                $('#hidPhongDanhMucMAPB').val(response.Result.MAPB);

                let cacchucdanhnhanvien = response.Result.CacChucDanhNhanVien;
                $('#hidCacChucDanhNhanVien').val(cacchucdanhnhanvien);
                
                const isNGUOICAPPHIEU = cacchucdanhnhanvien.split(',').find(el => el === NGUOICAPPHIEU) != undefined;
                const isNGUOICHIHUYTT = cacchucdanhnhanvien.split(',').find(el => el === NGUOICHIHUYTT) != undefined;
                const isNGUOICHOPHEP = cacchucdanhnhanvien.split(',').find(el => el === NGUOICHOPHEP) != undefined;
                const isNGUOIKTATLD = cacchucdanhnhanvien.split(',').find(el => el === NGUOIKTATLD) != undefined;
                const isNGUOILANHDAOCV = cacchucdanhnhanvien.split(',').find(el => el === NGUOILANHDAOCV) != undefined;  

                $('#hidisNGUOICAPPHIEU').val(isNGUOICAPPHIEU);
                $('#hidisNGUOICHIHUYTT').val(isNGUOICHIHUYTT);
                $('#hidisNGUOICHOPHEP').val(isNGUOICHOPHEP);
                $('#hidisNGUOIKTATLD').val(isNGUOIKTATLD);
                $('#hidisNGUOILANHDAOCV').val(isNGUOILANHDAOCV);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    }

    function countTongHopPCTDien() {
        var makhuvuc = $('#ddlKhuVuc').val();
        var phongtoid = $('#ddlPhongTo').val();
        var timnoidung = $('#txtTimNoiDung').val();

        let trangthaipct = 0;         

        $.ajax({
            type: 'GET',
            url: '/admin/pctdiennhap/ListPCTDTrThaiCount',
            data: {
                KhuVuc: makhuvuc,
                PhongTo: phongtoid,
                TrangThai: trangthaipct
            },
            dataType: 'json',
            success: function (response) {
                let pctdtrangthai = response.Result[0];
                $('#spanDaCapPCT').html(pctdtrangthai.DaCapPCT);
                $('#spanXacNhanDaCapPCT').html(pctdtrangthai.XacNhanDaCapPCT);
                $('#spanChoPhepLVPCT').html(pctdtrangthai.ChoPhepLV);
                //$('#spanHuyPCT').html(pctdtrangthai.HuyPCT);
                $('#spanKhoaPhieuKhiSai').html(pctdtrangthai.KhoaKhiSaiPCT);
                $('#spanKetThucPCT').html(pctdtrangthai.KetThucPCT);
                
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function buttonTongHopPCTDien() {
        $('#hidBienLoadTable').val(1); // 0 ko cho thuc hien ; 1 cho thuc hien load table

        $('body').on('click', '.btnDaCapPCT', function (e) {
            e.preventDefault();
            $('#hidBienLoadTable').val(1); // 0 ko cho thuc hien ; 1 cho thuc hien load table
            $('#hidValueBienLoadTable').val(2); // 2 : da cap pct
            loaddatatable.loadTablePCTDien();
        });
        $('body').on('click', '.btnXacNhanDaCapPCT', function (e) {
            e.preventDefault();
            $('#hidBienLoadTable').val(1); // 0 ko cho thuc hien ; 1 cho thuc hien load table
            $('#hidValueBienLoadTable').val(3); // 3 : xac nhan da cap pct
            loaddatatable.loadTablePCTDien();
        });
        $('body').on('click', '.btnChoPhepLVPCT', function (e) {
            e.preventDefault();
            $('#hidBienLoadTable').val(1); // 0 ko cho thuc hien ; 1 cho thuc hien load table
            $('#hidValueBienLoadTable').val(4); // 4 : cho phep lam viec
            loaddatatable.loadTablePCTDien();
        });
        //$('body').on('click', '.btnHuyPCT', function (e) {
        //    e.preventDefault();
        //    $('#hidBienLoadTable').val(1); // 0 ko cho thuc hien ; 1 cho thuc hien load table
        //    $('#hidValueBienLoadTable').val(20); // 20 : huy pct
        //    loaddatatable.loadTablePCTDien();
        //});
        $('body').on('click', '.btnKhoaPhieuKhiSai', function (e) {
            e.preventDefault();
            $('#hidBienLoadTable').val(1); // 0 ko cho thuc hien ; 1 cho thuc hien load table
            $('#hidValueBienLoadTable').val(8); // 8 : khoa phieu khi nhap sai
            loaddatatable.loadTablePCTDien();
        });
        $('body').on('click', '.btnKetThucPCT', function (e) {
            e.preventDefault();
            $('#hidBienLoadTable').val(1); // 0 ko cho thuc hien ; 1 cho thuc hien load table
            $('#hidValueBienLoadTable').val(6); // 6 : ket thuc pct
            loaddatatable.loadTablePCTDien();
        });
    }

    function loadTenNhanVienTheoChucDanh(corporationid, chucdanhnhanvien) {
        $.ajax({
            type: 'GET',
            url: '/admin/pctdiennhap/ListTenNVTheoChucDanh',
            data: {
                corporationId: corporationid,
                tenchucdanh: chucdanhnhanvien
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='0' >-- Lựa chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenNhanVien + "</option>";
                });
                $('#ddlTenNhanVienTheoChucDanh').html(render);                
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Tên nhân viên theo chức danh.', 'error');
            }
        });
    }

}