var quatrinhxulyController = function () {

    this.loadQuaTrinhXuLyDien = function (giaydenghiDMCCDVDienId) {
        loadTableQuaTrinhXuLyDien(giaydenghiDMCCDVDienId);
    }

    this.initialize = function () {
        registerEvents();
        clearQuaTrinhXuLyData();
    }

    function registerEvents() {


    }

    function clearQuaTrinhXuLyData() {

    }

    function loadTableQuaTrinhXuLyDien(giaydenghiDMCCDVDienId) {
        var template = $('#table-QuaTrinhXuLyDien').html();
        var render = "";

        $.ajax({
            type: 'GET',
            url: '/admin/giaydndien/GDNQTCC',
            data: {
                giaydenghiDMCCDVDienid: giaydenghiDMCCDVDienId
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.Results.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th></tr>";
                }
                else {
                    $.each(response.Result.Results, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,
                            MoTa: item.MoTa,
                            //HinhNhanVien: item.Image === null ? '<img src="/admin-side/images/user.png?h=90"' : '<img src="' + item.HinhNhanVien + '?h=90" />',
                            CreateDate: tedu.getFormattedDate(item.CreateDate)
                            //TTDeNghi: tedu.getGiayDeNghiTT(item.TTDeNghi)
                            //NgayDenCuaVanBan: tedu.getFormattedDate(item.NgayDenCuaVanBan),                            
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });
                }
              
                if (render !== '') {
                    $('#tbl-contentQuaTrinhXuLyDien').html(render);
                }               
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }


}