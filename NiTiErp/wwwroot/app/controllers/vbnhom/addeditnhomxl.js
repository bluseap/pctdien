var addeditnhomxlController = function () {

  
    this.loadAddEditNhomXuLy = function (nhomxulyid) {
        loadAddEditNhomXuLy(nhomxulyid);
    }

    this.loadTableNhomXuLy = function () {
        loadTableNhomXuLy();
    }    

    this.initialize = function () {
        loadAddEditData();
        registerEvents();
        ClearData();
    }

    function registerEvents() {       

        formMainValidate();

        $('#btnSaveNhomXuLyVanBan').on('click', function () {
            var isnhomxuly = $('#hidInsertVanBanNhomXuLy').val(); // 1: insert; 2: update

            if (isnhomxuly == 1) {
                saveNhomXuLyVB();
            } else if (isnhomxuly == 2) {
                updateNhomXuLyVB();
            }
            else {
                tedu.notify("Chưa lưu Nhóm Xử lý Văn bản.", "error");
            }
        });

    }

    function ClearData() {
        $('#hidVanBanNhomXuLyId').val(0);
        $('#hidInsertVanBanNhomXuLy').val(0);        

        $("#ddlAddEditKhuVuc")[0].selectedIndex = 1;
        $("#ddlMaNhomXuLy")[0].selectedIndex = 0;
    }

    function loadAddEditData() {

        var manhomxuly = [{ value: "0", ten: "-- Lựa chọn --" },
            { value: "LDPHEDUYET", ten: "Nhóm lãnh đạo phê duyệt" },
            { value: "NTRUONGPHONG", ten: "Nhóm Trưởng, Phó phòng" },
            { value: "NVANTHU", ten: "Nhóm Văn thư - Lưu trữ" },
            { value: "NXULYVBDI", ten: "Nhóm Xử lý VB đi" },
            { value: "NXULYVBDEN", ten: "Nhóm Xử lý VB đến" },
            { value: "LDKYVANBAN", ten: "Nhóm lãnh đạo ký văn bản" }
        ];
        var render = "";
        for (var i = 0; i < manhomxuly.length; i++) {
            render += "<option value='" + manhomxuly[i].value + "'>" + manhomxuly[i].ten + "</option>";
        }
        $('#ddlMaNhomXuLy').html(render);
        $("#ddlMaNhomXuLy")[0].selectedIndex = 0;

    }

    function isFormMainValidate() {
        if ($('#frmNhomXuLyVanBan').valid()) {
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
        $('#frmNhomXuLyVanBan').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {                             
                ddlAddEditKhuVuc: {
                    required: true,
                    isDanhMuc: true
                }, 
                ddlMaNhomXuLy: {
                    required: true,
                    isDanhMuc: true
                },   
            },
            //messages: {
            //    txtTrichYeu: { required: "Nhập nội dung trích yếu của văn bản.." }
            //}
        });
    }

    function loadTableNhomXuLy(isPageChanged) {
        var template = $('#table-NhomXuLyVB').html();
        var render = "";

        var makhuvuc = $('#ddlKhuVuc').val();
        var timnoidung = $('#txtTimNoiDung').val();

        $.ajax({
            type: 'GET',
            data: {
                corporationId: makhuvuc,
                keyword: timnoidung,
                page: tedu.configs.pageIndex,
                pageSize: tedu.configs.pageSize
            },
            url: '/admin/vbnhom/ListNhomXuLy',
            dataType: 'json',
            success: function (response) {
                if (response.Result.Results.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result.Results, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,
                            TenKhuVuc: item.TenKhuVuc,
                            TenNhomXuLy: item.Ten,
                            //HinhNhanVien: item.Image === null ? '<img src="/admin-side/images/user.png?h=90"' : '<img src="' + item.HinhNhanVien + '?h=90" />',
                            Stt: item.Stt,
                            CreateDate: item.CreateDate !== null ? tedu.getFormattedDate(item.CreateDate) : "",
                            Status: tedu.getHoSoNhanVienStatus(item.Status)
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                $('#lblNhomXuLyVBTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentNhomXuLyVB').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingNhomXuLyVB(response.Result.RowCount, function () {
                        loadTableNhomXuLy();
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
    function wrapPagingNhomXuLyVB(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULNhomXuLyVB a').length === 0 || changePageSize === true) {
            $('#paginationULNhomXuLyVB').empty();
            $('#paginationULNhomXuLyVB').removeData("twbs-pagination");
            $('#paginationULNhomXuLyVB').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULNhomXuLyVB').twbsPagination({
            totalPages: totalsize,
            visiblePages: 7,
            first: 'Đầu',
            prev: 'Trước',
            next: 'Tiếp',
            last: 'Cuối',
            onPageClick: function (event, p) {
                //tedu.configs.pageIndex = p;
                //setTimeout(callBack(), 200);
                if (tedu.configs.pageIndex !== p) {
                    tedu.configs.pageIndex = p;
                    setTimeout(callBack(), 200);
                }
            }
        });
    }  

    function loadAddEditNhomXuLy(nhomxulyid) {
        $.ajax({
            type: "GET",
            url: "/Admin/vbnhom/GetId",
            data: { nhomxulyid: nhomxulyid },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var vbnhom = response.Result;

                $('#hidVanBanNhomXuLyId').val(vbnhom.Id);
                $('#hidInsertVanBanNhomXuLy').val(2);

                $('#ddlAddEditKhuVuc').val(vbnhom.CorporationId);
                $('#ddlMaNhomXuLy').val(vbnhom.Code);               

                tedu.stopLoading();
            },
            error: function (status) {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function saveNhomXuLyVB() {                

        var khuvucid = $('#ddlAddEditKhuVuc').val();
        var codenhomxuly = $('#ddlMaNhomXuLy').val();
        var tennhomxuly = $('#ddlMaNhomXuLy option:selected').text();
       

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {          
            $.ajax({
                type: "POST",
                url: "/Admin/vbnhom/Create",
                data: {
                    CorporationId: khuvucid,
                    Code: codenhomxuly,
                    Ten: tennhomxuly
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu nhóm xử lý.", "error");
                    }
                    else {
                        tedu.notify('Lưu nhóm xử lý.', 'success');

                        loadTableNhomXuLy(true);

                        ClearData();

                        $('#modal-add-edit-NhomXuLyVanBan').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể lưu nhóm xử lý.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function updateNhomXuLyVB() {
        var vbnhomxulyId = $('#hidVanBanNhomXuLyId').val();        

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var addeditKhuVuc = $('#ddlAddEditKhuVuc').val();
            var manhomxuly = $('#ddlMaNhomXuLy').val();  
            var tenxuly = $('#ddlMaNhomXuLy option:selected').text();        

            $.ajax({
                type: "POST",
                url: "/Admin/vbnhom/Update",
                data: {
                    Id: vbnhomxulyId,
                    CorporationId: addeditKhuVuc,
                    Code: manhomxuly,
                    Ten: tenxuly
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Sửa Nhóm xử lý.", "error");
                    }
                    else {
                        tedu.notify('Sửa Nhóm xử lý.', 'success');

                        loadTableNhomXuLy(true);

                        ClearData();

                        $('#modal-add-edit-NhomXuLyVanBan').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Sửa Nhóm xử lý.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

}