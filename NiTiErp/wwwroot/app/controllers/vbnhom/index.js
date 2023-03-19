var nhomxlController = function () {   

    var userCorporationId = $("#hidUserCorporationId").val();

    var addeditnhomxl = new addeditnhomxlController();
    var addnhanvien = new addnhanviennhomxlController();

    this.initialize = function () {
        loadKhuVuc();

        registerEvents();

        addeditnhomxl.initialize();
        addnhanvien.initialize();        
    }

    function registerEvents() {

        $("#btn-create").on('click', function (e) {
            e.preventDefault();

            $('#hidVanBanNhomXuLyId').val(0);
            $('#hidInsertVanBanNhomXuLy').val(1);  // 1: insert; 2: update               

            $('#modal-add-edit-NhomXuLyVanBan').modal('show');
        });

        $('body').on('click', '.btn-addeditNhomXuLyVB', function (e) {
            e.preventDefault();
            var nhomxulyid = $(this).data('id');
           
            addeditnhomxl.loadAddEditNhomXuLy(nhomxulyid);
            $('#modal-add-edit-NhomXuLyVanBan').modal('show');
        });

        $('body').on('click', '.btn-addNhanVienToNhom', function (e) {
            e.preventDefault();
            var nhomxulyid = $(this).data('id');            

            $('#hidVanBanNhomXuLyId').val(nhomxulyid);

            $('#hidInsertVanBanNhomNhanVien').val(1);

            addnhanvien.loadNhomNhanVien();

            $('#modal-add-edit-AddNhanVien').modal('show');
        });

        $("#ddl-show-pageNhomXuLyVB").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            addeditnhomxl.loadTableNhomXuLy(true);
        }); 

        $('#ddlKhuVuc').on('change', function () {            
            addeditnhomxl.loadTableNhomXuLy(true);            
        });

        $('#btnTimNoiDung').on('click', function () {
            addeditnhomxl.loadTableNhomXuLy(true);       
        });

        $('#txtTimNoiDung').on('keypress', function (e) {
            if (e.which === 13) {
                addeditnhomxl.loadTableNhomXuLy(true);
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
                $('#ddlAddEditKhuVuc').html(render);    

                if (userCorporationId !== "PO") {
                    $('#ddlKhuVuc').prop('disabled', true);   
                    $('#ddlAddEditKhuVuc').prop('disabled', true);
                }
                else {
                    $('#ddlKhuVuc').prop('disabled', false);  
                    $('#ddlAddEditKhuVuc').prop('disabled', false);  
                }
                $("#ddlKhuVuc")[0].selectedIndex = 1;
                $("#ddlAddEditKhuVuc")[0].selectedIndex = 1;       

                addeditnhomxl.loadTableNhomXuLy(true);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

}