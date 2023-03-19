var tuchoidonController = function () {

    var userName = $("#hidUserName").val();      

    this.loadEditTuChoiDon = function () {
        loadEditTuChoiDon();
    }

    this.initialize = function () {
        registerEvents();
        clearData();
    }

    function registerEvents() {
        $('#txtNgayTuChoiDon').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        $('#btnSaveTuChoiDon').on('click', function () {
            saveTuChoiDon();
        });

        $('#btnPhucHoiTuChoiDon').on('click', function () {
            PhucHoiTuChoiDon();
        });

    }

    function clearData() {
        var datenow = new Date();

        $("#txtNgayTuChoiDon").val(tedu.getFormattedDate(datenow));               
        $("#txtGhiChuTuChoiDon").val('');
    }   

    function loadEditTuChoiDon() {
        var madondangky = $("#hidDonDangKyMaddk").val();

        $.ajax({
            type: "GET",
            url: "/Admin/podangkynuoc/GetDKNuocId",
            data: {
                DangKyNuocId: madondangky
            },
            dataType: "json",

            success: function (response) {
                var dangkynuoc = response;

                clearData();

                $("#txtNgayTuChoiDon").val(dangkynuoc.NGAYDUYETHS !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(dangkynuoc.NGAYDUYETHS) : '');
                $("#txtGhiChuTuChoiDon").val(dangkynuoc.NOIDUNG);

                $('#modal-add-edit-TuChoiDk').modal('show');

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function saveTuChoiDon() {
        var madondangky = $('#hidDonDangKyMaddk').val();

        var ngaytuchoi = tedu.getFormatDateYYMMDD($('#txtNgayTuChoiDon').val());        
        var ghichutuchoi = $("#txtGhiChuTuChoiDon").val();

        $.ajax({
            type: "POST",
            url: "/Admin/podangkynuoc/UpTuChoi",
            data: {
                MADDK: madondangky,

                NGAYDUYETHS: ngaytuchoi,               
                NOIDUNG: ghichutuchoi
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Sửa Từ chối đơn đăng ký.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Sửa Từ chối đơn đăng ký nước." + madondangky);

                    tedu.notify('Sửa Từ chối đơn đăng ký.', 'success');                    

                    clearData();

                    $('#modal-add-edit-TuChoiDk').modal('hide');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Sửa Từ chối đơn đăng ký.', 'error');
                tedu.stopLoading();
            }
        });

    }

    function PhucHoiTuChoiDon() {
        var madondangky = $('#hidDonDangKyMaddk').val();

        var ngaytuchoi = tedu.getFormatDateYYMMDD($('#txtNgayTuChoiDon').val());
        var ghichutuchoi = $("#txtGhiChuTuChoiDon").val();

        $.ajax({
            type: "POST",
            url: "/Admin/podangkynuoc/UpPhucHoi",
            data: {
                MADDK: madondangky,

                NGAYDUYETHS: ngaytuchoi,
                NOIDUNG: ghichutuchoi
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Phục hồi Từ chối đơn đăng ký.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Phục hồi Từ chối đơn đăng ký nước." + madondangky);

                    tedu.notify('Phục hồi Từ chối đơn đăng ký.', 'success');

                    clearData();

                    $('#modal-add-edit-TuChoiDk').modal('hide');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Phục hồi Từ chối đơn đăng ký.', 'error');
                tedu.stopLoading();
            }
        });
    }

}