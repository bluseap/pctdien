var addeditcongtacquanlyController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    this.initialize = function () {    
        registerEvents();     
    }

    function registerEvents() {

        $('#btnSaveEditThayTheVatTu').on('click', function () {
            saveThayTheVatTu();
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
                    tedu.notify("Khởi tạo báo cáo lỗi.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Khởi tạo báo cáo. dmkhoitao: " + DmKhoiTao + ", Khu vực: " + xinghiep + ", Năm: " + nam + ", Tháng: " + thang);

                    tedu.notify('Khởi tạo báo cáo.', 'success');

                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu Khởi tạo báo cáo.', 'error');
                tedu.stopLoading();
            }
        });
    }

}