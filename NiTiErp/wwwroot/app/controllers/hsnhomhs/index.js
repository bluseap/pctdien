var hsnhomhsController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var addedithsnhomhs = new addedithsnhomhsController();   

    this.initialize = function () {
        loadKhuVuc();

        registerEvents();

        addedithsnhomhs.initialize();
    }

    function registerEvents() {

        $("#btn-create").on('click', function (e) {
            e.preventDefault();

            addedithsnhomhs.addeditClearData();

            $('#hidHsNhomHsId').val(0);
            $('#hidInsertHsNhomHsId').val(1);  // 1: insert; 2: update

            $('#modal-add-edit-HsNhomHs').modal('show');
        });

        $('body').on('click', '.btn-addeditHsNhomHs', function (e) {
            e.preventDefault();
            var hsnhomhsid = $(this).data('id');

            addedithsnhomhs.loadEditHsKeTuBao(hsnhomhsid);
            $('#modal-add-edit-HsNhomHs').modal('show');
        });

        $("#ddl-show-pageHsNhomHs").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            addedithsnhomhs.loadTableHsNhomHs(true);
        });

        $('#ddlKhuVuc').on('change', function () {
            var corporationId = $('#ddlKhuVuc').val();

            //loadPhongKhuVuc(corporationId);

            addedithsnhomhs.loadTableHsNhomHs(true);

            tedu.notify('Danh mục nhóm hồ sơ.', 'success');
        });

        $('#btnTimNoiDung').on('click', function () {
            addedithsnhomhs.loadTableHsNhomHs(true);
        });

        //$('#txtTimNoiDung').on('keypress', function (e) {
        //    if (e.which === 13) {
        //        //addedithskebao.loadTableHsKeTuBao(true);
        //    }
        //});

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
                $('#ddlAddEditKhuVuc').html(render);               

                if (userCorporationId !== "PO") {
                    if (userName == "admin" || userName == "lenguyen") {
                        $('#ddlKhuVuc').prop('disabled', true);
                        $('#ddlAddEditKhuVuc').prop('disabled', true);                       
                    }
                    else {
                        $('#ddlKhuVuc').prop('disabled', false);
                        $('#ddlAddEditKhuVuc').prop('disabled', false);
                    }
                }
                else {
                    $('#ddlKhuVuc').prop('disabled', false);
                    $('#ddlAddEditKhuVuc').prop('disabled', false);
                }

                $("#ddlKhuVuc")[0].selectedIndex = 1;
                $("#ddlAddEditKhuVuc")[0].selectedIndex = 1;                

                addedithsnhomhs.loadTableHsNhomHs(true);

            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Nhóm hồ sơ.', 'error');
            }
        });
    } 

}