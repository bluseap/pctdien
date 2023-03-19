
var gomdonController = function () {

    var userName = $("#hidUserName").val();

    this.initialize = function () {

        registerEvents();

    }

    function registerEvents() {

        $('#txtGomDonTimDon').keypress(function (e) {
            if (e.which === 13) {
                e.preventDefault();
                loadTableGomDonOrderDetails(true);
            }
        });
      
        $("#btnGomDonOrderDetailsTim").on('click', function () {
            loadTableGomDonOrderDetails(true);
        });

        $("#ddl-show-pageGomDonOrderDetails").on('change', function () {
            niti.configs.pageSize = $(this).val();
            niti.configs.pageIndex = 1;
            loadTableGomDonOrderDetails(true);
        });       

        $('body').on('click', '.btn-editGomDonOrderDetails', function (e) {
            e.preventDefault();
            var orderdetailsId = $(this).data('id');
            $('#hidOrderDetailsId').val(orderdetailsId);
            // 2 - Update Order
            $('#hidInsertUpdateOrderDetailsId').val(2);
            loadAddGomDon(orderdetailsId);
        });

        $('body').on('click', '.btn-deleteGomDon', function (e) {
            e.preventDefault();
            var orderdetailsId = $(this).data('id');
            $('#hidOrderDetailsId').val(orderdetailsId);
            // 2 - Update Order ; 3 - Delete Order Details
            $('#hidInsertUpdateOrderDetailsId').val(3);
            deleteGomDon(orderdetailsId);
        });

        $('body').on('click', '.btn-XemLaiGomDonOrderDetails', function (e) {
            e.preventDefault();
            var orderdetailsId = $(this).data('id');
            $('#hidOrderDetailsId').val(orderdetailsId);            
            loadTableGomDon(true);
        });
    }

    function loadTableGomDonOrderDetails(isPageChanged) {
        var template = $('#table-GomDonOrderDetails').html();
        var render = "";

        var khuvuc = $('#ddlCorporation').val();
        var tim = $('#txtGomDonTimDon').val();        

        $.ajax({
            type: 'GET',
            url: '/admin/order/ListOrderDetails',
            data: {
                corporationId: khuvuc,
                tukhoa: tim,
                pageIndex: niti.configs.pageIndex,
                pageSize: niti.configs.pageSize
            },
            dataType: 'json',
            success: function (response) {
                if (response.Items.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Items, function (i, item) {
                        render += Mustache.render(template, {
                            OrderId: item.Id,

                            CustomerName: item.TenKhachHang,                           
                            CustomerPhone: item.SoDienThoai,
                            ProductName: item.ProductName,
                            TienTong: niti.formatNumber(item.TienTong, 0),
                            TienCoc: niti.formatNumber(item.TienCoc, 0),  
                            
                            NgayDatLive: niti.getFormattedDate(item.NgayDatLive == "0001-01-01T00:00:00" ? '' : item.NgayDatLive) + '-' + (item.TenBuoiLive !== 'null' ? item.TenBuoiLive : ''),
                            
                        });
                    });
                }

                $('#lblGomDonOrderDetailsTotalRecords').text(response.TotalRow);

                if (render !== '') {
                    $('#tblContentGomDonOrderDetails').html(render);
                }

                if (response.TotalRow !== 0) {
                    wrapPagingGomDonOrderDetails(response.TotalRow, function () {
                        loadTableOrderDetails();
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
    function wrapPagingGomDonOrderDetails(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / niti.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULGomDonOrderDetails a').length === 0 || changePageSize === true) {
            $('#paginationULGomDonOrderDetails').empty();
            $('#paginationULGomDonOrderDetails').removeData("twbs-pagination");
            $('#paginationULGomDonOrderDetails').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULGomDonOrderDetails').twbsPagination({
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

    function loadAddGomDon(orderdetailsId) {
        //var orderdetailsid = $('#hidOrderDetailsId').val();
        $.ajax({
            type: "POST",
            url: "/Admin/order/UpdateGomDon",
            data: {
                Id: orderdetailsId,

                updateby: userName
            },
            dataType: "json",
            beforeSend: function () {
                niti.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    niti.notify("Update Gom đơn hàng.", "error");
                }
                else {           
                    niti.notify('Update Gom đơn hàng.', 'success');
                    niti.appUserLoginLogger(userName, 'Update Gom đơn hàng');

                    $('#hidOrderDetailsId').val(orderdetailsId);

                    loadTableGomDon(true);                   

                    niti.stopLoading();
                }
            },
            error: function () {
                niti.notify('Có lỗi! Không thể Update Gom đơn hàng.', 'error');
                niti.stopLoading();
            }
        });        
    }

    function deleteGomDon(orderdetailsId) {
        //var orderdetailsid = $('#hidOrderDetailsId').val();
        $.ajax({
            type: "POST",
            url: "/Admin/order/DeleteGomDon",
            data: {
                Id: orderdetailsId,

                updateby: userName
            },
            dataType: "json",
            beforeSend: function () {
                niti.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    niti.notify("Delete Gom đơn hàng.", "error");
                }
                else {
                    niti.notify('Delete Gom đơn hàng.', 'success');
                    niti.appUserLoginLogger(userName, 'Delete Gom đơn hàng');

                    $('#hidOrderDetailsId').val(orderdetailsId);

                    loadTableGomDon(true);

                    niti.stopLoading();
                }
            },
            error: function () {
                niti.notify('Có lỗi! Không thể Delete Gom đơn hàng.', 'error');
                niti.stopLoading();
            }
        }); 
    }

    function loadTableGomDon(isPageChanged) {
        var template = $('#table-GomDon').html();
        var render = "";

        var khuvuc = $('#ddlCorporation').val();
        var orderdetailsid = $('#hidOrderDetailsId').val();

        $.ajax({
            type: 'GET',
            url: '/admin/order/ListGomDon',
            data: {
                corporationId: khuvuc,
                tukhoa: orderdetailsid,
                pageIndex: niti.configs.pageIndex,
                pageSize: niti.configs.pageSize
            },
            dataType: 'json',
            success: function (response) {
                if (response.Items.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Items, function (i, item) {
                        render += Mustache.render(template, {
                            OrderId: item.Id,

                            CustomerName: item.TenKhachHang,
                            CustomerPhone: item.SoDienThoai,
                            ProductName: item.ProductName,
                            TienTong: niti.formatNumber(item.TienTong, 0),
                            TienCoc: niti.formatNumber(item.TienCoc, 0),

                            NgayDatLive: niti.getFormattedDate(item.NgayDatLive == "0001-01-01T00:00:00" ? '' : item.NgayDatLive) + '-' + (item.TenBuoiLive !== 'null' ? item.TenBuoiLive : ''),
                        });
                    });
                }

                //$('#lblGomDonOrderDetailsTotalRecords').text(response.TotalRow);

                if (render !== '') {
                    $('#tblContentGomDon').html(render);
                }

                //if (response.TotalRow !== 0) {
                //    wrapPagingGomDonOrderDetails(response.TotalRow, function () {
                //        loadTableOrderDetails();
                //    },
                //        isPageChanged);
                //}
            },
            error: function (status) {
                console.log(status);
                niti.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    

}