var themcacdonviqlvhController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var loaddatatable = new loaddatatableController();

    this.loadTablePCTDienThemCacDonViQLVH = function () {
        loadTablePCTDienThemCacDonViQLVH(true);
    }

    this.initialize = function () {
        registerEvents();
        loadEditData();
        ClearData();
    }

    function registerEvents() {
        $('#txtThemCacDonViQuanLyVanHanhNgayNhap ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        $('body').on('click', '.btn-addeditPCTDienCacDonViQuanLyVanHanh', function (e) {
            e.preventDefault();
            var pctdanhmuc = $(this).data('id');
            $('#hidPCTDanhMucId').val(pctdanhmuc);
            // 2 - Update Order
            $('#hidInsertThemCacDonViQuanLyVanHanh').val(2);

            loadEditPCTDanhMuc(pctdanhmuc);
        });

        $('body').on('click', '.btn-deletePCTDienThemCacDonViQuanLyVanHanh', function (e) {
            e.preventDefault();
            var pctdanhmuc = $(this).data('id');
            $('#hidPCTDanhMucId').val(pctdanhmuc);

            deletePCTDanhMuc(pctdanhmuc);
        });

        $('#btnSaveEditThemCacDonViQuanLyVanHanhLuu').on('click', function () {
            var isthemcacdonviqlvh = $('#hidInsertThemCacDonViQuanLyVanHanh').val(); // 1: insert; 2: update; 

            if (isthemcacdonviqlvh == "1") {
                saveThemDonViQLVH();
            } else if (isthemcacdonviqlvh == "2") {
                updateThemDonViQLVH();
            }
        });

    }

    function loadEditData() {
        loadMaDieuKienATD();
    }

    function loadMaDieuKienATD() {
        var render = "<option value='DMDonViQLVH'>Đơn vị Quản lý vận hành</option>";
        $('#ddlThemDVQLVHCodeThemCacDonViQuanLyVanHanh').html(render);
        $("#ddlThemDVQLVHCodeThemCacDonViQuanLyVanHanh")[0].selectedIndex = 0;
    }

    function ClearData() {
        var datenow = new Date();

        loaddatatable.loadCodeDanhMucDonViQLVH('DMDonViQLVH');

        $("#ddlThemDVQLVHCodeThemCacDonViQuanLyVanHanh")[0].selectedIndex = 0;
        $("#txtThemCacDonViQuanLyVanHanhNgayNhap").val(tedu.getFormattedDate(datenow));
        $("#txtThemDVQLVHTenThemCacDonViQuanLyVanHanh").val('');
        $("#txtThemDVQLVHSttThemCacDonViQuanLyVanHanh").val(1);
    }

    function isFormMainValidate() {
        if ($('#frmMainEditPCTDienThemCacDonViQuanLyVanHanh').valid()) {
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
        $('#frmMainEditPCTDienThemCacDonViQuanLyVanHanh').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                ddlThemDVQLVHCodeThemCacDonViQuanLyVanHanh: { required: true, isDanhMuc: true },
                txtThemCacDonViQuanLyVanHanhNgayNhap: { required: true, isDateVietNam: true },
                txtThemDVQLVHTenThemCacDonViQuanLyVanHanh: { required: true },
                txtThemDVQLVHSttThemCacDonViQuanLyVanHanh: { required: true },
            },
        });
    }

    function loadTablePCTDienThemCacDonViQLVH(isPageChanged) {
        var template = $('#table-PCTDienThemCacDonViQuanLyVanHanh').html();
        var render = "";

        var codepctdanhmuccongtac = $('#ddlThemDVQLVHCodeThemCacDonViQuanLyVanHanh').val();

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

                $('#lbPCTDienThemCacDonViQuanLyVanHanhTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentPCTDienThemCacDonViQuanLyVanHanh').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingPCTDienThemCacDonViQLVH(response.Result.RowCount, function () {
                        loadTablePCTDienThemCacDonViQLVH();
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
    function wrapPagingPCTDienThemCacDonViQLVH(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULPCTDienThemCacDonViQuanLyVanHanh a').length === 0 || changePageSize === true) {
            $('#paginationULPCTDienThemCacDonViQuanLyVanHanh').empty();
            $('#paginationULPCTDienThemCacDonViQuanLyVanHanh').removeData("twbs-pagination");
            $('#paginationULPCTDienThemCacDonViQuanLyVanHanh').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULPCTDienThemCacDonViQuanLyVanHanh').twbsPagination({
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

                ClearData();

                $('#txtThemCacDonViQuanLyVanHanhNgayNhap').val(tedu.getFormattedDate(danhmuc.NgayNhap));
                $('#txtThemDVQLVHTenThemCacDonViQuanLyVanHanh').val(danhmuc.TenNoiDung);
                $('#txtThemDVQLVHSttThemCacDonViQuanLyVanHanh').val(danhmuc.Stt);

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function saveThemDonViQLVH() {

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var pctdanhmucode = $("#ddlThemDVQLVHCodeThemCacDonViQuanLyVanHanh").val();
            var ngaynhap = tedu.getFormatDateYYMMDD($('#txtThemCacDonViQuanLyVanHanhNgayNhap').val());
            var tennoidung = $("#txtThemDVQLVHTenThemCacDonViQuanLyVanHanh").val();
            var sttnoidung = $("#txtThemDVQLVHSttThemCacDonViQuanLyVanHanh").val();

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

                        $('#hidInsertThemCacDonViQuanLyVanHanh').val(1);

                        tedu.notify('Lưu PCT Danh mục.', 'success');

                        loadTablePCTDienThemCacDonViQLVH(true);

                        ClearData();

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

    function updateThemDonViQLVH() {
        var pctdanhmucid = $('#hidPCTDanhMucId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var pctdanhmucode = $("#ddlThemDVQLVHCodeThemCacDonViQuanLyVanHanh").val();
            var ngaynhap = tedu.getFormatDateYYMMDD($('#txtThemCacDonViQuanLyVanHanhNgayNhap').val());
            var tennoidung = $("#txtThemDVQLVHTenThemCacDonViQuanLyVanHanh").val();
            var sttnoidung = $("#txtThemDVQLVHSttThemCacDonViQuanLyVanHanh").val();

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

                        $('#hidInsertThemCacDonViQuanLyVanHanh').val(1);

                        tedu.notify('Sửa PCT Danh mục.', 'success');

                        loadTablePCTDienThemCacDonViQLVH(true);

                        ClearData();

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

                        $('#hidInsertThemCacDonViQuanLyVanHanh').val(1);

                        tedu.notify('Xóa PCT Danh mục.', 'success');

                        loadTablePCTDienThemCacDonViQLVH(true);

                        ClearData();

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