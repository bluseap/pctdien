var addeditdaotaohvController = function () {    

    var imageNhanVien = [];

    this.loadEditHoSoHocVien = function (hosonhanvienid) {
        addeditClearData(); 
        loadEditHoSoHocVien(hosonhanvienid);        
    }

    this.loadTableHoSoHocVien = function () {
        loadTableHoSoHocVien();
    }

    this.initialize = function () {       
        registerEvents();
        addeditClearData(); 
        loadData();
    }

    function registerEvents() {

        $('#txtNgaySinh, #txtNgayThamGiaBHXH, #txtNgayCap, #txtNgayCongTac ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();        

        $('#ddlKhuVucCT').on('change', function () {
            var corporationId = $('#ddlKhuVuc').val();
            loadPhongKhuVuc(corporationId, '0');
            loadChucVuNhanVien(corporationId, '0');            
        });

        $('#btnSaveHoSoHocVien').on('click', function () {            
            var ishosonhanvien = $('#hidInsertHoSoNhanVienId').val(); // 1: insert; 2: update;

            if (ishosonhanvien == 2) {
                updateHoSoHocVien();
            }
            else {
                tedu.notify("Chưa lưu Hồ sơ học viên.", "error");
            }
        });

        $("#fileInputHinhNhanVien").on('change', function () {
            var fileUpload = $(this).get(0);
            var files = fileUpload.files;

            var data = new FormData();

            for (var i = 0; i < files.length; i++) {
                data.append(files[i].name, files[i]);
            }
            $.ajax({
                type: "POST",
                //url: "/Admin/Upload/UploadImageNhanVien",
                url: "/Admin/Upload/UploadImageResizeW60H90",
                contentType: false,
                processData: false,
                data: data,
                success: function (path) {
                    clearFileHinhNhanVienInput($("#fileInputHinhNhanVien"));
                    imageNhanVien.push(path);

                    $('#imagelistHinhThe').append('<div class="col-md-3"><img width="100"  data-path="' + path + '" src="' + path + '"></div>');
                    tedu.notify('Đã tải ảnh lên thành công!', 'success');
                },
                error: function () {
                    tedu.notify('There was error uploading files!', 'error');
                }
            });
        });

        $('body').on('click', '.btn-delete-ChucDanhNhanVien', function (e) {
            e.preventDefault();
            let chucdanhnhanvienid = $(this).data('id');
            
            deleteChucDanh(chucdanhnhanvienid);
        });

        $('#ddlChucDanhNhanVien').on('change', function () {
            let chucdanh = $('#ddlChucDanhNhanVien').val();
            
            if (chucdanh !== '0') {
                addChucDanhNhanVien();
            }
        });

        $('#ddlBacAnToanDien').on('change', function () {
            let bacantoandienid = $('#ddlBacAnToanDien').val();

            if (bacantoandienid !== '0') {
                updateBacAnToanDienToHoSoNhanVien();
            }
        });

    }   

    function addeditClearData() {
        var datenow = new Date();

        $('#hidHoSoNhanVienId').val(0);        
        $('#hidInsertHoSoNhanVienId').val(0); // 1: insert; 2: update;

        clearFileHinhNhanVienInput($("#fileInputHinhNhanVien"));
        $('#imagelistHinhThe').html('');
        imagelistHinhThe = [];

        $('#txtTenNhanVien').val('');
        $('#txtNgaySinh').val(tedu.getFormattedDate(datenow));
        $('#txtSoBHXH').val('');
        $('#txtNgayThamGiaBHXH').val(tedu.getFormattedDate(datenow));
        $('#txtSoCCCD').val('');
        $('#txtNgayCap').val(tedu.getFormattedDate(datenow));
        $('#txtSoDienThoai').val('');

        $('#txtEmail').val('');
        $('#txtNoiSinh').val('');
        $('#txtNoiThuongTru').val('');
        $('#txtNgayCongTac').val(tedu.getFormattedDate(datenow));

        $('#ddlKhuVucCT')[0].selectedIndex = 0;
        $('#ddlChucVuCT')[0].selectedIndex = 0;
        $('#ddlPhongBanCT')[0].selectedIndex = 0;        

        $("#ddlBacAnToanDien")[0].selectedIndex = 0;
        $("#ddlChucDanhNhanVien")[0].selectedIndex = 0;
        $('#CacChucDanhNhanVien-list').html('');
    }

    function loadData() {
        disabledAllFieldDataForm();
        loadBacAnToanDien(true);

        let tenchucdanh = "<option value='0' >-- Lựa chọn --</option>";
        tenchucdanh += "<option value='NGUOICAPPHIEU' >Người cấp phiếu</option>";
        tenchucdanh += "<option value='NGUOICHIHUYTT' >Người chỉ huy trực tiếp</option>";
        tenchucdanh += "<option value='NGUOICHOPHEP' >Người cho phép</option>";
        tenchucdanh += "<option value='NGUOIKTATLD' >Người kiểm tra ATLĐ</option>";
        tenchucdanh += "<option value='NGUOILANHDAOCV' >Người lãnh đạo công việc</option>";
        $('#ddlChucDanhNhanVien').html(tenchucdanh);
                     
    }

    function clearFileHinhNhanVienInput(ctrl) {
        try {
            imageNhanVien = [];
            ctrl.value = null;
            ctrl.value('');
        }
        catch (ex) {
        }
    }

    function loadTableHoSoHocVien(isPageChanged) {
        var template = $('#table-HoSoNhanVien').html();
        var render = "";

        var makhuvuc = $('#ddlKhuVuc').val();
        var phongtoid = $('#ddlPhongTo').val();
        var timnoidung = $('#txtTimNoiDung').val();

        $.ajax({
            type: 'GET',
            url: '/admin/daotaohv/ListHoSoHV',
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
                            Ten: item.Ten,
                            HinhNhanVien: item.HinhNhanVien === null ? '<img src="/admin-side/images/user.png?h=90" />' : '<img src="' + item.HinhNhanVien + '?h=90" />',
                            TenKhuVuc: item.CorporationName,
                            TenPhong: item.TenPhong,
                            TenChucVu: item.TenChucVu,
                            NgaySinh: tedu.getFormattedDate(item.NgaySinh),
                            CreateDate: tedu.getFormattedDate(item.CreateDate),
                            Status: tedu.getHoSoNhanVienStatus(item.Status)
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                $('#lblHoSoNhanVienTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#tblContentHoSoNhanVien').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingHoSoHocVien(response.Result.RowCount, function () {
                        loadTableHoSoHocVien();
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
    function wrapPagingHoSoHocVien(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULHoSoNhanVien a').length === 0 || changePageSize === true) {
            $('#paginationULHoSoNhanVien').empty();
            $('#paginationULHoSoNhanVien').removeData("twbs-pagination");
            $('#paginationULHoSoNhanVien').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULHoSoNhanVien').twbsPagination({
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

    function loadPhongKhuVuc(makhuvuc, phongbandanhmucid) {
        $.ajax({
            type: 'GET',
            url: '/admin/ddnuockstk/ListPhongUserName',
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
                $('#ddlPhongBanCT').html(render);

                if (phongbandanhmucid == '0') {
                    $("#ddlPhongBanCT")[0].selectedIndex = 0;
                } else {                    
                    $('#ddlPhongBanCT').val(phongbandanhmucid);
                }
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    }  

    function loadChucVuNhanVien(makhuvuc, chucvunhanvienid) {
        $.ajax({
            type: 'GET',
            url: '/admin/daotaohv/ChucVuNV',
            data: { corporationId: makhuvuc },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='%' >--- Lựa chọn ---</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenChucVu + "</option>";
                });
                $('#ddlChucVuCT').html(render);
                
                if (chucvunhanvienid == '0') {
                    $("#ddlChucVuCT")[0].selectedIndex = 0;
                } else {
                    $('#ddlChucVuCT').val(chucvunhanvienid);
                }
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh Chức vụ Nhân viên.', 'error');
            }
        });
    }

    function loadCongViec(hosonhanvienid) {
        $.ajax({
            type: 'GET',
            url: '/admin/daotaohv/congtac',
            data: { hosonhanvienId: hosonhanvienid },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var congviec = response.Result[0];               
               
                $('#txtNgayCongTac').val(tedu.getFormattedDate(congviec.NgayHieuLuc));

            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh Chức vụ Nhân viên.', 'error');
            }
        });
    }

    function isFormMainValidate() {
        if ($('#frmMainEditHoSoHocVien').valid()) {
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
        $('#frmMainEditHoSoHocVien').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                txtTenNhanVien: {
                    required: true
                },
                txtNgaySinh: {
                    required: true,
                    isDateVietNam: true
                },
                //txtSoBHXH: {
                //    required: true
                //},
                //txtNgayThamGiaBHXH: {
                //    required: true,
                //    isDateVietNam: true
                //},
                txtSoCCCD: {
                    required: true
                },
                txtNgayCap: {
                    required: true,
                    isDateVietNam: true
                },
                //txtSoDienThoai: {
                //    required: true
                //},
                txtEmail: {                    
                    email: true
                },
                //txtNoiSinh: {
                //    required: true
                //},
                txtNoiThuongTru: {
                    required: true
                },
                txtNgayCongTac: {
                    required: true,
                    isDateVietNam: true
                },                             
                ddlChucVuCT: {
                    required: true,
                    isDanhMuc: true
                },  
                ddlPhongBanCT: {
                    required: true,
                    isDanhMuc: true
                }, 
            },
            //messages: {
            //    txtTrichYeu: { required: "Nhập nội dung trích yếu của văn bản.." }
            //}
        });
    }

    function loadEditHoSoHocVien(hosonhanvienid) {

        $.ajax({
            type: "GET",
            url: "/Admin/daotaohv/hosonvid",
            data: { hosonhanvienId: hosonhanvienid },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var hoso = response.Result[0];

                //addeditClearData();

                $('#hidHoSoNhanVienId').val(hoso.Id);
                $('#hidInsertHoSoNhanVienId').val(2);

                $('#imagelistHinhThe').html('');
                imagelistHinhThe = [];
                $('#imagelistHinhThe').append('<div class="col-md-3"><img width="100"  data-path="' + hoso.HinhNhanVien + '" src="' + hoso.HinhNhanVien + '" /></div>');
                imageNhanVien.push(hoso.HinhNhanVien);

                $('#txtTenNhanVien').val(hoso.Ten);
                $('#txtNgaySinh').val(tedu.getFormattedDate(hoso.NgaySinh));
                $('#txtSoBHXH').val(hoso.MaSoBHXH);

                var datenow = new Date();
                $('#txtNgayThamGiaBHXH').val(tedu.getFormattedDate(hoso.NgayThamGiaBHXH == '0001-01-01T00:00:00' ? datenow : hoso.NgayThamGiaBHXH));
                $('#txtSoCCCD').val(hoso.SoCMND);
                $('#txtNgayCap').val(tedu.getFormattedDate(hoso.NgayCapCMND));
                $('#txtSoDienThoai').val(hoso.SoDienThoai);

                $('#txtEmail').val(hoso.Email);
                $('#txtNoiSinh').val(hoso.NoiSinh);
                $('#txtNoiThuongTru').val(hoso.NoiOHienNay);

                loadCongViec(hoso.Id);

                $('#ddlKhuVucCT').val(hoso.CorporationId);
                loadPhongKhuVuc(hoso.CorporationId, hoso.PhongBanDanhMucId);
                loadChucVuNhanVien(hoso.CorporationId, hoso.ChucVuNhanVienId);

                $('#ddlBacAnToanDien').val(hoso.BacAnToanDienId);

                loadDataChucDanhNhanVien();

                tedu.stopLoading();
            },
            error: function (status) {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });      
    }

    function updateHoSoHocVien() {
        var hosonhanvienId = $('#hidHoSoNhanVienId').val();        

        var isMainValidate = isFormMainValidate();
        if (isMainValidate === true) {
            var soBHXH = $('#txtSoBHXH').val();
            var ngaythamgiaBHXH = tedu.getFormatDateYYMMDD($('#txtNgayThamGiaBHXH').val());            
            var soCCCD = $('#txtSoCCCD').val();
            var ngaycap = tedu.getFormatDateYYMMDD($('#txtNgayCap').val());
            var sodienthoai = $('#txtSoDienThoai').val();
            var emailNV = $('#txtEmail').val();
            var noisinh = $('#txtNoiSinh').val();
            var noithuongtru = $('#txtNoiThuongTru').val();
            var ngaycongtac = tedu.getFormatDateYYMMDD($('#txtNgayCongTac').val());
            var khuvuc = $('#ddlKhuVucCT').val();
            var chucvu = $('#ddlChucVuCT').val();
            var phongban = $('#ddlPhongBanCT').val();

            var bacantoandienid = $('#ddlBacAnToanDien').val();

            $.ajax({
                type: "POST",
                url: "/Admin/daotaohv/UpHoSoNV",
                data: {
                    Id: hosonhanvienId,

                    HinhNhanVien: imageNhanVien,

                    MaSoBHXH: soBHXH,
                    NgayThamGiaBHXH: ngaythamgiaBHXH,
                    SoCMND: soCCCD,
                    NgayCapCMND: ngaycap,
                    SoDienThoai: sodienthoai,
                    Email: emailNV,
                    NoiSinh: noisinh,
                    NoiOHienNay: noithuongtru,

                    NgayHieuLuc: ngaycongtac,

                    CorporationId: khuvuc,
                    ChucVuNhanVienId: chucvu,
                    PhongBanDanhMucId: phongban,

                    BacAnToanDienId: bacantoandienid
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Có lỗi! Không thể Lưu Hồ sơ học viên.", "error");
                    }
                    else {
                        tedu.notify('Lưu hồ sơ học viên.', 'success');

                        loadTableHoSoHocVien(true);

                        addeditClearData();

                        $('#modal-add-edit-EditHoSoHocVien').modal('hide');
                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Lưu hồ sơ học viên.', 'error');
                    tedu.stopLoading();
                }
            });
        }
    }

    function disabledAllFieldDataForm() {
        $('#txtTenNhanVien').prop('disabled', true);
        $('#txtNgaySinh').prop('disabled', true);
        $('#txtSoBHXH').prop('disabled', true);
        $('#txtNgayThamGiaBHXH').prop('disabled', true);
        $('#txtSoCCCD').prop('disabled', true);
        $('#txtNgayCap').prop('disabled', true);
        $('#txtSoDienThoai').prop('disabled', true);
        $('#txtEmail').prop('disabled', true);
        $('#txtNoiSinh').prop('disabled', true);
        $('#txtNoiThuongTru').prop('disabled', true);
        $('#txtNgayCongTac').prop('disabled', true);
        $('#ddlKhuVucCT').prop('disabled', true);
        $('#ddlChucVuCT').prop('disabled', true);
        $('#ddlPhongBanCT').prop('disabled', true);        
    }

    function loadDataChucDanhNhanVien() {
        var hosonhanvienId = $('#hidHoSoNhanVienId').val();

        $.ajax({
            url: '/admin/daotaohv/ListChucDanhNV',
            data: {
                hosonhanvienid: hosonhanvienId
            },
            type: 'get',
            dataType: 'json',
            success: function (response) {
                var render = '';
                $.each(response.Result, function (i, item) {                    
                    render += '<div class="col-md-3"> <label><span style="color: blue" class="text">' + item.TenChucDanh + '</span></label> <br/> <a href="#" data-id="' + item.Id + '" class="btn-delete-ChucDanhNhanVien">Xóa</a></div>'
                });
                $('#CacChucDanhNhanVien-list').html(render);
            }
        });
    }

    function loadBacAnToanDien(Active) {
        $.ajax({
            type: 'GET',
            url: '/admin/pctdiennhap/ListBacATD',
            data: { active: Active },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='0' >-- Lựa chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenBacAnToanDien + "</option>";
                });
                $('#ddlBacAnToanDien').html(render);
                $("#ddlBacAnToanDien")[0].selectedIndex = 0;                
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Bậc an toàn điện.', 'error');
            }
        });
    }

    function addChucDanhNhanVien() {
        let hosonhanvienid = $("#hidHoSoNhanVienId").val();        
        //let bacantoandienid = $("#ddlBacAnToanDien").val();
        let chucdanhnhanviencode = $("#ddlChucDanhNhanVien").val();
        let tenchucdanhnhanvien = $("#ddlChucDanhNhanVien option:selected").text();

        $.ajax({
            type: "POST",
            url: "/Admin/daotaohv/AddChucDanh",
            data: {
                HoSoNhanVienId: hosonhanvienid,

                CodeChucDanh: chucdanhnhanviencode,
                TenChucDanh: tenchucdanhnhanvien
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Update Phiếu công tác điện.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Add chức danh nhân viên. Id: " + hosonhanvienid);

                    tedu.notify('Add chức danh nhân viên.', 'success');

                    loadDataChucDanhNhanVien();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Add chức danh nhân viên.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function deleteChucDanh(chucdanhnhanvienId) {
        tedu.confirm('Bạn có chắc chắn xóa chức danh nhân viên này?', function () {
            $.ajax({
                type: "POST",
                url: "/Admin/daotaohv/DeleteChucDanh",
                data: {
                    chucdanhnhanvienid: chucdanhnhanvienId
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    if (response.Result === false) {
                        tedu.notify("Xóa PCT chức danh nhân viên.", "error");
                    }
                    else {
                        nguyen.appUserLoginLogger(userName, "Xóa PCT chức danh nhân viên. Id: " + chucdanhnhanvienId);

                        tedu.notify('Xóa PCT chức danh nhân viên công tác.', 'success');

                        loadDataChucDanhNhanVien();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể Xóa PCT chức danh nhân viên công tác.', 'error');
                    tedu.stopLoading();
                }
            });
        });  
    }  

    function updateBacAnToanDienToHoSoNhanVien() {
        let hosonhanvienid = $("#hidHoSoNhanVienId").val();
        let bacantoandienid = $("#ddlBacAnToanDien").val();        

        $.ajax({
            type: "POST",
            url: "/Admin/daotaohv/UpBacATDHoSoNV",
            data: {
                HoSoNhanVienId: hosonhanvienid,
                BacAnToanDienId: bacantoandienid
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Update Bậc an toàn điện đến hồ sơ nhân viên.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Update Bậc an toàn điện đến hồ sơ nhân viên. Id: " + hosonhanvienid);
                    tedu.notify('Update Bậc an toàn điện đến hồ sơ nhân viên.', 'success');
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Update Bậc an toàn điện đến hồ sơ nhân viên.', 'error');
                tedu.stopLoading();
            }
        });
    }

}