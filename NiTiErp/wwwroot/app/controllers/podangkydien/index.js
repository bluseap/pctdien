var podangkydienController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var addeditpodangkydien = new addeditpodangkydienController();
    var lichsudangkydien = new lichsudangkydienController();
    var xulydon = new xulydonController();
    var tuchoidon = new tuchoidonController();

    this.initialize = function () {
        loadKhuVuc();

        registerEvents();

        addeditpodangkydien.initialize();
        lichsudangkydien.initialize();
        xulydon.initialize();
        tuchoidon.initialize();
    }

    function registerEvents() {

        $("#btn-create").on('click', function () {
            $('#hidInsertDonDangKyMaddkPo').val(1);

            $('#modal-add-edit-EditDONDANGKYPO').modal('show');
        });

        $("#ddl-show-pageDONDANGKYPO").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            addeditpodangkydien.loadTableDonDangKyDien();
        });

        $('#ddlKhuVuc').on('change', function () {
            var corporationId = $('#ddlKhuVuc').val();
            loadPhongKhuVuc($("#ddlKhuVuc").val());
            if (corporationId !== 'PO') {
                addeditpodangkydien.loadTableDonDangKyDien();
                xulydon.loadGiaoHoSoChoPhongTo();
            }
        });

        $('#btnTimNoiDung').on('click', function () {
            addeditpodangkydien.loadTableDonDangKyDien();
        });

        $('#txtTimNoiDung').on('keypress', function (e) {
            if (e.which === 13) {
                addeditpodangkydien.loadTableDonDangKyDien();
            }
        });

        $('body').on('click', '.btn-addeditMaddk', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            $('#hidDonDangKyMaddkPo').val(maddk);
            $('#hidInsertDonDangKyMaddkPo').val(2);

            addeditpodangkydien.loadEditDonDangKyDien();
            $('#modal-add-edit-EditDONDANGKYPO').modal('show');
        });

        $('body').on('click', '.btn-XuLyDonDangKy', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            $('#hidDonDangKyMaddkPo').val(maddk);
            xulydon.loadEditXuLyDon();
            $('#modal-add-edit-XuLyDon').modal('show');
        });

        $('body').on('click', '.btn-TuChoiDonDangKy', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            $('#hidDonDangKyMaddkPo').val(maddk);
            tuchoidon.loadEditTuChoiDon();
            $('#modal-add-edit-TuChoiDk').modal('show');
        });

        $('body').on('click', '.btn-TTDonDangKyNuoc', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            $('#hidDonDangKyMaddkPo').val(maddk);

            lichsudangkydien.loadTableLichSuDangKyDien();
            $('#modal-add-edit-LichSuDangKyDien').modal('show');
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
            url: '/admin/hoso/GetListPhongKhuVuc',
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


}