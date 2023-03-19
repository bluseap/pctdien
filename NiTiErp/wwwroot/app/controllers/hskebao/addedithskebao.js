var addedithskebaoController = function () {    

    var userName = $("#hidUserName").val();

    this.loadEditHsKeTuBao = function (hsketubaoid) {
        loadEditHsKeTuBao(hsketubaoid);
    }

    this.loadTableHsKeTuBao = function () {
        loadTableHsKeTuBao();
    }

    this.addeditClearData = function () {
        addeditClearData();
    }

    this.loadAddEditPhongKhuVuc = function (makhuvuc) {
        loadAddEditPhongKhuVuc(makhuvuc);
    }

    this.initialize = function () {
        registerEvents();
        addeditClearData();

    }

    function registerEvents() {

        formMainValidate();

        $('#ddlAddEditKhuVuc').on('change', function () {
            var corporationId = $('#ddlAddEditKhuVuc').val();

            loadAddEditPhongKhuVuc(corporationId);            
            tedu.notify('Danh mục phòng theo khu vực.', 'success');
        });
        
        $('#btnSaveHsKeTuBao').on('click', function () {
            var isketubao = $('#hidInsertHsKeTuBaoId').val(); // 1: insert; 2: update; 

            if (isketubao == "1") {
                saveHsKeTuBao();
            } else if (isketubao == "2") {
                updateHsKeTuBao();
            }
        });
    }

    function addeditClearData() {
        //var datenow = new Date();

        $('#hidHsKeTuBaoId').val(0);
        $('#hidInsertHsKeTuBaoId').val(0);

        $("#txtMaKeTuBao").val('');
        $("#txtTenKeTuBao").val('');
        $("#txtChieuDaiKe").val(0);
        $("#txtChieuCaoKe").val(0);
        $("#txtSoLuongTrenKe").val(0);
        $("#txtSoLuongThucTe").val(0);
        $("#txtSottKeTuBao").val(0);
        $("#txtGhiChuThongTinCanThiet").val('');
    }

    function isFormMainValidate() {
        if ($('#frmMainHsKeTuBao').valid()) {
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
        $('#frmMainHsKeTuBao').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                txtMaKeTuBao: { required: true },    
                txtTenKeTuBao: { required: true },    
                txtChieuDaiKe: { required: true },    
                txtChieuCaoKe: { required: true },    
                txtSoLuongTrenKe: { required: true },    
                txtSoLuongThucTe: { required: true },    
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

    function loadAddEditPhongKhuVuc(makhuvuc) {
        $.ajax({
            type: 'GET',
            url: '/admin/hoso/GetListPhongKhuVuc',
            data: { makv: makhuvuc },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='%' >-- Lựa chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenPhong + "</option>";
                });
                $('#ddlAddEditPhongTo').html(render);
                $("#ddlAddEditPhongTo")[0].selectedIndex = 0;
                //loadAddEditPhongBanByUserName(userName);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    }

    function loadAddEditPhongBanByUserName(userName) {
        $.ajax({
            type: 'GET',
            url: '/admin/hskebao/getHoSonv',
            data: { username: userName },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var hosonhanvien = response.Result;

                $('#ddlAddEditPhongTo').val(hosonhanvien.PhongBanDanhMucId);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    }

    function loadTableHsKeTuBao(isPageChanged) {
        var template = $('#table-NhapKeBaoTu').html();
        var render = "";

        var makhuvuc = $('#ddlKhuVuc').val();
        var phongtoid = $('#ddlPhongTo').val();
        var timnoidung = $('#txtTimNoiDung').val();

        $.ajax({
            type: 'GET',
            url: '/admin/hskebao/GetListHsKe',
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
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result.Results, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,
                            TenKhuVuc: item.TenKhuVuc,
                            TenPhongBan: item.TenPhongBan,
                            MaKeTuBao: item.MaKeTuBao,
                            TenKeTuBao: item.Ten,
                            
                            TrangThaiTrenKe: item.TrangThaiTrenKe,
                            TrangThaiKeTuBao: tedu.getHoSoLuuTru(item.TrangThaiKeTuBao)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                $('#lbNhapKeBaoTuTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentNhapKeBaoTu').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingHsKeTuBao(response.Result.RowCount, function () {
                        loadTableHsKeTuBao();
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
    function wrapPagingHsKeTuBao(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULNhapKeBaoTu a').length === 0 || changePageSize === true) {
            $('#paginationULNhapKeBaoTu').empty();
            $('#paginationULNhapKeBaoTu').removeData("twbs-pagination");
            $('#paginationULNhapKeBaoTu').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULNhapKeBaoTu').twbsPagination({
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

    function loadEditHsKeTuBao(hsketubaoId) {
        $.ajax({
            type: "GET",
            url: "/Admin/hskebao/getketu",
            data: {
                hsketubaoid: hsketubaoId
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var ketubao = response.Result;

                addeditClearData();

                $('#hidHsKeTuBaoId').val(ketubao.Id);
                $('#hidInsertHsKeTuBaoId').val(2);  // 1: insert; 2: update

                $("#txtMaKeTuBao").val(ketubao.MaKeTuBao);
                $("#txtTenKeTuBao").val(ketubao.Ten);
                $("#txtChieuDaiKe").val(ketubao.ChieuDai);
                $("#txtChieuCaoKe").val(ketubao.ChieuCao);
                $("#txtSoLuongTrenKe").val(ketubao.SoLuongTrenKe);
                $("#txtSoLuongThucTe").val(ketubao.SoLuongThucTe);
                $("#txtSottKeTuBao").val(ketubao.SttKeTuBao);
                $("#txtGhiChuThongTinCanThiet").val(ketubao.GhiChuThongTinCanThiet);

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function saveHsKeTuBao() {
        var hsketubaoid = $('#hidHsKeTuBaoId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var makv = $("#ddlAddEditKhuVuc").val();
            var maphongban = $("#ddlAddEditPhongTo").val();

            var make = $("#txtMaKeTuBao").val();
            var tenke = $("#txtTenKeTuBao").val();
            var chieudai = $("#txtChieuDaiKe").val();
            var chieucao = $("#txtChieuCaoKe").val();
            var soluongke = $("#txtSoLuongTrenKe").val();
            var soluongthuctte = $("#txtSoLuongThucTe").val();
            var sttke = $("#txtSottKeTuBao").val();
            var ghichuthongtin = $("#txtGhiChuThongTinCanThiet").val();

            $.ajax({
                type: "POST",
                url: "/Admin/hsKeBao/Create",
                data: {
                    Id: hsketubaoid,

                    CorporationId: makv,
                    PhongDanhMucId: maphongban,

                    MaKeTuBao: make,
                    Ten: tenke,
                    ChieuDai: chieudai,
                    DaiDai: chieudai,

                    ChieuCao: chieucao,
                    CaoCao: chieucao,

                    SoLuongTrenKe: soluongke,
                    SoLuongThucTe: soluongthuctte,
                    SttKeTuBao: sttke,
                    GhiChuThongTinCanThiet: ghichuthongtin
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Kệ tủ bao.", "error");
                    }
                    else {
                        tedu.notify('Lưu Kệ tủ bao.', 'success');

                        loadTableHsKeTuBao(true);

                        addeditClearData();

                        $('#modal-add-edit-HsKeTuBao').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu Kệ tủ bao.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function updateHsKeTuBao() {
        var hsketubaoid = $('#hidHsKeTuBaoId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var makv = $("#ddlAddEditKhuVuc").val();
            var maphongban = $("#ddlAddEditPhongTo").val();

            var make = $("#txtMaKeTuBao").val();
            var tenke = $("#txtTenKeTuBao").val();
            var chieudai = Number($("#txtChieuDaiKe").val());
            var chieucao = Number($("#txtChieuCaoKe").val());
            var soluongke = Number($("#txtSoLuongTrenKe").val());
            var soluongthuctte = Number($("#txtSoLuongThucTe").val());
            var sttke = Number($("#txtSottKeTuBao").val());
            var ghichuthongtin = $("#txtGhiChuThongTinCanThiet").val();

            $.ajax({
                type: "POST",
                url: "/Admin/hsKeBao/Update",
                data: {
                    Id: hsketubaoid,

                    CorporationId: makv,
                    PhongDanhMucId: maphongban,

                    MaKeTuBao: make,
                    Ten: tenke,
                    ChieuDai: chieudai,
                    DaiDai: chieudai,

                    ChieuCao: chieucao,
                    CaoCao: chieucao,

                    SoLuongTrenKe: soluongke,
                    SoLuongThucTe: soluongthuctte,
                    SttKeTuBao: sttke,
                    GhiChuThongTinCanThiet: ghichuthongtin
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Kệ tủ bao.", "error");
                    }
                    else {
                        tedu.notify('Lưu Kệ tủ bao.', 'success');

                        loadTableHsKeTuBao(true);

                        addeditClearData();

                        $('#modal-add-edit-HsKeTuBao').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu Kệ tủ bao.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }


}