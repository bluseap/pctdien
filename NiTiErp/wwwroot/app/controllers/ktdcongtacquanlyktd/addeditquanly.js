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

}