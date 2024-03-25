var loaddatatableController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    //var userName = $("#hidUserName").val();  

    this.editPhatTrienKhachHang = function () {
        editPhatTrienKhachHang();
    }
    this.editNangCongSuatCayMoi = function () {
        editNangCongSuatCayMoi();
    }
    this.editThayTheVatTu = function () {
        editThayTheVatTu();
    }
    this.editPhatTrienLuoiDien = function () {
        editPhatTrienLuoiDien();
    }

    this.loadTablePhatTrienKhachHang = function () {
        loadTablePhatTrienKhachHang();
    }
    this.loadTableCayMoiNangCongSuat = function () {
        loadTableCayMoiNangCongSuat();
    }
    this.loadTablePhatTrienLuoiDien = function () {
        loadTablePhatTrienLuoiDien();
    }
    this.loadTableThayTheVatTu = function () {
        loadTableThayTheVatTu();
    }
    this.loadKhuVuc = function () {
        loadKhuVuc();
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
                $('#ddlXiNghiep').html(render);

                if (userCorporationId !== "PO") {
                    $('#ddlXiNghiep').prop('disabled', true);

                }
                else {
                    $('#ddlXiNghiep').prop('disabled', false);

                }
                $("#ddlXiNghiep")[0].selectedIndex = 1;

            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

    function loadTableThayTheVatTu() {
        var template = $('#table-KTDThayTheVatTu').html();
        var render = "";

        var xinghiep = $('#ddlXiNghiep').val();
        var nam = $('#txtNam').val();
        var thang = $('#txtThang').val();

        $.ajax({
            type: 'GET',
            url: '/admin/ktdcongtacquanlyktd/ListThayTheVatTu',
            data: {
                makhuvuc: xinghiep,
                nam: nam,
                thang: thang
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,
                            CorporationId: item.CorporationId,
                            MaTenThayTheVatTu: item.MaTenThayTheVatTu,
                            NgayBaoCao: item.NgayBaoCao,

                            TenVatTu: item.TenVatTu,
                            SoLuongVatTu: item.MaTenThayTheVatTu == 'THTHIETBIK' ? '' : '<span class="badge bg-green">' + item.SoLuongVatTu + '</span>',
                            TenLuyTuyen: item.MaTenThayTheVatTu == 'THTHIETBIK' ? '' : item.TenLuyTuyen,
                            SoLuongLuyTuyen: item.MaTenThayTheVatTu == 'THTHIETBIK' ? '' : '<span class="badge bg-blue">' + item.SoLuongLuyTuyen + '</span>',
                            TenChiTiet: item.MaTenThayTheVatTu == 'THTHIETBIK' ? '' : item.TenChiTiet,
                            NoiDungChiTiet: item.MaTenThayTheVatTu == 'THTHIETBIK' ? '' : item.NoiDungChiTiet,
                            ThietBiKhacThayTheVatTu: item.ThietBiKhacThayTheVatTu
                            //TrangThaiPCT: tedu.getPhieuCongTacDien(item.TrangThaiPCT)
                        });
                    });
                }              

                if (render !== '') {
                    $('#tblContentKTDThayTheVatTu').html(render);
                }
               
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });        
    }

    function loadTablePhatTrienLuoiDien() {
        var template = $('#table-KTDPhatTrienLuoiDien').html();
        var render = "";

        var xinghiep = $('#ddlXiNghiep').val();
        var nam = $('#txtNam').val();
        var thang = $('#txtThang').val();

        $.ajax({
            type: 'GET',
            url: '/admin/ktdcongtacquanlyktd/ListPhatTrienLuoiDien',
            data: {
                makhuvuc: xinghiep,
                nam: nam,
                thang: thang
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,
                            CorporationId: item.CorporationId,
                            MaPhatTrienLuoiDien: item.MaPhatTrienLuoiDien,
                            NgayBaoCao: item.NgayBaoCao,

                            TenVatTu: item.TenVatTu,
                            TenChieuDai: item.TenChieuDai,
                            SoLuongChieuDai: '<span class="badge bg-green">' + item.SoLuongChieuDai + '</span>',
                            TenLuyTuyenChieuDai: item.TenLuyTuyenChieuDai,
                            SoLuongLuyTuyenChieuDai: '<span class="badge bg-blue">' + item.SoLuongLuyTuyenChieuDai + '</span>'                            
                            //TrangThaiPCT: tedu.getPhieuCongTacDien(item.TrangThaiPCT)
                        });
                    });
                }

                if (render !== '') {
                    $('#tblContentKTDPhatTrienLuoiDien').html(render);
                }

            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function loadTableCayMoiNangCongSuat() {
        var template = $('#table-KTDNangCongSuatCayMoi').html();
        var render = "";

        var xinghiep = $('#ddlXiNghiep').val();
        var nam = $('#txtNam').val();
        var thang = $('#txtThang').val();

        $.ajax({
            type: 'GET',
            url: '/admin/ktdcongtacquanlyktd/ListCayMoiNangCongSuat',
            data: {
                makhuvuc: xinghiep,
                nam: nam,
                thang: thang
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,
                            CorporationId: item.CorporationId,
                            MaNangCongSuat: item.MaNangCongSuat,
                            NgayBaoCao: item.NgayBaoCao,

                            TenVatTu: item.TenVatTu,                            
                            TenSoLuongNangCongSuat: '<span class="badge bg-green">' + item.TenSoLuongNangCongSuat + '</span>',
                            TenChieuDaiSoLuongSoLuongNangCongSuat: item.TenChieuDaiSoLuongSoLuongNangCongSuat,
                            TenSoLuongSoLuongNangCongSuat: '<span class="badge bg-blue">' + item.TenSoLuongSoLuongNangCongSuat + '</span>',
                            TenCuTheGom: item.TenCuTheGom + ' ' + item.CuTheNangCongSuat !== null ? item.CuTheNangCongSuat : '',                            
                            LuyTuyenTenSoLuongLuyTuyenNangCongSuat: item.LuyTuyenTenSoLuongLuyTuyenNangCongSuat,
                            TenSoLuongLuyTuyenNangCongSuat: '<span class="badge bg-green">' + item.TenSoLuongLuyTuyenNangCongSuat + '</span>',
                            TenCongSuatSoLuongLuyTuyenNangCongSuat: '<span class="badge bg-green">' + item.TenCongSuatSoLuongLuyTuyenNangCongSuat + '</span>'
                            //TrangThaiPCT: tedu.getPhieuCongTacDien(item.TrangThaiPCT)
                        });
                    });
                }

                if (render !== '') {
                    $('#tblContentKTDNangCongSuatCayMoi').html(render);
                }

            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function loadTablePhatTrienKhachHang() {
        var template = $('#table-KTDPhatTrienKhachHang').html();
        var render = "";

        var xinghiep = $('#ddlXiNghiep').val();
        var nam = $('#txtNam').val();
        var thang = $('#txtThang').val();

        $.ajax({
            type: 'GET',
            url: '/admin/ktdcongtacquanlyktd/ListPhatTrienKhachHang',
            data: {
                makhuvuc: xinghiep,
                nam: nam,
                thang: thang
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,
                            CorporationId: item.CorporationId,
                            MaPhatTrienKhachHang: item.MaPhatTrienKhachHang,
                            NgayBaoCao: item.NgayBaoCao,

                            TenVatTu: item.TenVatTu,
                            TenSoLuongPhatTrienKhachHang: '<span class="badge bg-green">' + item.TenSoLuongPhatTrienKhachHang + '</span>',
                            LuyTuyenTenSoLuongPhatTrienKhachHang: item.LuyTuyenTenSoLuongPhatTrienKhachHang,
                            LuyTuyenSoLuongPhatTrienKhachHang: '<span class="badge bg-blue">' + item.LuyTuyenSoLuongPhatTrienKhachHang + '</span>'                            
                            //TrangThaiPCT: tedu.getPhieuCongTacDien(item.TrangThaiPCT)
                        });
                    });
                }

                if (render !== '') {
                    $('#tblContentKTDPhatTrienKhachHang').html(render);
                }

            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function editThayTheVatTu() {
        var thaythevattuid = $('#hidThayTheVatTuId').val();
        $.ajax({
            type: 'GET',
            url: '/admin/ktdcongtacquanlyktd/EditThayTheVatTu',
            data: {
                ThayTheVatTuId: thaythevattuid
            },
            dataType: 'json',
            success: function (response) {
                var thaythevattu = response.Result;

                clearDataThayTheVatTu();

                if (thaythevattu.MaTenThayTheVatTu == 'THTHIETBIK') {
                    $("#ThayTheVatTu11Den15").hide();
                    $("#EditThayTheVatTuThietBiKhac").show();
                }
                else {
                    $("#ThayTheVatTu11Den15").show();
                    $("#EditThayTheVatTuThietBiKhac").hide();
                }

                $("#lbThayTheVatTuTenVatTu").html(thaythevattu.TenThayTheVatTu);
                $("#txtThayTheVatTuSoLuongVatTu").val(thaythevattu.SoLuongThayTheVatTu);
                $("#txtThayTheVatTuSoLuongLuyTuyen").val(thaythevattu.SoLuongLuyTuyenThayTheVatTu);
                $("#txtThayTheVatTuChiTiet").val(thaythevattu.ChiTietThayTheVatTu);
                $("#txtThayTheVatTuThietBiKhac").val(thaythevattu.ThietBiKhacThayTheVatTu);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }
    function clearDataThayTheVatTu() {
        $("#ThayTheVatTu11Den15").show();
        $("#EditThayTheVatTuThietBiKhac").show();

        $("#lbThayTheVatTuTenVatTu").val('');
        $("#txtThayTheVatTuSoLuongVatTu").val(0);
        $("#txtThayTheVatTuSoLuongLuyTuyen").val(0);
        $("#txtThayTheVatTuChiTiet").val('');
        $("#txtThayTheVatTuThietBiKhac").val('');
    }

    function editPhatTrienLuoiDien() {
        var phattrienluoidienid = $('#hidPhatTrienLuoiDienId').val();
        $.ajax({
            type: 'GET',
            url: '/admin/ktdcongtacquanlyktd/EditPhatTienLuoiDien',
            data: {
                PhatTrienLuoiDienId: phattrienluoidienid
            },
            dataType: 'json',
            success: function (response) {
                var thaythevattu = response.Result;

                clearDataPhatTrienLuoiDien();                

                $("#lbPhatTrienLuoiDienTenVatTu").html(thaythevattu.TenPhatTrienLuoiDien);
                $("#txtPhatTrienLuoiDienSoLuongVatTu").val(thaythevattu.ChieuDaiPhatTrienLuoiDien);
                $("#txtPhatTrienLuoiDienSoLuongLuyTuyen").val(thaythevattu.ChieuDaiLuyTuyenPhatTrienLuoiDien);                
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }
    function clearDataPhatTrienLuoiDien() {
        $("#lbPhatTrienLuoiDienTenVatTu").val('');
        $("#txtPhatTrienLuoiDienSoLuongVatTu").val(0);
        $("#txtPhatTrienLuoiDienSoLuongLuyTuyen").val(0);
    }

    function editNangCongSuatCayMoi() {
        var nangcongsuatcaymoiid = $('#hidNangCongSuatCayMoiId').val();
        $.ajax({
            type: 'GET',
            url: '/admin/ktdcongtacquanlyktd/EditNangCongSuatCayMoi',
            data: {
                NangCongSuatCayMoiId: nangcongsuatcaymoiid
            },
            dataType: 'json',
            success: function (response) {
                var nangcongsuat = response.Result;

                clearDataNangCongSuatCayMoi();

                $("#lbNangCongSuatCayMoiTenVatTu").html(nangcongsuat.TenVatTu);
                $("#txtNangCongSuatCayMoiSoLuongVatTu").val(nangcongsuat.SoLuongNangCongSuat);
                $("#txtSoLuongSoLuongNangCongSuat").val(nangcongsuat.SoLuongSoLuongNangCongSuat);
                $("#txtCuTheNangCongSuat").val(nangcongsuat.CuTheNangCongSuat);
                $("#txtNangCongSuatCayMoiLuyTuyen").val(nangcongsuat.SoLuongLuyTuyenNangCongSuat);
                $("#txtNangCongSuatSoLuongCongSuatCongSuat").val(nangcongsuat.CongSuatSoLuongLuyTuyenNangCongSuat);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }
    function clearDataNangCongSuatCayMoi() {
        $("#lbNangCongSuatCayMoiTenVatTu").val('');
        $("#txtNangCongSuatCayMoiSoLuongVatTu").val(0);
        $("#txtSoLuongSoLuongNangCongSuat").val(0);
        $("#txtCuTheNangCongSuat").val('');
        $("#txtNangCongSuatCayMoiLuyTuyen").val(0);
        $("#txtNangCongSuatSoLuongCongSuatCongSuat").val(0);
    }

    function editPhatTrienKhachHang() {
        var phattrienkhachhangid = $('#hidPhatTrienKhachHangId').val();
        $.ajax({
            type: 'GET',
            url: '/admin/ktdcongtacquanlyktd/EditPhatTrienKhachHang',
            data: {
                PhatTrienKhachHangId: phattrienkhachhangid
            },
            dataType: 'json',
            success: function (response) {
                var phattrienkhachhang = response.Result;

                clearDataPhatTrienKhachHang();

                $("#lbPhatTrienKhachHangTenVatTu").html(phattrienkhachhang.TenVatTu);
                $("#txtPhatTrienKhachHangSoLuongVatTu").val(phattrienkhachhang.SoLuongPhatTrienKhachHang);
                $("#txtPhatTrienKhachHangSoLuongLuyTuyen").val(phattrienkhachhang.LuyTuyenPhatTrienKhachHang);
                
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }
    function clearDataPhatTrienKhachHang() {
        $("#lbPhatTrienKhachHangTenVatTu").val('');
        $("#txtPhatTrienKhachHangSoLuongVatTu").val(0);
        $("#txtPhatTrienKhachHangSoLuongLuyTuyen").val(0);
    }

}