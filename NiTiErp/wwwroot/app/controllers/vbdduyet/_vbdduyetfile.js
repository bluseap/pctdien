﻿var vbdduyetfileController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();

    var fileUpload1 = [];

    this.loadTableVanBanDenDuyetFile = function () {
        loadTableVanBanDenDuyetFile();
    }

    this.loadTableVBDDuyetFileVBDId = function (vanbandenid) {
        loadTableVBDDuyetFileVBDId(vanbandenid);
    }

    this.initialize = function () {

        registerEvents();

        loadData();
    }    

    function registerEvents() {

        $("#btnSaveVBDDuyetFile").on('click', function (e) {
            e.preventDefault();           
            SaveVanBanDenDuyetFile();
        });

        UploadVanBanDenDuyetFile();

        $('body').on('click', '.btnDeleteVBDDuyetFile', function (e) {
            e.preventDefault();
            
            var vbduyetfileId = $(this).data('id');           
            $('#hidInsertVBDDuyetFileId').val(3); // 3
            deleteVanBanDenDuyetFile(vbduyetfileId);
        }); 

        $('body').on('click', '.btnVBDDuyetFileTenFile', function (e) {
            e.preventDefault();
            var vanbandenduyetfileId = $(this).data('id');
            loadPatchVBDDuyetFileTenFile(vanbandenduyetfileId);
        });

    }

    function loadData() {
        //loadTableVanBanDenDuyetFile();
    }

    function loadPatchVBDDuyetFileTenFile(vanbandenduyetfileid) {
        $.ajax({
            type: "GET",
            url: "/Admin/vbdduyet/GetListVanBanDenDuyetFileIdPaging",
            data: { vanbandenduyetfileId: vanbandenduyetfileid },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var vanbanden = response.Result.Results[0];
                var win = window.open(vanbanden.DuongDan, '_blank');
                win.focus();
                tedu.stopLoading();
            },
            error: function (status) {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function deleteVanBanDenDuyetFile(vbduyetfileid) {
        var inservanbandenduyetfile = $('#hidInsertVBDDuyetFileId').val(); // 3        

        tedu.confirm('Bạn có chắc chắn xóa bằng này?', function () {
            $.ajax({
                type: "POST",
                url: "/Admin/vbdduyet/DeleteVanBanDuyetFile",
                data: {
                    Id: vbduyetfileid,
                    InsertVBDDuyetFileId: inservanbandenduyetfile // 3
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    tedu.notify('Xóa thành công', 'success'); 
                    loadTableVanBanDenDuyetFile();
                    tedu.stopLoading();
                },
                error: function (status) {
                    tedu.notify('Xóa file văn bản đến lỗi! Kiểm tra lại.', 'error');
                    tedu.stopLoading();
                }
            });
        });
    }

    function UploadVanBanDenDuyetFile() {
        $("#fileFileVBDDuyetFile").on('change', function () {
            var fileUpload = $(this).get(0);
            var files = fileUpload.files;

            //tedu.notify(files[0].name, "success");//ten file 
            $('#hidTenFileVBDDuyetFileId').val(files[0].name);

            var data = new FormData();

            for (var i = 0; i < files.length; i++) {
                data.append(files[i].name, files[i]);
            }
            $.ajax({
                type: "POST",
                url: "/Admin/Upload/UploadVanBanDenFile",
                contentType: false,
                processData: false,
                data: data,
                success: function (path) {
                    clearFileInput($("#fileFileVBDDuyetFile"));
                    fileUpload1.push(path);
                    //$('#imagelistBang1').append('<div class="col-md-3"><img width="100"  data-path="' + path + '" src="' + path + '"></div>');
                    //tedu.notify(fileUpload1, "success"); // duong dan file 
                    tedu.notify('Đã tải file lên thành công!', 'success');
                },
                error: function () {
                    tedu.notify('There was error uploading files!', 'error');
                }
            });
        });
    }
    function clearFileInput(ctrl) {
        try {
            fileUpload1 = [];
            ctrl.value = null;
            ctrl.value('');
        }
        catch (ex) {
            tedu.notify(ex, 'error');
        }
    }

    function SaveVanBanDenDuyetFile() {
        var vanbandenduyetId = $('#hidVanBanDenDuyetId').val();

        var insertvanbandenduyetfile = $('#hidInsertVBDDuyetFileId').val();
        var tenfile = $('#hidTenFileVBDDuyetFileId').val();
        var codeid = $('#hidCodeFileGuidId').val();

        $.ajax({
            type: "POST",
            url: "/Admin/vbdduyet/AddUpdateVBDDuyetFile",
            data: {
                Id: 1,
                InsertVBDDuyetFileId: 1,
                CodeId: "00000000-0000-0000-0000-000000000000",
                VanBanDenDuyetId: vanbandenduyetId,
                TenFile: tenfile,
                DuongDan: fileUpload1
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
                    tedu.notify('Upload file.', 'success');
                    //$('#hidVanBanDenDuyetId').val('');
                    $('#hidInsertVBDDuyetFileId').val(0);
                    $('#hidTenFileVBDDuyetFileId').val('');
                    
                    loadTableVanBanDenDuyetFile();
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể upload file văn bản đến.', 'error');
                tedu.stopLoading();
            }
        });

    }

    function loadTableVanBanDenDuyetFile() {
        var template = $('#table-VBDDuyetFile').html();
        var render = "";

        var vanbandenduyetid = $('#hidVanBanDenDuyetId').val();

        $.ajax({
            type: 'GET',
            data: {
                VanBanDenDuyetId: vanbandenduyetid
            },
            url: '/admin/vbdduyet/GetListVBDDuyetFileListIdPaging',
            dataType: 'json',
            success: function (response) {
                if (response.Result.Results.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result.Results, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,
                            CodeId: item.CodeId,
                            //HinhNhanVien: item.Image === null ? '<img src="/admin-side/images/user.png?h=90"' : '<img src="' + item.HinhNhanVien + '?h=90" />',
                            TenFile: item.TenFile
                            //CreateDate: tedu.getFormattedDate(item.CreateDate),
                            //Status: tedu.getHoSoNhanVienStatus(item.Status)
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }
                //$('#lblThongBaoTotalRecords').text(response.Result.RowCount);
                if (render !== '') {
                    $('#tbl-contentVBDDuyetFile').html(render);
                }

            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function loadTableVBDDuyetFileVBDId(vanbandenid) {
        var template = $('#table-VBDDuyetFile').html();
        var render = "";

        //var vanbandenduyetid = $('#hidVanBanDenDuyetId').val();

        $.ajax({
            type: 'GET',
            data: {
                vanbandenId: vanbandenid
            },
            url: '/admin/vbdduyet/GetListVBDDuyetFileVBDIdPaging',
            dataType: 'json',
            success: function (response) {
                if (response.Result.Results.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result.Results, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,
                            CodeId: item.CodeId,
                            //HinhNhanVien: item.Image === null ? '<img src="/admin-side/images/user.png?h=90"' : '<img src="' + item.HinhNhanVien + '?h=90" />',
                            TenFile: item.TenFile
                            //CreateDate: tedu.getFormattedDate(item.CreateDate),
                            //Status: tedu.getHoSoNhanVienStatus(item.Status)
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }
                //$('#lblThongBaoTotalRecords').text(response.Result.RowCount);
                if (render !== '') {
                    $('#tbl-contentVBDDuyetFile').html(render);
                }

            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    //function loadTableVanBanDenFileListId(vanbandenid) {
    //    var template = $('#table-FileVanBanDen').html();
    //    var render = "";

    //    $.ajax({
    //        type: 'GET',
    //        data: {
    //            vanbandenId: vanbandenid
    //        },
    //        url: '/admin/vbdthem/GetListVBDListIdPaging',
    //        dataType: 'json',
    //        success: function (response) {
    //            if (response.Result.Results.length === 0) {
    //                render = "<tr><th><a>Không có dữ liệu</a></th></tr>";
    //            }
    //            else {
    //                $.each(response.Result.Results, function (i, item) {
    //                    render += Mustache.render(template, {
    //                        Id: item.Id,
    //                        CodeId: item.CodeId,
    //                        //HinhNhanVien: item.Image === null ? '<img src="/admin-side/images/user.png?h=90"' : '<img src="' + item.HinhNhanVien + '?h=90" />',
    //                        TenFile: item.TenFile
    //                        //CreateDate: tedu.getFormattedDate(item.CreateDate),
    //                        //Status: tedu.getHoSoNhanVienStatus(item.Status)
    //                        // Price: tedu.formatNumber(item.Price, 0),                          
    //                    });
    //                });
    //                $('#hidCodeFileGuidId').val(response.Result.Results[0].CodeId);
    //            }
    //            //$('#lblThongBaoTotalRecords').text(response.Result.RowCount);
    //            if (render !== '') {
    //                $('#tbl-contentFileVanBanDen').html(render);
    //            }

    //        },
    //        error: function (status) {
    //            console.log(status);
    //            tedu.notify('Không thể lấy dữ liệu về.', 'error');
    //        }
    //    });
    //}

   



}