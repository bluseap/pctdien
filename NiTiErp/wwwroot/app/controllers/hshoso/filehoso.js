var filebohosoController = function () {

    var fileUploadBoHoSoFile = [];

    this.loadNewGuid = function () {
        loadNewGuid();
    }

    this.loadTableHsBoHoSoFile = function (hsbohosoid) {
        loadEditHsBoHoSo(hsbohosoid);
        loadTableHsBoHoSoFile();
    }

    this.initialize = function () {
        registerEvents();
        filehosoClearData();
    }    

    function registerEvents() {       

        UploadFileHoSo();       

        $('body').on('click', '.btn-deleteFileBoHoSo', function (e) {
            e.preventDefault();
            var bohosofileid = $(this).data('id');
            XoaFileBoHoSo(bohosofileid);
        });

        $('#btnSaveFileBoHoSo').on('click', function (e) {
            var insertbohosofile = $('#hidInsertHsBoHoSoFileId').val(); // update

            if (insertbohosofile == "1") 
                SaveBoHoSoFile();                       
        });

        $('body').on('click', '.btnPatchBoHoSoFile', function (e) {
            e.preventDefault();
            var bohosofileid = $(this).data('id');
            loadOpenBoHoSoFile(bohosofileid);
        });
    }

    function filehosoClearData() {
        $('#txtAddEditTieuDeBoHoSo').val('');
        $('#txtAddEditTenFileBoHoSo').val('');
    }

    function loadNewGuid() {
        var newGuid = tedu.getNewGuid();
        $('#hidCodeHsBoHoSoFileId').val(newGuid);
    }

    function loadTableHsBoHoSoFile() {        
        var template = $('#template-table-FileBoHoSo').html();
        var render = "";

        var bohosoid = $('#hidHsBoHoSoId').val();        

        $.ajax({
            type: 'GET',
            data: {
                hsbohosoid: bohosoid
            },
            url: '/admin/hshoso/ListBoHsFile',
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th></tr>";
                }
                else {
                    $.each(response.Result, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,
                            CodeId: item.CodeId,
                            TenFile: item.TenFile,
                            DuongDan: item.DuongDan         
                        });
                    });
                }               

                if (render !== '') {
                    $('#table-contentFileBoHoSo').html(render);
                }
               
            },        
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function loadEditHsBoHoSo(hsbohosoid) {
        $.ajax({
            type: "GET",
            url: "/Admin/hsHoSo/GetBoHs",
            data: {
                hsbohosoId: hsbohosoid
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var bohoso = response.Result;       
                
                $("#txtFileBoHoSoTieuDeBoHoSo").val(bohoso.TieuDeBoHoSo);                

                tedu.stopLoading();
            },
            error: function () {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function UploadFileHoSo() {
        $("#fileFileBoHoSo").on('change', function () {
            var fileUpload = $(this).get(0);
            var files = fileUpload.files;

            var data = new FormData();

            for (var i = 0; i < files.length; i++) {
                data.append(files[i].name, files[i]);
            }
            $.ajax({
                type: "POST",
                url: "/Admin/Upload/UploadHsBoHoSoFile",
                contentType: false,
                processData: false,
                data: data,
                success: function (path) {
                    clearFileBoHoSoInput($("#fileFileBoHoSo"));
                    fileUploadBoHoSoFile.push(path);
                    $("#fileProgress").hide();
                    tedu.notify('Đã tải file hồ sơ thành công!', 'success');
                },
                xhr: function () {
                    var fileXhr = $.ajaxSettings.xhr();
                    if (fileXhr.upload) {
                        $("progress").show();
                        fileXhr.upload.addEventListener("progress", function (e) {
                            if (e.lengthComputable) {
                                $("#fileProgress").attr({
                                    value: e.loaded,
                                    max: e.total
                                });
                            }
                        }, false);
                    }
                    return fileXhr;
                },
                error: function () {
                    tedu.notify('There was error uploading files!', 'error');
                }
            });
        });
    }
    function clearFileBoHoSoInput(ctrl) {
        try {
            fileUploadBoHoSoFile = [];
            ctrl.value = null;
            ctrl.value('');
        }
        catch { }
    }

    function SaveBoHoSoFile() {
        var hsbohosoid = $('#hidHsBoHoSoId').val();
        var codehsbohoso = $('#hidCodeHsBoHoSoFileId').val();
        
        var tenfile = $("#txtAddEditTenFileBoHoSo").val();
        var duongdan = fileUploadBoHoSoFile;

        $.ajax({
            type: "POST",
            url: "/Admin/hshoso/AddBohsFile",
            data: {
                HsBoHoSoId: hsbohosoid,
                CodeId: codehsbohoso,
                TenFile: tenfile,
                DuongDan: duongdan
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Lưu Bộ hồ sơ.", "error");
                }
                else {
                    tedu.notify('Lưu Bộ hồ sơ.', 'success');

                    loadTableHsBoHoSoFile();

                    filehosoClearData();
                    //$('#modal-add-edit-HsBoHoSo').modal('hide');
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu Bộ hồ sơ.', 'error');
                tedu.stopLoading();
            }
        });        
    }

    function loadOpenBoHoSoFile(bohosofileid) {
        $.ajax({
            type: "GET",
            url: "/Admin/hshoso/getbohsfile",
            data: { hsbohosofileid: bohosofileid },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result.length === 0) {
                    tedu.notify("Không mở file bộ hồ sơ được. Kiểm tra lại", "error");
                }
                else {
                    var bohosofile = response.Result;                  

                    var win = window.open(bohosofile.DuongDan, '_blank');
                    win.focus();
                }
                tedu.stopLoading();
            },
            error: function (status) {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });   
    }

    function XoaFileBoHoSo(hosofileid) {
        tedu.confirm('Bạn có chắc chắn xóa bằng này?', function () {
            $.ajax({
                type: "POST",
                url: "/Admin/hshoso/DelBoHsFile",
                data: {
                    HsBoHoSoFileId: hosofileid
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    tedu.notify('Xóa thành công', 'success');
                    tedu.stopLoading();
                    loadTableHsBoHoSoFile();
                },
                error: function (status) {
                    tedu.notify('Xóa file hồ sơ lỗi! Kiểm tra lại.', 'error');
                    tedu.stopLoading();
                }
            });
        });
    }    

}