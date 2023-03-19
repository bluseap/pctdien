var pokhachhangnuocController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var addeditpokhachhangnuoc = new addeditpokhachhangnuocController();    

    this.initialize = function () {
        loadKhuVuc();
        loadData();

        registerEvents();

        clearData();

        addeditpokhachhangnuoc.initialize();        
    }

    function registerEvents() {
        $('#txtKHNuocTuNgay, #txtKHNuocDenNgay').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        $('#ckKHNuocChonTheoNgay').on('click', function () {
            var ckTheoNgay = document.getElementById('ckKHNuocChonTheoNgay');
            if (ckTheoNgay.checked) {
                $('#txtKHNuocTuNgay').prop('disabled', false);
                $('#txtKHNuocDenNgay').prop('disabled', false);
            }
            else {
                $('#txtKHNuocTuNgay').prop('disabled', true);
                $('#txtKHNuocDenNgay').prop('disabled', true);
            }
        });

        $("#btn-create").on('click', function () {
            $('#hidInsertUpdateKhachHangNuocId').val(1);

            var chuTimKhachHangKhaiThacMoi = document.getElementById("divbtnTimKhachHangKhaiThacMoi");
            chuTimKhachHangKhaiThacMoi.style.display = "block";

            $('#modal-add-edit-EditKhachHangNuoc').modal('show');            
        });

        $('body').on('click', '.btn-addeditKhachHangId', function (e) {
            e.preventDefault();
            var khachhangnuocid = $(this).data('id');
            $('#hidKhachHangNuocId').val(khachhangnuocid);
            // 2 - Update Order
            $('#hidInsertUpdateKhachHangNuocId').val(2);

            var chuTimKhachHangKhaiThacMoi = document.getElementById("divbtnTimKhachHangKhaiThacMoi");
            chuTimKhachHangKhaiThacMoi.style.display = "none";

            $('#modal-add-edit-EditKhachHangNuoc').modal('show');            
            addeditpokhachhangnuoc.loadEditKhachHangNuoc();
        });

        $('#ddlKhuVuc').on('change', function () {
            var corporationId = $('#ddlKhuVuc').val();

            if (corporationId !== 'PO') {
                addeditpokhachhangnuoc.loadTableKhachHangNuoc();
                addeditpokhachhangnuoc.loadDotIn();
            }
        });  

        $("#btnTimNoiDung").on('click', function () {
            addeditpokhachhangnuoc.loadTableKhachHangNuoc();
        });

        $('#txtTimNoiDung').on('keypress', function (e) {
            if (e.which === 13) {
                addeditpokhachhangnuoc.loadTableKhachHangNuoc();
            }
        });

        $('#btnKHNuocBaoCaoTheo').on('keypress', function (e) {
            tedu.notify('bao cao kh nuoc theo', 'success');
            //danhsachBaoCaoKhachHangNuoc();
        });

        
    }

    function loadData() {
        loadDataDanhSachTheo();
    }

    function loadDataDanhSachTheo() {
        var render = "<option value='0' >-- Bỏ chọn --</option>";
        render += "<option value='KHMOI' >-- D.sách Khách hàng mới --</option>";
        render += "<option value='TDCT' >-- D.sách Thay đổi chi tiết --</option>";
        render += "<option value='THDH' >-- D.sách Thay đồng hồ --</option>";
        render += "<option value='DCBN' >-- D.sách Điều chỉnh biên nhận --</option>";
        render += "<option value='KHXOA' >-- Khách hàng xóa bộ --</option>";

        $('#ddlKHNuocBaoCaoTheo').html(render);
    }

    function clearData() {
        var datenow = new Date();
        $('#txtKHNuocTuNgay').val(tedu.getFormattedDate(datenow));
        $('#txtKHNuocDenNgay').val(tedu.getFormattedDate(datenow));

        $('#txtKHNuocTuNgay').prop('disabled', false);
        $('#txtKHNuocDenNgay').prop('disabled', false);
        var ckTheoNgay = document.getElementById('ckKHNuocChonTheoNgay');
        ckTheoNgay.checked = true;
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
                
                addeditpokhachhangnuoc.loadTableKhachHangNuoc();
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

}