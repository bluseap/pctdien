﻿var tedu = {
    configs: {
        pageSize: 10,
        pageIndex: 1
    },
    configs15: {
        pageSize: 5,
        pageIndex: 1
    },
    notify: function (message, type) {
        $.notify(message, {
            // whether to hide the notification on click
            clickToHide: true,
            // whether to auto-hide the notification
            autoHide: true,
            // if autoHide, hide after milliseconds
            autoHideDelay: 5000,
            // show the arrow pointing at the element
            arrowShow: true,
            // arrow size in pixels
            arrowSize: 5,
            // position defines the notification position though uses the defaults below
            position: '...',
            // default positions
            elementPosition: 'top right',
            globalPosition: 'top right',
            // default style
            style: 'bootstrap',
            // default class (string or [string])
            className: type,
            // show animation
            showAnimation: 'slideDown',
            // show animation duration
            showDuration: 400,
            // hide animation
            hideAnimation: 'slideUp',
            // hide animation duration
            hideDuration: 200,
            // padding between element and notification
            gap: 2
        });
    },
    confirm: function (message, okCallback) {
        bootbox.confirm({
            message: message,
            buttons: {
                confirm: {
                    label: 'Đồng ý',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'Hủy',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                if (result === true) {
                    okCallback();
                }
            }
        });
    },
    confirmOk: function (message, okCallback) {
        bootbox.confirm({
            message: message,
            buttons: {
                confirm: {
                    label: 'Đồng ý',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'Hủy',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                if (result === true) {
                    okCallback();
                }
                else {
                    okCallback();
                }
            }
        });
    },

    getFormattedDateTimeHour: function (datetime) {
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
        //return day + "/" + month + "/" + year;
        //var str = newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate() +
        //    " " + newdate.getHours() + ":" + newdate.getMinutes() + ":" + newdate.getSeconds();

        return day + month + year + hh + mm + ss;
    },

    getFormattedDate: function (datetime) {
        if (datetime === null || datetime === '')
            return '';

        var newdate = new Date(datetime);

        var month = newdate.getMonth() + 1;
        var day = newdate.getDate();
        var year = newdate.getFullYear();
        var hh = newdate.getHours();
        var mm = newdate.getMinutes();
        if (month < 10)
            month = "0" + month;
        if (day < 10)
            day = "0" + day;
        if (hh < 10)
            hh = "0" + hh;
        if (mm < 10)
            mm = "0" + mm;
        return day + "/" + month + "/" + year;

        //var str = newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate() +
        //    " " + newdate.getHours() + ":" + newdate.getMinutes() + ":" + newdate.getSeconds();

        //return day + "/" + month + "/" + year;
    },

    getFormattedDateTimeN: function (datetime) {
        if (datetime === null || datetime === '')
            return '';

        var newdate = new Date(datetime);

        var month = newdate.getMonth() + 1;
        var day = newdate.getDate();
        var year = newdate.getFullYear();

        var hh = newdate.getHours();
        var mm = newdate.getMinutes();

        if (month < 10)
            month = "0" + month;
        if (day < 10)
            day = "0" + day;
        if (hh < 10)
            hh = "0" + hh;
        if (mm < 10)
            mm = "0" + mm;
        return day + "/" + month + "/" + year + "    " + hh + ":" + mm;
       
    },

    getFormattedDateYYYYMMDD: function (datetime) {
        if (datetime === null || datetime === '')
            return '';

        var newdate = new Date(datetime);

        var month = newdate.getMonth() + 1;
        var day = newdate.getDate();
        var year = newdate.getFullYear();

        var hh = newdate.getHours();
        var mm = newdate.getMinutes();

        if (month < 10)
            month = "0" + month;
        if (day < 10)
            day = "0" + day;
        if (hh < 10)
            hh = "0" + hh;
        if (mm < 10)
            mm = "0" + mm;
        //return day + "/" + month + "/" + year + "    " + hh + ":" + mm;
        return year + month + day;
    },

    getFormattedDateYYYYMM: function (datetime) {
        if (datetime === null || datetime === '')
            return '';

        var newdate = new Date(datetime);

        var month = newdate.getMonth() + 1;
        var day = newdate.getDate();
        var year = newdate.getFullYear();

        var hh = newdate.getHours();
        var mm = newdate.getMinutes();

        if (month < 10)
            month = "0" + month;
        if (day < 10)
            day = "0" + day;
        if (hh < 10)
            hh = "0" + hh;
        if (mm < 10)
            mm = "0" + mm;
        //return day + "/" + month + "/" + year + "    " + hh + ":" + mm;
        return year + " / " + month;

    },

    getFormattedDateYY: function (datetime) {
        if (datetime === null || datetime === '')
            return '';

        var newdate = new Date(datetime);
        
        var year = newdate.getFullYear();

        return year.toString().substring(2, 4);
    },
    getFormattedDateYYYY: function (datetime) {
        if (datetime === null || datetime === '')
            return '';

        var newdate = new Date(datetime);

        var year = newdate.getFullYear();

        return year.toString();
    },
    getFormattedDateMM: function (datetime) {
        if (datetime === null || datetime === '')
            return '';

        var newdate = new Date(datetime);

        var month = newdate.getMonth() + 1;          

        if (month < 10)
            month = "0" + month;       
       
        return month;
    },
    getFormattedDateDD: function (datetime) {
        if (datetime === null || datetime === '')
            return '';

        var newdate = new Date(datetime);
       
        var day = newdate.getDate();     

        if (day < 10)
            day = "0" + day;        
       
        return day;
    },
    getFormattedDateGio: function (datetime) {
        if (datetime === null || datetime === '')
            return '';

        var newdate = new Date(datetime);

        var hh = newdate.getHours();        

        if (hh < 10)
            hh = "0" + hh;            

        return hh;
    },
    getFormattedDatePhut: function (datetime) {
        if (datetime === null || datetime === '')
            return '';

        var newdate = new Date(datetime);
        
        var mm = newdate.getMinutes();
        
        if (mm < 10)
            mm = "0" + mm;

        return mm;
    },


    getFormatDateYYMMDD: function (datetime) {    
        var ngaysinh = datetime.split("/");
        var f = new Date(ngaysinh[2], ngaysinh[1] - 1, ngaysinh[0]).toDateString("yyyy/MM/dd");

        return f;
    },    
    getFormatDateYYyyMMDD2: function (datetime) {
        var ngaysinh = datetime.split("/");
        var f = ngaysinh[2].toString() + "/" + (ngaysinh[1]).toString() + "/" +
            ngaysinh[0].toString();

        return f;
    },  

    dateFormatJson: function (datetime) {
        if (datetime === null || datetime === '')
            return '';
        var newdate = new Date(parseInt(datetime.substr(6)));
        var month = newdate.getMonth() + 1;
        var day = newdate.getDate();
        var year = newdate.getFullYear();
        var hh = newdate.getHours();
        var mm = newdate.getMinutes();
        if (month < 10)
            month = "0" + month;
        if (day < 10)
            day = "0" + day;
        if (hh < 10)
            hh = "0" + hh;
        if (mm < 10)
            mm = "0" + mm;
        return day + "/" + month + "/" + year;
    },
    dateTimeFormatJson: function (datetime) {
        if (datetime === null || datetime === '')
            return '';
        var newdate = new Date(parseInt(datetime.substr(6)));
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
        if (ss < 10)
            ss = "0" + ss;
        return day + "/" + month + "/" + year + " " + hh + ":" + mm + ":" + ss;
    },
    startLoading: function () {
        if ($('.dv-loading').length > 0)
            $('.dv-loading').removeClass('hide');
        //$('#loading-always').loading();
    },
    stopLoading: function () {
        if ($('.dv-loading').length > 0)
            $('.dv-loading').addClass('hide');
    },
    getGoiTinh: function (gioitinh) {
        if (gioitinh === '1')
            return '<span class="badge bg-blue">Nam</span>';
        else if (gioitinh === '0')
            return '<span class="badge bg-green">Nữ</span>';
        else 
            return '<span > </span>';
    },
    getStatus: function (status) {
        if (status === 1)
            return '<span class="badge bg-green">Kích hoạt</span>';
        else
            return '<span class="badge bg-red">Khoá</span>';
    },
    getHoSoNhanVienStatus: function (status) {
        if (status === 1)
            return '<span class="badge bg-green">Làm việc</span>';
        else if (status === 2)
            return '<span class="badge bg-red">Nghĩ việc</span>';
        else if (status === 3)
            return '<span class="badge bg-blue">Về hưu</span>';
        else if (status === 4)
            return '<span class="badge bg-orange">Hết hạn</span>';

        else if (status === 30)
            return '<span class="badge bg-green">Đang học</span>';

        else if (status === 41)
            return '<span class="badge bg-green">Online</span>';
        else if (status === 42)
            return '<span class="badge bg-red">Offline</span>'; 
        else if (status === 43)
            return '<span class="badge bg-orange">Chưa đầy</span>';   
        else if (status === 44)
            return '<span class="badge bg-blue">Tủ đầy</span>';   

        
        else if (status === 61)
            return '<span class="badge bg-green">Mới</span>';
        else if (status === 62)
            return '<span class="badge bg-red">Cũ</span>';
        else if (status === 60)
            return '';

        else if (status === 71)
            return '<span class="badge bg-green">Hoạt động</span>';  
        else if (status === 76)
            return '<span class="badge bg-green">Chưa hoạt động</span>';
        else 
            return '<span class="badge bg-purple">Chưa biết</span>';
    },
    getDaoTaoTT: function (trangthai) {
        if (trangthai === 1)
            return '<span class="badge bg-blue">Đang học</span>';
        else if (trangthai === 2)
            return '<span class="badge bg-purple">Kết thúc</span>';
        else if (trangthai === 3)
            return '<span class="badge bg-orange">Hủy lớp</span>';
        else if (trangthai === 4)
            return '<span class="badge bg-green">Hoàn thành</span>';
        else
            return '<span class="badge bg-red">Không biết</span>';
    },
    getVanBanDenTTXuLy: function (trangthai) {
        if (trangthai === "1")
            return '<span class="badge bg-orange">Chưa chuyển</span>';
        else if (trangthai === "2")
            return '<span class="badge bg-blue">Đã chuyển</span>';
        else if (trangthai === "3")
            return '<span class="badge bg-green">Đã duyệt</span>';       
        else if (trangthai === "4")
            return '<span class="badge bg-purple">Phát hành</span>';
        else
            return '<span class="badge bg-red">Không biết</span>';
    },
    getVanBanDenTTDuyet: function (trangthai) {
        if (trangthai === 1)
            return '<span class="badge bg-green">Chuyển chuyên môn</span>';
        else if (trangthai === 2)
            return '<span class="badge bg-orange">Chưa chuyển chuyên môn</span>';
        else if (trangthai === 3)
            return '<span class="badge bg-red">Sai chuyển lại</span>';
        else if (trangthai === 4)
            return '<span class="badge bg-blue">Duyệt văn thư</span>';
        else
            return '<span class="badge bg-red">Không biết</span>';
    },
    getVanBanDenTTDangXuLy: function (trangthai) {
        if (trangthai === 1)
            return '<span class="badge bg-orange">Nhập văn bản đến</span>';
        else if (trangthai === 2)
            return '<span class="badge bg-green">Chuyển lãnh đạo</span>';
        else if (trangthai === 3)
            return '<span class="badge bg-blue">Lãnh đạo duyệt</span>';
        else if (trangthai === 4)
            return '<span class="badge bg-purple">Kết thúc</span>';
        else if (trangthai === 5)
            return '<span class="badge bg-red">Xử lý lại</span>';
        else
            return '<span class="badge bg-red">Không biết</span>';
    },

    getVanBanDiTTChoXuLy: function (trangthai) {
        if (trangthai === 1)
            return '<span class="badge bg-orange">Đang xử lý</span>';
        else if (trangthai === 2)
            return '<span class="badge bg-green">Chuyển lãnh đạo</span>';
        else if (trangthai === 3)
            return '<span class="badge bg-blue">Đã duyệt</span>';
        //else if (trangthai === "4")
        //    return '<span class="badge bg-blue">Chuyển văn thư</span>';
        else if (trangthai === 5)
            return '<span class="badge bg-red">Xử lý lại</span>';
        else if (trangthai === 0)
            return '<span class="badge bg-purple">Phát hành</span>';
        else
            return '<span class="badge bg-purple">Không biết</span>';
    },
    getVanBanDiTTChoDuyet: function (trangthai) {
        if (trangthai === 1)
            return '<span class="badge bg-orange">Chờ duyệt</span>';
        //else if (trangthai === "2")
        //    return '<span class="badge bg-green">Chuyển lãnh đạo</span>';
        else if (trangthai === 3)
            return '<span class="badge bg-red">Sai trả về</span>';
        else if (trangthai === 4)
            return '<span class="badge bg-blue">Chuyển văn thư</span>';
        //else if (trangthai === "5")
        //    return '<span class="badge bg-red">Xử lý lại</span>';
        else if (trangthai === 0)
            return '<span class="badge bg-purple">Phát hành</span>';
        else
            return '<span class="badge bg-purple">Không biết</span>';
    },
    getVanBanDiTTChuaPhatHanh: function (trangthai) {
        if (trangthai === 1)
            return '<span class="badge bg-orange">Chưa phát hành</span>';
        //else if (trangthai === "2")
        //    return '<span class="badge bg-green">Chuyển lãnh đạo</span>';
        //else if (trangthai === "3")
        //    return '<span class="badge bg-blue">Lãnh đạo duyệt</span>';
        else if (trangthai === 4)
            return '<span class="badge bg-purple">Phát hành</span>';
        //else if (trangthai === "5")
        //    return '<span class="badge bg-red">Xử lý lại</span>';

        else if (trangthai === 0)
            return '<span class="badge bg-purple">Phát hành</span>';
        else
            return '<span class="badge bg-red">Không biết</span>';
    },
    getCLGiayDiDuong: function (trangthai) {
        if (trangthai === 1)
            return '<span class="badge bg-orange">Trong tỉnh</span>';    
        else if (trangthai === 2)
            return '<span class="badge bg-green">Ngoài tỉnh</span>';
        else 
            return '<span class="badge bg-white"></span>';
    },
    getGiayDeNghiTT: function (trangthai) {
        if (trangthai === 2)
            return '<span class="badge bg-blue">Hoàn thành</span>';
        else if (trangthai === 3)
            return '<span class="badge bg-orange">Chờ duyệt</span>';
        else if (trangthai === 4)
            return '<span class="badge bg-green">Chờ kiểm tra</span>';
        else if (trangthai === 5)
            return '<span class="badge bg-purple">Chờ thiết kế</span>';    
        else if (trangthai === 6)
            return '<span class="badge bg-purple">Chờ Thi công</span>';   
        else if (trangthai === 7)
            return '<span class="badge bg-purple">Đang chuyển</span>';
        else if (trangthai === 8)
            return '<span class="badge bg-purple">Kết thúc kiểm tra</span>';  
        else if (trangthai === 9)
            return '<span class="badge bg-purple">Đang thiết kế</span>'; 
        else if (trangthai === 10)
            return '<span class="badge bg-purple">Đang thi công</span>';
        else if (trangthai === 11)
            return '<span class="badge bg-red">Hủy hồ sơ</span>';  
        else
            return '<span class="badge bg-purple">Chờ xử lý</span>';
    },
    getHoSoLuuTru: function (trangthai) {
        if (trangthai === 2)
            return '<span class="badge bg-blue">Còn trống</span>';
        else if (trangthai === 3)
            return '<span class="badge bg-blue">Đang có</span>';
        else if (trangthai === 4)
            return '<span class="badge bg-green">Đầy</span>';
        else if (trangthai === 6)
            return '<span class="badge bg-orange">Chuyển đi</span>';
        else if (trangthai === 8)
            return '<span class="badge bg-red">Xóa</span>';
        else if (trangthai === 10)
            return '<span class="badge bg-orange">Đã mượn</span>';
        else
            return '<span class="badge bg-purple">Không biết</span>';
    },
    getPhieuCongTacDien: function (trangthai) {
        if (trangthai === 2)
            return '<span class="badge bg-orange">Đã cấp PCT</span>';
        else if (trangthai === 3)
            return '<span class="badge bg-orange">Xác nhận Đ.cấp PCT</span>';
        else if (trangthai === 4)
            return '<span class="badge bg-blue">Cho phép LV</span>';
        else if (trangthai === 6)
            return '<span class="badge bg-green">Kết thúc CT</span>';
        else if (trangthai === 8)
            return '<span class="badge bg-purple">Kiểm tra LV</span>';
        else if (trangthai === 10)
            return '<span class="badge bg-purple">Kiểm tra ATLĐ</span>';
        else if (trangthai === 20)
            return '<span class="badge bg-red">Hủy PCT</span>';     
        else
            return '<span class="badge bg-red">Không biết</span>';   
    },
    getPhieuCongTacDienDDCT: function (trangthai) {
        if (trangthai === 2)
            return '<span class="badge bg-orange">Đang làm</span>';
        else if (trangthai === 4)
            return '<span class="badge bg-blue">Hoàn thành</span>';
        else if (trangthai === 6)
            return '<span class="badge bg-purple">Chưa hoàn thành</span>';        
        else
            return '<span class="badge bg-red">Không biết</span>';
    },

    formatNumber: function (number, precision) {
        if (!isFinite(number)) {
            return number.toString();
        }
        var a = number.toFixed(precision).split('.');
        a[0] = a[0].replace(/\d(?=(\d{3})+$)/g, '$&,');
        return a.join('.');
    },
    formatNumberKhongLe: function (number2) {
        //var number = 330000.22;
        var number = parseInt(number2);
        if (!isFinite(number)) {
            return number.toString();
        }

        var a = number.toFixed(0).split('.');
        a[0] = a[0].replace(/\d(?=(\d{3})+$)/g, '$&,');
        return a.join('.');
    },
    
    unflattern: function (arr) {
        var map = {};
        var roots = [];
        for (var i = 0; i < arr.length; i += 1) {
            var node = arr[i];
            node.children = [];
            map[node.id] = i; // use map to look-up the parents
            if (node.parentId !== null) {
                arr[map[node.parentId]].children.push(node);
            } else {
                roots.push(node);
            }
        }
        return roots;
    },

    isVanBanDen: function(isvanbanden) {
        return $.ajax({
            type: 'GET',
            url: '/admin/homevanban/IsVanBanDen',
            data: {
                isVanBanDen: isvanbanden
            },
            dataType: 'json',
            success: function (response) {
                var ketqua = response.Success;
                if (ketqua === false) {
                    window.location.href = "/homevanban/index";
                    tedu.notify("Không đủ quyền. Kiểm tra lại!", "error");
                }
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Phân quyền có vấn đề?', 'error');
            }
        });
    },    

    isVanBanDi: function (isvanbandi) {
        return $.ajax({
            type: 'GET',
            url: '/admin/homevanban/IsVanBanDi',
            data: {
                isVanBanDi: isvanbandi
            },
            dataType: 'json',
            success: function (response) {
                var ketqua = response.Success;
                if (ketqua === false) {
                    window.location.href = "/homevanban/index";
                    tedu.notify("Không đủ quyền. Kiểm tra lại!", "error");
                }
            },
            error: function (status) {
                console.log(status);
                tedu.notify('Phân quyền có vấn đề?', 'error');
            }
        });
    },

    getNewGuid: function generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if (d > 0) {//Use timestamp until depleted
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }


}

$(document).ajaxSend(function(e, xhr, options) {
    if (options.type.toUpperCase() === "POST" || options.type.toUpperCase() === "PUT") {
        var token = $('form').find("input[name='__RequestVerificationToken']").val();
        xhr.setRequestHeader("RequestVerificationToken", token);
    }
});

//$('body').on('click', '.btnfunctionId', function (e) {
//    e.preventDefault();

//    tedu.notify("sider bar", "success");

//});
