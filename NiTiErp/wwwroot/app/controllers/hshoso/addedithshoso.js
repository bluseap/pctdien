var addedithshosoController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    this.loadDataNhomHoSo = function () {
        loadDataNhomHoSo();
    } 
    
    this.loadDataKeTuBao = function () {
        loadDataKeTuBao();
    } 

    this.loadEditHsBoHoSo = function (hsbohosoid) {
        loadEditHsBoHoSo(hsbohosoid);
    } 

    this.addeditClearData = function () {
        addeditClearData();
    }

    this.loadTableHsBoHoSo = function () {
        loadTableHsBoHoSo(true);
    }

    this.initialize = function () {
        registerEvents();
        loadEditData();
        addeditClearData();
    }

    function registerEvents() {

        $('#txtNgayNhapHoSo ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();        

        $('#btnSaveHsBoHoSo').on('click', function () {
            var ishsbohoso = $('#hidInsertHsBoHoSoId').val(); // 1: insert; 2: update; 

            if (ishsbohoso == "1") {
                saveHsBoHoSo();
            } else if (ishsbohoso == "2") {
                updateHsBoHoSo();
            }
        });
    }

    function loadEditData() {
        loadDataKeTuBao();    
        loadDataNhomHoSo();
        loadDatThoiGianBaoQuan();
    }

    function loadDataKeTuBao() {
        var corporationid = $('#ddlKhuVuc').val();
        $.ajax({
            type: 'GET',
            url: '/admin/hshoso/ListKeTuBao',
            data: {
                corporationid: corporationid
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='%' >-- Lựa chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.CorporationId
                        + " - " + item.TenPhongBan + " - " + item.Ten + "</option>";
                });
                $('#ddlAddEditKeTuBao').html(render);
                $("#ddlAddEditKeTuBao")[0].selectedIndex = 0;                
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    }

    function loadDataNhomHoSo() {
        var corporationid = $('#ddlKhuVuc').val();
        $.ajax({
            type: 'GET',
            url: '/admin/hshoso/ListNhomHs',
            data: {
                corporationid: corporationid
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='%' >-- Lựa chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Ten + "</option>";
                });
                $('#ddlNhomBoHoSo').html(render);
                $("#ddlNhomBoHoSo")[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Nhóm hồ sơ.', 'error');
            }
        });
    }

    function loadDatThoiGianBaoQuan() {
        $.ajax({
            type: 'GET',
            url: '/admin/hshoso/ListTgBaoQuan',
            //data: {
            //    corporationid: userCorporationId
            //},
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='%' >-- Lựa chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Ten + "</option>";
                });
                $('#ddlThoiHanBaoQuanHoSo').html(render);
                $("#ddlThoiHanBaoQuanHoSo")[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Nhóm hồ sơ.', 'error');
            }
        });
    }

    function addeditClearData() {
        var datenow = new Date();

        $('#hidHsBoHoSoId').val(0);
        $('#hidInsertHsBoHoSoId').val(0);

        $("#ddlAddEditKeTuBao")[0].selectedIndex = 0;
        $("#ddlNhomBoHoSo")[0].selectedIndex = 0;

        $("#ddlThoiHanBaoQuanHoSo")[0].selectedIndex = 0;
        $("#txtMaBoHoSo").val('');
        $("#txtTieuDeBoHoSo").val('');
        $("#txtSottKeTuBao").val(0);
        $('#txtNgayNhapHoSo').val(tedu.getFormattedDate(datenow));
        $("#txtTenNhanVienNhapHoSo").val('');
        $("#txtChuGiaiBoHoSo").val('');        
    }

    function isFormMainValidate() {
        if ($('#frmMainHsBoHoSo').valid()) {
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
        $('#frmMainHsBoHoSo').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                ddlAddEditKeTuBao: {
                    required: true,
                    isDanhMuc: true
                },   
                ddlThoiHanBaoQuanHoSo: {
                    required: true,
                    isDanhMuc: true
                },   
                
                txtMaBoHoSo: { required: true },
                txtTieuDeBoHoSo: { required: true },

                //txtNgayNhapHoSo: {
                //    required: true,
                //    isDateVietNam: true
                //},     
                //txtTenNhanVienNhapHoSo: { required: true },        
            },
            //messages: {
            //    txtTrichYeu: { required: "Nhập nội dung trích yếu của văn bản.." }
            //}
        });
    }
     
    function loadTableHsBoHoSo(isPageChanged) {
        var template = $('#table-NhapBoHoSoVaoKe').html();
        var render = "";

        var makhuvuc = $('#ddlKhuVuc').val();
        var phongtoid = $('#ddlPhongTo').val();
        var phongnhaphoso = $('#ddlPhongNhaphoSo').val();
        var timnoidung = $('#txtTimNoiDung').val();

        $.ajax({
            type: 'GET',
            url: '/admin/hshoso/ListHsBoHs',
            data: {
                corporationId: makhuvuc,
                phongdanhmucId: phongtoid,
                phongdanhmucquanlyId: phongnhaphoso,
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
                            TieuDeBoHoSo: item.TieuDeBoHoSo,
                            TenNhomHoSo: item.TenNhomHoSo,
                            TenKeTuBao: item.TenKeTuBao,
                            TenPhongBan: item.TenPhongBan,
                            TenKhuVuc: item.TenKhuVuc,
                            TenPhongNhapHs: item.TenPhongHs,
                            
                            TrangThaiBoHoSo: tedu.getHoSoLuuTru(item.TrangThaiBoHoSo)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                $('#lbNhapBoHoSoVaoKeTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentNhapBoHoSoVaoKe').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingHsBoHoSo(response.Result.RowCount, function () {
                        loadTableHsBoHoSo();
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
    function wrapPagingHsBoHoSo(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULNhapBoHoSoVaoKe a').length === 0 || changePageSize === true) {
            $('#paginationULNhapBoHoSoVaoKe').empty();
            $('#paginationULNhapBoHoSoVaoKe').removeData("twbs-pagination");
            $('#paginationULNhapBoHoSoVaoKe').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULNhapBoHoSoVaoKe').twbsPagination({
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

    function loadEditHsBoHoSo(hsbohosoid) {
        $.ajax({
            type: "GET",
            url: "/Admin/hsHoSo/GetBoHs",
            data: {
                hsbohosoId: hsbohosoid
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var bohoso = response.Result;

                addeditClearData();

                $('#hidHsBoHoSoId').val(bohoso.Id);
                $('#hidInsertHsBoHoSoId').val(2);  // 1: insert; 2: update

                $("#ddlAddEditKeTuBao").val(bohoso.HsKeTuBaoId);
                $("#ddlAddEditPhongNhaphoSo").val(bohoso.PhongDanhMucQuanLyId);
                $("#ddlNhomBoHoSo").val(bohoso.HsNhomHoSoId);
                $("#ddlThoiHanBaoQuanHoSo").val(bohoso.HsThoiHanBaoQuanDMId);

                $("#txtMaBoHoSo").val(bohoso.MaBoHoSo);
                $("#txtTieuDeBoHoSo").val(bohoso.TieuDeBoHoSo);
                $("#txtSottKeTuBao").val(bohoso.SoTTHoSoTrenKe);
                $('#txtNgayNhapHoSo').val(tedu.getFormattedDate(bohoso.ThoiGianBatDau));
                $("#txtTenNhanVienNhapHoSo").val(bohoso.TenNhanVienNhapHoSo);
                $("#txtChuGiaiBoHoSo").val(bohoso.ChuGiaiBoHoSo);              

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function saveHsBoHoSo() {
        var hsbohosoid = $('#hidHsBoHoSoId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var hsketubaoid = $("#ddlAddEditKeTuBao").val();
            var phogndanhmucquanly = $("#ddlAddEditPhongNhaphoSo").val();
            var nhomhosoid = $("#ddlNhomBoHoSo").val();
            var thoihanbaoquanid = $("#ddlThoiHanBaoQuanHoSo").val();

            var mabohoso = $("#txtMaBoHoSo").val();
            var tieudebohoso = $("#txtTieuDeBoHoSo").val();
            var sttbohosotrenke = $("#txtSottKeTuBao").val();
            var ngaynhaphoso = tedu.getFormatDateYYMMDD($('#txtNgayNhapHoSo').val());
            var tennhanviennhaphs = $("#txtTenNhanVienNhapHoSo").val();
            var chugiai = $("#txtChuGiaiBoHoSo").val();                

            $.ajax({
                type: "POST",
                url: "/Admin/hshoso/Create",
                data: {
                    Id: hsbohosoid,

                    HsKeTuBaoId: hsketubaoid,
                    PhongDanhMucQuanLyId: phogndanhmucquanly,
                    HsNhomHoSoId: nhomhosoid,
                    HsThoiHanBaoQuanDMId: thoihanbaoquanid,
                    MaBoHoSo: mabohoso,
                    TieuDeBoHoSo: tieudebohoso,
                    SoTTHoSoTrenKe: sttbohosotrenke,
                    ThoiGianBatDau: ngaynhaphoso,
                    TenNhanVienNhapHoSo: tennhanviennhaphs,
                    ChuGiaiBoHoSo: chugiai
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Bộ hồ sơ.", "error");
                    }
                    else {
                        tedu.notify('Lưu Bộ hồ sơ.', 'success');

                        loadTableHsBoHoSo(true);

                        addeditClearData();

                        $('#modal-add-edit-HsBoHoSo').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu Bộ hồ sơ.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function updateHsBoHoSo() {
        var hsbohosoid = $('#hidHsBoHoSoId').val();

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var hsketubaoid = $("#ddlAddEditKeTuBao").val();
            var phogndanhmucquanly = $("#ddlAddEditPhongNhaphoSo").val();
            var nhomhosoid = $("#ddlNhomBoHoSo").val();
            var thoihanbaoquanid = $("#ddlThoiHanBaoQuanHoSo").val();

            var mabohoso = $("#txtMaBoHoSo").val();
            var tieudebohoso = $("#txtTieuDeBoHoSo").val();
            var sttbohosotrenke = $("#txtSottKeTuBao").val();
            var ngaynhaphoso = tedu.getFormatDateYYMMDD($('#txtNgayNhapHoSo').val());
            var tennhanviennhaphs = $("#txtTenNhanVienNhapHoSo").val();
            var chugiai = $("#txtChuGiaiBoHoSo").val();

            $.ajax({
                type: "POST",
                url: "/Admin/hshoso/Update",
                data: {
                    Id: hsbohosoid,

                    HsKeTuBaoId: hsketubaoid,
                    PhongDanhMucQuanLyId: phogndanhmucquanly,
                    HsNhomHoSoId: nhomhosoid,
                    HsThoiHanBaoQuanDMId: thoihanbaoquanid,
                    MaBoHoSo: mabohoso,
                    TieuDeBoHoSo: tieudebohoso,
                    SoTTHoSoTrenKe: sttbohosotrenke,
                    ThoiGianBatDau: ngaynhaphoso,
                    TenNhanVienNhapHoSo: tennhanviennhaphs,
                    ChuGiaiBoHoSo: chugiai
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Lưu Bộ hồ sơ.", "error");
                    }
                    else {
                        tedu.notify('Lưu Bộ hồ sơ.', 'success');

                        loadTableHsBoHoSo(true);

                        addeditClearData();

                        $('#modal-add-edit-HsBoHoSo').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu Bộ hồ sơ.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }


}