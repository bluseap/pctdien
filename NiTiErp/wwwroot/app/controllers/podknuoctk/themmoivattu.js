var themmoivattuController = function () {

    var userName = $("#hidUserName").val();

    this.DanhMucKhoVatTu = function (corporationid) {
        DanhMucKhoVatTu(corporationid);
    }

    this.initialize = function () {
        registerEvents();
        clearData();
    }

    function registerEvents() {

        $('#txtTimNoiDung').on('keypress', function (e) {
            if (e.which === 13) {
                loadTableChiTietVatTu();
            }
        });

        $("#btnTimTenMaMaKeToanVatTu").on('click', function () {
            loadTableChiTietVatTu();
        });       
       
    }

    function clearData() {
        var datenow = new Date();

    }

    function DanhMucKhoVatTu(corporationid) {
        $.ajax({
            type: 'GET',
            url: '/admin/podknuoctk/KhoDanhMuc',
            data: {
                CorporationId: corporationid,
                LoaiVatTuId: "NN"
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='%' >-- Tất cả --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenKho + "</option>";
                });
                $('#ddlKhoVatTuKeToan').html(render);
                $("#ddlKhoVatTuKeToan")[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục kho vật tư.', 'error');
            }
        });
    }

    function loadTableChiTietVatTu() {
        var template = $('#template-table-ThemMoiVatTu').html();
        var render = "";

        var corporationId = $('#ddlKhuVuc').val();
        const timvattu = $('#txtTenMaMaKeToanVatTu').val();
        const danhmuckhovattu = $('#ddlKhoVatTuKeToan').val();

        $.ajax({
            type: 'GET',
            url: '/admin/PoDKNuocTK/TimVatTu',
            data: {
                corporationid: corporationId,
                khodanhmuc: danhmuckhovattu,
                timtenmavattu: timvattu
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result, function (i, item) {
                        render += Mustache.render(template, {                            
                            MAVT: item.MAVT,

                            KeToanMaSoVatTu: item.KeToanMaSoVatTu,
                            TenKhoVatTu: item.TenKhoVatTu,
                            TENVT: item.TENVT

                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }

                if (render !== '') {
                    $('#tblContentThemVatTu').html(render);
                }

            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }
    


}