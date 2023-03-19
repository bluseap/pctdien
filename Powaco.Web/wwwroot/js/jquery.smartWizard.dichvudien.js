/*
 * SmartWizard 3.3.1 plugin
 * jQuery Wizard control Plugin
 * by Dipu
 *
 * Refactored and extended:
 * https://github.com/mstratman/jQuery-Smart-Wizard
 *
 * Original URLs:
 * http://www.techlaboratory.net
 * http://tech-laboratory.blogspot.com
 */

function isFormMainValidate() {    
    if ($('#frmDangKyDien').valid()) {
        return true;
    }
    else {
        return false;
    }
}
function formMainValidate() {
    jQuery.validator.addMethod("isDanhMuc", function (value, element) {
        if (value === "0")
            return false;
        else
            return true;
    },
        "Xin chọn danh mục.."
    );

    jQuery.validator.addMethod("isDateVietNam", function (value, element) {
        return this.optional(element) || moment(value, "DD/MM/YYYY").isValid();
    },
        "Nhập theo định dạng ngày, tháng, năm."
    );

    //Init validation
    $('#frmDangKyDien').validate({
        errorClass: 'red',
        ignore: [],
        language: 'vi',
        rules: {            
            txtHoTenNguoiYeuCau: {
                required: true
            },
            txtDienThoaiDiDong: {
                required: true,
                number: true,
            },
            txtSoChungMinhThu: {
                required: true,
                number: true,
            },
            txtNgayCap: {
                required: true,
                isDateVietNam: true
            },
            txtNoiCap: {
                required: true
            },
            ddlTinh: {
                required: true,
                isDanhMuc: true
            }, 
            ddlThanhPhoHuyen: {
                required: true,
                isDanhMuc: true
            },
            ddlPhuongXa: {
                required: true,
                isDanhMuc: true
            },
            txtDuongPhoApTo: {
                required: true
            },
            ddlDichVuKhachHangCanCungCap: {
                required: true,
                isDanhMuc: true
            },            
        },
        //messages: {
        //    txtTrichYeu: { required: "Nhập nội dung trích yếu của văn bản.." }
        //}
    });
    
}

function isfrmDangKyDienHinhThayDoiThietBiDem() {
    if ($('#frmDangKyDienHinhThayDoiThietBiDem').valid()) {
        return true;
    }
    else {
        return false;
    }
}
function frmDangKyDienHinhThayDoiThietBiDem() {
    jQuery.validator.addMethod("isDanhMuc", function (value, element) {
        if (value === "0")
            return false;
        else
            return true;
    },
        "Xin chọn danh mục.."
    );   

    //Init validation
    $('#frmDangKyDienHinhThayDoiThietBiDem').validate({
        errorClass: 'red',
        ignore: [],
        language: 'vi',
        rules: {
            ddlHoSoKemTheoThayDoiThietBiDem: {
                required: true,
                isDanhMuc: true
            }
        },        
    });
}

function isfrmDangKyDienHinhThayDoiMDSD() {
    if ($('#frmDangKyDienHinhThayDoiMDSD').valid()) {
        return true;
    }
    else {
        return false;
    }
}
function frmDangKyDienHinhThayDoiMDSD() {
    jQuery.validator.addMethod("isDanhMuc", function (value, element) {
        if (value === "0")
            return false;
        else
            return true;
    },
        "Xin chọn danh mục.."
    );

    //Init validation
    $('#frmDangKyDienHinhThayDoiMDSD').validate({
        errorClass: 'red',
        ignore: [],
        language: 'vi',
        rules: {            
            ddlHoSoKemTheoThayDoiMDSD: {
                required: true,
                isDanhMuc: true
            },
        },
    });
}

