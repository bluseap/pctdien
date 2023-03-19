var themnoidungcongtacController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val(); 

    var loaddatatable = new loaddatatableController();

    this.loadTablePCTDienThemNoiDungCongTac = function () {
        loadTablePCTDienThemNoiDungCongTac(true);
    }
   
    this.initialize = function () {
        registerEvents();
        loadEditData();
        tndctClearData();        
    }

    function registerEvents() {
        $('#txtThemNDCTNgayNhap ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });   

        formMainValidate();

        $('body').on('click', '.btn-addeditPCTDienThemNoiDungCongTac', function (e) {
            e.preventDefault();
            var pctdanhmuc = $(this).data('id');
            $('#hidPCTDanhMucId').val(pctdanhmuc);
            // 2 - Update Order
            $('#hidInsertThemNoiDungCongTac').val(2);
            
            loadEditPCTDanhMuc(pctdanhmuc);
        });

        $('body').on('click', '.btn-deletePCTDienThemNoiDungCongTac', function (e) {
            e.preventDefault();
            var pctdanhmuc = $(this).data('id');
            $('#hidPCTDanhMucId').val(pctdanhmuc);            
            
            deletePCTDanhMuc(pctdanhmuc);
        });

        $('#btnSaveEditThemNDCTLuu').on('click', function () {
            var isthemnoidungcongtac = $('#hidInsertThemNoiDungCongTac').val(); // 1: insert; 2: update; 

            if (isthemnoidungcongtac == "1") {
                saveThemNoiDungCongTac();
            } else if (isthemnoidungcongtac == "2") {
                updateThemNoiDungCongTac();
            }
        });

    }    

    function loadEditData() {
        loadMaNoiDungCongTac();
    }   

    function loadMaNoiDungCongTac() {
        var render = "<option value='DMNoiDungCT'>Nội dung công tác</option>";        
        $('#ddlThemNDCTCodeThemNoiDung').html(render);
        $("#ddlThemNDCTCodeThemNoiDung")[0].selectedIndex = 0;
    }

    function tndctClearData() {
        var datenow = new Date();        

        loaddatatable.loadCodeDanhMucNoiDungCongTac('DMNoiDungCT');

        $("#ddlThemNDCTCodeThemNoiDung")[0].selectedIndex = 0;
        $("#txtThemNDCTNgayNhap").val(tedu.getFormattedDate(datenow));
        $("#txtThemNDCTTenThemNoiDung").val('');
        $("#txtThemNDCTSttThemNoiDung").val(1);
    }
  
    function isFormMainValidate() {
        if ($('#frmMainEditPCTDienThemMoiNoiDungCongTac').valid()) {
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
        $('#frmMainEditPCTDienThemMoiNoiDungCongTac').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                ddlThemNDCTCodeThemNoiDung: { required: true, isDanhMuc: true },
                txtThemNDCTNgayNhap: { required: true, isDateVietNam: true },
                txtThemNDCTTenThemNoiDung: { required: true },
                txtThemNDCTSttThemNoiDung: { required: true },                
            },
        });
    }

    function loadTablePCTDienThemNoiDungCongTac(isPageChanged) {
        var template = $('#table-PCTDienThemNoiDungCongTac').html();
        var render = "";

        var codepctdanhmuccongtac = $('#ddlThemNDCTCodeThemNoiDung').val();        

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

                $('#lbPCTDienThemNoiDungCongTacTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentPCTDienThemNoiDungCongTac').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingPCTDienThemNoiDungCongTac(response.Result.RowCount, function () {
                        loadTablePCTDienThemNoiDungCongTac();
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
    function wrapPagingPCTDienThemNoiDungCongTac(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULPCTDienThemNoiDungCongTac a').length === 0 || changePageSize === true) {
            $('#paginationULPCTDienThemNoiDungCongTac').empty();
            $('#paginationULPCTDienThemNoiDungCongTac').removeData("twbs-pagination");
            $('#paginationULPCTDienThemNoiDungCongTac').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULPCTDienThemNoiDungCongTac').twbsPagination({
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

                tndctClearData();

                $('#txtThemNDCTNgayNhap').val(tedu.getFormattedDate(danhmuc.NgayNhap));                
                $('#txtThemNDCTTenThemNoiDung').val(danhmuc.TenNoiDung);
                $('#txtThemNDCTSttThemNoiDung').val(danhmuc.Stt);
                
                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function saveThemNoiDungCongTac() {        

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var pctdanhmucode = $("#ddlThemNDCTCodeThemNoiDung").val();
            var ngaynhap = tedu.getFormatDateYYMMDD($('#txtThemNDCTNgayNhap').val());
            var tennoidung = $("#txtThemNDCTTenThemNoiDung").val();
            var sttnoidung = $("#txtThemNDCTSttThemNoiDung").val();
            
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

                        $('#hidInsertThemNoiDungCongTac').val(1);

                        tedu.notify('Lưu PCT Danh mục.', 'success');

                        loadTablePCTDienThemNoiDungCongTac(true);

                        tndctClearData();
                        
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

    function updateThemNoiDungCongTac() {
        var pctdanhmucid = $('#hidPCTDanhMucId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var pctdanhmucode = $("#ddlThemNDCTCodeThemNoiDung").val();
            var ngaynhap = tedu.getFormatDateYYMMDD($('#txtThemNDCTNgayNhap').val());
            var tennoidung = $("#txtThemNDCTTenThemNoiDung").val();
            var sttnoidung = $("#txtThemNDCTSttThemNoiDung").val();

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

                        $('#hidInsertThemNoiDungCongTac').val(1);

                        tedu.notify('Sửa PCT Danh mục.', 'success');

                        loadTablePCTDienThemNoiDungCongTac(true);

                        tndctClearData();

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

        tedu.confirm('Bạn có chắc chắn xóa nội dung này?', function () {
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
                        nguyen.appUserLoginLogger(userName, "Xóa PCT Danh mục. Id: " + pctdanhmucid );

                        $('#hidInsertThemNoiDungCongTac').val(1);

                        tedu.notify('Xóa PCT Danh mục.', 'success');

                        loadTablePCTDienThemNoiDungCongTac(true);

                        tndctClearData();

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