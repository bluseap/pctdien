(function () {
    var
        form = $('.frmInPhieuTiepNhanDien'),
        cache_width = form.width(),
        a4 = [595.28, 841.89]; // for a4 size paper width and height

    loadPhieuTiepNhanDien();

    $('#create_pdf').on('click', function () {
        $('body').scrollTop(0);
        createPDF();
    });

    //create pdf
    function createPDF() {
        getCanvas().then(function (canvas) {
            var img = canvas.toDataURL("image/png");

            var doc = new jsPDF({
                unit: 'px',
                format: 'a4'
            });
            var options = {
                pagesplit: true
            };

            doc.addImage(img, 'PNG', 10, 10);
            doc.addHTML($(".frmInPhieuTiepNhanDien"), options, function () {
                doc.save("PhieuTiepNhan.pdf");
            });
            form.width(cache_width);

            //var img = canvas.toDataURL("image/png");
            //var doc = new jsPDF({
            //    unit: 'px',
            //    format: 'a4'
            //});
            //doc.addImage(img, 'PNG', 10, 10);
            //doc.save('PhieuTiepNhan.pdf');
            //form.width(cache_width);
        });
    }

    // create canvas object
    function getCanvas() {
        form.width((a4[0] * 1.33333) - 80).css('max-width', 'none');
        return html2canvas(form, {
            imageTimeout: 2000,
            removeContainer: true
        });
    }

    function loadPhieuTiepNhanDien() {
        var cachdichvudienid = $('#hidTTCacDichVuDienId').val();

        $.ajax({
            type: 'GET',
            url: '/RpInPhieuDichVuDien/GetById',
            data: {
                dichvudienId: cachdichvudienid 
            },
            dataType: 'json',
            success: function (response) {
                if (response.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $('#lbNgayNhanHoSoLapMoi').html('An Giang, ' + powa.getFormattedDateNgayThangNamTTDangKy(response.ThoiGianNhanHoSo));
                    $('#lbMaHoSo').html(response.MaSoHoSo);

                    $('#lbtennguoiyeucau').html(response.HoTenNguoiYeuCau);
                    $('#lbdiachi').html(response.SoNha + ',' + response.TenDuongApTo + ',' + response.Tenphuong + ',' + response.TenQuan);

                    $('#lbsodienthoai').html(response.DienThoai);
                    //$('#lbSoCCCD').val(response.SoTheCCCD);
                    $('#lbyeucaugiaiquyet').html(response.DichVuKhachHang);

                    var dmdangkydichvu = response.TTDMDangKyDichVu;

                    // 32: thay doi vi tri do dem
                    if (dmdangkydichvu == 32) {
                        $('#lbHoSoKemTheo').html(response.ThayDoiViTri !== 0 ? '1/ ' + response.ThayDoiViTri : "");
                        $('#lbGiayToXacDinhChuThe').html("");
                    }
                    // 33: thay doi muc dich su dung
                    if (dmdangkydichvu == 33) {
                        $('#lbHoSoKemTheo').html(response.ThayDoiMDSD !== 0 ? '1/ ' + response.ThayDoiMDSD : "");
                        $('#lbGiayToXacDinhChuThe').html("");
                    }
                    // 34: thay doi dinh muc su dung
                    if (dmdangkydichvu == 34) {
                        $('#lbHoSoKemTheo').html(response.ThayDoiDMSD !== 0 ? '1/ ' + response.ThayDoiDMSD : "");
                        $('#lbGiayToXacDinhChuThe').html("");
                    }
                    // 35: thay doi chu the hop dong
                    if (dmdangkydichvu == 35) {
                        $('#lbHoSoKemTheo').html(response.HopDongGiayToTuyThan !== 0 ? '1/ ' + response.HopDongGiayToTuyThan : "");
                        $('#lbGiayToXacDinhChuThe').html(response.ThayDoiHopDong !== 0 ? '2/ ' + response.ThayDoiHopDong : "");
                    }
                   
                    $('#lbSoLuongHoSo').html(response.SoLuongHoSo + ' (bộ)');

                    var thoigiangiaiquyethoso = response.ThoiGianGiaiQuyetHoSo;
                    // 999: mac nhien la trong thang ke tiep
                    if (thoigiangiaiquyethoso == 999) {
                        $('#lbsongaygiaiquyethoso').html(" Trong tháng tiếp theo.");
                    }
                    else {
                        $('#lbsongaygiaiquyethoso').html(response.ThoiGianGiaiQuyetHoSo + ' ngày');
                    }

                    $('#lbthoigiannhanhoso').html(powa.getFormattedDateTimeHourTTDangKy(response.ThoiGianNhanHoSo));
                    $('#lbthoigiantraketquahoso').html(powa.getFormattedDateTimeHourTTDangKy(response.ThoiGianTraKetQuaHoSo));

                    // 883 : thuoc Quan ten Long Xuyen
                    var xinghiep = response.QuanHuyenId == 883 ? 'Xí nghiệp cấp nước ' + response.TenQuan :
                        'Xí nghiệp điện nước ' + response.TenQuan;
                    $('#lbxinghiep').html(xinghiep);
                }
            },
            error: function (status) {

            }
        });
    }

    

}());