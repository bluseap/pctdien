var giaydnntController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();

    var addeditgdnt = new addeditgdntController();   

    this.initialize = function () {
        loadKhuVuc();

        registerEvents();

        addeditgdnt.initialize();

        loadData();        
    }

    function registerEvents() {    

        $("#ddl-show-pageGiayDeNghiCungCapNuoc").on('change', function () {
            tedu.configs.pageSize = $(this).val();
            tedu.configs.pageIndex = 1;
            addeditgdnt.loadTableGiayDeNghiNuoc(true);
        });        

        $('#ddlKhuVuc').on('change', function () {
            var corporationId = $('#ddlKhuVuc').val();

            $('#ddlKhuVucChuyenXuLy').val(corporationId);
            loadPhongKhuVuc(corporationId);            

            addeditgdnt.loadTableGiayDeNghiNuoc(true);

            tedu.notify('Danh mục phòng theo khu vực.', 'success');
        });

        $('#btnTimNoiDung').on('click', function () {
            addeditgdnt.loadTableGiayDeNghiNuoc(true);
        });

        $('#txtTimNoiDung').on('keypress', function (e) {
            if (e.which === 13) {
                addeditgdnt.loadTableGiayDeNghiNuoc(true);
            }
        });

        $('#btnGDNDSExcel').on('click', function () {
            var dieukienExcel = $('#ddlGDNDieuKien').val();
            if (dieukienExcel === "DDNUOCNGAYNHAN") { // di doi nuoc theo ngay tiep nhan
                excelDiDoiNuocNgayTiepNhan();
            }
            else if (dieukienExcel === "KDNUOCNGAYNHAN") { // kiem dinh nuoc theo ngay tiep nhan
                excelKiemDinhNuocNgayTiepNhan();
            }
        });

        $('body').on('click', '.btn-XemThongTinDiDoi', function (e) {
            e.preventDefault();
            var giaydenghiid = $(this).data('id');            

            addeditgdnt.XemThongTinXuLy(giaydenghiid);
            $('#modal-add-edit-XemThongTinXuLy').modal('show');
        });
    }

    function loadKhuVuc() {
        return $.ajax({
            type: 'GET',
            url: '/admin/hoso/GetListCorNhanSu',
            dataType: 'json',
            success: function (response) {
                var render = "<option value='%' >-- Lựa chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Name + "</option>";
                });
                $('#ddlKhuVuc').html(render);           

                if (userCorporationId !== "PO") {
                    $('#ddlKhuVuc').prop('disabled', true);                   
                }
                else {
                    $('#ddlKhuVuc').prop('disabled', false);                   
                }
                $("#ddlKhuVuc")[0].selectedIndex = 1;                

                loadPhongKhuVuc($("#ddlKhuVuc").val());

                //addeditgdn.loadTableGiayDeNghiNuoc(true);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

    function loadData() {   
        var datenow = new Date();
        $('#txtGDNTuNgay').val(tedu.getFormattedDate(datenow));
        $('#txtGDNDenNgay').val(tedu.getFormattedDate(datenow));

        var dieukienExcel = [
            { value: "DDNUOCNGAYNHAN", Name: "DS Di dời Nước theo ngày tiếp nhận" },
            { value: "KDNUOCNGAYNHAN", Name: "DS Kiểm định Nước theo ngày tiếp nhận" }
        ];
        var render = "";
        for (var i = 0; i < dieukienExcel.length; i++) {
            render += "<option value='" + dieukienExcel[i].value + "'>" + dieukienExcel[i].Name + "</option>";
        }
        $('#ddlGDNDieuKien').html(render);
    }

    function loadPhongKhuVuc(makhuvuc) {
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
                $('#ddlPhongTo').html(render);
                $("#ddlPhongTo")[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Phòng.', 'error');
            }
        });
    }    

    function excelDiDoiNuocNgayTiepNhan() {

        var dieukien1 = $('#ddlGDNDieuKien').val();
        var tungay1 = tedu.getFormatDateYYMMDD($('#txtGDNTuNgay').val());
        var dengay1 = tedu.getFormatDateYYMMDD($('#txtGDNDenNgay').val());

        $.ajax({
            type: 'POST',
            url: '/admin/giaydn/ExcelDDNuoc',
            data: {
                dieukien: dieukien1,
                tungay: tungay1,
                denngay: dengay1
            },
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                window.location.href = response;
                tedu.stopLoading();
            }
        });
    }   

    function excelKiemDinhNuocNgayTiepNhan() {

    }

}