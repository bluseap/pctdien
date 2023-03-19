var bocvattuController = function () {

    var userName = $("#hidUserName").val();

    var cachedObj = {
        DonViTinh: [],
        LoaiChiPhi: []
    };

    this.UpdateDaoLapTKLoaiChiPhi = function (madon, loaicp) {
        UpdateDaoLapTKLoaiChiPhi(madon, loaicp);
    }
    
    this.UpdateDaoLapTKDonViTinh = function (madon, donvitinh) {
        UpdateDaoLapTKDonViTinh(madon, donvitinh);
    }
    
    this.UpdateDaoLapTKSoLuong = function (madon, soluong) {
        UpdateDaoLapTKSoLuong(madon, soluong);
    }

    this.UpdateDaoLapTKDonGia = function (madon, dongiacp) {
        UpdateDaoLapTKDonGia(madon, dongiacp);
    }

    this.UpdateDaoLapTKNoiDung = function (madon, noidung) {
        UpdateDaoLapTKNoiDung(madon, noidung);
    }

    this.UpdateKhoiLuongBocVatTu = function (khoiluong, madonmavattu) {
        UpdateKhoiLuongBocVatTu(khoiluong, madonmavattu);
    }

    this.loadEditBocVatTuSoDoThietKe = function () {
        loadEditBocVatTuSoDoThietKe();
    }

    this.loadTableBocVatTuLoaiChiPhiVCDL = function () {
        loadTableBocVatTuLoaiChiPhiVCDL();
    }

    this.loadTableBocVatTu = function () {
        loadTableBocVatTu();
    }

    this.loadMauBocVatTuNuoc = function (corporationId) {
        loadMauBocVatTuNuoc(corporationId);
    }

    this.loadMauThietKe = function (corporationId) {
        loadMauThietKe(corporationId);
    }

    this.initialize = function () {
        registerEvents();
        clearData();
        loadDataBocVatTu();

    }

    function registerEvents() {        

        $('#ddlChonMauBocVatTu').on('change', function () {        
            var chonmauvattu = $('#ddlChonMauBocVatTu').val();
            if (chonmauvattu !== '%') {
                chonMauBocBatTu();
            }            
        });

        $('body').on('click', '.btn-deleteVatTu', function (e) {
            e.preventDefault();
            var maddkmavt = $(this).data('id');
            const myArray = maddkmavt.split('-');

            const madon = myArray[0];
            const mavattu = myArray[1];

            deleteMauBocVatTu(madon, mavattu);
        });

        $('body').on('click', '.btn-deleteChiPhiDLVC', function (e) {
            e.preventDefault();
            var madon = $(this).data('id');            
            deleteChiPhiDaoLapVanChuyen(madon);
        });

        $('#btnThemMoiVatTu').on('click', function () {

            $('#modal-add-edit-ThemVatTu').modal('show');
        });

        $('#btnThemMoiChiPhi').on('click', function () {
            themMoiChiPhi();
        });

        $('body').on('click', '.btn-EditThemMoiVatTu', function (e) {
            e.preventDefault();
            var mavattu = $(this).data('id');
            $('#hidMaVatTuId').val(mavattu);
            themVatTuToCTThietKe(mavattu);            
            $('#modal-add-edit-ThemVatTu').modal('show');
        });

        $('#ddlChonMauHinhThietKe').on('change', function () {
            var chonmauhinhthietke = $('#ddlChonMauHinhThietKe').val();
            if (chonmauhinhthietke !== '%') {
                saveSoDoThietKe();
            }            
        });

        $('#btnBocVatTu').on('click', function () {
            saveSoDoThietKe();
            //$('#modal-add-edit-BocVatTu').modal('hide');
        });

    }

    function clearData() {
        var datenow = new Date();

        $("#ddlChonMauBocVatTu")[0].selectedIndex = 0;

        $("#txtTenKhachHangBenPhai").val('');
        $("#txtDanhSoKhachHangBenPhai").val('');
        $("#txtTenKhachHangBenTrai").val('');
        $("#txtDanhSoKhachHangBenTrai").val('');
        $("#ddlChonMauHinhThietKe")[0].selectedIndex = 0;

    }

    function loadDataBocVatTu() {
        cachedObj.DonViTinh = [{ Id: 'LUOT', Value: 'Lượt' }, { Id: 'MET', Value: 'Mét' }, { Id: 'M3', Value: 'Mét khối' }, { Id: 'BANG', Value: 'Băng' }];
        cachedObj.LoaiChiPhi = [{ Id: 'VC', Value: 'Vận chuyển' }, { Id: 'DAO', Value: 'Đào' }, { Id: 'LAP', Value: 'Lắp' }, { Id: 'LAPD', Value: 'Lắp điện' }];

    }

    function getDonViTinh(selectedId, madon) {
        var tai = "<select class='form-control ddlBVTDonViTinh' data-id='" + madon + "' onchange='javascript: getChangeddlDonViTinh(this," + madon + ");' >";
        $.each(cachedObj.DonViTinh, function (i, donvitinh) {
            if (selectedId === donvitinh.Id)
                tai += '<option value="' + donvitinh.Id + '" selected="select">' + donvitinh.Value + '</option>';
            else
                tai += '<option value="' + donvitinh.Id + '">' + donvitinh.Value + '</option>';
        });
        tai += "</select>";
        return tai;
    }   

    function getLoaiChiPhi(selectedId, madon) {
        var tai = "<select class='form-control ddlBVTLoaiChiPhi' data-id='" + madon + "' onchange='javascript: getChangeddlLoaiCP(this," + madon + ");' >";
        $.each(cachedObj.LoaiChiPhi, function (i, loaichiphi) {
            if (selectedId === loaichiphi.Id)
                tai += '<option value="' + loaichiphi.Id + '" selected="select">' + loaichiphi.Value + '</option>';
            else
                tai += '<option value="' + loaichiphi.Id + '">' + loaichiphi.Value + '</option>';
        });
        tai += "</select>";
        return tai;
    }   

    function loadMauBocVatTuNuoc(corporationId) {
        
        $.ajax({
            type: 'GET',
            url: '/admin/podknuoctk/maubvt',
            data: {
                CorporationId: corporationId,
                loaimbvt: "NN"
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='%' >-- Lựa chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.MADDK + "'>" + item.TENTK + "</option>";
                });
                $('#ddlChonMauBocVatTu').html(render);
                $("#ddlChonMauBocVatTu")[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục mẫu bốc vật tư.', 'error');
            }
        });
    }

    function loadMauThietKe(corporationId) {        
        $.ajax({
            type: 'GET',
            url: '/admin/podknuoctk/Mauthietke',
            data: {
                CorporationId: corporationId,
                loaidv: "N",
                order: 9
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='%' >-- Lựa chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.MAMAUTK + "'>" + item.TENMAUTK + "</option>";
                });
                $('#ddlChonMauHinhThietKe').html(render);
                $("#ddlChonMauHinhThietKe")[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục mẫu thiết kế.', 'error');
            }
        });
    }

    function loadTableBocVatTuLoaiChiPhiVCDL() {
        var template = $('#template-table-ChiPhiThietKeDaoLap').html();
        var render = "";

        var madondangky = $('#hidDonDangKyMaddk').val();

        $.ajax({
            type: 'GET',
            url: '/admin/PoDKNuocTK/BVTChiPhi',
            data: {
                DonDangKyId: madondangky
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result, function (i, item) {
                        render += Mustache.render(template, {
                            MADON: item.MADON,
                            MADDK: item.MADDK,

                            SoThuTu: item.SoThuTu,
                            NOIDUNG: item.NOIDUNG,
                            DONGIACP: item.DONGIACP,
                            DonViTinh: getDonViTinh(item.DVT, item.MADON),                           
                            SOLUONG: item.SOLUONG,
                            LoaiChiPhi: getLoaiChiPhi(item.LOAICP, item.MADON)
                            
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                if (render !== '') {
                    $('#tblContentChiPhiThietKeDaoLap').html(render);
                }

            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function loadTableBocVatTu() {
        var template = $('#template-table-BocVatTuKhachHang').html();
        var render = "";

        var madondangky = $('#hidDonDangKyMaddk').val();        

        $.ajax({
            type: 'GET',
            url: '/admin/PoDKNuocTK/BocVatTu',
            data: {
                DonDangKyId: madondangky
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {                    
                    $.each(response.Result, function (i, item) {
                        render += Mustache.render(template, {
                            MADDK: item.MADDK,
                            MAVT: item.MAVT,                            

                            SoThuTu: item.SoThuTu,
                            MaVatTuKeToan: item.MaVatTuKeToan,
                            KhoXiNghiep: item.KhoXiNghiep,
                            TenVatTu: item.TenVatTu,
                            CongTyCap: item.CongTyCap,
                            DonViTinh: item.DonViTinh,
                            KhoiLuong: item.SOLUONG
                           
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }                

                if (render !== '') {
                    $('#tblContentNhapTKKhachHang').html(render);
                }
                
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function UpdateKhoiLuongBocVatTu(khoiluong, madonmavattu) {
        //tedu.notify(khoiluong + '-' + madonmavattu, 'success');
        const myArray = madonmavattu.split('-');
        const madon = myArray[0];
        const mavattu = myArray[1];   

        $.ajax({
            type: "POST",
            url: "/Admin/podknuoctk/UpBVT",
            data: {
                MADDK: madon,
                MaVatTu: mavattu,
                KhoiLuong: khoiluong
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Update khối lượng vật tư.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Update khối lượng vật tư: " + madon + '-' + mavattu + '-' + khoiluong);

                    tedu.notify('Update khối lượng vật tư.', 'success');

                    loadTableBocVatTu();

                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Update khối lượng vật tư.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function deleteMauBocVatTu(madon, mavattu) {
        tedu.confirm('Bạn có chắc chắn xóa vật tư này?', function () {
            $.ajax({
                type: "POST",
                url: "/Admin/podknuoctk/XoaVatTu",
                data: {
                    MADDK: madon,
                    MaVatTu: mavattu
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    tedu.notify('Xóa thành công', 'success');

                    loadTableBocVatTu();

                    tedu.stopLoading();
                },
                error: function (status) {
                    tedu.notify('Xóa vật tư lỗi! Kiểm tra lại.', 'error');
                    tedu.stopLoading();
                }
            });
        });
    }

    function deleteChiPhiDaoLapVanChuyen(madon) {
        var maddk = $('#hidDonDangKyMaddk').val();
        tedu.confirm('Bạn có chắc chắn xóa chi phí này?', function () {
            $.ajax({
                type: "POST",
                url: "/Admin/podknuoctk/XoaCPDL",
                data: {
                    MADON: madon,
                    MADDK: maddk
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    tedu.notify('Xóa thành công', 'success');

                    loadTableBocVatTuLoaiChiPhiVCDL();

                    tedu.stopLoading();
                },
                error: function (status) {
                    tedu.notify('Xóa vật tư lỗi! Kiểm tra lại.', 'error');
                    tedu.stopLoading();
                }
            });
        });
    }

    function themMoiChiPhi() {
        var maddk = $('#hidDonDangKyMaddk').val();

        $.ajax({
            type: "POST",
            url: "/Admin/podknuoctk/InsChiPhi",
            data: {
                MADDK: maddk
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Inserts chi phí đào, lắp, vận chuyển.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Inserts chi phí đào, lắp, vận chuyển: " + maddk );

                    tedu.notify('Inserts chi phí đào, lắp, vận chuyển.', 'success');

                    loadTableBocVatTuLoaiChiPhiVCDL();

                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Inserts chi phí đào, lắp, vận chuyển.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function UpdateDaoLapTKNoiDung(madon, noidung) {
        var maddk = $('#hidDonDangKyMaddk').val();
        $.ajax({
            type: "POST",
            url: "/Admin/podknuoctk/UpDaoLapND",
            data: {
                MADON: madon,
                MADDK: maddk,
                NOIDUNG: noidung
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Update chi phí nội dung.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Update chi phí nội dung: " + madon + ',' + noidung);

                    tedu.notify('Update chi phí nội dung.', 'success');                  

                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Update chi phí nội dung.', 'error');
                tedu.stopLoading();
            }
        });
    }
   
    function UpdateDaoLapTKDonGia(madon, dongiacp) {
        var maddk = $('#hidDonDangKyMaddk').val();
        $.ajax({
            type: "POST",
            url: "/Admin/podknuoctk/UpDaoLapDonGia",
            data: {
                MADON: madon,
                MADDK: maddk,
                DONGIACP: dongiacp
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Update chi phí đơn giá.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Update chi phí đơn giá: " + madon + ',' + dongiacp);

                    tedu.notify('Update chi phí đơn giá.', 'success');

                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Update chi phí đơn giá.', 'error');
                tedu.stopLoading();
            }
        });
    } 

    function UpdateDaoLapTKSoLuong(madon, soluong) {
        var maddk = $('#hidDonDangKyMaddk').val();
        $.ajax({
            type: "POST",
            url: "/Admin/podknuoctk/UpDaoLapSoLuong",
            data: {
                MADON: madon,
                MADDK: maddk,
                SOLUONG: soluong
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Update chi phí số lượng.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Update chi phí số lượng: " + madon + ',' + soluong);

                    tedu.notify('Update chi phí số lượng.', 'success');

                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Update chi phí số lượng.', 'error');
                tedu.stopLoading();
            }
        });
    }
    
    function UpdateDaoLapTKDonViTinh(madon, donvitinh) {
        var maddk = $('#hidDonDangKyMaddk').val();
        $.ajax({
            type: "POST",
            url: "/Admin/podknuoctk/UpDaoLapDonViTinh",
            data: {
                MADON: madon,
                MADDK: maddk,
                DonViTinh: donvitinh
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Update chi phí đơn vị tính.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Update chi phí đơn vị tính: " + madon + ',' + donvitinh);

                    tedu.notify('Update chi phí đơn vị tính.', 'success');

                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Update chi phí đơn vị tính.', 'error');
                tedu.stopLoading();
            }
        });
    }
   
    function UpdateDaoLapTKLoaiChiPhi(madon, loaicp) {
        var maddk = $('#hidDonDangKyMaddk').val();
        $.ajax({
            type: "POST",
            url: "/Admin/podknuoctk/UpDaoLapLoaiCP",
            data: {
                MADON: madon,
                MADDK: maddk,
                LOAICP: loaicp
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Update chi phí đơn vị tính.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Update chi phí loại chi phí: " + madon + ',' + loaicp);

                    tedu.notify('Update chi phí đơn vị tính.', 'success');

                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Update chi phí đơn vị tính.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function chonMauBocBatTu() {
        var maddk = $('#hidDonDangKyMaddk').val();           
        var maubocvattu = $("#ddlChonMauBocVatTu").val();

        $.ajax({
            type: "POST",
            url: "/Admin/podknuoctk/InsMauTK",
            data: {
                MADDK: maddk,
                MauBocVatTuId: maubocvattu
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Lưu các vật tư theo mẫu bốc vật tư.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Lưu các vật tư theo mẫu bốc vật tư: " + maddk + '-' + maubocvattu);

                    tedu.notify('Lưu các vật tư theo mẫu bốc vật tư.', 'success');

                    loadTableBocVatTu();
                    
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu các vật tư theo mẫu bốc vật tư.', 'error');
                tedu.stopLoading();
            }
        });
    }       

    function themVatTuToCTThietKe(mavattu) {
        var maddk = $('#hidDonDangKyMaddk').val();           
        $.ajax({
            type: "POST",
            url: "/Admin/podknuoctk/AddVatTu",
            data: {
                MADDK: maddk,
                MAVATTU: mavattu
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Insert vật tư.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Insert vật tư đến chi tiết thiết kế: " + mavattu );

                    tedu.notify('Insert vật tư.', 'success');

                    $('#modal-add-edit-ThemVatTu').modal('hide');

                    loadTableBocVatTu();

                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Insert vật tư.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function saveSoDoThietKe() {
        var maddk = $('#hidDonDangKyMaddk').val();

        var tenkhbenphai = $("#txtTenKhachHangBenPhai").val();
        var danhsokhbenphai = $("#txtDanhSoKhachHangBenPhai").val();
        var tenkhbentrai = $("#txtTenKhachHangBenTrai").val();
        var danhsokhbentrai = $("#txtDanhSoKhachHangBenTrai").val();
        var mauhinhthietke = $("#ddlChonMauHinhThietKe").val();

        $.ajax({
            type: "POST",
            url: "/Admin/podknuoctk/UpHinhTK",
            data: {
                MADDK: maddk,

                TenKHBenPhai: tenkhbenphai,
                DanhSoKHBenPhai: danhsokhbenphai,
                TenKHBenTrai: tenkhbentrai,
                DanhSoKHBenTrai: danhsokhbentrai,
                MauThietKe: mauhinhthietke
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Lưu hình thiết kế.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Lưu hình thiết kế: " + maddk + '-' + mauhinhthietke);

                    tedu.notify('Lưu hình thiết kế.', 'success');

                    loadTableBocVatTu();

                    $('#modal-add-edit-BocVatTu').modal('hide');

                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu hình thiết kế.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function loadEditBocVatTuSoDoThietKe() {
        var madondangky = $("#hidDonDangKyMaddk").val();

        $.ajax({
            type: "GET",
            url: "/Admin/podknuoctk/GetTKNuocId",
            data: {
                DangKyNuocId: madondangky
            },
            dataType: "json",

            success: function (response) {
                var thietke = response;

                clearData();

                $("#txtTenKhachHangBenPhai").val(thietke.TENKHPHAI);
                $("#txtDanhSoKhachHangBenPhai").val(thietke.DANHSOPHAI);
                $("#txtTenKhachHangBenTrai").val(thietke.TENKHTRAI);
                $("#txtDanhSoKhachHangBenTrai").val(thietke.DANHSOTRAI);
                $("#ddlChonMauHinhThietKe").val(thietke.MAMAUTK);                           

                $('#modal-add-edit-BocVatTu').modal('show');

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

}