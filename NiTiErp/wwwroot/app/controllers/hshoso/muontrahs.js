var muontrahsController = function () {   

    var trahoso = new trahsController();

    this.loadTableMuonTraHoSo = function (hsbohosoid) {  
        loadEditHsBoHoSo(hsbohosoid)
        loadTableMuonTraHoSo();
    }

    this.loadTableMuonTraHoSoTraHoSo = function () {        
        loadTableMuonTraHoSo();
    }

    this.initialize = function () {
        registerEvents();
        muonctrahosoClearData();
    }

    function registerEvents() {      
        
        $('#txtMuonTraNgayMuon ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        $('#btnSaveMuonTraHoSo').on('click', function (e) {
            var insertchuyenbohosomuontra = $('#hidInsertHsChuyenBoHoSoMuonTraId').val(); // update

            if (insertchuyenbohosomuontra == "1")
                SaveChuyenBoHoSoMuonTra();
            else if (insertchuyenbohosomuontra == "2")
                UpdateChuyenBoHoSoMuonTra();
        });

        $('body').on('click', '.btn-editMuonBoHoSo', function (e) {
            e.preventDefault();
            var chuyenbohosomuontraid = $(this).data('id');
            $('#hidHsChuyenBoHoSoMuonTraId').val(chuyenbohosomuontraid);

            loadEditHsChuyenBoHoSoMuonTra(chuyenbohosomuontraid);
        }); 

        $('body').on('click', '.btn-editTraBoHoSo', function (e) {
            e.preventDefault();
            var chuyenbohosomuontraid = $(this).data('id');
            $('#hidHsChuyenBoHoSoMuonTraId').val(chuyenbohosomuontraid);

            $('#hidInsertHsChuyenBoHoSoMuonTraId').val(2);

            trahoso.loadEditTraHoSo(chuyenbohosomuontraid);

            $('#modal-add-edit-TraBoHoSo').modal('show');
        });


        //$('body').on('click', '.btn-deleteFileBoHoSo', function (e) {
        //    e.preventDefault();
        //    var bohosofileid = $(this).data('id');
        //    XoaFileBoHoSo(bohosofileid);
        //}); 
    }

    function muonctrahosoClearData() {
        var datenow = new Date();

        //$('#txtMuonTraTieuDeBoHoSo').val('');
        $('#txtMuonTraNgayMuon').val(tedu.getFormattedDate(datenow));
        $('#txtMuonTraTenNguoiMuon').val('');
        $('#txtMuonTraGhiChuMuon').val('');
    }  

    function isFormMainValidate() {
        if ($('#frmMainMuonTraHoSo').valid()) {
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
        $('#frmMainMuonTraHoSo').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                //txtMuonTraTieuDeBoHoSo: { required: true },
                txtMuonTraNgayMuon: {
                    required: true,
                    isDateVietNam: true
                }, 
                txtMuonTraTenNguoiMuon: { required: true },
                txtMuonTraGhiChuMuon: { required: true }, 

                //ddlAddEditKeTuBao: {
                //    required: true,
                //    isDanhMuc: true
                //},               
            },           
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

    function loadEditHsBoHoSo(hsbohosoid) {
        $.ajax({
            type: "GET",
            url: "/Admin/hsHoSo/GetBoHs",
            data: {
                hsbohosoId: hsbohosoid
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var bohoso = response.Result;

                $("#txtMuonTraTieuDeBoHoSo").val(bohoso.TieuDeBoHoSo);

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function loadEditHsChuyenBoHoSoMuonTra(hschuyenbohosomuontraid) {
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

                $('#txtMuonTraNgayMuon').val(tedu.getFormattedDate(chuyenmuontrahs.NgayMuon));
                $('#txtMuonTraTenNguoiMuon').val(chuyenmuontrahs.TenNguoiNhapMuon);
                $('#txtMuonTraGhiChuMuon').val(chuyenmuontrahs.GhiChuMuon);

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }
    
    function SaveChuyenBoHoSoMuonTra() {
        var hsbohosoid = $('#hidHsBoHoSoId').val();        

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var ngaymuon = tedu.getFormatDateYYMMDD($('#txtMuonTraNgayMuon').val());
            var tennguoimuon = $('#txtMuonTraTenNguoiMuon').val();
            var ghichumuon = $('#txtMuonTraGhiChuMuon').val();            

            $.ajax({
                type: "POST",
                url: "/Admin/hshoso/AddMuonTra",
                data: {
                    HsBoHoSoCuId: hsbohosoid,

                    NgayMuon: ngaymuon,
                    TenNguoiMuon: tennguoimuon,
                    GhiChuMuon: ghichumuon
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

                        muonctrahosoClearData();
                        
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

    function UpdateChuyenBoHoSoMuonTra() {
        var chuyenbohosomuontraid = $('#hidHsChuyenBoHoSoMuonTraId').val(chuyenbohosomuontraid);       

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var ngaymuon = tedu.getFormatDateYYMMDD($('#txtMuonTraNgayMuon').val());
            var tennguoimuon = $('#txtMuonTraTenNguoiMuon').val();
            var ghichumuon = $('#txtMuonTraGhiChuMuon').val();

            $.ajax({
                type: "POST",
                url: "/Admin/hshoso/UpMuonTra",
                data: {
                    Id: chuyenbohosomuontraid,

                    NgayMuon: ngaymuon,
                    TenNguoiMuon: tennguoimuon,
                    GhiChuMuon: ghichumuon
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

                        muonctrahosoClearData();

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

    //function XoaFileBoHoSo(hosofileid) {
    //    tedu.confirm('Bạn có chắc chắn xóa bằng này?', function () {
    //        $.ajax({
    //            type: "POST",
    //            url: "/Admin/hshoso/DelBoHsFile",
    //            data: {
    //                HsBoHoSoFileId: hosofileid
    //            },
    //            dataType: "json",
    //            beforeSend: function () {
    //                tedu.startLoading();
    //            },
    //            success: function (response) {
    //                tedu.notify('Xóa thành công', 'success');
    //                tedu.stopLoading();
    //                loadTableHsBoHoSoFile();
    //            },
    //            error: function (status) {
    //                tedu.notify('Xóa file hồ sơ lỗi! Kiểm tra lại.', 'error');
    //                tedu.stopLoading();
    //            }
    //        });
    //    });
    //}

}