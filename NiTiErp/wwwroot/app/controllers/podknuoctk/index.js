var podknuoctkController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();
    
    var nhapthietke = new nhapthietkeController();
    var duyetthietke = new duyettkController();
    var tuchoithietke = new tuchoitkController();
    var bocvattu = new bocvattuController();
    var themmoivattu = new themmoivattuController();
    
    this.initialize = function () {
        loadPhongUserName(userName);
        loadKhuVuc();

        registerEvents();
        loadData();
        
        nhapthietke.initialize();
        duyetthietke.initialize();
        tuchoithietke.initialize();
        bocvattu.initialize();
        themmoivattu.initialize();
        
    }   

    function registerEvents() {

        $("#btn-create").on('click', function () {
            $('#hidInsertDonDangKyMaddk').val(1);
            nhapthietke.addeditClearData();
            $('#modal-add-edit-NhapThietKe').modal('show');
        });

        $("#ddl-show-pageDONDANGKY").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            nhapthietke.loadTableNhapThietKeNuoc();
        });

        $('#ddlKhuVuc').on('change', function () {
            var corporationId = $('#ddlKhuVuc').val();

            loadPhongKhuVuc(corporationId);
            nhapthietke.PhuongXa(corporationId);    
            nhapthietke.DuongPhoLX(corporationId);    
            nhapthietke.loadTenNhanVien(corporationId);

            bocvattu.loadMauBocVatTuNuoc(corporationId);
            bocvattu.loadMauThietKe(corporationId);
            themmoivattu.DanhMucKhoVatTu(corporationId);
            
            if (corporationId !== 'PO') {
                nhapthietke.loadTableNhapThietKeNuoc();     
            }
        });

        $('#btnTimNoiDung').on('click', function () {
            nhapthietke.loadTableNhapThietKeNuoc();  
        });

        $('#txtTimNoiDung').on('keypress', function (e) {
            if (e.which === 13) {
                nhapthietke.loadTableNhapThietKeNuoc();  
            }
        });        

        $('body').on('click', '.btn-EditNhapThietKe', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            $('#hidDonDangKyMaddk').val(maddk);
            $('#hidInsertDonDangKyMaddk').val(2);           
            nhapthietke.loadEditNhapThietKe(); 
            //$('#modal-add-edit-NhapThietKe').modal('show');
        });

        $('body').on('click', '.btn-BocVatTuTK', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            $('#hidDonDangKyMaddk').val(maddk);            
            bocvattu.loadTableBocVatTu();
            bocvattu.loadTableBocVatTuLoaiChiPhiVCDL(); 
            bocvattu.loadEditBocVatTuSoDoThietKe();
            //$('#modal-add-edit-BocVatTu').modal('show');
        });

        $('body').on('click', '.btn-TuChoiTK', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            $('#hidDonDangKyMaddk').val(maddk);
            tuchoithietke.loadEditTuChoiThietKe();
            //$('#modal-add-edit-TuChoiTK').modal('show');
        });

        $('body').on('click', '.btn-DuyetTK', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            $('#hidDonDangKyMaddk').val(maddk);
            duyetthietke.loadEditDuyetThietKe();
            //$('#modal-add-edit-DuyetTK').modal('show');
        });

        $('body').on('click', '.btn-InTK', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            $('#hidDonDangKyMaddk').val(maddk);
            inThietKe();
        });

        $('body').on('click', '.btn-NhapThietKeTTDonDangKyNuoc', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            $('#hidDonDangKyMaddk').val(maddk);
            //lichsudangkynuoc.loadTableLichSuDangKyNuoc();
            //$('#modal-add-edit-LichSuDangKyNuoc').modal('show');
        });

        $('#ddlDsDieuKienTim').on('change', function () {
            var corporationId = $('#ddlKhuVuc').val();     
            if (corporationId !== 'PO') {
                nhapthietke.loadTableNhapThietKeNuoc();
            }
        });

    }

    function loadData() {
        var render = "<option value='%' >-- Bỏ chọn --</option> <option value='DSChuaDuyetTK' >-- D.sách chưa duyệt th.kế --</option> ";

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
                $('#ddlNhapTKKhuVuc').html(render);

                if (userCorporationId !== "PO") {
                    $('#ddlKhuVuc').prop('disabled', true);
                    $('#ddlNhapTKKhuVuc').prop('disabled', true);

                    $('#ddlPhongTo').prop('disabled', true);
                    $('#ddlNhapTKPhongTo').prop('disabled', true);
                }
                else {
                    $('#ddlKhuVuc').prop('disabled', false);
                    $('#ddlNhapTKKhuVuc').prop('disabled', false);

                    $('#ddlPhongTo').prop('disabled', false);
                    $('#ddlNhapTKPhongTo').prop('disabled', false);
                }
                $("#ddlKhuVuc")[0].selectedIndex = 1;
                $("#ddlNhapTKKhuVuc")[0].selectedIndex = 1;

                let makhuvuc = $("#ddlKhuVuc").val();
                loadPhongKhuVuc(makhuvuc);
                nhapthietke.loadPhongKhuVucNhapThietKe(makhuvuc);
                nhapthietke.PhuongXa(makhuvuc);    
                nhapthietke.DuongPhoLX(makhuvuc);    
                nhapthietke.loadTenNhanVien(makhuvuc);    
                themmoivattu.DanhMucKhoVatTu(makhuvuc);
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

    function inThietKe() {
        var maddk = $('#hidDonDangKyMaddk').val();

        $.ajax({
            type: 'GET',
            url: '/admin/podknuoctk/InTKNuoc',
            data: {
                MADDK: maddk
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                nguyen.appUserLoginLogger(userName, "In Thiết kế nước.");

                if (response.length !== 0) {
                    window.open('/Admin/RpInThietKeNuoc/Index', '_blank');
                }
                else {
                    window.open('/Admin/RpInThietKeNuoc/Index', '_blank');
                }
                tedu.stopLoading();
            },
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