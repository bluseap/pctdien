var xulydonController = function () {

    var userName = $("#hidUserName").val();

    this.loadEditXuLyDon = function () {
        loadEditXuLyDon();
    }

    this.loadGiaoHoSoChoPhongTo = function () {
        loadGiaoHoSoChoPhongTo();   
    }
    
    this.initialize = function () {        
        registerEvents();
        clearData();
    }

    function registerEvents() {       
        $('#txtNgayDuyetDon').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        $('#btnSaveXuLyDon').on('click', function () {
            saveXuLyDon();
        });

    }

    function clearData() {
        var datenow = new Date();        

        $("#txtNgayDuyetDon").val(tedu.getFormattedDate(datenow));
        $("#txtNhanVienDuyetDon").val('');
        $("#ddlGiaoHoSoThietKeCho")[0].selectedIndex = 0;         
        $("#txtGhiChuXuLyDon").val('');
    }

    function loadGiaoHoSoChoPhongTo() {
        var corporationid = $("#ddlKhuVuc").val();
        return $.ajax({
            type: 'GET',
            url: '/podangkynuoc/ListPhong',
            data: {
                corporationId: corporationid
            },
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >--- Chọn Phòng ---</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenPhong + "</option>";
                });
                $('#ddlGiaoHoSoThietKeCho').html(render);
                $("#ddlGiaoHoSoThietKeCho")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục Huyện / Thành Phố.', 'error');
            }
        });

    }

    function isFormMainValidate() {
        if ($('#frmMainXuLyDon').valid()) {
            return true;
        }
        else {
            return false;
        }
    }
    function formMainValidate() {
        jQuery.validator.addMethod("isDanhMuc", function (value, element) {
            if (value === "0")
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
        $('#frmMainXuLyDon').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {                
                txtNgayDuyetDon: { required: true, isDateVietNam: true },
                ddlGiaoHoSoThietKeCho: { required: true, isDanhMuc: true },
            },
        });
    }

    function loadEditXuLyDon() {
        var madondangky = $("#hidDonDangKyMaddk").val();

        $.ajax({
            type: "GET",
            url: "/Admin/podangkynuoc/GetDKNuocId",
            data: {
                DangKyNuocId: madondangky
            },
            dataType: "json",

            success: function (response) {
                var dangkynuoc = response;

                clearData();

                $("#txtNgayDuyetDon").val(dangkynuoc.NGAYDUYETHS !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(dangkynuoc.NGAYDUYETHS) : '');
                //$("#txtNhanVienDuyetDon").val('');
                $("#ddlGiaoHoSoThietKeCho").val(dangkynuoc.MaPhongBanDuyetQuyen);
                $("#txtGhiChuXuLyDon").val(dangkynuoc.NOIDUNG);                

                $('#modal-add-edit-XuLyDon').modal('show');

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function saveXuLyDon() {
        var madondangky = $('#hidDonDangKyMaddk').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var ngayduyetdon = tedu.getFormatDateYYMMDD($('#txtNgayDuyetDon').val());
            var giaohosocho = $("#ddlGiaoHoSoThietKeCho").val();
            var ghichuxuly = $("#txtGhiChuXuLyDon").val();

            $.ajax({
                type: "POST",
                url: "/Admin/podangkynuoc/UpXuLy",
                data: {
                    MADDK: madondangky,

                    NGAYDUYETHS: ngayduyetdon,
                    MaPhongBanDuyetQuyen: giaohosocho,
                    NOIDUNG: ghichuxuly
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Sửa Xử lý đơn đăng ký.", "error");
                    }
                    else {
                        nguyen.appUserLoginLogger(userName, "Sửa Xử lý đơn đăng ký nước." + madondangky);

                        tedu.notify('Sửa Xử lý đơn đăng ký.', 'success');

                        clearData();

                        $('#modal-add-edit-XuLyDon').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Sửa Xử lý đơn đăng ký.', 'error');
                    tedu.stopLoading();
                }
            });
        }        
    }
    

}