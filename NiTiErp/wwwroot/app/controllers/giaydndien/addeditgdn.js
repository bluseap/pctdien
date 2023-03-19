var addeditgdnController = function () {

    //var userCorporationId = $("#hidUserCorporationId").val();

    var timkhachhangdien = new timkhachhangdienController();
    var quatrinhxulydien = new quatrinhxulyController();

    this.editGiayDeNghiDien = function (giaydenghiid) {
        editGiayDeNghiDien(giaydenghiid);
    }

    this.loadTableGiayDeNghiDien = function () {
        loadTableGiayDeNghi();
    }

    this.loadTableGDNDMCCDien = function () {
        loadTableGDNDMCCDien(true);
    }

    this.clearDataAddEdit = function () {
        //AddEditClearData();
    }

    this.initialize = function () {
        loadAddEditData();
        registerEvents();
        addeditClearData();
    }

    function registerEvents() {

        $('#txtNgayTiepNhan, #txtNgayDeNghiCungCapDichVu ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();

        $('#btnLoadKhachHangDien').on('click', function () {
            timkhachhangdien.clearDataTimKhachHangDien();

            $('#modal-add-edit-TimKhachHangDien').modal('show');
        });

        $('#btnSaveGiayDeNghi').on('click', function () {
            var isgiaydenghi = $('#hidInsertGiayDeNghiId').val(); // 1: insert; 2: update

            if (isgiaydenghi == 1) {
                saveGiayDeNghiDien();
            } else if (isgiaydenghi == 2) {
                updateGiayDeNghiDien();
            }
            else {
                tedu.notify("Chưa lưu Giấy đề nghị.", "error");
            }
        });

        $("#ddlDMCungCapDichVu").on('change', function () {
            saveGiayDeNghiDMCungCapDien();
        });

        $('body').on('click', '.btnDeleteDMCungCapDichVuTen', function (e) {
            e.preventDefault();
            var giaydenghiDMCCDVDienId = $(this).data('id');
            deleteGiayDeNghiDMCungCapDien(giaydenghiDMCCDVDienId);
        });

        $('body').on('click', '.btn-QuaTrinhXuLyDien', function (e) {
            e.preventDefault();
            var giaydenghiDMCCDVDienId = $(this).data('id');
            quatrinhxulydien.loadQuaTrinhXuLyDien(giaydenghiDMCCDVDienId);
            $('#modal-add-edit-QuaTrinhXuLyDien').modal('show');
        });

    }

    function loadAddEditData() {
        return $.ajax({
            type: 'GET',
            url: '/admin/giaydn/DMCungCapDichVu',
            data: {
                loaidichvuid: 2 // 1: Nuoc; 2: Dien
            },
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >-- Lựa chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Ten + "</option>";
                });
                $('#ddlDMCungCapDichVu').html(render);
                $("#ddlDMCungCapDichVu")[0].selectedIndex = 0;
                //addeditqlvb.loadTableQuanLyVanBan();
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục cung cấp dịch vụ.', 'error');
            }
        });

    }

    function addeditClearData() {
        $('#hidGiayDeNghiId').val(0);
        $('#hidInsertGiayDeNghiId').val(0);
        $('#hidGiayDeNghiDMCungCapDienId').val(0);
        $('#hidGiayDeNghiDMCungCapDienCodeXuLy').val(0);
        $('#hidTrangThaiGDNDMDien').val(0);

        $('#hidKhachHangDienId').val(0);
        $('#hidKhuVucId').val(0);
        $('#hidTenKhachHangDien').val(0);

        $('#hidDanhSoKhachHang').val(0);
        $('#hidMucDichSuDungKH').val(0);

        $('#hidDongHoDienId').val(0);
        $('#hidDongHoDienMaLoai').val(0);
        $('#hidDongHoDienSoNo').val(0);


        $('#txtHoTenKhachHang').val("");
        $('#txtDiaChiKhachHang').val("");
        $('#txtSoDienThoai').val("");
        $('#txtEmailKhachHang').val("");
        $('#txtDiaChiMuaNuoc').val("");
        $('#txtDanhSoKhachHang').val("");
        $('#ddlDMCungCapDichVu')[0].selectedIndex = 0;

        $('#tbl-contentDMCungCapDichVu').html('');

        $('#txtThongTinHienTai').val("");
        $('#txtThongTinCanThayDoi').val("");
        $('#txtHoSoKhachHangDaCungCap').val("");
        $('#txtHoSoKhachHangCanBoSung').val("");

        var datenow = new Date();
        $('#txtNgayTiepNhan').val(tedu.getFormattedDate(datenow));
        $('#txtTenNhanVienTiepNhan').val("");
        $('#txtNgayDeNghiCungCapDichVu').val(tedu.getFormattedDate(datenow));
        $('#txtTenDaiDienCungCapDichVu').val("");

    }

    function isFormMainValidate() {
        if ($('#frmMainGiayDeNghi').valid()) {
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
        $('#frmMainGiayDeNghi').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                txtNgayTiepNhan: {
                    required: true,
                    isDateVietNam: true
                },
                txtNgayDeNghiCungCapDichVu: {
                    required: true,
                    isDateVietNam: true
                },
                //txtSoVanBanDen: { required: true },               
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

    function saveGiayDeNghiDMCungCapDien() {
        var codeGiayDeNghiDMCCDienGuid = $('#hidGiayDeNghiDMCungCapDienCodeXuLy').val();
        var dmCungCapDichVuId = $('#ddlDMCungCapDichVu').val();
        //var thoihangiaiquyet = tedu.getFormatDateYYMMDD($('#txtThoiHanGiaiQuyet').val());           

        $.ajax({
            type: "POST",
            url: "/Admin/giaydndien/CreateGDNDMCCDien",
            data: {
                CodeXuLy: codeGiayDeNghiDMCCDienGuid,
                DMCungCapDichVuId: dmCungCapDichVuId
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify(response.Message, "error");
                }
                else {
                    tedu.notify('Lưu Giấy đề nghị DM Cung cấp điện.', 'success');
                    loadTableGDNDMCCDien(true);

                    //$('#modal-add-edit-GiayDeNghi').modal('hide');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể lưu Giấy đề nghị DM Cung cấp điện.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function deleteGiayDeNghiDMCungCapDien(giaydenghiccdichvudienid) {
        $.ajax({
            type: "POST",
            url: "/Admin/giaydndien/DeleteGDNDMCCDien",
            data: {
                id: giaydenghiccdichvudienid
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify(response.Message, "error");
                }
                else {
                    tedu.notify('Xóa Giấy đề nghị DM Cung cấp điện.', 'success');
                    loadTableGDNDMCCDien(true);
                }
                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Xóa Giấy đề nghị DM Cung cấp điện.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function loadTableGDNDMCCDien(isPageChanged) {
        var template = $('#table-DMCungCapDichVu').html();
        var render = "";

        var codeGiayDeNghiDMCCDienGuid = $('#hidGiayDeNghiDMCungCapDienCodeXuLy').val();

        $.ajax({
            type: 'GET',
            data: {
                codexuly: codeGiayDeNghiDMCCDienGuid
            },
            url: '/admin/giaydndien/GDNDMCungCapDVDien',
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th></tr>";
                }
                else {
                    $.each(response.Result, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,
                            TenDMCungCapDichVu: item.TenDMCungCapDichVu,
                            //HinhNhanVien: item.Image === null ? '<img src="/admin-side/images/user.png?h=90"' : '<img src="' + item.HinhNhanVien + '?h=90" />',
                            Stt: item.Stt,
                            TTDeNghi: item.TTDeNghi,
                            CreateDate: item.CreateDate !== null ? tedu.getFormattedDate(item.CreateDate) : "",
                            Status: tedu.getHoSoNhanVienStatus(item.Status)
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }
                if (render !== '') {
                    $('#tbl-contentDMCungCapDichVu').html(render);
                }
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function saveGiayDeNghiDien() {

        var codeXuLyGDNDMCCDien = $('#hidGiayDeNghiDMCungCapDienCodeXuLy').val();
        var khachhangdienId = $('#hidKhachHangDienId').val();

        var khuvucid = $('#hidKhuVucId').val();
        var tenkhachhangdien = $('#hidTenKhachHangDien').val();

        var danhsokhachhang = $('#hidDanhSoKhachHang').val();
        var muadichsusund = $('#hidMucDichSuDungKH').val();

        var donghoid = $('#hidDongHoDienId').val();
        var donghomaloai = $('#hidDongHoDienMaLoai').val();
        var donghosono = $('#hidDongHoDienSoNo').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var diachikhachhang = $('#txtDiaChiKhachHang').val();
            var sodienthoai = $('#txtSoDienThoai').val();
            var emailKhachHang = $('#txtEmailKhachHang').val();
            var diachimuanuoc = $('#txtDiaChiMuaNuoc').val();
            //var danhsokhachhang = $('#txtDanhSoKhachHang').val();

            var thongtinkhachhang = $('#txtThongTinHienTai').val();
            var thongtincanthaydoi = $('#txtThongTinCanThayDoi').val();
            var hosokhachhangdacungcap = $('#txtHoSoKhachHangDaCungCap').val();
            var hosokhachhangcanbosung = $('#txtHoSoKhachHangCanBoSung').val();

            var ngaytiepnhan = tedu.getFormatDateYYMMDD($('#txtNgayTiepNhan').val());
            var nhanvientiepnhan = $('#txtTenNhanVienTiepNhan').val();
            var ngaydenghicungcapdichvu = tedu.getFormatDateYYMMDD($('#txtNgayDeNghiCungCapDichVu').val());
            var tendaidiencungcapdichvu = $('#txtTenDaiDienCungCapDichVu').val();

            $.ajax({
                type: "POST",
                url: "/Admin/giaydndien/CreateGDNDien",
                data: {
                    KhuVucId: khuvucid,
                    TenKhachHang: tenkhachhangdien,
                    DongHoId: donghoid,
                    DongHoMaLoai: donghomaloai,
                    SoNo: donghosono,

                    KhachHangPoId: khachhangdienId,
                    DiaChi: diachikhachhang,
                    SoDienThoai: sodienthoai,
                    Email: emailKhachHang,
                    DiaChiMuaNuoc: diachimuanuoc,
                    DanhSoKhachHang: danhsokhachhang,
                    MucDichSuDung: muadichsusund,

                    ThongTinHienTai: thongtinkhachhang,
                    ThongTinThayDoi: thongtincanthaydoi,
                    HoSoKhachHangCungCap: hosokhachhangdacungcap,
                    HoSoKhachHangCanBoSung: hosokhachhangcanbosung,
                    NgayTiepNhan: ngaytiepnhan,
                    TenNhanVienTiepNhan: nhanvientiepnhan,
                    NgayDeNghiCungCap: ngaydenghicungcapdichvu,
                    BenDeNghiCungCap: tendaidiencungcapdichvu,

                    CodeXuLy: codeXuLyGDNDMCCDien
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Giấy đề nghị.", "error");
                    }
                    else {
                        tedu.notify('Lưu Giấy đề nghị.', 'success');

                        loadTableGiayDeNghi(true);

                        addeditClearData();

                        $('#modal-add-edit-GiayDeNghi').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể lưu Giấy đề nghị.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function loadTableGiayDeNghi(isPageChanged) {
        var template = $('#table-GiayDeNghiCungCapDien').html();
        var render = "";

        var makhuvuc = $('#ddlKhuVuc').val();
        var phongtoid = $('#ddlPhongTo').val();
        var timnoidung = $('#txtTimNoiDung').val();

        $.ajax({
            type: 'GET',
            url: '/admin/giaydndien/GetListGDNDien',
            data: {
                corporationId: makhuvuc,
                phongdanhmucId: phongtoid,
                keyword: timnoidung,
                page: tedu.configs.pageIndex,
                pageSize: tedu.configs.pageSize
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.Results.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result.Results, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.GiayDeNghiCungCapDienId,
                            TenKhachHang: item.TenKhachHang,
                            //HinhNhanVien: item.Image === null ? '<img src="/admin-side/images/user.png?h=90"' : '<img src="' + item.HinhNhanVien + '?h=90" />',
                            DanhSo: item.DanhSoKhachHang,
                            TenKhuVuc: item.TenKhuVuc,
                            DiaChiMuaNuoc: item.DiaChiMuaNuoc,
                            SoDienThoai: item.DiaChiMuaNuoc,
                            TenDMCungCapDichVu: item.TenDMCungCapDichVu,
                            TTDeNghi: tedu.getGiayDeNghiTT(item.TTDeNghi)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                $('#lbGiayDeNghiCungCapDienTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentGiayDeNghiCungCapDien').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingGiayDeNghi(response.Result.RowCount, function () {
                        loadTableGiayDeNghi();
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
    function wrapPagingGiayDeNghi(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULGiayDeNghiCungCapDien a').length === 0 || changePageSize === true) {
            $('#paginationULGiayDeNghiCungCapDien').empty();
            $('#paginationULGiayDeNghiCungCapDien').removeData("twbs-pagination");
            $('#paginationULGiayDeNghiCungCapDien').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULGiayDeNghiCungCapDien').twbsPagination({
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

    function editGiayDeNghiDien(giaydenghiid) {
        $.ajax({
            type: "GET",
            url: "/Admin/giaydndien/GetGDNDienId",
            data: {
                giaydenghiId: giaydenghiid
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var giaydenghi = response.Result;

                $('#hidGiayDeNghiId').val(giaydenghi.Id);
                //$('#hidInsertGiayDeNghiId').val(vanbanden.TTXuLy);
                $('#hidGiayDeNghiDMCungCapDienCodeXuLy').val(giaydenghi.CodeXuLy);
                loadTableGDNDMCCDien(true);

                $('#hidKhachHangDienId').val(giaydenghi.KhachHangPoId);

                $('#hidKhuVucId').val(giaydenghi.KhuVucId);
                //$('#hidTenKhachHangNuoc').val(giaydenghi.TTXuLy);
                //$('#hidDongHoId').val(giaydenghi.TTXuLy);
                //$('#hidDongHoMaLoai').val(giaydenghi.TTXuLy);
                //$('#hidDongHoSoNo').val(giaydenghi.TTXuLy);

                $('#txtHoTenKhachHang').val(giaydenghi.TenKhachHang);
                $('#txtDiaChiKhachHang').val(giaydenghi.DiaChi);
                $('#txtSoDienThoai').val(giaydenghi.SoDienThoai);

                $('#txtEmailKhachHang').val(giaydenghi.Email);
                $('#txtDiaChiMuaNuoc').val(giaydenghi.DiaChiMuaNuoc);
                $('#txtDanhSoKhachHang').val(giaydenghi.DanhSoKhachHang);
                $('#txtThongTinHienTai').val(giaydenghi.ThongTinHienTai);
                $('#txtThongTinCanThayDoi').val(giaydenghi.ThongTinThayDoi);
                $('#txtHoSoKhachHangDaCungCap').val(giaydenghi.HoSoKhachHangCungCap);

                $('#txtHoSoKhachHangCanBoSung').val(giaydenghi.HoSoKhachHangCanBoSung);
                $('#txtNgayTiepNhan').val(tedu.getFormattedDate(giaydenghi.NgayTiepNhan));
                $('#txtTenNhanVienTiepNhan').val(giaydenghi.TenNhanVienTiepNhan);
                $('#txtNgayDeNghiCungCapDichVu').val(tedu.getFormattedDate(giaydenghi.NgayDeNghiCungCap));
                $('#txtTenDaiDienCungCapDichVu').val(giaydenghi.BenDeNghiCungCap);

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function updateGiayDeNghiDien() {
        var giaydenghiId = $('#hidGiayDeNghiId').val();
        var codeXuLyGDNDMCCDien = $('#hidGiayDeNghiDMCungCapDienCodeXuLy').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var diachikhachhang = $('#txtDiaChiKhachHang').val();
            var sodienthoai = $('#txtSoDienThoai').val();
            var emailKhachHang = $('#txtEmailKhachHang').val();
            var diachimuanuoc = $('#txtDiaChiMuaNuoc').val();
            var danhsokhachhang = $('#txtDanhSoKhachHang').val();

            var thongtinkhachhang = $('#txtThongTinHienTai').val();
            var thongtincanthaydoi = $('#txtThongTinCanThayDoi').val();
            var hosokhachhangdacungcap = $('#txtHoSoKhachHangDaCungCap').val();
            var hosokhachhangcanbosung = $('#txtHoSoKhachHangCanBoSung').val();

            var ngaytiepnhan = tedu.getFormatDateYYMMDD($('#txtNgayTiepNhan').val());
            var nhanvientiepnhan = $('#txtTenNhanVienTiepNhan').val();
            var ngaydenghicungcapdichvu = tedu.getFormatDateYYMMDD($('#txtNgayDeNghiCungCapDichVu').val());
            var tendaidiencungcapdichvu = $('#txtTenDaiDienCungCapDichVu').val();

            $.ajax({
                type: "POST",
                url: "/Admin/giaydndien/UpdateGDNDien",
                data: {
                    Id: giaydenghiId,
                    CodeXuLy: codeXuLyGDNDMCCDien,

                    DiaChi: diachikhachhang,
                    SoDienThoai: sodienthoai,
                    Email: emailKhachHang,
                    DiaChiMuaNuoc: diachimuanuoc,
                    DanhSoKhachHang: danhsokhachhang,
                    ThongTinHienTai: thongtinkhachhang,
                    ThongTinThayDoi: thongtincanthaydoi,
                    HoSoKhachHangCungCap: hosokhachhangdacungcap,
                    HoSoKhachHangCanBoSung: hosokhachhangcanbosung,
                    NgayTiepNhan: ngaytiepnhan,
                    TenNhanVienTiepNhan: nhanvientiepnhan,
                    NgayDeNghiCungCap: ngaydenghicungcapdichvu,
                    BenDeNghiCungCap: tendaidiencungcapdichvu
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Sửa Giấy đề nghị.", "error");
                    }
                    else {
                        tedu.notify('Sửa Giấy đề nghị.', 'success');

                        loadTableGiayDeNghi(true);

                        addeditClearData();

                        $('#modal-add-edit-GiayDeNghi').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Sửa Giấy đề nghị.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }


}