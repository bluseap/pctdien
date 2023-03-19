var chuyendiController = function () {

    this.loadTableChuyenKeTuDi = function () {
        chuyendiClearData();
        loadTableChuyenKeTuDi();           
    }

    this.loadChuyenDiPhongBan = function () {
        loadChuyenDiPhongBan();
    }

    this.initialize = function () {
        registerEvents();
        chuyendiClearData();

    }

    function registerEvents() {
        $('#txtNgayChuyenDi ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        $('body').on('click', '.btn-editChuyenHoSoDi', function (e) {
            e.preventDefault();
            var hschuyenketuid = $(this).data('id');

            loadEditHsChuyenKeTu(hschuyenketuid);
        });   

        $('#btnSaveChuyenDi').on('click', function () {
            var isketubao = $('#hidInsertChuyenDiHsKeTuBaoId').val(); // 1: insert; 2: update; 

            if (isketubao == "1") {
                saveHsChuyenKeTu();
            } else if (isketubao == "2") {
                updateHsChuyenKeTu();
            }
        });

        $('body').on('click', '.btn-deleteChuyenHsDi', function (e) {
            e.preventDefault();
            var hschuyenketuid = $(this).data('id');

            deleteHsChuyenKeTu(hschuyenketuid);
        });

        $('#ddlChuyenDiKhuVuc').on('change', function () {
            var corporationId = $('#ddlChuyenDiKhuVuc').val();

            loadChuyenDiPhongBanByKhuVucCu(corporationId);
            tedu.notify('Danh mục phòng theo khu vực.', 'success');
        });

        $('#ddlChuyenDiKhuVucMoi').on('change', function () {
            var corporationId = $('#ddlChuyenDiKhuVucMoi').val();

            loadChuyenDiPhongBanByKhuVucMoi(corporationId);
            tedu.notify('Danh mục phòng theo khu vực.', 'success');
        });
    }

    function chuyendiClearData() {
        var datenow = new Date();

        $('#hidHsChuyenKeTuId').val(0);
        $('#hidInsertChuyenDiHsKeTuBaoId').val(1); // 1: insert; 2: update

        $('#txtChuyenDiMaKeTuBao').val('');
        $('#txtChuyenDiTenKeTuBao').val('');

        $("#ddlChuyenDiKhuVuc")[0].selectedIndex = 0;  
        $("#ddlChuyenDiKhuVucMoi")[0].selectedIndex = 0;  
        loadChuyenDiPhongBan();

        $('#txtNgayChuyenDi').val(tedu.getFormattedDate(datenow));

        $('#txtChuyenDiGhiChu').val('');
    }

    function loadChuyenDiPhongBan() {
        $.ajax({
            type: 'GET',
            url: '/admin/hskebao/ListPhong',
            //data: { makv: makhuvuc },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='%' >-- Lựa chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenPhong + "</option>";
                });
                $('#ddlChuyenDiPhongTo').html(render);
                $('#ddlChuyenDiPhongToMoi').html(render);

                $("#ddlChuyenDiPhongTo")[0].selectedIndex = 0;  
                $("#ddlChuyenDiPhongToMoi")[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    }

    function loadChuyenDiPhongBanByKhuVucCu(makhuvuc) {
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
                $('#ddlChuyenDiPhongTo').html(render);
                $("#ddlChuyenDiPhongTo")[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    }

    function loadChuyenDiPhongBanByKhuVucMoi(makhuvuc) {
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
                $('#ddlChuyenDiPhongToMoi').html(render);
                $("#ddlChuyenDiPhongToMoi")[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    }

    function isFormMainValidate() {
        if ($('#frmMainChuyenDi').valid()) {
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
        $('#frmMainChuyenDi').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                ddlChuyenDiKhuVuc: {
                    required: true,
                    isDanhMuc: true
                },
                ddlChuyenDiPhongTo: {
                    required: true,
                    isDanhMuc: true
                },
                ddlChuyenDiKhuVucMoi: {
                    required: true,
                    isDanhMuc: true
                },
                ddlChuyenDiPhongToMoi: {
                    required: true,
                    isDanhMuc: true
                },
                txtNgayChuyenDi: {
                    required: true,
                    isDateVietNam: true
                },
                //txtSoLuongThucTe: { required: true },     
            },
            //messages: {
            //    txtTrichYeu: { required: "Nhập nội dung trích yếu của văn bản.." }
            //}
        });
    }

    function loadTableChuyenKeTuDi() {
        var template = $('#template-table-ChuyenHsDi').html();
        var render = "";           

        var ketubaoId = $('#hidHsKeTuBaoId').val();

        $.ajax({
            type: 'GET',
            url: '/admin/hskebao/ListBaoChuyenDi',
            data: {
                hsketubaoid: ketubaoId
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,

                            HsKeTuBaoId: item.HsKeTuBaoId,
                            TenKhuVucCu: item.TenKhuVucCu,
                            TenPhongBanCu: item.TenPhongBanCu,
                            TenKhuVucMoi: item.TenKhuVucMoi,
                            TenPhongBanMoi: item.TenPhongBanMoi,                            
                            NgayChuyen: tedu.getFormattedDate(item.NgayChuyen),   
                            LyDoChuyen: item.LyDoChuyen
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                //$('#lbNhapKeBaoTuTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#table-contentChuyenHsDi').html(render);
                }

                loadEditCHuyenDiHsKeTuBao();     
                //if (response.Result.RowCount !== 0) {
                //    wrapPagingHsKeTuBao(response.Result.RowCount, function () {
                //        loadTableHsKeTuBao();
                //    },
                //        isPageChanged);
                //}
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function loadEditCHuyenDiHsKeTuBao() {
        var hsketubaoId = $('#hidHsKeTuBaoId').val();

        $.ajax({
            type: "GET",
            url: "/Admin/hskebao/getketu",
            data: {
                hsketubaoid: hsketubaoId
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var ketubao = response.Result;                   

                $('#txtChuyenDiMaKeTuBao').val(ketubao.MaKeTuBao);
                $('#txtChuyenDiTenKeTuBao').val(ketubao.Ten);

                $("#ddlChuyenDiKhuVuc").val(ketubao.CorporationId);
                $("#ddlChuyenDiPhongTo").val(ketubao.PhongDanhMucId);                

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function loadEditHsChuyenKeTu(hschuyenketuid) {
        $.ajax({
            type: "GET",
            url: "/Admin/hskebao/GetChuyenKe",
            data: {
                HsChuyenKeTuId: hschuyenketuid
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var chuyenketu = response.Result;                

                $('#hidHsKeTuBaoId').val(chuyenketu.HsKeTuBaoId);

                $('#hidHsChuyenKeTuId').val(chuyenketu.Id);
                $('#hidInsertChuyenDiHsKeTuBaoId').val(2);  // 1: insert; 2: update

                $("#ddlChuyenDiKhuVuc").val(chuyenketu.CorporationCuId);
                $("#ddlChuyenDiPhongTo").val(chuyenketu.PhongDanhMucCuId);
                $("#ddlChuyenDiKhuVucMoi").val(chuyenketu.CorporationMoiId);
                $("#ddlChuyenDiPhongToMoi").val(chuyenketu.PhongDanhMucMoiId);
                $("#txtNgayChuyenDi").val(tedu.getFormattedDate(chuyenketu.NgayChuyen));
                $("#txtChuyenDiGhiChu").val(chuyenketu.LyDoChuyen);                

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function saveHsChuyenKeTu() {
        var ketubaoId = $('#hidHsKeTuBaoId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var khuvuccu = $('#ddlChuyenDiKhuVuc').val();  
            var phongbancu = $('#ddlChuyenDiPhongTo').val();  
            var khuvucmoi = $('#ddlChuyenDiKhuVucMoi').val();  
            var phongbanmoi = $('#ddlChuyenDiPhongToMoi').val();  

            var ngaychuyen = tedu.getFormatDateYYMMDD($('#txtNgayChuyenDi').val());
            var ghichu = $('#txtChuyenDiGhiChu').val();            

            $.ajax({
                type: "POST",
                url: "/Admin/hsKeBao/AddChuyen",
                data: {
                    HsKeTuBaoId: ketubaoId,

                    CorporationCuId: khuvuccu,
                    PhongDanhMucCuId: phongbancu,
                    CorporationMoiId: khuvucmoi,
                    PhongDanhMucMoiId: phongbanmoi,

                    NgayChuyen: ngaychuyen,
                    LyDoChuyen: ghichu
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu chuyển kệ tủ bao.", "error");
                    }
                    else {
                        tedu.notify('Lưu chuyển kệ tủ bao.', 'success');

                        loadTableChuyenKeTuDi();

                        chuyendiClearData()();
                        
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu chuyển kệ tủ bao.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function updateHsChuyenKeTu() {
        var chuyenketuId = $('#hidHsChuyenKeTuId').val();
        var ketubaoId = $('#hidHsKeTuBaoId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var khuvuccu = $('#ddlChuyenDiKhuVuc').val();
            var phongbancu = $('#ddlChuyenDiPhongTo').val();
            var khuvucmoi = $('#ddlChuyenDiKhuVucMoi').val();
            var phongbanmoi = $('#ddlChuyenDiPhongToMoi').val();

            var ngaychuyen = tedu.getFormatDateYYMMDD($('#txtNgayChuyenDi').val());
            var ghichu = $('#txtChuyenDiGhiChu').val();

            $.ajax({
                type: "POST",
                url: "/Admin/hsKeBao/UpChuyen",
                data: {
                    Id: chuyenketuId,
                    HsKeTuBaoId: ketubaoId,

                    //CorporationCuId: khuvuccu,
                    //PhongDanhMucCuId: phongbancu,
                    //CorporationMoiId: khuvucmoi,
                    //PhongDanhMucMoiId: phongbanmoi,

                    NgayChuyen: ngaychuyen,
                    LyDoChuyen: ghichu
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu chuyển kệ tủ bao.", "error");
                    }
                    else {
                        tedu.notify('Lưu chuyển kệ tủ bao.', 'success');

                        loadTableChuyenKeTuDi();

                        chuyendiClearData();

                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu chuyển kệ tủ bao.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function deleteHsChuyenKeTu(hschuyenketuid) {

    }


}