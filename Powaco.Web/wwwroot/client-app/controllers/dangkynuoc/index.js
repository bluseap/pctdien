var dangkynuocController = function () {

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
            if (mucdich == 1) {
                loaiHinhDichVu("LoaiHinhDichVuSinhHoatGiaDinh");

                var divGiayToXacDinhMucDich = document.getElementById("divGiayToXacDinhMucDich");
                divGiayToXacDinhMucDich.style.display = "none";
            }
            //Kiem tra bang TTDMDangKy theo Muc dich su dung
            else if (mucdich == 2) {
                loaiHinhDichVu("LoaiHinhDich");

                var divGiayToXacDinhMucDich = document.getElementById("divGiayToXacDinhMucDich");
                divGiayToXacDinhMucDich.style.display = "block";
            }
        });

        $("#ddlThanhPhoHuyen").on('change', function () {
            let huyen = $("#ddlThanhPhoHuyen").val();
            PhuongXa(huyen);
        });

        $('body').on('click', '.btn-XemPhieuTiepNhan', function (e) {
            e.preventDefault();
            XemPhieuTepNhan();
        });

    }

    function loadData() {
        tinhHuyenXa();

        mucDichSuDung("MucDichSudung");

        loaiHinhDichVu("LoaiHinhDichVuSinhHoatGiaDinh");
        
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
        return $.ajax({
            type: "POST",
            url: "/home/UpFile",
            data: {
                dangkyfileXML: xml,
                codeid: newGuid,
                imgeUrl: url
            },
            async: false, 
            dataType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': 3566924
            },
            success: function (response) {
                powa.notify("Tải " + fileName + ' thành công', 'success');                
            },
            error: function () {
                powa.notify('Có lỗi! ' + fileName + ' . Đề nghị Upload lại.', 'error');                
            }
        }); 
    }

    function delFile(fileName) {
        var newGuid = $('#hidNewGuidTTDangKyFile').val();
        return $.ajax({
            type: "GET",
            url: "/home/DelFile",
            data: {
                codeid: newGuid,
                FileName: fileName                
            },
            async: false,
            dataType: "json",
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
                powa.notify('Không có danh mục Công Ty.', 'error');
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
                powa.notify('Không có danh mục Công Ty.', 'error');
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
        var dangkuynuocid = $('#hidTTDangKyNuocId').val();

        $.ajax({
            type: 'GET',
            url: '/dangkynuoc/SessionNuocId',
            data: {
                dangkuynuocId: dangkuynuocid
            },
            dataType: "json",
            success: function (response) {
                window.open('/RpInPhieuTiepNhanNuoc/Index', '_blank');
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