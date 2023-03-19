var addeditpokhachhangnuocController = function () {

    var userName = $("#hidUserName").val();

    this.loadEditKhachHangNuoc = function () {
        loadEditKhachHangNuoc();
    }

    this.loadDotIn = function () {
        dotin();
    }

    this.loadTableKhachHangNuoc = function () {
        loadTableKhachHangNuoc(true);
    }

    this.initialize = function () {
        registerEvents();
        loadEditData();
        addeditClearData();
    }

    function registerEvents() {

        $('#txtNgayLapDH, #txtNgayThayDH, #txtKHViPhamNgayTraTien ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        $("#ddlThanhPhoHuyenLD").on('change', function () {
            let huyen = $("#ddlThanhPhoHuyenLD").val();
            PhuongXa(huyen);
            // 883: Long Xuyen thi khong co dang ky dien
            //if (huyen == 883) {
            //    //$('#modal-add-edit-ThongBao').modal('show');
            //    $('#ddlThanhPhoHuyenLD')[0].selectedIndex = 0;
            //} else {
            //    PhuongXa(huyen);
            //}
        });

        $("#ddlTinhKH").on('change', function () {
            let tinh = $("#ddlTinhKH").val();
            HuyenKH(tinh); 
        });

        $("#ddlThanhPhoHuyenKH").on('change', function () {
            let huyen = $("#ddlThanhPhoHuyenKH").val();
            PhuongXaKH(huyen);
        });

        $('#ckKhachHangViPham').on('click', function () {
            var ckTheoNgay = document.getElementById('ckKhachHangViPham');
            if (ckTheoNgay.checked) {
                $('#txtKHViPhamNgayTraTien').prop('disabled', false);
                $('#txtKHViPhamSoTien').prop('disabled', false);
                $('#txtKHViPhamSoTienTra').prop('disabled', false);
                $('#txtKHViPhamTienConLai').prop('disabled', false);
            }
            else {
                $('#txtKHViPhamNgayTraTien').prop('disabled', true);
                $('#txtKHViPhamSoTien').prop('disabled', true);
                $('#txtKHViPhamSoTienTra').prop('disabled', true);
                $('#txtKHViPhamTienConLai').prop('disabled', true);
            }
        });

        //formMainValidate();

        //$('#ddlAddEditKhuVuc').on('change', function () {
        //    var corporationId = $('#ddlAddEditKhuVuc').val();

        //    loadAddEditPhongKhuVuc(corporationId);
        //    tedu.notify('Danh mục phòng theo khu vực.', 'success');
        //});

        //$('#btnSaveHsKeTuBao').on('click', function () {
        //    var isketubao = $('#hidInsertHsKeTuBaoId').val(); // 1: insert; 2: update; 

        //    if (isketubao == "1") {
        //        saveHsKeTuBao();
        //    } else if (isketubao == "2") {
        //        updateHsKeTuBao();
        //    }
        //});
    }

    function loadEditData() {
        tinhHuyenXa();
        PhuongXaAll();

        tinhAll();
        quanAll();

        mucDichSuDung("MucDichSudung");

        thuho();
    }

    function tinhHuyenXa() {
        var render = "<option value='89' >Tỉnh An Giang</option>";
        $('#ddlTinhLD').html(render);
        $("#ddlTinhLD")[0].selectedIndex = 0;

        let tinh = $('#ddlTinhLD').val();
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
                $('#ddlThanhPhoHuyenLD').html(render);
                $("#ddlThanhPhoHuyenLD")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục Huyện / Thành Phố.', 'error');
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
                $('#ddlThanhPhoHuyenKH').html(render);
                $("#ddlThanhPhoHuyenKH")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục Huyện / Thành Phố.', 'error');
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
                $('#ddlPhuongXaLD').html(render);
                $("#ddlPhuongXaLD")[0].selectedIndex = 0;
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
                $('#ddlPhuongXaKH').html(render);
                $("#ddlPhuongXaKH")[0].selectedIndex = 0;
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
                $('#ddlTinhKH').html(render);
                $("#ddlTinhKH")[0].selectedIndex = 0;                
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
                $('#ddlThanhPhoHuyenKH').html(render);
                $('#ddlThanhPhoHuyenKH')[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục Tỉnh.', 'error');
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
                $('#ddlPhuongXaLD').html(render);
                $("#ddlPhuongXaLD")[0].selectedIndex = 0;

                $('#ddlPhuongXaKH').html(render);
                $("#ddlPhuongXaKH")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục phường / xã.', 'error');
            }
        });
    }

    function mucDichSuDung(tencot) {
        return $.ajax({
            type: 'GET',
            url: '/pokhachhangnuoc/ListMDSD',
            data: {
                tenCot: tencot
            },
            dataType: 'json',
            success: function (response) {
                var render;
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.MAMDSD + "'>" + item.TENMDSD + "</option>";
                });
                $('#ddlMucDichSuDung').html(render);
                $("#ddlMucDichSuDung")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục Mục đích sử dụng.', 'error');
            }
        });
    }

    function dotin() {
        var khuvuc = $('#ddlKhuVuc').val();

        return $.ajax({
            type: 'GET',
            url: '/pokhachhangnuoc/DotIn',
            data: {
                corporationid: khuvuc
            },
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >--- Chọn Đợt in ---</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.IDMADOTIN + "'>" + item.TENDOTIN + "</option>";
                });
                $('#ddlDotInBienNhan').html(render);
                $("#ddlDotInBienNhan")[0].selectedIndex = 0;               
            },
            error: function () {
                tedu.notify('Không có danh mục phường / xã.', 'error');
            }
        });
    }

    function thuho() {
        return $.ajax({
            type: 'GET',
            url: '/pokhachhangnuoc/ListThuHo',            
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >--- Chọn DM thu hộ ---</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.ID + "'>" + item.THUHO + "</option>";
                });
                $('#ddlNhoThu').html(render);
                $("#ddlNhoThu")[0].selectedIndex = 0;
            },
            error: function () {
                tedu.notify('Không có danh mục phường / xã.', 'error');
            }
        });
    }

    function loadTableKhachHangNuoc(isPageChanged) {
        var template = $('#table-KhachHangNuoc').html();
        var render = "";

        var khuvuc = $('#ddlKhuVuc').val();
        var timnoidung = $('#txtTimNoiDung').val();

        $.ajax({
            type: 'GET',
            url: '/admin/PoKhachHangNuoc/GetListKHN',
            data: {
                KhuVuc: khuvuc,
                DieuKien: '',
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
                            MaKhachHang: item.MaKhachHang,

                            TENKH: item.TENKH,
                            TENKV: item.TENKV,
                            DanhSo: item.DanhSo,
                            ThangNamKhaiThac: item.ThangNamKhaiThac,
                            SoDienThoaiKH: item.SoDienThoaiKH,
                            MAMDSD: item.MAMDSD,
                            DongHoSoNo: item.DongHoSoNo,
                            STTTS: item.STTTS
                            //TTDonDangKyNuoc: nguyen.getTTDonDangKyNuoc(item.TTDonDangKyNuoc)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                $('#lbKhachHangNuocTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentKhachHangNuoc').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingKhachHangNuoc(response.Result.RowCount, function () {
                        loadTableKhachHangNuoc();
                    },
                        isPageChanged);
                }
            },
            error: function (status) {                
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }
    function wrapPagingKhachHangNuoc(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULKhachHangNuoc a').length === 0 || changePageSize === true) {
            $('#paginationULKhachHangNuoc').empty();
            $('#paginationULKhachHangNuoc').removeData("twbs-pagination");
            $('#paginationULKhachHangNuoc').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULKhachHangNuoc').twbsPagination({
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

        //$('#hidKhachHangNuocId').val(0);
        //$('#hidInsertUpdateKhachHangNuocId').val(0);

        var chuTimKhachHangKhaiThacMoi = document.getElementById("divbtnTimKhachHangKhaiThacMoi");
        chuTimKhachHangKhaiThacMoi.style.display = "none";

        $('#txtThangKhaiThac').val(tedu.getFormattedDateMM(datenow));
        $('#txtNamKhaiThac').val(tedu.getFormattedDateYYYY(datenow));
        $('#txtMaDonDangKy').val('');
        $('#txtSoHopDong').val('');

        $('#txtTenKhachHang').val('');
        $('#txtCCCD').val('');
        $('#txtSoDienThoai').val('');
        $("#ddlTinhLD")[0].selectedIndex = 0;
        $("#ddlThanhPhoHuyenLD")[0].selectedIndex = 0;
        $("#ddlPhuongXaLD")[0].selectedIndex = 0;
        $('#txtTenDuongApToLD').val('');
        $('#txtSoNhaLD').val('');
        $('#txtDiaChiLD').val('');

        $("#ddlMucDichSuDung")[0].selectedIndex = 0;
        $('#txtSoHoSuDung').val('');
        $('#txtSoNhanKhau').val('');
        $('#txtDinhMucNhanKhau').val('');
        $('#txtLoaiDongHo').val('');
        $('#txtKichCoDongHo').val('');
        $('#txtSoNoDongHo').val('');

        $('#txtMaKhachHang').prop('disabled', true);
        $('#txtMaKhachHang').val('');
        $('#txtDuongPho').val('');
        $('#txtDanhBo').val('');
        $('#txtPhienLX').val('');

        $("#ddlDotInBienNhan")[0].selectedIndex = 0;
        $("#ddlNhoThu")[0].selectedIndex = 0;
        $('#txtSoThuTu').val('');
        $('#txtSoThuTuID').val('');
        $('#txtMaSoThue').val('');
        $('#txtSoTaiKhoanKH').val('');
        $('#txtNgayLapDH').val('');
        $('#txtNgayThayDH').val('');   

        $("#ddlTinhKH")[0].selectedIndex = 0;
        $("#ddlThanhPhoHuyenKH")[0].selectedIndex = 0;
        $("#ddlPhuongXaKH")[0].selectedIndex = 0;
        $('#txtTenDuongApToKH').val('');
        $('#txtSoNhaKH').val('');
        $('#txtDiaChiThuongTru').val('');
        $('#txtNoiLapDH').val('');
        $('#txtViTri').val('');
        $('#txtTrangThaiSuDung').val('');

        $('#txtKHViPhamNgayTraTien').val('');
        $('#txtKHViPhamSoTien').val('0');
        $('#txtKHViPhamSoTienTra').val('0');
        $('#txtKHViPhamTienConLai').val('0');

        var ckkhachhangvipham = document.getElementById('ckKhachHangViPham');
        ckkhachhangvipham.checked = false;
        $('#txtKHViPhamNgayTraTien').prop('disabled', true);
        $('#txtKHViPhamSoTien').prop('disabled', true);
        $('#txtKHViPhamSoTienTra').prop('disabled', true);
        $('#txtKHViPhamTienConLai').prop('disabled', true);

    }

    function loadEditKhachHangNuoc() {
        var makhachhang = $("#hidKhachHangNuocId").val();

        $.ajax({
            type: "GET",
            url: "/Admin/pokhachhangnuoc/KhachHangId",
            data: {
                makh: makhachhang
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var khachhang = response.Result;

                addeditClearData();

                $('#txtThangKhaiThac').val(tedu.getFormattedDateMM(khachhang.KYKHAITHAC));
                $('#txtNamKhaiThac').val(tedu.getFormattedDateYYYY(khachhang.KYKHAITHAC));
                $('#txtMaDonDangKy').val(khachhang.MADDK);
                $('#txtSoHopDong').val(khachhang.SOHDMOI);

                $('#txtTenKhachHang').val(khachhang.TENKH);
                $('#txtCCCD').val(khachhang.CMND);
                $('#txtSoDienThoai').val(khachhang.SDT);
                $("#ddlTinhLD").val('89');
                $("#ddlThanhPhoHuyenLD").val(khachhang.QuanHuyenIdLD !== null ? khachhang.QuanHuyenIdLD : '0' );
                $("#ddlPhuongXaLD").val(khachhang.PhuongXaIdLD !== null ? khachhang.PhuongXaIdLD : '0');
                $('#txtTenDuongApToLD').val(khachhang.TenDuongApToLD !== null ? khachhang.TenDuongApToLD : '0');
                $('#txtSoNhaLD').val(khachhang.SoNhaLD);
                $('#txtDiaChiLD').val(khachhang.SONHA);

                $("#ddlMucDichSuDung").val(khachhang.MAMDSD);
                $('#txtSoHoSuDung').val(khachhang.SOHO);
                $('#txtSoNhanKhau').val(khachhang.SONK);
                $('#txtDinhMucNhanKhau').val(khachhang.SODINHMUC);
                $('#txtLoaiDongHo').val(khachhang.MALDH);
                $('#txtKichCoDongHo').val(khachhang.CONGSUAT);
                $('#txtSoNoDongHo').val(khachhang.SONO);

                $('#txtMaKhachHang').prop('disabled', true);
                $('#txtMaKhachHang').val(khachhang.MAKV + khachhang.IDKH);
                $('#txtDuongPho').val(khachhang.MADP);
                $('#txtDanhBo').val(khachhang.MADB);
                $('#txtPhienLX').val(khachhang.DOT);

                $("#ddlDotInBienNhan").val(khachhang.IDMADOTIN);
                $("#ddlNhoThu").val(khachhang.THUHO);
                $('#txtSoThuTu').val(khachhang.STT);
                $('#txtSoThuTuID').val(khachhang.STTTS);
                $('#txtMaSoThue').val(khachhang.MST);
                $('#txtSoTaiKhoanKH').val(khachhang.STK);
                $('#txtNgayLapDH').val(tedu.getFormattedDate(khachhang.NGAYHT));
                $('#txtNgayThayDH').val(khachhang.NGAYTHAYDH !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(khachhang.NGAYTHAYDH) : '');

                $("#ddlTinhKH").val(khachhang.ThanhPhoTinhIdKH !== null ? khachhang.ThanhPhoTinhIdKH : '0');
                $("#ddlThanhPhoHuyenKH").val(khachhang.QuanHuyenIdKH !== null ? khachhang.QuanHuyenIdKH : '0');
                $("#ddlPhuongXaKH").val(khachhang.PhuongXaIdKH !== null ? khachhang.PhuongXaIdKH : '0');
                $('#txtTenDuongApToKH').val(khachhang.TenDuongApToKH);
                $('#txtSoNhaKH').val(khachhang.SoNhaKH);
                $('#txtDiaChiThuongTru').val(khachhang.SONHA);
                $('#txtNoiLapDH').val(khachhang.NOILAPDHHN);
                $('#txtViTri').val(khachhang.VITRI);
                $('#txtTrangThaiSuDung').val(khachhang.TTSD);

                $('#txtKHViPhamNgayTraTien').val(khachhang.TGTRA !== '0001-01-01T00:00:00' ? tedu.getFormattedDate(khachhang.TGTRA) : '');
                $('#txtKHViPhamSoTien').val(khachhang.SOTIENTRA);
                $('#txtKHViPhamSoTienTra').val(khachhang.KHDATRATIEN);
                $('#txtKHViPhamTienConLai').val(khachhang.SOTIENCL);               

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    //function isFormMainValidate() {
    //    if ($('#frmMainHsKeTuBao').valid()) {
    //        return true;
    //    }
    //    else {
    //        return false;
    //    }
    //}
    //function formMainValidate() {
    //    jQuery.validator.addMethod("isDanhMuc", function (value, element) {
    //        if (value === "%")
    //            return false;
    //        else
    //            return true;
    //    },
    //        "Xin chọn danh mục.."
    //    );

    //    jQuery.validator.addMethod("isDateVietNam", function (value, element) {
    //        return this.optional(element) || moment(value, "DD/MM/YYYY").isValid();
    //    },
    //        "Nhập theo định dạng ngày, tháng, năm."
    //    );

    //    //Init validation
    //    $('#frmMainHsKeTuBao').validate({
    //        errorClass: 'red',
    //        ignore: [],
    //        language: 'vi',
    //        rules: {
    //            txtMaKeTuBao: { required: true },
    //            txtTenKeTuBao: { required: true },
    //            txtChieuDaiKe: { required: true },
    //            txtChieuCaoKe: { required: true },
    //            txtSoLuongTrenKe: { required: true },
    //            txtSoLuongThucTe: { required: true },
    //            //txtNgayDeNghiCungCapDichVu: {
    //            //    required: true,
    //            //    isDateVietNam: true
    //            //},                  
    //            //ddlCoQuanBanHanh: {
    //            //    required: true,
    //            //    isDanhMuc: true
    //            //},         
    //        },
    //        //messages: {
    //        //    txtTrichYeu: { required: "Nhập nội dung trích yếu của văn bản.." }
    //        //}
    //    });
    //}





}