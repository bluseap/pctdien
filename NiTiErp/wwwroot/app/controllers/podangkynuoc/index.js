var podangkynuocController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var addeditpodangkynuoc = new addeditpodangkynuocController();
    var lichsudangkynuoc = new lichsudangkynuocController();
    var xulydon = new xulydonController();
    var tuchoidon = new tuchoidonController();
    
    this.initialize = function () {
        loadPhongUserName(userName);
        loadKhuVuc();

        registerEvents();
        loadData();

        addeditpodangkynuoc.initialize();
        lichsudangkynuoc.initialize();
        xulydon.initialize();
        tuchoidon.initialize();
    }

    function registerEvents() {          

        $("#btn-create").on('click', function () {
            $('#hidInsertDonDangKyMaddk').val(1);

            $('#modal-add-edit-EditDONDANGKY').modal('show');
        });        

        $("#ddl-show-pageDONDANGKY").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            addeditpodangkynuoc.loadTableDonDangKyNuoc();
        });

        $('#ddlKhuVuc').on('change', function () {
            var corporationId = $('#ddlKhuVuc').val();
            loadPhongKhuVuc($("#ddlKhuVuc").val());
            if (corporationId !== 'PO') {
                addeditpodangkynuoc.loadTableDonDangKyNuoc();
                xulydon.loadGiaoHoSoChoPhongTo();
            }
        });

        $('#btnTimNoiDung').on('click', function () {
            addeditpodangkynuoc.loadTableDonDangKyNuoc();
        });

        $('#txtTimNoiDung').on('keypress', function (e) {
            if (e.which === 13) {
                addeditpodangkynuoc.loadTableDonDangKyNuoc();
            }
        });

        $('body').on('click', '.btn-addeditMaddk', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            $('#hidDonDangKyMaddk').val(maddk);
            $('#hidInsertDonDangKyMaddk').val(2);

            addeditpodangkynuoc.loadEditDonDangKyNuoc();
            //$('#modal-add-edit-EditDONDANGKY').modal('show');
        });

        $('body').on('click', '.btn-XuLyDonDangKy', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            $('#hidDonDangKyMaddk').val(maddk);
            xulydon.loadEditXuLyDon();
            //$('#modal-add-edit-XuLyDon').modal('show');
        });

        $('body').on('click', '.btn-TuChoiDonDangKy', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            $('#hidDonDangKyMaddk').val(maddk);
            tuchoidon.loadEditTuChoiDon();
            //$('#modal-add-edit-TuChoiDk').modal('show');
        });

        $('body').on('click', '.btn-TTDonDangKyNuoc', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            $('#hidDonDangKyMaddk').val(maddk);
            
            lichsudangkynuoc.loadTableLichSuDangKyNuoc();
            $('#modal-add-edit-LichSuDangKyNuoc').modal('show');
        });

        $('#ddlDsDieuKienTim').on('change', function () {
            var corporationId = $('#ddlKhuVuc').val();            
            if (corporationId !== 'PO') {
                addeditpodangkynuoc.loadTableDonDangKyNuoc();                
            }
        });

    } 

    function loadData() {
        var render = "<option value='%' >-- Bỏ chọn --</option> <option value='DSChuaXuLyDK' >-- D.sách chưa xử lý đăng ký --</option> ";

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

                if (userCorporationId !== "PO") {
                    $('#ddlKhuVuc').prop('disabled', true);
                    $('#ddlPhongTo').prop('disabled', true);
                }
                else {
                    $('#ddlKhuVuc').prop('disabled', false);
                    $('#ddlPhongTo').prop('disabled', false);
                }
                $("#ddlKhuVuc")[0].selectedIndex = 1;

                loadPhongKhuVuc($("#ddlKhuVuc").val());

                //addeditpodangkynuoc.loadTableDonDangKyNuoc();
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
                //$("#ddlPhongTo")[0].selectedIndex = 0;
                var phongdanhmucid = $('#hidPhongDanhMucId').val();
                $("#ddlPhongTo").val(phongdanhmucid);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    } 

    function loadPhongUserName(username) {
        $.ajax({
            type: 'GET',
            url: '/admin/podangkynuoc/PhongByUserName',
            data: {
                UserName: username
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                $('#hidPhongDanhMucId').val(response.Result.PhongBanDanhMucId);
                $('#hidPhongDanhMucMAPB').val(response.Result.MAPB);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    }
    

}