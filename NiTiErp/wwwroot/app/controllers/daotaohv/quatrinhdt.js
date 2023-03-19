var quatrinhdtController = function () {   

    this.loadTableQuaTrinhDaoTao = function () {
        loadTableQuaTrinhDaoTao();
    }

    this.initialize = function () {        
        //registerEvents();
        //loadDataQuaTrinhDaoTao();
        //clearQuaTrinhDaoTao();
    }

    //function registerEvents() {          

    //}

    //function loadDataQuaTrinhDaoTao() {
        
    //}

    //function clearQuaTrinhDaoTao() {
    //    //var datenow = new Date();   
    //}

    function loadTableQuaTrinhDaoTao() {
        var template = $('#table-QuaTrinhDaoTaoHocVien').html();
        var render = "";

        var hosonhanvienId = $('#hidHoSoNhanVienId').val();       

        $.ajax({
            type: 'GET',
            url: '/admin/daotaohv/QuaTrinhDT',
            data: {
                hosonhanvienid: hosonhanvienId
            },
            dataType: 'json',
            success: function (response) {
                if (response.Result.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    $.each(response.Result, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,
                            HoSoNhanVienId: item.HoSoNhanVienId,
                            MaSoTheHocVien: item.MaSoTheHocVien,
                            TenTruong: item.TenTruong,
                            ChuyenMon: item.ChuyenMon,
                            BacDaoTao: item.BacDaoTao,
                            NgayBatDau: tedu.getFormattedDate(item.NgayBatDau),
                            NgayKetThuc: tedu.getFormattedDate(item.NgayKetThuc),
                            GhiChuBacDaoTao: item.GhiChuBacDaoTao                                              
                        });
                    });
                }

                $('#lbl-totalQuaTrinhDaoTaoHocVien-records').text(response.Result.length);

                if (render !== '') {
                    $('#tbl-contentQuaTrinhDaoTaoHocVien').html(render);
                }

                //if (response.Result.RowCount !== 0) {
                //    loadTableQuaTrinhDaoTao(response.Result.RowCount, function () {
                //        loadTableHoSoHocVien();
                //    },
                //        isPageChanged);
                //}
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });
    }

    
}