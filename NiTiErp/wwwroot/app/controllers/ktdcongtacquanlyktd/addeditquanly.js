var addeditcongtacquanlyController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var loaddatatable = new loaddatatableController();  

    this.initialize = function () {    
        registerEvents();     
    }

    function registerEvents() {

        $('#btnSaveEditThayTheVatTu').on('click', function () {
            saveThayTheVatTu();
        });
        $('#btnSaveEditPhatTrienLuoiDien').on('click', function () {
            savePhatTrienLuoiDien();
        });
        $('#btnSaveEditNangCongSuatCayMoi').on('click', function () {
            saveNangCongSuatCayMoi();
        });
        $('#btnSaveEditPhatTrienKhachHang').on('click', function () {
            savePhatTrienKhachHang();
        });
        $('#btnSaveEditKTDXuLyKhac').on('click', function () {
            saveXuLyKhac();
        });
        $('#btnSaveEditKTDDuyTuBaoDuong').on('click', function () {
            saveDuyTuBaoDuong();
        });
        $('#btnSaveEditCaiTaoSuaChua').on('click', function () {
            saveCaiTaoSuaChua();
        });

    }

    function saveThayTheVatTu() {
        var thaythevattuid = $('#hidThayTheVatTuId').val();
        
        var soluongvattu = $("#txtThayTheVatTuSoLuongVatTu").val();
        var soluongluytuyen = $("#txtThayTheVatTuSoLuongLuyTuyen").val();
        var chitietvattu = $("#txtThayTheVatTuChiTiet").val();
        var thietbikhac = $("#txtThayTheVatTuThietBiKhac").val();

        $.ajax({
            type: "POST",
            url: "/Admin/ktdcongtacquanlyktd/SaveThayTheVatTu",
            data: {
                ThayTheVatTuId: thaythevattuid,
                SoLuongVatTu: soluongvattu,
                SoLuongLuyTuyen: soluongluytuyen,
                ChiTietVatTu: chitietvattu,
                ThietBiKhac: thietbikhac
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Lưu thay thế vật tư, thiết bị lỗi.", "error");
                }
                else {
                    loaddatatable.loadTableThayTheVatTu();
                    nguyen.appUserLoginLogger(userName, "thay thế vật tư, thiết bị. ThayTheVatTuId: " + thaythevattuid);
                    $('#modal-add-edit-EditKTDThayTheVatTu').modal('hide');

                    tedu.notify('thay thế vật tư, thiết bị.', 'success');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu thay thế vật tư, thiết bị.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function savePhatTrienLuoiDien() {
        var phattrienluoidienid = $('#hidPhatTrienLuoiDienId').val();

        var soluongvattu = $("#txtPhatTrienLuoiDienSoLuongVatTu").val();
        var soluongluytuyen = $("#txtPhatTrienLuoiDienSoLuongLuyTuyen").val();        

        $.ajax({
            type: "POST",
            url: "/Admin/ktdcongtacquanlyktd/SavePhatTrienLuoiDien",
            data: {
                PhatTrienLuoiDienId: phattrienluoidienid,
                ChieuDaiPhatTrienLuoiDien: soluongvattu,
                ChieuDaiLuyTuyenPhatTrienLuoiDien: soluongluytuyen
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Lưu công tác phát triển lưới điện.", "error");
                }
                else {
                    loaddatatable.loadTablePhatTrienLuoiDien();
                    nguyen.appUserLoginLogger(userName, "Công tác phát triển lưới điện. PhatTrienLuoiDienId: " + phattrienluoidienid);
                    $('#modal-add-edit-EditKTDPhatTrienLuoiDien').modal('hide');

                    tedu.notify('Công tác phát triển lưới điện.', 'success');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu Công tác phát triển lưới điện.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function saveNangCongSuatCayMoi() {
        var nangcongsuatcaymoiid = $('#hidNangCongSuatCayMoiId').val();

        var soluongnangcongsuat = $("#txtNangCongSuatCayMoiSoLuongVatTu").val();
        var slslnangcongsuat = $("#txtSoLuongSoLuongNangCongSuat").val();
        var cuthenangcongsuat = $("#txtCuTheNangCongSuat").val();
        var soluongluytuyen = $("#txtNangCongSuatCayMoiLuyTuyen").val();
        var congsuatsoluongluytuyen = $("#txtNangCongSuatSoLuongCongSuatCongSuat").val();        

        $.ajax({
            type: "POST",
            url: "/Admin/ktdcongtacquanlyktd/SaveNangCongSuatCayMoi",
            data: {
                NangCongSuatCayMoiId: nangcongsuatcaymoiid,

                SoLuongNangCongSuat: soluongnangcongsuat,
                SoLuongSoLuongNangCongSuat: slslnangcongsuat,
                CuTheNangCongSuat: cuthenangcongsuat,
                SoLuongLuyTuyenNangCongSuat: soluongluytuyen,
                CongSuatSoLuongLuyTuyenNangCongSuat: congsuatsoluongluytuyen
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Lưu nâng công suất cấy mới tba.", "error");
                }
                else {
                    loaddatatable.loadTableCayMoiNangCongSuat();
                    nguyen.appUserLoginLogger(userName, "Công tác nâng công suất cấy mới tba. NangCongSuatCayMoiId: " + nangcongsuatcaymoiid);
                    $('#modal-add-edit-EditKTDNangCongSuatCayMoi').modal('hide');

                    tedu.notify('Công tác nâng công suất cấy mới tba.', 'success');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu Công tác nâng công suất cấy mới tba.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function savePhatTrienKhachHang() {
        var phattrienkhachhangid = $('#hidPhatTrienKhachHangId').val();

        var soluongptkh = $("#txtPhatTrienKhachHangSoLuongVatTu").val();
        var soluongluytuyen = $("#txtPhatTrienKhachHangSoLuongLuyTuyen").val();

        $.ajax({
            type: "POST",
            url: "/Admin/ktdcongtacquanlyktd/SavePhatTrienKhachHang",
            data: {
                PhatTrienKhachHangId: phattrienkhachhangid,

                SoLuongPhatTrienKhachHang: soluongptkh,
                LuyTuyenPhatTrienKhachHang: soluongluytuyen
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Lưu công tác phát triển khách hàng.", "error");
                }
                else {
                    loaddatatable.loadTablePhatTrienKhachHang();
                    nguyen.appUserLoginLogger(userName, "Công tác phát triển khách hàng. PhatTrienKhachHangId: " + phattrienkhachhangid);
                    $('#modal-add-edit-EditKTDPhatTrienKhachHang').modal('hide');

                    tedu.notify('Công tác Công tác phát triển khách hàng.', 'success');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu Công tác phát triển khách hàng.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function saveXuLyKhac() {
        var xulykhacid = $('#hidXuLyKhacId').val();

        var noidungxuly = $("#txtXuLyKhacNoiDung").val();
       
        $.ajax({
            type: "POST",
            url: "/Admin/ktdcongtacquanlyktd/SaveXuLyKhac",
            data: {
                XuLyKhacId: xulykhacid,

                NoiDungXuLyKhac: noidungxuly
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Lưu công tác xử lý khác.", "error");
                }
                else {
                    loaddatatable.loadTableXuLyKhac();
                    nguyen.appUserLoginLogger(userName, "Công tác xử lý khác. XuLyKhacId: " + xulykhacid);
                    $('#modal-add-edit-EditKTDXuLyKhac').modal('hide');

                    tedu.notify('Công tác xử lý khác.', 'success');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu Công tác xử lý khác.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function saveDuyTuBaoDuong() {
        var duytubaoduongid = $('#hidDuyTuBaoDuongId').val();

        var soluong = $("#txtDuyTuBaoDuongSoLuong").val();
        var cuthe = $("#txtCuTheDuyTuBaoDuong").val();
        var soluytuyen = $("#txtDuyTuBaoDuongLuyTuyen").val();

        $.ajax({
            type: "POST",
            url: "/Admin/ktdcongtacquanlyktd/SaveDuyTuBaoDuong",
            data: {
                DuyTuBaoDuongId: duytubaoduongid,

                SoLuongDuyTuBaoDuong: soluong,
                CuTheDuyTuBaoDuong: cuthe,
                SoLuongLuyTuyenDuyTuBaoDuong: soluytuyen
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Lưu công tác duy tu bảo dưỡng lưới điện.", "error");
                }
                else {
                    loaddatatable.loadTableDuyTuBaoDuong();
                    nguyen.appUserLoginLogger(userName, "Công tác xử duy tu bảo dưỡng lưới điện. DuyTuBaoDuongId: " + duytubaoduongid);
                    $('#modal-add-edit-EditKTDDuyTuBaoDuong').modal('hide');

                    tedu.notify('Công tác duy tu bảo dưỡng lưới điện.', 'success');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu Công tác duy tu bảo dưỡng lưới điện.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function saveCaiTaoSuaChua() {
        var caitaosuachuaid = $('#hidCaiTaoSuaChuaId').val();

        var SoLuongCaiTaoSuaChua1 = $("#txtCaiTaoSuaChuTenVatTu71To73").val();
        var DaiCaiTaoSuaChua1 = $("#txtCaiTaoSuaChua71To73ChieuDai").val();
        var CuTheCaiTaoSuaChua1 = $("#txtCaiTaoSuaChua71To73CuThe").val();
        var SoLuongLuyTuyenCaiTaoSuaChua1 = $("#txtCaiTaoSuaChua71To73LuyTuyen").val();
        var SoLuongSoLuongLuyTuyenCaiTaoSuaChua1 = $("#txtCaiTaoSuaChua71ToLuyTuyen73KM").val();
        var SoLuongMuaCaiTaoSuaChua1 = $("#txtCaiTaoSuaChuTenVatTu74To75Mua").val();
        var SoLuongBanCaiTaoSuaChua1 = $("#txtCaiTaoSuaChuTenVatTu74To75Ban").val();
        var SoLuongTyLeCaiTaoSuaChua1 = $("#txtCaiTaoSuaChuTenVatTu74To75TyLe").val();
        var SoLuongHaoHutCaiTaoSuaChua1 = $("#txtCaiTaoSuaChuTenVatTu74To75HaoHut").val();

        var SoLuongKHCaiTaoSuaChua1 = $("#txtCaiTaoSuaChuTenVatTu74To75Mua").val();
        var SoLuongThucHienCaiTaoSuaChua1 = $("#txtCaiTaoSuaChuTenVatTu74To75Ban").val();

        $.ajax({
            type: "POST",
            url: "/Admin/ktdcongtacquanlyktd/SaveCaiTaoSuaChua",
            data: {
                Id: caitaosuachuaid,

                SoLuongCaiTaoSuaChua: SoLuongCaiTaoSuaChua1,
                DaiCaiTaoSuaChua: DaiCaiTaoSuaChua1,
                CuTheCaiTaoSuaChua: CuTheCaiTaoSuaChua1,
                SoLuongLuyTuyenCaiTaoSuaChua: SoLuongLuyTuyenCaiTaoSuaChua1,
                SoLuongSoLuongLuyTuyenCaiTaoSuaChua: SoLuongSoLuongLuyTuyenCaiTaoSuaChua1,
                SoLuongMuaCaiTaoSuaChua: SoLuongMuaCaiTaoSuaChua1,
                SoLuongBanCaiTaoSuaChua: SoLuongBanCaiTaoSuaChua1,
                SoLuongTyLeCaiTaoSuaChua: SoLuongTyLeCaiTaoSuaChua1,
                SoLuongHaoHutCaiTaoSuaChua: SoLuongHaoHutCaiTaoSuaChua1,

                SoLuongKHCaiTaoSuaChua: SoLuongKHCaiTaoSuaChua1,
                SoLuongThucHienCaiTaoSuaChua: SoLuongThucHienCaiTaoSuaChua1
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Lưu công tác cải tại sửa chữa.", "error");
                }
                else {
                    loaddatatable.loadTableCaiTaoSuaChua();
                    nguyen.appUserLoginLogger(userName, "Công tác cải tại sửa chữa. CaiTaoSuaChuaId: " + caitaosuachuaid);
                    $('#modal-add-edit-EditKTDCaiTaoSuaChua').modal('hide');

                    tedu.notify('Công tác cải tại sửa chữa.', 'success');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu Công tác cải tại sửa chữa.', 'error');
                tedu.stopLoading();
            }
        });
    }

}