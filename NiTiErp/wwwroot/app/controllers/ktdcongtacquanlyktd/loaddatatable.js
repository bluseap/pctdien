var loaddatatableController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    //var userName = $("#hidUserName").val();  
    
    this.editThayTheVatTu = function () {
        editThayTheVatTu();
    }
    this.editPhatTrienLuoiDien = function () {
        editPhatTrienLuoiDien();
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

}