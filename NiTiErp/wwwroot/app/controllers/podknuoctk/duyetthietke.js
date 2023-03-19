var duyettkController = function () {

    var userName = $("#hidUserName").val();

    this.loadEditDuyetThietKe = function () {
        loadEditDuyetThietKe();
    }

    this.initialize = function () {
        registerEvents();
        clearData();
    }

    function registerEvents() {
        $('#txtNgayDuyetThietKe').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        $('#btnSaveDuyetTK').on('click', function () {
            saveDuyetThietKe();
        });

    }

    function clearData() {
        var datenow = new Date();

        $("#txtNgayDuyetThietKe").val(tedu.getFormattedDate(datenow));        
        $("#txtGhiChuDuyetTK").val('');
    }
    
    function saveDuyetThietKe() {
        var madondangky = $('#hidDonDangKyMaddk').val();

        var ngayduyettk = tedu.getFormatDateYYMMDD($('#txtNgayDuyetThietKe').val());        
        var ghichuduyettk = $("#txtGhiChuDuyetTK").val();

        $.ajax({
            type: "POST",
            url: "/Admin/podknuoctk/UpDuyetTK",
            data: {
                MADDK: madondangky,

                NGAYDTK: ngayduyettk,                
                CHUTHICH: ghichuduyettk
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Duyệt thiết kế.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Duyệt thiết kế." + madondangky);

                    tedu.notify('Duyệt thiết kế.', 'success');

                    //clearData();

                    $('#modal-add-edit-DuyetTK').modal('hide');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Duyệt thiết kế.', 'error');
                tedu.stopLoading();
            }
        });

    }

    function loadEditDuyetThietKe() {
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

                $("#txtNgayDuyetThietKe").val(thietke.NGAYDTK !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(thietke.NGAYDTK) : '');
                $("#txtGhiChuDuyetTK").val(thietke.CHUTHICH);

                $('#modal-add-edit-DuyetTK').modal('show');

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }


}