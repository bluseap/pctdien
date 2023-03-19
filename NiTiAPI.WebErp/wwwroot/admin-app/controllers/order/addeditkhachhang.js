
var addeditKhachHangController = function () {

    var userName = $("#hidUserName").val();

    this.clearaddeditKhachHang = function () {
        clearaddeditKhachHang();
    }

    this.loadTableTenKhachHang = function () {
        loadTableTenKhachHang(true);
    }

    this.initialize = function () {

        registerEvents();

    }

    function registerEvents() {

        formMainValidate();

        $("#txtOrderTenKhachHang").on('change', function () {
            loadTableTenKhachHang(true);
        });

        $("#txtOrderSoDienThoai").on('change', function () {
            loadTableTenKhachHang(true);
        });

        $("#btnTimEditOrder").on('click', function () {
            loadTableTenKhachHang(true);
        });

        $("#ddl-show-TenKhachHang").on('change', function () {
            niti.configs.pageSize = $(this).val();
            niti.configs.pageIndex = 1;
            loadTableTenKhachHang(true);
        });

        $("#btnSaveEditOrder").on('click', function () {
            var insKhachHang = $('#hidInsertUpdateOrderId').val();
            if (insKhachHang == 1) {
                insertKhachHang();
            }
            else if (insKhachHang == 2) {
                updateKhachHang();
            }
        });

        $('body').on('click', '.btn-addeditTenKhachHang', function (e) {
            e.preventDefault();
            var orderId = $(this).data('id');
            $('#hidOrderId').val(orderId);
            // 2 - Update Order
            $('#hidInsertUpdateOrderId').val(2);
            loadEditKhachHang(orderId);
        });

        $('body').on('click', '.btn-ChonKhachHang', function (e) {
            e.preventDefault();
            var orderId = $(this).data('id');
            $('#hidOrderId').val(orderId);
            
            $('#hidInsertUpdateOrderId').val(3);
            loadChonKhachHangToOrderDetails(orderId);
        });

    }

    function clearaddeditKhachHang() {
        $('#txtOrderTenKhachHang').val('');
        $('#txtOrderSoDienThoai').val('');
        $('#txtOrderDiaChiKhachHang').val('');
    }

    function loadTableTenKhachHang(isPageChanged) {
        var template = $('#table-templateTenKhachHang').html();
        var render = "";

        var khuvuc = $('#ddlCorporation').val();
        var tenkh = $('#txtOrderTenKhachHang').val();
        var sdt = $('#txtOrderSoDienThoai').val();

        $.ajax({
            type: 'GET',
            url: '/admin/order/ListTenKH',
            data: {
                corporationId: khuvuc,
                tenkhachhang: tenkh,
                sodienthoai: sdt,
                pageIndex: niti.configs.pageIndex,
                pageSize: niti.configs.pageSize
            },
            dataType: 'json',
            success: function (response) {
                if (response.Items.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Items, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,

                            CustomerName: item.CustomerName,
                            CustomerAddress: item.CustomerAddress,
                            CustomerPhone: item.CustomerPhone
                            //TTDonDangKyNuoc: nguyen.getTTDonDangKyNuoc(item.TTDonDangKyNuoc)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                $('#lbTenKhachHangTotalRecords').text(response.TotalRow);

                if (render !== '') {
                    $('#tbl-contentTenKhachHang').html(render);
                }

                if (response.TotalRow !== 0) {
                    wrapPagingTenKhachHang(response.TotalRow, function () {
                        loadTableTenKhachHang();
                    },
                        isPageChanged);
                }
            },
            error: function (status) {
                console.log(status);
                niti.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }
    function wrapPagingTenKhachHang(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / niti.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULTenKhachHang a').length === 0 || changePageSize === true) {
            $('#paginationULTenKhachHang').empty();
            $('#paginationULTenKhachHang').removeData("twbs-pagination");
            $('#paginationULTenKhachHang').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULTenKhachHang').twbsPagination({
            totalPages: totalsize,
            visiblePages: 7,
            first: '< ',
            prev: '<< ',
            next: '>> ',
            last: '> ',
            onPageClick: function (event, p) {
                if (niti.configs.pageIndex !== p) {
                    niti.configs.pageIndex = p;
                    setTimeout(callBack(), 200);
                }
            }
        });
    }

    function isFormMainValidate() {
        if ($('#frmMainEditOrder').valid()) {
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
        $('#frmMainEditOrder').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {                
                txtOrderTenKhachHang: {
                    required: true,
                },
                txtOrderSoDienThoai: {
                    required: true,
                },
                txtOrderDiaChiKhachHang: {
                    required: true,                    
                },
                
            },
            //messages: {
            //    txtTrichYeu: { required: "Nhập nội dung trích yếu của văn bản.." }
            //}
        });
    }

    function loadEditKhachHang(orderId) {
        
        $.ajax({
            type: "GET",
            url: "/Admin/order/GetId",
            data: {
                id: orderId
            },
            dataType: "json",
            beforeSend: function () {
                niti.startLoading();
            },
            success: function (response) {
                var order = response;

                clearaddeditKhachHang();

                $("#hidOrderId").val(orderId);

                $("#txtOrderTenKhachHang").val(order.CustomerName);
                $("#txtOrderSoDienThoai").val(order.CustomerPhone);
                $("#txtOrderDiaChiKhachHang").val(order.CustomerAddress);
                
                niti.stopLoading();
            },
            error: function () {
                niti.notify('Có lỗi xảy ra', 'error');
                niti.stopLoading();
            }
        });
    }

    function insertKhachHang() {
        var orderid = $('#hidOrderId').val();     

        var khuvuc = $('#ddlCorporation').val(); 

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var tenkh = $('#txtOrderTenKhachHang').val();
            var dienthoai = $('#txtOrderSoDienThoai').val();
            var diachi = $('#txtOrderDiaChiKhachHang').val();

            $.ajax({
                type: "POST",
                url: "/Admin/order/SaveOrder",
                data: {
                    Id: orderid,
                    CorporationId: khuvuc,

                    CustomerName: tenkh,
                    CustomerPhone: dienthoai,
                    CustomerAddress: diachi,

                    createby: userName
                },
                dataType: "json",
                beforeSend: function () {
                    niti.startLoading();                    
                },
                success: function (response) {
                    if (response.Result === false) {
                        niti.notify("Lưu tên khách hàng.", "error");
                    }
                    else {
                        clearaddeditKhachHang();     

                        niti.notify('Lưu tên khách hàng.', 'success');

                        niti.appUserLoginLogger(userName, 'Nhập tên khách hàng');

                        loadTableTenKhachHang(true);                                           

                        niti.stopLoading();
                    }
                },
                error: function () {
                    niti.notify('Có lỗi! Không thể lưu tên khách hàng.', 'error');
                    niti.stopLoading();
                }
            });
        }
    }

    function updateKhachHang() {
        var orderid = $('#hidOrderId').val();

        var khuvuc = $('#ddlCorporation').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var tenkh = $('#txtOrderTenKhachHang').val();
            var dienthoai = $('#txtOrderSoDienThoai').val();
            var diachi = $('#txtOrderDiaChiKhachHang').val();

            $.ajax({
                type: "POST",
                url: "/Admin/order/UpOrder",
                data: {
                    Id: orderid,
                    CorporationId: khuvuc,

                    CustomerName: tenkh,
                    CustomerPhone: dienthoai,
                    CustomerAddress: diachi,

                    updateby: userName
                },
                dataType: "json",
                beforeSend: function () {
                    niti.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        niti.notify("Lưu tên khách hàng.", "error");
                    }
                    else {
                        clearaddeditKhachHang();

                        niti.notify('Lưu tên khách hàng.', 'success');

                        niti.appUserLoginLogger(userName, 'Nhập tên khách hàng');

                        loadTableTenKhachHang(true);

                        niti.stopLoading();
                    }
                },
                error: function () {
                    niti.notify('Có lỗi! Không thể lưu tên khách hàng.', 'error');
                    niti.stopLoading();
                }
            });
        }
    }

    function loadChonKhachHangToOrderDetails(orderId) {
        $.ajax({
            type: "GET",
            url: "/Admin/order/GetId",
            data: {
                id: orderId
            },
            dataType: "json",
            beforeSend: function () {
                niti.startLoading();
            },
            success: function (response) {
                var order = response;                

                $("#hidOrderId").val(orderId);

                $("#txtTenKhachHang").val(order.CustomerName);
                $("#txtDiaChiKhachHang").val(order.CustomerAddress);
                $("#txtSoDienThoai").val(order.CustomerPhone);

                $('#modal-add-edit-EditOrder').modal('hide');

                niti.stopLoading();
            },
            error: function () {
                niti.notify('Có lỗi xảy ra', 'error');
                niti.stopLoading();
            }
        });
    }

}