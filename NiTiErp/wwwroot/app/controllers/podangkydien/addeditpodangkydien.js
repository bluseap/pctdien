var addeditpodangkydienController = function () {

    var userName = $("#hidUserName").val();

    this.loadEditDonDangKyDien = function () {
        loadEditDonDangKyDien();
    }

    this.loadTableDonDangKyDien = function () {
        loadTableDonDangKyDien(true);
    }

    this.initialize = function () {
        registerEvents();
        addeditClearData();
        loadDataAddEdit();
    }

    function registerEvents() {

        $('#txtNgaySinh, #txtCAPNGAY, #txtNGAYDK, #txtNGAYHKS ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        $("#ddlThanhPhoHuyenNuoc").on('change', function () {
            let huyen = $("#ddlThanhPhoHuyenNuoc").val();
            PhuongXa(huyen);           
        });

        $("#ddlTinhKhachHang").on('change', function () {
            let tinh = $("#ddlTinhKhachHang").val();
            HuyenKH(tinh);
        });

        $("#ddlThanhPhoHuyenKhachHang").on('change', function () {
            let huyen = $("#ddlThanhPhoHuyenKhachHang").val();
            PhuongXaKH(huyen);
        });

        $("#ddlHoSoKemTheo").on('change', function () {
            var noidunghosokemtheo = $("#txtNOIDUNG").val();
            var hosokemtheo = ';' + $("#ddlHoSoKemTheo :selected").text();

            var ketquannoidunghosoketheo = noidunghosokemtheo + hosokemtheo;

            $('#txtNOIDUNG').val(ketquannoidunghosoketheo);
        });

        formMainValidate();

        $('#btnSaveEditDONDANGKYPO').on('click', function () {
            var isdondangky = $('#hidInsertDonDangKyMaddkPo').val(); // 1: insert; 2: update; 

            if (isdondangky == "1") {
                saveDonDangKy();
            } else if (isdondangky == "2") {
                updateDonDangKy();
            }
        });

        //$('#ddlAddEditKhuVuc').on('change', function () {
        //    var corporationId = $('#ddlAddEditKhuVuc').val();

        //    loadAddEditPhongKhuVuc(corporationId);
        //    tedu.notify('Danh mục phòng theo khu vực.', 'success');
        //});
        
    }

    function loadDataAddEdit() {
        tinhHuyenXa();
        PhuongXaAll();

        tinhAll();
        quanAll();

        hosoKemTheoNuoc();

        mucDichSuDung("MucDichSudung");
    }

    function tinhHuyenXa() {
        var render = "<option value='89' >Tỉnh An Giang</option>";
        $('#ddlTinhNuoc').html(render);
        $("#ddlTinhNuoc")[0].selectedIndex = 0;

        let tinh = $('#ddlTinhNuoc').val();
        Huyen(tinh);
    }

    function Huyen(tinh) {
        return $.ajax({
            type: 'GET',
            url: '/ttdangkytt/Huyen',
            data: {
                Tinh: tinh
            },
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >--- Chọn Huyện / Thành phố ---</option>";
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenQuanHuyen + "</option>";
                });
                $('#ddlThanhPhoHuyenNuoc').html(render);
                $("#ddlThanhPhoHuyenNuoc")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục Huyện / Thành Phố.', 'error');
            }
        });
    }

    function PhuongXaAll() {
        return $.ajax({
            type: 'GET',
            url: '/ttdangkytt/PhuongXaAll',
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >--- Chọn Phường / Xã ---</option>";
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenPhuongXa + "</option>";
                });
                $('#ddlPhuongXaNuoc').html(render);
                $("#ddlPhuongXaNuoc")[0].selectedIndex = 0;

                $('#ddlPhuongXaKhachHang').html(render);
                $("#ddlPhuongXaKhachHang")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục phường / xã.', 'error');
            }
        });
    }

    function PhuongXa(huyen) {
        return $.ajax({
            type: 'GET',
            url: '/ttdangkytt/PhuongXa',
            data: {
                Huyen: huyen
            },
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >--- Chọn Phường / Xã ---</option>";
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenPhuongXa + "</option>";
                });
                $('#ddlPhuongXaNuoc').html(render);
                $("#ddlPhuongXaNuoc")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục phường / xã.', 'error');
            }
        });
    }

    function PhuongXaKH(huyen) {
        return $.ajax({
            type: 'GET',
            url: '/ttdangkytt/PhuongXa',
            data: {
                Huyen: huyen
            },
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >--- Chọn Phường / Xã ---</option>";
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenPhuongXa + "</option>";
                });
                $('#ddlPhuongXaKhachHang').html(render);
                $("#ddlPhuongXaKhachHang")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục phường / xã.', 'error');
            }
        });
    }

    function tinhAll() {
        return $.ajax({
            type: 'GET',
            url: '/pokhachhangnuoc/ListTinh',
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >--- Chọn tỉnh ---</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenTinh + "</option>";
                });
                $('#ddlTinhKhachHang').html(render);
                $("#ddlTinhKhachHang")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục Tỉnh.', 'error');
            }
        });
    }

    function quanAll() {
        return $.ajax({
            type: 'GET',
            url: '/pokhachhangnuoc/ListQuan',
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >--- Chọn Huyện / Th.phố ---</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenQuanHuyen + "</option>";
                });
                $('#ddlThanhPhoHuyenKhachHang').html(render);
                $('#ddlThanhPhoHuyenKhachHang')[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục Tỉnh.', 'error');
            }
        });
    }

    function HuyenKH(tinh) {
        return $.ajax({
            type: 'GET',
            url: '/ttdangkytt/Huyen',
            data: {
                Tinh: tinh
            },
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >--- Chọn Huyện / Thành phố ---</option>";
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenQuanHuyen + "</option>";
                });
                $('#ddlThanhPhoHuyenKhachHang').html(render);
                $("#ddlThanhPhoHuyenKhachHang")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục Huyện / Thành Phố.', 'error');
            }
        });
    }

    function mucDichSuDung(tencot) {
        return $.ajax({
            type: 'GET',
            url: '/podangkydien/ListMDSDPO',
            data: {
                tenCot: tencot
            },
            dataType: 'json',
            success: function (response) {
                var render;
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.MAMDSDPO + "'>" + item.TENMDSD + "</option>";
                });
                $('#ddlMaMDSD').html(render);
                $("#ddlMaMDSD")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục Mục đích sử dụng.', 'error');
            }
        });
    }

    function hosoKemTheoNuoc() {
        return $.ajax({
            type: 'GET',
            url: '/podangkynuoc/LishHsKemTheo',
            data: {
                tencot: 'HoSoKemTheoPowacoMoi'
            },            
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >--- Chọn Hồ sơ kèm theo ---</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Ten + "</option>";
                });
                $('#ddlHoSoKemTheo').html(render);
                $('#ddlHoSoKemTheo')[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục Hồ sơ kèm theo.', 'error');
            }
        });
    }

    function loadTableDonDangKyDien(isPageChanged) {
        var template = $('#table-DONDANGKYPO').html();
        var render = "";

        var khuvuc = $('#ddlKhuVuc').val();        
        var timnoidung = $('#txtTimNoiDung').val();

        $.ajax({
            type: 'GET',
            url: '/admin/PoDangKyDien/GetListDDKPO',
            data: {
                KhuVuc: khuvuc,
                PhongTo: '',
                keyword: timnoidung,
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
                            MADDKPO: item.MADDKPO,

                            TENKH: item.TENKH,
                            TENKV: item.TENKV,
                            DIACHILD: item.DIACHILD,
                            CMND: item.CMND,
                            DIENTHOAI: item.DIENTHOAI,
                           
                            TTDonDangKyDien: nguyen.getTTDonDangKyNuoc(item.TTDonDangKyDien)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                $('#lbDONDANGKYPOTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentDONDANGKYPO').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingDonDangKyDien(response.Result.RowCount, function () {
                        loadTableDonDangKyDien();
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
    function wrapPagingDonDangKyDien(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULDONDANGKYPO a').length === 0 || changePageSize === true) {
            $('#paginationULDONDANGKYPO').empty();
            $('#paginationULDONDANGKYPO').removeData("twbs-pagination");
            $('#paginationULDONDANGKYPO').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULDONDANGKYPO').twbsPagination({
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

    function addeditClearData() {
        var datenow = new Date();        

        $("#txtTenKhachHang").val('');
        $("#txtNgaySinh").val(tedu.getFormattedDate(datenow));
        $("#txtDIENTHOAI").val('');
        $("#ddlMaMDSD")[0].selectedIndex = 0;
        $("#txtTEN_DC_KHAC").val('');
        $("#txtSOHODN").val('0');  

        $("#txtSONK").val('1');   
        $("#ddlTinhNuoc")[0].selectedIndex = 0;
        $("#ddlThanhPhoHuyenNuoc")[0].selectedIndex = 0;  
        $("#ddlPhuongXaNuoc")[0].selectedIndex = 0;  
        $("#txtTenDuongApTo").val('');
        $("#txtSONHA2").val('');  

        $("#txtCMND").val('');  
        $("#txtCAPNGAY").val(tedu.getFormattedDate(datenow));
        $("#txtTAI").val('');  
        $("#ddlTinhKhachHang")[0].selectedIndex = 0;  
        $("#ddlThanhPhoHuyenKhachHang")[0].selectedIndex = 0;  
        $("#ddlPhuongXaKhachHang")[0].selectedIndex = 0;  

        $("#txtTenDuongKhachHang").val('');  
        $("#txtSoNhaKhachHang").val('');  
        $("#txtMST").val('');  
        $("#txtNGAYDK").val(tedu.getFormattedDate(datenow));
        $("#txtNGAYHKS").val(tedu.getFormattedDate(datenow));
        $("#txtNOILAPDHHN").val('');

        //$("#txtMADPKHGAN_MADBKHGAN").val('');
        //$("#txtTIENCOCLX").val('0');
        //$("#txtTIENVATTULX").val('0');
        $("#txtTENDK").val('');
        $("#txtTENCHUCVU").val('');

        $("#ddlHoSoKemTheo")[0].selectedIndex = 0;  
        $("#txtNOIDUNG").val('');

        $("#txtSoTru").val('');

        $("#txtSoHopDong").val('');
        $("#txtSoNoDongHo").val('');
        $("#txtHoSoGiaoChoTo").val('');
        $("#txtMaDonDangKy").val('');
    }

    function loadEditDonDangKyDien() {
        var madondangky = $("#hidDonDangKyMaddkPo").val();

        $.ajax({
            type: "GET",
            url: "/Admin/podangkydien/GetDKDienId",
            data: {
                DangKyDienId: madondangky
            },
            dataType: "json",

            success: function (response) {
                var dangkynuoc = response;

                addeditClearData();                

                $("#txtTenKhachHang").val(dangkynuoc.TENKH);
                $("#txtNgaySinh").val(dangkynuoc.NGAYSINH !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(dangkynuoc.NGAYSINH) : '');
                $("#txtDIENTHOAI").val(dangkynuoc.DIENTHOAI);
                $("#ddlMaMDSD").val(dangkynuoc.MAMDSDPO);
                $("#txtTEN_DC_KHAC").val(dangkynuoc.TEN_DC_KHAC);
                $("#txtSOHODN").val(dangkynuoc.SOHODN);

                $("#txtSONK").val(dangkynuoc.SONK);
                $("#ddlTinhNuoc").val(dangkynuoc.ThanhPhoTinhIdLD !== null ? dangkynuoc.ThanhPhoTinhIdLD : '0');
                $("#ddlThanhPhoHuyenNuoc").val(dangkynuoc.QuanHuyenIdLD !== null ? dangkynuoc.QuanHuyenIdLD : '0');
                $("#ddlPhuongXaNuoc").val(dangkynuoc.PhuongXaIdLD !== null ? dangkynuoc.PhuongXaIdLD : '0');
                $("#txtTenDuongApTo").val(dangkynuoc.SoNhaTenDuongLD);
                $("#txtSONHA2").val(dangkynuoc.SONHA2);

                $("#txtCMND").val(dangkynuoc.CMND);
                $("#txtCAPNGAY").val(dangkynuoc.CAPNGAY !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(dangkynuoc.CAPNGAY) : '');
                $("#txtTAI").val(dangkynuoc.TAI);
                $("#ddlTinhKhachHang").val(dangkynuoc.ThanhPhoTinhIdKH !== null ? dangkynuoc.ThanhPhoTinhIdKH : '0');
                $("#ddlThanhPhoHuyenKhachHang").val(dangkynuoc.QuanHuyenIdKH !== null ? dangkynuoc.QuanHuyenIdKH : '0');
                $("#ddlPhuongXaKhachHang").val(dangkynuoc.PhuongXaIdKH !== null ? dangkynuoc.PhuongXaIdKH : '0');

                $("#txtTenDuongKhachHang").val(dangkynuoc.TenDuongApToKH);
                $("#txtSoNhaKhachHang").val(dangkynuoc.SoNhaKH);

                $("#txtMST").val(dangkynuoc.MST);
                $("#txtNGAYDK").val(dangkynuoc.NGAYDK !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(dangkynuoc.NGAYDK) : '');
                $("#txtNGAYHKS").val(dangkynuoc.NGAYKS !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(dangkynuoc.NGAYKS) : '');
                $("#txtNOILAPDHHN").val(dangkynuoc.NOILAPDHHN);

                //$("#txtMADPKHGAN_MADBKHGAN").val(dangkynuoc.MADPKHGAN + ',' + dangkynuoc.MADBKHGAN);
                //$("#txtTIENCOCLX").val(dangkynuoc.TIENCOCLX.toString());
                //$("#txtTIENVATTULX").val(dangkynuoc.TIENVATTULX.toString());
                $("#txtTENDK").val(dangkynuoc.TENDK);
                $("#txtTENCHUCVU").val(dangkynuoc.TENCHUCVU);

                //$("#ddlHoSoKemTheo")[0].selectedIndex = 0;
                $("#txtNOIDUNG").val(dangkynuoc.NOIDUNG);

                $("#txtSoTru").val(dangkynuoc.SOTRUPO);

                $("#txtSoHopDong").val(dangkynuoc.SOHD);
                $("#txtSoNoDongHo").val(dangkynuoc.SONO);
                $("#txtHoSoGiaoChoTo").val(dangkynuoc.TenPhongDuyetQuyen);
                $("#txtMaDonDangKy").val(dangkynuoc.MADDK);

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function isFormMainValidate() {
        if ($('#frmMainEditDONDANGKYPO').valid()) {
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
        $('#frmMainEditDONDANGKYPO').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                txtTenKhachHang: { required: true },
                txtNgaySinh: { required: true, isDateVietNam: true },
                ddlMaMDSD: { required: true, isDanhMuc: true },

                ddlTinhNuoc: { required: true, isDanhMuc: true },
                ddlThanhPhoHuyenNuoc: { required: true, isDanhMuc: true },
                ddlPhuongXaNuoc: { required: true, isDanhMuc: true },    
               
            },           
        });
    }

    function saveDonDangKy() {
        var madondangky = $('#hidDonDangKyMaddkPo').val();

        var corporationid = $('#ddlKhuVuc').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
           
            var tenkhachhang = $("#txtTenKhachHang").val();
            var ngaysinh = tedu.getFormatDateYYMMDD($('#txtNgaySinh').val());
            var dienthoai = $("#txtDIENTHOAI").val();
            var mamdsd = $("#ddlMaMDSD").val();
            var ten_dc_khac = $("#txtTEN_DC_KHAC").val();
            var sohodn = $("#txtSOHODN").val();
                       
            var sonk = $("#txtSONK").val();
            var tinhld = $("#ddlTinhNuoc").val();
            var huyenld = $("#ddlThanhPhoHuyenNuoc").val();
            var xald = $("#ddlPhuongXaNuoc").val();
            var sonhatenduongld = $("#txtTenDuongApTo").val();
            var sonha2 = $("#txtSONHA2").val();            

            var cmnd = $("#txtCMND").val();
            var capngay = tedu.getFormatDateYYMMDD($('#txtCAPNGAY').val());
            var tai = $("#txtTAI").val();
            var tinhkh = $("#ddlTinhKhachHang").val();
            var huyenkh = $("#ddlThanhPhoHuyenKhachHang").val();
            var xakh = $("#ddlPhuongXaKhachHang").val();            

            var tenduongkh = $("#txtTenDuongKhachHang").val();  
            var sonhankh = $("#txtSoNhaKhachHang").val();  

            var mst = $("#txtMST").val();
            var ngaydk = $("#txtNGAYDK").val();
            var ngayks = $("#txtNGAYHKS").val();
            var noilapdhhn = $("#txtNOILAPDHHN").val();  

            //var madpkhgan = $("#txtMADPKHGAN_MADBKHGAN").val();             
            var tendk = $("#txtTENDK").val();  
            var tenchucvu = $("#txtTENCHUCVU").val();               

            var noidung = $("#txtNOIDUNG").val();               
           
            var sohd = $("#txtSoHopDong").val();         
            var sono = $("#txtSoNoDongHo").val();         
            var tenphong = $("#txtHoSoGiaoChoTo").val();         
            var maddk = $("#txtMaDonDangKy").val();       

            var sotru = $("#txtSoTru").val();       
           
            $.ajax({
                type: "POST",
                url: "/Admin/podangkydien/SaveDon",
                data: {
                    MADDKPO: madondangky,

                    CorporationId: corporationid,

                    TENKH: tenkhachhang,
                    NGAYSINH: ngaysinh,
                    DIENTHOAI: dienthoai,
                    MAMDSD: mamdsd,
                    TEN_DC_KHAC: ten_dc_khac,
                    SOHODN: sohodn,

                    SONK: sonk,
                    ThanhPhoTinhIdLD: tinhld,
                    QuanHuyenIdLD: huyenld,
                    PhuongXaIdLD: xald,
                    SoNhaTenDuongLD: sonhatenduongld,
                    SONHA2: sonha2,

                    CMND: cmnd,
                    CAPNGAY: capngay,
                    TAI: tai,
                    ThanhPhoTinhIdKH: tinhkh,
                    QuanHuyenIdKH: huyenkh,
                    PhuongXaIdKH: xakh,

                    TenDuongApToKH: tenduongkh,
                    SoNhaKH: sonhankh,

                    MST: mst,
                    NGAYDK: ngaydk,
                    NGAYKS: ngayks,
                    NOILAPDHHN: noilapdhhn,

                    //MADPMADBKHGAN: madpkhgan,
                   
                    TENDK: tendk,
                    TENCHUCVU: tenchucvu,

                    NOIDUNG: noidung,
                    SOHD: sohd,
                    SONO: sono,
                    TenPhong: tenphong,
                    MADDK: maddk,

                    SOTRUPO: sotru
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu đơn đăng ký.", "error");
                    }
                    else {
                        nguyen.appUserLoginLogger(userName, "Lưu đơn đăng ký điện. Tên: " + tenkhachhang);

                        tedu.notify('Lưu đơn đăng ký.', 'success');

                        loadTableDonDangKyDien(true);

                        addeditClearData();

                        $('#modal-add-edit-EditDONDANGKYPO').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu đơn đăng ký.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function updateDonDangKy() {
        var madondangky = $('#hidDonDangKyMaddkPo').val();

        var corporationid = $('#ddlKhuVuc').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {

            var tenkhachhang = $("#txtTenKhachHang").val();
            var ngaysinh = tedu.getFormatDateYYMMDD($('#txtNgaySinh').val());
            var dienthoai = $("#txtDIENTHOAI").val();
            var mamdsd = $("#ddlMaMDSD").val();
            var ten_dc_khac = $("#txtTEN_DC_KHAC").val();
            var sohodn = $("#txtSOHODN").val();

            var sonk = $("#txtSONK").val();
            var tinhld = $("#ddlTinhNuoc").val();
            var huyenld = $("#ddlThanhPhoHuyenNuoc").val();
            var xald = $("#ddlPhuongXaNuoc").val();
            var sonhatenduongld = $("#txtTenDuongApTo").val();
            var sonha2 = $("#txtSONHA2").val();

            var cmnd = $("#txtCMND").val();
            var capngay = tedu.getFormatDateYYMMDD($('#txtCAPNGAY').val());
            var tai = $("#txtTAI").val();
            var tinhkh = $("#ddlTinhKhachHang").val();
            var huyenkh = $("#ddlThanhPhoHuyenKhachHang").val();
            var xakh = $("#ddlPhuongXaKhachHang").val();

            var tenduongkh = $("#txtTenDuongKhachHang").val();
            var sonhankh = $("#txtSoNhaKhachHang").val();

            var mst = $("#txtMST").val();
            var ngaydk = $("#txtNGAYDK").val();
            var ngayks = $("#txtNGAYHKS").val();
            var noilapdhhn = $("#txtNOILAPDHHN").val();

            //var madpkhgan = $("#txtMADPKHGAN_MADBKHGAN").val();             
            var tendk = $("#txtTENDK").val();
            var tenchucvu = $("#txtTENCHUCVU").val();

            var noidung = $("#txtNOIDUNG").val();

            var sohd = $("#txtSoHopDong").val();
            var sono = $("#txtSoNoDongHo").val();
            var tenphong = $("#txtHoSoGiaoChoTo").val();
            var maddk = $("#txtMaDonDangKy").val();

            var sotru = $("#txtSoTru").val();

            $.ajax({
                type: "POST",
                url: "/Admin/podangkydien/UpDon",
                data: {
                    MADDKPO: madondangky,

                    CorporationId: corporationid,

                    TENKH: tenkhachhang,
                    NGAYSINH: ngaysinh,
                    DIENTHOAI: dienthoai,
                    MAMDSD: mamdsd,
                    TEN_DC_KHAC: ten_dc_khac,
                    SOHODN: sohodn,

                    SONK: sonk,
                    ThanhPhoTinhIdLD: tinhld,
                    QuanHuyenIdLD: huyenld,
                    PhuongXaIdLD: xald,
                    SoNhaTenDuongLD: sonhatenduongld,
                    SONHA2: sonha2,

                    CMND: cmnd,
                    CAPNGAY: capngay,
                    TAI: tai,
                    ThanhPhoTinhIdKH: tinhkh,
                    QuanHuyenIdKH: huyenkh,
                    PhuongXaIdKH: xakh,

                    TenDuongApToKH: tenduongkh,
                    SoNhaKH: sonhankh,

                    MST: mst,
                    NGAYDK: ngaydk,
                    NGAYKS: ngayks,
                    NOILAPDHHN: noilapdhhn,

                    //MADPMADBKHGAN: madpkhgan,

                    TENDK: tendk,
                    TENCHUCVU: tenchucvu,

                    NOIDUNG: noidung,
                    SOHD: sohd,
                    SONO: sono,
                    TenPhong: tenphong,
                    MADDK: maddk,

                    SOTRUPO: sotru
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Sửa đơn đăng ký.", "error");
                    }
                    else {
                        nguyen.appUserLoginLogger(userName, "Sửa đơn đăng ký điện. Tên: " + madondangky);

                        tedu.notify('Lưu đơn đăng ký.', 'success');

                        loadTableDonDangKyDien(true);

                        addeditClearData();

                        $('#modal-add-edit-EditDONDANGKYPO').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Sửa đơn đăng ký.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }  

}