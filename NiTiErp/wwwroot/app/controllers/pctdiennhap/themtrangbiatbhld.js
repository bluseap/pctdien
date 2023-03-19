var themtrangbiatbhldController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var loaddatatable = new loaddatatableController();

    this.loadTablePCTDienThemTrangBiATBHLD = function () {
        loadTablePCTDienThemTrangBiATBHLD(true);
    }

    this.initialize = function () {
        registerEvents();
        loadEditData();
        ttbatbhldClearData();
    }

    function registerEvents() {
        $('#txtThemTrangBiATBHLDNgayNhap ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        $('body').on('click', '.btn-addeditPCTDienTrangBiATBHLD', function (e) {
            e.preventDefault();
            var pctdanhmuc = $(this).data('id');
            $('#hidPCTDanhMucId').val(pctdanhmuc);
            // 2 - Update Order
            $('#hidInsertThemTrangBiATBHLDLamViec').val(2);

            loadEditPCTDanhMuc(pctdanhmuc);
        });

        $('body').on('click', '.btn-deletePCTDienThemTrangBiATBHLD', function (e) {
            e.preventDefault();
            var pctdanhmuc = $(this).data('id');
            $('#hidPCTDanhMucId').val(pctdanhmuc);

            deletePCTDanhMuc(pctdanhmuc);
        });

        $('#btnSaveEditThemTrangBiATBHLDLuu').on('click', function () {
            var isthemtrangbiatbhld = $('#hidInsertThemTrangBiATBHLDLamViec').val(); // 1: insert; 2: update; 

            if (isthemtrangbiatbhld == "1") {
                saveThemTrangBiATBHLD();
            } else if (isthemtrangbiatbhld == "2") {
                updateThemTrangBiATBHLD();
            }
        });

    }

    function loadEditData() {
        loadMaTrangBiATBHLD();
    }

    function loadMaTrangBiATBHLD() {
        var render = "<option value='DMThietBiATBHLD'>Trang bị an toàn bảo hộ lao động</option>";
        $('#ddlThemNDCTCodeThemTrangBiATBHLD').html(render);
        $("#ddlThemNDCTCodeThemTrangBiATBHLD")[0].selectedIndex = 0;
    }

    function ttbatbhldClearData() {
        var datenow = new Date();

        loaddatatable.loadCodeDanhMucThietBiATBHLD('DMThietBiATBHLD');

        $("#ddlThemNDCTCodeThemTrangBiATBHLD")[0].selectedIndex = 0;
        $("#txtThemTrangBiATBHLDNgayNhap").val(tedu.getFormattedDate(datenow));
        $("#txtThemNDCTTenThemTrangBiATBHLD").val('');
        $("#txtThemNDCTSttThemTrangBiATBHLD").val(1);
    }

    function isFormMainValidate() {
        if ($('#frmMainEditPCTDienThemTrangBiATBHLD').valid()) {
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
        $('#frmMainEditPCTDienThemTrangBiATBHLD').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                ddlThemNDCTCodeThemTrangBiATBHLD: { required: true, isDanhMuc: true },
                txtThemTrangBiATBHLDNgayNhap: { required: true, isDateVietNam: true },
                txtThemNDCTTenThemTrangBiATBHLD: { required: true },
                txtThemNDCTSttThemTrangBiATBHLD: { required: true },
            },
        });
    }

    function loadTablePCTDienThemTrangBiATBHLD(isPageChanged) {
        var template = $('#table-PCTDienThemTrangBiATBHLD').html();
        var render = "";

        var codepctdanhmuccongtac = $('#ddlThemNDCTCodeThemTrangBiATBHLD').val();

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

                $('#lbPCTDienThemTrangBiATBHLDTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentPCTDienThemTrangBiATBHLD').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingPCTDienThemTrangBiATBHLD(response.Result.RowCount, function () {
                        loadTablePCTDienThemTrangBiATBHLD();
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
    function wrapPagingPCTDienThemTrangBiATBHLD(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULPCTDienThemTrangBiATBHLD a').length === 0 || changePageSize === true) {
            $('#paginationULPCTDienThemTrangBiATBHLD').empty();
            $('#paginationULPCTDienThemTrangBiATBHLD').removeData("twbs-pagination");
            $('#paginationULPCTDienThemTrangBiATBHLD').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULPCTDienThemTrangBiATBHLD').twbsPagination({
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

                ttbatbhldClearData();

                $('#txtThemTrangBiATBHLDNgayNhap').val(tedu.getFormattedDate(danhmuc.NgayNhap));
                $('#txtThemNDCTTenThemTrangBiATBHLD').val(danhmuc.TenNoiDung);
                $('#txtThemNDCTSttThemTrangBiATBHLD').val(danhmuc.Stt);

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function saveThemTrangBiATBHLD() {

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var pctdanhmucode = $("#ddlThemNDCTCodeThemTrangBiATBHLD").val();
            var ngaynhap = tedu.getFormatDateYYMMDD($('#txtThemTrangBiATBHLDNgayNhap').val());
            var tennoidung = $("#txtThemNDCTTenThemTrangBiATBHLD").val();
            var sttnoidung = $("#txtThemNDCTSttThemTrangBiATBHLD").val();

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

                        $('#hidInsertThemTrangBiATBHLDLamViec').val(1);

                        tedu.notify('Lưu PCT Danh mục.', 'success');

                        loadTablePCTDienThemTrangBiATBHLD(true);

                        ttbatbhldClearData();

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

    function updateThemTrangBiATBHLD() {
        var pctdanhmucid = $('#hidPCTDanhMucId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var pctdanhmucode = $("#ddlThemNDCTCodeThemTrangBiATBHLD").val();
            var ngaynhap = tedu.getFormatDateYYMMDD($('#txtThemTrangBiATBHLDNgayNhap').val());
            var tennoidung = $("#txtThemNDCTTenThemTrangBiATBHLD").val();
            var sttnoidung = $("#txtThemNDCTSttThemTrangBiATBHLD").val();

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

                        $('#hidInsertThemTrangBiATBHLDLamViec').val(1);

                        tedu.notify('Sửa PCT Danh mục.', 'success');

                        loadTablePCTDienThemTrangBiATBHLD(true);

                        ttbatbhldClearData();

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

        tedu.confirm('Bạn có chắc chắn xóa danh mục này?', function () {
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

                        $('#hidInsertThemTrangBiATBHLDLamViec').val(1);

                        tedu.notify('Xóa PCT Danh mục.', 'success');

                        loadTablePCTDienThemTrangBiATBHLD(true);

                        ttbatbhldClearData();

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