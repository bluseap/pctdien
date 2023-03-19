var trahsController = function () {    

    var addedithshoso = new addedithshosoController();

    this.loadEditTraHoSo = function (hsbohosoid) {
        loadEditTraHoSo(hsbohosoid);       
    }

    this.initialize = function () {
        registerEvents();
        trahosoClearData();
        loadDataChucNangTraHoSo();
    }

    function registerEvents() {

        $('#txtTraBoHoSoNgayTra ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        $('#btnSaveTraBoHoSo').on('click', function (e) {
            var insertchuyenbohosomuontra = $('#hidInsertHsChuyenBoHoSoMuonTraId').val(); // 2: update muon; 3: update tra

            if (insertchuyenbohosomuontra == "2")
                InsertTraHoSo();
            else if (insertchuyenbohosomuontra == "3")
                var trabohosochucnang = $("#ddlTraBoHoSoChucNangTraHoSo").val(); // 1: tra ho so; 2: chua tra ho so

            if (trabohosochucnang == "2") {
                UpdateChuaTraHoSo();
            }
            else {
                UpdateTraHoSo();
            }                
        });

    }

    function trahosoClearData() {
        var datenow = new Date();

        $("#ddlTraBoHoSoChucNangTraHoSo")[0].selectedIndex = 0;    

        $('#txtTraBoHoSoNgayTra').val(tedu.getFormattedDate(datenow));
        $('#txtTraBoHoSoNguoiTra').val('');
        $('#txtTraBoHoSoGhiChuTra').val('');
    }

    function loadDataChucNangTraHoSo() {
        var render = "<option value='%' >-- Lựa chọn --</option>";

        render += "<option value='1'>Trả hồ sơ</option> <option value='2'>Chưa trả hồ sơ</option>";

        $('#ddlTraBoHoSoChucNangTraHoSo').html(render);
        $("#ddlTraBoHoSoChucNangTraHoSo")[0].selectedIndex = 0;    
    }

    function isFormMainValidate() {
        if ($('#frmMainTraBoHoSo').valid()) {
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
        $('#frmMainTraBoHoSo').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                ddlTraBoHoSoChucNangTraHoSo: {
                    required: true,
                    isDanhMuc: true
                },                 
                txtTraBoHoSoNgayTra: {
                    required: true,
                    isDateVietNam: true
                },
                txtTraBoHoSoNguoiTra: { required: true },
                txtTraBoHoSoGhiChuTra: { required: true },                             
            },
        });
    }

    function loadEditTraHoSo(hschuyenbohosomuontraid) {
        $.ajax({
            type: "GET",
            url: "/Admin/hsHoSo/getmuontrahs",
            data: {
                hschuyenbohosomuontraId: hschuyenbohosomuontraid
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var chuyenmuontrahs = response.Result;

                if (chuyenmuontrahs.IsMuon == 1) {
                    $('#hidInsertHsChuyenBoHoSoMuonTraId').val(2);

                    trahosoClearData();                    
                }
                else if (chuyenmuontrahs.IsMuon == 0) {
                    $('#hidInsertHsChuyenBoHoSoMuonTraId').val(3);

                    $("#ddlTraBoHoSoChucNangTraHoSo")[0].selectedIndex = 1;

                    $('#txtTraBoHoSoNgayTra').val(tedu.getFormattedDate(chuyenmuontrahs.NgayTra));
                    $('#txtTraBoHoSoNguoiTra').val(chuyenmuontrahs.TenNguoiTra);
                    $('#txtTraBoHoSoGhiChuTra').val(chuyenmuontrahs.GhiChuTra);
                }

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function loadTableMuonTraHoSo() {
        var template = $('#template-table-MuonTraHoSo').html();
        var render = "";

        var bohosoid = $('#hidHsBoHoSoId').val();

        $.ajax({
            type: 'GET',
            data: {
                hsbohosoid: bohosoid
            },
            url: '/admin/hshoso/ListTraHs',
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,

                            TenNguoiMuon: item.TenNguoiMuon,
                            NgayMuon: tedu.getFormattedDate(item.NgayMuon),
                            TenNguoiTra: item.TenNguoiTra,
                            NgayTra: item.NgayTra.toString() == "0001-01-01T00:00:00" ? "" : tedu.getFormattedDate(item.NgayTra),
                            TenNguoiTra: item.TenNguoiTra,
                            TrangThaiBoHoSo: tedu.getHoSoLuuTru(item.TrangThaiBoHoSo)
                        });
                    });
                }

                if (render !== '') {
                    $('#table-contentFileMuonTraHoSo').html(render);
                }

            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function InsertTraHoSo() {
        var chuyenbohosomuontraid = $('#hidHsChuyenBoHoSoMuonTraId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var ngaytra = tedu.getFormatDateYYMMDD($('#txtTraBoHoSoNgayTra').val());
            var tennguoitra = $('#txtTraBoHoSoNguoiTra').val();
            var ghichutra = $('#txtTraBoHoSoGhiChuTra').val();

            $.ajax({
                type: "POST",
                url: "/Admin/hshoso/AddTraHs",
                data: {
                    Id: chuyenbohosomuontraid,

                    NgayTra: ngaytra,
                    TenNguoiTra: tennguoitra,
                    GhiChuTra: ghichutra
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu trả hồ sơ.", "error");
                    }
                    else {
                        tedu.notify('Lưu trả hồ sơ.', 'success');

                        loadTableMuonTraHoSo();

                        trahosoClearData();

                        addedithshoso.loadTableHsBoHoSo(true);

                        $('#modal-add-edit-TraBoHoSo').modal('hide');

                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu trả hồ sơ.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function UpdateTraHoSo() {
        var chuyenbohosomuontraid = $('#hidHsChuyenBoHoSoMuonTraId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var ngaytra = tedu.getFormatDateYYMMDD($('#txtTraBoHoSoNgayTra').val());
            var tennguoitra = $('#txtTraBoHoSoNguoiTra').val();
            var ghichutra = $('#txtTraBoHoSoGhiChuTra').val();

            $.ajax({
                type: "POST",
                url: "/Admin/hshoso/UpdateTraHs",
                data: {
                    Id: chuyenbohosomuontraid,

                    NgayTra: ngaytra,
                    TenNguoiTra: tennguoitra,
                    GhiChuTra: ghichutra
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu mượn hồ sơ.", "error");
                    }
                    else {
                        tedu.notify('Lưu mượn hồ sơ.', 'success');

                        loadTableMuonTraHoSo();

                        trahosoClearData();

                        addedithshoso.loadTableHsBoHoSo(true);

                        $('#modal-add-edit-TraBoHoSo').modal('hide');

                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu mượn hồ sơ.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function UpdateChuaTraHoSo() {
        var chuyenbohosomuontraid = $('#hidHsChuyenBoHoSoMuonTraId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var ngaytra = tedu.getFormatDateYYMMDD($('#txtTraBoHoSoNgayTra').val());
            var tennguoitra = $('#txtTraBoHoSoNguoiTra').val();
            var ghichutra = $('#txtTraBoHoSoGhiChuTra').val();

            $.ajax({
                type: "POST",
                url: "/Admin/hshoso/UpChuaTraHs",
                data: {
                    Id: chuyenbohosomuontraid,

                    NgayTra: ngaytra,
                    TenNguoiTra: tennguoitra,
                    GhiChuTra: ghichutra
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu mượn hồ sơ.", "error");
                    }
                    else {
                        tedu.notify('Lưu mượn hồ sơ.', 'success');

                        loadTableMuonTraHoSo();

                        trahosoClearData();

                        addedithshoso.loadTableHsBoHoSo(true);

                        $('#modal-add-edit-TraBoHoSo').modal('hide');

                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu mượn hồ sơ.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

}