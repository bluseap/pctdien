var giaydndienController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();

    var addeditgdn = new addeditgdnController();
    var timkhachhangdien = new timkhachhangdienController();
    var chuyenkiemtra = new chuyenkiemtraController();
    var quatrinhxuly = new quatrinhxulyController();

    this.initialize = function () {
        loadKhuVuc();

        registerEvents();

        addeditgdn.initialize();
        timkhachhangdien.initialize();
        chuyenkiemtra.initialize();
        quatrinhxuly.initialize();

        loadData();
        loadAutocomplete();
    }

    function registerEvents() {

        $("#btn-create").on('click', function (e) {
            e.preventDefault();            

            $('#hidGiayDeNghiId').val(0);
            $('#hidInsertGiayDeNghiId').val(1);  // 1: insert; 2: update

            var guid = CreateGuid();
            //$('#hidGiayDeNghiDMCungCapNuocCodeXuLy').val(vanbanden.CodeFileGuidId === '00000000-0000-0000-0000-000000000000' ? guid : vanbanden.CodeFileGuidId);
            $('#hidGiayDeNghiDMCungCapDienCodeXuLy').val(guid);

            $('#tbl-contentDMCungCapDichVu').html('');

            $('#modal-add-edit-GiayDeNghi').modal('show');
        });

        $('body').on('click', '.btn-addeditGiayDeNghiCungCapDien', function (e) {
            e.preventDefault();
            var giaydenghiid = $(this).data('id');

            $('#hidGiayDeNghiId').val(giaydenghiid);
            $('#hidInsertGiayDeNghiId').val(2);  // 1: insert; 2: update

            addeditgdn.editGiayDeNghiDien(giaydenghiid);
            $('#modal-add-edit-GiayDeNghi').modal('show');
        });

        $("#ddl-show-pageGiayDeNghiCungCapDien").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            addeditgdn.loadTableGiayDeNghiDien(true);
        });

        $('body').on('click', '.btn-ChuyenXuLy', function (e) {
            e.preventDefault();
            var giaydenghiid = $(this).data('id');

            $('#hidGiayDeNghiId').val(giaydenghiid);

            chuyenkiemtra.loadChuyenKiemTraData(giaydenghiid);

            $('#modal-add-edit-ChuyenKiemTraXuLy').modal('show');
        });

        $('body').on('click', '.btn-QuaTrinhXuLy', function (e) {
            e.preventDefault();
            var giaydenghiid = $(this).data('id');

            $('#hidGiayDeNghiId').val(giaydenghiid);
        });

        $('#ddlKhuVuc').on('change', function () {
            var corporationId = $('#ddlKhuVuc').val();

            $('#ddlKhuVucChuyenXuLy').val(corporationId);
            loadPhongKhuVuc(corporationId);
            loadPhongKhuVucToNhaMay(corporationId);

            addeditgdn.loadTableGiayDeNghiDien(true);

            tedu.notify('Danh mục phòng theo khu vực.', 'success');
        });

        $('#btnTimNoiDung').on('click', function () {
            addeditgdn.loadTableGiayDeNghiDien(true);
        });

        $('#txtTimNoiDung').on('keypress', function (e) {
            if (e.which === 13) {
                addeditgdn.loadTableGiayDeNghiDien(true);
            }
        });

        $('#btnGDNDSExcel').on('click', function () {
            var dieukienExcel = $('#ddlGDNDieuKien').val();
            if (dieukienExcel === "DDDIENNGAYNHAN") { // di doi dien theo ngay tiep nhan
                excelDiDoiDienNgayTiepNhan();
            }
            else if (dieukienExcel === "KDDIENNGAYNHAN") { // kiem dinh dien theo ngay tiep nhan
                excelKiemDinhDienNgayTiepNhan();
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
                $('#ddlTimKhachHangKhuVuc').html(render);
                $('#ddlKhuVucChuyenXuLy').html(render);

                if (userCorporationId !== "PO") {
                    $('#ddlKhuVuc').prop('disabled', true);
                    $('#ddlTimKhachHangKhuVuc').prop('disabled', true);
                    $('#ddlKhuVucChuyenXuLy').prop('disabled', true);
                }
                else {
                    $('#ddlKhuVuc').prop('disabled', false);
                    $('#ddlTimKhachHangKhuVuc').prop('disabled', false);
                    $('#ddlKhuVucChuyenXuLy').prop('disabled', false);
                }
                $("#ddlKhuVuc")[0].selectedIndex = 1;
                $("#ddlTimKhachHangKhuVuc")[0].selectedIndex = 1;
                $("#ddlKhuVucChuyenXuLy")[0].selectedIndex = 1;

                loadPhongKhuVuc($("#ddlKhuVuc").val());
               
                addeditgdn.loadTableGiayDeNghiDien(true);
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

    function loadPhongKhuVucToNhaMay(makhuvuc) {
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
                $('#ddlToNhaMayChuyenXuLy').html(render);
                $("#ddlToNhaMayChuyenXuLy")[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    }

    // new guid()
    function CreateGuid() {
        var d = new Date().getTime();
        var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return guid;
    }

    function loadData() {
        $('#ddlPhongTo').hide();

        var datenow = new Date();
        $('#txtGDNTuNgay').val(tedu.getFormattedDate(datenow));
        $('#txtGDNDenNgay').val(tedu.getFormattedDate(datenow));

        var dieukienExcel = [{ value: "DDDIENNGAYNHAN", Name: "DS Di dời Điện theo ngày tiếp nhận" },
        { value: "KDDIENNGAYNHAN", Name: "DS Kiểm định Điện theo ngày tiếp nhận" }
        ];
        var render = "";
        for (var i = 0; i < dieukienExcel.length; i++) {
            render += "<option value='" + dieukienExcel[i].value + "'>" + dieukienExcel[i].Name + "</option>";
        }
        $('#ddlGDNDieuKien').html(render);
    }

    function excelDiDoiDienNgayTiepNhan() {

        var dieukien1 = $('#ddlGDNDieuKien').val();
        var tungay1 = tedu.getFormatDateYYMMDD($('#txtGDNTuNgay').val());
        var dengay1 = tedu.getFormatDateYYMMDD($('#txtGDNDenNgay').val());

        $.ajax({
            type: 'POST',
            url: '/admin/giaydndien/ExcelDDDien',
            data: {
                dieukien: dieukien1,
                tungay: tungay1,
                denngay: dengay1
            },
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                window.location.href = response;
                tedu.stopLoading();
            }
        });
    }

    function loadAutocomplete() {
        $.ajax({
            type: 'GET',
            url: "/admin/giaydn/GetListNVAuto",
            data: {
                codeXL: "DiDoiNuoc"
            },
            async: true,
            dataType: 'json',
            success: function (database) {
                arrayReturn = [];
                var data = database.Result;
                for (var i = 0, len = data.length; i < len; i++) {
                    arrayReturn.push({ 'value': data[i].TenNhanVien, 'TenChucVu': data[i].TenChucVu });
                }
                //send parse data to autocomplete function
                loadSuggestions(arrayReturn);
                //console.log(countries);               
            }
        });
    }
    function loadSuggestions(options) {
        $('#txtTenNhanVienTiepNhan').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {
                //tedu.notify(suggestion.value, 'error');
                //$('#txtChucVuNguoiKy').val(suggestion.TenChucVu);
            }
        });
        $('#txtTenDaiDienCungCapDichVu').autocomplete({
            lookup: options,
            onSelect: function (suggestion) {
                //tedu.notify(suggestion.value, 'error');
                //$('#txtChucVuNguoiKy').val(suggestion.TenChucVu);
            }
        });
    }

    function excelKiemDinhDienNgayTiepNhan() {

    }

}