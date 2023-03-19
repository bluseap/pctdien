var addedithsnhomhsController = function () {

    var userName = $("#hidUserName").val();

    this.loadEditHsKeTuBao = function (hsnhomhsid) {
        loadEditHsNhomHs(hsnhomhsid);
    }

    this.loadTableHsNhomHs = function () {
        loadTableHsNhomHs(true);
    }

    this.addeditClearData = function () {
        addeditClearData();
    }

    this.initialize = function () {
        registerEvents();
        addeditClearData();
    }

    function registerEvents() {

        formMainValidate();        

        $('#btnSaveHsHsNhomHs').on('click', function () {
            var ishsnhomohs = $('#hidInsertHsNhomHsId').val(); // 1: insert; 2: update; 

            if (ishsnhomohs == "1") {
                saveHsNhomHs();
            } else if (ishsnhomohs == "2") {
                updateHsNhomHs();
            }
        });
    }

    function addeditClearData() {
        //var datenow = new Date();

        $('#hidHsNhomHsId').val(0);
        $('#hidInsertHsNhomHsId').val(0);

        $("#txtTenNhom").val('');
        $("#txtSttNhom").val(0);
        
    }

    function isFormMainValidate() {
        if ($('#frmMainHsNhomHs').valid()) {
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
        $('#frmMainHsNhomHs').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                txtTenNhom: { required: true },
                txtSttNhom: {
                    required: true,                   
                },                
                //txtNgayDeNghiCungCapDichVu: {
                //    required: true,
                //    isDateVietNam: true
                //},                  
                //ddlCoQuanBanHanh: {
                //    required: true,
                //    isDanhMuc: true
                //},         
            },
            //messages: {
            //    txtTrichYeu: { required: "Nhập nội dung trích yếu của văn bản.." }
            //}
        });
    }
    
    function loadTableHsNhomHs(isPageChanged) {
        var template = $('#table-HsNhomHs').html();
        var render = "";

        var makhuvuc = $('#ddlKhuVuc').val();        
        //var timnoidung = $('#txtTimNoiDung').val();

        $.ajax({
            type: 'GET',
            url: '/admin/HsNhomHs/ListNhomHs',
            data: {
                corporationId: makhuvuc,
                phongdanhmucId: '',
                keyword: '',
                page: tedu.configs.pageIndex,
                pageSize: tedu.configs.pageSize
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.Results.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result.Results, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,
                            TenKhuVuc: item.TenKhuVuc,
                            Ten: item.Ten,                            
                            SttNhom: item.SttNhom,                               
                            Status: tedu.getHoSoLuuTru(item.Status)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                $('#lbHsNhomHsTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentHsNhomHs').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingHsNhomHs(response.Result.RowCount, function () {
                        loadTableHsNhomHs();
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
    function wrapPagingHsNhomHs(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULHsNhomHs a').length === 0 || changePageSize === true) {
            $('#paginationULHsNhomHs').empty();
            $('#paginationULHsNhomHs').removeData("twbs-pagination");
            $('#paginationULHsNhomHs').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULHsNhomHs').twbsPagination({
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

    function loadEditHsNhomHs(hsnhomhsId) {
        $.ajax({
            type: "GET",
            url: "/Admin/HsNhomHs/GetNhomHs",
            data: {
                hsnhomhsid: hsnhomhsId
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var nhomhs = response.Result;

                addeditClearData();

                $('#hidHsNhomHsId').val(nhomhs.Id);
                $('#hidInsertHsNhomHsId').val(2);  // 1: insert; 2: update

                $("#ddlAddEditKhuVuc").val(nhomhs.CorporationId);
                $("#txtTenNhom").val(nhomhs.Ten); 
                $("#txtSttNhom").val(nhomhs.SttNhom);
                
                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function saveHsNhomHs() {
        var hsnhomhsid = $('#hidHsNhomHsId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var makv = $("#ddlAddEditKhuVuc").val();
            
            var tenhom = $("#txtTenNhom").val();
            var sttnhom = $("#txtSttNhom").val();           

            $.ajax({
                type: "POST",
                url: "/Admin/HsNhomHs/Create",
                data: {
                    Id: hsnhomhsid,

                    CorporationId: makv,                   

                    Ten: tenhom,
                    SttNhom: sttnhom                    
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Nhóm hồ sơ.", "error");
                    }
                    else {
                        tedu.notify('Lưu Nhóm hồ sơ.', 'success');

                        loadTableHsNhomHs(true);

                        addeditClearData();

                        $('#modal-add-edit-HsNhomHs').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu Nhóm hồ sơ.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function updateHsNhomHs() {
        var hsnhomhsid = $('#hidHsNhomHsId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var makv = $("#ddlAddEditKhuVuc").val();

            var tenhom = $("#txtTenNhom").val();
            var sttnhom = $("#txtSttNhom").val();

            $.ajax({
                type: "POST",
                url: "/Admin/HsNhomHs/Update",
                data: {
                    Id: hsnhomhsid,

                    CorporationId: makv,

                    Ten: tenhom,
                    SttNhom: sttnhom
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Nhóm hồ sơ.", "error");
                    }
                    else {
                        tedu.notify('Lưu Nhóm hồ sơ.', 'success');

                        loadTableHsNhomHs(true);

                        addeditClearData();

                        $('#modal-add-edit-HsNhomHs').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu Nhóm hồ sơ.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }


}