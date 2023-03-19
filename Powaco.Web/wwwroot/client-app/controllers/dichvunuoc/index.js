var dichvunuocController = function () {

    this.initialize = function () {
        registerEvents();
        loadData();
    }

    function registerEvents() {
        loadNewGuid();

        $("#ddlDichVuKhachHangCanCungCap").on('change', function () {
            changeDichVuKhachHang();
        });

        registerEventsDropZone();

        $("#ddlThanhPhoHuyen").on('change', function () {
            let huyen = $("#ddlThanhPhoHuyen").val();
            PhuongXa(huyen);
        });

        $('body').on('click', '.btn-XemPhieuTiepNhan', function (e) {
            e.preventDefault();
            XemPhieuTepNhan();
        });

    }

    function changeDichVuKhachHang() {
        var dichvu = $("#ddlDichVuKhachHangCanCungCap").val();
        //Kiem tra bang TTDMDangKy theo Muc dich su dung
        if (dichvu == 60) {
            var thietbidem = document.getElementById("divThayDoiThietBiDem");
            thietbidem.style.display = "block";
            var mdsd = document.getElementById("divThayDoiMDSD");
            mdsd.style.display = "none";
            var dmsd = document.getElementById("divThayDoiDMSD");
            dmsd.style.display = "none";
            var hd = document.getElementById("divThayDoiHopDongGiayToTuyThan");
            hd.style.display = "none";
            var kt = document.getElementById("divKiemTraDongHo");
            kt.style.display = "none";
        }
        if (dichvu == 61) {
            var thietbidem = document.getElementById("divThayDoiThietBiDem");
            thietbidem.style.display = "none";
            var mdsd = document.getElementById("divThayDoiMDSD");
            mdsd.style.display = "block";
            var dmsd = document.getElementById("divThayDoiDMSD");
            dmsd.style.display = "none";
            var hd = document.getElementById("divThayDoiHopDongGiayToTuyThan");
            hd.style.display = "none";
            var kt = document.getElementById("divKiemTraDongHo");
            kt.style.display = "none";
        }
        if (dichvu == 62) {
            var thietbidem = document.getElementById("divThayDoiThietBiDem");
            thietbidem.style.display = "none";
            var mdsd = document.getElementById("divThayDoiMDSD");
            mdsd.style.display = "none";
            var dmsd = document.getElementById("divThayDoiDMSD");
            dmsd.style.display = "block";
            var hd = document.getElementById("divThayDoiHopDongGiayToTuyThan");
            hd.style.display = "none";
            var kt = document.getElementById("divKiemTraDongHo");
            kt.style.display = "none";
        }
        if (dichvu == 63) {
            var thietbidem = document.getElementById("divThayDoiThietBiDem");
            thietbidem.style.display = "none";
            var mdsd = document.getElementById("divThayDoiMDSD");
            mdsd.style.display = "none";
            var dmsd = document.getElementById("divThayDoiDMSD");
            dmsd.style.display = "none";
            var hd = document.getElementById("divThayDoiHopDongGiayToTuyThan");
            hd.style.display = "block";
            var kt = document.getElementById("divKiemTraDongHo");
            kt.style.display = "none";
        }
        if (dichvu == 64) {
            var thietbidem = document.getElementById("divThayDoiThietBiDem");
            thietbidem.style.display = "none";
            var mdsd = document.getElementById("divThayDoiMDSD");
            mdsd.style.display = "none";
            var dmsd = document.getElementById("divThayDoiDMSD");
            dmsd.style.display = "none";
            var hd = document.getElementById("divThayDoiHopDongGiayToTuyThan");
            hd.style.display = "none";
            var kt = document.getElementById("divKiemTraDongHo");
            kt.style.display = "block";
        }
    }

    function loadData() {
        tinhHuyenXa();

        dichvuKhachHangCanCungCap("DichVuKhacHangCungCapNuoc");

        thaydoivitridodem("KemHoSoDien32");

        thaydoimucdichsudungdien("KemHoSoDien33");

        thaydoidinhmucsudungdien("KemHoSoDien34");

        hopdonggiaytotuythan("GiayToTuyThan35");

        hopdonggiayxacnhanchuthemoi("GiayXacDinhChuTheMoi35");

        //var divGiayToXacDinhMucDich = document.getElementById("divGiayToXacDinhMucDich");
        //divGiayToXacDinhMucDich.style.display = "none";
    }

    function loadNewGuid() {
        var newGuid = powa.getNewGuid();
        $('#hidNewGuidTTDangKyFile').val(newGuid);
    }

    function dichvuKhachHangCanCungCap(tencot) {
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
                $('#ddlDichVuKhachHangCanCungCap').html(render);
                $("#ddlDichVuKhachHangCanCungCap")[0].selectedIndex = 0;

                var dichvu = $("#ddlDichVuKhachHangCanCungCap").val();
                //Kiem tra bang TTDMDangKy theo Muc dich su dung
                if (dichvu == 60) {
                    var thietbidem = document.getElementById("divThayDoiThietBiDem");
                    thietbidem.style.display = "block";

                    var mdsd = document.getElementById("divThayDoiMDSD");
                    mdsd.style.display = "none";
                    var dmsd = document.getElementById("divThayDoiDMSD");
                    dmsd.style.display = "none";
                    var hd = document.getElementById("divThayDoiHopDongGiayToTuyThan");
                    hd.style.display = "none";
                    var kt = document.getElementById("divKiemTraDongHo");
                    kt.style.display = "none";
                }
            },
            error: function () {
                powa.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

    function registerEventsDropZone() {
        DropzoneThayDoiThietBi();

        DropzoneThayDoiMDSD();

        DropzoneThayDoiDMSD();

        DropzoneHopDongGiayToTuyThan();

        DropzoneHopDongMoi();
    }

    function DropzoneThayDoiThietBi() {
        Dropzone.autoDiscover = false;
        $("#uploaderThayDoiThietBi").dropzone({
            //uploadMultiple: true,
            url: "/home/UploadHinhBoHoSo",
            addRemoveLinks: true,
            maxFiles: 3,
            maxFilesize: 3,
            init: function () {
                this.on("success", function (file, response) {
                    var maTenCot = "11";
                    var tenCot = 'KemHoSoDien32';

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

    function DropzoneThayDoiMDSD() {
        Dropzone.autoDiscover = false;
        $("#uploaderHoSoKemTheoThayDoiMDSD").dropzone({
            url: "/home/UploadHinhBoHoSo",
            addRemoveLinks: true,
            maxFiles: 5,
            maxFilesize: 15,
            init: function () {
                this.on("success", function (file, response) {
                    var maTenCot = "12";
                    var tenCot = 'KemHoSoDien33';

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

    function DropzoneThayDoiDMSD() {
        Dropzone.autoDiscover = false;
        $("#uploaderHoSoKemTheoThayDoiDMSD").dropzone({
            url: "/home/UploadHinhBoHoSo",
            addRemoveLinks: true,
            maxFiles: 5,
            maxFilesize: 15,
            init: function () {
                this.on("success", function (file, response) {
                    var maTenCot = "13";
                    var tenCot = 'KemHoSoDien34';

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

    function DropzoneHopDongGiayToTuyThan() {
        Dropzone.autoDiscover = false;
        $("#uploaderHoSoKemTheoThayDoiHopDongGiayToTuyThan").dropzone({
            url: "/home/UploadHinhBoHoSo",
            addRemoveLinks: true,
            maxFiles: 3,
            maxFilesize: 15,
            init: function () {
                this.on("success", function (file, response) {
                    var maTenCot = "14";
                    var tenCot = 'GiayToTuyThan35';

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

    function DropzoneHopDongMoi() {
        Dropzone.autoDiscover = false;
        $("#uploaderddlHoSoKemTheoThayDoiHopDongMoi").dropzone({
            url: "/home/UploadHinhBoHoSo",
            addRemoveLinks: true,
            maxFiles: 5,
            maxFilesize: 15,
            init: function () {
                this.on("success", function (file, response) {
                    var maTenCot = "15";
                    var tenCot = 'GiayXacDinhChuTheMoi35';

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


    function thaydoivitridodem(tencot) {
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
                $('#ddlHoSoKemTheoThayDoiThietBiDem').html(render);
                $("#ddlHoSoKemTheoThayDoiThietBiDem")[0].selectedIndex = 0;
            },
            error: function () {
                powa.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

    function thaydoimucdichsudungdien(tencot) {
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
                $('#ddlHoSoKemTheoThayDoiMDSD').html(render);
                $("#ddlHoSoKemTheoThayDoiMDSD")[0].selectedIndex = 0;
            },
            error: function () {
                powa.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

    function thaydoidinhmucsudungdien(tencot) {
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
                $('#ddlHoSoKemTheoThayDoiDMSD').html(render);
                $("#ddlHoSoKemTheoThayDoiDMSD")[0].selectedIndex = 0;
            },
            error: function () {
                powa.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

    function hopdonggiaytotuythan(tencot) {
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
                $('#ddlHoSoKemTheoThayDoiHopDongGiayToTuyThan').html(render);
                $("#ddlHoSoKemTheoThayDoiHopDongGiayToTuyThan")[0].selectedIndex = 0;
            },
            error: function () {
                powa.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

    function hopdonggiayxacnhanchuthemoi(tencot) {
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
                $('#ddlHoSoKemTheoThayDoiHopDongMoi').html(render);
                $("#ddlHoSoKemTheoThayDoiHopDongMoi")[0].selectedIndex = 0;
            },
            error: function () {
                powa.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

    function XemPhieuTepNhan() {
        var dichvunuocid = $('#hidTTCacDichVuNuocId').val();

        $.ajax({
            type: 'GET',
            url: '/dichvunuoc/SessionDichVuNuocId',
            data: {
                dichvunuocId: dichvunuocid
            },
            dataType: "json",
            success: function (response) {
                window.open('/RpInPhieuDichVuNuoc/Index', '_blank');
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