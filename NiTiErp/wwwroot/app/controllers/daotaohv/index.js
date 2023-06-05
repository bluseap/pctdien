var daotaohvController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();

    var addeditdaotaohv = new addeditdaotaohvController();
    var trinhdo = new trinhdodaotaoController();
    var quatrinhdaotao = new quatrinhdtController();

    this.initialize = function () {
        loadKhuVuc();

        registerEvents();

        addeditdaotaohv.initialize();       
        trinhdo.initialize();
        quatrinhdaotao.initialize();

        loadData();
    }

    function registerEvents() {

        $("#ddl-show-pageHoSoNhanVien").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;

            addeditdaotaohv.loadTableHoSoHocVien(true);
        });                

        $('#ddlKhuVuc').on('change', function () {
            var corporationId = $('#ddlKhuVuc').val();
            loadPhongKhuVuc(corporationId);

            addeditdaotaohv.loadTableHoSoHocVien(true);
            tedu.notify('Danh mục phòng theo khu vực.', 'success');
        });

        $('#btnTimNoiDung').on('click', function () {
            addeditdaotaohv.loadTableHoSoHocVien(true);
        });

        $('#txtTimNoiDung').on('keypress', function (e) {
            if (e.which === 13) {
                addeditdaotaohv.loadTableHoSoHocVien(true);
            }
        });

        $('body').on('click', '.btn-EditHoSoHocVien', function (e) {
            e.preventDefault();
            var hosonhanvienid = $(this).data('id');
            $('#hidHoSoNhanVienId').val(hosonhanvienid);

            addeditdaotaohv.loadEditHoSoHocVien(hosonhanvienid);
            $('#modal-add-edit-EditHoSoHocVien').modal('show');
        });

        $('body').on('click', '.btn-TrinhDo', function (e) {
            e.preventDefault();
            var hosonhanvienid = $(this).data('id');

            $('#hidHoSoNhanVienId').val(hosonhanvienid);
            trinhdo.loadTableTrinhDoHocVien();
            $('#modal-add-edit-TrinhDoDaoTao').modal('show');
        });

        $('body').on('click', '.btn-QuaTrinhDaoTao', function (e) {
            e.preventDefault();
            var hosonhanvienid = $(this).data('id');

            $('#hidHoSoNhanVienId').val(hosonhanvienid);
            quatrinhdaotao.loadTableQuaTrinhDaoTao();
            $('#modal-add-edit-QuaTrinhDaoTaoHocVien').modal('show');
        });

        $('#btnXuatExcel').on('click', function () {
            XuatExcelHoSoHocVien();
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
                $('#ddlKhuVucCT').html(render);

                if (userCorporationId !== "PO") {
                    $('#ddlKhuVuc').prop('disabled', true);
                }
                else {
                    $('#ddlKhuVuc').prop('disabled', false);
                }
                $("#ddlKhuVuc")[0].selectedIndex = 1;
                $("#ddlKhuVucCT")[0].selectedIndex = 0;

                loadPhongKhuVuc($("#ddlKhuVuc").val());

                //addeditddn.loadTableGiayDeNghiDMCungCapNuoc(true);
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

    function XuatExcelHoSoHocVien() {
        var khuvuc = $('#ddlKhuVuc').val();

        $.ajax({
            type: 'POST',
            url: '/admin/daotaohv/ExcelHoSoHV',
            data: {
                corporationid: khuvuc
            },
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                window.location.href = response;
                tedu.stopLoading();
            }
        });
    }

    function loadData() {
         
    }


}