function isfrmDangKyDienHinhThayDoiDMSD() {
    if ($('#frmDangKyDienHinhThayDoiDMSD').valid()) {
        return true;
    }
    else {
        return false;
    }
}
function frmDangKyDienHinhThayDoiDMSD() {
    jQuery.validator.addMethod("isDanhMuc", function (value, element) {
        if (value === "0")
            return false;
        else
            return true;
    },
        "Xin chọn danh mục.."
    );

    //Init validation
    $('#frmDangKyDienHinhThayDoiDMSD').validate({
        errorClass: 'red',
        ignore: [],
        language: 'vi',
        rules: {
            ddlHoSoKemTheoThayDoiDMSD: {
                required: true,
                isDanhMuc: true
            },
        },
    });
}

function isfrmDangKyDienHinhThayDoiHopDong() {
    if ($('#frmDangKyDienHinhThayDoiHopDong').valid()) {
        return true;
    }
    else {
        return false;
    }
}
function frmDangKyDienHinhThayDoiHopDong() {
    jQuery.validator.addMethod("isDanhMuc", function (value, element) {
        if (value === "0")
            return false;
        else
            return true;
    },
        "Xin chọn danh mục.."
    );

    //Init validation
    $('#frmDangKyDienHinhThayDoiHopDong').validate({
        errorClass: 'red',
        ignore: [],
        language: 'vi',
        rules: {
            ddlHoSoKemTheoThayDoiHopDongGiayToTuyThan: {
                required: true,
                isDanhMuc: true
            },
            ddlHoSoKemTheoThayDoiHopDongMoi: {
                required: true,
                isDanhMuc: true
            },
        },
    });
}

function clearData() {
    var datenow = new Date();
    
    $('#txtHoTenNguoiYeuCau').val('');
    $('#txtDienThoaiDiDong').val('');
    //$('#txtEmail').val('');
    $('#txtSoChungMinhThu').val('');
    $('#txtNgayCap').val(powa.getFormattedDate(datenow));
    $('#txtNoiCap').val('');
    $('#ddlTinh')[0].selectedIndex = 0;
    $('#ddlThanhPhoHuyen')[0].selectedIndex = 0;
    $('#ddlPhuongXa')[0].selectedIndex = 0;
    $('#txtSoNha').val('');
    $('#txtDuongPhoApTo').val('');

    $('#ddlDichVuKhachHangCanCungCap')[0].selectedIndex = 0;
    $('#ddlHoSoKemTheoThayDoiThietBiDem')[0].selectedIndex = 0;
    $('#ddlHoSoKemTheoThayDoiMDSD')[0].selectedIndex = 0;
    $('#ddlHoSoKemTheoThayDoiDMSD')[0].selectedIndex = 0;
    $('#ddlHoSoKemTheoThayDoiHopDongGiayToTuyThan')[0].selectedIndex = 0;
    $('#ddlHoSoKemTheoThayDoiHopDongMoi')[0].selectedIndex = 0;
}

