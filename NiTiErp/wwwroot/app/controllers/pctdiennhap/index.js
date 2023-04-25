var pctdiennhapController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var addeditpctdien = new addeditpctdienController();
    var chopheplamviec = new chopheplamviecController();
    var diadiemcongtac = new diadiemcongtacController();
    var ketthuccongtac = new ketthuccongtacController();
    var thaydoinguoilamviec = new thaydoinguoilamviecController();

    this.initialize = function () {
        loadPhongUserName(userName);
        loadKhuVuc();
        loadData();

        registerEvents();

        clearData();

        addeditpctdien.initialize();     
        chopheplamviec.initialize();  
        diadiemcongtac.initialize(); 
        ketthuccongtac.initialize(); 
        thaydoinguoilamviec.initialize(); 
        
    }    

    function registerEvents() {
        
        $('#txtPCTDBaoCaoTuNgay, #txtPCTDBaoCaoDenNgay ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
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

            $('#modal-add-edit-EditPCTDienNhap').modal('show');
        });

        $('body').on('click', '.btn-addeditPCTDien', function (e) {
            e.preventDefault();
            var pctdienid = $(this).data('id');
            $('#hidPCTDienId').val(pctdienid);
            
            // 2 - Update Order
            $('#hidInsertPCTDien').val(2);
            
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

            $('#modal-add-edit-EditPCTDienDiaDiemCongTac').modal('show');
            diadiemcongtac.loadTableDiaDiemCongTac();
        });

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

            inPhieuCongTac(pctdienid);
        });

        // Chon Khu vuc trong phan Nhap PCT dien de the hien ds nhan vien xi nghiep khac
        $('#ddlPCTDienNhap1KhuVuc').on('change', function () {
            var corporationId = $('#ddlPCTDienNhap1KhuVuc').val();
            loadAutocompleteNhanVienByCor(corporationId);
        });

        // Chon Khu vuc trong phan danh sach thay doi nhan vien cong tac
        $('#ddlThayDoiNguoiCongTacKhuVuc').on('change', function () {
            var corporationId = $('#ddlThayDoiNguoiCongTacKhuVuc').val();
            loadAutocompleteNhanVienByCorThayDoiNguoi(corporationId);
        });

        $('#ddlKhuVuc').on('change', function () {
            var corporationId = $('#ddlKhuVuc').val();

            loadPhongKhuVuc(corporationId);
            
        });

        $("#btnTimNoiDung").on('click', function () {
            addeditpctdien.loadTablePCTDien();
        });

        $('#txtTimNoiDung').on('keypress', function (e) {
            if (e.which === 13) {
                addeditpctdien.loadTablePCTDien();
            }
        });        

        $('#btnPCTDBaoCaoDieuKien').on('keypress', function (e) {
            tedu.notify('bao cao pct dien .. theo', 'success');
            //danhsachBaoCaoKhachHangNuoc();
        });

    }

    function loadData() {
        loadDataDanhSachTheo();
    }

    function loadDataDanhSachTheo() {
        var render = "<option value='0' >-- Bỏ chọn --</option>";
        render += "<option value='PCTXN' >-- D.sách Phiếu công tác theo Xí nghiệp --</option>";
        render += "<option value='PCTTO' >-- D.sách Phiếu công tác theo phòng, tổ --</option>";
        render += "<option value='PCTCT' >-- D.sách Phiếu công tác All --</option>";

        $('#ddlPCTDBaoCaoDieuKien').html(render);
    }

    function clearData() {
        var datenow = new Date();
        $('#txtPCTDBaoCaoTuNgay').val(tedu.getFormattedDate(datenow));
        $('#txtPCTDBaoCaoDenNgay').val(tedu.getFormattedDate(datenow));

        $('#txtPCTDBaoCaoTuNgay').prop('disabled', true);
        $('#txtPCTDBaoCaoDenNgay').prop('disabled', true);
        var ckTheoNgay = document.getElementById('ckPCTDBaoCaoChonTheoNgay');
        ckTheoNgay.checked = false;
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

                loadPhongKhuVuc($("#ddlKhuVuc").val()); 
                loadPCTDienNhapPhongKhuVuc($("#ddlPCTDienNhap1KhuVuc").val()); 

                loadAutocompleteNhanVienByCor($("#ddlKhuVuc").val());
                loadAutocompleteNhanVienByCorThayDoiNguoi($("#ddlThayDoiNguoiCongTacKhuVuc").val())

                //addeditpokhachhangnuoc.loadTableKhachHangNuoc();
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
                var phongdanhmucid = $('#hidPhongDanhMucId').val();
                $("#ddlPhongTo").val(phongdanhmucid);

                let tenphongto = $("#ddlPhongTo :selected").text();
                // chi tai khoan thuoc phong KT Điện Nước thi cho hien het de quan ly
                if (tenphongto === "Phòng KT Điện Nước") {
                    $('#ddlPhongTo').prop('disabled', false);
                }
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
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    } 

    //function loadPhongBanByUserName(userName) {
    //    $.ajax({
    //        type: 'GET',
    //        url: '/admin/hskebao/getHoSonv',
    //        data: { username: userName },
    //        dataType: "json",
    //        beforeSend: function () {
    //            tedu.startLoading();
    //        },
    //        success: function (response) {
    //            var hosonhanvien = response.Result;
    //            $('#ddlPCTDienNhap1PhongBan').val(hosonhanvien.PhongBanDanhMucId);
    //            //$('#ddlAddEditPhongNhaphoSo').val(hosonhanvien.PhongBanDanhMucId);
    //        },
    //        error: function (status) {
    //            console.log(status);
    //            tedu.notify('Không có danh mục Phòng.', 'error');
    //        }
    //    });
    //}

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
            }
        });
    }

    function loadSuggestions(options) {
        $('#txtNguoiLanhDaoCongViec').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {
                $('#hidPCTDienNguoiLanhDaoCongViecId').val(suggestion.Id);
                $('#txtNguoiLanhDaoCongViec').val(suggestion.Ten);
                $('#ddlNguoiLanhDaoCongViecBacATD').val(suggestion.BacAnToanDienId);                
            }
        });
        $('#txtNguoiChiHuyTrucTiep').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {
                $('#hidPCTDienNguoiChiHuyTrucTiepId').val(suggestion.Id);
                $('#txtNguoiChiHuyTrucTiep').val(suggestion.Ten);
                $('#ddlNguoiChiHuyTrucTiepBacATD').val(suggestion.BacAnToanDienId);                
            }
        });
        $('#txtPCTThemDsNhanVienDonViCongTac').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {
                $('#txtPCTThemDsNhanVienDonViCongTac').val('');
                addeditpctdien.AddToTableDSNhanVienDonViCT(suggestion.Id);
            }
        });
        $('#txtPCTDienNguoiGiamSatATD').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {
                $('#hidPCTDienNguoiGiamSatATDId').val(suggestion.Id);
                $('#txtPCTDienNguoiGiamSatATD').val(suggestion.Ten);
                $('#ddlPCTDienNguoiGiamSatATDBacATD').val(suggestion.BacAnToanDienId);
            }
        });
        $('#txtPCTDienNguoiChoPhep').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {
                $('#hidPCTDienNguoiChoPhepId').val(suggestion.Id);
                $('#txtPCTDienNguoiChoPhep').val(suggestion.Ten);
                $('#ddlPCTDienNguoiChiHuyTrucTiepBacATD').val(suggestion.BacAnToanDienId);
            }
        });
        $('#txtPCTDienTenNguoiCapPCT').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {
                $('#hidPCTDienTenNguoiCapPCTId').val(suggestion.Id);
                $('#txtPCTDienTenNguoiCapPCT').val(suggestion.Ten);                
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

    function loadAutocompleteNhanVienByCorThayDoiNguoi(corporationId) {
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
                loadSuggestionsThayDoiNguoi(arrayReturn);
                //console.log(countries);               
            }
        });
    }

    function loadSuggestionsThayDoiNguoi(options) {        
        //Danh sach thay doi nguoi cong tac
        $('#txtTenNhanVienThayDoiCongTac').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {
                $('#hidThayDoiNguoiCongTacTenNhanVienThayDoiId').val(suggestion.Id);
                $('#txtTenNhanVienThayDoiCongTac').val(suggestion.Ten);
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
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    }

}