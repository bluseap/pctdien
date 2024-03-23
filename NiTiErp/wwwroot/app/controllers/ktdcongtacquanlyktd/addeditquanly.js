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

}