function SmartWizard(target, options) {
    this.target       = target;
    this.options      = options;
    this.curStepIdx   = options.selected;
    this.steps        = $(target).children("ul").children("li").children("a"); // Get all anchors
    this.contentWidth = 0;
    this.msgBox = $('<div class="msgBox"><div class="content"></div><a href="#" class="close">X</a></div>');
    this.elmStepContainer = $('<div></div>').addClass("stepContainer");
    this.loader = $('<div>Loading</div>').addClass("loader");
    this.buttons = {
        next : $('<a id="btnTiepTuc">'+options.labelNext+'</a>').attr("href","#").addClass("buttonNext"),
        previous : $('<a id="btnTroVe">'+options.labelPrevious+'</a>').attr("href","#").addClass("buttonPrevious"),
        finish: $('<a id="btnHoanThanh">' + options.labelFinish + '</a>').attr("href", "#").addClass("buttonFinish")
            .addClass("btn-warning")
    };

    var bienStep = 0;
    /*
     * Private functions
     */

    var _init = function($this) {
        var elmActionBar = $('<div></div>').addClass("actionBar");
        elmActionBar.append($this.msgBox);
        $('.close',$this.msgBox).click(function() {
            $this.msgBox.fadeOut("normal");
            return false;
        });

        var allDivs = $this.target.children('div');
        $this.target.children('ul').addClass("anchor");
        allDivs.addClass("content");

        // highlight steps with errors
        if($this.options.errorSteps && $this.options.errorSteps.length>0){
            $.each($this.options.errorSteps, function(i, n){
                $this.setError({ stepnum: n, iserror:true });
            });
        }

        $this.elmStepContainer.append(allDivs);
        elmActionBar.append($this.loader);
        $this.target.append($this.elmStepContainer);
        elmActionBar.append($this.buttons.finish)                    
                    .append($this.buttons.previous)
                    .append($this.buttons.next);
        $this.target.append(elmActionBar);
        this.contentWidth = $this.elmStepContainer.width();

        $($this.buttons.next).click(function () {
            let isMainValidate = isFormMainValidate();
            let isThayDoiThietBiDem = isfrmDangKyDienHinhThayDoiThietBiDem();
            let isThayDoiMDSD = isfrmDangKyDienHinhThayDoiMDSD();
            let isThayDoiDMSD = isfrmDangKyDienHinhThayDoiDMSD();
            let isThayDoiHopDong = isfrmDangKyDienHinhThayDoiHopDong();

            let dichvu = $('#ddlDichVuKhachHangCanCungCap').val();           

            //Kiem tra bang TTDMDangKy theo Muc dich su dung
            if (dichvu === '32') {
                if (bienStep == 0) {
                    if ((isMainValidate === true && isThayDoiThietBiDem === false)
                        || (isMainValidate === true && isThayDoiThietBiDem === true)) {
                        bienStep = bienStep + 1;
                        $this.goForward();
                    }
                }
                else if (bienStep == 1) {
                    if (isMainValidate === true && isThayDoiThietBiDem === true) {
                        bienStep = bienStep + 1;
                        $this.goForward();
                    }
                }                
            }
            //Kiem tra bang TTDMDangKy theo Muc dich su dung
            else if (dichvu === '33') {
                if (bienStep == 0) {
                    if ((isMainValidate === true && isThayDoiMDSD === false)
                        || (isMainValidate === true && isThayDoiMDSD === true) ) {
                        bienStep = bienStep + 1;
                        $this.goForward();
                    }
                }
                else if (bienStep == 1) {
                    if (isMainValidate === true && isThayDoiMDSD === true) {
                        bienStep = bienStep + 1;
                        $this.goForward();
                    }
                }                 
            }     
            //Kiem tra bang TTDMDangKy theo Muc dich su dung
            else if (dichvu === '34') {
                if (bienStep == 0) {
                    if ((isMainValidate === true && isThayDoiDMSD === false)
                        || (isMainValidate === true && isThayDoiDMSD === true) ) {
                        bienStep = bienStep + 1;
                        $this.goForward();
                    }
                }
                else if (bienStep == 1) {
                    if (isMainValidate === true && isThayDoiDMSD === true) {
                        bienStep = bienStep + 1;
                        $this.goForward();
                    }
                }               
            } 
            //Kiem tra bang TTDMDangKy theo Muc dich su dung
            else if (dichvu === '35') {
                if (bienStep == 0) {
                    if ((isMainValidate === true && isThayDoiHopDong === false)
                        || (isMainValidate === true && isThayDoiHopDong === true)) {
                        bienStep = bienStep + 1;
                        $this.goForward();
                    }
                }
                else if (bienStep == 1) {
                    if (isMainValidate === true && isThayDoiHopDong === true) {
                        bienStep = bienStep + 1;
                        $this.goForward();
                    }
                }               
            }  
            //Kiem tra bang TTDMDangKy theo Muc dich su dung
            else if (dichvu === '36') {
                bienStep = bienStep + 1;                
                $this.goForward();
            }  
            return false;
        });
        $($this.buttons.previous).click(function () {            
            bienStep = bienStep - 1;
            $this.goBackward();
            return false;
        });
        $($this.buttons.finish).click(function() {
            if(!$(this).hasClass('buttonDisabled')){
                if($.isFunction($this.options.onFinish)) {
                    var context = { fromStep: $this.curStepIdx + 1 };
                    if(!$this.options.onFinish.call(this,$($this.steps), context)){
                        return false;
                    }
                }else{
                    var frm = $this.target.parents('form');
                    if(frm && frm.length){
                        frm.submit();
                    }
                }
            }
            return false;
        });

        $($this.steps).bind("click", function(e){
            if($this.steps.index(this) == $this.curStepIdx){
                return false;
            }
            var nextStepIdx = $this.steps.index(this);
            var isDone = $this.steps.eq(nextStepIdx).attr("isDone") - 0;
            if(isDone == 1){
                _loadContent($this, nextStepIdx);
            }
            return false;
        });

        // Enable keyboard navigation
        if($this.options.keyNavigation){
            $(document).keyup(function(e){
                if(e.which==39){ // Right Arrow
                    $this.goForward();
                }else if(e.which==37){ // Left Arrow
                    $this.goBackward();
                }
            });
        }
        //  Prepare the steps
        _prepareSteps($this);
        // Show the first slected step
        _loadContent($this, $this.curStepIdx);
    };

    var _prepareSteps = function($this) {
        if(! $this.options.enableAllSteps){
            $($this.steps, $this.target).removeClass("selected").removeClass("done").addClass("disabled");
            $($this.steps, $this.target).attr("isDone",0);
        }else{
            $($this.steps, $this.target).removeClass("selected").removeClass("disabled").addClass("done");
            $($this.steps, $this.target).attr("isDone",1);
        }     

        $($this.steps, $this.target).each(function(i){
            $($(this).attr("href").replace(/^.+#/, '#'), $this.target).hide();
            $(this).attr("rel",i+1);
        });
    };

    var _step = function ($this, selStep) {
        return $(
            $(selStep, $this.target).attr("href").replace(/^.+#/, '#'),
            $this.target
        );
    };

    var _loadContent = function($this, stepIdx) {
        var selStep = $this.steps.eq(stepIdx);
        var ajaxurl = $this.options.contentURL;
        var ajaxurl_data = $this.options.contentURLData;
        var hasContent = selStep.data('hasContent');
        var stepNum = stepIdx+1;
        if (ajaxurl && ajaxurl.length>0) {
            if ($this.options.contentCache && hasContent) {
                _showStep($this, stepIdx);
            } else {
                var ajax_args = {
                    url: ajaxurl,
                    type: "POST",
                    data: ({step_number : stepNum}),
                    dataType: "text",
                    beforeSend: function(){
                        $this.loader.show();
                    },
                    error: function(){
                        $this.loader.hide();
                    },
                    success: function(res){
                        $this.loader.hide();
                        if(res && res.length>0){
                            selStep.data('hasContent',true);
                            _step($this, selStep).html(res);
                            _showStep($this, stepIdx);
                        }
                    }
                };
                if (ajaxurl_data) {
                    ajax_args = $.extend(ajax_args, ajaxurl_data(stepNum));
                }
                $.ajax(ajax_args);
            }
        }else{
            _showStep($this,stepIdx);
        }
    };

    var _showStep = function($this, stepIdx) {
        var selStep = $this.steps.eq(stepIdx);
        var curStep = $this.steps.eq($this.curStepIdx);
        if(stepIdx != $this.curStepIdx){
            if($.isFunction($this.options.onLeaveStep)) {
                var context = { fromStep: $this.curStepIdx+1, toStep: stepIdx+1 };
                if (! $this.options.onLeaveStep.call($this,$(curStep), context)){
                    return false;
                }
            }
        }
        $this.elmStepContainer.height(_step($this, selStep).outerHeight());
        var prevCurStepIdx = $this.curStepIdx;
        $this.curStepIdx =  stepIdx;
        if ($this.options.transitionEffect == 'slide'){
            _step($this, curStep).slideUp("fast",function(e){
                _step($this, selStep).slideDown("fast");
                _setupStep($this,curStep,selStep);
            });
        } else if ($this.options.transitionEffect == 'fade'){
            _step($this, curStep).fadeOut("fast",function(e){
                _step($this, selStep).fadeIn("fast");
                _setupStep($this,curStep,selStep);
            });
        } else if ($this.options.transitionEffect == 'slideleft'){
            var nextElmLeft = 0;
            var nextElmLeft1 = null;
            var nextElmLeft = null;
            var curElementLeft = 0;
            if(stepIdx > prevCurStepIdx){
                nextElmLeft1 = $this.contentWidth + 10;
                nextElmLeft2 = 0;
                curElementLeft = 0 - _step($this, curStep).outerWidth();
            } else {
                nextElmLeft1 = 0 - _step($this, selStep).outerWidth() + 20;
                nextElmLeft2 = 0;
                curElementLeft = 10 + _step($this, curStep).outerWidth();
            }
            if (stepIdx == prevCurStepIdx) {
                nextElmLeft1 = $($(selStep, $this.target).attr("href"), $this.target).outerWidth() + 20;
                nextElmLeft2 = 0;
                curElementLeft = 0 - $($(curStep, $this.target).attr("href"), $this.target).outerWidth();
            } else {
                $($(curStep, $this.target).attr("href"), $this.target).animate({left:curElementLeft},"fast",function(e){
                    $($(curStep, $this.target).attr("href"), $this.target).hide();
                });
            }

            _step($this, selStep).css("left",nextElmLeft1).show().animate({left:nextElmLeft2},"fast",function(e){
                _setupStep($this,curStep,selStep);
            });
        } else {
            _step($this, curStep).hide();
            _step($this, selStep).show();
            _setupStep($this,curStep,selStep);
        }
        return true;
    };

    var _setupStep = function($this, curStep, selStep) {
        $(curStep, $this.target).removeClass("selected");
        $(curStep, $this.target).addClass("done");

        $(selStep, $this.target).removeClass("disabled");
        $(selStep, $this.target).removeClass("done");
        $(selStep, $this.target).addClass("selected");

        $(selStep, $this.target).attr("isDone",1);

        _adjustButton($this);

        if($.isFunction($this.options.onShowStep)) {
            var context = { fromStep: parseInt($(curStep).attr('rel')), toStep: parseInt($(selStep).attr('rel')) };
            if(! $this.options.onShowStep.call(this,$(selStep),context)){
                return false;
            }
        }
        if ($this.options.noForwardJumping) {
            // +2 == +1 (for index to step num) +1 (for next step)
            for (var i = $this.curStepIdx + 2; i <= $this.steps.length; i++) {
                $this.disableStep(i);
            }
        }
    };

    var _adjustButton = function($this) {
        if (! $this.options.cycleSteps){
            if (0 >= $this.curStepIdx) {
                $($this.buttons.previous).addClass("buttonDisabled");
				if ($this.options.hideButtonsOnDisabled) {
                    $($this.buttons.previous).hide();
                }
            }else{
                $($this.buttons.previous).removeClass("buttonDisabled");
                if ($this.options.hideButtonsOnDisabled) {
                    $($this.buttons.previous).show();
                }
            }
            if (($this.steps.length-1) <= $this.curStepIdx){
                $($this.buttons.next).addClass("buttonDisabled");
                if ($this.options.hideButtonsOnDisabled) {
                    $($this.buttons.next).hide();
                }
            }else{
                $($this.buttons.next).removeClass("buttonDisabled");
                if ($this.options.hideButtonsOnDisabled) {
                    $($this.buttons.next).show();
                }
            }
        }
        // Finish Button
        if (! $this.steps.hasClass('disabled') || $this.options.enableFinishButton){
            $($this.buttons.finish).removeClass("buttonDisabled");
            if ($this.options.hideButtonsOnDisabled) {
                $($this.buttons.finish).show();
            }
        }else{
            $($this.buttons.finish).addClass("buttonDisabled");
            if ($this.options.hideButtonsOnDisabled) {
                $($this.buttons.finish).hide();
            }
        }
    };

    /*
     * Public methods
     */

    SmartWizard.prototype.goForward = function(){
        var nextStepIdx = this.curStepIdx + 1;
        if (this.steps.length <= nextStepIdx){
            if (! this.options.cycleSteps){
                return false;
            }
            nextStepIdx = 0;
        }
        _loadContent(this, nextStepIdx);
    };

    SmartWizard.prototype.goBackward = function(){
        var nextStepIdx = this.curStepIdx-1;
        if (0 > nextStepIdx){
            if (! this.options.cycleSteps){
                return false;
            }
            nextStepIdx = this.steps.length - 1;
        }
        _loadContent(this, nextStepIdx);
    };

    SmartWizard.prototype.goToStep = function(stepNum){
        var stepIdx = stepNum - 1;
        if (stepIdx >= 0 && stepIdx < this.steps.length) {
            _loadContent(this, stepIdx);
        }
    };
    SmartWizard.prototype.enableStep = function(stepNum) {
        var stepIdx = stepNum - 1;
        if (stepIdx == this.curStepIdx || stepIdx < 0 || stepIdx >= this.steps.length) {
            return false;
        }
        var step = this.steps.eq(stepIdx);
        $(step, this.target).attr("isDone",1);
        $(step, this.target).removeClass("disabled").removeClass("selected").addClass("done");
    }
    SmartWizard.prototype.disableStep = function(stepNum) {
        var stepIdx = stepNum - 1;
        if (stepIdx == this.curStepIdx || stepIdx < 0 || stepIdx >= this.steps.length) {
            return false;
        }
        var step = this.steps.eq(stepIdx);
        $(step, this.target).attr("isDone",0);
        $(step, this.target).removeClass("done").removeClass("selected").addClass("disabled");
    }
    SmartWizard.prototype.currentStep = function() {
        return this.curStepIdx + 1;
    }

    SmartWizard.prototype.showMessage = function (msg) {
        $('.content', this.msgBox).html(msg);
        this.msgBox.show();
    }
    SmartWizard.prototype.hideMessage = function () {
        this.msgBox.fadeOut("normal");
    }
    SmartWizard.prototype.showError = function(stepnum) {
        this.setError(stepnum, true);
    }
    SmartWizard.prototype.hideError = function(stepnum) {
        this.setError(stepnum, false);
    }
    SmartWizard.prototype.setError = function(stepnum,iserror) {
        if (typeof stepnum == "object") {
            iserror = stepnum.iserror;
            stepnum = stepnum.stepnum;
        }

        if (iserror){
            $(this.steps.eq(stepnum-1), this.target).addClass('error')
        }else{
            $(this.steps.eq(stepnum-1), this.target).removeClass("error");
        }
    }

    SmartWizard.prototype.fixHeight = function(){
        var height = 0;

        var selStep = this.steps.eq(this.curStepIdx);
        var stepContainer = _step(this, selStep);
        stepContainer.children().each(function() {
            height += $(this).outerHeight();
        });

        // These values (5 and 20) are experimentally chosen.
        stepContainer.height(height + 5);
        this.elmStepContainer.height(height + 20);
    }

    _init(this);
};


(function ($) {
    $('#txtNgayCap').datepicker({
        autoclose: true,
        format: 'dd/mm/yyyy',
        language: 'vi'
    });
    formMainValidate();
    frmDangKyDienHinhThayDoiThietBiDem();
    frmDangKyDienHinhThayDoiMDSD();
    frmDangKyDienHinhThayDoiDMSD();
    frmDangKyDienHinhThayDoiHopDong();

    $("#img-captcha").click(function () {
        resetCaptchaImage('img-captcha');
    });   

    $('body').on('click', '.btnChonCaptchaKhac', function (e) {
        e.preventDefault();
        resetCaptchaImage('img-captcha');
    });

    var hinhcaptchdangky = document.getElementById("hinhCaptchaDangKy");
    hinhcaptchdangky.style.display = "block";

    var chuCaptchaDangKy = document.getElementById("chuCaptchaDangKy");
    chuCaptchaDangKy.style.display = "block";

    var divThongBaoDangKy = document.getElementById("thongbaoDangKy");
    divThongBaoDangKy.style.display = "none";


$.fn.smartWizard = function(method) {
    var args = arguments;
    var rv = undefined;
    var allObjs = this.each(function() {
        var wiz = $(this).data('smartWizard');
        if (typeof method == 'object' || ! method || ! wiz) {
            var options = $.extend({}, $.fn.smartWizard.defaults, method || {});
            if (! wiz) {
                wiz = new SmartWizard($(this), options);
                $(this).data('smartWizard', wiz);
            }
        } else {
            if (typeof SmartWizard.prototype[method] == "function") {
                rv = SmartWizard.prototype[method].apply(wiz, Array.prototype.slice.call(args, 1));
                return rv;
            } else {
                $.error('Method ' + method + ' does not exist on jQuery.smartWizard');
            }
        }
    });
    if (rv === undefined) {
        return allObjs;
    } else {
        return rv;
    }
};

// Default Properties and Events
$.fn.smartWizard.defaults = {
    selected: 0,  // Selected Step, 0 = first step
    keyNavigation: true, // Enable/Disable key navigation(left and right keys are used if enabled)
    enableAllSteps: false,
    transitionEffect: 'fade', // Effect on navigation, none/fade/slide/slideleft
    contentURL:null, // content url, Enables Ajax content loading
    contentCache: true, // cache step contents, if false content is fetched always from ajax url
    cycleSteps: false, // cycle step navigation
    enableFinishButton: false, // make finish button enabled always
	hideButtonsOnDisabled: true, // when the previous/next/finish buttons are disabled, hide them instead?
    errorSteps:[],    // Array Steps with errors
    labelNext:'Tiếp tục',
    labelPrevious:'Trở về',
    labelFinish:'Đăng ký',
    noForwardJumping: false,
    onLeaveStep: null , // triggers when leaving a step
    onShowStep: null,  // triggers when showing a step
    onFinish: () => {  // triggers when Finish button is clicked

        var hotennguoiyeucau = $('#txtHoTenNguoiYeuCau').val();
        var dienthoai = $('#txtDienThoaiDiDong').val();
        var sochungminhthu = $('#txtSoChungMinhThu').val();
        var ngaycap = powa.getFormatDateYYMMDD($('#txtNgayCap').val());
        var noicap = $('#txtNoiCap').val();
        var ddltinh = $('#ddlTinh').val();
        var ddlhuyen = $('#ddlThanhPhoHuyen').val();
        var ddlxa = $('#ddlPhuongXa').val();
        var sonha = $('#txtSoNha').val();
        var tenduong = $('#txtDuongPhoApTo').val();

        var dichvukhachhangcancungcap = $('#ddlDichVuKhachHangCanCungCap').val();

        var thaydoithietbidodem = $('#ddlHoSoKemTheoThayDoiThietBiDem').val();
        var thaydoimucdichsudung = $('#ddlHoSoKemTheoThayDoiMDSD').val();
        var thaydoidinhmucsudung = $('#ddlHoSoKemTheoThayDoiDMSD').val();
        var thaydoihopdonggiaytotuythan = $('#ddlHoSoKemTheoThayDoiHopDongGiayToTuyThan').val();
        var hopdongmoi = $('#ddlHoSoKemTheoThayDoiHopDongMoi').val();

        var captchaCode = $('#txt_captcha').val();
        var newGuid = $('#hidNewGuidTTDangKyFile').val();

        $.ajax({
            type: 'POST',
            url: '/dichvudien/DangKy',
            data: {
                codeid: newGuid,

                CaptchaCode: captchaCode,

                HoTenNguoiYeuCau: hotennguoiyeucau,
                DienThoai: dienthoai,
                SoTheCCCD: sochungminhthu,
                NgayCap: ngaycap,
                NoiCap: noicap,
                ThanhPhoTinhId: ddltinh,
                QuanHuyenId: ddlhuyen,
                PhuongXaId: ddlxa,
                SoNha: sonha,
                TenDuongApTo: tenduong,

                TTDMDangKyDichVu : dichvukhachhangcancungcap,
                TTDMDangKyThayDoiViTri : thaydoithietbidodem,
                TTDMDangKyThayDoiMDSD : thaydoimucdichsudung,
                TTDMDangKyThayDoiDMSD : thaydoidinhmucsudung,
                TTDMDangKyHopDongGiayToTuyThan : thaydoihopdonggiaytotuythan,
                TTDMDangKyHopDongChuThe : hopdongmoi
            },
            dataType: 'json',
            //beforeSend: function () {
            //    tedu.startLoading();
            //},
            success: function (response) {
                if (response.Results.length === 0) {
                    powa.notify('Đăng ký lắp mới.', 'error');
                }
                else {
                    powa.notify('Đăng ký dịch vụ.', 'success');

                    var hinhcaptchdangky = document.getElementById("hinhCaptchaDangKy");
                    hinhcaptchdangky.style.display = "none";

                    var chuCaptchaDangKy = document.getElementById("chuCaptchaDangKy");
                    chuCaptchaDangKy.style.display = "none";

                    var divThongBaoDangKy = document.getElementById("thongbaoDangKy");
                    divThongBaoDangKy.style.display = "block";

                    var btnTroVe = document.getElementById("btnTroVe");
                    btnTroVe.style.display = "none";

                    var btnHoanThanh = document.getElementById("btnHoanThanh");
                    btnHoanThanh.style.display = "none";

                    var stepul = document.getElementById("step-ul");
                    stepul.style.display = "none";

                    $('#hidTTCacDichVuDienId').val(response.RowCount);

                    loadDataDichVuDienId();
                }
            },
            //cache: false,
            error: function (err) {
                //$('#contact-loader').hide();
                $('#message-result').html('');
                if (err.status === 400 && err.responseText) {
                    var errMsgs = JSON.parse(err.responseText);
                    for (field in errMsgs) {
                        $('#message-result').append(errMsgs[field] + '<br>');
                    }
                    resetCaptchaImage('img-captcha');
                }
            }
        });

    }
};

})(jQuery);

function resetCaptchaImage(id) {
    d = new Date();
    $("#" + id).attr("src", "/get-captcha-image?" + d.getTime());
}

function loadDataDichVuDienId() {
    var dichvudienid = $('#hidTTCacDichVuDienId').val();

    $.ajax({
        type: 'GET',
        url: '/DichVuDien/GetId',
        data: {
            dichvudienId: dichvudienid
        },
        dataType: "json",
        success: function (response) {
            var dangkydien = response;

            $('#txtTenKhacHangDangKy').val("Tên khách hàng: " + dangkydien.HoTenNguoiYeuCau);
            $('#txtMaHoSoDangKy').val("Mã số hồ sơ: " + dangkydien.MaSoHoSo);
            var diachi = dangkydien.SoNha + ' ' + dangkydien.TenDuongApTo + ',' + dangkydien.Tenphuong +
                ',' + dangkydien.TenQuan + ',' + dangkydien.TenTinh
            $('#txtDiaChiKhachHangDangKy').val("Địa chỉ: " + diachi);
        }
    });
}


