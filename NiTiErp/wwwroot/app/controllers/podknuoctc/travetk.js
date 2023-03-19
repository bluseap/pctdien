var travetkController = function () {

    var userName = $("#hidUserName").val();

    this.loadEditTraVeThietKe = function () {
        loadEditTraVeThietKe();
    }

    this.initialize = function () {
        registerEvents();
        clearData();
    }

    function registerEvents() {
        $('#txtNgayTraVeThietKe').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        $('#txtGhiChuTraVeThietKe').on('click', function () {
            saveTraVeThietKe();
        });

    }

    function clearData() {
        var datenow = new Date();

        $("#txtNgayTraVeThietKe").val(tedu.getFormattedDate(datenow));
        $("#txtGhiChuTraVeThietKe").val('');
    }

    function saveTraVeThietKe() {
        var madondangky = $('#hidDonDangKyMaddk').val();

        var ngaytravetk = tedu.getFormatDateYYMMDD($('#txtNgayTraVeThietKe').val());
        var ghichutravetk = $("#txtGhiChuTraVeThietKe").val();

        $.ajax({
            type: "POST",
            url: "/Admin/podknuoctc/UpTraVeTK",
            data: {
                MADDK: madondangky,

                NGAYTRAHSTC: ngaytravetk,
                LYDOTRAHSTK: ghichutravetk
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Trả về thiết kế.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Trả về thiết kế." + madondangky);

                    tedu.notify('Trả về thiết kế.', 'success');

                    //clearData();

                    $('#modal-add-edit-TraVeTK').modal('hide');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Trả về thiết kế.', 'error');
                tedu.stopLoading();
            }
        });

    }

    function loadEditTraVeThietKe() {
        var madondangky = $("#hidDonDangKyMaddk").val();

        $.ajax({
            type: "GET",
            url: "/Admin/podknuoctc/GetTCNuocId",
            data: {
                DangKyNuocId: madondangky
            },
            dataType: "json",

            success: function (response) {
                var thietke = response;

                clearData();

                $("#txtNgayTraVeThietKe").val(thietke.NGAYTRAHSTC !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(thietke.NGAYTRAHSTC) : '');
                $("#txtGhiChuTraVeThietKe").val(thietke.LYDOTRAHSTK);

                $('#modal-add-edit-TraVeTK').modal('show');
                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }


}