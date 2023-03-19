var hshosoController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var addedithshoso = new addedithshosoController();
    var filebohoso = new filebohosoController();
    var muontrahs = new muontrahsController();
    var trahoso = new trahsController();
    var chitiettrongbohoso = new chitiettrongbohosoController();

    this.initialize = function () {
        loadKhuVuc();

        registerEvents();

        addedithshoso.initialize();
        filebohoso.initialize();
        muontrahs.initialize();
        trahoso.initialize();
        chitiettrongbohoso.initialize();
    }

    function registerEvents() {

        $("#btn-create").on('click', function (e) {
            e.preventDefault();

            addedithshoso.addeditClearData();
            addedithshoso.loadDataKeTuBao();
            addedithshoso.loadDataNhomHoSo();
            $('#hidHsBoHoSoId').val(0);
            $('#hidInsertHsBoHoSoId').val(1);  // 1: insert; 2: update
            $('#modal-add-edit-HsBoHoSo').modal('show');
        });

        $('body').on('click', '.btn-addeditNhapBoHoSoVaoKe', function (e) {
            e.preventDefault();
            var hsbohosoid = $(this).data('id');

            addedithshoso.loadEditHsBoHoSo(hsbohosoid);
            $('#modal-add-edit-HsBoHoSo').modal('show');
        });

        $("#ddl-show-pageNhapBoHoSoVaoKe").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            addedithshoso.loadTableHsBoHoSo(true);
        });

        $('#ddlKhuVuc').on('change', function () {
            var corporationId = $('#ddlKhuVuc').val();

            loadPhongKhuVuc(corporationId);

            addedithshoso.loadTableHsBoHoSo(true);
            addedithshoso.loadDataKeTuBao();
            addedithshoso.loadDataNhomHoSo();

            tedu.notify('Danh mục phòng theo khu vực.', 'success');
        });

        $('#btnTimNoiDung').on('click', function () {
            addedithshoso.loadTableHsBoHoSo(true);
        });

        $('#txtTimNoiDung').on('keypress', function (e) {
            if (e.which === 13) {
                addedithshoso.loadTableHsBoHoSo(true);
            }
        });

        $('body').on('click', '.btn-FileHoSo', function (e) {
            e.preventDefault();
            var hsbohosoid = $(this).data('id');

            $('#hidHsBoHoSoId').val(hsbohosoid);
            $('#hidInsertHsBoHoSoId').val(2);

            $('#hidInsertHsBoHoSoFileId').val(1);

            filebohoso.loadTableHsBoHoSoFile(hsbohosoid);
            filebohoso.loadNewGuid();
            $('#modal-add-edit-FileBoHoSo').modal('show');
        });

        $('body').on('click', '.btn-ChoMuonFileHoSo', function (e) {
            e.preventDefault();
            var hsbohosoid = $(this).data('id');

            $('#hidHsBoHoSoId').val(hsbohosoid);
            $('#hidInsertHsBoHoSoId').val(2);

            $('#hidInsertHsChuyenBoHoSoMuonTraId').val(1);

            muontrahs.loadTableMuonTraHoSo(hsbohosoid);
            
            $('#modal-add-edit-MuonTraHoSo').modal('show');
        });

        $('body').on('click', '.btn-ChiTietTrongBoHoSo', function (e) {
            e.preventDefault();
            var hsbohosoid = $(this).data('id');

            $('#hidHsBoHoSoId').val(hsbohosoid);
            $('#hidInsertHsBoHoSoId').val(2);            

            $('#tblContentChiTietBoHoSo').html('');
            chitiettrongbohoso.loadTableChiTietBoHoSo();

            $('#modal-add-edit-ChiTietTrongBoHoSo').modal('show');
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
                    if (userName == "admin" || userName == "lenguyen") {
                        $('#ddlKhuVuc').prop('disabled', true);
                        $('#ddlAddEditKhuVuc').prop('disabled', true);

                        $('#ddlPhongNhaphoSo').prop('disabled', true);                        
                    }
                    else {
                        $('#ddlKhuVuc').prop('disabled', false);
                        $('#ddlAddEditKhuVuc').prop('disabled', false);

                        $('#ddlPhongNhaphoSo').prop('disabled', false);  
                    }
                }
                else {
                    $('#ddlKhuVuc').prop('disabled', false);
                    $('#ddlAddEditKhuVuc').prop('disabled', false);

                    $('#ddlPhongNhaphoSo').prop('disabled', false);  
                }

                $("#ddlKhuVuc")[0].selectedIndex = 1;                

                loadPhongKhuVuc($("#ddlKhuVuc").val());

                addedithshoso.loadTableHsBoHoSo(true);

                //addedithskebao.loadAddEditPhongKhuVuc($("#ddlAddEditKhuVuc").val());                
                //chuyendi.loadChuyenDiPhongBan();
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

                $('#ddlPhongNhaphoSo').html(render);
                $('#ddlAddEditPhongNhaphoSo').html(render);

                loadPhongBanByUserName(userName);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    }

    function loadPhongBanByUserName(userName) {
        $.ajax({
            type: 'GET',
            url: '/admin/hskebao/getHoSonv',
            data: { username: userName },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var hosonhanvien = response.Result;

                $('#ddlPhongNhaphoSo').val(hosonhanvien.PhongBanDanhMucId);

                $('#ddlAddEditPhongNhaphoSo').val(hosonhanvien.PhongBanDanhMucId);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    }


}