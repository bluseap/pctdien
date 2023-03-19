var orderController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var addeditorderdetail = new addeditorderdetailController();
    var addeditkhachhang = new addeditKhachHangController();
    var gomdon = new gomdonController();
    
    //var addeditOrder = new addeditOrderController();
    //var listOrder = new listOrderController();

    this.initialize = function () {
        loadCorporation();
        loadData();
        registerEvents();

        addeditorderdetail.initialize();
        addeditkhachhang.initialize();
        gomdon.initialize();
        //addeditOrder.initialize();
        //listOrder.initialize();
    }

    function registerEvents() {
        $('#txtFromDate, #txtToDate, #txtTuNgay, #txtDenNgay').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });
        
        $("#btnCreate").on('click', function () {
            $('#hidInsertUpdateOrderDetailsId').val(1);
            $('#modal-add-edit-EditOrderDetails').modal('show');

            var btnThem = document.getElementById("btnThemTTOrderDetails");
            btnThem.style.display = "none";
            var divThem = document.getElementById("divThemTTOrderDetails");
            divThem.style.display = "none";            

            addeditorderdetail.addeditClear();
        });

        $('#txtKeyword').keypress(function (e) {
            if (e.which === 13) {
                e.preventDefault();
                addeditorderdetail.loadTableOrderDetails();
            }
        });

        $("#ddl-show-pageOrders").on('change', function () {
            niti.configs.pageSize = $(this).val();
            niti.configs.pageIndex = 1;
            addeditorderdetail.loadTableOrderDetails();   
        });

        $("#btnSearch").on('click', function () {
            addeditorderdetail.loadTableOrderDetails();
        });

        $('body').on('click', '.btn-addeditOrderDetails', function (e) {
            e.preventDefault();
            var orderidmanhomlive = $(this).data('id');

            var mang = orderidmanhomlive.split("-");
            var orderid = mang[0];
            var manhomlive = mang[1];

            $('#hidOrderDetailsId').val(orderid);

            $('#hidMaNhomLive').val(manhomlive);

            // 2 - Update Order
            $('#hidInsertUpdateOrderDetailsId').val(2);

            var btnThem = document.getElementById("btnThemTTOrderDetails");
            btnThem.style.display = "block";
            var divThem = document.getElementById("divThemTTOrderDetails");
            divThem.style.display = "block";              

            addeditorderdetail.loadEditOrderDetails();
            addeditorderdetail.loadTableTTOrderDetails();
            $('#modal-add-edit-EditOrderDetails').modal('show');
        });

        $('body').on('click', '.btn-InOrderDetails', function (e) {
            e.preventDefault();
            var orderidmanhomlive = $(this).data('id');

            var mang = orderidmanhomlive.split("-");
            var orderid = mang[0];
            var manhomlive = mang[1];

            $('#hidOrderDetailsId').val(orderid);

            $('#hidMaNhomLive').val(manhomlive);
            
            inOrderDetails();
        });

        $('body').on('click', '.btn-deleteOrderDetails', function (e) {
            e.preventDefault();
            var orderdetailsId = $(this).data('id');
            $('#hidOrderDetailsId').val(orderdetailsId);
            deleteOrderDetails();
        });

       

        $("#btnDSOrderDetails").on('click', function () {
            var dieukien = $('#ddlDieuKienDonDang').val();
            if (dieukien == '0') {
                niti.notify('Chọn điều kiện tìm DS đơn hàng.', 'error');
            } else {
                if (dieukien == 'DSLIVE') {
                    addeditorderdetail.loadTableOrderDetailsDieuKien();
                    excelDSOrderDetailsDieuKien(dieukien);
                }
                else {
                    addeditorderdetail.loadTableOrderDetailsDieuKien();
                    InDSOrderDetailsDieuKienDonDi(dieukien);
                }                
            }            
        });

        //$("#btnExcelDSOrderDetails").on('click', function () {
        //    var dieukien = $('#ddlDieuKienDonDang').val();
        //    if (dieukien == '0') {
        //        niti.notify('Chọn điều kiện tìm DS đơn hàng.', 'error');
        //    } else {
        //        //addeditorderdetail.loadTableOrderDetailsDieuKien();
        //    }
        //});

        //$("#btnGomDon").on('click', function () {
        //    $('#modal-add-edit-GomDon').modal('show');            
        //});

        $("#btnExportExcel").on('click', function () {
            //var fromdate = $('#txtFromDate').val();
            //var todate = $('#txtToDate').val();

            //var fromDate = niti.getFormatDateYYMMDD(fromdate);
            //var toDate = niti.getFormatDateYYMMDD(todate);

            //exportExcelOrder(fromDate, toDate);
        });

        

        //$('body').on('click', '.btnEditOrder', function (e) {
        //    e.preventDefault();
        //    var orderId = $(this).data('id');
        //    // 2 - Update Order
        //    $('#hidInsertOrder').val(2);
        //    loadEditOrder(orderId);
        //});

        //$('body').on('click', '.btnListOrder', function (e) {
        //    e.preventDefault();
        //    var ordertId = $(this).data('id');
        //    listOrder.loadTableListOrder(ordertId);
        //    $('#modal-add-editListOrder').modal('show');            
        //});

        //$('body').on('click', '.btnDeleteOrder', function (e) {
        //    e.preventDefault();
        //    var ordertId = $(this).data('id');
        //    deleteOrder(ordertId);
        //});

        

    }

    function loadData() {
        var dateNow = niti.getFormattedDate(new Date());
        $('#txtFromDate').val(dateNow);        
        $('#txtToDate').val(dateNow);

        var render = "<option value='0' >-- Chọn Điều kiện --</option>";
        render += "<option value='DSLIVE' >-- DS Đơn hàng theo ngày Live --</option>";
        render += "<option value='DDONDI' >-- DS Đơn hàng theo ngày Đơn đi --</option>";        
        $('#ddlDieuKienDonDang').html(render);
        $("#ddlDieuKienDonDang")[0].selectedIndex = 0;
    }

    function loadCorporation() {
        return $.ajax({
            type: 'GET',
            url: '/admin/Corporation/GetListCorporations',
            dataType: 'json',
            success: function (response) {
                var choosen = resources["Choose"];
                var render = "<option value='0' >-- " + choosen + " --</option>";
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Name + "</option>";
                });
                $('#ddlCorporation').html(render);
                $('#ddlAddEditCorporation').html(render);
                $('#ddlPTOCorporation').html(render);

                if (userCorporationId !== "1") {
                    $('#ddlCorporation').prop('disabled', true);
                    $('#ddlAddEditCorporation').prop('disabled', true);
                    $('#ddlPTOCorporation').prop('disabled', true);
                }
                else {
                    $('#ddlCorporation').prop('disabled', false);
                    $('#ddlAddEditCorporation').prop('disabled', false);
                    $('#ddlPTOCorporation').prop('disabled', false);
                }

                $("#ddlCorporation")[0].selectedIndex = 1;
                //$("#ddlAddEditCorporation")[0].selectedIndex = 1;
                //$("#ddlPTOCorporation")[0].selectedIndex = 1;

                addeditorderdetail.loadTableOrderDetails();           
            },
            error: function () {
                niti.notify(resources['NotFound'], 'error');
            }
        });
    }

    function loadEditOrder(orderid) {       
        $.ajax({
            type: "GET",
            url: "/Admin/order/GetId",
            data: {
                id: orderid
            },
            dataType: "json",
            beforeSend: function () {
                niti.startLoading();
            },
            success: function (response) {
                var order = response;
               
                $('#hidOrderId').val(order.Id);

                $('#txtAddEditCustomerName').val(order.CustomerName);
                $('#txtAddEditCustomerAddress').val(order.CustomerAddress);
                $('#txtAddEditCustomerEmail').val(order.CustomerEmail);
                $('#txtAddEditCustomerNote').val(order.CustomerNote);
                $('#txtAddEditCustomerPhone').val(order.CustomerPhone);
     
                $('#modal-add-edit').modal('show');
                niti.stopLoading();
            },
            error: function (status) {
                niti.notify(status, 'error');
                niti.stopLoading();
            }
        });
    }

    function deleteOrder(orderid) {
        niti.confirm(resources["DeleteSure"], function () {
            $.ajax({
                type: "POST",
                url: "/Admin/order/DeleteOrder",
                data: {
                    Id: orderid,
                    username: userName
                },
                beforeSend: function () {
                    niti.startLoading();
                },
                success: function (response) {
                    niti.appUserLoginLogger(userName, "Delete Order.");
                    niti.notify(resources["DeleteTableOK"], 'success');
                    niti.stopLoading();
                    addeditOrder.loadTableOrder();    
                },
                error: function (status) {
                    niti.notify('Has an error in deleting progress', 'error');
                    niti.stopLoading();
                }
            });
        });
    }

    function exportExcelOrder(fromDate, toDate) {
        //alert(formDate + ',' + toDate);
        $.ajax({
            type: 'POST',
            url: '/admin/order/ExcelOrderTo',
            data: {
                FromDate: fromDate,
                ToDate: toDate,
                languageId: "vi-VN"
            },
            beforeSend: function () {
                niti.startLoading();
            },
            success: function (response) {
                window.location.href = response;
                niti.stopLoading();
            }
        });
    }
    
    function inOrderDetails() {
        var orderdetailsid = $('#hidOrderDetailsId').val();
        var manhomlive = $('#hidMaNhomLive').val();

        $.ajax({
            type: 'GET',
            url: '/admin/order/InDon',
            data: {
                OrderDetailsId: orderdetailsid,
                MaNhomLive: manhomlive
            },
            async: false,
            dataType: "json",
            beforeSend: function () {
                niti.startLoading();
            },
            success: function (response) {
                niti.appUserLoginLogger(userName, "In Đơn hàng.");

                if (response.length !== 0) {
                    window.open('/Admin/RpDonHangLe/Index', '_blank');
                }
                else {
                    window.open('/Admin/RpDonHangLe/Index', '_blank');
                }
                niti.stopLoading();
            },
        });
    }

    function deleteOrderDetails() {
        var orderdetailsid = $('#hidOrderDetailsId').val();

        niti.confirm('Bạn có chắc chắn xóa bằng này?', function () {
            $.ajax({
                type: "POST",
                url: "/Admin/order/DelOrderDetails",
                data: {
                    orderdetailsId: orderdetailsid,
                    updateBy: userName
                },
                dataType: "json",
                beforeSend: function () {
                    niti.startLoading();
                },
                success: function (response) {
                    niti.notify('Xóa đơn hàng.', 'success');

                    niti.appUserLoginLogger(userName, 'Xóa đơn hàng');

                    addeditorderdetail.loadTableOrderDetails();                 

                    niti.stopLoading();
                },
                error: function (status) {
                    niti.notify('Không có quyền Xóa Đơn hàng! Kiểm tra lại.', 'error');
                    niti.stopLoading();
                }
            });
        });
    }

    function excelDSOrderDetailsDieuKien(dieukien) {
        var khuvuc = $('#ddlCorporation').val();
        var dieukien = $('#ddlDieuKienDonDang').val();
        var tungay = niti.getFormatDateYYMMDD($('#txtTuNgay').val());
        var denngay = niti.getFormatDateYYMMDD($('#txtDenNgay').val());

        $.ajax({
            type: 'GET',
            url: '/admin/order/ExcelODDieuKien',
            data: {
                corporationId: khuvuc,

                DieuKien: dieukien,
                TuNgay: tungay,
                DenNgay: denngay
            },
            async: false,
            dataType: "json",
            beforeSend: function () {
                niti.startLoading();
            },
            success: function (response) {
                niti.appUserLoginLogger(userName, "Danh sách theo ngày live.");

                if (response.length !== 0) {
                    window.open('/Admin/RpDSTheoNgayLive/Index', '_blank');
                }
                else {
                    window.open('/Admin/RpDSTheoNgayLive/Index', '_blank');
                }
                niti.stopLoading();
            },
        });   
    }

    function InDSOrderDetailsDieuKienDonDi(dieukien) {
        var khuvuc = $('#ddlCorporation').val();
        var dieukien = $('#ddlDieuKienDonDang').val();
        var tungay = niti.getFormatDateYYMMDD($('#txtTuNgay').val());
        var denngay = niti.getFormatDateYYMMDD($('#txtDenNgay').val());

        $.ajax({
            type: 'GET',
            url: '/admin/order/InODDieuKienDonDi',
            data: {
                corporationId: khuvuc,

                DieuKien: dieukien,
                TuNgay: tungay,
                DenNgay: denngay
            },
            async: false,
            dataType: "json",
            beforeSend: function () {
                niti.startLoading();
            },
            success: function (response) {
                niti.appUserLoginLogger(userName, "Danh sách theo ngày đơn đi.");

                if (response.length !== 0) {
                    window.open('/Admin/RpDSTheoNgayDonDi/Index', '_blank');
                }
                else {
                    window.open('/Admin/RpDSTheoNgayDonDi/Index', '_blank');
                }
                niti.stopLoading();
            },
        });
    }

}