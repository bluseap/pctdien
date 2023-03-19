
var nhapsonodonghoController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    this.loadEditNhapSoNoDongHo = function () {
        loadEditNhapSoNoDongHo();
    }    

    this.initialize = function () {
        registerEvents();
        addeditClearData();
        loadDataAddEdit();
    }

    function registerEvents() {

        $('#txtNhapNoNgayGiao, #txtNhapNoNgayGan, #txtNhapNoNgayCapNhat ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();        

        $('#btnNhapNoDongHoTim').on('click', function () {
            loadTableSoNoChuaSuDung();
        });

        $('body').on('click', '.btn-EditSoNoDongHoChuaSuDung', function (e) {
            e.preventDefault();
            var madh = $(this).data('id');
            
            $('#hidDongHoMaDongHoId').val(madh);
            loadEditDataDongHo();
        });

        $('#btnSaveNhapNoDH').on('click', function () {
            var isdondangky = $('#hidInsertDonDangKyMaddk').val(); // 1: insert; 2: update; 

            if (isdondangky == "1") {
                saveSoNoDongHo();
            } else if (isdondangky == "2") {
                updateSoNoDongHo();
            }
        });

    }

    function addeditClearData() {
        var datenow = new Date();

        $("#txtNhapNoMaDonDangKyKH").val('');
        $("#txtNhapNoTenKhachHangKH").val('');
        $("#txtNhapNoDiaChiLD").val('');
        
        $("#txtNhapNoNgayGiao").val(tedu.getFormattedDate(datenow));
        $("#txtNhapNoNgayGan").val(tedu.getFormattedDate(datenow));
        $("#txtNhapNoNgayCapNhat").val(tedu.getFormattedDate(datenow));

        $("#txtNhapNoSoNoDongHo").val('');
        $("#txtNhapNoChiSoKhiLapDongHo").val(0);
        var ckQuyetToan = document.getElementById('ckCoLapQuyetToan');
        ckQuyetToan.checked = false;

        $("#txtNhapNoMaSoChiKiemDinhMat1").val('');
        $("#txtNhapNoMaSoChiKiemDinhMat2").val('');
        $("#ddlXacDinhHoaDonKhachHangKeBen")[0].selectedIndex = 0;  
        $("#txtLyDoTraHoSoVeThietKe").val('');
    }

    function loadDataAddEdit() {
        loadDataXacDinhKHKeBen();    

        $('#txtNhapNoSoNoDongHo').prop('disabled', true);
    }

    function loadDataXacDinhKHKeBen() {
        var render = "<option value='KHONG01' >-- Không biết --</option> <option value='CUNGBEN' >-- Cùng bên KH đăng ký --</option> <option value='DOIDIEN' >-- Đối diện KH đăng ký --</option> ";

        $('#ddlXacDinhHoaDonKhachHangKeBen').html(render);
        $("#ddlXacDinhHoaDonKhachHangKeBen")[0].selectedIndex = 0;
    }

    function isFormMainValidate() {
        if ($('#frmMainNhapSoNoDongHo').valid()) {
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
        $('#frmMainNhapSoNoDongHo').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                txtNhapNoNgayGiao: {
                    required: true,
                    isDateVietNam: true
                },
                txtNhapNoNgayGan: {
                    required: true,
                    isDateVietNam: true
                },
                txtNhapNoNgayCapNhat: {
                    required: true,
                    isDanhMuc: true
                },

                txtNhapNoSoNoDongHo: {
                    required: true,                    
                },
                txtNhapNoMaSoChiKiemDinhMat1: {
                    required: true,
                },
                txtNhapNoMaSoChiKiemDinhMat2: {
                    required: true,
                },
                
            },
            //messages: {
            //    txtTrichYeu: { required: "Nhập nội dung trích yếu của văn bản.." }
            //}
        });
    }          

    function loadTableSoNoChuaSuDung() {
        var template = $('#template-table-NhapSoNoDongHo').html();
        var render = "";

        var khuvuc = $('#ddlKhuVuc').val();        
        var timsono = $('#txtNhapNoDongHo').val();

        $.ajax({
            type: 'GET',
            url: '/admin/PoDKNuocTC/SoNoDH',
            data: {
                KhuVuc: khuvuc,                
                keyword: timsono,
                page: tedu.configs.pageIndex,
                pageSize: tedu.configs.pageSize
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.Results.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result.Results, function (i, item) {
                        render += Mustache.render(template, {
                            MADH: item.MADH,

                            SONO: item.SONO,
                            MALDH: item.MALDH,
                            CONGSUAT: item.CONGSUAT,
                            DaSuDung: item.DaSuDung                            
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }                

                if (render !== '') {
                    $('#table-contentNhapSoNoDongHo').html(render);
                }
                
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function loadEditNhapSoNoDongHo() {
        var madondangky = $("#hidDonDangKyMaddk").val();

        $.ajax({
            type: "GET",
            url: "/Admin/PoDkNuocTC/GetTCNuocId",
            data: {
                DangKyNuocId: madondangky
            },
            dataType: "json",

            success: function (response) {
                var thicong = response;

                if (thicong.TTTC == 'TC_P') {
                    addeditClearData();

                    $("#txtNhapNoMaDonDangKyKH").val(thicong.MADDK);
                    $("#txtNhapNoTenKhachHangKH").val(thicong.TENKH);
                    $("#txtNhapNoDiaChiLD").val(thicong.SONHA);

                    $("#txtNhapNoNgayGiao").val(tedu.getFormattedDate(thicong.NGAYGTC));
                }
                else {
                    $('#hidInsertDonDangKyMaddk').val(2);

                    $("#txtNhapNoMaDonDangKyKH").val(thicong.MADDK);
                    $("#txtNhapNoTenKhachHangKH").val(thicong.TENKH);
                    $("#txtNhapNoDiaChiLD").val(thicong.SONHA);                    

                    $("#txtNhapNoNgayGiao").val(tedu.getFormattedDate(thicong.NGAYGTC));
                    $("#txtNhapNoNgayGan").val(tedu.getFormattedDate(thicong.NGAYHT));
                    $("#txtNhapNoNgayCapNhat").val(tedu.getFormattedDate(thicong.NGAYBD));

                    $("#txtNhapNoSoNoDongHo").val(thicong.DongHoSoNo);
                    $("#txtNhapNoChiSoKhiLapDongHo").val(thicong.CSDAU);

                    var ckQuyetToan = document.getElementById('ckCoLapQuyetToan');
                    ckQuyetToan.checked = thicong.TTQT;

                    $("#txtNhapNoMaSoChiKiemDinhMat1").val(thicong.CHIKDM1);
                    $("#txtNhapNoMaSoChiKiemDinhMat2").val(thicong.CHIKDM2);
                    $("#ddlXacDinhHoaDonKhachHangKeBen").val(thicong.HDKEMTHEO);
                    $("#txtLyDoTraHoSoVeThietKe").val(thicong.LYDOTRAHSTK);
                }               
                $('#modal-add-edit-NhapSoNoDongHo').modal('show');
                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function loadEditDataDongHo() {
        var madongho = $("#hidDongHoMaDongHoId").val();
        var corporationid = $("#ddlNhapNoKhuVuc").val();

        $.ajax({
            type: "GET",
            url: "/Admin/PoDkNuocTC/GetDongHoId",
            data: {
                MaDongHoId: madongho,
                CorporationId: corporationid
            },
            dataType: "json",

            success: function (response) {
                var dongho = response;               

                $("#txtNhapNoSoNoDongHo").val(dongho.SONO);                

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function saveSoNoDongHo() {
        var madondangky = $('#hidDonDangKyMaddk').val();
        var madongho = $('#hidDongHoMaDongHoId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var ngaygiao = tedu.getFormatDateYYMMDD($('#txtNhapNoNgayGiao').val());   
            var ngaygan = tedu.getFormatDateYYMMDD($('#txtNhapNoNgayGan').val());   
            var ngaycapnhat = tedu.getFormatDateYYMMDD($('#txtNhapNoNgayCapNhat').val());   

            var chisolapdongho = $("#txtNhapNoChiSoKhiLapDongHo").val();
            var ckQuyetToan = document.getElementById('ckCoLapQuyetToan').checked;

            var chikiemdinhm1 = $("#txtNhapNoMaSoChiKiemDinhMat1").val();
            var chikiemdinhm2 = $("#txtNhapNoMaSoChiKiemDinhMat2").val();
            var xacdinhhoadonkhkeben = $("#ddlXacDinhHoaDonKhachHangKeBen").val();
            var txtLyDoTraHoSoVeThietKe = $("#txtLyDoTraHoSoVeThietKe").val();            

            $.ajax({
                type: "POST",
                url: "/Admin/PoDkNuocTC/UpdateTCSoNo",
                data: {
                    MADDK: madondangky,
                    DongHoId: madongho,

                    NGAYGTC: ngaygiao,
                    NGAYHT: ngaygan,
                    NGAYBD: ngaycapnhat,

                    CSDAU: chisolapdongho,
                    TTQT: ckQuyetToan,

                    CHIKDM1: chikiemdinhm1,
                    CHIKDM2: chikiemdinhm2,
                    HDKEMTHEO: xacdinhhoadonkhkeben,
                    LYDOTRAHSTK: txtLyDoTraHoSoVeThietKe
                },
                dataType: "json",
                beforeSend: function () {
                    nguyen.startLoading();
                    $('#modal-add-edit-NhapSoNoDongHo').modal('hide');
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Nhập số No đồng hồ.", "error");
                    }
                    else {
                        tedu.notify('Lưu Nhập số No đồng hồ.', 'success');

                        nguyen.appUserLoginLogger(userName, 'Nhập số No đồng hồ');

                        //loadTableNhapHopDongNuoc(true);

                        addeditClearData();

                        nguyen.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể lưu Nhập số No đồng hồ.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function updateSoNoDongHo() {
        var madondangky = $('#hidDonDangKyMaddk').val();
        var madongho = $('#hidDongHoMaDongHoId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var ngaygiao = tedu.getFormatDateYYMMDD($('#txtNhapNoNgayGiao').val());
            var ngaygan = tedu.getFormatDateYYMMDD($('#txtNhapNoNgayGan').val());
            var ngaycapnhat = tedu.getFormatDateYYMMDD($('#txtNhapNoNgayCapNhat').val());

            var chisolapdongho = $("#txtNhapNoChiSoKhiLapDongHo").val();
            var ckQuyetToan = document.getElementById('ckCoLapQuyetToan').checked;

            var chikiemdinhm1 = $("#txtNhapNoMaSoChiKiemDinhMat1").val();
            var chikiemdinhm2 = $("#txtNhapNoMaSoChiKiemDinhMat2").val();
            var xacdinhhoadonkhkeben = $("#ddlXacDinhHoaDonKhachHangKeBen").val();
            var txtLyDoTraHoSoVeThietKe = $("#txtLyDoTraHoSoVeThietKe").val();

            $.ajax({
                type: "POST",
                url: "/Admin/PoDkNuocTC/UpdateTCSuaSoNo",
                data: {
                    MADDK: madondangky,
                    DongHoId: madongho,

                    NGAYGTC: ngaygiao,
                    NGAYHT: ngaygan,
                    NGAYBD: ngaycapnhat,

                    CSDAU: chisolapdongho,
                    TTQT: ckQuyetToan,

                    CHIKDM1: chikiemdinhm1,
                    CHIKDM2: chikiemdinhm2,
                    HDKEMTHEO: xacdinhhoadonkhkeben,
                    LYDOTRAHSTK: txtLyDoTraHoSoVeThietKe
                },
                dataType: "json",
                beforeSend: function () {
                    nguyen.startLoading();
                    $('#modal-add-edit-NhapSoNoDongHo').modal('hide');
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Sửa số No đồng hồ.", "error");
                    }
                    else {
                        tedu.notify('Lưu Sửa số No đồng hồ.', 'success');

                        nguyen.appUserLoginLogger(userName, 'Sửa số No đồng hồ');

                        //loadTableNhapHopDongNuoc(true);

                        addeditClearData();

                        nguyen.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể lưu Sửa số No đồng hồ.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }


}