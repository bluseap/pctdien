var themdieukienatdController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var loaddatatable = new loaddatatableController();

    this.loadTablePCTDienThemDieuKienATD = function () {
        loadTablePCTDienThemDieuKienATD(true);
    }

    this.initialize = function () {
        registerEvents();
        loadEditData();
        tdkatdClearData();
    }

    function registerEvents() {
        $('#txtThemDieuKienATDNgayNhap ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        $('body').on('click', '.btn-addeditPCTDienDieuKienATD', function (e) {
            e.preventDefault();
            var pctdanhmuc = $(this).data('id');
            $('#hidPCTDanhMucId').val(pctdanhmuc);
            // 2 - Update Order
            $('#hidInsertThemDieuKienATD').val(2);

            loadEditPCTDanhMuc(pctdanhmuc);
        });

        $('body').on('click', '.btn-deletePCTDienThemDieuKienATD', function (e) {
            e.preventDefault();
            var pctdanhmuc = $(this).data('id');
            $('#hidPCTDanhMucId').val(pctdanhmuc);

            deletePCTDanhMuc(pctdanhmuc);
        });

        $('#btnSaveEditThemDieuKienATDLuu').on('click', function () {
            var isthemdieukienatd = $('#hidInsertThemDieuKienATD').val(); // 1: insert; 2: update; 

            if (isthemdieukienatd == "1") {
                saveThemDieuKienATD();
            } else if (isthemdieukienatd == "2") {
                updateThemDieuKienATD();
            }
        });

    }

    function loadEditData() {
        loadMaDieuKienATD();
    }

    function loadMaDieuKienATD() {
        var render = "<option value='DMDieuKienATD'>Điều kiện an toàn điện</option>";
        $('#ddlThemNDCTCodeThemDieuKienATD').html(render);
        $("#ddlThemNDCTCodeThemDieuKienATD")[0].selectedIndex = 0;
    }

    function tdkatdClearData() {
        var datenow = new Date();

        loaddatatable.loadCodeDanhMucDieuKienATD('DMDieuKienATD');

        $("#ddlThemNDCTCodeThemDieuKienATD")[0].selectedIndex = 0;
        $("#txtThemDieuKienATDNgayNhap").val(tedu.getFormattedDate(datenow));
        $("#txtThemNDCTTenThemDieuKienATD").val('');
        $("#txtThemNDCTSttThemDieuKienATD").val(1);
    }

    function isFormMainValidate() {
        if ($('#frmMainEditPCTDienThemMoiDieuKienATD').valid()) {
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
        $('#frmMainEditPCTDienThemMoiDieuKienATD').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                ddlThemNDCTCodeThemDieuKienATD: { required: true, isDanhMuc: true },
                txtThemDieuKienATDNgayNhap: { required: true, isDateVietNam: true },
                txtThemNDCTTenThemDieuKienATD: { required: true },
                txtThemNDCTSttThemDieuKienATD: { required: true },
            },
        });
    }

    function loadTablePCTDienThemDieuKienATD(isPageChanged) {
        var template = $('#table-PCTDienThemDieuKienATD').html();
        var render = "";

        var codepctdanhmuccongtac = $('#ddlThemNDCTCodeThemDieuKienATD').val();

        $.ajax({
            type: 'GET',
            url: '/admin/pctdiennhap/ListDMCongTac',
            data: {
                codedanhmuccongtac: codepctdanhmuccongtac,

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
                            Id: item.Id,

                            TenNoiDung: item.TenNoiDung,
                            NgayNhap: tedu.getFormattedDate(item.NgayNhap),
                            Stt: item.Stt
                        });
                    });
                }

                $('#lbPCTDienThemDieuKienATDTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentPCTDienThemDieuKienATD').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingPCTDienThemDieuKienATD(response.Result.RowCount, function () {
                        loadTablePCTDienThemDieuKienATD();
                    },
                        isPageChanged);
                }
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }
    function wrapPagingPCTDienThemDieuKienATD(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULPCTDienThemDieuKienATD a').length === 0 || changePageSize === true) {
            $('#paginationULPCTDienThemDieuKienATD').empty();
            $('#paginationULPCTDienThemDieuKienATD').removeData("twbs-pagination");
            $('#paginationULPCTDienThemDieuKienATD').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULPCTDienThemDieuKienATD').twbsPagination({
            totalPages: totalsize,
            visiblePages: 7,
            first: 'Đầu',
            prev: 'Trước',
            next: 'Tiếp',
            last: 'Cuối',
            onPageClick: function (event, p) {
                if (tedu.configs.pageIndex !== p) {
                    tedu.configs.pageIndex = p;
                    setTimeout(callBack(), 200);
                }
            }
        });
    }

    function loadEditPCTDanhMuc(pctdanhmuc) {
        $.ajax({
            type: "GET",
            url: "/Admin/pctdiennhap/GetDanhMucId",
            data: {
                pctdanhmucid: pctdanhmuc
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var danhmuc = response.Result;

                tdkatdClearData();

                $('#txtThemDieuKienATDNgayNhap').val(tedu.getFormattedDate(danhmuc.NgayNhap));
                $('#txtThemNDCTTenThemDieuKienATD').val(danhmuc.TenNoiDung);
                $('#txtThemNDCTSttThemDieuKienATD').val(danhmuc.Stt);

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function saveThemDieuKienATD() {

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var pctdanhmucode = $("#ddlThemNDCTCodeThemDieuKienATD").val();
            var ngaynhap = tedu.getFormatDateYYMMDD($('#txtThemDieuKienATDNgayNhap').val());
            var tennoidung = $("#txtThemNDCTTenThemDieuKienATD").val();
            var sttnoidung = $("#txtThemNDCTSttThemDieuKienATD").val();

            $.ajax({
                type: "POST",
                url: "/Admin/pctdiennhap/SaveDmNoiDung",
                data: {
                    Code: pctdanhmucode,
                    NgayNhap: ngaynhap,
                    TenNoiDung: tennoidung,
                    Stt: sttnoidung
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu PCT Danh mục.", "error");
                    }
                    else {
                        nguyen.appUserLoginLogger(userName, "Lưu PCT Danh mục. Tên: " + tennoidung);

                        $('#hidInsertThemDieuKienATD').val(1);

                        tedu.notify('Lưu PCT Danh mục.', 'success');

                        loadTablePCTDienThemDieuKienATD(true);

                        tdkatdClearData();

                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu PCT Danh mục.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function updateThemDieuKienATD() {
        var pctdanhmucid = $('#hidPCTDanhMucId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var pctdanhmucode = $("#ddlThemNDCTCodeThemDieuKienATD").val();
            var ngaynhap = tedu.getFormatDateYYMMDD($('#txtThemDieuKienATDNgayNhap').val());
            var tennoidung = $("#txtThemNDCTTenThemDieuKienATD").val();
            var sttnoidung = $("#txtThemNDCTSttThemDieuKienATD").val();

            $.ajax({
                type: "POST",
                url: "/Admin/pctdiennhap/UpdateDmNoiDung",
                data: {
                    Id: pctdanhmucid,

                    Code: pctdanhmucode,
                    NgayNhap: ngaynhap,
                    TenNoiDung: tennoidung,
                    Stt: sttnoidung
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Sửa PCT Danh mục.", "error");
                    }
                    else {
                        nguyen.appUserLoginLogger(userName, "Sửa PCT Danh mục. Id,Tên: " + pctdanhmucid + ',' + tennoidung);

                        $('#hidInsertThemDieuKienATD').val(1);

                        tedu.notify('Sửa PCT Danh mục.', 'success');

                        loadTablePCTDienThemDieuKienATD(true);

                        tdkatdClearData();

                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Sửa PCT Danh mục.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function deletePCTDanhMuc() {
        var pctdanhmucid = $('#hidPCTDanhMucId').val();

        tedu.confirm('Bạn có chắc chắn xóa điều kiện an toàn này?', function () {
            $.ajax({
                type: "POST",
                url: "/Admin/pctdiennhap/DeleteDmNoiDung",
                data: {
                    Id: pctdanhmucid
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Xóa PCT Danh mục.", "error");
                    }
                    else {
                        nguyen.appUserLoginLogger(userName, "Xóa PCT Danh mục. Id: " + pctdanhmucid);

                        $('#hidInsertThemDieuKienATD').val(1);

                        tedu.notify('Xóa PCT Danh mục.', 'success');

                        loadTablePCTDienThemDieuKienATD(true);

                        tdkatdClearData();

                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Xóa PCT Danh mục.', 'error');
                    tedu.stopLoading();
                }
            });
        });

    }

}