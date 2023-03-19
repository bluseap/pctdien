var podknuocntController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var nhapnghiemthu = new nhapnghiemthuController();
   
    this.initialize = function () {
        loadKhuVuc();

        registerEvents();
        loadData();
        clearData();

        nhapnghiemthu.initialize();
       
    }

    function registerEvents() {
        $('#txtBaoCaoTuNgay, #txtBaoCaoDenNgay ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        $("#btn-create").on('click', function () {
            $('#hidInsertDonDangKyMaddk').val(1);
            nhapnghiemthu.addeditClearData();
            $('#modal-add-edit-NhapNghiemThu').modal('show');
        });

        $("#ddl-show-pageDONDANGKY").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            nhapnghiemthu.loadTableNhapNghiemThuNuoc();
        });

        $('#ddlKhuVuc').on('change', function () {
            var corporationId = $('#ddlKhuVuc').val();

            loadPhongKhuVuc(corporationId);
            nhapnghiemthu.loadTableNhapNghiemThuNuoc();
            nhapnghiemthu.loadTenNhanVien(corporationId);

            //if (corporationId !== 'PO') {
            //    nhapthicong.loadTableNhapThiCongNuoc();
            //}
        });

        $('#btnTimNoiDung').on('click', function () {
            nhapnghiemthu.loadTableNhapNghiemThuNuoc();
        });

        $('#txtTimNoiDung').on('keypress', function (e) {
            if (e.which === 13) {
                nhapnghiemthu.loadTableNhapNghiemThuNuoc();
            }
        });

        $('body').on('click', '.btn-EditNhapNghiemThu', function (e) {
            e.preventDefault();
            var maddk = $(this).data('id');
            $('#hidDonDangKyMaddk').val(maddk);
            $('#hidInsertDonDangKyMaddk').val(2);
            nhapnghiemthu.loadEditNhapNghiemThu();
            //$('#modal-add-edit-NhapNghiemThu').modal('show');
        });   

        $("#btnBaoCaoDSTheoDK").on('click', function () {
            var baocaodsnhanchuyen = $("#ddlBaoCaoDanhSachNhanChuyen").val();

            if (baocaodsnhanchuyen == 'DSNhanHoSo') {
                excelDsNhanHoSo();
            }
            else if (baocaodsnhanchuyen == 'DSChuyenHoSoKeToan') {
                excelDsChuyenHoSoKeToan();
            }
        });

        //$('body').on('click', '.btn-TraNTVeTK', function (e) {
        //    e.preventDefault();
        //    var maddk = $(this).data('id');
        //    $('#hidDonDangKyMaddk').val(maddk);
        //    //travetk.loadEditTraVeThietKe();
        //    //$('#modal-add-edit-TraVeTK').modal('show');
        //});

        //$('body').on('click', '.btn-NhapNghiemThuTTDonDangKyNuoc', function (e) {
        //    e.preventDefault();
        //    var maddk = $(this).data('id');
        //    //$('#hidDonDangKyMaddk').val(maddk);
        //    //lichsudangkynuoc.loadTableLichSuDangKyNuoc();
        //    //$('#modal-add-edit-LichSuDangKyNuoc').modal('show');
        //});

    }

    function loadData() {
        var render = "<option value='%' >-- Bỏ chọn --</option> <option value='DSNhanHoSo' >-- D.sách nhận hồ sơ --</option> <option value='DSChuyenHoSoKeToan' >-- D.sách chuyển Kế toán --</option>";

        $('#ddlBaoCaoDanhSachNhanChuyen').html(render);
        $("#ddlBaoCaoDanhSachNhanChuyen")[0].selectedIndex = 0;
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
                $('#ddlNhapNTKhuVuc').html(render);                

                if (userCorporationId !== "PO") {
                    $('#ddlKhuVuc').prop('disabled', true);
                    $('#ddlNhapNTKhuVuc').prop('disabled', true);                    

                    $('#ddlPhongTo').prop('disabled', true);
                    $('#ddlNhapNTPhongTo').prop('disabled', true);
                }
                else {
                    $('#ddlKhuVuc').prop('disabled', false);
                    $('#ddlNhapTCKhuVuc').prop('disabled', false);                    

                    $('#ddlPhongTo').prop('disabled', false);
                    $('#ddlNhapNTPhongTo').prop('disabled', false);
                }
                $("#ddlKhuVuc")[0].selectedIndex = 1;
                $("#ddlNhapNTKhuVuc")[0].selectedIndex = 1;                

                let makhuvuc = $("#ddlKhuVuc").val();
                loadPhongKhuVuc(makhuvuc);
                nhapnghiemthu.loadPhongKhuVucNhapNghiemThu(makhuvuc);
                
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

    function clearData() {
        var datenow = new Date();

        $("#txtBaoCaoTuNgay").val(tedu.getFormattedDate(datenow));
        $("#txtBaoCaoDenNgay").val(tedu.getFormattedDate(datenow));
    }

    function excelDsNhanHoSo() {    
        var madondangky = $('#hidDonDangKyMaddk').val();
        var corporationid = $('#ddlKhuVuc').val();
        var tungay = tedu.getFormatDateYYMMDD($('#txtBaoCaoTuNgay').val());
        var denngay = tedu.getFormatDateYYMMDD($('#txtBaoCaoDenNgay').val());      

        $.ajax({
            type: 'POST',
            url: '/admin/podknuocnt/DSNhanHoSo',   
            data: {
                MADDK: madondangky,
                CorporationId: corporationid,
                TuNgay: tungay,
                DenNgay: denngay
            },
            //dataType: "json",
            //beforeSend: function () {
            //    tedu.startLoading();
            //},
            success: function (response) {
                nguyen.appUserLoginLogger(userName, "Xuất Excel Danh sách nhận hồ sơ.");
                window.location.href = response;                
            },
        });
    }

    function excelDsChuyenHoSoKeToan() {
        var madondangky = $('#hidDonDangKyMaddk').val();
        var corporationid = $('#ddlKhuVuc').val();
        var tungay = tedu.getFormatDateYYMMDD($('#txtBaoCaoTuNgay').val());
        var denngay = tedu.getFormatDateYYMMDD($('#txtBaoCaoDenNgay').val());

        $.ajax({
            type: 'POST',
            url: '/admin/podknuocnt/DSChuyenKT',
            data: {
                MADDK: madondangky,
                CorporationId: corporationid,
                TuNgay: tungay,
                DenNgay: denngay
            },
            //dataType: "json",
            //beforeSend: function () {
            //    tedu.startLoading();
            //},
            success: function (response) {
                nguyen.appUserLoginLogger(userName, "Xuất Excel Danh sách chuyển hồ sơ kế toán.");
                window.location.href = response;
            },
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