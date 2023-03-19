(function () {
    var
        form = $('.frmInPhieuTiepNhanNuoc'),
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
            doc.addHTML($(".frmInPhieuTiepNhanNuoc"), options, function () {
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
        var dangkyNuocid = $('#hidTTDangKyNuocId').val();

        $.ajax({
            type: 'GET',
            url: '/RpInPhieuTiepNhanNuoc/GetById',
            data: {
                dangkynuocId: dangkyNuocid//3
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
                    $('#lbyeucaugiaiquyet').html(response.NoiDungYeuCau);

                    $('#lbSoCCCD').html(response.TTDMDangKyGiayToTuyThan !== 0 ? '1/ ' + response.TenGiayToTuyThan : "");
                    $('#lbGiayToXacDinhChuThe').html(response.TTDMDangKyGiayToXacDinhChuThe !== 0 ? '2/ ' + response.TenXacDinhChuThe : "");
                    $('#lbGiayToXacDinhMucDich').html(response.TTDMDangKyGiayToXacDinhMucDich !== 0 ? '3/ ' + response.TenXacDinhMucDich.toString() : "");
                   
                    $('#lbSoLuongHoSo').html(response.SoLuongHoSo + ' (bộ)');
                    $('#lbsongaygiaiquyethoso').html(response.ThoiGianGiaiQuyetHoSo + ' ngày');
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