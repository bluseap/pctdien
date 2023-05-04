var ddctaddhinhController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();
    var userName = $("#hidUserName").val();

    var fileUploadHinhVideo = [];

    this.loadNewGuid = function () {
        loadNewGuid();
    }

    this.loadTableDDCTHinh = function () {        
        loadTableDDCTHinh();
    }

    this.initialize = function () {
        registerEvents();
        ClearData();
    }

    function registerEvents() {
        UploadFileHinh();

        $('#btnSaveDDCTTenFileHinh').on('click', function (e) {
            var insertddcthinh = $('#hidInsertDDCTHinh').val(); // 1 : insert ; 2 : update
            if (insertddcthinh == "1")
                SaveFileHinh();
        });

        $('body').on('click', '.btnPatchDDCTTenFileHinh', function (e) {
            e.preventDefault();
            var ddcthinhid = $(this).data('id');
            loadOpenFileHinh(ddcthinhid);
        });

        $('body').on('click', '.btn-deleteDDCTTenFileHinh', function (e) {
            e.preventDefault();
            var ddcthinhid = $(this).data('id');
            XoaFileHinh(ddcthinhid);
        });

    }

    function ClearData() {
        $('#txtDDCTTenFileHinh').val('');
    }

    function loadNewGuid() {
        var newGuid = tedu.getNewGuid();
        $('#hidCodeDDCTFileHinhVideoId').val(newGuid);
    }

    function loadTableDDCTHinh() {
        var template = $('#template-table-DDCTTenFileHinh').html();
        var render = "";

        var diadiemcongtacid = $('#hidPCTDiaDiemCongTacId').val();

        $.ajax({
            type: 'GET',
            data: {
                ddctid: diadiemcongtacid
            },
            url: '/admin/pctdiennhap/ListDDCTHinh',
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th></tr>";
                }
                else {
                    $.each(response.Result, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,                            
                            TenFileHinh: item.TenFileHinh,
                            DuongDan: item.DuongDan
                        });
                    });
                }

                if (render !== '') {
                    $('#table-contentDDCTTenFileHinh').html(render);
                }
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function UploadFileHinh() {
        $("#fileDDCTTenFileHinh").on('change', function () {
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
                    clearFileHinhInput($("#fileDDCTTenFileHinh"));
                    fileUploadHinhVideo.push(path);
                    $("#fileProgress").hide();
                    tedu.notify('Đã tải file hình thành công!', 'success');
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
    function clearFileHinhInput(ctrl) {
        try {
            fileUploadHinhVideo = [];
            ctrl.value = null;
            ctrl.value('');
        }
        catch { }
    }

    function SaveFileHinh() {
        var diadiemcongtacid = $('#hidPCTDiaDiemCongTacId').val();        

        var tenfile = $("#txtDDCTTenFileHinh").val();
        var duongdan = fileUploadHinhVideo;

        $.ajax({
            type: "POST",
            url: "/Admin/pctdiennhap/AddHinhDDCT",
            data: {
                PCTDiaDiemCongTacId: diadiemcongtacid,                
                TenFileHinh: tenfile,
                DuongDan: duongdan
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                if (response.Result === false) {
                    tedu.notify("Lưu file hình.", "error");
                }
                else {
                    tedu.notify('Lưu file hình.', 'success');

                    loadTableDDCTHinh();

                    ClearData();
                    
                    tedu.stopLoading();
                }
            },
            error: function () {
                tedu.notify('Có lỗi! Không thể Lưu file hình.', 'error');
                tedu.stopLoading();
            }
        });
    }

    function loadOpenFileHinh(ddcthinhid) {
        $.ajax({
            type: "GET",
            url: "/Admin/pctdiennhap/getfilehinh",
            data: { ddcthinhId: ddcthinhid },
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
    
    function XoaFileHinh(ddcthinhid) {
        tedu.confirm('Bạn có chắc chắn xóa Hình này?', function () {
            $.ajax({
                type: "POST",
                url: "/Admin/pctdiennhap/DelFileHinh",
                data: {
                    pctddcthinhid: ddcthinhid
                },
                dataType: "json",
                beforeSend: function () {
                    tedu.startLoading();
                },
                success: function (response) {
                    tedu.notify('Xóa thành công', 'success');
                    tedu.stopLoading();
                    loadTableDDCTHinh();
                },
                error: function (status) {
                    tedu.notify('Xóa file hình lỗi! Kiểm tra lại.', 'error');
                    tedu.stopLoading();
                }
            });
        });
    } 

}