var kdnuocbbttController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();

    var addeditbbttn = new addeditbbttnController();    

    this.initialize = function () {
        loadKhuVuc();

        registerEvents();

        addeditbbttn.initialize();       

        loadData();
    }

    function registerEvents() {

        $("#ddl-show-pageKiemDinhNuocBBTT").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            addeditbbttn.loadTableGiayDeNghiDMCungCapNuoc(true);
        });

        $('body').on('click', '.btn-addeditKDNuocBBTT', function (e) {
            e.preventDefault();
            var giaydenghiDMCCDVNuocId = $(this).data('id');

            addeditbbttn.loadGDNXuLyKiemDinhNuoc(giaydenghiDMCCDVNuocId);
        });        

        $('#ddlKhuVuc').on('change', function () {
            var corporationId = $('#ddlKhuVuc').val();
            loadPhongKhuVuc(corporationId);
            addeditbbttn.loadTableGiayDeNghiDMCungCapNuoc(true);
            tedu.notify('Danh mục phòng theo khu vực.', 'success');
        });

        $('#btnTimNoiDung').on('click', function () {
            addeditbbttn.loadTableGiayDeNghiDMCungCapNuoc(true);
        });

        $('#txtTimNoiDung').on('keypress', function (e) {
            if (e.which === 13) {
                addeditbbttn.loadTableGiayDeNghiDMCungCapNuoc(true);
            }
        });

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

                if (userCorporationId !== "PO") {
                    $('#ddlKhuVuc').prop('disabled', true);
                }
                else {
                    $('#ddlKhuVuc').prop('disabled', false);
                }
                $("#ddlKhuVuc")[0].selectedIndex = 1;

                loadPhongKhuVuc($("#ddlKhuVuc").val());

                addeditbbttn.loadTableGiayDeNghiDMCungCapNuoc(true);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

    function loadPhongKhuVuc(makhuvuc) {
        $.ajax({
            type: 'GET',
            url: '/admin/ddnuockstk/ListPhongUserName',
            data: { makv: makhuvuc },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='%' >-- Lựa chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenPhong + "</option>";
                });
                $('#ddlPhongTo').html(render);
                $("#ddlPhongTo")[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    }

    function loadData() {
        //$('#ddlPhongTo').hide();        
    }


}