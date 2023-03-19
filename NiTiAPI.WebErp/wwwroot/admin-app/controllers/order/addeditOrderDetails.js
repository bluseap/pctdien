var addeditorderdetailController = function () {

    var userName = $("#hidUserName").val();    

    var addeditkhachhang = new addeditKhachHangController();

    this.addeditClear = function () {
        addeditClear();
    }

    this.loadTableOrderDetailsDieuKien = function () {
        loadTableOrderDetailsDieuKien(true);
    }

    this.loadEditOrderDetails = function () {
        loadEditOrderDetails();
    }

    this.loadTableTTOrderDetails = function () {
        loadTableTTOrderDetails();
    }

    this.loadTableOrderDetails = function () {
        loadTableOrderDetails(true);
    }

    this.initialize = function () {  
        loadData();
        registerEvents();
        addeditClear();
    }

    function registerEvents() { 

        formMainValidate();
        formMainValidateTTLive();
        formMainValidateTTDonDi();
        formMainValidateTTDonDen();
        formMainValidateTTDonHuy();

        $('#txtNgayLive, #txtNgayDonDi, #txtNgayDonDen, #txtNgayDonDenHuy ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        $("#btnNhapKhachHangMoi").on('click', function () {
            $('#hidInsertUpdateOrderId').val(1);
            $('#modal-add-edit-EditOrder').modal('show');
            addeditkhachhang.clearaddeditKhachHang();
            addeditkhachhang.loadTableTenKhachHang();
        });        

        $('#ckThongTinLive').on('click', function () {
            var ckthongtinlive = document.getElementById('ckThongTinLive');
            if (ckthongtinlive.checked) {
                $('#txtMaLive').prop('disabled', false);
                $('#txtSoMaLive').prop('disabled', false);
                $('#txtNgayLive').prop('disabled', false);
                $('#ddlBuoiLive').prop('disabled', false);
                $('#txtGhiChuLive').prop('disabled', false);
            }
            else {
                $('#txtMaLive').prop('disabled', true);
                $('#txtSoMaLive').prop('disabled', true);
                $('#txtNgayLive').prop('disabled', true);
                $('#ddlBuoiLive').prop('disabled', true);
                $('#txtGhiChuLive').prop('disabled', true);
            }
        });

        $('#ckThongTinDonDi').on('click', function () {
            var ckthongtindondi = document.getElementById('ckThongTinDonDi');
            if (ckthongtindondi.checked) {
                $('#txtMaVanDonDi').prop('disabled', false);
                $('#txtNgayDonDi').prop('disabled', false);
                $('#ddlThongTinShip').prop('disabled', false);
                $('#txtGhiChuDonDi').prop('disabled', false);
            }
            else {
                $('#txtMaVanDonDi').prop('disabled', true);
                $('#txtNgayDonDi').prop('disabled', true);
                $('#ddlThongTinShip').prop('disabled', true);
                $('#txtGhiChuDonDi').prop('disabled', true);
            }
        });

        $('#ckThongTinDonDen').on('click', function () {
            var ckthongtindonden = document.getElementById('ckThongTinDonDen');
            if (ckthongtindonden.checked) {
                $('#txtNgayDonDen').prop('disabled', false);
                $('#txtGhiChuDonDen').prop('disabled', false);                
            }
            else {
                $('#txtNgayDonDen').prop('disabled', true);
                $('#txtGhiChuDonDen').prop('disabled', true);               
            }
        });

        $('#ckThongTinDonDenHuy').on('click', function () {
            var ckthongtindondenhuy = document.getElementById('ckThongTinDonDenHuy');
            if (ckthongtindondenhuy.checked) {
                $('#txtNgayDonDenHuy').prop('disabled', false);
                $('#txtGhiChuDonDenHuy').prop('disabled', false);
            }
            else {
                $('#txtNgayDonDenHuy').prop('disabled', true);
                $('#txtGhiChuDonDenHuy').prop('disabled', true);
            }
        });

        $("#btnSaveEditOrderDetails").on('click', function () {            
            var insorderdetails = $('#hidInsertUpdateOrderDetailsId').val();
            if (insorderdetails == 1) {
                insertOrderDetails();
            }
            else if (insorderdetails == 2) {
                updateOrderDetails();
            }
        });

        $("#btnThemTTOrderDetails").on('click', function () {
            var insorderdetails = $('#hidInsertUpdateOrderDetailsId').val();
            if (insorderdetails == 2) {
                insertTTOrderDetails();
            }            
        });

        $('body').on('click', '.btn-deleteThemTTOrderDetails', function (e) {
            e.preventDefault();
            var orderdetailsId = $(this).data('id');
            $('#hidDeleteOrderDetailsId').val(orderdetailsId);
            deleteTTOrderDetails();
        });

        //$('#ddlThongTinShip').on('change', function () {
        //    var thongtinship = $('#ddlThongTinShip').val();

        //    if (corporationId !== 'PO') {
        //        addeditpokhachhangnuoc.loadTableKhachHangNuoc();
        //        addeditpokhachhangnuoc.loadDotIn();
        //    }
        //});  

    }

    function addeditClear() {
        var datenow = new Date();

        $('#hidOrderDetailsId').val(0);
        //$('#hidInsertUpdateOrderDetailsId').val(0);
        $('#hidOrderId').val(0);
        //$('#hidInsertUpdateOrderId').val(0);

        $('#txtTenKhachHang').val('');
        $('#txtDiaChiKhachHang').val('');
        $('#txtSoDienThoai').val('');
        $('#txtTenSanPham').val('');
        //$("#ddlSanPham")[0].selectedIndex = 0;        

        $('#txtTienTong').val('0');
        $('#txtTienCoc').val('0');

        $("#ddlThongTinShip")[0].selectedIndex = 0;
        $('#txtTienConLai').val('0');

        $('#txtTenKhachHang').prop('disabled', false);
        $('#txtDiaChiKhachHang').prop('disabled', false);
        $('#txtSoDienThoai').prop('disabled', false);
        $('#txtTienTong').prop('disabled', false);
        $('#txtTienConLai').prop('disabled', true);

        var ckthongtinlive = document.getElementById('ckThongTinLive');
        ckthongtinlive.checked = false;
        $('#txtMaLive').val('');
        $('#txtSoMaLive').val('');
        //$('#txtNgayLive').val(niti.getFormattedDate(datenow));
        $('#txtNgayLive').val('');
        $("#ddlBuoiLive")[0].selectedIndex = 0;
        $('#txtGhiChuLive').val('');  
        $('#txtMaLive').prop('disabled', true);
        $('#txtSoMaLive').prop('disabled', true);
        $('#txtNgayLive').prop('disabled', true);
        $('#ddlBuoiLive').prop('disabled', true);
        $('#txtGhiChuLive').prop('disabled', true);        

        var ckthongtindondi = document.getElementById('ckThongTinDonDi');
        ckthongtindondi.checked = false;
        $('#txtMaVanDonDi').val('');
        //$('#txtNgayDonDi').val(niti.getFormattedDate(datenow));
        $('#txtNgayDonDi').val('');
        
        $('#txtGhiChuDonDi').val('');   
        $('#txtMaVanDonDi').prop('disabled', true);
        $('#txtNgayDonDi').prop('disabled', true);
        //$('#ddlThongTinShip').prop('disabled', true);
        $('#txtGhiChuDonDi').prop('disabled', true);
       
        var ckthongtindonden = document.getElementById('ckThongTinDonDen');
        ckthongtindonden.checked = false;
        //$('#txtNgayDonDen').val(niti.getFormattedDate(datenow));
        $('#txtNgayDonDen').val('');
        $('#txtGhiChuDonDen').val('');   
        $('#txtNgayDonDen').prop('disabled', true);
        $('#txtGhiChuDonDen').prop('disabled', true);               

        var ckthongtindondenhuy = document.getElementById('ckThongTinDonDenHuy');
        ckthongtindondenhuy.checked = false;
        //$('#txtNgayDonDenHuy').val(niti.getFormattedDate(datenow));
        $('#txtNgayDonDenHuy').val('');
        $('#txtGhiChuDonDenHuy').val('');
        $('#txtNgayDonDenHuy').prop('disabled', true);
        $('#txtGhiChuDonDenHuy').prop('disabled', true);           
    }

    function loadData() {
        //loadProducts();

        var render = "<option value='0' >-- Chọn thông tin Ship --</option>";
        render += "<option value='MPKS' >-- Miễn phí Ship --</option>";
        render += "<option value='KHTS' >-- Khách hàng trả Ship --</option>";
        $('#ddlThongTinShip').html(render);
        $("#ddlThongTinShip")[0].selectedIndex = 0;

        var render = "<option value='0' >-- Chọn buổi Live --</option>";
        render += "<option value='TOI' >-- Tối --</option>";
        render += "<option value='TRUA' >-- Trưa --</option>";
        render += "<option value='SANG' >-- Sáng --</option>";
        $('#ddlBuoiLive').html(render);
        $("#ddlBuoiLive")[0].selectedIndex = 0;

        var btnThem = document.getElementById("btnThemTTOrderDetails");
        btnThem.style.display = "none";
        var divThem = document.getElementById("divThemTTOrderDetails");
        divThem.style.display = "none";        
    }

    //function loadProducts() {
    //    return $.ajax({
    //        type: 'GET',
    //        url: '/order/ListProQuan',            
    //        dataType: 'json',
    //        success: function (response) {
    //            var render = "<option value='0' >--- Chọn Sản phẩm ---</option>";
    //            $.each(response, function (i, item) {
    //                // Get list [ProductQuantities]
    //                render += "<option value='" + item.Id + "'>" + item.TenSanPham + '-' + item.MauSanPham
    //                    + '-' + item.GiaSanPham + "</option>";
    //            });
    //            $('#ddlSanPham').html(render);
    //            $("#ddlSanPham")[0].selectedIndex = 0;
    //        },
    //        error: function () {
    //            tedu.notify('Không có danh mục Huyện / Thành Phố.', 'error');
    //        }
    //    });
    //}

    function loadTableOrderDetails(isPageChanged) {
        var template = $('#table-templateOrder').html();
        var render = "";

        var khuvuc = $('#ddlCorporation').val();
        var tim = $('#txtKeyword').val();              

        $.ajax({
            type: 'GET',
            url: '/admin/order/ListGroupOD',//ListOrderDetails',
            data: {
                corporationId: khuvuc,
                tukhoa: tim,                
                pageIndex: niti.configs.pageIndex,
                pageSize: niti.configs.pageSize
            },
            dataType: 'json',
            success: function (response) {
                if (response.Items.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Items, function (i, item) {
                        render += Mustache.render(template, {  
                            OrderId: item.Id,                           

                            CustomerName: item.TenKhachHang,
                            CustomerAddress: item.DiaChiKhachHang,
                            CustomerPhone: item.SoDienThoai,
                            ProductName: item.ProductName,

                            MaNhomLive: item.OrderId +
                                (item.NgayDatLive == "0001-01-01T00:00:00" ? '' : niti.getFormattedDate(item.NgayDatLive)) +
                                item.MaBuoiLve,

                            NgayGomDon: item.NgayGomDon === "0001-01-01T00:00:00" ? '' : niti.getFormattedDate(item.NgayGomDon) ,

                            SoLuongSanPham: item.SoLuongSanPham,
                            TienTong: niti.formatNumber(item.TienTong, 0),
                            TienCoc: niti.formatNumber(item.TienCoc, 0),
                            NgayDatLive: niti.getFormattedDate(item.NgayDatLive == "0001-01-01T00:00:00" ? '' : item.NgayDatLive) + '-' + (item.TenBuoiLive !== 'null' ? item.TenBuoiLive : ''),
                            NgayDonDi: niti.getFormattedDate(item.NgayDonDi == "0001-01-01T00:00:00" ? '' : item.NgayDonDi),
                            MaDonDi: item.MaDonDi,
                            GhiChuDonDi: item.GhiChuDonDi,

                            NgayDonDen: item.NgayDonDen === "0001-01-01T00:00:00" ? '' : niti.getFormattedDate(item.NgayDonDen),
                            GhiChuDonDen: item.GhiChuDonDen,
                            NgayDonDenHuy: item.NgayDonDenHuy === "0001-01-01T00:00:00" ? '' : niti.getFormattedDate(item.NgayDonDenHuy),
                            GhiChuDonDenHuy: item.GhiChuDonDenHuy,

                            TTOrderDetails: niti.getOrderDetails(item.TTOrderDetails)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),
                        });
                    });                    
                }

                $('#lblTotalRecords').text(response.TotalRow);

                if (render !== '') {
                    $('#tbl-contentOrder').html(render);
                }

                if (response.TotalRow !== 0) {
                    wrapPagingOrderDetails(response.TotalRow, function () {
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
    function wrapPagingOrderDetails(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / niti.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULOrder a').length === 0 || changePageSize === true) {
            $('#paginationULOrder').empty();
            $('#paginationULOrder').removeData("twbs-pagination");
            $('#paginationULOrder').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULOrder').twbsPagination({
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
        if ($('#frmMainEditOrderDetails').valid()) {
            return true;
        }
        else {
            return false;
        }
    }
    function formMainValidate() {
        jQuery.validator.addMethod("isDanhMuc", function (value, element) {
            if (value === "0")
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
        $('#frmMainEditOrderDetails').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                ddlTHDKhuVuc: {
                    required: true,
                    isDanhMuc: true
                },
                txtTenSanPham: {
                    required: true,
                }, 
                txtTienTong: {
                    required: true,
                }, 
                txtTienCoc: {
                    required: true,
                },  
                ddlThongTinShip: {
                    required: true,
                    isDanhMuc: true
                },
            },
        });
    }
    function isFormMainValidateTTLive() {
        if ($('#frmMainEditOrderDetails').valid()) {
            return true;
        }
        else {
            return false;
        }
    }
    function formMainValidateTTLive() {
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
        $('#frmMainEditOrderDetails').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                txtMaLive: {
                    required: true,
                },
                txtSoMaLive: {
                    required: true,
                },
                txtNgayLive: {
                    required: true,
                },
            },            
        });
    }
    function isFormMainValidateTTDonDi() {
        if ($('#frmMainEditOrderDetails').valid()) {
            return true;
        }
        else {
            return false;
        }
    }
    function formMainValidateTTDonDi() {
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
        $('#frmMainEditOrderDetails').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                txtMaVanDonDi: {
                    required: true,
                },
                txtNgayDonDi: {
                    required: true,
                },
                ddlThongTinShip: {
                    required: true,
                    isDanhMuc: true
                },
            },
        });
    }
    function isFormMainValidateTTDonDen() {
        if ($('#frmMainEditOrderDetails').valid()) {
            return true;
        }
        else {
            return false;
        }
    }
    function formMainValidateTTDonDen() {
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
        $('#frmMainEditOrderDetails').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                txtNgayDonDen: {
                    required: true,
                },                
            },
        });
    }
    function isFormMainValidateTTDonHuy() {
        if ($('#frmMainEditOrderDetails').valid()) {
            return true;
        }
        else {
            return false;
        }
    }
    function formMainValidateTTDonHuy() {
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
        $('#frmMainEditOrderDetails').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                txtNgayDonDenHuy: {
                    required: true,
                },
            },
        });
    }

    function insertOrderDetails() {
        var orderdetailsid = $('#hidOrderDetailsId').val();

        var orderid = $('#hidOrderId').val();        

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var datenow = new Date();

            var tensanpam = $('#txtTenSanPham').val();  
            //var sanpam = $('#ddlSanPham').val();  
            var tientong = $("#txtTienTong").val();
            var tiencoc = $("#txtTienCoc").val();  
            var thongtinship = $('#ddlThongTinShip').val();
            var tienconlai = parseInt($("#txtTienConLai").val());  

            var malive, somalive, ngaylive, buoilive, ghichulive;
            var madondi, ngaydondi, ghichudondi;
            var ngaydonden, ghichudonden, ngaydondenhuy, ghichudondenhuy;

            var ckTTLive = document.getElementById('ckThongTinLive').checked;
            var isMainValidatelive = isFormMainValidateTTLive();
            if (isMainValidatelive == true && ckTTLive == true) {
                malive = $('#txtMaLive').val();
                somalive = $('#txtSoMaLive').val();
                ngaylive = niti.getFormatDateYYMMDD($('#txtNgayLive').val());
                buoilive = $('#ddlBuoiLive').val();
                ghichulive = $('#txtGhiChuLive').val();
            }
            else {
                malive = $('#txtMaLive').val();
                somalive = $('#txtSoMaLive').val();
                ngaylive = niti.getFormatDateYYMMDD(niti.getFormattedDate(datenow));
                buoilive = $('#ddlBuoiLive').val();
                ghichulive = $('#txtGhiChuLive').val();
            }

            var ckTTDonDi = document.getElementById('ckThongTinDonDi').checked;
            var isMainValidatedondi = isFormMainValidateTTDonDi();
            if (isMainValidatedondi == true && ckTTDonDi == true) {
                madondi = $('#txtMaVanDonDi').val();
                ngaydondi = niti.getFormatDateYYMMDD($('#txtNgayDonDi').val());                
                ghichudondi = $('#txtGhiChuDonDi').val();
            }
            else {
                madondi = $('#txtMaVanDonDi').val();
                ngaydondi = niti.getFormatDateYYMMDD(niti.getFormattedDate(datenow));         
                ghichudondi = $('#txtGhiChuDonDi').val();
            }

            var ckTTDonDen = document.getElementById('ckThongTinDonDen').checked;
            var isMainValidatedonden = isFormMainValidateTTDonDen();
            if (isMainValidatedonden == true && ckTTDonDen == true) {
                ngaydonden = niti.getFormatDateYYMMDD($('#txtNgayDonDen').val());
                ghichudonden = $('#txtGhiChuDonDen').val();
            }
            else {
                ngaydonden = niti.getFormatDateYYMMDD(niti.getFormattedDate(datenow));
                ghichudonden = $('#txtGhiChuDonDen').val();
            }

            var ckTTDonDenHuy = document.getElementById('ckThongTinDonDenHuy').checked;
            var isMainValidatedondenhuy = isFormMainValidateTTDonHuy();
            if (isMainValidatedondenhuy == true && ckTTDonDenHuy == true) {
                ngaydondenhuy = niti.getFormatDateYYMMDD($('#txtNgayDonDenHuy').val());
                ghichudondenhuy = $('#txtGhiChuDonDenHuy').val();
            }
            else {
                ngaydondenhuy = niti.getFormatDateYYMMDD(niti.getFormattedDate(datenow));
                ghichudondenhuy = $('#txtGhiChuDonDenHuy').val();
            }

            $.ajax({
                type: "POST",
                url: "/Admin/order/SaveOrderDetails",
                data: {
                    OrderId: orderid,

                    //ProductId: sanpam,
                    TienTong: tientong,
                    TienCoc: tiencoc,

                    ckttlive: ckTTLive,
                    MaDonLive: malive,
                    SoMaDonLive: somalive,
                    NgayDatLive: ngaylive,
                    MaBuoiLve: buoilive,
                    GhiChuLive: ghichulive,
                    
                    ckttdondi: ckTTDonDi,
                    MaDonDi: madondi,
                    NgayDonDi: ngaydondi,
                    MaTienShipKhachHangTra: thongtinship,
                    GhiChuDonDi: ghichudondi,
                  
                    ckttdonden: ckTTDonDen,
                    NgayDonDen: ngaydonden,
                    GhiChuDonDen: ghichudonden,
                   
                    ckttdonhuy: ckTTDonDenHuy,
                    NgayDonDenHuy: ngaydondenhuy,
                    GhiChuDonDenHuy: ghichudondenhuy,

                    tensanphammoi: tensanpam,
                    createby: userName
                },
                dataType: "json",
                beforeSend: function () {
                    niti.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        niti.notify("Lưu đơn hàng.", "error");
                    }
                    else {
                        addeditClear();

                        niti.notify('Lưu đơn hàng.', 'success');

                        niti.appUserLoginLogger(userName, 'Nhập đơn hàng');

                        loadTableOrderDetails(true);

                        $('#modal-add-edit-EditOrderDetails').modal('hide');

                        niti.stopLoading();
                    }
                },
                error: function () {
                    niti.notify('Có lỗi! Không thể lưu đơn hàng.', 'error');
                    niti.stopLoading();
                }
            });
        }
    }

    function updateOrderDetails() {
        var orderdetailsid = $('#hidOrderDetailsId').val();

        var manhomlive = $('#hidMaNhomLive').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var datenow = new Date();

            var tensanpham = $('#txtTenSanPham').val();
            //var sanpam = $('#ddlSanPham').val();
            var tientong = $("#txtTienTong").val();
            var tiencoc = $("#txtTienCoc").val();
            var thongtinship = $('#ddlThongTinShip').val();
            var tienconlai = parseInt($("#txtTienConLai").val());  

            var malive, somalive, ngaylive, buoilive, ghichulive;
            var madondi, ngaydondi, ghichudondi;
            var ngaydonden, ghichudonden, ngaydondenhuy, ghichudondenhuy;

            var ckTTLive = document.getElementById('ckThongTinLive').checked;
            var isMainValidatelive = isFormMainValidateTTLive();
            if (isMainValidatelive == true && ckTTLive == true) {
                malive = $('#txtMaLive').val();
                somalive = $('#txtSoMaLive').val();
                ngaylive = niti.getFormatDateYYMMDD($('#txtNgayLive').val());
                buoilive = $('#ddlBuoiLive').val();
                ghichulive = $('#txtGhiChuLive').val();
            }
            else {
                malive = $('#txtMaLive').val();
                somalive = $('#txtSoMaLive').val();
                ngaylive = niti.getFormatDateYYMMDD(niti.getFormattedDate(datenow));
                buoilive = $('#ddlBuoiLive').val();
                ghichulive = $('#txtGhiChuLive').val();
            }

            var ckTTDonDi = document.getElementById('ckThongTinDonDi').checked;
            var isMainValidatedondi = isFormMainValidateTTDonDi();
            if (isMainValidatedondi == true && ckTTDonDi == true) {
                madondi = $('#txtMaVanDonDi').val();
                ngaydondi = niti.getFormatDateYYMMDD($('#txtNgayDonDi').val());
                ghichudondi = $('#txtGhiChuDonDi').val();
            }
            else {
                madondi = $('#txtMaVanDonDi').val();
                ngaydondi = niti.getFormatDateYYMMDD(niti.getFormattedDate(datenow));
                ghichudondi = $('#txtGhiChuDonDi').val();
            }

            var ckTTDonDen = document.getElementById('ckThongTinDonDen').checked;
            var isMainValidatedonden = isFormMainValidateTTDonDen();
            if (isMainValidatedonden == true && ckTTDonDen == true) {
                ngaydonden = niti.getFormatDateYYMMDD($('#txtNgayDonDen').val());
                ghichudonden = $('#txtGhiChuDonDen').val();
            }
            else {
                ngaydonden = niti.getFormatDateYYMMDD(niti.getFormattedDate(datenow));
                ghichudonden = $('#txtGhiChuDonDen').val();
            }

            var ckTTDonDenHuy = document.getElementById('ckThongTinDonDenHuy').checked;
            var isMainValidatedondenhuy = isFormMainValidateTTDonHuy();
            if (isMainValidatedondenhuy == true && ckTTDonDenHuy == true) {
                ngaydondenhuy = niti.getFormatDateYYMMDD($('#txtNgayDonDenHuy').val());
                ghichudondenhuy = $('#txtGhiChuDonDenHuy').val();
            }
            else {
                ngaydondenhuy = niti.getFormatDateYYMMDD(niti.getFormattedDate(datenow));
                ghichudondenhuy = $('#txtGhiChuDonDenHuy').val();
            }

            $.ajax({
                type: "POST",
                url: "/Admin/order/UpdateOrderDetails",
                data: {
                    Id: orderdetailsid,
                    orderdetailsId: orderdetailsid,

                    MaNhomLive: manhomlive,

                    //ProductId: sanpam,
                    TienTong: tientong,
                    TienCoc: tiencoc,
                    TienTongKhachHangTra: tienconlai,

                    ckttlive: ckTTLive,
                    MaDonLive: malive,
                    SoMaDonLive: somalive,
                    NgayDatLive: ngaylive,
                    MaBuoiLve: buoilive,
                    GhiChuLive: ghichulive,

                    ckttdondi: ckTTDonDi,
                    MaDonDi: madondi,
                    NgayDonDi: ngaydondi,
                    MaTienShipKhachHangTra: thongtinship,
                    GhiChuDonDi: ghichudondi,

                    ckttdonden: ckTTDonDen,
                    NgayDonDen: ngaydonden,
                    GhiChuDonDen: ghichudonden,

                    ckttdonhuy: ckTTDonDenHuy,
                    NgayDonDenHuy: ngaydondenhuy,
                    GhiChuDonDenHuy: ghichudondenhuy,

                    tensanphammoi: tensanpham,
                    updateby: userName
                },
                dataType: "json",
                beforeSend: function () {
                    niti.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        niti.notify("Lưu đơn hàng.", "error");
                    }
                    else {
                        addeditClear();

                        niti.notify('Lưu đơn hàng.', 'success');

                        niti.appUserLoginLogger(userName, 'Nhập đơn hàng');

                        loadTableOrderDetails(true);

                        $('#modal-add-edit-EditOrderDetails').modal('hide');

                        niti.stopLoading();
                    }
                },
                error: function () {
                    niti.notify('Có lỗi! Không thể lưu đơn hàng.', 'error');
                    niti.stopLoading();
                }
            });
        }
    }

    function loadEditOrderDetails() {
        var orderdetailsid = $('#hidOrderDetailsId').val();

        $.ajax({
            type: "GET",
            url: "/Admin/order/GetOrderDetails",
            data: {
                orderdetailsId: orderdetailsid
            },
            dataType: "json",
            beforeSend: function () {
                niti.startLoading();
            },
            success: function (response) {
                var orderdetail = response;

                addeditClear();

                $('#hidOrderDetailsId').val(orderdetailsid);

                $("#txtTenKhachHang").val(orderdetail.TenKhachHang);
                $("#txtDiaChiKhachHang").val(orderdetail.DiaChiKhachHang);
                $("#txtSoDienThoai").val(orderdetail.SoDienThoai);

                $("#txtTenSanPham").val(orderdetail.ProductName);
                //$("#ddlSanPham").val(orderdetail.ProductQuantitiesId);
                $("#txtTienTong").val(orderdetail.TienTong);
                $("#txtTienCoc").val(orderdetail.TienCoc);
                $("#ddlThongTinShip").val(orderdetail.MaTienShipKhachHangTra);
                $("#txtTienConLai").val(orderdetail.TienTongKhachHangTra);

                $('#txtMaLive').val(orderdetail.MaDonLive);
                $('#txtSoMaLive').val(orderdetail.SoMaDonLive);
                $('#txtNgayLive').val(orderdetail.NgayDatLive !== '0001-01-01T00:00:00' ? niti.getFormattedDate(orderdetail.NgayDatLive) : '');
                $("#ddlBuoiLive").val(orderdetail.MaBuoiLve);
                $("#txtGhiChuLive").val(orderdetail.GhiChuLive);

                $('#txtMaVanDonDi').val(orderdetail.MaDonDi);                
                $('#txtNgayDonDi').val(orderdetail.NgayDonDi !== '0001-01-01T00:00:00' ? niti.getFormattedDate(orderdetail.NgayDonDi) : '');
                $("#txtGhiChuDonDi").val(orderdetail.GhiChuDonDi);
                
                $('#txtNgayDonDen').val(orderdetail.NgayDonDen !== '0001-01-01T00:00:00' ? niti.getFormattedDate(orderdetail.NgayDonDen) : '');
                $("#txtGhiChuDonDen").val(orderdetail.GhiChuDonDen);

                $('#txtNgayDonDenHuy').val(orderdetail.NgayDonDenHuy !== '0001-01-01T00:00:00' ? niti.getFormattedDate(orderdetail.NgayDonDenHuy) : '');
                $("#txtGhiChuDonDenHuy").val(orderdetail.GhiChuDonDenHuy);

                niti.stopLoading();
            },
            error: function () {
                niti.notify('Có lỗi xảy ra', 'error');
                niti.stopLoading();
            }
        });
    }

    function loadTableOrderDetailsDieuKien(isPageChanged) {
        var template = $('#table-templateOrder').html();
        var render = "";

        var khuvuc = $('#ddlCorporation').val();
        var dieukien = $('#ddlDieuKienDonDang').val();
        var tungay = niti.getFormatDateYYMMDD($('#txtTuNgay').val()); 
        var denngay = niti.getFormatDateYYMMDD($('#txtDenNgay').val()); 

        $.ajax({
            type: 'GET',
            url: '/admin/order/ListODDieuKien2',
            data: {
                corporationId: khuvuc,

                DieuKien: dieukien,
                TuNgay: tungay,
                DenNgay: denngay,

                pageIndex: niti.configs.pageIndex,
                pageSize: niti.configs.pageSize
            },
            dataType: 'json',
            success: function (response) {
                if (response.Items.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Items, function (i, item) {
                        render += Mustache.render(template, {
                            OrderId: item.Id,

                            SortNumber: item.SortNumber,

                            CustomerName: item.TenKhachHang,
                            CustomerAddress: item.DiaChiKhachHang,
                            CustomerPhone: item.SoDienThoai,
                            ProductName: item.ProductName,

                            NgayGomDon: item.NgayGomDon === "0001-01-01T00:00:00" ? '' : niti.getFormattedDate(item.NgayGomDon),

                            TienTong: niti.formatNumber(item.TienTong, 0),
                            TienCoc: niti.formatNumber(item.TienCoc, 0),
                            NgayDatLive: niti.getFormattedDate(item.NgayDatLive == "0001-01-01T00:00:00" ? '' : item.NgayDatLive) + '-' + (item.TenBuoiLive !== 'null' ? item.TenBuoiLive : ''),
                            NgayDonDi: niti.getFormattedDate(item.NgayDonDi == "0001-01-01T00:00:00" ? '' : item.NgayDonDi),
                            MaDonDi: item.MaDonDi,
                            GhiChuDonDi: item.GhiChuDonDi,

                            NgayDonDen: item.NgayDonDen === "0001-01-01T00:00:00" ? '' : niti.getFormattedDate(item.NgayDonDen),
                            GhiChuDonDen: item.GhiChuDonDen,
                            NgayDonDenHuy: item.NgayDonDenHuy === "0001-01-01T00:00:00" ? '' : niti.getFormattedDate(item.NgayDonDenHuy),
                            GhiChuDonDenHuy: item.GhiChuDonDenHuy,

                            TTOrderDetails: niti.getOrderDetails(item.TTOrderDetails)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),
                        });
                    });
                }

                $('#lblTongTienHang').text(niti.formatNumber(parseInt(response.TongTienHang), 0)); 
                $('#lblTongTienCoc').text(niti.formatNumber(parseInt(response.TongTienCoc), 0));
                $('#lblTongTienConLai').text(niti.formatNumber(parseInt(response.TongTienConLai), 0));

                $('#lblTotalRecords').text(response.TotalRow);

                if (render !== '') {
                    $('#tbl-contentOrder').html(render);
                }

                if (response.TotalRow !== 0) {
                    wrapPagingOrderDetailsDieuKien(response.TotalRow, function () {
                        loadTableOrderDetailsDieuKien();
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
    function wrapPagingOrderDetailsDieuKien(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / niti.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULOrder a').length === 0 || changePageSize === true) {
            $('#paginationULOrder').empty();
            $('#paginationULOrder').removeData("twbs-pagination");
            $('#paginationULOrder').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULOrder').twbsPagination({
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

    function loadTableTTOrderDetails() {
        var template = $('#table-ThemTTOrderDetails').html();
        var render = "";

        var khuvuc = $('#ddlCorporation').val();
        var tim = $('#hidMaNhomLive').val();

        $.ajax({
            type: 'GET',
            url: '/admin/order/ListTTLiveOrderDetails',
            data: {
                corporationId: khuvuc,
                tukhoa: tim,
                pageIndex: niti.configs.pageIndex,
                pageSize: niti.configs.pageSize
            },
            dataType: 'json',
            success: function (response) {
                if (response.Items.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Items, function (i, item) {
                        render += Mustache.render(template, {
                            OrderId: item.Id,

                            SortNumber: item.SortNumber,

                            CustomerName: item.TenKhachHang,
                            CustomerAddress: item.DiaChiKhachHang,
                            CustomerPhone: item.SoDienThoai,
                            ProductName: item.ProductName,

                            NgayGomDon: item.NgayGomDon === "0001-01-01T00:00:00" ? '' : niti.getFormattedDate(item.NgayGomDon),

                            TienTong: niti.formatNumber(item.TienTong, 0),
                            TienCoc: niti.formatNumber(item.TienCoc, 0),
                            NgayDatLive: niti.getFormattedDate(item.NgayDatLive == "0001-01-01T00:00:00" ? '' : item.NgayDatLive) + '-' + (item.TenBuoiLive !== 'null' ? item.TenBuoiLive : ''),
                            NgayDonDi: niti.getFormattedDate(item.NgayDonDi == "0001-01-01T00:00:00" ? '' : item.NgayDonDi),
                            MaDonDi: item.MaDonDi,
                            GhiChuDonDi: item.GhiChuDonDi,

                            NgayDonDen: item.NgayDonDen === "0001-01-01T00:00:00" ? '' : niti.getFormattedDate(item.NgayDonDen),
                            GhiChuDonDen: item.GhiChuDonDen,
                            NgayDonDenHuy: item.NgayDonDenHuy === "0001-01-01T00:00:00" ? '' : niti.getFormattedDate(item.NgayDonDenHuy),
                            GhiChuDonDenHuy: item.GhiChuDonDenHuy,

                            TTOrderDetails: niti.getOrderDetails(item.TTOrderDetails)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),
                        });
                    });
                }

                //$('#lblTotalRecords').text(response.TotalRow);

                if (render !== '') {
                    $('#tblContentThemTTOrderDetails').html(render);
                }

                //if (response.TotalRow !== 0) {
                //    wrapPagingOrderDetails(response.TotalRow, function () {
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

    function insertTTOrderDetails() {
        var orderdetailsid = $('#hidOrderDetailsId').val();

        var datenow = new Date();

        var tensanpham = $('#txtTenSanPham').val();
        //var sanpam = $('#ddlSanPham').val();
        var tientong = $("#txtTienTong").val();
        var tiencoc = $("#txtTienCoc").val();
        var thongtinship = $('#ddlThongTinShip').val();
        var tienconlai = parseInt($("#txtTienConLai").val());

        $.ajax({
            type: "POST",
            url: "/Admin/order/InTTOD",
            data: {
                Id: orderdetailsid,      

                TenSanPhamMoi: tensanpham,

                //ProductId: sanpam,
                TienTong: tientong,
                TienCoc: tiencoc,
                TienTongKhachHangTra: tienconlai,

                MaTienShipKhachHangTra: thongtinship,

                createby: userName
            },
            dataType: "json",
            beforeSend: function () {
                niti.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    niti.notify("Lưu đơn hàng.", "error");
                }
                else {

                    niti.notify('Lưu đơn hàng.', 'success');

                    niti.appUserLoginLogger(userName, 'Nhập mới trực tiếp đơn hàng');

                    loadTableTTOrderDetails();
                    loadTableOrderDetails(true);

                    niti.stopLoading();
                }
            },
            error: function () {
                niti.notify('Có lỗi! Không thể lưu đơn hàng.', 'error');
                niti.stopLoading();
            }
        });
    }

    function deleteTTOrderDetails() {
        var orderdetailsid = $('#hidDeleteOrderDetailsId').val();
        var orderdetailsid2 = $('#hidOrderDetailsId').val();

        if (orderdetailsid === orderdetailsid2) {
            //niti.notify('Không được xóa sản phẩm đầu tiên.', 'error');
            niti.confirm('Bạn có chắc chắn xóa bằng này?', function () {
                $.ajax({
                    type: "POST",
                    url: "/Admin/order/DelOD01",
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

                        $('#modal-add-edit-EditOrderDetails').modal('hide');
                        loadTableOrderDetails(true);

                        niti.stopLoading();
                    },
                    error: function (status) {
                        niti.notify('Không có quyền Xóa Đơn hàng! Kiểm tra lại.', 'error');
                        niti.stopLoading();
                    }
                });
            });
        }
        else {
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

                        loadTableTTOrderDetails();
                        loadTableOrderDetails(true);

                        niti.stopLoading();
                    },
                    error: function (status) {
                        niti.notify('Không có quyền Xóa Đơn hàng! Kiểm tra lại.', 'error');
                        niti.stopLoading();
                    }
                });
            });
        }
    }

}