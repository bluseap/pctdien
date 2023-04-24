var loaddatatableController = function () {

    //var userCorporationId = $("#hidUserCorporationId").val();
    //var userName = $("#hidUserName").val();

    this.loadCodeDanhMucThietBiATBHLD = function (code) {
        loadCodeDanhMucThietBiATBHLD(code);
    }

    this.loadCodeDanhMucDieuKienATD = function (code) {
        loadCodeDanhMucDieuKienATD(code);
    }

    this.loadCodeDanhMucNoiDungCongTac = function (code) {
        loadCodeDanhMucNoiDungCongTac(code);
    }    

    function loadCodeDanhMucNoiDungCongTac(code) {
        return $.ajax({
            type: 'GET',
            url: '/admin/pctdiennhap/ListDMPCT',
            data: {
                Code: code
            },
            dataType: 'json',
            success: function (response) {
                var render = '';
                $.each(response.Result, function (i, item) {
                    render += '<li><a><label ><input id="ndct' + item.Id
                        + '" type="checkbox" class="ul-checkbox ul-checkbox-cacnoidungct" name="amenities[]" value="'
                        + item.TenNoiDung + '"> ' + item.TenNoiDung + '</label ></a ></li >';
                });                    
                $('#ulPCTDienChonNoiDungCongTac').html(render);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Nội dung công tác.', 'error');
            }
        });
    }

    function loadCodeDanhMucDieuKienATD(code) {
        return $.ajax({
            type: 'GET',
            url: '/admin/pctdiennhap/ListDMPCT',
            data: {
                Code: code
            },
            dataType: 'json',
            success: function (response) {
                var render = "<option value='%' >-- Lựa chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenNoiDung + "</option>";
                });
                $('#ddlPCTDienChonDieuKienATD').html(render);
                $("#ddlPCTDienChonDieuKienATD")[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Nội dung công tác.', 'error');
            }
        });
    }

    function loadCodeDanhMucThietBiATBHLD(code) {
        return $.ajax({
            type: 'GET',
            url: '/admin/pctdiennhap/ListDMPCT',
            data: {
                Code: code
            },
            dataType: 'json',
            success: function (response) {
                var render = "<option value='%' >-- Lựa chọn --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.TenNoiDung + "</option>";
                });
                $('#ddlPCTDienChonTrangBiATBHLDLamViec').html(render);
                $("#ddlPCTDienChonTrangBiATBHLDLamViec")[0].selectedIndex = 0;
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Nội dung công tác.', 'error');
            }
        });
    }

}