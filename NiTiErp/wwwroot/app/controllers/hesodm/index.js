﻿var hesoluongController = function () {
    var userCorporationId = $("#hidUserCorporationId").val();
    var addeditHeSoLuong = new addedithesoluongController();

    //var images = [];
    var datatablehesoluongmoi = [];    

    this.initialize = function () {       

        loadKhuVuc();

        registerEvents();

        loadData();

        addeditHeSoLuong.initialize();        

        //clickDataGrid();
        
    }

    this.loadDataData = function () {                      

        this.datatablehesoluongmoi = loadTableHeSoLuongReturn(function (d) {            
            //clickDataGrid();
        }); 
        
    }    

    this.clickDataGrid = function () {              

        //var lastIndex;
        //$('#dg').datagrid({
        //    onDblClickRow: function (rowIndex) {
        //        if (lastIndex !== rowIndex) {
        //            $(this).datagrid('endEdit', lastIndex);
        //            $(this).datagrid('beginEdit', rowIndex);
        //        }
        //        lastIndex = rowIndex;
        //    },
        //    onBeginEdit: function (rowIndex) {
        //        var luongtoithieu = $('#txtAddEditMucLuongToiThieuVung').val();

        //        var editors = $('#dg').datagrid('getEditors', rowIndex);
        //        var n1 = $(editors[0].target);
        //        var n2 = $(editors[1].target);
        //        var n3 = $(editors[2].target);

        //        n1.numberbox({
        //            onChange: function () {
        //                var cost = n1.numberbox('getValue') * luongtoithieu;
        //                n2.numberbox('setValue', cost);
        //                //alert(n1.numberbox('getValue'));
        //                //alert(n2.numberbox('getValue'));

        //                //$('#dg').datagrid('acceptChanges');
        //            }
        //        })

        //        var row = $('#dg').datagrid('getSelected');
        //        if (row) {
        //            //alert('Item ID:' + row.Id + "\nPrice:" + row.TenBacLuong);
        //            var hesoluongId = row.Id;
                    
        //            //$('#hidHeSoLuongId').val(hesoluongId);
        //            //$('#hidInsertHeSoLuongId').val('2'); // update

        //            //loadEditHeSoLuong(hesoluongId);
        //            //$('#modal-add-edit-HeSoLuong').modal('show');
        //        } 
        //    },
        //    onEndEdit(index, row) {
        //        var ed = $(this).datagrid('getEditor', {
        //            index: index,
        //            field: 'Id'
        //        });           
        //        alert('Item ID:');
        //    }  

        //});
    }    

    function registerEvents() {         

        $('body').on('click', '.btndelete', function (e) {
            e.preventDefault();

            $('#hidInsertHeSoLuongId').val('3'); // delete            

            var row = $('#dg').datagrid('getSelected');
            if (row) {
                //alert('Item ID:' + row.Id);
                var hesodanhmucId = row.Id;
                deleteHeSoLuong(hesodanhmucId);
            }           

        });

        $('body').on('click', '.btnaccept', function (e) {
            e.preventDefault();
            accept();            
        });

        $("#btnInHeSoDM").on('click', function () {
            printHTML();
            //InHoSo();
        });        
        
        $('body').on('click', '.btnDMHeSoLuong', function (e) {
            e.preventDefault();
            var url = window.location.href;       // Hiển thị đường dẫn url
            //var tieude = window.document.title;    // Hiển thị tiêu đề trang  
            var win = window.open(url, '_blank');
            win.focus();
        });

        formMainValidate();

        $("#btn-create").on('click', function () {    
            resetMain();

            $('#hidInsertHeSoLuongId').val('1'); // insert            

            $('#modal-add-edit-HeSoLuong').modal('show');
        });

        $("#btnUpLuongToiThieu").on('click', function () {   
            if (userCorporationId == "PO") {
                loadMucLuongToiThieuVung();
                $('#modal-add-edit-MucLuongToiThieuVung').modal('show');
            }
            else {
                tedu.notify("Không đủ quyền để thực hiện chức năng này!", "error");
            }
        });

        $('#ddlKhuVuc').on('change', function () {
            var corporationId = $('#ddlKhuVuc').val();
            loadChucVu(corporationId);
        });

        $('#ddlAddEditKhuVuc').on('change', function () {
            var corporationId = $('#ddlAddEditKhuVuc').val();
            loadAddEditChucVu(corporationId);
        });

        $('#txtAddEditHeSo').on('change', function () {
            var heso = $('#txtAddEditHeSo').val();
            var luongtoithieu = $('#txtAddEditMucLuongToiThieuVung').val();

            var mucluong = Math.round(parseFloat(heso) * parseFloat(luongtoithieu));

            $('#txtAddEditMucLuong').val(mucluong);
        });

        $("#btnSaveHeSoLuong").on('click', function () {
            //tedu.notify("dasd", "error");
            var inserthesoluong = $('#hidInsertHeSoLuongId').val();

            if (inserthesoluong === "1") { // insert
                saveHeSoLuong();
            }
            else { // update
                updateHeSoLuong();
            }
        });
       
        $("#btnSaveMucLuongToiThieuVung").on('click', function () {
            //tedu.notify("btnSaveMucLuongToiThieuVung", "error");

            updateMucLuongToiTieuVung(); 
        });
    }  

    function getRows(target) {
        var state = $(target).data('datagrid');
        if (state.filterSource) {
            return state.filterSource.rows;
        } else {
            return state.data.rows;
        }
    }
    function accept() {
        tedu.notify("acces cho phep", "success");
        var param = 'DataGrid';

        var title = null;
        var rows2 = null;
        if (typeof param === 'string') {
            title = param;
        } else {
            title = param['title'];
            rows2 = param['rows'];
        }
        var rows = rows2 || getRows('#dg');
        var dg = $('#dg');
        var fields = dg.datagrid('getColumnFields', true).concat(dg.datagrid('getColumnFields', false));
        var xml = '';
        xml = xml + "<tables>";
        $.map(rows, function (row) {
            xml += "<items>";
            for (var i = 0; i < fields.length; i++) {

                var field = fields[i];
                xml += '<' + field + '>' + row[field] + '</' + field + '>';
            }
            xml += "</items>";
        });
        xml = xml + '</tables>';        

        //alert(xml);

        if (endEditing()) {
            $('#dg').datagrid('acceptChanges');

            //$('#dg').datagrid('toExcel', 'dg.xls');//xuat excel
            //$('#dg').datagrid('print', 'DataGrid');//in

            //var xml = $('#dg').datagrid('toXML', 'DataGrid');//in               

            var inserthesoluongId = "8";// update string XML bulk sql";//$('#hidInsertHeSoLuongId').val();

            //alert(xml);

            $.ajax({
                type: "POST",
                url: "/Admin/hesoluong/AddUpdateHeSoLuong",
                data: {
                    StringXML: xml,
                    inserthesoluongId: inserthesoluongId
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
                        tedu.notify('Tạo hệ số lương.', 'success');
                        tedu.stopLoading();

                        var url = window.location.href;
                        window.location.href = url;
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể lưu số thứ tự', 'error');
                    tedu.stopLoading();
                }
            });
        }

    }
    function printHTML() {
        tedu.notify("in html cho phep", "success");
       
        //$('#dg').datagrid('toExcel', 'dg.xls');//xuat excel
        $('#dg').datagrid('print', 'DataGrid');//in

        //var xml = $('#dg').datagrid('toXML', 'DataGrid');//in       
          
    }
    function InHoSo() {
        //tedu.notify("In ho so", "success");     

        $("#table-responsiveDMHeSoLuong").print({
            //Use Global styles
            globalStyles: false,
            //Add link with attrbute media=print
            mediaPrint: true,
            //Custom stylesheet
            stylesheet: "http://fonts.googleapis.com/css?family=Inconsolata",
            //Print in a hidden iframe
            iframe: false,
            //Don't print this
            noPrintSelector: ".avoid-this",
            //Add this at top
            //prepend: "Hello World!!!",   //Add this on bottom
            //append : "Buh Bye!",      //Log to console when printing is done via a deffered callback
            deferred: $.Deferred().done(function () {
                console.log('Printing done', arguments);
            }),
            doctype: '<!doctype html> '
        });

    }

    function loadData() {

        loadMucLuongToiThieuVungDoanhNghiep();

        disabledData(true);

        $('#txtAddEditSoThuTu').val('1');
    }    

    function disabledData(para) {
        $('#txtMucLuongToiThieuVungMain').prop('disabled', para);
        $('#txtAddEditMucLuong').prop('disabled', para);
        
    }

    function loadMucLuongToiThieuVungDoanhNghiep() {
        $('#hidMucLuongToiThieuId').val('1');

        var mucluongid = $('#hidMucLuongToiThieuId').val();        

        $.ajax({
            type: "GET",
            url: "/Admin/hesoluong/GetAllMucLuongId",
            data: { mucluongId: mucluongid },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result.Results.length === 0) {
                    resetMain();
                }
                else {
                    var mucluongtt = response.Result.Results[0];

                    var mucluongtoithieuvung = mucluongtt.MucLuong;

                    $('#txtMucLuongToiThieuVungMain').val(tedu.formatNumber(mucluongtoithieuvung));                                       
                    $('#txtAddEditMucLuongToiThieuVung').val(mucluongtoithieuvung);
                    $('#txtMucLuongToiThieuMucLuongToiThieuVung').val(mucluongtoithieuvung);
                }
                tedu.stopLoading();
            },
            error: function (status) {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });        
    }

    function resetMain() {
        $('#hidHeSoLuongId').val('0');
        $('#hidInsertHeSoLuongId').val('0');

        $('#ddlAddEditKhuVuc')[0].selectedIndex = 1;
        //$('#txtAddEditMucLuongToiThieuVung').val('');
        $('#ddlAddEditChucVu')[0].selectedIndex = 0;
        $('#ddlAddEditBacLuong')[0].selectedIndex = 0;
        $('#txtAddEditHeSo').val('');
        $('#txtAddEditMucLuong').val('');
        $('#txtAddEditSoThuTu').val('1');

        disabledData(true);

        //$('#hidMucLuongToiThieuId').val('0');
        //$('#txtMucLuongToiThieuVungMain').val('');
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
                $('#ddlAddEditKhuVuc').html(render);

                var userCorporationId = $("#hidUserCorporationId").val();
                if (userCorporationId !== "PO") {
                    $('#ddlKhuVuc').prop('disabled', true);
                    $('#ddlAddEditKhuVuc').prop('disabled', true);
                }
                else {
                    $('#ddlKhuVuc').prop('disabled', false);
                    $('#ddlAddEditKhuVuc').prop('disabled', false);
                }

                $("#ddlKhuVuc")[0].selectedIndex = 1;
                $("#ddlAddEditKhuVuc")[0].selectedIndex = 1;

                var makv = $('#ddlKhuVuc').val();

                //loadTableHeSoLuong(makv, "");
                loadChucVu(makv);
                loadAddEditChucVu(makv);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

    function loadChucVu(makhuvuc) {
        $.ajax({
            type: 'GET',
            url: '/admin/qdbonhiem/ChucVuKhuVucGetListMaKV',
            data: { makv: makhuvuc },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='%' >-- Lựa chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenChucVu + "</option>";
                });
                $('#ddlChucVu').html(render);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Chức vụ.', 'error');
            }
        });
    }

    function loadAddEditChucVu(makhuvuc) {
        $.ajax({
            type: 'GET',
            url: '/admin/qdbonhiem/ChucVuKhuVucGetListMaKV',
            data: { makv: makhuvuc },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='%' >-- Lựa chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenChucVu + "</option>";
                });
                $('#ddlAddEditChucVu').html(render);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Chức vụ.', 'error');
            }
        });
    }

    function loadTableHeSoLuong(makhuvuc, machucvu) {
        var template = $('#table-DMHeSoLuong').html();
        var render = "";

        //var makhuvuc = $('#ddlKhuVuc').val();        
        //var chucvuid = $('#ddlChucVu').val();
        var timnhanvien = $('#txtTimNhanVien').val();

        $.ajax({
            type: 'GET',
            url: '/admin/hesoluong/HeSoLuongKhuVuc',
            data: {
                corporationId: makhuvuc,
                phongId: "",
                keyword: timnhanvien,
                page: tedu.configs.pageIndex,
                pageSize: tedu.configs.pageSize,
                hosoId: "",
                chucVuId: machucvu
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result.length === 0) {
                    render = '[{ Id: "0", Status: "0" ,   Stt: "0", MucLuong: "0",    HeSo: "0",    MucLuongToiThieu : "0",   TenBacLuong: "0"}]';
                }
                else {                    
                    render = response.Result;                   
                }         

                if (render !== '') {
                    $('#tblContentDMHeSoLuong').html(render);

                    $('#dg').datagrid();
                }
                
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }

            
        });
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
        $('#frmMainHeSoLuong').validate({
            errorClass: 'red',
            ignore: [],
            language: 'vi',
            rules: {
                ddlAddEditChucVu: {
                    required: true,
                    isDanhMuc: true
                },
                ddlAddEditBacLuong: {
                    required: true,
                    isDanhMuc: true
                },
                txtAddEditHeSo: {
                    required: true,
                    number: true
                }
            },
            messages: {
                txtAddEditHeSo: {
                    required: "Nhập hệ số..",
                    number: "Chỉ nhập số.."
                }
            }
        });
    }
   
    function loadTableHeSoLuongReturn(callback) {
        //var moi = makhuvuc;
        //return moi;   

        var moi ;
        $.ajax({            
            type: 'POST',
            url: '/admin/hesoluong/PostHeSoLuongKhuVuc',
            data: {
                corporationId: userCorporationId,
                phongId: "",
                keyword: "",
                page: tedu.configs.pageIndex,
                pageSize: tedu.configs.pageSize,
                hosoId: "",
                chucVuId: ""
            },
            async: false,
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {  
                moi = response.Result; 
                callback(moi);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });      
        return moi;
    }   

    function loadTableHeSoLuongReturnKhuVuc(callback) {
        //var moi = makhuvuc;
        //return moi;   
        var makv = $('#ddlKhuVuc').val();
        var moi2;
        $.ajax({
            type: 'POST',
            url: '/admin/hesoluong/PostHeSoLuongKhuVuc',
            data: {
                corporationId: makv,
                phongId: "",
                keyword: "",
                page: tedu.configs.pageIndex,
                pageSize: tedu.configs.pageSize,
                hosoId: "",
                chucVuId: ""
            },
            async: false,
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                moi2 = response.Result;
                callback(moi2);                
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
        return moi2;
    }   

    function isFormMainValidate() {
        if ($('#frmMainHeSoLuong').valid()) {
            return true;
        }
        else {
            return false;
        }
    }

    function saveHeSoLuong() {
        var isMainValidate = isFormMainValidate();       

        if (isMainValidate === true) {
            var hesoluongId = $('#hidHeSoLuongId').val();
            //var hosoId = $('#hidHoSoBoNhiemId').val();
            var inserthesoluongId = $('#hidInsertHeSoLuongId').val();

            var makhuvuc = $('#ddlAddEditKhuVuc').val();
            //var luongtoithieu = $('#txtAddEditMucLuongToiThieuVung').val();            
            var chucvu = $('#ddlAddEditChucVu').val();
            var bacluong = $('#ddlAddEditBacLuong').val();
            var heso = $('#txtAddEditHeSo').val();
            var mucluong = $('#txtAddEditMucLuong').val();
            var luongtoithoiid = $('#hidMucLuongToiThieuId').val();
            var sothutu = $('#txtAddEditSoThuTu').val();                

            //var ngaykyquyetdinh = tedu.getFormatDateYYMMDD($('#txtNgaKyQuyetDinh').val());            

            $.ajax({
                type: "POST",
                url: "/Admin/hesoluong/AddUpdateHeSoLuong",
                data: {
                    Id: hesoluongId,                   
                    inserthesoluongId: inserthesoluongId,

                    ChucVuNhanVienId: chucvu,
                    BacLuongId: bacluong,
                    HeSo: heso,
                    MucLuong: mucluong,
                    MucLuongToiThieuId: luongtoithoiid,
                    Stt: sothutu
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
                        tedu.notify('Tạo hệ số lương.', 'success');                        

                        $('#modal-add-edit-HeSoLuong').modal('hide');

                        tedu.stopLoading();

                        var url = window.location.href; 
                        window.location.href = url;
                       
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể lưu hệ số lương', 'error');
                    tedu.stopLoading();
                }
            });

            return false;
        }
           
    }
    
    function updateHeSoLuong() {
        var isMainValidate = isFormMainValidate();

        if (isMainValidate === true) {
            var hesoluongId = $('#hidHeSoLuongId').val();
            //var hosoId = $('#hidHoSoBoNhiemId').val();
            var inserthesoluongId = $('#hidInsertHeSoLuongId').val();

            var makhuvuc = $('#ddlAddEditKhuVuc').val();
            //var luongtoithieu = $('#txtAddEditMucLuongToiThieuVung').val();            
            var chucvu = $('#ddlAddEditChucVu').val();
            var bacluong = $('#ddlAddEditBacLuong').val();
            var heso = $('#txtAddEditHeSo').val();
            var mucluong = $('#txtAddEditMucLuong').val();
            var sothutu = $('#txtAddEditSoThuTu').val();

            //var ngaykyquyetdinh = tedu.getFormatDateYYMMDD($('#txtNgaKyQuyetDinh').val());            

            $.ajax({
                type: "POST",
                url: "/Admin/hesoluong/AddUpdateHeSoLuong",
                data: {
                    Id: hesoluongId,
                    inserthesoluongId: inserthesoluongId,

                    ChucVuNhanVienId: chucvu,
                    BacLuongId: bacluong,
                    HeSo: heso,
                    MucLuong: mucluong,
                    Stt: sothutu
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
                        tedu.notify('Tạo hệ số lương.', 'success');                        

                        $('#modal-add-edit-HeSoLuong').modal('hide');

                        tedu.stopLoading();
                    }
                },
                error: function () {
                    tedu.notify('Có lỗi! Không thể lưu hệ số lương', 'error');
                    tedu.stopLoading();
                }
            });

            return false;
        }
    }

    function loadMucLuongToiThieuVungKhuVuc() {
        return $.ajax({
            type: 'GET',
            url: '/admin/hoso/GetListCorNhanSu',
            dataType: 'json',
            success: function (response) {
                var render = "<option value='%' >-- Tất cà --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Name + "</option>";
                });
                $('#ddlMucLuongToiThieuKhuVuc').html(render);               

                var userCorporationId = $("#hidUserCorporationId").val();
                if (userCorporationId !== "PO") {
                    $('#ddlMucLuongToiThieuKhuVuc').prop('disabled', true);                   
                }
                else {
                    $('#ddlMucLuongToiThieuKhuVuc').prop('disabled', false);                   
                }

                $("#ddlMucLuongToiThieuKhuVuc")[0].selectedIndex = 1;                
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

    function loadMucLuongToiThieuVung() {
        loadMucLuongToiThieuVungKhuVuc();

    }

    function updateMucLuongToiTieuVung() {
        var mucluongtoithieuid = $('#hidMucLuongToiThieuId').val();
        var makv = $('#ddlMucLuongToiThieuKhuVuc').val();
        var mucluongtoithieu = $('#txtMucLuongToiThieuMucLuongToiThieuVung').val();       

        $.ajax({
            type: "POST",
            url: "/Admin/hesoluong/UpdateMucLuongTT",
            data: {
                Id: "1",
                insertmucluongttId: "2",
                
                MucLuong: mucluongtoithieu                
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
                    tedu.notify('Tạo mức lương tối thiểu vùng.', 'success');
                    $('#modal-add-edit-MucLuongToiThieuVung').modal('hide');
                    tedu.stopLoading();
                    var url = window.location.href;
                    window.location.href = url;
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể lưu mức lương tối thiểu vùng', 'error');
                tedu.stopLoading();
            }
        });

    }

    function deleteHeSoLuong(hesodmid) {
        var indel = $('#hidInsertHeSoLuongId').val(); // delete         

        tedu.confirm('Bạn có chắc chắn xóa bằng này?', function () {
            $.ajax({
                type: "POST",
                url: "/Admin/hesoluong/DeleteHeSoLuongDM",
                data: {
                    Id: hesodmid,
                    inserthesoluongId: indel // = 3                   
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    tedu.notify('Xóa thành công', 'success');
                    tedu.stopLoading();                   

                    $('#hidInsertHeSoLuongId').val('0');

                    if (editIndex === undefined) { return }
                    $('#dg').datagrid('cancelEdit', editIndex)
                        .datagrid('deleteRow', editIndex);
                    editIndex = undefined;

                    //var url = window.location.href;
                    //window.location.href = url;
                },
                error: function (status) {
                    tedu.notify('Xóa hệ số lương lỗi! Kiểm tra lại.', 'error');
                    tedu.stopLoading();
                }
            });
        });
    }

    function loadEditHeSoLuong(hesoluongid) {

    }


}