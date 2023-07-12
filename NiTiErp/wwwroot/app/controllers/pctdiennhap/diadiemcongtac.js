var diadiemcongtacController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var ddctaddhinh = new ddctaddhinhController();

    this.loadTableDiaDiemCongTac = function () {
        ClearData();
        loadTableDiaDiemCongTac();
        loadTablePCTDienDiaDiemCongTacByDienId();
        loadNguoiChiHuyChoPhep();
    }

    this.initialize = function () {
        registerEvents();
        loadData();
        ClearData();
    }

    function registerEvents() {
        $('#txtDDLVNgayBatDauDiaDiemCongTacDiChuyen, #txtDDLVNgayKetThucDiaDiemCongTacDiChuyen ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        $('#btnSaveEditDDLVDiaDiemLamViec').on('click', function () {
            var ispctdien = $('#hidInsertPCTDien').val(); // 1: insert; 2: update; 
            var isdiadiemcongtac = $('#hidInsertDiaDiemCongTac').val(); // 1: insert; 2: update; 
            const isnguoichihuytt = $('#hidisNGUOICHIHUYTT').val();

            let istestThoiGianLamViecKhiKetThuc = testThoiGianLamViecKhiKetThuc();

            if (istestThoiGianLamViecKhiKetThuc === true) {
                if (isnguoichihuytt == 'true') {
                    if (ispctdien == "2" && isdiadiemcongtac == '1') {
                        saveDiaDiemCongTac();
                    }
                    else if (ispctdien == "2" && isdiadiemcongtac == '2') {
                        updateDiaDiemCongTac();
                    }
                }
                else {
                    tedu.notify('Phải là người có chức danh người chỉ huy trực tiếp.', 'error');
                }
            }
            else {
                tedu.notify('Kiểm tra lại thời gian làm việc.', 'error');
            }
        });

        $('body').on('click', '.btn-addeditPCTDienDSCacDiaDiemCongTac', function (e) {
            e.preventDefault();
            var pctdiadiemcongtacid = $(this).data('id');
            $('#hidPCTDiaDiemCongTacId').val(pctdiadiemcongtacid);

            $('#btnSaveEditDDLVDiaDiemLamViec').show();
            $('#btnSaveEditDDLVHoanThanhCT').hide();
            loadEditPCTDiaDiemCongTac();
        });

        $('body').on('click', '.btn-deletePCTDienDSCacDiaDiemCongTac', function (e) {
            e.preventDefault();
            var pctdiadiemcongtacid = $(this).data('id');
            const isnguoichihuytt = $('#hidisNGUOICHIHUYTT').val();

            if (isnguoichihuytt == 'true') {
                deletePCTNhanVienCongTac(pctdiadiemcongtacid);
            }
            else {
                tedu.notify('Phải là người có chức danh người chỉ huy trực tiếp.', 'error');
            }             
        });

        $('body').on('click', '.btn-AddHinhVideo', function (e) {
            e.preventDefault();
            var pctdiadiemcongtacid = $(this).data('id');
            $('#hidPCTDiaDiemCongTacId').val(pctdiadiemcongtacid);
            $('#hidInsertDDCTHinh').val(1);
            ddctaddhinh.loadTableDDCTHinh();
            $('#modal-add-edit-EditDiaDiemCongTacAddHinh').modal('show');
        });

        $('body').on('click', '.btn-HoanThanhCT', function (e) {
            e.preventDefault();
            var pctdiadiemcongtacid = $(this).data('id');
            $('#hidPCTDiaDiemCongTacId').val(pctdiadiemcongtacid);
            $('#hidInsertDDCTHoanThanh').val(1);

            $('#btnSaveEditDDLVDiaDiemLamViec').hide();
            $('#btnSaveEditDDLVHoanThanhCT').show();
            loadEditPCTDiaDiemCongTac();
        });

        $('#btnSaveEditDDLVHoanThanhCT').on('click', function () {
            var ispctdien = $('#hidInsertPCTDien').val(); // 1: insert; 2: update; 
            var isdiadiemcongtac = $('#hidInsertDiaDiemCongTac').val(); // 1: insert; 2: update; 
            var isdiadiemcongtachoanthanh = $('#hidInsertDDCTHoanThanh').val(); // 1: insert; 2: update; 
            const isnguoichihuytt = $('#hidisNGUOICHIHUYTT').val();

            let istestThoiGianLamViecKhiKetThuc = testThoiGianLamViecKhiKetThuc();

            if (istestThoiGianLamViecKhiKetThuc === true) {
                if (isnguoichihuytt == 'true') {
                    if (ispctdien == "2" && isdiadiemcongtac == '2' && isdiadiemcongtachoanthanh == '1') {
                        updateDiaDiemCongTacHoanThanh();
                    }
                }
                else {
                    tedu.notify('Phải là người có chức danh người chỉ huy trực tiếp.', 'error');
                }
            }
            else {
                tedu.notify('Kiểm tra lại thời gian làm việc.', 'error');
            }
        });

        $('body').on('click', '.btn-AddToDiaDiemCongTac', function (e) {
            e.preventDefault();
            var adddendiadiemcongtac = $(this).data('id');
            $('#txtTenDiaDiemCongTacDiChuyen').val(adddendiadiemcongtac);
        });

        KiemTraThoiGianLamViecChange();
    }

    function loadData() {
        $('#txtDDLVNguoiChiHuyTrucTiep').prop('disabled', true);
        $('#txtDDLVNguoiChoPhep').prop('disabled', true);

        $('#btnSaveEditDDLVDiaDiemLamViec').show();
        $('#btnSaveEditDDLVHoanThanhCT').hide();
    }

    function ClearData() {
        var datenow = new Date();

        $("#txtTenDiaDiemCongTacDiChuyen").val('');

        $("#txtDDLVGioBatDauDiaDiemCongTacDiChuyen").val(tedu.getFormattedDateGio(datenow));
        $("#txtDDLVPhutBatDauDiaDiemCongTacDiChuyen").val(tedu.getFormattedDatePhut(datenow));
        $("#txtDDLVNgayBatDauDiaDiemCongTacDiChuyen").val(tedu.getFormattedDate(datenow));
        
        let gio1 = datenow.getHours() + 1;
        $("#txtDDLVGioKetThucDiaDiemCongTacDiChuyen").val(gio1 < 10 ? '0' + gio1.toString() : gio1.toString());
        $("#txtDDLVPhutKetThucDiaDiemCongTacDiChuyen").val(tedu.getFormattedDatePhut(datenow));
        $("#txtDDLVNgayKetThucDiaDiemCongTacDiChuyen").val(tedu.getFormattedDate(datenow));

        //$("#txtDDLVNguoiChiHuyTrucTiep").val('');
        //$("#txtDDLVNguoiChoPhep").val('');
    }

    function loadTableDiaDiemCongTac() {
        var pctdienId = $('#hidPCTDienId').val();

        var template = $('#template-table-PCTDienDSCacDiaDiemCongTac').html();
        var render = "";        

        $.ajax({
            type: 'GET',
            url: '/admin/pctdiennhap/ListDDCongTac',
            data: {
                PCTDienId: pctdienId
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,                           

                            TenDiaDiemCongTac: item.TenDiaDiemCongTac,
                            NgayBatDau: tedu.getFormattedDateTimeN(item.NgayBatDau),
                            NgayKetThuc: tedu.getFormattedDateTimeN(item.NgayKetThuc),
                            TenNguoiChiHuyTrucTiep: item.TenNguoiChiHuyTrucTiep,
                            TenNguoiChoPhep: item.TenNguoiChoPhep,

                            TTDiaDiemCT: tedu.getPhieuCongTacDienDDCT(item.TTDiaDiemCT),
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }               

                if (render !== '') {
                    $('#table-contentPCTDienDSCacDiaDiemCongTac').html(render);
                }
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function isFormMainValidate() {
        if ($('#frmMainEditPCTDienCacDiaDiemCongTacDiChuyen').valid() ) {
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
        $('#frmMainEditPCTDienCacDiaDiemCongTacDiChuyen').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                txtTenDiaDiemCongTacDiChuyen: { required: true },
                
                txtDDLVGioBatDauDiaDiemCongTacDiChuyen: { required: true },
                txtDDLVPhutBatDauDiaDiemCongTacDiChuyen: { required: true },
                txtDDLVNgayBatDauDiaDiemCongTacDiChuyen: { required: true, isDateVietNam: true },
                txtDDLVGioKetThucDiaDiemCongTacDiChuyen: { required: true },
                txtDDLVPhutKetThucDiaDiemCongTacDiChuyen: { required: true },
                txtDDLVNgayKetThucDiaDiemCongTacDiChuyen: { required: true, isDateVietNam: true },

                txtDDLVNguoiChiHuyTrucTiep: { required: true },
                txtDDLVNguoiChoPhep: { required: true },               
            },
        });
    } 

    function saveDiaDiemCongTac() {
        var pctdienid = $('#hidPCTDienId').val();        

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {            

            var tendiadiemcongtacdichuyen = $("#txtTenDiaDiemCongTacDiChuyen").val();

            var giobatdauddctdc = $("#txtDDLVGioBatDauDiaDiemCongTacDiChuyen").val();
            var phutbatdauddctdc = $("#txtDDLVPhutBatDauDiaDiemCongTacDiChuyen").val();
            var ngaybatdauddctdc = tedu.getFormatDateYYMMDD($('#txtDDLVNgayBatDauDiaDiemCongTacDiChuyen').val());
            var gioketthucddctdc = $("#txtDDLVGioKetThucDiaDiemCongTacDiChuyen").val();
            var phutketthucddctdc = $("#txtDDLVPhutKetThucDiaDiemCongTacDiChuyen").val();
            var ngayketthucddctdc = tedu.getFormatDateYYMMDD($('#txtDDLVNgayKetThucDiaDiemCongTacDiChuyen').val());

            var nguoichihuytructiepid = $("#hidDDLVNguoiChiHuyTrucTiepId").val();
            var nguoichophepid = $("#hidDDLVNguoiChoPhepId").val();    

            var tennguoichihuytructiep = $("#txtDDLVNguoiChiHuyTrucTiep").val();
            var tennguoichophep = $("#txtDDLVNguoiChoPhep").val();    

            $.ajax({
                type: "POST",
                url: "/Admin/pctdiennhap/SaveDDCongTac",
                data: {
                    PCTDienId: pctdienid,

                    TenDiaDiemCongTac: tendiadiemcongtacdichuyen,
                    GioBatDau: giobatdauddctdc,
                    PhutBatDau: phutbatdauddctdc,
                    NgayBatDau: ngaybatdauddctdc,
                    GioKetThuc: gioketthucddctdc,
                    PhutKetThuc: phutketthucddctdc,
                    NgayKetThuc: ngayketthucddctdc,
                    NguoiChiHuyTrucTiepId: nguoichihuytructiepid,
                    NguoiChoPhepId: nguoichophepid,
                    TenNguoiChiHuyTrucTiep: tennguoichihuytructiep,
                    TenNguoiChoPhep: tennguoichophep                    
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Địa điểm công tác điện.", "error");
                    }
                    else {
                        nguyen.appUserLoginLogger(userName, "Lưu Địa điểm công tác điện. PCTDienId: " + pctdienid);

                        tedu.notify('Lưu Địa điểm công tác điện.', 'success');

                        loadTableDiaDiemCongTac();

                        ClearData();
                        
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu Địa điểm công tác điện.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function updateDiaDiemCongTac() {
        var pctdiadiemcongtacid = $('#hidPCTDiaDiemCongTacId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var tendiadiemcongtacdichuyen = $("#txtTenDiaDiemCongTacDiChuyen").val();

            var giobatdauddctdc = $("#txtDDLVGioBatDauDiaDiemCongTacDiChuyen").val();
            var phutbatdauddctdc = $("#txtDDLVPhutBatDauDiaDiemCongTacDiChuyen").val();
            var ngaybatdauddctdc = tedu.getFormatDateYYMMDD($('#txtDDLVNgayBatDauDiaDiemCongTacDiChuyen').val());
            var gioketthucddctdc = $("#txtDDLVGioKetThucDiaDiemCongTacDiChuyen").val();
            var phutketthucddctdc = $("#txtDDLVPhutKetThucDiaDiemCongTacDiChuyen").val();
            var ngayketthucddctdc = tedu.getFormatDateYYMMDD($('#txtDDLVNgayKetThucDiaDiemCongTacDiChuyen').val());

            var nguoichihuytructiepid = $("#hidDDLVNguoiChiHuyTrucTiepId").val();
            var nguoichophepid = $("#hidDDLVNguoiChoPhepId").val();

            var tennguoichihuytructiep = $("#txtDDLVNguoiChiHuyTrucTiep").val();
            var tennguoichophep = $("#txtDDLVNguoiChoPhep").val();

            $.ajax({
                type: "POST",
                url: "/Admin/pctdiennhap/UpdateDDCongTac",
                data: {
                    Id: pctdiadiemcongtacid,

                    TenDiaDiemCongTac: tendiadiemcongtacdichuyen,
                    GioBatDau: giobatdauddctdc,
                    PhutBatDau: phutbatdauddctdc,
                    NgayBatDau: ngaybatdauddctdc,
                    GioKetThuc: gioketthucddctdc,
                    PhutKetThuc: phutketthucddctdc,
                    NgayKetThuc: ngayketthucddctdc,
                    NguoiChiHuyTrucTiepId: nguoichihuytructiepid,
                    NguoiChoPhepId: nguoichophepid,
                    TenNguoiChiHuyTrucTiep: tennguoichihuytructiep,
                    TenNguoiChoPhep: tennguoichophep
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Sửa Địa điểm công tác điện.", "error");
                    }
                    else {
                        nguyen.appUserLoginLogger(userName, "Lưu Sửa Địa điểm công tác điện. PCTDienId: " + pctdiadiemcongtacid);

                        tedu.notify('Lưu Sửa Địa điểm công tác điện.', 'success');

                        $('#hidInsertDiaDiemCongTac').val(1);

                        loadTableDiaDiemCongTac();

                        ClearData();

                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu Sửa Địa điểm công tác điện.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function updateDiaDiemCongTacHoanThanh() {
        var pctdiadiemcongtacid = $('#hidPCTDiaDiemCongTacId').val();

        $.ajax({
            type: "POST",
            url: "/Admin/pctdiennhap/UpDDCongTacHT",
            data: {
                Id: pctdiadiemcongtacid                
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Lưu Địa điểm công tác điện Hoàn thành.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Lưu Sửa Địa điểm công tác điện. PCTDienId: " + pctdiadiemcongtacid);

                    tedu.notify('Lưu Địa điểm công tác điện Hoàn thành.', 'success');

                    $('#hidInsertDiaDiemCongTac').val(1);
                    $('#hidInsertDDCTHoanThanh').val(0);

                    $('#btnSaveEditDDLVDiaDiemLamViec').show();
                    $('#btnSaveEditDDLVHoanThanhCT').hide();

                    loadTableDiaDiemCongTac();

                    ClearData();

                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu Địa điểm công tác điện Hoàn thành.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function loadEditPCTDiaDiemCongTac() {
        var pctdiadiemcongtacId = $('#hidPCTDiaDiemCongTacId').val();
        var datenow = new Date();

        $.ajax({
            type: "GET",
            url: "/Admin/pctdiennhap/GetDDCongTacId",
            data: {
                pctdiadiemcongtacid: pctdiadiemcongtacId
            },
            dataType: "json",

            success: function (response) {
                var pctdiadiemcongtac = response.Result;

                ClearData();

                $('#hidInsertDiaDiemCongTac').val(2);

                $("#txtTenDiaDiemCongTacDiChuyen").val(pctdiadiemcongtac.TenDiaDiemCongTac);

                $("#txtDDLVGioBatDauDiaDiemCongTacDiChuyen").val(pctdiadiemcongtac.GioBatDau != null ? pctdiadiemcongtac.GioBatDau : tedu.getFormattedDateGio(datenow));
                $("#txtDDLVPhutBatDauDiaDiemCongTacDiChuyen").val(pctdiadiemcongtac.PhutBatDau != null ? pctdiadiemcongtac.PhutBatDau : tedu.getFormattedDateGio(datenow));
                $("#txtDDLVNgayBatDauDiaDiemCongTacDiChuyen").val(pctdiadiemcongtac.NgayBatDau !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(pctdiadiemcongtac.NgayBatDau) : tedu.getFormattedDate(datenow));

                $("#txtDDLVGioKetThucDiaDiemCongTacDiChuyen").val(pctdiadiemcongtac.GioKetThuc != null ? pctdiadiemcongtac.GioKetThuc : tedu.getFormattedDateGio(datenow));
                $("#txtDDLVPhutKetThucDiaDiemCongTacDiChuyen").val(pctdiadiemcongtac.PhutKetThuc != null ? pctdiadiemcongtac.PhutKetThuc : tedu.getFormattedDateGio(datenow));
                $("#txtDDLVNgayKetThucDiaDiemCongTacDiChuyen").val(pctdiadiemcongtac.NgayKetThuc !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(pctdiadiemcongtac.NgayKetThuc) : tedu.getFormattedDate(datenow));

                $("#hidDDLVNguoiChiHuyTrucTiepId").val(pctdiadiemcongtac.NguoiChiHuyTrucTiepId);
                $("#hidDDLVNguoiChoPhepId").val(pctdiadiemcongtac.NguoiChoPhepId);

                $("#txtDDLVNguoiChiHuyTrucTiep").val(pctdiadiemcongtac.TenNguoiChiHuyTrucTiep);
                $("#txtDDLVNguoiChoPhep").val(pctdiadiemcongtac.TenNguoiChoPhep);                
                
                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function deletePCTNhanVienCongTac(pctdiadiemcongtacid) {
        tedu.confirm('Bạn có chắc chắn xóa Địa điểm công tác này?', function () {
            $.ajax({
                type: "POST",
                url: "/Admin/pctdiennhap/DelDDCongTac",
                data: {
                    PCTDiaDiemCongTacId: pctdiadiemcongtacid
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Xóa PCT Địa điểm công tác.", "error");
                    }
                    else {
                        nguyen.appUserLoginLogger(userName, "Xóa PCT Địa điểm công tác. Id: " + pctdiadiemcongtacid);

                        tedu.notify('Xóa PCT Địa điểm công tác.', 'success');

                        loadTableDiaDiemCongTac();

                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Xóa PCT Địa điểm công tác.', 'error');
                    tedu.stopLoading();
                }
            });
        });  
    }

    function loadTablePCTDienDiaDiemCongTacByDienId() {
        var template = $('#template-table-PCTDienThemDDCT').html();
        var render = "";

        var pctdienId = $('#hidPCTDienId').val();

        $.ajax({
            type: 'GET',
            url: '/admin/pctdiennhap/ListDDCTdienId',
            data: {
                pctdienid: pctdienId
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,

                            STT: item.SoThuTu,
                            TramBienApDuongDay: item.TramBienApDuongDay,
                            SoTru: item.SoTru,
                            GhiChuHoTen: item.GhiChuHoTen,
                            TuNgayDenNgay: item.TuNgayDenNgay
                        });
                    });
                }

                if (render !== '') {
                    $('#table-contentPCTDienThemDDCT').html(render);
                }

            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function KiemTraThoiGianLamViecChange() {
        $('#txtDDLVGioBatDauDiaDiemCongTacDiChuyen').on('change', function () {
            let giobatdau = parseInt($("#txtDDLVGioBatDauDiaDiemCongTacDiChuyen").val());
            let gioketthuc = parseInt($("#txtDDLVGioKetThucDiaDiemCongTacDiChuyen").val());

            if (giobatdau > gioketthuc) {
                tedu.confirm('Giờ bắt đầu nhỏ hơn giờ kết thúc. ', function () {
                    tedu.notify('Kiểm tra giờ lại.', 'error');
                    $("#txtDDLVGioBatDauDiaDiemCongTacDiChuyen").val(gioketthuc < 10 ? '0' + gioketthuc.toString() : gioketthuc.toString());
                });
            }            
        });
        $('#txtDDLVPhutBatDauDiaDiemCongTacDiChuyen').on('change', function () {
            let giobatdau = parseInt($("#txtDDLVGioBatDauDiaDiemCongTacDiChuyen").val());
            let phutbatdau = parseInt($("#txtDDLVPhutBatDauDiaDiemCongTacDiChuyen").val());

            let gioketthuc = parseInt($("#txtDDLVGioKetThucDiaDiemCongTacDiChuyen").val());
            let phutketthuc = parseInt($("#txtDDLVPhutKetThucDiaDiemCongTacDiChuyen").val());

            if (giobatdau == gioketthuc && phutbatdau > phutketthuc) {
                tedu.confirm('Phút bắt đầu nhỏ hơn hoặc bằng phút kết thúc. ', function () {
                    tedu.notify('Kiểm tra phút lại.', 'error');
                    $("#txtDDLVPhutBatDauDiaDiemCongTacDiChuyen").val(phutketthuc < 10 ? '0' + phutketthuc.toString() : phutketthuc.toString());
                });
            }            
        });
        $('#txtDDLVNgayBatDauDiaDiemCongTacDiChuyen').on('change', function () {
            let ngaybatdaukh = tedu.getFormatDateYYMMDD($('#txtDDLVNgayBatDauDiaDiemCongTacDiChuyen').val());
            let ngayketthuckh = tedu.getFormatDateYYMMDD($('#txtDDLVNgayKetThucDiaDiemCongTacDiChuyen').val());

            if (ngaybatdaukh !== ngayketthuckh) {
                tedu.confirm('Ngày bắt đầu và ngày kết thúc phải bằng nhau. ', function () {
                    tedu.notify('Kiểm tra ngày lại.', 'error');
                    $("#txtDDLVNgayBatDauDiaDiemCongTacDiChuyen").val(tedu.getFormattedDate(ngayketthuckh));
                });
                $("#txtDDLVNgayBatDauDiaDiemCongTacDiChuyen").val(tedu.getFormattedDate(ngayketthuckh));
            }
        });

        $('#txtDDLVGioKetThucDiaDiemCongTacDiChuyen').on('change', function () {
            let giobatdau = parseInt($("#txtDDLVGioBatDauDiaDiemCongTacDiChuyen").val());
            let gioketthuc = parseInt($("#txtDDLVGioKetThucDiaDiemCongTacDiChuyen").val());

            if (giobatdau > gioketthuc) {
                tedu.confirm('Giờ bắt đầu nhỏ hơn giờ kết thúc. ', function () {
                    tedu.notify('Kiểm tra giờ lại.', 'error');
                    $("#txtDDLVGioKetThucDiaDiemCongTacDiChuyen").val(giobatdau + 1 < 10 ? '0' + (giobatdau + 1).toString() : (giobatdau + 1).toString());
                });
            }
        });
        $('#txtDDLVPhutKetThucDiaDiemCongTacDiChuyen').on('change', function () {
            let giobatdau = parseInt($("#txtDDLVGioBatDauDiaDiemCongTacDiChuyen").val());
            let phutbatdau = parseInt($("#txtDDLVPhutBatDauDiaDiemCongTacDiChuyen").val());

            let gioketthuc = parseInt($("#txtDDLVGioKetThucDiaDiemCongTacDiChuyen").val());
            let phutketthuc = parseInt($("#txtDDLVPhutKetThucDiaDiemCongTacDiChuyen").val());

            if (giobatdau == gioketthuc && phutbatdau > phutketthuc) {
                tedu.confirm('Phút bắt đầu nhỏ hơn hoặc bằng phút kết thúc. ', function () {
                    tedu.notify('Kiểm tra phút lại.', 'error');
                    $("#txtDDLVPhutKetThucDiaDiemCongTacDiChuyen").val(phutketthuc < 10 ? '0' + phutketthuc.toString() : phutketthuc.toString());
                });
            }   
        });
        $('#txtDDLVNgayKetThucDiaDiemCongTacDiChuyen').on('change', function () {
            let ngaybatdaukh = tedu.getFormatDateYYMMDD($('#txtDDLVNgayBatDauDiaDiemCongTacDiChuyen').val());
            let ngayketthuckh = tedu.getFormatDateYYMMDD($('#txtDDLVNgayKetThucDiaDiemCongTacDiChuyen').val());

            if (ngaybatdaukh !== ngayketthuckh) {
                tedu.confirm('Ngày bắt đầu và ngày kết thúc phải bằng nhau. ', function () {
                    tedu.notify('Kiểm tra ngày lại.', 'error');
                    $("#txtDDLVNgayKetThucDiaDiemCongTacDiChuyen").val(tedu.getFormattedDate(ngaybatdaukh));
                });
                $("#txtDDLVNgayKetThucDiaDiemCongTacDiChuyen").val(tedu.getFormattedDate(ngaybatdaukh));
            }
        });
    }

    function testThoiGianLamViecKhiKetThuc() {        
        let giobatdau = parseInt($("#txtDDLVGioBatDauDiaDiemCongTacDiChuyen").val());
        let phutbatdau = parseInt($("#txtDDLVPhutBatDauDiaDiemCongTacDiChuyen").val());
        let gioketthuc = parseInt($("#txtDDLVGioKetThucDiaDiemCongTacDiChuyen").val());
        let phutketthuc = parseInt($("#txtDDLVPhutKetThucDiaDiemCongTacDiChuyen").val());
        let ngaybatdaukh = tedu.getFormatDateYYMMDD($('#txtDDLVNgayBatDauDiaDiemCongTacDiChuyen').val());
        let ngayketthuckh = tedu.getFormatDateYYMMDD($('#txtDDLVNgayKetThucDiaDiemCongTacDiChuyen').val());

        if (ngaybatdaukh !== ngayketthuckh) {            
            return false;
        }
        else if (giobatdau > gioketthuc) {            
            return false;
        }
        else if (giobatdau == gioketthuc && phutbatdau > phutketthuc) {            
            return false;
        }
        else {
            return true;
        }
    }

    function loadNguoiChiHuyChoPhep() {
        var pctdienId = $('#hidPCTDienId').val();        

        $.ajax({
            type: "GET",
            url: "/Admin/pctdiennhap/GetpctdId",
            data: {
                PCTDienId: pctdienId
            },
            dataType: "json",

            success: function (response) {
                var pctdien = response.Result;              

                $('#hidPCTDienCode').val(pctdien.Code);                    
               
                $('#hidPCTDienNguoiChiHuyTrucTiepId').val(pctdien.NguoiChiHuyTrucTiepId);
                $('#txtDDLVNguoiChiHuyTrucTiep').val(pctdien.TenNguoiChiHuyTrucTiep);
               
                $('#hidPCTDienNguoiChoPhepId').val(pctdien.NguoiChoPhepId);
                $('#txtDDLVNguoiChoPhep').val(pctdien.TenNguoiChoPhep);
                
                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

}