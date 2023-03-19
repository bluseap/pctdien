var didoinuocntController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();

    var addeditddnnt = new addeditddntcController();

    this.initialize = function () {
        loadKhuVuc();

        registerEvents();

        addeditddnnt.initialize();

        loadData();
    }

    function registerEvents() {

        $("#ddl-show-pageDiDoiNuocNT").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            addeditddnnt.loadTableGiayDeNghiDMCungCapNuoc(true);
        });

        $('#ddlKhuVuc').on('change', function () {
            var corporationId = $('#ddlKhuVuc').val();
            loadPhongKhuVuc(corporationId);
            tedu.notify('Danh mục phòng theo khu vực.', 'success');
        });

        $('#btnTimNoiDung').on('click', function () {
            addeditddnnt.loadTableGiayDeNghiDMCungCapNuoc(true);
        });

        $('#txtTimNoiDung').on('keypress', function (e) {
            if (e.which === 13) {
                addeditddnnt.loadTableGiayDeNghiDMCungCapNuoc(true);
            }
        });

        $('body').on('click', '.btn-addeditDDNuocNT', function (e) {
            e.preventDefault();
            var giaydenghiDMCCDVNuocId = $(this).data('id');

            addeditddnnt.loadDDGDNNghiemThuNuoc(giaydenghiDMCCDVNuocId);
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

                addeditddnnt.loadTableGiayDeNghiDMCungCapNuoc(true);
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