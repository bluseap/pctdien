var nguyen = {

    appUserLoginLogger: function (username, stattuscontent) {
        return $.ajax({
            type: 'GET',
            url: '/admin/AppUserLogin/CountUserLogin',
            data: {
                userNameId: username,
                statuscontent: stattuscontent
            },
            dateType: 'json',
            success: function (res) {
            },
            error: function (status) {
                console.log(status);
                niti.notify('User logger.', 'error');
            }
        });
    },
    getFormattedDateTimeHourNguyen: function (datetime) {
        if (datetime === null || datetime === '')
            return '';

        var newdate = new Date(datetime);

        var month = newdate.getMonth() + 1;
        var day = newdate.getDate();
        var year = newdate.getFullYear();
        var hh = newdate.getHours();
        var mm = newdate.getMinutes();
        var ss = newdate.getSeconds();

        if (month < 10)
            month = "0" + month;
        if (day < 10)
            day = "0" + day;
        if (hh < 10)
            hh = "0" + hh;
        if (mm < 10)
            mm = "0" + mm;

        return hh + ':' + mm + ', ' + day + '/' + month + '/' + year;
    },

    getTTDangKyNuoc: function (trangthai) {
        if (trangthai === 1)
            return '<span class="badge bg-orange">Chưa xác nhận</span>';
        else if (trangthai === 2)
            return '<span class="badge bg-blue">Đã xác nhận</span>';
        else if (trangthai === 3)
            return '<span class="badge bg-green">Chưa lắp</span>';
        else if (trangthai === 9)
            return '<span class="badge bg-red">Từ chối</span>';
        else if (trangthai === 21)
            return '<span class="badge bg-blue">Đã lắp</span>';
        //else if (trangthai === 6)
        //    return '<span class="badge bg-orange">Chuyển đi</span>';  
        else
            return '<span class="badge bg-purple">Không biết</span>';
    },
    getTTCacDichVuNuoc: function (trangthai) {
        if (trangthai === 1)
            return '<span class="badge bg-orange">Chưa xác nhận</span>';
        else if (trangthai === 2)
            return '<span class="badge bg-blue">Đã xác nhận</span>';   
        else if (trangthai === 9)
            return '<span class="badge bg-red">Từ chối</span>';
        else
            return '<span class="badge bg-purple">Không biết</span>';
    },

    getTTDonDangKyNuoc: function (trangthai) {
        if (trangthai === 'DK_A')
            return '<span class="badge bg-blue">Đẵ đăng ký</span>';
        else if (trangthai === 'DK_RA')
            return '<span class="badge bg-red">TC X.nhận</span>';
        else if (trangthai === 'DK_NO')
            return '<span class="badge bg-orange">Chưa Xử lý Đ.ký</span>';

        else if (trangthai === 'TK_A')
            return '<span class="badge bg-blue">Đã T.kế</span>';
        else if (trangthai === 'TK_N')
            return '<span class="badge bg-green">Ch.bị T.kế</span>';
        else if (trangthai === 'TK_P')
            return '<span class="badge bg-orange">Đang T.kế</span>';
        else if (trangthai === 'TK_RA')
            return '<span class="badge bg-red">TC T.kế</span>';

        else if (trangthai === 'CT_A')
            return '<span class="badge bg-blue">Đã Ch.tính</span>';
        else if (trangthai === 'CT_N')
            return '<span class="badge bg-green">Ch.bị Ch.tính</span>';
        else if (trangthai === 'CT_P')
            return '<span class="badge bg-orange">Đang Ch.tính</span>';
        else if (trangthai === 'CT_RA')
            return '<span class="badge bg-red">TC Ch.tính</span>';

        else if (trangthai === 'HD_A')
            return '<span class="badge bg-blue">Đã H.đồng</span>';
        else if (trangthai === 'HD_N')
            return '<span class="badge bg-green">Ch.bị H.đồng</span>';
        else if (trangthai === 'HD_P')
            return '<span class="badge bg-orange">Đang H.đồng</span>';
        else if (trangthai === 'HD_RA')
            return '<span class="badge bg-red">TC H.đồng</span>';

        else if (trangthai === 'TC_A')
            return '<span class="badge bg-blue">Đã T.công</span>';
        else if (trangthai === 'TC_N')
            return '<span class="badge bg-green">Ch.bị T.công</span>';
        else if (trangthai === 'TC_P')
            return '<span class="badge bg-orange">Đang T.công</span>';
        else if (trangthai === 'TC_RA')
            return '<span class="badge bg-red">TC T.công</span>';

        else if (trangthai === 'NT_A')
            return '<span class="badge bg-blue">Đã Ngh.thu</span>';
        else if (trangthai === 'NT_N')
            return '<span class="badge bg-green">Ch.bị Ngh.thu</span>';
        else if (trangthai === 'NT_P')
            return '<span class="badge bg-orange">Đang Ngh.thu</span>';
        else if (trangthai === 'NT_RA')
            return '<span class="badge bg-red">TC Ngh.thu</span>';
        
        else
            return '<span class="badge bg-purple">Không biết</span>';
    },
    getTTDonDangKyDien: function (trangthai) {
        if (trangthai === 'DK_A')
            return '<span class="badge bg-blue">Đẵ đăng ký</span>';
        else if (trangthai === 'DK_RA')
            return '<span class="badge bg-red">TC X.nhận</span>';

        else if (trangthai === 'TK_A')
            return '<span class="badge bg-blue">Đã T.kế</span>';
        else if (trangthai === 'TK_N')
            return '<span class="badge bg-green">Ch.bị T.kế</span>';
        else if (trangthai === 'TK_P')
            return '<span class="badge bg-orange">Đang T.kế</span>';
        else if (trangthai === 'TK_RA')
            return '<span class="badge bg-red">TC T.kế</span>';

        else if (trangthai === 'CT_A')
            return '<span class="badge bg-blue">Đã Ch.tính</span>';
        else if (trangthai === 'CT_N')
            return '<span class="badge bg-green">Ch.bị Ch.tính</span>';
        else if (trangthai === 'CT_P')
            return '<span class="badge bg-orange">Đang Ch.tính</span>';
        else if (trangthai === 'CT_RA')
            return '<span class="badge bg-red">TC Ch.tính</span>';

        else if (trangthai === 'HD_A')
            return '<span class="badge bg-blue">Đã H.đồng</span>';
        else if (trangthai === 'HD_N')
            return '<span class="badge bg-green">Ch.bị H.đồng</span>';
        else if (trangthai === 'HD_P')
            return '<span class="badge bg-orange">Đang H.đồng</span>';
        else if (trangthai === 'HD_RA')
            return '<span class="badge bg-red">TC H.đồng</span>';

        else if (trangthai === 'TC_A')
            return '<span class="badge bg-blue">Đã T.công</span>';
        else if (trangthai === 'TC_N')
            return '<span class="badge bg-green">Ch.bị T.công</span>';
        else if (trangthai === 'TC_P')
            return '<span class="badge bg-orange">Đang T.công</span>';
        else if (trangthai === 'TC_RA')
            return '<span class="badge bg-red">TC T.công</span>';

        else if (trangthai === 'NT_A')
            return '<span class="badge bg-blue">Đã Ngh.thu</span>';
        else if (trangthai === 'NT_N')
            return '<span class="badge bg-green">Ch.bị Ngh.thu</span>';
        else if (trangthai === 'NT_P')
            return '<span class="badge bg-orange">Đang Ngh.thu</span>';
        else if (trangthai === 'NT_RA')
            return '<span class="badge bg-red">TC Ngh.thu</span>';

        else
            return '<span class="badge bg-purple">Không biết</span>';
    },

    getTTThayHopDongNuoc: function (trangthai) {
        if (trangthai === '2')
            return '<span class="badge bg-green">Có thời hạn</span>';
        else if (trangthai === '1')
            return '<span class="badge bg-blue">Không thời hạn</span>';  
        else if (trangthai === '3')
            return '<span class="badge bg-blue">Ngắn hạn</span>';  
        else
            return '<span class="badge bg-purple">Không biết</span>';
    },

    getSoThanhChu: function (number) {
        if (number === null || number === '')
            return '';

        let chu = '';

        if (number == '1')
            chu = 'Một';
        if (number == '2')
            chu = 'Hai';
        if (number == '3')
            chu = 'Ba';
        if (number == '4')
            chu = 'Bốn';
        if (number == '5')
            chu = 'Năm';
        if (number == '6')
            chu = 'Sáu';
        if (number == '7')
            chu = 'Bảy';
        if (number == '8')
            chu = 'Tám';
        if (number == '9')
            chu = 'Chín';
        if (number == '10')
            chu = 'Mười';
        if (number == '11')
            chu = 'Mười một';
        if (number == '12')
            chu = 'Mười hai';

        return chu;
    },

    startLoading: function () {             
        $('body').loading({
            stoppable: true,
            message: 'Loading...',
            theme: 'dark'
        });
    },
    stopLoading: function () {       
        $(':loading').loading('stop');
    },

}