var podknuoctcController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var nhapthicong = new nhapthicongController();
    var nhapsonodongho = new nhapsonodonghoController();
    var travetk = new travetkController();

    this.initialize = function () {
        loadKhuVuc();

        registerEvents();
        loadData();

        nhapthicong.initialize();
        nhapsonodongho.initialize();
        travetk.initialize();
    }

    function registerEvents() {

        $("#btn-create").on('click', function () {
            $('#hidInsertDonDangKyMaddk').val(1);
            nhapthicong.addeditClearData();
            $('#modal-add-edit-NhapThiCong').modal('show');
        });

        $("#ddl-show-pageDONDANGKY").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            nhapthicong.loadTableNhapThiCongNuoc();
        });

        $('#ddlKhuVuc').on('change', function () {
            var corporationId = $('#ddlKhuVuc').val();

            loadPhongKhuVuc(corporationId);
            nhapthicong.loadTenNhanVien(corporationId);

            //if (corporationId !== 'PO') {
            //    nhapthicong.loadTableNhapThiCongNuoc();
            //}
        });

        $('#btnTimNoiDung').on('click', function () {
            nhapthicong.loadTableNhapThiCongNuoc();
        });

        $('#txtTimNoiDung').on('keypress', function (e) {
            if (e.which === 13) {
                nhapthicong.loadTableNhapThiCongNuoc();
            }
        });

        $('body').on('click', '.btn-EditNhapThiCong', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            $('#hidDonDangKyMaddk').val(maddk);
            $('#hidInsertDonDangKyMaddk').val(2);
            nhapthicong.loadEditNhapThiCong();
            //$('#modal-add-edit-NhapThiCong').modal('show');
        });

        $('body').on('click', '.btn-NhapDongHo', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            $('#hidDonDangKyMaddk').val(maddk);
            $('#hidInsertDonDangKyMaddk').val(1);
            nhapsonodongho.loadEditNhapSoNoDongHo();
            //$('#modal-add-edit-NhapSoNoDongHo').modal('show');
        });

        $('body').on('click', '.btn-ChuyenTK', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            $('#hidDonDangKyMaddk').val(maddk);
            travetk.loadEditTraVeThietKe();
            //$('#modal-add-edit-TraVeTK').modal('show');
        });       

        $('body').on('click', '.btn-NhapHopDongTTDonDangKyNuoc', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            //$('#hidDonDangKyMaddk').val(maddk);
            //lichsudangkynuoc.loadTableLichSuDangKyNuoc();
            //$('#modal-add-edit-LichSuDangKyNuoc').modal('show');
        });

    }

    function loadData() {
        var render = "<option value='%' >-- Bỏ chọn --</option> <option value='DSChuaNhapSoNoDH' >-- D.sách chưa Nhập số No đồng hồ --</option> ";

        $('#ddlDsDieuKienTim').html(render);
        $("#ddlDsDieuKienTim")[0].selectedIndex = 0;
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
                $('#ddlNhapTCKhuVuc').html(render);
                $('#ddlNhapNoKhuVuc').html(render);

                if (userCorporationId !== "PO") {
                    $('#ddlKhuVuc').prop('disabled', true);
                    $('#ddlNhapTCKhuVuc').prop('disabled', true);
                    $('#ddlNhapNoKhuVuc').prop('disabled', true);

                    $('#ddlPhongTo').prop('disabled', true);
                    $('#ddlNhapTCPhongTo').prop('disabled', true);
                }
                else {
                    $('#ddlKhuVuc').prop('disabled', false);
                    $('#ddlNhapTCKhuVuc').prop('disabled', false);
                    $('#ddlNhapNoKhuVuc').prop('disabled', false);

                    $('#ddlPhongTo').prop('disabled', false);
                    $('#ddlNhapTCPhongTo').prop('disabled', false);
                }
                $("#ddlKhuVuc")[0].selectedIndex = 1;
                $("#ddlNhapTCKhuVuc")[0].selectedIndex = 1;
                $("#ddlNhapNoKhuVuc")[0].selectedIndex = 1;

                let makhuvuc = $("#ddlKhuVuc").val();
                loadPhongKhuVuc(makhuvuc);
                nhapthicong.loadPhongKhuVucNhapThietKe(makhuvuc);
                nhapthicong.loadTenNhanVien(makhuvuc);
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

    //function inHopDong() {
    //    var maddk = $('#hidDonDangKyMaddk').val();

    //    $.ajax({
    //        type: 'GET',
    //        url: '/admin/podknuochd/InHDNuoc',
    //        data: {
    //            MADDK: maddk
    //        },
    //        dataType: "json",
    //        beforeSend: function () {
    //            tedu.startLoading();
    //        },
    //        success: function (response) {
    //            nguyen.appUserLoginLogger(userName, "In Hợp đồng nước.");

    //            if (response.length !== 0) {
    //                window.open('/Admin/RpPoInHopDongNuoc/Index', '_blank');
    //            }
    //            else {
    //                window.open('/Admin/RpPoInHopDongNuoc/Index', '_blank');
    //            }
    //            tedu.stopLoading();
    //        },
    //    });
    //}

}