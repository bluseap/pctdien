var tuchoitkController = function () {

    var userName = $("#hidUserName").val();

    this.loadEditTuChoiThietKe = function () {
        loadEditTuChoiThietKe();
    }

    this.initialize = function () {
        registerEvents();
        clearData();
    }

    function registerEvents() {
        $('#txtNgayTuChoiThietKe').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        $('#txtGhiChuTuChoiTK').on('click', function () {
            saveTuChoiThietKe();
        });

    }

    function clearData() {
        var datenow = new Date();

        $("#txtNgayTuChoiThietKe").val(tedu.getFormattedDate(datenow));
        $("#txtGhiChuTuChoiTK").val('');
    }

    function saveTuChoiThietKe() {
        var madondangky = $('#hidDonDangKyMaddk').val();

        var tuchoitk = tedu.getFormatDateYYMMDD($('#txtNgayTuChoiThietKe').val());
        var ghichutuchoitk = $("#txtGhiChuTuChoiTK").val();

        $.ajax({
            type: "POST",
            url: "/Admin/podknuoctk/UpTuChoiTK",
            data: {
                MADDK: madondangky,

                NGAYDTK: tuchoitk,
                CHUTHICH: ghichutuchoitk
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Từ chối thiết kế.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Từ chối thiết kế." + madondangky);

                    tedu.notify('Từ chối thiết kế.', 'success');

                    //clearData();

                    $('#modal-add-edit-TuChoiTK').modal('hide');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Từ chối thiết kế.', 'error');
                tedu.stopLoading();
            }
        });

    }

    function loadEditTuChoiThietKe() {
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

                $("#txtNgayTuChoiThietKe").val(thietke.NGAYDTK !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(thietke.NGAYDTK) : '');
                $("#txtGhiChuTuChoiTK").val(thietke.CHUTHICH);

                $('#modal-add-edit-TuChoiTK').modal('show');

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }


}