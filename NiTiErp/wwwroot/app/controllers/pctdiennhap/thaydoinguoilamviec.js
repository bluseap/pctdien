var thaydoinguoilamviecController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();    

    this.loadTableThayDoiNguoiLamViec = function () {
        ClearData();
        loadTableThayDoiNguoiLamViec();
    }

    this.initialize = function () {
        registerEvents();

        ClearData();
    }

    function registerEvents() {
        $('#txtThayDoiNguoiCongTacNgayDenLamViec, #txtThayDoiNguoiCongTacNgayRutKhoiLamViec ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        $('#btnSaveEditThayDoiNguoiCongTac').on('click', function () {
            var ispctdien = $('#hidInsertPCTDien').val(); // 1: insert; 2: update; 
            var isthaydoinguoilamviec = $('#hidInsertThayDoiNguoiCongTac').val(); // 1: insert; 2: update; 

            if (ispctdien == "2" && isthaydoinguoilamviec == '1') {
                saveThayDoiNguoiLamViec();
            }
            else if (ispctdien == "2" && isthaydoinguoilamviec == '2') {
                updateThayDoiNguoiLamViec();
            }
        });

        $('body').on('click', '.btn-addeditDSThayDoiNguoiCongTac', function (e) {
            e.preventDefault();
            var pctnhanviencongtacid = $(this).data('id');
            $('#hidPCTNhanVienCongTacId').val(pctnhanviencongtacid);

            loadEditThayDoiNguoiCongTac();
        });

        $('body').on('click', '.btn-deleteDSThayDoiNguoiCongTac', function (e) {
            e.preventDefault();
            var pctnhanviencongtacid = $(this).data('id');
            deletePCTNhanVienCongTac(pctnhanviencongtacid);
        });

    }

    function isFormMainValidate() {
        if ($('#frmMainEditThayDoiNguoiCongTac').valid()) {
            return true;
        }
        else {
            return false;
        }
    }
    function formMainValidate() {
        jQuery.validator.addMethod("isDanhMuc", function (value, element) {
            if (value === "%")
                return false;
            else
                return true;
        },
            "Xin chọn danh mục.."
        );

        jQuery.validator.addMethod("isDateVietNam", function (value, element) {
            return this.optional(element) || moment(value, "DD/MM/YYYY").isValid();
        },
            "Nhập theo định dạng ngày, tháng, năm."
        );

        //Init validation        
        $('#frmMainEditThayDoiNguoiCongTac').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                txtTenNhanVienThayDoiCongTac: { required: true },
                ddlTenNhanVienThayDoiCongTacBacATD: { required: true, isDanhMuc: true },  

                txtThayDoiNguoiCongTacGioDenLamViec: { required: true },
                txtThayDoiNguoiCongTacPhutDenLamViec: { required: true },
                txtThayDoiNguoiCongTacNgayDenLamViec: { required: true, isDateVietNam: true },
                txtThayDoiNguoiCongTacGioRutKhoiLamViec: { required: true },
                txtThayDoiNguoiCongTacPhutRutKhoiLamViec: { required: true },
                txtThayDoiNguoiCongTacNgayRutKhoiLamViec: { required: true, isDateVietNam: true },
            },
        });
    } 

    function ClearData() {
        var datenow = new Date();

        $("#txtTenNhanVienThayDoiCongTac").val('');
        $("#ddlTenNhanVienThayDoiCongTacBacATD")[0].selectedIndex = 0;

        $("#txtThayDoiNguoiCongTacGioDenLamViec").val(tedu.getFormattedDateGio(datenow));
        $("#txtThayDoiNguoiCongTacPhutDenLamViec").val(tedu.getFormattedDatePhut(datenow));
        $("#txtThayDoiNguoiCongTacNgayDenLamViec").val(tedu.getFormattedDate(datenow));

        $("#txtThayDoiNguoiCongTacGioRutKhoiLamViec").val(tedu.getFormattedDateGio(datenow));
        $("#txtThayDoiNguoiCongTacPhutRutKhoiLamViec").val(tedu.getFormattedDatePhut(datenow));
        $("#txtThayDoiNguoiCongTacNgayRutKhoiLamViec").val(tedu.getFormattedDate(datenow));        
    }

    function loadTableThayDoiNguoiLamViec() {
        var pctdienId = $('#hidPCTDienId').val();

        var template = $('#template-table-DSThayDoiNguoiCongTac').html();
        var render = "";

        $.ajax({
            type: 'GET',
            url: '/admin/pctdiennhap/ListNVThayDoi',
            data: {
                PCTDienId: pctdienId
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,

                            TenNhanVienCongTac: item.TenNhanVienCongTac,
                            BacATDNhanVienCongTac: item.BacATDNhanVienCongTac,

                            TuNgayDenNgay: item.TuNgayDenNgay,                          

                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                if (render !== '') {
                    $('#table-contentDSThayDoiNguoiCongTac').html(render);
                }
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function saveThayDoiNguoiLamViec() {
        var pctdienid = $('#hidPCTDienId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var nguoithaydoicongtacid = $("#hidThayDoiNguoiCongTacTenNhanVienThayDoiId").val();    

            var tennguoithaydoicongtac = $("#txtTenNhanVienThayDoiCongTac").val();
            var tennguoithaydoicongtacbacatd = $("#ddlTenNhanVienThayDoiCongTacBacATD").val();

            var giodenlamviec = $("#txtThayDoiNguoiCongTacGioDenLamViec").val();
            var phutdenlamviec = $("#txtThayDoiNguoiCongTacPhutDenLamViec").val();
            var ngaydenlamviec = tedu.getFormatDateYYMMDD($('#txtThayDoiNguoiCongTacNgayDenLamViec').val());
            var giorutkhoilamviec = $("#txtThayDoiNguoiCongTacGioRutKhoiLamViec").val();
            var phutrutkhoilamviec = $("#txtThayDoiNguoiCongTacPhutRutKhoiLamViec").val();
            var ngayrutkhoilamviec = tedu.getFormatDateYYMMDD($('#txtThayDoiNguoiCongTacNgayRutKhoiLamViec').val());                    

            $.ajax({
                type: "POST",
                url: "/Admin/pctdiennhap/SaveThayDoiLV",
                data: {
                    PCTDienId: pctdienid,

                    TenNhanVienCongTacId: nguoithaydoicongtacid,
                    TenNhanVienCongTac: tennguoithaydoicongtac,
                    BacATDNhanVienCongTac: tennguoithaydoicongtacbacatd,

                    GioDenLamViec: giodenlamviec,
                    PhutDenLamViec: phutdenlamviec,
                    NgayDenLamViec: ngaydenlamviec,
                    GioRutKhoi: giorutkhoilamviec,
                    PhutRutKhoi: phutrutkhoilamviec,
                    NgayRutKhoi: ngayrutkhoilamviec                    
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Nhân viên thay đổi công tác điện.", "error");
                    }
                    else {
                        nguyen.appUserLoginLogger(userName, "Lưu Nhân viên thay đổi công tác điện. PCTDienId: " + pctdienid);

                        tedu.notify('Lưu Nhân viên thay đổi công tác điện.', 'success');

                        loadTableThayDoiNguoiLamViec();

                        ClearData();

                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Nhân viên thay đổi công tác điện.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function updateThayDoiNguoiLamViec() {
        var pctnhanviencongtacid = $('#hidPCTNhanVienCongTacId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var nguoithaydoicongtacid = $("#hidThayDoiNguoiCongTacTenNhanVienThayDoiId").val();

            var tennguoithaydoicongtac = $("#txtTenNhanVienThayDoiCongTac").val();
            var tennguoithaydoicongtacbacatd = $("#ddlTenNhanVienThayDoiCongTacBacATD").val();

            var giodenlamviec = $("#txtThayDoiNguoiCongTacGioDenLamViec").val();
            var phutdenlamviec = $("#txtThayDoiNguoiCongTacPhutDenLamViec").val();
            var ngaydenlamviec = tedu.getFormatDateYYMMDD($('#txtThayDoiNguoiCongTacNgayDenLamViec').val());
            var giorutkhoilamviec = $("#txtThayDoiNguoiCongTacGioRutKhoiLamViec").val();
            var phutrutkhoilamviec = $("#txtThayDoiNguoiCongTacPhutRutKhoiLamViec").val();
            var ngayrutkhoilamviec = tedu.getFormatDateYYMMDD($('#txtThayDoiNguoiCongTacNgayRutKhoiLamViec').val());

            $.ajax({
                type: "POST",
                url: "/Admin/pctdiennhap/UpdateThayDoiLV",
                data: {
                    Id: pctnhanviencongtacid,

                    TenNhanVienCongTacId: nguoithaydoicongtacid,
                    TenNhanVienCongTac: tennguoithaydoicongtac,
                    BacATDNhanVienCongTac: tennguoithaydoicongtacbacatd,

                    GioDenLamViec: giodenlamviec,
                    PhutDenLamViec: phutdenlamviec,
                    NgayDenLamViec: ngaydenlamviec,
                    GioRutKhoi: giorutkhoilamviec,
                    PhutRutKhoi: phutrutkhoilamviec,
                    NgayRutKhoi: ngayrutkhoilamviec
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Sửa Nhân viên thay đổi công tác điện.", "error");
                    }
                    else {
                        nguyen.appUserLoginLogger(userName, "Lưu Sửa Nhân viên thay đổi công tác điện. Id: " + pctnhanviencongtacid);

                        tedu.notify('Lưu Sửa Nhân viên thay đổi công tác điện.', 'success');

                        $('#hidInsertThayDoiNguoiCongTac').val(1);

                        loadTableThayDoiNguoiLamViec();

                        ClearData();

                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Sửa Nhân viên thay đổi công tác điện.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function loadEditThayDoiNguoiCongTac() {
        var pctnhanviencongtacId = $('#hidPCTNhanVienCongTacId').val();
        var datenow = new Date();

        $.ajax({
            type: "GET",
            url: "/Admin/pctdiennhap/GetNVCongTac",
            data: {
                PCTNhanVienCongTacId: pctnhanviencongtacId
            },
            dataType: "json",

            success: function (response) {
                var pctnhanviencongtac = response.Result;

                ClearData();

                $('#hidInsertThayDoiNguoiCongTac').val(2);

                $("#hidThayDoiNguoiCongTacTenNhanVienThayDoiId").val(pctnhanviencongtac.TenNhanVienCongTacId);      

                $("#txtTenNhanVienThayDoiCongTac").val(pctnhanviencongtac.TenNhanVienCongTac);
                $("#ddlTenNhanVienThayDoiCongTacBacATD").val(pctnhanviencongtac.BacATDNhanVienCongTac);

                $("#txtThayDoiNguoiCongTacGioDenLamViec").val(pctnhanviencongtac.GioDenLamViec != null ? pctnhanviencongtac.GioDenLamViec : tedu.getFormattedDateGio(datenow));
                $("#txtThayDoiNguoiCongTacPhutDenLamViec").val(pctnhanviencongtac.PhutDenLamViec != null ? pctnhanviencongtac.PhutDenLamViec : tedu.getFormattedDateGio(datenow));
                $("#txtThayDoiNguoiCongTacNgayDenLamViec").val(pctnhanviencongtac.NgayDenLamViec !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(pctnhanviencongtac.NgayDenLamViec) : tedu.getFormattedDate(datenow));

                $("#txtThayDoiNguoiCongTacGioRutKhoiLamViec").val(pctnhanviencongtac.GioRutKhoi != null ? pctnhanviencongtac.GioRutKhoi : tedu.getFormattedDateGio(datenow));
                $("#txtThayDoiNguoiCongTacPhutRutKhoiLamViec").val(pctnhanviencongtac.PhutRutKhoi != null ? pctnhanviencongtac.PhutRutKhoi : tedu.getFormattedDateGio(datenow));
                $("#txtThayDoiNguoiCongTacNgayRutKhoiLamViec").val(pctnhanviencongtac.NgayRutKhoi !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(pctnhanviencongtac.NgayRutKhoi) : tedu.getFormattedDate(datenow));
                                
                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function deletePCTNhanVienCongTac(pctnhanviencongtacid2) {
        tedu.confirm('Bạn có chắc chắn xóa Nhân viên công tác này?', function () {
            $.ajax({
                type: "POST",
                url: "/Admin/pctdiennhap/DelNVCongTac",
                data: {
                    pctnhanviencongtacId: pctnhanviencongtacid2
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Xóa PCT Nhân viên công tác thay đổi.", "error");
                    }
                    else {
                        nguyen.appUserLoginLogger(userName, "Xóa PCT Nhân viên công tác thay đổi. Id: " + pctnhanviencongtacid2);

                        tedu.notify('Xóa PCT Nhân viên công tác thay đổi.', 'success');

                        loadTableThayDoiNguoiLamViec();

                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Xóa PCT Nhân viên công tác thay đổi.', 'error');
                    tedu.stopLoading();
                }
            });
        });
    }

}