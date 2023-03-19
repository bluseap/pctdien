var dangkydienController = function () {

    this.initialize = function () {
        registerEvents();
        loadData();
    }

    function registerEvents() {
        loadNewGuid();

        registerEventsDropZone();

        $("#ddlMucDichSuDung").on('change', function () {
            var mucdich = $("#ddlMucDichSuDung").val();
            //Kiem tra bang TTDMDangKy theo Muc dich su dung
            if (mucdich == 24) {
                loaiHinhDichVu("LoaiHinhDichVuSinhHoatGiaDinhDien");

                var divGiayToXacDinhMucDich = document.getElementById("divGiayToXacDinhMucDich");
                divGiayToXacDinhMucDich.style.display = "none";
            }
            //Kiem tra bang TTDMDangKy theo Muc dich su dung
            else if (mucdich == 25) {
                loaiHinhDichVu("LoaiHinhDichDien");

                var divGiayToXacDinhMucDich = document.getElementById("divGiayToXacDinhMucDich");
                divGiayToXacDinhMucDich.style.display = "block";
            }
        });

        $("#ddlThanhPhoHuyen").on('change', function () {
            let huyen = $("#ddlThanhPhoHuyen").val();
            // 883: Long Xuyen
            if (huyen == 883) {
                $('#modal-add-edit-ThongBao').modal('show');
                $('#ddlThanhPhoHuyen')[0].selectedIndex = 0;
            } else {
                PhuongXa(huyen);
            }
        });

        $('body').on('click', '.btn-XemPhieuTiepNhan', function (e) {
            e.preventDefault();
            XemPhieuTepNhan();
        });

    }

    function loadData() {
        tinhHuyenXa();

        mucDichSuDung("MucDichSudungDien");

        loaiHinhDichVu("LoaiHinhDichVuSinhHoatGiaDinhDien");

        giayToTuyThan("GiayToTuyThan");

        giayXacDinhChuThe("GiayXacDinhChuThe");

        giayXacDinhMucDich("GiayXacDinhMucDich");

        var divGiayToXacDinhMucDich = document.getElementById("divGiayToXacDinhMucDich");
        divGiayToXacDinhMucDich.style.display = "none";
    }

    function registerEventsDropZone() {
        DropzoneUploader();

        DropzoneuploaderGiayToXacDinhChuThe();

        DropzoneuploaderGiayToXacDinhMucDich();
    }

    function DropzoneUploader() {
        Dropzone.autoDiscover = false;
        $("#uploader").dropzone({
            //uploadMultiple: true,
            url: "/home/UploadHinhBoHoSo",
            addRemoveLinks: true,
            maxFiles: 3,
            maxFilesize: 5,            
            init: function () {
                this.on("success", function (file, response) {
                    var maTenCot = "4";
                    var tenCot = 'GiayToTuyThan';

                    var xml = '';
                    xml = xml + "<tables>";

                    let fileName = file.name;
                    let pathFile = response;
                    //var imgefile = file.dataURL;                    

                    var url = document.location.origin;
                    let doipathfile = pathFile.replace("//g", "\\");                    

                    getBase64FromUrl(url + doipathfile)
                        .then(data => {
                            xml += "<items>";
                            xml += '<Id>0</Id>';
                            xml += '<TenFile>' + fileName + '</TenFile>';
                            xml += '<DuongDan>' + pathFile + '</DuongDan>';
                            xml += '<TTDMDangKyMaCot>' + maTenCot + '</TTDMDangKyMaCot>';
                            xml += '<TTDMDangKyTenCot>' + tenCot + '</TTDMDangKyTenCot>';
                            xml += '<ImageFile64>' + data + '</ImageFile64>';
                            var data2 = data.substring(22);
                            xml += '<ImageFileByte>' + '' + '</ImageFileByte>';   
                            xml += "</items>";
                            xml = xml + '</tables>'; 

                            upFile(xml, fileName, ''); 
                        });                    
                });

                this.on("removedfile", function (file) {
                    if (file.status == 'success') {
                        var data = new FormData();
                        data.append("filename", file.name);
                        //ajax delete file in data
                        delFile(file.name);
                    }
                });
            },
            error: function (file, response) {
                powa.notify("Upload hồ sơ lỗi. Kiểm tra lại.", "error");
            }
        });
    }

    function DropzoneuploaderGiayToXacDinhChuThe() {
        Dropzone.autoDiscover = false;
        $("#uploaderGiayToXacDinhChuThe").dropzone({
            url: "/home/UploadHinhBoHoSo",
            addRemoveLinks: true,
            maxFiles: 5,
            maxFilesize: 15,
            init: function () {
                this.on("success", function (file, response) {
                    var maTenCot = "5";
                    var tenCot = 'GiayXacDinhChuThe';

                    var xml = '';
                    xml = xml + "<tables>";

                    let fileName = file.name;
                    let pathFile = response;
                    //var imgefile = file.dataURL;                    

                    var url = document.location.origin;
                    let doipathfile = pathFile.replace("//g", "\\");

                    getBase64FromUrl(url + doipathfile)
                        .then(data => {
                            xml += "<items>";
                            xml += '<Id>0</Id>';
                            xml += '<TenFile>' + fileName + '</TenFile>';
                            xml += '<DuongDan>' + pathFile + '</DuongDan>';
                            xml += '<TTDMDangKyMaCot>' + maTenCot + '</TTDMDangKyMaCot>';
                            xml += '<TTDMDangKyTenCot>' + tenCot + '</TTDMDangKyTenCot>';
                            xml += '<ImageFile64>' + data + '</ImageFile64>';
                            xml += "</items>";
                            xml = xml + '</tables>';

                            upFile(xml, fileName, '');
                        });   
                });

                this.on("removedfile", function (file) {
                    if (file.status == 'success') {
                        var data = new FormData();
                        data.append("filename", file.name);
                        //ajax delete file in data
                        delFile(file.name);
                    }
                });
            },
            error: function (file, response) {
                powa.notify("Upload hồ sơ lỗi. Kiểm tra lại.", "error");
            }
        });
    }

    function DropzoneuploaderGiayToXacDinhMucDich() {
        Dropzone.autoDiscover = false;
        $("#uploaderGiayToXacDinhMucDich").dropzone({
            url: "/home/UploadHinhBoHoSo",
            addRemoveLinks: true,
            maxFiles: 5,
            maxFilesize: 15,
            init: function () {
                this.on("success", function (file, response) {
                    var maTenCot = "6";
                    var tenCot = 'GiayXacDinhMucDich';

                    var xml = '';
                    xml = xml + "<tables>";

                    let fileName = file.name;
                    let pathFile = response;
                    //var imgefile = file.dataURL;                    

                    var url = document.location.origin;
                    let doipathfile = pathFile.replace("//g", "\\");

                    getBase64FromUrl(url + doipathfile)
                        .then(data => {
                            xml += "<items>";
                            xml += '<Id>0</Id>';
                            xml += '<TenFile>' + fileName + '</TenFile>';
                            xml += '<DuongDan>' + pathFile + '</DuongDan>';
                            xml += '<TTDMDangKyMaCot>' + maTenCot + '</TTDMDangKyMaCot>';
                            xml += '<TTDMDangKyTenCot>' + tenCot + '</TTDMDangKyTenCot>';
                            xml += '<ImageFile64>' + data + '</ImageFile64>';
                            xml += "</items>";
                            xml = xml + '</tables>';

                            upFile(xml, fileName, '');
                        });  
                })

                this.on("removedfile", function (file) {
                    if (file.status == 'success') {
                        var data = new FormData();
                        data.append("filename", file.name);
                        //ajax delete file in data
                        delFile(file.name);
                    }
                });
            },
            error: function (file, response) {
                powa.notify("Upload hồ sơ lỗi. Kiểm tra lại.", "error");
            }
        });
    }
        
    function upFile(xml, fileName, url) {
        var newGuid = $('#hidNewGuidTTDangKyFile').val();
        //var hinh = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAAoCAIAAABVSsJMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAK92lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA4LTEyVDA5OjA0OjEwKzA3OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA4LTE0VDA5OjA5OjM5KzA3OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wOC0xNFQwOTowOTozOSswNzowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzAwNDRiZWItZWU4Zi04NjQ3LWE3MzYtNzIxNThlM2VjMTY1IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YzJlZDYzNGItN2YzYi1jMjQ4LWIzMTUtNTBkMmE4ODgwYjJmIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NjAyMDM5M2UtZDg5ZS03NjQ2LWE5NTItNjc3Y2E0MTVmNThlIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB0aWZmOk9yaWVudGF0aW9uPSIxIiB0aWZmOlhSZXNvbHV0aW9uPSI3MjAwMDAvMTAwMDAiIHRpZmY6WVJlc29sdXRpb249IjcyMDAwMC8xMDAwMCIgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIgZXhpZjpDb2xvclNwYWNlPSI2NTUzNSIgZXhpZjpQaXhlbFhEaW1lbnNpb249IjIxMCIgZXhpZjpQaXhlbFlEaW1lbnNpb249IjQwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MDIwMzkzZS1kODllLTc2NDYtYTk1Mi02NzdjYTQxNWY1OGUiIHN0RXZ0OndoZW49IjIwMjEtMDgtMTJUMDk6MDQ6MTArMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6N2Q0NTRlYmItMzRlMC0yYTRhLThmODQtOWEzMDVlN2U4MjJmIiBzdEV2dDp3aGVuPSIyMDIxLTA4LTEyVDA5OjEzOjAyKzA3OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmM2OGZhNjc1LWFmYWMtNWI0MC04N2U1LTUzOGUzOWMzNTM5YyIgc3RFdnQ6d2hlbj0iMjAyMS0wOC0xNFQwOTowOTozOSswNzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MDA0NGJlYi1lZThmLTg2NDctYTczNi03MjE1OGUzZWMxNjUiIHN0RXZ0OndoZW49IjIwMjEtMDgtMTRUMDk6MDk6MzkrMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YzY4ZmE2NzUtYWZhYy01YjQwLTg3ZTUtNTM4ZTM5YzM1MzljIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjYwMjAzOTNlLWQ4OWUtNzY0Ni1hOTUyLTY3N2NhNDE1ZjU4ZSIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjYwMjAzOTNlLWQ4OWUtNzY0Ni1hOTUyLTY3N2NhNDE1ZjU4ZSIvPiA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0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';
        //const obj = {
        //    dangkyfileXML: xml,
        //    codeid: newGuid,
        //    imgeUrl: url
        //};     
        $.ajax({
            type: "POST",
            url: "/home/UpFile",
            data: {
                dangkyfileXML: xml,
                codeid: newGuid,
                imgeUrl: url
            },      
            traditional: true,  
            async: false,
            cache: false,  
            context: document.body, 
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded;charset=UTF-8', 
            contentLength: 2047483647,            
            success: function (response) {
                powa.notify("Tải " + fileName + ' thành công', 'success');
                //postFile(imgefile, newGuid, fileName)
            },
            error: function (e) {
                powa.notify('Có lỗi! ' + fileName + ' . Đề nghị Upload lại.', 'error');
            }
        });
    }   

    function postFile(imgefile, newGuid, fileName) {       
        //var hinh = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAAoCAIAAABVSsJMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAK92lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA4LTEyVDA5OjA0OjEwKzA3OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA4LTE0VDA5OjA5OjM5KzA3OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wOC0xNFQwOTowOTozOSswNzowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzAwNDRiZWItZWU4Zi04NjQ3LWE3MzYtNzIxNThlM2VjMTY1IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YzJlZDYzNGItN2YzYi1jMjQ4LWIzMTUtNTBkMmE4ODgwYjJmIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NjAyMDM5M2UtZDg5ZS03NjQ2LWE5NTItNjc3Y2E0MTVmNThlIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB0aWZmOk9yaWVudGF0aW9uPSIxIiB0aWZmOlhSZXNvbHV0aW9uPSI3MjAwMDAvMTAwMDAiIHRpZmY6WVJlc29sdXRpb249IjcyMDAwMC8xMDAwMCIgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIgZXhpZjpDb2xvclNwYWNlPSI2NTUzNSIgZXhpZjpQaXhlbFhEaW1lbnNpb249IjIxMCIgZXhpZjpQaXhlbFlEaW1lbnNpb249IjQwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MDIwMzkzZS1kODllLTc2NDYtYTk1Mi02NzdjYTQxNWY1OGUiIHN0RXZ0OndoZW49IjIwMjEtMDgtMTJUMDk6MDQ6MTArMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6N2Q0NTRlYmItMzRlMC0yYTRhLThmODQtOWEzMDVlN2U4MjJmIiBzdEV2dDp3aGVuPSIyMDIxLTA4LTEyVDA5OjEzOjAyKzA3OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmM2OGZhNjc1LWFmYWMtNWI0MC04N2U1LTUzOGUzOWMzNTM5YyIgc3RFdnQ6d2hlbj0iMjAyMS0wOC0xNFQwOTowOTozOSswNzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MDA0NGJlYi1lZThmLTg2NDctYTczNi03MjE1OGUzZWMxNjUiIHN0RXZ0OndoZW49IjIwMjEtMDgtMTRUMDk6MDk6MzkrMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YzY4ZmE2NzUtYWZhYy01YjQwLTg3ZTUtNTM4ZTM5YzM1MzljIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjYwMjAzOTNlLWQ4OWUtNzY0Ni1hOTUyLTY3N2NhNDE1ZjU4ZSIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjYwMjAzOTNlLWQ4OWUtNzY0Ni1hOTUyLTY3N2NhNDE1ZjU4ZSIvPiA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0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';

        $.ajax({
            type: "POST",
            url: "/home/PostFile",
            data: {
                ImageFile: imgefile,
                NewGuid: newGuid,
                Tenfile: fileName
            },
            async: false,
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded',
            success: function (response) {
                powa.notify("Tải " + fileName + ' thành t45t 5tcông', 'success');
            },
            error: function (e) {
                powa.notify('Có lỗi! ' + fileName + ' . Đềrt gert nghị Upload lại.', 'error');
            }
        });
    }  

    function delFile(fileName) {
        var newGuid = $('#hidNewGuidTTDangKyFile').val();
        $.ajax({
            type: "POST",
            url: "/home/DelFile",
            data: {
                codeid: newGuid,
                FileName: fileName
            },
            async: false,
            dataType: "json",
            contentType: 'application/x-www-form-urlencoded',
            success: function (response) {
                if (response == true) {
                    powa.notify("Xóa " + fileName + ' thành công', 'success');
                }
                else {
                    powa.notify('Lỗi xóa file! ' + fileName + '.', 'error');
                }
            },
            error: function () {
                powa.notify('Lỗi xóa! ' + fileName + '.', 'error');
            }
        });
    }

    function loadNewGuid() {
        var newGuid = powa.getNewGuid();
        $('#hidNewGuidTTDangKyFile').val(newGuid);
    }

    function tinhHuyenXa() {
        var render = "<option value='89' >Tỉnh An Giang</option>";
        $('#ddlTinh').html(render);
        $("#ddlTinh")[0].selectedIndex = 0;

        let tinh = $('#ddlTinh').val();
        Huyen(tinh);

        var render = "<option value='0' >--- Chọn Xã / Phường / TT ---</option>";
        $('#ddlPhuongXa').html(render);
        $("#ddlPhuongXa")[0].selectedIndex = 0;
    }

    function Huyen(tinh) {
        return $.ajax({
            type: 'GET',
            url: '/home/Huyen',
            data: {
                Tinh: tinh
            },
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >--- Chọn Huyện / Thành phố ---</option>";
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenQuanHuyen + "</option>";
                });
                $('#ddlThanhPhoHuyen').html(render);
                $("#ddlThanhPhoHuyen")[0].selectedIndex = 0;
            },
            error: function () {
                powa.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

    function PhuongXa(huyen) {
        return $.ajax({
            type: 'GET',
            url: '/home/PhuongXa',
            data: {
                Huyen: huyen
            },
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >--- Chọn Phường / Xã ---</option>";
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenPhuongXa + "</option>";
                });
                $('#ddlPhuongXa').html(render);
                $("#ddlPhuongXa")[0].selectedIndex = 0;
            },
            error: function () {
                powa.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

    function mucDichSuDung(tencot) {
        return $.ajax({
            type: 'GET',
            url: '/home/ListDMDangKy',
            data: {
                tenCot: tencot
            },
            dataType: 'json',
            success: function (response) {
                var render;
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Ten + "</option>";
                });
                $('#ddlMucDichSuDung').html(render);
                $("#ddlMucDichSuDung")[0].selectedIndex = 0;
            },
            error: function () {
                powa.notify('Không có danh mục Mục đích sử dụng.', 'error');
            }
        });
    }

    function loaiHinhDichVu(tencot) {
        return $.ajax({
            type: 'GET',
            url: '/home/ListDMDangKy',
            data: {
                tenCot: tencot
            },
            dataType: 'json',
            success: function (response) {
                var render;
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Ten + "</option>";
                });
                $('#ddlLoaiHinhDichVu').html(render);
                $("#ddlLoaiHinhDichVu")[0].selectedIndex = 0;
            },
            error: function () {
                powa.notify('Không có danh mục Loại hình dịch vụ.', 'error');
            }
        });
    }

    function giayToTuyThan(tencot) {
        return $.ajax({
            type: 'GET',
            url: '/home/ListDMDangKy',
            data: {
                tenCot: tencot
            },
            dataType: 'json',
            success: function (response) {
                var render;
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Ten + "</option>";
                });
                $('#ddlGiayToTuyThan').html(render);
                $("#ddlGiayToTuyThan")[0].selectedIndex = 0;
            },
            error: function () {
                powa.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

    function giayXacDinhChuThe(tencot) {
        return $.ajax({
            type: 'GET',
            url: '/home/ListDMDangKy',
            data: {
                tenCot: tencot
            },
            dataType: 'json',
            success: function (response) {
                var render;
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Ten + "</option>";
                });
                $('#ddlGiayToXacDinhChuThe').html(render);
                $("#ddlGiayToXacDinhChuThe")[0].selectedIndex = 0;
            },
            error: function () {
                powa.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

    function giayXacDinhMucDich(tencot) {
        return $.ajax({
            type: 'GET',
            url: '/home/ListDMDangKy',
            data: {
                tenCot: tencot
            },
            dataType: 'json',
            success: function (response) {
                var render = "<option value='0' >--- Chọn mục đích ---</option>";
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Ten + "</option>";
                });
                $('#ddlGiayToXacDinhMucDich').html(render);
                $("#ddlGiayToXacDinhMucDich")[0].selectedIndex = 0;
            },
            error: function () {
                powa.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

    function XemPhieuTepNhan() {        
        var dangkuydienid = $('#hidTTDangKyDienId').val();                  

        $.ajax({
            type: 'GET',
            url: '/dangkydien/SessionDienId',
            data: {
                dangkuydienId: dangkuydienid
            },
            dataType: "json",            
            success: function (response) {
                window.open('/RpInPhieuTiepNhanDien/Index', '_blank');
            }
        });       
    }

    const getBase64FromUrl = async (url) => {
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data);
            }
        });
    }
    
}