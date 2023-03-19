var hskebaoController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var addedithskebao = new addedithskebaoController();  
    var chuyendi = new chuyendiController();   

    this.initialize = function () {
        loadKhuVuc();

        registerEvents();

        addedithskebao.initialize();        
        chuyendi.initialize();         
    }

    function registerEvents() {

        $("#btn-create").on('click', function (e) {
            e.preventDefault();

            addedithskebao.addeditClearData();

            $('#hidHsKeTuBaoId').val(0);
            $('#hidInsertHsKeTuBaoId').val(1);  // 1: insert; 2: update

            $('#modal-add-edit-HsKeTuBao').modal('show');
        });

        $('body').on('click', '.btn-addeditNhapKeTuBao', function (e) {
            e.preventDefault();
            var hsketubaoid = $(this).data('id');            

            addedithskebao.loadEditHsKeTuBao(hsketubaoid);
            $('#modal-add-edit-HsKeTuBao').modal('show');
        });

        $("#ddl-show-pageNhapKeBaoTu").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            addedithskebao.loadTableHsKeTuBao(true);
        });             

        $('#ddlKhuVuc').on('change', function () {
            var corporationId = $('#ddlKhuVuc').val();
            
            loadPhongKhuVuc(corporationId);            

            addedithskebao.loadTableHsKeTuBao(true);

            tedu.notify('Danh mục phòng theo khu vực.', 'success');
        });

        $('#btnTimNoiDung').on('click', function () {
            addedithskebao.loadTableHsKeTuBao(true);
        });

        $('#txtTimNoiDung').on('keypress', function (e) {
            if (e.which === 13) {
                addedithskebao.loadTableHsKeTuBao(true);
            }
        });

        $('body').on('click', '.btn-ChuyenKeTuBao', function (e) {
            e.preventDefault();
            var hsketubaoid = $(this).data('id');

            $('#hidHsKeTuBaoId').val(hsketubaoid);

            $('#hidInsertChuyenDiHsKeTuBaoId').val(1); 

            chuyendi.loadTableChuyenKeTuDi();
            $('#modal-add-edit-ChuyenDi').modal('show');
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
                $('#ddlAddEditKhuVuc').html(render);  

                $('#ddlChuyenDiKhuVuc').html(render);           
                $('#ddlChuyenDiKhuVucMoi').html(render);           

                if (userCorporationId !== "PO") {                    
                    if (userName == "admin" || userName == "lenguyen") {
                        $('#ddlKhuVuc').prop('disabled', true);
                        $('#ddlAddEditKhuVuc').prop('disabled', true);       

                        $('#ddlPhongTo').prop('disabled', true);       
                        $('#ddlAddEditPhongTo').prop('disabled', true);   

                        $('#ddlChuyenDiKhuVuc').prop('disabled', true);  
                        $('#ddlChuyenDiPhongTo').prop('disabled', true);  
                        $('#ddlChuyenDiKhuVucMoi').prop('disabled', true);  
                        $('#ddlChuyenDiPhongToMoi').prop('disabled', true);  
                    }
                    else {
                        $('#ddlKhuVuc').prop('disabled', false);
                        $('#ddlAddEditKhuVuc').prop('disabled', false);       

                        //$('#ddlPhongTo').prop('disabled', false);    
                        //$('#ddlAddEditPhongTo').prop('disabled', false);      

                        $('#ddlChuyenDiKhuVuc').prop('disabled', false);
                        $('#ddlChuyenDiPhongTo').prop('disabled', false);
                        $('#ddlChuyenDiKhuVucMoi').prop('disabled', false);
                        $('#ddlChuyenDiPhongToMoi').prop('disabled', false);  
                    }                    
                }
                else {
                    $('#ddlKhuVuc').prop('disabled', false);
                    $('#ddlAddEditKhuVuc').prop('disabled', false);      

                    //$('#ddlPhongTo').prop('disabled', false);
                    //$('#ddlAddEditPhongTo').prop('disabled', false);      

                    $('#ddlChuyenDiKhuVuc').prop('disabled', false);
                    $('#ddlChuyenDiPhongTo').prop('disabled', false);
                    $('#ddlChuyenDiKhuVucMoi').prop('disabled', false);
                    $('#ddlChuyenDiPhongToMoi').prop('disabled', false);  
                }

                $("#ddlKhuVuc")[0].selectedIndex = 1;
                $("#ddlAddEditKhuVuc")[0].selectedIndex = 1;    

                $("#ddlChuyenDiKhuVuc")[0].selectedIndex = 0;    
                $("#ddlChuyenDiKhuVucMoi")[0].selectedIndex = 0;    

                loadPhongKhuVuc($("#ddlKhuVuc").val());
                addedithskebao.loadAddEditPhongKhuVuc($("#ddlAddEditKhuVuc").val());

                addedithskebao.loadTableHsKeTuBao(true);

                chuyendi.loadChuyenDiPhongBan();
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

                $('#ddlPhongTo').val(hosonhanvien.PhongBanDanhMucId);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    }
  

}