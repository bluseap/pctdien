var podknuochdController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var nhaphopdong = new nhaphopdongController();

    this.initialize = function () {
        loadKhuVuc();

        registerEvents();

        nhaphopdong.initialize();        

    }

    function registerEvents() {

        $("#btn-create").on('click', function () {
            $('#hidInsertDonDangKyMaddk').val(1);

            $('#modal-add-edit-NhapHopDong').modal('show');
        });

        $("#ddl-show-pageDONDANGKY").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            nhaphopdong.loadTableNhapHopDongNuoc();
        });

        $('#ddlKhuVuc').on('change', function () {
            var corporationId = $('#ddlKhuVuc').val();

            loadPhongKhuVuc(corporationId);            

            if (corporationId !== 'PO') {
                nhaphopdong.loadTableNhapHopDongNuoc();
            }
        });

        $('#btnTimNoiDung').on('click', function () {
            nhaphopdong.loadTableNhapHopDongNuoc();
        });

        $('#txtTimNoiDung').on('keypress', function (e) {
            if (e.which === 13) {
                nhaphopdong.loadTableNhapHopDongNuoc();
            }
        });

        $('body').on('click', '.btn-EditNhapHopDong', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            $('#hidDonDangKyMaddk').val(maddk);
            $('#hidInsertDonDangKyMaddk').val(2);
            nhaphopdong.loadEditNhapHopDong();
            $('#modal-add-edit-NhapHopDong').modal('show');
        });       

        //$('body').on('click', '.btn-TuChoiHD', function (e) {
        //    e.preventDefault();
        //    var maddk = $(this).data('id');
        //    //$('#hidDonDangKyMaddk').val(maddk);
        //    //tuchoithietke.loadEditTuChoiThietKe();
        //    //$('#modal-add-edit-TuChoiTK').modal('show');
        //});

        $('body').on('click', '.btn-InHD', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            $('#hidDonDangKyMaddk').val(maddk);
            inHopDong();
        });

        $('body').on('click', '.btn-NhapHopDongTTDonDangKyNuoc', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            //$('#hidDonDangKyMaddk').val(maddk);
            //lichsudangkynuoc.loadTableLichSuDangKyNuoc();
            //$('#modal-add-edit-LichSuDangKyNuoc').modal('show');
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
                $('#ddlNhapHDKhuVuc').html(render);

                if (userCorporationId !== "PO") {
                    $('#ddlKhuVuc').prop('disabled', true);
                    $('#ddlNhapHDKhuVuc').prop('disabled', true);

                    $('#ddlPhongTo').prop('disabled', true);
                    $('#ddlNhapHDPhongTo').prop('disabled', true);
                }
                else {
                    $('#ddlKhuVuc').prop('disabled', false);
                    $('#ddlNhapHDKhuVuc').prop('disabled', false);

                    $('#ddlPhongTo').prop('disabled', false);
                    $('#ddlNhapHDPhongTo').prop('disabled', false);
                }
                $("#ddlKhuVuc")[0].selectedIndex = 1;
                $("#ddlNhapHDKhuVuc")[0].selectedIndex = 1;

                let makhuvuc = $("#ddlKhuVuc").val();
                loadPhongKhuVuc(makhuvuc);
                nhaphopdong.loadPhongKhuVucNhapThietKe(makhuvuc);
                
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

    function inHopDong() {
        var maddk = $('#hidDonDangKyMaddk').val();

        $.ajax({
            type: 'GET',
            url: '/admin/podknuochd/InHDNuoc',
            data: {
                MADDK: maddk
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                nguyen.appUserLoginLogger(userName, "In Hợp đồng nước.");

                if (response.length !== 0) {
                    window.open('/Admin/RpPoInHopDongNuoc/Index', '_blank');
                }
                else {
                    window.open('/Admin/RpPoInHopDongNuoc/Index', '_blank');
                }
                tedu.stopLoading();
            },
        });
    }

}