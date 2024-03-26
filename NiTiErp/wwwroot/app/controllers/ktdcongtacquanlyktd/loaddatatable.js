var loaddatatableController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    //var userName = $("#hidUserName").val();  

    this.editCaiTaoSuaChua = function () {
        editCaiTaoSuaChua();
    }
    this.editDuyTuBaoDuong = function () {
        editDuyTuBaoDuong();
    }
    this.editXuLyKhac = function () {
        editXuLyKhac();
    }
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

    this.loadTableCaiTaoSuaChua = function () {
        loadTableCaiTaoSuaChua();
    }
    this.loadTableDuyTuBaoDuong = function () {
        loadTableDuyTuBaoDuong();
    }
    this.loadTableXuLyKhac = function () {
        loadTableXuLyKhac();
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

    function loadTableXuLyKhac() {
        var template = $('#table-KTDXuLyKhac').html();
        var render = "";

        var xinghiep = $('#ddlXiNghiep').val();
        var nam = $('#txtNam').val();
        var thang = $('#txtThang').val();

        $.ajax({
            type: 'GET',
            url: '/admin/ktdcongtacquanlyktd/ListXuLyKhac',
            data: {
                makhuvuc: xinghiep,
                nam: nam,
                thang: thang
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,
                            CorporationId: item.CorporationId,
                            MaXuLyKhac: item.MaXuLyKhac,
                            NgayBaoCao: item.NgayBaoCao,

                            TenXuLyKhac: item.TenXuLyKhac,
                            NoiDungXuLyKhac: item.NoiDungXuLyKhac
                        });
                    });
                }

                if (render !== '') {
                    $('#tblContentKTDXuLyKhac').html(render);
                }

            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function loadTableDuyTuBaoDuong() {
        var template = $('#table-KTDDuyTuBaoDuong').html();
        var render = "";

        var xinghiep = $('#ddlXiNghiep').val();
        var nam = $('#txtNam').val();
        var thang = $('#txtThang').val();

        $.ajax({
            type: 'GET',
            url: '/admin/ktdcongtacquanlyktd/ListDuyTuBaoDuong',
            data: {
                makhuvuc: xinghiep,
                nam: nam,
                thang: thang
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,
                            CorporationId: item.CorporationId,
                            MaDuyTuBaoDuong: item.MaDuyTuBaoDuong,
                            NgayBaoCao: item.NgayBaoCao,

                            TenDuyTuBaoDuong: item.TenDuyTuBaoDuong,
                            TenSoLuongDuyTuBaoDuong: '<span class="badge bg-green">' + item.TenSoLuongDuyTuBaoDuong + '</span>',
                            TenCuTheGomDTBD: item.TenCuTheGom,
                            TenLuyTuyenDTBD: item.TenLuyTuyen,
                            TenSoLuongLuyTuyenDTBD: '<span class="badge bg-blue">' + item.TenSoLuongLuyTuyenDTBT + '</span>'

                        });
                    });
                }

                if (render !== '') {
                    $('#tblContentKTDDuyTuBaoDuong').html(render);
                }

            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function loadTableCaiTaoSuaChua() {
        var template = $('#table-KTDCaiTaoSuaChua').html();
        var render = "";

        var xinghiep = $('#ddlXiNghiep').val();
        var nam = $('#txtNam').val();
        var thang = $('#txtThang').val();

        $.ajax({
            type: 'GET',
            url: '/admin/ktdcongtacquanlyktd/ListCaiTaoSuaChua',
            data: {
                makhuvuc: xinghiep,
                nam: nam,
                thang: thang
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,
                            CorporationId: item.CorporationId,
                            MaCaiTaoSuaChua: item.MaCaiTaoSuaChua,
                            NgayBaoCao: item.NgayBaoCao,

                            TenCaiTaoSuaChua: item.TenCaiTaoSuaChua,
                            TenSoLuongCaiTaoSuaChua: item.SoLuongCaiTaoSuaChua == 0 ?
                                '' : '<span class="badge bg-green">' + item.TenSoLuongCaiTaoSuaChua + '</span>',

                            TenDai: (item.MaCaiTaoSuaChua == 'CTSLDG' || item.MaCaiTaoSuaChua == 'CTTTLT') ?
                                'Mua ' : ((item.MaCaiTaoSuaChua == 'CTDTDG' || item.MaCaiTaoSuaChua == 'CTTHLT') ?
                                    'K/H ' : item.TenDai),                           
                            TenDaiCaiTaoSuaChua: (item.MaCaiTaoSuaChua == 'CTSLDG' || item.MaCaiTaoSuaChua == 'CTTTLT') ?
                                '<span class="badge bg-blue">' + item.TenMuaCaiTaoSuaChua + '</span>' :
                                ((item.MaCaiTaoSuaChua == 'CTDTDG' || item.MaCaiTaoSuaChua == 'CTTHLT') ?
                                    '<span class="badge bg-blue">' + item.TenKHCaiTaoSuaChua + '</span>' : '<span class="badge bg-blue">' + item.TenDaiCaiTaoSuaChua + '</span>'),

                            TenCuTheGom: (item.MaCaiTaoSuaChua == 'CTSLDG' || item.MaCaiTaoSuaChua == 'CTTTLT' || item.MaCaiTaoSuaChua == 'CTDTDG' || item.MaCaiTaoSuaChua == 'CTTHLT') ?
                                '' : item.TenCuTheGom,  
                            
                            TenLuyTuyen: (item.MaCaiTaoSuaChua == 'CTSLDG' || item.MaCaiTaoSuaChua == 'CTTTLT') ?
                                'Bán ' : ((item.MaCaiTaoSuaChua == 'CTDTDG' || item.MaCaiTaoSuaChua == 'CTTHLT') ? 'Thực hiện ' : item.TenLuyTuyen),
                            TenLuyTuyenDaiCaiTaoSuaChua: (item.MaCaiTaoSuaChua == 'CTSLDG' || item.MaCaiTaoSuaChua == 'CTTTLT') ?
                                '<span class="badge bg-green">' + item.TenBanCaiTaoSuaChua + '</span>' :
                                ((item.MaCaiTaoSuaChua == 'CTDTDG' || item.MaCaiTaoSuaChua == 'CTTHLT') ?
                                    '<span class="badge bg-green">' + item.TenThucHienCaiTaoSuaChua + '</span>' : '<span class="badge bg-green">' + item.TenLuyTuyenDaiCaiTaoSuaChua + '</span>'),

                            TenSoLuongSoLuongLuyTuyenCaiTaoSuaChua: (item.MaCaiTaoSuaChua == 'CTSLDG' || item.MaCaiTaoSuaChua == 'CTTTLT' || item.MaCaiTaoSuaChua == 'CTDTDG' || item.MaCaiTaoSuaChua == 'CTTHLT') ?
                                '' : '<span class="badge bg-blue">' + item.TenSoLuongSoLuongLuyTuyenCaiTaoSuaChua + '</span>',

                            TenTyLe: (item.MaCaiTaoSuaChua == 'CTCTNCHT' || item.MaCaiTaoSuaChua == 'CTCTNCTT' || item.MaCaiTaoSuaChua == 'CTLHDMN') ?
                                '' : item.TenTyLe,
                            TenTyLeCaiTaoSuaChua: (item.MaCaiTaoSuaChua == 'CTCTNCHT' || item.MaCaiTaoSuaChua == 'CTCTNCTT' || item.MaCaiTaoSuaChua == 'CTLHDMN') ?
                                '' : '<span class="badge bg-green">' + item.TenTyLeCaiTaoSuaChua + '</span>',

                            TenHaoHut: (item.MaCaiTaoSuaChua == 'CTCTNCHT' || item.MaCaiTaoSuaChua == 'CTCTNCTT' || item.MaCaiTaoSuaChua == 'CTLHDMN' || item.MaCaiTaoSuaChua == 'CTDTDG' || item.MaCaiTaoSuaChua == 'CTTHLT') ?
                                '' : item.TenHaoHut,
                            TenHaoHutCaiTaoSuaChua: (item.MaCaiTaoSuaChua == 'CTCTNCHT' || item.MaCaiTaoSuaChua == 'CTCTNCTT' || item.MaCaiTaoSuaChua == 'CTLHDMN' || item.MaCaiTaoSuaChua == 'CTDTDG' || item.MaCaiTaoSuaChua == 'CTTHLT') ?
                                '' : '<span class="badge bg-blue">' + item.TenHaoHutCaiTaoSuaChua + '</span>',
                        });
                    });
                }

                if (render !== '') {
                    $('#tblContentKTDCaiTaoSuaChua').html(render);
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

    function editXuLyKhac() {
        var xulykhacid = $('#hidXuLyKhacId').val();
        $.ajax({
            type: 'GET',
            url: '/admin/ktdcongtacquanlyktd/EditXuLyKhac',
            data: {
                XuLyKhacId: xulykhacid
            },
            dataType: 'json',
            success: function (response) {
                var xulykhac = response.Result;

                clearDataXuLyKhac();

                $("#lbXuLyKhacTenVatTu").html(xulykhac.TenXuLyKhac);
                $("#txtXuLyKhacNoiDung").val(xulykhac.NoiDungXuLyKhac);
               
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }
    function clearDataXuLyKhac() {
        $("#lbXuLyKhacTenVatTu").val('');
        $("#txtXuLyKhacNoiDung").val('');
    }

    function editDuyTuBaoDuong() {
        var duytubaoduongid = $('#hidDuyTuBaoDuongId').val();
        $.ajax({
            type: 'GET',
            url: '/admin/ktdcongtacquanlyktd/EditDuyTuBaoDuong',
            data: {
                DuyTuBaoDuongId: duytubaoduongid
            },
            dataType: 'json',
            success: function (response) {
                var duytubaoduong = response.Result;

                clearDataDuyTuBaoDuong();

                $("#lbDuyTuBaoDuongTenVatTu").html(duytubaoduong.TenDuyTuBaoDuong);
                $("#txtDuyTuBaoDuongSoLuong").val(duytubaoduong.SoLuongDuyTuBaoDuong);
                $("#txtCuTheDuyTuBaoDuong").val(duytubaoduong.CuTheDuyTuBaoDuong);
                $("#txtDuyTuBaoDuongLuyTuyen").val(duytubaoduong.SoLuongLuyTuyenDuyTuBaoDuong);

            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }
    function clearDataDuyTuBaoDuong() {
        $("#lbDuyTuBaoDuongTenVatTu").val('');
        $("#txtDuyTuBaoDuongSoLuong").val(0);
        $("#txtCuTheDuyTuBaoDuong").val('');
        $("#txtDuyTuBaoDuongLuyTuyen").val(0);
    }

    function editCaiTaoSuaChua() {
        var caitaosuachuaid = $('#hidCaiTaoSuaChuaId').val();
        $.ajax({
            type: 'GET',
            url: '/admin/ktdcongtacquanlyktd/EditCaiTaoSuaChua',
            data: {
                CaiTaoSuaChuaId: caitaosuachuaid
            },
            dataType: 'json',
            success: function (response) {
                var caitaosuachua = response.Result;

                clearDataCaiTaoSuaChua();

                const macaitaosuachua = caitaosuachua.MaCaiTaoSuaChua;
                if (macaitaosuachua == 'CTCTNCHT' || macaitaosuachua == 'CTCTNCTT') {
                    $("#CaiTaoSuaChua71To73").show();  
                    $("#CaiTaoSuaChua71To73ChieuDai").show();
                }
                if (macaitaosuachua == 'CTLHDMN') {
                    $("#CaiTaoSuaChua71To73").show();                      
                }
                if (macaitaosuachua == 'CTSLDG' || macaitaosuachua == 'CTTTLT') {                    
                    $("#CaiTaoSuaChua74To75").show();
                    $("#CaiTaoSuaChua74To75HaoHut").show();
                }
                if (macaitaosuachua == 'CTDTDG' || macaitaosuachua == 'CTTHLT') {
                    $("#CaiTaoSuaChua74To75").show();                    
                }

                $("#lbCaiTaoSuaChuTenVatTu71To73").html(caitaosuachua.TenCaiTaoSuaChua);
                $("#txtCaiTaoSuaChuTenVatTu71To73").val(caitaosuachua.SoLuongCaiTaoSuaChua);
                $("#txtCaiTaoSuaChua71To73ChieuDai").val(caitaosuachua.DaiCaiTaoSuaChua);
                $("#txtCaiTaoSuaChua71To73CuThe").val(caitaosuachua.CuTheCaiTaoSuaChua);
                $("#txtCaiTaoSuaChua71To73LuyTuyen").val(caitaosuachua.SoLuongLuyTuyenCaiTaoSuaChua);
                $("#txtCaiTaoSuaChua71ToLuyTuyen73KM").val(caitaosuachua.SoLuongSoLuongLuyTuyenCaiTaoSuaChua);

                const mua = caitaosuachua.MaCaiTaoSuaChua == 'CTSLDG' || caitaosuachua.MaCaiTaoSuaChua == 'CTTTLT' ? 'Mua' : 'K/H';
                const soluongmua = caitaosuachua.MaCaiTaoSuaChua == 'CTSLDG' || caitaosuachua.MaCaiTaoSuaChua == 'CTTTLT' ?
                    caitaosuachua.SoLuongMuaCaiTaoSuaChua : caitaosuachua.SoLuongKHCaiTaoSuaChua;                
                $("#lbCaiTaoSuaChuTenVatTu74To75Mua").html(caitaosuachua.TenCaiTaoSuaChua + '  ' + mua);
                $("#txtCaiTaoSuaChuTenVatTu74To75Mua").val(soluongmua);

                const ban = caitaosuachua.MaCaiTaoSuaChua == 'CTSLDG' || caitaosuachua.MaCaiTaoSuaChua == 'CTTTLT' ? 'Bán' : 'Thực hiện';
                const soluongban = caitaosuachua.MaCaiTaoSuaChua == 'CTSLDG' || caitaosuachua.MaCaiTaoSuaChua == 'CTTTLT' ?
                    caitaosuachua.SoLuongBanCaiTaoSuaChua : caitaosuachua.SoLuongThucHienCaiTaoSuaChua;
                $("#lbCaiTaoSuaChuTenVatTu74To75Ban").html(ban);
                $("#txtCaiTaoSuaChuTenVatTu74To75Ban").val(soluongban);

                $("#txtCaiTaoSuaChuTenVatTu74To75TyLe").val(caitaosuachua.SoLuongTyLeCaiTaoSuaChua);
                $("#txtCaiTaoSuaChuTenVatTu74To75HaoHut").val(caitaosuachua.SoLuongHaoHutCaiTaoSuaChua);

                //$("#hidCaiTaoSuaChuaSoLuongKH").val(caitaosuachua.SoLuongKHCaiTaoSuaChua);
                //$("#hidCaiTaoSuaChuaSoLuongThucHien").val(caitaosuachua.SoLuongThucHienCaiTaoSuaChua);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }
    function clearDataCaiTaoSuaChua() {
        $("#CaiTaoSuaChua71To73").hide();
        $("#CaiTaoSuaChua71To73ChieuDai").hide();
        $("#CaiTaoSuaChua74To75").hide();
        $("#CaiTaoSuaChua74To75HaoHut").hide();

        $("#lbCaiTaoSuaChuTenVatTu71To73").val('');
        $("#txtCaiTaoSuaChuTenVatTu71To73").val(0);
        $("#txtCaiTaoSuaChua71To73ChieuDai").val(0);
        $("#txtCaiTaoSuaChua71To73CuThe").val('');
        $("#txtCaiTaoSuaChua71To73LuyTuyen").val(0);
        $("#txtCaiTaoSuaChua71ToLuyTuyen73KM").val(0);

        $("#lbCaiTaoSuaChuTenVatTu74To75Mua").val('');        
        $("#txtCaiTaoSuaChuTenVatTu74To75Mua").val(0);
        $("#lbCaiTaoSuaChuTenVatTu74To75Ban").val('');
        $("#txtCaiTaoSuaChuTenVatTu74To75Ban").val(0);
        $("#txtCaiTaoSuaChuTenVatTu74To75TyLe").val(0);
        $("#lbCaiTaoSuaChuTenVatTu74To75HaoHut").val('');
        $("#txtCaiTaoSuaChuTenVatTu74To75HaoHut").val(0);

        $("#hidCaiTaoSuaChuaSoLuongKH").val(0);
        $("#hidCaiTaoSuaChuaSoLuongThucHien").val(0);
    }
}