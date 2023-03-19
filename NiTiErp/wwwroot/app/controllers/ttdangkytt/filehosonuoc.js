var filehosonuocController = function () {
    var userName = $("#hidUserName").val();

    this.loadTableTTDMDangKy = function () {
        loadTableTTDMDangKy(true);
    }

    this.initialize = function () {
        registerEvents();

    }

    function registerEvents() {
        $('body').on('click', '.btnTTDMDangKyNuoc', function (e) {
            e.preventDefault();
            var ttdmdangkyfileId = $(this).data('id');
            downloadFile(ttdmdangkyfileId);
        });

        $('#btnInGiayDeNghiNuoc').on('click', function () {
            var ttdangkynuoc = $('#hidTTDangKyNuoc').val();
            var xinghiep = $('#ddlKhuVuc').val();

            if (xinghiep == '0') {
                tedu.notify('Đề nghị chọn Xí nghiệp trước khi In', 'error')
            }
            else {
                inGiayDeNghiNuoc(ttdangkynuoc);
            }  
        });

    }

    function loadTableTTDMDangKy() {
        var ttdangkynuocId = $('#hidTTDangKyNuoc').val();

        var template = $('#template-table-FileBoHoSoNuoc').html();
        var render = "";

        $.ajax({
            type: 'GET',
            url: '/admin/ttdangkytt/GetFile',
            data: {
                ttdangkyId: ttdangkynuocId,
                ttdangkyCode: 'Nuoc'
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th></tr>";
                }
                else {
                    $.each(response.Result, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,

                            TenFile: item.TenFile,
                            
                            DuongDan: item.ImageFile === null ? '<img src="/admin-side/images/user.png?h=90" />' :
                                (item.TenFile.substring(item.TenFile.length - 3) == "pdf" ?
                                    '<img style="width:40px;height:30px" src="/admin-side/images/pdf.png" />' :
                                    (item.TenFile.substring(item.TenFile.length - 3) == "doc" ||
                                        item.TenFile.substring(item.TenFile.length - 3) == "ocx" ?
                                        '<img style="width:40px;height:30px" src="/admin-side/images/word.png" />' :
                                        '<img style="width:120px;height:50px" src="' + item.ImageFile + '"/>'
                                    ))
                            //ThoiGianTraKetQuaHoSo: tedu.getFormattedDate(item.ThoiGianTraKetQuaHoSo),
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }
                if (render !== '') {
                    $('#table-contentFileBoHoSoNuoc').html(render);
                }
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function downloadFile(ttdmdangkyfileid) {
        $.ajax({
            type: 'GET',
            url: '/admin/ttdangkytt/GetFileId',
            data: {
                ttdmdangkyfileId: ttdmdangkyfileid
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    tedu.notify("Không có dữ liệu.", "error");
                }
                else {
                    nguyen.appUserLoginLogger(userName, "Download Giấy đề nghị nước.");

                    var dlnk = document.getElementById('downloadFileImageNuoc');

                    dlnk.href = response.Result.ImageFile;

                    dlnk.click();
                }
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    function inGiayDeNghiNuoc(ttdangkynuoc) {
        var xinghiep = $('#ddlKhuVuc').val();

        $.ajax({
            type: 'GET',
            url: '/admin/ttdangkytt/InGDNNuoc',
            data: {
                ttdangkynuocId: ttdangkynuoc,
                xiNghiep: xinghiep
            },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                nguyen.appUserLoginLogger(userName, "In Giấy đề nghị nước.");

                if (response.Result.length !== 0) {
                    window.open('/Admin/RpGiayDeNghiNuoc/Index', '_blank');
                }
                else {
                    window.open('/Admin/RpGiayDeNghiNuoc/Index', '_blank');
                }
                tedu.stopLoading();
            },
        });
    }

}