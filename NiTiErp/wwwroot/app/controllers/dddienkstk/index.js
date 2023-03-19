var didoidienController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();

    var addeditddn = new addeditdddController();
    var khaosatthietke = new khaosatthietkeController();
    var duyetthietke = new duyetthietkeController();

    this.initialize = function () {
        loadKhuVuc();

        registerEvents();

        addeditddn.initialize();
        khaosatthietke.initialize();
        duyetthietke.initialize();

        loadData();
    }

    function registerEvents() {

        $("#ddl-show-pageDiDoiDienKSTK").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            addeditddn.loadTableGiayDeNghiDMCungCapDien(true);
        });

        $('body').on('click', '.btn-addeditDDDienKSTK', function (e) {
            e.preventDefault();
            var giaydenghiDMCCDVDienId = $(this).data('id');

            addeditddn.loadDDGDNThietKeDien(giaydenghiDMCCDVDienId);
        });

        $('body').on('click', '.btn-KhaoSatTK', function (e) {
            e.preventDefault();
            var giaydenghiDMCCDVDienId = $(this).data('id');

            khaosatthietke.loadDataKhaoSatThietKe(giaydenghiDMCCDVDienId);
        })

        $('body').on('click', '.btn-DuyetThietKe', function (e) {
            e.preventDefault();
            var giaydenghiDMCCDVDienId = $(this).data('id');

            duyetthietke.loadDuyetThietKeDien(giaydenghiDMCCDVDienId);
        })

        $('#ddlKhuVuc').on('change', function () {
            var corporationId = $('#ddlKhuVuc').val();
            loadPhongKhuVuc(corporationId);
            addeditddn.loadTableGiayDeNghiDMCungCapDien(true);
            tedu.notify('Danh mục phòng theo khu vực.', 'success');
        });

        $('#btnTimNoiDung').on('click', function () {
            addeditddn.loadTableGiayDeNghiDMCungCapDien(true);
        });

        $('#txtTimNoiDung').on('keypress', function (e) {
            if (e.which === 13) {
                addeditddn.loadTableGiayDeNghiDMCungCapDien(true);
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

                addeditddn.loadTableGiayDeNghiDMCungCapDien(true);
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