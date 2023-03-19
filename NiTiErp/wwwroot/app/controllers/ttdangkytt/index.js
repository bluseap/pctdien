var ttdangkyttController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var dangkydien = new dangkydienController();
    var filehoso = new filehosoController();
    var tuchoi = new tuchoiController();
    var editdangkydien = new editdangkydienController();
    var chuyenthietkedien = new chuyentkController();

    var dangkynuoc = new dangkynuocController();
    var filehosonuoc = new filehosonuocController();
    var tuchoinuoc = new tuchoinuocController();
    var editdangkynuoc = new editdangkynuocController();
    var chuyenthietkenuoc = new chuyentknuocController();

    var dichvudien = new dichvudienController();
    var filehosodvdien = new filehosodvdienController();
    var tuchoidien = new tuchoidvdienController();
    var editdvdiendien = new editdvdienController();
    var xacnhandvdien = new xacnhandvdienController();

    var dichvunuoc = new dichvunuocController();   
    var filehosodvnuoc = new filehosodvnuocController();
    var tuchoidvnuoc = new tuchoidvnuocController();
    var editdvnuoc = new editdvnuocController();
    var xacnhandvnuoc = new xacnhandvnuocController();

    this.initialize = function () {  
        updateDangKyChuaLapDatDongHo();

        Huyen(89);
        tructuyenData();
        registerEvents(); 
        clearTrucTuyenData();
        
        dangkydien.initialize();
        filehoso.initialize();
        tuchoi.initialize();
        editdangkydien.initialize();
        chuyenthietkedien.initialize();

        dangkynuoc.initialize();
        filehosonuoc.initialize();
        tuchoinuoc.initialize();
        editdangkynuoc.initialize();
        chuyenthietkenuoc.initialize();

        dichvudien.initialize();
        filehosodvdien.initialize();
        tuchoidien.initialize();
        editdvdiendien.initialize();
        xacnhandvdien.initialize();

        dichvunuoc.initialize();
        filehosodvnuoc.initialize();
        tuchoidvnuoc.initialize();
        editdvnuoc.initialize();
        xacnhandvnuoc.initialize();
    }

    function registerEvents() {
        $('#txtTrucTuyenTuNgay, #txtTrucTuyenDenNgay').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        $('#btnTrucTuyenBaoCaoTheo').on('click', function () {
            var xinghiep = $("#ddlKhuVuc").val();
            if (xinghiep == '0') {
                BaoCaoTheo();
            }
            else {
                BaoCaoTheo();
            }            
        });

        countDangKyTT();

        $('#btnTimNoiDung').on('click', function () {
            changeXiNghiep();
        });

        $('#ddlKhuVuc').on('change', function () {
            changeXiNghiep();
        });

        buttonDangKyDien();

        buttonDangKyNuoc();

        buttonDichVuDien();

        buttonDichVuNuoc();

        $('#ckChonTheoNgay').on('click', function () {
            var ckTheoNgay = document.getElementById('ckChonTheoNgay');
            if (ckTheoNgay.checked) {
                $('#txtTrucTuyenTuNgay').prop('disabled', false);
                $('#txtTrucTuyenDenNgay').prop('disabled', false);
            }
            else {
                $('#txtTrucTuyenTuNgay').prop('disabled', true);
                $('#txtTrucTuyenDenNgay').prop('disabled', true);
            }
        });

    }

    function clearTrucTuyenData() {
        var datenow = new Date();
        $('#txtTrucTuyenTuNgay').val(tedu.getFormattedDate(datenow));
        $('#txtTrucTuyenDenNgay').val(tedu.getFormattedDate(datenow));

        $('#txtTrucTuyenTuNgay').prop('disabled', false);
        $('#txtTrucTuyenDenNgay').prop('disabled', false);
        var ckTheoNgay = document.getElementById('ckChonTheoNgay');
        ckTheoNgay.checked = true;
    }

    function tructuyenData() {
        var danhsachtheo = "<option value='0' >--- Chọn danh sách theo ---</option>";
        danhsachtheo += "<option value='DsKhDkDien'> Danh sách khách hàng đăng ký điện</option>";
        danhsachtheo += "<option value='DsKhDkNuoc'> Danh sách khách hàng đăng ký nước</option>";
        danhsachtheo += "<option value='DsKhDvDien'> Danh sách khách hàng đăng ký các dịch vụ điện</option>";
        danhsachtheo += "<option value='DsKhDvNuoc'> Danh sách khách hàng đăng ký các dịch vụ nước</option>";
        danhsachtheo += "<option value='TongHopDkDv'> Bảng tổng hợp đăng ký dịch vụ trực tuyến</option>";
        $('#ddlTrucTuyenBaoCaoTheo').html(danhsachtheo);

        var danhsachloctheott = "<option value='0' >--- Tất cả ---</option>";
        danhsachloctheott += "<option value='1'> Kh.hàng chưa xác nhận</option>";
        danhsachloctheott += "<option value='2'> Kh.hàng đã xác nhận</option>";
        danhsachloctheott += "<option value='3'> Kh.hàng hết thời gian chưa lắp</option>";
        $('#ddlLocTheoTrangThaiDien').html(danhsachloctheott);
        $('#ddlLocTheoTrangThaiNuoc').html(danhsachloctheott);
        $('#ddlLocTheoTrangThaiDVDien').html(danhsachloctheott);
        $('#ddlLocTheoTrangThaiDVNuoc').html(danhsachloctheott);
    }

    function BaoCaoTheo() {
        var xinghiep = $("#ddlKhuVuc").val();
        var danhsachtheo = $('#ddlTrucTuyenBaoCaoTheo').val();

        if (xinghiep == '0' && danhsachtheo == 'TongHopDkDv') {
            //danhsachDangKyDien va tong hop dang ky dich vu dien nuoc truc tuyen
            danhsachDangKyDien();
        }
        else if (xinghiep !== '0' && danhsachtheo == 'TongHopDkDv') {
            tedu.notify('Chọn Danh sách theo khác.', 'error');
        }
        else if (xinghiep !== '0' && danhsachtheo == '0') {
            tedu.notify('Chọn Danh sách theo.' ,'error');
        }        
        else if (xinghiep !== '0' && danhsachtheo == 'DsKhDkDien') {
            danhsachDangKyDien();            
        }
        else if (xinghiep !== '0' && danhsachtheo == 'DsKhDkNuoc') {
            danhsachDangKyNuoc();
        }
        else if (xinghiep !== '0' && danhsachtheo == 'DsKhDvDien') {
            danhsachDichVuDien();
        }
        else if (xinghiep !== '0' && danhsachtheo == 'DsKhDvNuoc') {
            danhsachDichVuNuoc();
        }
    }

    function changeXiNghiep() {
        divNoneBlock("none");
        divNoneBlockTable('none');

        divNoneBlockXiNghiep(); 
    }    

    function Huyen(tinh) {
        return $.ajax({
            type: 'GET',
            url: '/quanhuyen/Huyen',
            data: {
                Tinh: 89 // 89 : tinh AN GIANG
            },
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >--- Chọn Xí nghiệp ---</option>";
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenQuanHuyen + "</option>";
                });
                $('#ddlKhuVuc').html(render);

                if (userCorporationId !== "PO") {
                    divNoneBlock("block");

                    if (userName == "admin" || userName == "lenguyen") {
                        $('#ddlKhuVuc').prop('disabled', false);    
                        $("#ddlKhuVuc")[0].selectedIndex = 0  
                    }
                    else if (userCorporationId == "TS") {
                        $('#ddlKhuVuc').prop('disabled', true);
                        $("#ddlKhuVuc").val(894);
                    }
                    else if (userCorporationId == "CM") {
                        $('#ddlKhuVuc').prop('disabled', true);
                        $("#ddlKhuVuc").val(893);
                    }
                    else if (userCorporationId == "CT") {
                        $('#ddlKhuVuc').prop('disabled', true);
                        $("#ddlKhuVuc").val(892);
                    }
                    else if (userCorporationId == "TT") {
                        $('#ddlKhuVuc').prop('disabled', true);
                        $("#ddlKhuVuc").val(891);
                    }
                    else if (userCorporationId == "TB") {
                        $('#ddlKhuVuc').prop('disabled', true);
                        $("#ddlKhuVuc").val(890);
                    }
                    else if (userCorporationId == "CP") {
                        $('#ddlKhuVuc').prop('disabled', true);
                        $("#ddlKhuVuc").val(889);
                    }
                    else if (userCorporationId == "PT") {
                        $('#ddlKhuVuc').prop('disabled', true);
                        $("#ddlKhuVuc").val(888);
                    }
                    else if (userCorporationId == "TC") {
                        $('#ddlKhuVuc').prop('disabled', true);
                        $("#ddlKhuVuc").val(887);
                    }
                    else if (userCorporationId == "AP") {
                        $('#ddlKhuVuc').prop('disabled', true);
                        $("#ddlKhuVuc").val(886);
                    }
                    else if (userCorporationId == "CD") {
                        $('#ddlKhuVuc').prop('disabled', true);
                        $("#ddlKhuVuc").val(884);
                    }
                    else if (userCorporationId == "LX") {
                        $('#ddlKhuVuc').prop('disabled', true);
                        $("#ddlKhuVuc").val(883);
                    }
                }
                else {
                    $('#ddlKhuVuc').prop('disabled', false);// true : an
                    $("#ddlKhuVuc")[0].selectedIndex = 0;  
                }  
                
                changeXiNghiep();
            },
            error: function () {
                tedu.notify('Không có danh mục Huyện.', 'error');
            }
        });
    }

    function divNoneBlock(para) {
        document.getElementById("divPowaco").style.display = para;
        document.getElementById("divLongXuyen").style.display = para;
        document.getElementById("divChauDoc").style.display = para;
        document.getElementById("divAnPhu").style.display = para;
        document.getElementById("divTanChau").style.display = para;
        document.getElementById("divPhuTan").style.display = para;
        document.getElementById("divChauPhu").style.display = para;
        document.getElementById("divTinhBien").style.display = para;
        document.getElementById("divTriTon").style.display = para;
        document.getElementById("divChauThanh").style.display = para;
        document.getElementById("divChoMoi").style.display = para;
        document.getElementById("divThoaiSon").style.display = para;
    }

    function divNoneBlockTable(para) {
        document.getElementById("divDangKyDien").style.display = para;
        document.getElementById("divDangKyNuoc").style.display = para;
        document.getElementById("divDichVuDien").style.display = para;
        document.getElementById("divDichVuNuoc").style.display = para;
    }

    function divNoneBlockXiNghiep() {
        var xinghiep = $('#ddlKhuVuc').val();       

        if (xinghiep == 0) {
            //divNoneBlock("block");
            document.getElementById("divPowaco").style.display = "block";
        }
        // 883: Long Xuyen
        if (xinghiep == 883) {
            document.getElementById("divLongXuyen").style.display = "block";
        }
        if (xinghiep == 884) {
            document.getElementById("divChauDoc").style.display = "block";
        }
        if (xinghiep == 886) {
            document.getElementById("divAnPhu").style.display = "block";
        }
        if (xinghiep == 887) {
            document.getElementById("divTanChau").style.display = "block";
        }
        if (xinghiep == 888) {
            document.getElementById("divPhuTan").style.display = "block";
        }
        if (xinghiep == 889) {
            document.getElementById("divChauPhu").style.display = "block";
        }
        if (xinghiep == 890) {
            document.getElementById("divTinhBien").style.display = "block";
        }
        if (xinghiep == 891) {
            document.getElementById("divTriTon").style.display = "block";
        }
        if (xinghiep == 892) {
            document.getElementById("divChauThanh").style.display = "block";
        }
        if (xinghiep == 893) {
            document.getElementById("divChoMoi").style.display = "block";
        }
        if (xinghiep == 894) {
            document.getElementById("divThoaiSon").style.display = "block";
        }
    }

    function countDangKyTT() {
        $.ajax({
            type: 'GET',
            url: '/admin/ttdangkytt/ListCountDK',
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {                    
                    $.each(response.Result, function (i, item) {                       
                        if (item.XiNghiep == "PO") {
                            $('#spanPODangKyDien').html(item.DangKyDien);
                            $('#spanPODangKyNuoc').html(item.DangKyNuoc);
                            $('#spanPOCacDichVuDien').html(item.CacDichVuDien);
                            $('#spanPOCacDichVuNuoc').html(item.CacDichVuNuoc);
                        }
                        if (item.XiNghiep == "LX") {
                            $('#spanLXDangKyNuoc').html(item.DangKyNuoc);
                            $('#spanLXCacDichVuNuoc').html(item.CacDichVuNuoc);
                        }
                        if (item.XiNghiep == "CD") {
                            $('#spanCDDangKyDien').html(item.DangKyDien);
                            $('#spanCDDangKyNuoc').html(item.DangKyNuoc);
                            $('#spanCDCacDichVuDien').html(item.CacDichVuDien);
                            $('#spanCDCacDichVuNuoc').html(item.CacDichVuNuoc);
                        }
                        if (item.XiNghiep == "AP") {
                            $('#spanAPDangKyDien').html(item.DangKyDien);
                            $('#spanAPDangKyNuoc').html(item.DangKyNuoc);
                            $('#spanAPCacDichVuDien').html(item.CacDichVuDien);
                            $('#spanAPCacDichVuNuoc').html(item.CacDichVuNuoc);
                        }
                        if (item.XiNghiep == "TC") {
                            $('#spanTCDangKyDien').html(item.DangKyDien);
                            $('#spanTCDangKyNuoc').html(item.DangKyNuoc);
                            $('#spanTCCacDichVuDien').html(item.CacDichVuDien);
                            $('#spanTCCacDichVuNuoc').html(item.CacDichVuNuoc);
                        }
                        if (item.XiNghiep == "PT") {
                            $('#spanPTDangKyDien').html(item.DangKyDien);
                            $('#spanPTDangKyNuoc').html(item.DangKyNuoc);
                            $('#spanPTCacDichVuDien').html(item.CacDichVuDien);
                            $('#spanPTCacDichVuNuoc').html(item.CacDichVuNuoc);
                        }
                        if (item.XiNghiep == "CP") {
                            $('#spanCPDangKyDien').html(item.DangKyDien);
                            $('#spanCPDangKyNuoc').html(item.DangKyNuoc);
                            $('#spanCPCacDichVuDien').html(item.CacDichVuDien);
                            $('#spanCPCacDichVuNuoc').html(item.CacDichVuNuoc);
                        }
                        if (item.XiNghiep == "TB") {
                            $('#spanTBDangKyDien').html(item.DangKyDien);
                            $('#spanTBDangKyNuoc').html(item.DangKyNuoc);
                            $('#spanTBCacDichVuDien').html(item.CacDichVuDien);
                            $('#spanTBCacDichVuNuoc').html(item.CacDichVuNuoc);
                        }
                        if (item.XiNghiep == "TT") {
                            $('#spanTTDangKyDien').html(item.DangKyDien);
                            $('#spanTTDangKyNuoc').html(item.DangKyNuoc);
                            $('#spanTTCacDichVuDien').html(item.CacDichVuDien);
                            $('#spanTTCacDichVuNuoc').html(item.CacDichVuNuoc);
                        }
                        if (item.XiNghiep == "CT") {
                            $('#spanCTDangKyDien').html(item.DangKyDien);
                            $('#spanCTDangKyNuoc').html(item.DangKyNuoc);
                            $('#spanCTCacDichVuDien').html(item.CacDichVuDien);
                            $('#spanCTCacDichVuNuoc').html(item.CacDichVuNuoc);
                        }
                        if (item.XiNghiep == "CM") {
                            $('#spanCMDangKyDien').html(item.DangKyDien);
                            $('#spanCMDangKyNuoc').html(item.DangKyNuoc);
                            $('#spanCMCacDichVuDien').html(item.CacDichVuDien);
                            $('#spanCMCacDichVuNuoc').html(item.CacDichVuNuoc);
                        }
                        if (item.XiNghiep == "TS") {
                            $('#spanTSDangKyDien').html(item.DangKyDien);
                            $('#spanTSDangKyNuoc').html(item.DangKyNuoc);
                            $('#spanTSCacDichVuDien').html(item.CacDichVuDien);
                            $('#spanTSCacDichVuNuoc').html(item.CacDichVuNuoc);
                        }
                    });
                }
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
       
    }

    function buttonDangKyDien() {
        $('body').on('click', '.btnPODangKyDien', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dangkydien.loadTableTTDangKyDien();
            document.getElementById("divDangKyDien").style.display = 'block';
        });
        $('body').on('click', '.btnCDDangKyDien', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dangkydien.loadTableTTDangKyDien();
            document.getElementById("divDangKyDien").style.display = 'block';
        });
        $('body').on('click', '.btnAPDangKyDien', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dangkydien.loadTableTTDangKyDien();
            document.getElementById("divDangKyDien").style.display = 'block';
        });
        $('body').on('click', '.btnTCDangKyDien', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dangkydien.loadTableTTDangKyDien();
            document.getElementById("divDangKyDien").style.display = 'block';
        });
        $('body').on('click', '.btnPTDangKyDien', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dangkydien.loadTableTTDangKyDien();
            document.getElementById("divDangKyDien").style.display = 'block';
        });
        $('body').on('click', '.btnCPDangKyDien', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dangkydien.loadTableTTDangKyDien();
            document.getElementById("divDangKyDien").style.display = 'block';
        });
        $('body').on('click', '.btnTBDangKyDien', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dangkydien.loadTableTTDangKyDien();
            document.getElementById("divDangKyDien").style.display = 'block';
        });
        $('body').on('click', '.btnTTDangKyDien', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dangkydien.loadTableTTDangKyDien();
            document.getElementById("divDangKyDien").style.display = 'block';
        });
        $('body').on('click', '.btnCTDangKyDien', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dangkydien.loadTableTTDangKyDien();
            document.getElementById("divDangKyDien").style.display = 'block';
        });
        $('body').on('click', '.btnCMDangKyDien', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dangkydien.loadTableTTDangKyDien();
            document.getElementById("divDangKyDien").style.display = 'block';
        });
        $('body').on('click', '.btnTSDangKyDien', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dangkydien.loadTableTTDangKyDien();
            document.getElementById("divDangKyDien").style.display = 'block';
        });
    }

    function buttonDangKyNuoc() {
        $('body').on('click', '.btnPODangKyNuoc', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dangkynuoc.loadTableTTDangKyNuoc();
            document.getElementById("divDangKyNuoc").style.display = 'block';
        });
        $('body').on('click', '.btnLXDangKyNuoc', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dangkynuoc.loadTableTTDangKyNuoc();
            document.getElementById("divDangKyNuoc").style.display = 'block';
        });
        $('body').on('click', '.btnCDDangKyNuoc', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dangkynuoc.loadTableTTDangKyNuoc();
            document.getElementById("divDangKyNuoc").style.display = 'block';
        });
        $('body').on('click', '.btnAPDangKyNuoc', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dangkynuoc.loadTableTTDangKyNuoc();
            document.getElementById("divDangKyNuoc").style.display = 'block';
        });
        $('body').on('click', '.btnTCDangKyNuoc', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dangkynuoc.loadTableTTDangKyNuoc();
            document.getElementById("divDangKyNuoc").style.display = 'block';
        });
        $('body').on('click', '.btnPTDangKyNuoc', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dangkynuoc.loadTableTTDangKyNuoc();
            document.getElementById("divDangKyNuoc").style.display = 'block';
        });
        $('body').on('click', '.btnCPDangKyNuoc', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dangkynuoc.loadTableTTDangKyNuoc();
            document.getElementById("divDangKyNuoc").style.display = 'block';
        });
        $('body').on('click', '.btnTBDangKyNuoc', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dangkynuoc.loadTableTTDangKyNuoc();
            document.getElementById("divDangKyNuoc").style.display = 'block';
        });
        $('body').on('click', '.btnTTDangKyNuoc', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dangkynuoc.loadTableTTDangKyNuoc();
            document.getElementById("divDangKyNuoc").style.display = 'block';
        });
        $('body').on('click', '.btnCTDangKyNuoc', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dangkynuoc.loadTableTTDangKyNuoc();
            document.getElementById("divDangKyNuoc").style.display = 'block';
        });
        $('body').on('click', '.btnCMDangKyNuoc', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dangkynuoc.loadTableTTDangKyNuoc();
            document.getElementById("divDangKyNuoc").style.display = 'block';
        });
        $('body').on('click', '.btnTSDangKyNuoc', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dangkynuoc.loadTableTTDangKyNuoc();
            document.getElementById("divDangKyNuoc").style.display = 'block';
        });
    }

    function buttonDichVuDien() {
        $('body').on('click', '.btnPOCacDichVuDien', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dichvudien.loadTableTTDichVuDien();
            document.getElementById("divDichVuDien").style.display = 'block';
        });
        $('body').on('click', '.btnCDCacDichVuDien', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dichvudien.loadTableTTDichVuDien();
            document.getElementById("divDichVuDien").style.display = 'block';
        });
        $('body').on('click', '.btnAPCacDichVuDien', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dichvudien.loadTableTTDichVuDien();
            document.getElementById("divDichVuDien").style.display = 'block';
        });
        $('body').on('click', '.btnTCCacDichVuDien', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dichvudien.loadTableTTDichVuDien();
            document.getElementById("divDichVuDien").style.display = 'block';
        });
        $('body').on('click', '.btnPTCacDichVuDien', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dichvudien.loadTableTTDichVuDien();
            document.getElementById("divDichVuDien").style.display = 'block';
        });
        $('body').on('click', '.btnCPCacDichVuDien', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dichvudien.loadTableTTDichVuDien();
            document.getElementById("divDichVuDien").style.display = 'block';
        });
        $('body').on('click', '.btnTBCacDichVuDien', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dichvudien.loadTableTTDichVuDien();
            document.getElementById("divDichVuDien").style.display = 'block';
        });
        $('body').on('click', '.btnTTCacDichVuDien', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dichvudien.loadTableTTDichVuDien();
            document.getElementById("divDichVuDien").style.display = 'block';
        });
        $('body').on('click', '.btnCTCacDichVuDien', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dichvudien.loadTableTTDichVuDien();
            document.getElementById("divDichVuDien").style.display = 'block';
        });
        $('body').on('click', '.btnCMCacDichVuDien', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dichvudien.loadTableTTDichVuDien();
            document.getElementById("divDichVuDien").style.display = 'block';
        });
        $('body').on('click', '.btnTSCacDichVuDien', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dichvudien.loadTableTTDichVuDien();
            document.getElementById("divDichVuDien").style.display = 'block';
        });       
    }

    function buttonDichVuNuoc() {
        $('body').on('click', '.btnPOCacDichVuNuoc', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dichvunuoc.loadTableTTDichVuNuoc();
            document.getElementById("divDichVuNuoc").style.display = 'block';
        });
        $('body').on('click', '.btnLXCacDichVuNuoc', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dichvunuoc.loadTableTTDichVuNuoc();
            document.getElementById("divDichVuNuoc").style.display = 'block';
        });
        $('body').on('click', '.btnCDCacDichVuNuoc', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dichvunuoc.loadTableTTDichVuNuoc();
            document.getElementById("divDichVuNuoc").style.display = 'block';
        });
        $('body').on('click', '.btnAPCacDichVuNuoc', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dichvunuoc.loadTableTTDichVuNuoc();
            document.getElementById("divDichVuNuoc").style.display = 'block';
        });

        $('body').on('click', '.btnTCCacDichVuNuoc', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dichvunuoc.loadTableTTDichVuNuoc();
            document.getElementById("divDichVuNuoc").style.display = 'block';
        });
        $('body').on('click', '.btnPTCacDichVuNuoc', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dichvunuoc.loadTableTTDichVuNuoc();
            document.getElementById("divDichVuNuoc").style.display = 'block';
        });
        $('body').on('click', '.btnCPCacDichVuNuoc', function (e) {
            e.preventDefault();
            divNoneBlockTable('none');
            dichvunuoc.loadTableTTDichVuNuoc();
            document.getElementById("divDichVuNuoc").style.display = 'block';
        });
        
    }

    function danhsachDangKyDien() {
        var xinghiep = $('#ddlKhuVuc').val();
        var danhsachtheo = $('#ddlTrucTuyenBaoCaoTheo').val();
        var tungay = tedu.getFormatDateYYMMDD($('#txtTrucTuyenTuNgay').val());
        var denngay = tedu.getFormatDateYYMMDD($('#txtTrucTuyenDenNgay').val());

        $.ajax({
            type: 'GET',
            url: '/admin/ttdangkytt/DsDkDien',
            data: {
                XiNghiep: xinghiep,
                DanhSachTheo: danhsachtheo,
                TuNgay: tungay,
                DenNgay: denngay
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (xinghiep == '0' && danhsachtheo == 'TongHopDkDv') {
                    nguyen.appUserLoginLogger(userName, "Tổng hợp đăng ký dịch vụ trực tuyến.");

                    if (response.length !== 0) {
                        window.open('/Admin/RpTongHopDkDvTT/Index', '_blank');
                    }
                    
                }
                else {
                    nguyen.appUserLoginLogger(userName, "In Khách hàng đăng ký điện theo ngày.");

                    if (response.length !== 0) {
                        window.open('/Admin/RpDsDkDien/Index', '_blank');
                    }
                    
                }
                tedu.stopLoading();
            },
        });        
    }

    function danhsachDangKyNuoc() {
        var xinghiep = $('#ddlKhuVuc').val();
        var danhsachtheo = $('#ddlTrucTuyenBaoCaoTheo').val();
        var tungay = tedu.getFormatDateYYMMDD($('#txtTrucTuyenTuNgay').val());
        var denngay = tedu.getFormatDateYYMMDD($('#txtTrucTuyenDenNgay').val());

        $.ajax({
            type: 'GET',
            url: '/admin/ttdangkytt/DsDkNuoc',
            data: {
                XiNghiep: xinghiep,
                DanhSachTheo: danhsachtheo,
                TuNgay: tungay,
                DenNgay: denngay
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                nguyen.appUserLoginLogger(userName, "In Khách hàng đăng ký nước theo ngày.");

                if (response.Result.length !== 0) {
                    window.open('/Admin/RpDsDkNuoc/Index', '_blank');
                }
                else {
                    window.open('/Admin/RpDsDkNuoc/Index', '_blank');
                }
                tedu.stopLoading();
            },
        });
    }

    function danhsachDichVuDien() {
        var xinghiep = $('#ddlKhuVuc').val();
        var danhsachtheo = $('#ddlTrucTuyenBaoCaoTheo').val();
        var tungay = tedu.getFormatDateYYMMDD($('#txtTrucTuyenTuNgay').val());
        var denngay = tedu.getFormatDateYYMMDD($('#txtTrucTuyenDenNgay').val());

        $.ajax({
            type: 'GET',
            url: '/admin/ttdangkytt/DsDvDien',
            data: {
                XiNghiep: xinghiep,
                DanhSachTheo: danhsachtheo,
                TuNgay: tungay,
                DenNgay: denngay
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                nguyen.appUserLoginLogger(userName, "In Khách hàng dịch vụ điện theo ngày.");

                if (response.Result.length !== 0) {
                    window.open('/Admin/RpDsDvDien/Index', '_blank');
                }
                else {
                    window.open('/Admin/RpDsDvDien/Index', '_blank');
                }
                tedu.stopLoading();
            },
        });
    }

    function danhsachDichVuNuoc() {
        var xinghiep = $('#ddlKhuVuc').val();
        var danhsachtheo = $('#ddlTrucTuyenBaoCaoTheo').val();
        var tungay = tedu.getFormatDateYYMMDD($('#txtTrucTuyenTuNgay').val());
        var denngay = tedu.getFormatDateYYMMDD($('#txtTrucTuyenDenNgay').val());

        $.ajax({
            type: 'GET',
            url: '/admin/ttdangkytt/DsDvNuoc',
            data: {
                XiNghiep: xinghiep,
                DanhSachTheo: danhsachtheo,
                TuNgay: tungay,
                DenNgay: denngay
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                nguyen.appUserLoginLogger(userName, "In Khách hàng dịch vụ nước theo ngày.");

                if (response.Result.length !== 0) {
                    window.open('/Admin/RpDsDvNuoc/Index', '_blank');
                }
                else {
                    window.open('/Admin/RpDsDvNuoc/Index', '_blank');
                }
                tedu.stopLoading();
            },
        });
    }

    function updateDangKyChuaLapDatDongHo() {
        $.ajax({
            type: 'POST',
            url: '/ttdangkytt/DkChuaLap',            
            dataType: 'json',
            //beforeSend: function () {
            //    tedu.startLoading();
            //},
            success: function (response) {
                nguyen.appUserLoginLogger(userName, "Đăng ký mà chưa lắp đồng hồ.");

                if (response !== true) {
                    tedu.notify('Đăng ký mà chưa lắp đồng hồ.', 'error');
                }               
                
                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

}