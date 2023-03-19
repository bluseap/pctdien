var chuyenkiemtraController = function () {

    var addeditddn = new addeditgdnController();

    this.loadChuyenKiemTraData = function (giaydenghiid) {
        loadChuyenKiemTraData(giaydenghiid);
    }    

    this.initialize = function () {
        registerEvents();
        clearChuyenKiemTraData();
        loadPhongKhuVucToNhaMay('%');
    }

    function registerEvents() {

        $('#txtKiemTraNgayChuyenXuLy ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        $('#btnSaveKiemTraChuyenXuLy').on('click', function () {    
            var tonhamay = $("#ddlToNhaMayChuyenXuLy").val();

            if (tonhamay == '%') {
                tedu.notify('Chọn Tổ, Nhà máy cần chuyển!', 'error');
            }
            else {
                saveKiemTraChuyenXuLy();
            }            
        }); 

        $("#ddlKiemTraDMCungCapDichVu").on('change', function () {
            var giaydenghidmcungcapnuocId = $("#ddlKiemTraDMCungCapDichVu").val();
            $('#hidGiayDeNghiDMCungCapNuocId').val(giaydenghidmcungcapnuocId);

            var tendichvu = $("#ddlKiemTraDMCungCapDichVu option:selected").text();
            loadTableKiemTraDMCungCapDichVu(tendichvu);
        });  

        $("#ddlKhuVucChuyenXuLy").on('change', function () {
            loadPhongKhuVucToNhaMay($("#ddlKhuVucChuyenXuLy").val());
        });
    }

    function clearChuyenKiemTraData() {
        var datenow = new Date();
        $('#txtKiemTraNgayChuyenXuLy').val(tedu.getFormattedDate(datenow));
        $('#txtKiemTraGhiChu').val('');
        $("#ddlToNhaMayChuyenXuLy")[0].selectedIndex = 0;
    }

    function loadChuyenKiemTraData(giaydenghiid) {
        return $.ajax({
            type: 'GET',
            data: {
                giaydenghiId: giaydenghiid
            },
            url: '/admin/giaydn/GDNDMNuocByGDNId',
            dataType: 'json',
            success: function (response) {
                var gdndm = response.Result[0];

                var render = "<option value='%' >-- Lựa chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenDMCungCapDichVu + "</option>";
                });
                $('#ddlKiemTraDMCungCapDichVu').html(render);
                $("#ddlKiemTraDMCungCapDichVu")[0].selectedIndex = 1;  

                var giaydenghidmcungcapnuocId = $("#ddlKiemTraDMCungCapDichVu").val();
                $('#hidGiayDeNghiDMCungCapNuocId').val(giaydenghidmcungcapnuocId);

                var tendichvu = $("#ddlKiemTraDMCungCapDichVu option:selected").text();
                loadTableKiemTraDMCungCapDichVu(tendichvu);

                var datenow = new Date();
                $('#txtKiemTraNgayChuyenXuLy').val(tedu.getFormattedDate(gdndm.NgayChuyen == "0001-01-01T00:00:00" ? datenow : gdndm.NgayChuyen));                
                //$("#ddlKhuVucChuyenXuLy")[0].selectedIndex = 0;
                $("#ddlToNhaMayChuyenXuLy").val(gdndm.PhongDanhMucId);
                $('#txtKiemTraGhiChu').val(gdndm.LyDoChuyen);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục dịch vụ.', 'error');
            }
        });        
    }

    function loadTableKiemTraDMCungCapDichVu(tendichvu) {

        var template = $('#table-KiemTraDMCungCapDichVu').html();
        var render = "";

        render += Mustache.render(template, {
            Id: 0,
            TenDMCungCapDichVu: tendichvu,
            Stt: 1,
            CreateDate: "",
            Status: 1
        });

        if (render !== '') {
            $('#tbl-contentKiemTraDMCungCapDichVu').html(render);
        }
    }

    function saveKiemTraChuyenXuLy() {
        var giaydenghiid = $('#hidGiayDeNghiId').val();
        var giaydennghidmcungcapnuocid = $('#hidGiayDeNghiDMCungCapNuocId').val();

        var ngayxuly = tedu.getFormatDateYYMMDD($('#txtKiemTraNgayChuyenXuLy').val());
        var tonhamay = $("#ddlToNhaMayChuyenXuLy").val();
        var ghichuxuly = $('#txtKiemTraGhiChu').val();

        $.ajax({
            type: "POST",
            url: "/Admin/giaydn/ChuyenXuLy",
            data: {
                giaydenghiId: giaydenghiid,
                giaydenghidmcungcapnuocId: giaydennghidmcungcapnuocid,

                ngayXuLy: ngayxuly,
                toNhaMay: tonhamay,
                ghichuXuLy: ghichuxuly               
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Đã chuyển kiểm tra xử lý.", "error");
                }
                else {
                    tedu.notify('Chuyển Giấy đề nghị kiểm tra xử lý.', 'success');  

                    addeditddn.loadTableGiayDeNghiNuoc(true);

                    clearChuyenKiemTraData();

                    $('#modal-add-edit-ChuyenKiemTraXuLy').modal('hide');                   

                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Chuyển Giấy đề nghị kiểm tra xử lý.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function loadPhongKhuVucToNhaMay(makhuvuc) {
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
                $('#ddlToNhaMayChuyenXuLy').html(render);
                $("#ddlToNhaMayChuyenXuLy")[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    }
    
}