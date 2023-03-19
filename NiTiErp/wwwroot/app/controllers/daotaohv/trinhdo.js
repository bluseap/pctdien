var trinhdodaotaoController = function () {

    var imageBang1 = [];
    var imageBang2 = [];

    this.loadTableTrinhDoHocVien = function () {
        loadTableTrinhDoHocVien();
    }

    this.initialize = function () {        
        registerEvents();
        loadDataTrinhDo();
        clearTrinhDoDaoTao();
    }

    function registerEvents() {     
        
        formMainValidate();        

        $("#ddl-show-pageTrinhDo").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            loadTableTrinhDoHocVien(true);
        });

        $("#fileHinhBangCap1").on('change', function () {
            var fileUpload = $(this).get(0);
            var files = fileUpload.files;

            var data = new FormData();

            for (var i = 0; i < files.length; i++) {
                data.append(files[i].name, files[i]);
            }
            $.ajax({
                type: "POST",
                url: "/Admin/Upload/UploadImageNhanVien",
                contentType: false,
                processData: false,
                data: data,
                success: function (path) {
                    clearFileBang1Input($("#fileHinhBangCap1"));
                    imageBang1.push(path);

                    $('#imagelistBang1').append('<div class="col-md-3"><img width="100"  data-path="' + path + '" src="' + path + '"></div>');
                    tedu.notify('Đã tải ảnh lên thành công!', 'success');
                },
                error: function () {
                    tedu.notify('There was error uploading files!', 'error');
                }
            });
        });

        $("#fileHinhBangCap2").on('change', function () {
            var fileUpload = $(this).get(0);
            var files = fileUpload.files;

            var data = new FormData();

            for (var i = 0; i < files.length; i++) {
                data.append(files[i].name, files[i]);
            }
            $.ajax({
                type: "POST",
                url: "/Admin/Upload/UploadImageNhanVien",
                contentType: false,
                processData: false,
                data: data,
                success: function (path) {
                    clearFileBang2Input($("#fileHinhBangCap2"));
                    imageBang2.push(path);

                    $('#imagelistBang2').append('<div class="col-md-3"><img width="100"  data-path="' + path + '" src="' + path + '"></div>');
                    tedu.notify('Đã tải ảnh lên thành công!', 'success');
                },
                error: function () {
                    tedu.notify('There was error uploading files!', 'error');
                }
            });
        });

        $('body').on('click', '.btn-editTrinhDo', function (e) {
            e.preventDefault();

            $('#hidtrinhdoEditId').val(2); // 1: insert; 2: update       

            var trinhdoId = $(this).data('id');
            loadTrinhDo(trinhdoId);
        });

        $('body').on('click', '.btn-deleteTrinhDo', function (e) {
            e.preventDefault();
            var trinhdoId = $(this).data('id');

            $('#hidtrinhdoEditId').val(3);// 1: insert; 2: update ; 3: delete     
            $('#hidTrinhDoId').val(trinhdoId);
            
            loadDeleteTrinhDo(trinhdoId);
        });

        $("#btnSaveTrinhDoDaoTao").on('click', function (e) {
            
            var hosoInserId = $('#hidLyLichIdInsert').val(); // 1: insert; 2: update     
            var edittrinhdoId = $('#hidtrinhdoEditId').val(); // 1: insert; 2: update      

            if (hosoInserId === "1" && edittrinhdoId === "1") {// update trinh do    
                insertTrinhDo(e);
            } else if (hosoInserId === "1" && edittrinhdoId === "2") {// update trinh do    
                UpdateTrinhDo(e);
            } else {
                tedu.notify("Lưu trình độ đào tạo.", "error");
            }
        });

    }

    function loadDataTrinhDo() {
        LoadDanhMucTrinhDo();
    }

    function clearTrinhDoDaoTao() {
        //var datenow = new Date();

        $('#hidTrinhDoId').val(0);
        $('#hidtrinhdoEditId').val(1); // 1: insert; 2: update

        $('#hidLyLichIdInsert').val(0);

        $('#ddlLoaiBang')[0].selectedIndex = 0;
        $('#ddlLoaiHinh')[0].selectedIndex = 0;
        $('#ddlXepLoai')[0].selectedIndex = 0;
        $('#txtChuyenNganh').val('');
        $('#txtNamCapBang').val('');
        $('#txtTenTruongCapBang').val('');
        $('#txtGhiChuTrinhDo').val('');

        clearFileBang1Input($("#fileHinhBangCap1"));
        $('#imagelistBang1').html('');
        imageBang1 = [];

        clearFileBang2Input($("#fileHinhBangCap2"));
        $('#imagelistBang2').html('');
        imageBang2 = [];

    }

    function LoadDanhMucTrinhDo() {
        $.ajax({
            type: 'GET',
            url: '/admin/hoso/LoaiBangGetList',
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='%' >--- Lựa chọn ---</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenLoaiBang + "</option>";
                });
                $('#ddlLoaiBang').html(render);
                $('#ddlLoaiBang')[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Bằng loại..', 'error');
            }
        });

        $.ajax({
            type: 'GET',
            url: '/admin/hoso/LoaiDaoTaoGetList',
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='%' >--- Lựa chọn ---</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenLoaiHinhDaoTao + "</option>";
                });
                $('#ddlLoaiHinh').html(render);
                $('#ddlLoaiHinh')[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Hình thức đào tạo.', 'error');
            }
        });

        $.ajax({
            type: 'GET',
            url: '/admin/hoso/XepLoaiGetList',
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='%' >--- Lựa chọn ---</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenXepLoai + "</option>";
                });
                $('#ddlXepLoai').html(render);
                $('#ddlXepLoai')[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Xếp loại.', 'error');
            }
        });
    }

    function clearFileBang1Input(ctrl) {
        try {
            imageBang1 = [];
            ctrl.value = null;
            ctrl.value('');
        }
        catch (ex) {
            
        }
    }

    function clearFileBang2Input(ctrl) {
        try {
            imageBang2 = [];
            ctrl.value = null;
            ctrl.value('');
        }
        catch (ex) {
           
        }
    }

    function isFormMainValidate() {
        if ($('#frmMainTrinhDo').valid()) {
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
        $('#frmMainTrinhDo').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                ddlLoaiBang: { required: true, isDanhMuc: true },
                txtChuyenNganh: { required: true },
                ddlLoaiHinh: { required: true, isDanhMuc: true },
                ddlXepLoai: { required: true, isDanhMuc: true },
                txtNamCapBang: { required: true },
                txtTenTruongCapBang: { required: true }
            },
            messages: {
                ddlLoaiBang: { required: "Nhập loại bằng!" },
                ddlLoaiHinh: { required: "Nhập loại hình đào tạo!" },
                ddlXepLoai: { required: "Nhập xếp loại bằng!" }
            }
        });
    }

    function loadTableTrinhDoHocVien(isPageChanged) {
        var template = $('#table-TrinhDo').html();
        var render = "";

        var makhuvuc = "";
        var phongId = "";
        var timnhanvien = "";
        var hosoid = $('#hidHoSoNhanVienId').val();
        var trinhdoid = "";

        clearTrinhDoDaoTao();

        $.ajax({
            type: 'GET',
            data: {
                corporationId: makhuvuc,
                phongId: phongId,
                keyword: timnhanvien,
                page: tedu.configs.pageIndex,
                pageSize: tedu.configs.pageSize,
                hosoId: hosoid,
                trinhdoId: trinhdoid
            },
            url: '/admin/hoso/GetAllTrinhDoPaging',
            dataType: 'json',
            success: function (response) {
                if (response.Result.Results.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result.Results, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,
                            TenLoaiBang: item.TenLoaiBang,
                            ChuyenNganh: item.ChuyenNganh,
                            TenLoaiHinhDaoTao: item.TenLoaiHinhDaoTao,
                            HinhBangMatPath1: item.HinhBangMatPath1 === null ? '<img src="/admin-side/images/user.png?h=90" ' : '<img src="' + item.HinhBangMatPath1 + '?h=90" />',
                            HinhBangMatPath2: item.HinhBangMatPath2 === null ? '<img src="/admin-side/images/user.png?h=90" ' : '<img src="' + item.HinhBangMatPath2 + '?h=90" />'

                        });
                    });
                }

                $('#hidtrinhdoEditId').val(1); // 1: insert; 2: update
                $('#hidLyLichIdInsert').val(1); // 1: insert; 2: update                

                $('#lbl-totalTrinhDo-records').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tbl-contentTrinhDo').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingTrinhDo(response.Result.RowCount, function () {
                        loadTableTrinhDoHocVien();
                    },
                        isPageChanged);
                }
            },
            error: function (status) {
                render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th></tr>";
                $('#tbl-contentTrinhDo').html(render);
            }
        });

    }
    function wrapPagingTrinhDo(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULTrinhDo a').length === 0 || changePageSize === true) {
            $('#paginationULTrinhDo').empty();
            $('#paginationULTrinhDo').removeData("twbs-paginationTrinhDo");
            $('#paginationULTrinhDo').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULTrinhDo').twbsPagination({
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

    function loadTrinhDo(trinhdoid) {
        $.ajax({
            type: "GET",
            url: "/Admin/Hoso/GetTrinhDoId",
            data: { trinhdoId: trinhdoid },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var trinhdo = response.Result.Results[0];                

                $('#hidTrinhDoId').val(trinhdo.Id);

                $('#ddlLoaiBang').val(trinhdo.LoaiBangDanhMucId);
                $('#txtChuyenNganh').val(trinhdo.ChuyenNganh);
                $('#ddlLoaiHinh').val(trinhdo.LoaiDaoTaoDanhMucId);
                $('#ddlXepLoai').val(trinhdo.XepLoaiDanhMucId);
                $('#txtNamCapBang').val(trinhdo.NamCapBang);
                $('#txtTenTruongCapBang').val(trinhdo.TenTruong);
                $('#txtGhiChuTrinhDo').val(trinhdo.GhiChu);

                $('#imagelistBang1').html('');
                imageBang1 = [];
                $('#imagelistBang1').append('<div class="col-md-3"><img width="100"  data-path="' +
                    trinhdo.HinhBangMatPath1  + '" src="' +
                        trinhdo.HinhBangMatPath1  + '"></div>');
                imageBang1.push(trinhdo.HinhBangMatPath1);

                $('#imagelistBang2').html('');
                imageBang2 = [];
                $('#imagelistBang2').append('<div class="col-md-3"><img width="100"  data-path="' +
                    trinhdo.HinhBangMatPath2  + '" src="' +
                        trinhdo.HinhBangMatPath2  + '" src="'+ '"></div>');
                imageBang2.push(trinhdo.HinhBangMatPath2);

                //LoadTableTrinhDo();

                tedu.stopLoading();
            },
            error: function (status) {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function UpdateTrinhDo(e) {
        e.preventDefault();

        var hosoid = $('#hidHoSoNhanVienId').val();      
        var trinhdoid = $('#hidTrinhDoId').val(); 

        var loaibang = $('#ddlLoaiBang').val();
        var chuyennganh = $('#txtChuyenNganh').val();
        var loaihinh = $('#ddlLoaiHinh').val();
        var xeploai = $('#ddlXepLoai').val();
        var namcapbang = $('#txtNamCapBang').val();
        var tentruong = $('#txtTenTruongCapBang').val();
        var ghichutrinhdo = $('#txtGhiChuTrinhDo').val();

        $.ajax({
            type: "POST",
            url: "/Admin/daotaohv/UpTrinhDo",
            data: {
                Id: trinhdoid,
                HoSoNhanVienId: hosoid,                

                LoaiBangDanhMucId: loaibang,
                ChuyenNganh: chuyennganh,
                LoaiDaoTaoDanhMucId: loaihinh,
                XepLoaiDanhMucId: xeploai,
                NamCapBang: namcapbang,
                TenTruong: tentruong,
                GhiChu: ghichutrinhdo,
                HinhBangMatPath1: imageBang1,
                HinhBangMatPath2: imageBang2
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Success === false) {
                    tedu.notify(response.Message, "error");
                }
                else {
                    tedu.notify('Update trình độ nhân viên.', 'success');

                    loadTableTrinhDoHocVien(true);

                    clearTrinhDoDaoTao();

                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể lưu Trình độ nhân viên', 'error');
                tedu.stopLoading();
            }
        });
    }

    function loadDeleteTrinhDo(trinhdoid) {
        var hosonhanvienid = $('#hidHoSoNhanVienId').val();       

        tedu.confirm('Bạn có chắc chắn xóa bằng này?', function () {
            $.ajax({
                type: "POST",
                url: "/Admin/daotaohv/DelTrinhDo",
                data: {
                    Id: trinhdoid,
                    HoSoNhanVienId: hosonhanvienid
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    tedu.notify('Xóa thành công', 'success');                    

                    loadTableTrinhDoHocVien(true);

                    clearTrinhDoDaoTao();                    

                    tedu.stopLoading();
                },
                error: function (status) {
                    tedu.notify('Xóa trình độ lỗi! Kiểm tra lại.', 'error');
                    tedu.stopLoading();
                }
            });
        });
    }

    function insertTrinhDo(e) {
        e.preventDefault();

        var hosoid = $('#hidHoSoNhanVienId').val();
        //var tringdoid = $('#hidTrinhDoId').val();

        var loaibang = $('#ddlLoaiBang').val();
        var chuyennganh = $('#txtChuyenNganh').val();
        var loaihinh = $('#ddlLoaiHinh').val();
        var xeploai = $('#ddlXepLoai').val();
        var namcapbang = $('#txtNamCapBang').val();
        var tentruong = $('#txtTenTruongCapBang').val();
        var ghichutrinhdo = $('#txtGhiChuTrinhDo').val();

        $.ajax({
            type: "POST",
            url: "/Admin/daotaohv/InTrinhDo",
            data: {                
                HoSoNhanVienId: hosoid,

                LoaiBangDanhMucId: loaibang,
                ChuyenNganh: chuyennganh,
                LoaiDaoTaoDanhMucId: loaihinh,
                XepLoaiDanhMucId: xeploai,
                NamCapBang: namcapbang,
                TenTruong: tentruong,
                GhiChu: ghichutrinhdo,
                HinhBangMatPath1: imageBang1,
                HinhBangMatPath2: imageBang2
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Success === false) {
                    tedu.notify(response.Message, "error");
                }
                else {
                    tedu.notify('Thên trình độ nhân viên.', 'success');

                    loadTableTrinhDoHocVien(true);

                    clearTrinhDoDaoTao();

                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể lưu Trình độ nhân viên', 'error');
                tedu.stopLoading();
            }
        });
    }
  

}