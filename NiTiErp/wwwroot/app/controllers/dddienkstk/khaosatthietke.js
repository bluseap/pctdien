var khaosatthietkeController = function () {

    var addeditddn = new addeditdddController();

    this.loadDataKhaoSatThietKe = function (gdndmccnid) {
        loadDataKhaoSatThietKe(gdndmccnid);
    }    

    this.initialize = function () {
        //loadDataKSTK();
        registerEvents();
        clearDataKSTK();
    }

    function registerEvents() {
        $('#txtThietKeKSTK ').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'vi'
        });

        formMainValidate();
       
        $('#btnSaveKhaoSatThietKeDiDoi').on('click', function () {
            var isgiaydenghi = $('#hidInsertGDNThietKeDienId').val(); // 1: insert; 2: update; 
            var trangthaithietke = $('#hidTrangThaiThietKe').val();

            if (isgiaydenghi == 1) {
                if (trangthaithietke == 5) { // 5: cho thiet ke
                    saveGDNThietKeDienKSTK();
                }
                else {
                    tedu.notify('Đang chờ thiết kế. Không được Thêm thiết kế.', 'error')
                }
            }
            else if (isgiaydenghi == 2) {
                if (trangthaithietke == 3) { // 3: cho duyet
                    upGDNThietKeDienKSTK();
                }
                else {
                    tedu.notify('Đang chờ duyệt thiết kế. Không được Sửa thiết kế.', 'error')
                }
            }
            else {
                tedu.notify('Không lưu được Khảo sát thiết kế.', 'error')
            }
        });
    }

    function clearDataKSTK() {
        var datenow = new Date(); 

        $('#hidGiayDeNghiDMCungCapDienId').val(0);
        $('#hidTrangThaiThietKe').val(0);
        $('#hidInsertGDNThietKeDienId').val(0); // 1: insert; 2: update;

        $('#txtHoTenKhachHangKSTK').val('');
        $('#txtDanhSoKSTK').val('');
        $('#txtDiaChiKhachHangKSTK').val('');
        $('#txtDiaChiLapDatKSTK').val('');
        $('#txtLyDoThietKeKSTK').val('');      
        $('#txtThietKeKSTK').val(tedu.getFormattedDate(datenow)); 
        $('#txtNhanVienNhapThietKeKSTK').val('');

    }

    function isFormMainValidate() {
        if ($('#frmMainKhaoSatTK').valid()) {
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
        $('#frmMainKhaoSatTK').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                txtThietKeKSTK: {
                    required: true,
                    isDateVietNam: true
                },             
            },            
        });
    }

    function loadDataKhaoSatThietKe(gdndmccnid) {
        $.ajax({
            type: "GET",
            url: "/Admin/DDDienKSTK/GetGDNDMCCDienId",
            data: {
                id: gdndmccnid
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var gdndmccnuoc = response.Result;

                clearDataKSTK();

                $('#hidGiayDeNghiDMCungCapDienId').val(gdndmccnuoc.Id);
                $('#hidTrangThaiThietKe').val(gdndmccnuoc.TTThietKe);

                var ttthietke = gdndmccnuoc.TTThietKe;                

                if (ttthietke == 5) { // cho thietke
                    $('#modal-add-edit-KhaoSatTK').modal('show');

                    $('#hidInsertGDNThietKeDienId').val(1); // 1: insert; 2: update;

                    $('#txtHoTenKhachHangKSTK').val(gdndmccnuoc.TenKhachHang); 
                    $('#txtDanhSoKSTK').val(gdndmccnuoc.DanhSoKhachHang);
                    $('#txtDiaChiKhachHangKSTK').val(gdndmccnuoc.DiaChi);
                    $('#txtDiaChiLapDatKSTK').val(gdndmccnuoc.DiaChiMuaNuoc);                    
                }
                else if (ttthietke == 3) { // 3: cho duyet;  
                    $('#modal-add-edit-KhaoSatTK').modal('show');

                    $('#hidInsertGDNThietKeDienId').val(2); // 1: insert; 2: update;                        

                    loadDataGDNThietKeDien();                   
                }
                else if (ttthietke == 2) { // hoan thanh
                    $('#modal-add-edit-KhaoSatTK').modal('show');

                    loadDataGDNThietKeDien();
                }
                else {
                    tedu.notify("Chưa kiểm tra. Nhập Kiểm tra di dời.", "error");
                }

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function loadDataGDNThietKeDien() {
        var giaydenghidmcungcapdienId = $('#hidGiayDeNghiDMCungCapDienId').val();

        $.ajax({
            type: "GET",
            url: "/Admin/DDDienKSTK/GetGDNTKDienId",
            data: {
                id: giaydenghidmcungcapdienId
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var gdnthietke = response.Result;

                $('#txtHoTenKhachHangKSTK').val(gdnthietke.TenKhachHang);
                $('#txtDanhSoKSTK').val(gdnthietke.DanhSoKhachHang);
                $('#txtDiaChiKhachHangKSTK').val(gdnthietke.DiaChi);
                $('#txtDiaChiLapDatKSTK').val(gdnthietke.DiaChiMuaNuoc);    

                $('#txtLyDoThietKeKSTK').val(gdnthietke.LyDoThietKe);   
                $('#txtThietKeKSTK').val(tedu.getFormattedDate(gdnthietke.NgayLapThietKe));
                $('#txtNhanVienNhapThietKeKSTK').val(gdnthietke.TenNhanVienLapThietKe);                

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });

    }

    function saveGDNThietKeDienKSTK() {
        var trangthaithietke = $('#hidTrangThaiThietKe').val();

        if (trangthaithietke == 5) { // 5: cho thiet ke
            
            var giaydenghidmcungcapdienId = $('#hidGiayDeNghiDMCungCapDienId').val();

            var isMainValidate = isFormMainValidate();
            if (isMainValidate === true) {
                var tenkhachhang = $('#txtHoTenKhachHangKSTK').val(); 
                var danhsokhachhang = $('#txtDanhSoKSTK').val();
                var diachikh = $('#txtDiaChiKhachHangKSTK').val();
                var diachilapdat = $('#txtDiaChiLapDatKSTK').val();
                var lydothietke = $('#txtLyDoThietKeKSTK').val();
                var ngaythietke = tedu.getFormatDateYYMMDD($('#txtThietKeKSTK').val()); 
                var nhanviennhaptk = $('#txtNhanVienNhapThietKeKSTK').val();

                $.ajax({
                    type: "POST",
                    url: "/Admin/dddienkstk/UpKSTKDien",
                    data: {
                        GiayDeNghiDMCungCapDienId: giaydenghidmcungcapdienId,

                        TenKhachHang: tenkhachhang,
                        DanhSoKhachHang: danhsokhachhang,
                        DiaChiCuTru: diachikh,
                        DiaChiLapDat: diachilapdat,
                        LyDoThietKe: lydothietke,
                        NgayLapThietKe: ngaythietke,
                        TenNhanVienLapThietKe: nhanviennhaptk                        
                    },
                    dataType: "json",
                    beforeSend: function () {
                        tedu.startLoading();
                    },
                    success: function (response) {
                        if (response.Result === false) {
                            tedu.notify("Lưu thiết kế điện.", "error");
                        }
                        else {
                            tedu.notify('Lưu thiết kế điện.', 'success');

                            addeditddn.loadTableGiayDeNghiDMCungCapDien(true);

                            clearDataKSTK();

                            $('#modal-add-edit-KhaoSatTK').modal('hide');
                            tedu.stopLoading();
                        }
                    },
                    error: function () {
                        tedu.notify('Có lỗi! Không thể Lưu thiết kế điện.', 'error');
                        tedu.stopLoading();
                    }
                });
            }
        }
        else {
            tedu.notify('Không được sửa thiết kế.', 'error');
        }
    }

    function upGDNThietKeDienKSTK() {
        var trangthaithietke = $('#hidTrangThaiThietKe').val();

        if (trangthaithietke == 3) { // 3: cho duyet
            
            var giaydenghidmcungcapdienId = $('#hidGiayDeNghiDMCungCapDienId').val();

            var isMainValidate = isFormMainValidate();
            if (isMainValidate === true) {
                var tenkhachhang = $('#txtHoTenKhachHangKSTK').val();
                var danhsokhachhang = $('#txtDanhSoKSTK').val();
                var diachikh = $('#txtDiaChiKhachHangKSTK').val();
                var diachilapdat = $('#txtDiaChiLapDatKSTK').val();
                var lydothietke = $('#txtLyDoThietKeKSTK').val();
                var ngaythietke = tedu.getFormatDateYYMMDD($('#txtThietKeKSTK').val());
                var nhanviennhaptk = $('#txtNhanVienNhapThietKeKSTK').val();

                $.ajax({
                    type: "POST",
                    url: "/Admin/dddienkstk/Up2KSTKDien",
                    data: {
                        GiayDeNghiDMCungCapDienId: giaydenghidmcungcapdienId,

                        TenKhachHang: tenkhachhang,
                        DanhSoKhachHang: danhsokhachhang,
                        DiaChiCuTru: diachikh,
                        DiaChiLapDat: diachilapdat,
                        LyDoThietKe: lydothietke,
                        NgayLapThietKe: ngaythietke,
                        TenNhanVienLapThietKe: nhanviennhaptk
                    },
                    dataType: "json",
                    beforeSend: function () {
                        tedu.startLoading();
                    },
                    success: function (response) {
                        if (response.Result === false) {
                            tedu.notify("Sửa thiết kế điện.", "error");
                        }
                        else {
                            tedu.notify('Sửa thiết kế điện.', 'success');

                            addeditddn.loadTableGiayDeNghiDMCungCapDien(true);

                            clearDataKSTK();

                            $('#modal-add-edit-KhaoSatTK').modal('hide');
                            tedu.stopLoading();
                        }
                    },
                    error: function () {
                        tedu.notify('Có lỗi! Không thể Sửa thiết kế điện.', 'error');
                        tedu.stopLoading();
                    }
                });
            }
        }
        else {
            tedu.notify('Không được sửa thiết kế.', 'error');
        }
    }


}