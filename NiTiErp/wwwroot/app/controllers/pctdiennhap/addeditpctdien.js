var addeditpctdienController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var arrayReturn = [];

    var themnoidungcongtac = new themnoidungcongtacController();  
    var themdieukienatd = new themdieukienatdController();  
    var themtrangbiatbhld = new themtrangbiatbhldController();  
    var themcacdonviqlvh = new themcacdonviqlvhController();      

    var loaddatatable = new loaddatatableController();

    this.loaEditPCTDienDaKhoaSo = function (pctdienId, PCTDienCode) {
        loaEditPCTDienDaKhoaSo(pctdienId, PCTDienCode);
    }

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
        themcacdonviqlvh.initialize();
    }

    function registerEvents() {

        $('#txtPCTDienNgayBatDauCongViec, #txtPCTDienNgayKetThucCongViec, #txtPCTDienNgayCapPCT ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        //formMainValidate();

        loadTagsInput();        

        loadTabsRemoved();

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

        // luu bac an toan den table HoSoNhanVien
        //loadTenHoSoNhanVien();        

        loadChonCacThuocTinhDll();        

        $('#btnSaveEditPCTDien').on('click', function () {
            const ispctdien = $('#hidInsertPCTDien').val(); // 1: insert; 2: update; 
            const isnguoicapphieu = $('#hidisNGUOICAPPHIEU').val();

            if (isnguoicapphieu == 'false') {
                tedu.notify('Phải là người có chức danh cấp phiếu.', 'error');                
            }
            else {
                if (ispctdien == "1" && isnguoicapphieu == 'true') {
                    savePCTDien();
                } else if (ispctdien == "2" && isnguoicapphieu == 'true') {
                    updatePCTDien();
                }
            }
        });

        checkboxDropdown();

        $('#btnThemDiaDiemCongTac').on('click', function () {
            const isnguoicapphieu = $('#hidisNGUOICAPPHIEU').val();

            if (isnguoicapphieu == 'true') {
                AddToTablePCTDienThemDiaDiemCongTac();
            }  
            else {
                tedu.notify('Phải là người có chức danh cấp phiếu.', 'error');
            }
        });

        $('body').on('click', '.btn-deletePCTThemDDCT', function (e) {
            e.preventDefault();
            var diendiadiemcongtac = $(this).data('id');

            deletePCTDienDiaDiemCongTac(diendiadiemcongtac);
        });

        KiemTraThoiGianKeHoachChange();

        $("#btnDaKhoaSoPCT").on('click', function () {
            //dsdakhoasopct.loadTableDsDaKhoaSoPCT();
            $('#modal-add-edit-DsDaKhoaSoPCT').modal('show');
        });

        formMainValidate();       
        
    }

    function checkboxDropdown() {
        $('body').on('change', '.ul-checkbox-cacnoidungct:checked', function (e) {
            e.preventDefault();            
            let chonnoidungcongtac = this.value;              
            $('#txtPCTDienNoiDungCongTac').addTag(chonnoidungcongtac);                 
        });  
        $('body').on('change', '.ul-checkbox-cacnoidungct:unchecked', function (e) {
            e.preventDefault();            
            let chonnoidungcongtac = this.value;            
            $('#txtPCTDienNoiDungCongTac').removeTag(chonnoidungcongtac);                
        });

        $('body').on('change', '.ul-checkbox-cacdieukienatd:checked', function (e) {
            e.preventDefault();

            $("#txtPCTDienDieuKienATD").importTags('');
            let checkboxCacDieuKienATD = document.getElementsByClassName("ul-checkbox-cacdieukienatd");
            $.each(checkboxCacDieuKienATD, function (indexCheckBox, valueCheckBox) {
                checkboxCacDieuKienATD[indexCheckBox].checked = false;
            });

            let chondieukienat = this.value;            
            var elementCountDKAT = $("#txtPCTDienDieuKienATD_tagsinput .tag").length;
            //console.log(elementCount);
            if (elementCountDKAT < 1) {
                $.each(checkboxCacDieuKienATD, function (indexCheckBox, valueCheckBox) {
                    if (chondieukienat === valueCheckBox.value) {
                        checkboxCacDieuKienATD[indexCheckBox].checked = true;
                    }
                });
                $('#txtPCTDienDieuKienATD').addTag(chondieukienat);
            }
            else {
                tedu.notify('Chỉ chọn 1 điều kiện về ATĐ','error');
            }
        });
        $('body').on('change', '.ul-checkbox-cacdieukienatd:unchecked', function (e) {
            e.preventDefault();
            let chondieukienat = this.value;
            $('#txtPCTDienDieuKienATD').removeTag(chondieukienat);            
        });

        $('body').on('change', '.ul-checkbox-cactrangbibhldlv:checked', function (e) {
            e.preventDefault();
            let trangbiantoan = this.value;
            $('#txtPCTDienTrangBiATBHLDLamViec').addTag(trangbiantoan);
            let count = $('#txtPCTDienTrangBiATBHLDLamViec_tagsinput').children('span').length;
            $('#txtPCTDienTongHangMucDaTrangCap').val(nguyen.getSoThanhChu(count));
        });
        $('body').on('change', '.ul-checkbox-cactrangbibhldlv:unchecked', function (e) {
            e.preventDefault();
            let trangbiantoan = this.value;
            $('#txtPCTDienTrangBiATBHLDLamViec').removeTag(trangbiantoan);
            let count = $('#txtPCTDienTrangBiATBHLDLamViec_tagsinput').children('span').length;            
            $('#txtPCTDienTongHangMucDaTrangCap').val(nguyen.getSoThanhChu(count));
        });

        $('body').on('change', '.ul-checkbox-cacdonviqlvh:checked', function (e) {
            e.preventDefault();
            let trangbiantoan = this.value;
            $('#txtPCTDienCacDonViQLVHCoLienQuan').addTag(trangbiantoan);            
        });
        $('body').on('change', '.ul-checkbox-cacdonviqlvh:unchecked', function (e) {
            e.preventDefault();
            let dvqlvh = this.value;
            $('#txtPCTDienCacDonViQLVHCoLienQuan').removeTag(dvqlvh);            
        });
    }
    
    function loadEditCheckBoxCacNoiDungCongTac(cacnoidungcongtac) {        
        let arrayCacNoiDungCongTac = cacnoidungcongtac.split(",");
        let checkboxCacNoiDungCongTac = document.getElementsByClassName("ul-checkbox-cacnoidungct");
        $.each(arrayCacNoiDungCongTac, function (indexArray, valueArray) {    
            $.each(checkboxCacNoiDungCongTac, function (indexCheckBox, valueCheckBox) {
                if (valueArray === valueCheckBox.value) {
                    checkboxCacNoiDungCongTac[indexCheckBox].checked = true;
                }
            });
        });
    }
    function loadEditCheckBoxCacDieuKienATD(cacdieukienatd) {
        let arrayCacDieuKienATD = cacdieukienatd.split(",");
        let checkboxCacDieuKienATD = document.getElementsByClassName("ul-checkbox-cacdieukienatd");
        $.each(arrayCacDieuKienATD, function (indexArray, valueArray) {
            $.each(checkboxCacDieuKienATD, function (indexCheckBox, valueCheckBox) {
                if (valueArray === valueCheckBox.value) {
                    checkboxCacDieuKienATD[indexCheckBox].checked = true;
                }
            });
        });
    } 
    function loadEditCheckBoxCacTrangBiBHLDLV(cactrangbibhld) {
        let arrayCacTrangBiBHLDLV = cactrangbibhld.split(",");
        let checkboxCacTrangBiBHLDLV = document.getElementsByClassName("ul-checkbox-cactrangbibhldlv");
        $.each(arrayCacTrangBiBHLDLV, function (indexArray, valueArray) {
            $.each(checkboxCacTrangBiBHLDLV, function (indexCheckBox, valueCheckBox) {
                if (valueArray === valueCheckBox.value) {
                    checkboxCacTrangBiBHLDLV[indexCheckBox].checked = true;
                }
            });
        });
    }
    function loadEditCheckBoxCacDonViQLVH(cacdonviqlvh) {
        let arrayCacDobViQLVH = cacdonviqlvh.split(",");
        let checkboxCacDobViQLVH = document.getElementsByClassName("ul-checkbox-cacdonviqlvh");
        $.each(arrayCacDobViQLVH, function (indexArray, valueArray) {
            $.each(checkboxCacDobViQLVH, function (indexCheckBox, valueCheckBox) {
                if (valueArray === valueCheckBox.value) {
                    checkboxCacDobViQLVH[indexCheckBox].checked = true;
                }
            });
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

        $('#btnThemChonCacDonViQuanLyVanHanh').on('click', function () {
            $('#hidInsertThemCacDonViQuanLyVanHanh').val(1);
            themcacdonviqlvh.loadTablePCTDienThemCacDonViQLVH();
            $('#modal-add-edit-ThemCacDonViQuanLyVanHanh').modal('show');
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
        
    }

    function loadTagsInput() {
        $('#txtPCTDienThuocCongTyDonVi').tagsInput({
            width: 'auto',
            height: '60px',
            allowDuplicates: false
        });        
        $('#txtPCTDienNoiDungCongTac').tagsInput({
            width: 'auto',
            height: '60px',
            allowDuplicates: false
        });
        $('#txtPCTDienDieuKienATD').tagsInput({
            width: 'auto',
            height: '60px',
            allowDuplicates: false
        });
        $('#txtPCTDienTrangBiATBHLDLamViec').tagsInput({
            width: 'auto',
            height: '100px',
            allowDuplicates: false
        });
        $('#txtPCTDienCacDonViQLVHCoLienQuan').tagsInput({
            width: 'auto',
            height: '60px',
            allowDuplicates: false
        });        
    }

    function loadTabsRemoved() {
        $('body').on('focusout', '#txtPCTDienNoiDungCongTac_tagsinput .tag', function (e) {
            e.preventDefault(); 
            var tagspan = $(this).context['children']['0'].innerText.trim();                         
            let checkboxCacNoiDungCongTac = document.getElementsByClassName("ul-checkbox-cacnoidungct");
            $.each(checkboxCacNoiDungCongTac, function (indexCheckBox, valueCheckBox) {
                if (tagspan === valueCheckBox.value) {
                    checkboxCacNoiDungCongTac[indexCheckBox].checked = false;
                }
            });
        });
        $('body').on('focusout', '#txtPCTDienDieuKienATD_tagsinput .tag', function (e) {
            e.preventDefault();
            var tagspan = $(this).context['children']['0'].innerText.trim();                         
            let checkboxCacdieukienatd = document.getElementsByClassName("ul-checkbox-cacdieukienatd");
            $.each(checkboxCacdieukienatd, function (indexCheckBox, valueCheckBox) {
                if (tagspan === valueCheckBox.value) {
                    checkboxCacdieukienatd[indexCheckBox].checked = false;
                }
            });
        });
        $('body').on('focusout', '#txtPCTDienTrangBiATBHLDLamViec_tagsinput .tag', function (e) {
            e.preventDefault();
            var tagspan = $(this).context['children']['0'].innerText.trim();                       
            let checkboxCacTrangBiATBHLD = document.getElementsByClassName("ul-checkbox-cactrangbibhldlv");            
            let count = 0;
            $.each(checkboxCacTrangBiATBHLD, function (indexCheckBox, valueCheckBox) {
                if (tagspan === valueCheckBox.value) {
                    checkboxCacTrangBiATBHLD[indexCheckBox].checked = false;                    
                }
                if (checkboxCacTrangBiATBHLD[indexCheckBox].checked == true) {
                    count = count + 1;
                    $('#txtPCTDienTongHangMucDaTrangCap').val(nguyen.getSoThanhChu(count));
                }
            }); 
            //console.log(count);
        });
        $('#txtPCTDienTrangBiATBHLDLamViec_tag').hide();
        
        $('body').on('focusout', '#txtPCTDienCacDonViQLVHCoLienQuan_tagsinput .tag', function (e) {
            e.preventDefault();
            var tagspan = $(this).context['children']['0'].innerText.trim();
            let checkboxCacDonViQLVH = document.getElementsByClassName("ul-checkbox-cacdonviqlvh");
            $.each(checkboxCacDonViQLVH, function (indexCheckBox, valueCheckBox) {
                if (tagspan === valueCheckBox.value) {
                    checkboxCacDonViQLVH[indexCheckBox].checked = false;
                }
            });
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
        //$("#ddlPCTDienNhap1PhongBan")[0].selectedIndex = 0; 
        $("#txtSoPhieuCongTac").val('');

        $("#txtNguoiLanhDaoCongViec").val('');
        $("#ddlNguoiLanhDaoCongViecBacATD")[0].selectedIndex = 0;
        $("#txtNguoiChiHuyTrucTiep").val('');
        $("#ddlNguoiChiHuyTrucTiepBacATD")[0].selectedIndex = 0;

        $("#ddlPCTDienChonThuocCongTyDonVi")[0].selectedIndex = 0;
        $("#txtPCTDienThuocCongTyDonVi").val('');
        //$("#txtPCTDiaDiemCongTac").val('');
        //$("#ddlPCTDienChonNoiDungCongTac")[0].selectedIndex = 0;

        $('#table-contentPCTThemNhanVienCT').html('');
        $('#table-contentPCTThemDDCT').html('');

        $("#txtPCTDienNoiDungCongTac").val('');

        $("#txtPCTDienThuocCongTyDonVi").importTags('');
        $("#txtPCTDienNoiDungCongTac").importTags('');
        $("#txtPCTDienDieuKienATD").importTags('');
        $("#txtPCTDienTrangBiATBHLDLamViec").importTags('');
        $("#txtPCTDienCacDonViQLVHCoLienQuan").importTags('');

        let checkboxDropdown = document.getElementsByClassName("ul-checkbox");
        $.each(checkboxDropdown, function (indexCheckBox, valueCheckBox) {
            checkboxDropdown[indexCheckBox].checked = false;
        });
        
        $("#txtPCTDienGioBatDauCongViec").val(tedu.getFormattedDateGio(datenow));
        $("#txtPCTDienPhutBatDauCongViec").val(tedu.getFormattedDatePhut(datenow));
        $("#txtPCTDienNgayBatDauCongViec").val(tedu.getFormattedDate(datenow));
        let gio1 = datenow.getHours() + 1;        
        $("#txtPCTDienGioKetThucCongViec").val(gio1 < 10 ? '0' + gio1.toString() : gio1.toString());
        $("#txtPCTDienPhutKetThucCongViec").val(tedu.getFormattedDatePhut(datenow));
        $("#txtPCTDienNgayKetThucCongViec").val(tedu.getFormattedDate(datenow));

        //$("#ddlPCTDienChonDieuKienATD")[0].selectedIndex = 0;
        $("#txtPCTDienDieuKienATD").val('');
        //$("#ddlPCTDienChonTrangBiATBHLDLamViec")[0].selectedIndex = 0;
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

        var trangthaipct = $('#ddlPCTDBaoCaoDieuKien').val();

        if (trangthaipct === '0') {
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
            "Xin chọn danh mục..."
        );

        jQuery.validator.addMethod("isDanhMuc00", function (value, element) {
            if (value === "0")
                return false;
            else
                return true;
        },
            "Chọn danh mục..."
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
                ddlPCTDienNhap1KhuVuc: {
                    required: true,
                    isDanhMuc: true
                },  
                ddlPCTDienNhap1PhongBan: { required: true, isDanhMuc: true },  
                txtNguoiChiHuyTrucTiep: { required: true },
                ddlNguoiChiHuyTrucTiepBacATD: { required: true, isDanhMuc00: true }                
            },
        });

        $('#frmMainEditPCTDienNhap2').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                txtPCTDienThuocCongTyDonVi: { required: true },
                //txtPCTDiaDiemCongTac: { required: true },   
                txtPCTDienNoiDungCongTac: { required: true },   

                txtPCTDienGioBatDauCongViec: { required: true },
                txtPCTDienPhutBatDauCongViec: { required: true },
                txtPCTDienNgayBatDauCongViec: { required: true, isDateVietNam: true },
                txtPCTDienGioKetThucCongViec: { required: true },
                txtPCTDienPhutKetThucCongViec: { required: true },
                txtPCTDienNgayKetThucCongViec: { required: true, isDateVietNam: true },                

                txtPCTDienDieuKienATD: { required: true },   
                txtPCTDienTrangBiATBHLDLamViec: { required: true },   

                txtPCTDienTongHangMucDaTrangCap: { required: true },
                //txtPCTDienCacDonViQLVHCoLienQuan: { required: true },

                txtPCTDienNguoiChoPhep: { required: true },
                ddlPCTDienNguoiChiHuyTrucTiepBacATD: { required: true, isDanhMuc: true },
                txtPCTDienNgayCapPCT: { required: true, isDateVietNam: true },
                txtPCTDienTenNguoiCapPCT: { required: true },

                ddlPCTDienNguoiChoPhepATDATD: { required: true, isDanhMuc00: true }
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

                    //tedu.notify('Lưu PCT Nhân viên công tác.', 'success');

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

            let nguoilanhdaocongviecidguid = $('#hidPCTDienNguoiLanhDaoCongViecId').val() == '0' ?
                $('#hidPCTDienNguoiLanhDaoCongViecId').val(tedu.getNewGuid()) : $('#hidPCTDienNguoiLanhDaoCongViecId').val();
            var nguoilanhdaocongviecId = nguoilanhdaocongviecidguid;
            var nguoichihuytructiepId = $('#hidPCTDienNguoiChiHuyTrucTiepId').val();

            let nguoigiamsatidguid = $('#hidPCTDienNguoiGiamSatATDId').val() == '0' ?
                $('#hidPCTDienNguoiGiamSatATDId').val(tedu.getNewGuid()) : $('#hidPCTDienNguoiGiamSatATDId').val();
            var nguoigiamsatatdId = nguoigiamsatidguid;
            var nguoichophepId = $('#hidPCTDienNguoiChoPhepId').val();
            var tennguoicappctId = $('#hidPCTDienTenNguoiCapPCTId').val();            

            let tennguoilanhdaocongviec2 = $("#txtNguoiLanhDaoCongViec").val();
            let nguoilanhdaocongviecbacatd2 = $("#ddlNguoiLanhDaoCongViecBacATD").val();
            let tennguoilanhdaocongviec = '';
            let nguoilanhdaocongviecbacatd = '';
            if (tennguoilanhdaocongviec2 !== '' && nguoilanhdaocongviecbacatd2 !== '0') {
                tennguoilanhdaocongviec = $("#txtNguoiLanhDaoCongViec").val();
                nguoilanhdaocongviecbacatd = $("#ddlNguoiLanhDaoCongViecBacATD").val();
            }
            else {
                tedu.notify('Chọn bậc an toàn điện người lãnh đạo công việc.', 'error')
            }

            var tennguoichihuytructiep = $("#txtNguoiChiHuyTrucTiep").val();
            var nguoichihuytructiepbacatd = $("#ddlNguoiChiHuyTrucTiepBacATD").val();

            //var diadiemcongtac = $("#txtPCTDiaDiemCongTac").val();      
            var diadiemcongtac = '';

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

            let tennguoigiamsatatd2 = $("#txtPCTDienNguoiGiamSatATD").val();
            let nguoigiamsatatdbacatd2 = $("#ddlPCTDienNguoiGiamSatATDBacATD").val();
            let tennguoigiamsatatd = '';
            let nguoigiamsatatdbacatd = '';
            if (tennguoigiamsatatd2 !== '' && nguoigiamsatatdbacatd2 !== '0') {
                tennguoigiamsatatd = $("#txtPCTDienNguoiGiamSatATD").val();
                nguoigiamsatatdbacatd = $("#ddlPCTDienNguoiGiamSatATDBacATD").val();
            }
            else {
                tedu.notify('Chọn bậc an toàn điện người giám sát an toàn điện.', 'error')
            }

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

            let nguoilanhdaocongviecidguid = $('#hidPCTDienNguoiLanhDaoCongViecId').val() == '0' ?
                $('#hidPCTDienNguoiLanhDaoCongViecId').val(tedu.getNewGuid()) : $('#hidPCTDienNguoiLanhDaoCongViecId').val();
            var nguoilanhdaocongviecId = nguoilanhdaocongviecidguid;
            var nguoichihuytructiepId = $('#hidPCTDienNguoiChiHuyTrucTiepId').val();

            let nguoigiamsatidguid = $('#hidPCTDienNguoiGiamSatATDId').val() == '0' ?
                $('#hidPCTDienNguoiGiamSatATDId').val(tedu.getNewGuid()) : $('#hidPCTDienNguoiGiamSatATDId').val();
            var nguoigiamsatatdId = nguoigiamsatidguid;
            var nguoichophepId = $('#hidPCTDienNguoiChoPhepId').val();
            var tennguoicappctId = $('#hidPCTDienTenNguoiCapPCTId').val();

            let tennguoilanhdaocongviec2 = $("#txtNguoiLanhDaoCongViec").val();
            let nguoilanhdaocongviecbacatd2 = $("#ddlNguoiLanhDaoCongViecBacATD").val();
            let tennguoilanhdaocongviec = '';
            let nguoilanhdaocongviecbacatd = '';
            if (tennguoilanhdaocongviec2 !== '' && nguoilanhdaocongviecbacatd2 !== '0') {
                tennguoilanhdaocongviec = $("#txtNguoiLanhDaoCongViec").val();
                nguoilanhdaocongviecbacatd = $("#ddlNguoiLanhDaoCongViecBacATD").val();
            }
            else {
                tedu.notify('Chọn bậc an toàn điện người lãnh đạo công việc.', 'error')
            }
            
            var tennguoichihuytructiep = $("#txtNguoiChiHuyTrucTiep").val();
            var nguoichihuytructiepbacatd = $("#ddlNguoiChiHuyTrucTiepBacATD").val();

            //var diadiemcongtac = $("#txtPCTDiaDiemCongTac").val();
            var diadiemcongtac = '';

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

            let tennguoigiamsatatd2 = $("#txtPCTDienNguoiGiamSatATD").val();
            let nguoigiamsatatdbacatd2 = $("#ddlPCTDienNguoiGiamSatATDBacATD").val();
            let tennguoigiamsatatd = '';
            let nguoigiamsatatdbacatd = '';
            if (tennguoigiamsatatd2 !== '' && nguoigiamsatatdbacatd2 !== '0') {
                tennguoigiamsatatd = $("#txtPCTDienNguoiGiamSatATD").val();
                nguoigiamsatatdbacatd = $("#ddlPCTDienNguoiGiamSatATDBacATD").val();
            }
            else {
                tedu.notify('Chọn bậc an toàn điện người giám sát an toàn điện.', 'error')
            }

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

                loadTablePCTDienDiaDiemCongTacByDienId();

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

                //$("#txtPCTDiaDiemCongTac").val(pctdien.DiaDiemCongTac);

                $("#txtPCTDienGioBatDauCongViec").val(pctdien.GioBatDauKH);
                $("#txtPCTDienPhutBatDauCongViec").val(pctdien.PhutBatDauKH);
                $("#txtPCTDienNgayBatDauCongViec").val(pctdien.NgayBatDauKH !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(pctdien.NgayBatDauKH) : '');                
                $("#txtPCTDienGioKetThucCongViec").val(pctdien.GioKetThucKH);
                $("#txtPCTDienPhutKetThucCongViec").val(pctdien.PhutKetThucKH);
                $("#txtPCTDienNgayKetThucCongViec").val(pctdien.NgayKetThucKH !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(pctdien.NgayKetThucKH) : '');

                let caccongtydonvi = pctdien.CacCongTyDonVi != null ? pctdien.CacCongTyDonVi : ''
                let cacnoidungcongtac = pctdien.CacNoiDungCongTac != null ? pctdien.CacNoiDungCongTac : '';
                let cacdieukienatd = pctdien.CacDieuKiemATLD != null ? pctdien.CacDieuKiemATLD : '';
                let cactrangbiatbhldlamviec = pctdien.CacTrangBiATBHLDLamViec != null ? pctdien.CacTrangBiATBHLDLamViec : '';
                let cacdonviqlvh = pctdien.CacDonViQLVHCoLienQuan != null ? pctdien.CacDonViQLVHCoLienQuan : '';

                $("#txtPCTDienThuocCongTyDonVi").importTags(caccongtydonvi);
                $("#txtPCTDienNoiDungCongTac").importTags(cacnoidungcongtac);
                $("#txtPCTDienDieuKienATD").importTags(cacdieukienatd);
                $("#txtPCTDienTrangBiATBHLDLamViec").importTags(cactrangbiatbhldlamviec);
                $("#txtPCTDienCacDonViQLVHCoLienQuan").importTags(cacdonviqlvh);

                loadEditCheckBoxCacNoiDungCongTac(cacnoidungcongtac);
                loadEditCheckBoxCacDieuKienATD(cacdieukienatd);
                loadEditCheckBoxCacTrangBiBHLDLV(cactrangbiatbhldlamviec);
                loadEditCheckBoxCacDonViQLVH(cacdonviqlvh);

                $("#txtPCTDienTongHangMucDaTrangCap").val(pctdien.TongHangMucDaTrangCap);
                //$("#txtPCTDienCacDonViQLVHCoLienQuan").val(pctdien.CacDonViQLVHCoLienQuan);

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

    function clearPCTDienThemDiaDiemCongTac() {
        $("#txtDDCTTramBienAp").val('');
        $("#txtDDCTSoTru").val('');
        $("#txtDDCTGhiChuHoTen").val('');
    }

    function AddToTablePCTDienThemDiaDiemCongTac() {
        let pctdiencode = $('#hidPCTDienCode').val();

        let trambienap = $("#txtDDCTTramBienAp").val();
        let sotru = $("#txtDDCTSoTru").val();
        let ghichu = $("#txtDDCTGhiChuHoTen").val();        

        $.ajax({
            type: "POST",
            url: "/Admin/pctdiennhap/SaveDienDDCT",
            data: {                
                PCTDienCode: pctdiencode,
                TramBienApDuongDay: trambienap,
                SoTru: sotru,
                GhiChuHoTen: ghichu,
                NgayNhap: '2011-11-11',
                Stt: 1
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Lưu PCT điện địa điểm công tác.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Lưu PCT điện địa điểm công tác. Id: " + trambienap);

                    tedu.notify('Lưu PCT điện địa điểm công tác.', 'success');

                    clearPCTDienThemDiaDiemCongTac();

                    loadTablePCTDienDiaDiemCongTac();

                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu PCT điện địa điểm công tác.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function loadTablePCTDienDiaDiemCongTac() {
        var template = $('#template-table-PCTThemDDCT').html();
        var render = "";

        var pctdiencode = $('#hidPCTDienCode').val();

        $.ajax({
            type: 'GET',
            url: '/admin/pctdiennhap/ListDienDDCT',
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

                            STT: item.SoThuTu,
                            TramBienApDuongDay: item.TramBienApDuongDay,
                            SoTru: item.SoTru,
                            GhiChuHoTen: item.GhiChuHoTen                           

                            //TrangThaiPCT: tedu.getPhieuCongTacDien(item.TrangThaiBoHoSo)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                if (render !== '') {
                    $('#table-contentPCTThemDDCT').html(render);
                }

            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function loadTablePCTDienDiaDiemCongTacByDienId() {
        var template = $('#template-table-PCTThemDDCT').html();
        var render = "";

        var pctdienId = $('#hidPCTDienId').val();

        $.ajax({
            type: 'GET',
            url: '/admin/pctdiennhap/ListDDCTdienId',
            data: {
                pctdienid: pctdienId
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

                            STT: item.SoThuTu,
                            TramBienApDuongDay: item.TramBienApDuongDay,
                            SoTru: item.SoTru,
                            GhiChuHoTen: item.GhiChuHoTen                                               
                        });
                    });
                }

                if (render !== '') {
                    $('#table-contentPCTThemDDCT').html(render);
                }

            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function deletePCTDienDiaDiemCongTac(diendiadiemcongtac) {
        tedu.confirm('Bạn có chắc chắn xóa địa điểm công tác này?', function () {
            $.ajax({
                type: "POST",
                url: "/Admin/pctdiennhap/DelDienDDCT",
                data: {
                    pctdiendiadiemcongtacId: diendiadiemcongtac
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Xóa địa điểm công tác.", "error");
                    }
                    else {
                        nguyen.appUserLoginLogger(userName, "Xóa địa điểm công tác. Id: " + diendiadiemcongtac);

                        tedu.notify('Xóa địa điểm công tác.', 'success');

                        loadTablePCTDienDiaDiemCongTac();

                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Xóa địa điểm công tác.', 'error');
                    tedu.stopLoading();
                }
            });
        });
    }

    function KiemTraThoiGianKeHoachChange() {
        $('#txtPCTDienGioBatDauCongViec').on('change', function () {
            let giobatdau = parseInt($("#txtPCTDienGioBatDauCongViec").val());
            let gioketthuc = parseInt($("#txtPCTDienGioKetThucCongViec").val());

            if (giobatdau > gioketthuc) {
                tedu.confirm('Giờ bắt đầu nhỏ hơn giờ kết thúc. ', function () {
                    tedu.notify('Kiểm tra giờ lại.', 'error');
                    $("#txtPCTDienGioBatDauCongViec").val(gioketthuc < 10 ? '0' + gioketthuc.toString() : gioketthuc.toString());
                });
            }                 
        });
        $('#txtPCTDienNgayBatDauCongViec').on('change', function () {            
            let ngaybatdaukh = tedu.getFormatDateYYMMDD($('#txtPCTDienNgayBatDauCongViec').val());
            let ngayketthuckh = tedu.getFormatDateYYMMDD($('#txtPCTDienNgayKetThucCongViec').val());

            if (ngaybatdaukh !== ngayketthuckh) {
                tedu.confirm('Ngày bắt đầu và ngày kết thúc phải bằng nhau. ', function () {
                    tedu.notify('Kiểm tra ngày lại.', 'error');
                    $("#txtPCTDienNgayBatDauCongViec").val(tedu.getFormattedDate(ngayketthuckh));
                });
                $("#txtPCTDienNgayBatDauCongViec").val(tedu.getFormattedDate(ngayketthuckh));
            }
        });

        $('#txtPCTDienGioKetThucCongViec').on('change', function () {
            let giobatdau = parseInt($("#txtPCTDienGioBatDauCongViec").val());
            let gioketthuc = parseInt($("#txtPCTDienGioKetThucCongViec").val());

            if (giobatdau > gioketthuc) {
                tedu.confirm('Giờ bắt đầu nhỏ hơn giờ kết thúc. ', function () {
                    tedu.notify('Kiểm tra giờ lại.', 'error');
                    $("#txtPCTDienGioKetThucCongViec").val(giobatdau + 1 < 10 ? '0' + (giobatdau + 1).toString() : (giobatdau + 1).toString());
                });
            }           
        });
        $('#txtPCTDienNgayKetThucCongViec').on('change', function () {
            
            let ngaybatdaukh = tedu.getFormatDateYYMMDD($('#txtPCTDienNgayBatDauCongViec').val());
            let ngayketthuckh = tedu.getFormatDateYYMMDD($('#txtPCTDienNgayKetThucCongViec').val());
      
            if (ngaybatdaukh !== ngayketthuckh) {
                tedu.confirm('Ngày bắt đầu và ngày kết thúc phải bằng nhau. ', function () {
                    tedu.notify('Kiểm tra ngày lại.', 'error');
                    $("#txtPCTDienNgayKetThucCongViec").val(tedu.getFormattedDate(ngaybatdaukh));
                });
                $("#txtPCTDienNgayKetThucCongViec").val(tedu.getFormattedDate(ngaybatdaukh));
            }
        });        
    }

    function loaEditPCTDienDaKhoaSo(pctdienId, pctdiencode) {
        //var pctdienId = $('#hidPCTDienId').val();
        $.ajax({
            type: "GET",
            url: "/Admin/pctdiennhap/GetIdDaKhoaSo",
            data: {
                PCTDienId: pctdienId,
                PCTDienCode: pctdiencode
            },
            dataType: "json",

            success: function (response) {
                var pctdien = response.Result;
               
                //$('#hidPCTDienCode').val(pctdien.Code);

                loadTableDSNhanVienDonViCT();
                loadTablePCTDienDiaDiemCongTac();

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

                //$("#txtPCTDiaDiemCongTac").val(pctdien.DiaDiemCongTac);

                $("#txtPCTDienGioBatDauCongViec").val(pctdien.GioBatDauKH);
                $("#txtPCTDienPhutBatDauCongViec").val(pctdien.PhutBatDauKH);
                $("#txtPCTDienNgayBatDauCongViec").val(pctdien.NgayBatDauKH !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(pctdien.NgayBatDauKH) : '');
                $("#txtPCTDienGioKetThucCongViec").val(pctdien.GioKetThucKH);
                $("#txtPCTDienPhutKetThucCongViec").val(pctdien.PhutKetThucKH);
                $("#txtPCTDienNgayKetThucCongViec").val(pctdien.NgayKetThucKH !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(pctdien.NgayKetThucKH) : '');

                let caccongtydonvi = pctdien.CacCongTyDonVi != null ? pctdien.CacCongTyDonVi : ''
                let cacnoidungcongtac = pctdien.CacNoiDungCongTac != null ? pctdien.CacNoiDungCongTac : '';
                let cacdieukienatd = pctdien.CacDieuKiemATLD != null ? pctdien.CacDieuKiemATLD : '';
                let cactrangbiatbhldlamviec = pctdien.CacTrangBiATBHLDLamViec != null ? pctdien.CacTrangBiATBHLDLamViec : '';
                let cacdonviqlvh = pctdien.CacDonViQLVHCoLienQuan != null ? pctdien.CacDonViQLVHCoLienQuan : '';

                $("#txtPCTDienThuocCongTyDonVi").importTags(caccongtydonvi);
                $("#txtPCTDienNoiDungCongTac").importTags(cacnoidungcongtac);
                $("#txtPCTDienDieuKienATD").importTags(cacdieukienatd);
                $("#txtPCTDienTrangBiATBHLDLamViec").importTags(cactrangbiatbhldlamviec);
                $("#txtPCTDienCacDonViQLVHCoLienQuan").importTags(cacdonviqlvh);

                loadEditCheckBoxCacNoiDungCongTac(cacnoidungcongtac);
                loadEditCheckBoxCacDieuKienATD(cacdieukienatd);
                loadEditCheckBoxCacTrangBiBHLDLV(cactrangbiatbhldlamviec);
                loadEditCheckBoxCacDonViQLVH(cacdonviqlvh);

                $("#txtPCTDienTongHangMucDaTrangCap").val(pctdien.TongHangMucDaTrangCap);
                //$("#txtPCTDienCacDonViQLVHCoLienQuan").val(pctdien.CacDonViQLVHCoLienQuan);

                $("#txtPCTDienNguoiGiamSatATD").val(pctdien.TenNguoiGiamSatATD);
                $("#ddlPCTDienNguoiGiamSatATDBacATD").val(pctdien.BacATDNguoiGiamSatATD);
                $("#txtPCTDienNguoiChoPhep").val(pctdien.TenNguoiChoPhep);
                $("#ddlPCTDienNguoiChoPhepATDATD").val(pctdien.BacNguoiChoPhep);

                $("#txtPCTDienNgayCapPCT").val(pctdien.NgayCapPCT !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(pctdien.NgayCapPCT) : '');
                $("#txtPCTDienTenNguoiCapPCT").val(pctdien.TenNguoiCapPCT);

                //$('#modal-add-edit-EditPCTDienNhap').modal('show');
                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

}