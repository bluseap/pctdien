var pokylaihddienController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var addeditpokylaihddien = new addeditpokylaihddienController();
    var timkhachhang = new timkhachhangController();

    this.initialize = function () {
        loadKhuVuc();
        loadData();

        registerEvents();

        addeditpokylaihddien.initialize();
        timkhachhang.initialize();
    }

    function registerEvents() {

        $("#btn-create").on('click', function () {
            $('#hidInsertUpdateThayHopDongPoId').val(1);
            $('#modal-add-edit-EditThayHopDongDien').modal('show');

            addeditpokylaihddien.addeditClearData();
        });

        $('#ddlKhuVuc').on('change', function () {
            var corporationId = $('#ddlKhuVuc').val();

            if (corporationId !== 'PO')
                addeditpokylaihddien.loadTableThayHopDongDien();
        });

        $('#btnTimNoiDung').on('click', function () {
            addeditpokylaihddien.loadTableThayHopDongDien();
        });

        $('#txtTimNoiDung').on('keypress', function (e) {
            if (e.which === 13) {
                addeditpokylaihddien.loadTableThayHopDongDien();
            }
        });

        $("#ddl-show-pageTHAYHOPDONG").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            addeditpokylaihddien.loadTableThayHopDongDien(true);
        });

        $('body').on('click', '.btn-addeditKhachHangId', function (e) {
            e.preventDefault();
            var thayhopdongidmakv = $(this).data('id');

            $('#hidInsertUpdateThayHopDongPoId').val(2);
            $('#hidThayHopDongPoIdMaKvPo').val(thayhopdongidmakv);

            addeditpokylaihddien.loadEditThayDongHo();
            $('#modal-add-edit-EditThayHopDongDien').modal('show');
        });

        $('body').on('click', '.btn-InThayHopDong', function (e) {
            e.preventDefault();
            var thayhopdongidmakv = $(this).data('id');

            $('#hidThayHopDongPoIdMaKvPo').val(thayhopdongidmakv);
            inThayHopDong();
        });

    }

    function loadData() {
        loadDataLoaiHopDong();
        loadDataDsHopDongTheo();
    }

    function loadDataLoaiHopDong() {
        return $.ajax({
            type: 'GET',
            url: '/admin/PoKyLaiHDNuoc/PoDieuKien',
            data: { DieuKien: 'LoaiHopDong' },
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >-- Bỏ chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Ten + "</option>";
                });
                $('#ddlLoaiHopDong').html(render);
                $('#ddlTHDLoaiHopDong').html(render);

                $("#ddlLoaiHopDong")[0].selectedIndex = 0;
                $("#ddlTHDLoaiHopDong")[0].selectedIndex = 0;

            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Hợp đồng.', 'error');
            }
        });
    }

    function loadDataDsHopDongTheo() {
        var render = "<option value='0' >-Bỏ chọn-</option>";
        render += "<option value='HDHH6T' >-D.sách gần hết hạn h.đồng trước 6 tháng-</option>";
        //render += "<option value='HDHH6TMDK' >-D.sách gần hết hạn h.đồng trước 6 tháng (MĐ.khác)-</option>";
        //render += "<option value='HDHH6TSH' >-D.sách gần hết hạn h.đồng trước 6 tháng (S.hoạt)-</option>";

        $('#ddlDanhSachHopDongTheo').html(render);
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
                $('#ddlTHDKhuVuc').html(render);
                $('#ddlTKHKhuVuc').html(render);

                if (userCorporationId !== "PO") {
                    $('#ddlKhuVuc').prop('disabled', true);
                    $('#ddlTHDKhuVuc').prop('disabled', true);
                    $('#ddlTKHKhuVuc').prop('disabled', true);
                }
                else {
                    $('#ddlKhuVuc').prop('disabled', false);
                    $('#ddlTHDKhuVuc').prop('disabled', false);
                    $('#ddlTKHKhuVuc').prop('disabled', false);
                }
                $("#ddlKhuVuc")[0].selectedIndex = 1;
                $("#ddlTHDKhuVuc")[0].selectedIndex = 1;
                $("#ddlTKHKhuVuc")[0].selectedIndex = 1;

                //loadPhongKhuVuc($("#ddlKhuVuc").val());
                //addeditpodangkynuoc.loadTableDonDangKyNuoc();
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

    function inThayHopDong() {
        var thayhopdongidmakv = $('#hidThayHopDongPoIdMaKvPo').val();

        $.ajax({
            type: 'GET',
            url: '/admin/PoKyLaiHDDien/InTHDDien',
            data: {
                ThayHopDongPoIdMaKvPo: thayhopdongidmakv
            },
            async: false,
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                nguyen.appUserLoginLogger(userName, "In Thay hợp đồng điện.");

                if (response.length !== 0) {
                    window.open('/Admin/RpInHopDongDien/Index', '_blank');
                }
                else {
                    window.open('/Admin/RpInHopDongDien/Index', '_blank');
                }
                tedu.stopLoading();
            },
        });
    }

}