﻿var vbdduyetController = function () {

    var userCorporationId = $("#hidUserCorporationId").val();

    var vbdduyetfile = new vbdduyetfileController();
    var chochuyenchuyenmon = new chochuyenchuyenmonController();
    var dachuyenchuyenmon = new dachuyenchuyenmonController();
    var choduyet = new choduyetController();
    var daduyet = new daduyetController();
    var dathuchien = new dathuchienController();
    var duyettatca = new duyettatcaController();

    this.initialize = function () {
        //tedu.isVanBanDen('VANBANDENDUYET');

        loadKhuVuc();

        registerEvents();           

        chochuyenchuyenmon.initialize();
        dachuyenchuyenmon.initialize();
        choduyet.initialize();
        daduyet.initialize();
        dathuchien.initialize();
        duyettatca.initialize();
        vbdduyetfile.initialize();

        loadData();
    }

    function registerEvents() {        
        $('#boxContentVBDDuyetTim').slideToggle(200, function () {
            $('#boxPanelVBDDuyetTim').removeAttr('style');
        });
    }

    function loadKhuVuc() {
        return $.ajax({
            type: 'GET',
            url: '/admin/hoso/GetListCorNhanSu',
            dataType: 'json',
            success: function (response) {
                var render = "<option value='%' >-- Tất cả --</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Name + "</option>";
                });
                $('#ddlKhuVuc').html(render);
                var userCorporationId = $("#hidUserCorporationId").val();
                if (userCorporationId !== "PO") {
                    $('#ddlKhuVuc').prop('disabled', true);
                }
                else {
                    $('#ddlKhuVuc').prop('disabled', false);
                }
                $("#ddlKhuVuc")[0].selectedIndex = 1;
                $('#ddlKhuVuc').prop('disabled', true);

                var makv = $('#ddlKhuVuc').val();
                chochuyenchuyenmon.loadCountVanBanDen(makv);
                chochuyenchuyenmon.loadTableCCCM();
                dachuyenchuyenmon.loadTableDaCCM();
                duyettatca.loadTableDuyetTatCa();
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có danh mục Công Ty.', 'error');
            }
        });
    }

    function loadData() {
        loadVanBanCoQuanBanHanhList();
    }

    function loadVanBanCoQuanBanHanhList() {
        $.ajax({
            type: 'GET',
            url: '/admin/vbcoquan/VanBanCoQuanGetList',
            dataType: "json",
            beforeSend: function () {
                tedu.startLoading();
            },
            success: function (response) {
                var render = "<option value='%' >--- Lựa chọn ---</option>";
                $.each(response.Result, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Ten + "</option>";
                });
                $('#ddlCoQuanBanHanh').html(render);
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Không có văn bản cơ quan ban hành.', 'error');
            }
        });
    }

}