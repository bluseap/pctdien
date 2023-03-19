var mathehocvienController = function () {    

    this.loadEditMaTheNhanVien = function () {
        loadEditMaTheNhanVien();
    }

    this.initialize = function () {
        registerEvents();
       
        clearMaTheNhanVien();
    }

    function registerEvents() {     

        $('#btnSaveMaTheHocVien').on('click', function () {
            updateMaTheHocVien();            
        });        

    }    

    function clearMaTheNhanVien () {     
        $('#hidDaoTaoNhanVienIdMoi').val(0);

        $('#txtMaSoThe').val('');
        $('#txtGhiChuDaoTao').val('');        
    }

    function loadEditMaTheNhanVien() {
        var daotaonhanvien = $('#hidDaoTaoNhanVienIdMoi').val();

        $.ajax({
            type: "GET",
            url: "/Admin/daotao/GetDaoTaoNVHId",
            data: { daotaonhanvienid: daotaonhanvien },
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var daotao = response.Result[0];

                $('#txtHoTenMaThe').val(daotao.TenHocVien);
                $('#txtMaSoThe').val(daotao.MaSoTheHocVien);
                $('#txtGhiChuDaoTao').val(daotao.GhiChuBacDaoTao);  

                tedu.stopLoading();
            },
            error: function (status) {
                tedu.notify('Có lỗi xảy ra', 'error');
                tedu.stopLoading();
            }
        });
    }

    function updateMaTheHocVien() {

        var daotaonhanvienid = $('#hidDaoTaoNhanVienIdMoi').val();
        var masothehv = $('#txtMaSoThe').val();
        var ghichudaotao = $('#txtGhiChuDaoTao').val();  

        $.ajax({
            url: '/admin/daotao/UpMaThe',
            data: {
                Id: daotaonhanvienid,

                MaSoTheHocVien: masothehv,
                GhiChuBacDaoTao: ghichudaotao
            },
            type: 'post',
            dataType: 'json',
            success: function (response) {                
                if (response.Result === false) {
                    tedu.notify("Lưu mã thẻ học viên.", "error");
                }
                else {
                    tedu.notify('Lưu mã thẻ học viên.', 'success');
                   
                    loadTableDaoTaoDangKy(true);

                    clearMaTheNhanVien();
                    $('#modal-add-edit-MaTheHocVien').modal('hide');
                    tedu.stopLoading();
                }               
            }
        });

    }

    function loadTableDaoTaoDangKy(isPageChanged) {
        var template = $('#template-table-DangKyDaoTaoNhanVien').html();
        var render = "";
        var daotaolopId = $('#hidDangKyDaoTaoLopId').val();

        $.ajax({
            type: 'GET',
            data: {
                daotaoId: daotaolopId,
                keyword: "",
                page: tedu.configs.pageIndex,
                pageSize: tedu.configs.pageSize
            },
            url: '/admin/daotao/GetDaoTaoNhanVienLopId',
            dataType: 'json',
            success: function (response) {
                if (response.Result.Results.length === 0) {
                    render = "<tr><th><a>Không có dữ liệu</a></th><th></th><th></th><th></th><th></th><th></th></tr>";
                }
                else {
                    var query = response.Result.Results;
                    $.each(query, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,
                            HoSoNhanVienId: item.HoSoNhanVienId,
                            MaSoTheHocVien: item.MaSoTheHocVien,
                            GhiChuBacDaoTao: item.GhiChuBacDaoTao,
                            Ten: item.TenNhanVien,
                            TenKhuVuc: item.TenKhuVuc,
                            TenPhong: item.TenPhong,
                            TenChucVu: item.TenChucVu,
                            hosoId: item.Id
                            //Status: tedu.getHoSoNhanVienStatus(item.Status)
                            // Price: tedu.formatNumber(item.Price, 0),                          
                        });
                    });

                }

                $('#lblDangKyDaoTaoNhanVienTotalRecords').text(response.Result.RowCount);

                if (render !== '') {
                    $('#table-contentDangKyDaoTaoNhanVien').html(render);
                }

                if (response.Result.RowCount !== 0) {
                    wrapPagingDaoTaoDangKy(response.Result.RowCount, function () {
                        loadTableDaoTaoDangKy();
                    },
                        isPageChanged);
                }
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không thể lấy dữ liệu về.', 'error');
            }
        });

    }
    function wrapPagingDaoTaoDangKy(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / tedu.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationULDangKyDaoTaoNhanVien a').length === 0 || changePageSize === true) {
            $('#paginationULDangKyDaoTaoNhanVien').empty();
            $('#paginationULDangKyDaoTaoNhanVien').removeData("twbs-pagination");
            $('#paginationULDangKyDaoTaoNhanVien').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationULDangKyDaoTaoNhanVien').twbsPagination({
            totalPages: totalsize,
            visiblePages: 7,
            first: 'Đầu',
            prev: 'Trước',
            next: 'Tiếp',
            last: 'Cuối',
            onPageClick: function (event, p) {
                //tedu.configs.pageIndex = p;
                //setTimeout(callBack(), 200);
                if (tedu.configs.pageIndex !== p) {
                    tedu.configs.pageIndex = p;
                    setTimeout(callBack(), 200);
                }
            }
        });
    } 


}