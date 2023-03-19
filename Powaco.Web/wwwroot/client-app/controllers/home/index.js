var homeController = function () {

    this.initialize = function () {
        registerEvents();
        //loadData();
    }

    function registerEvents() {  

        $('body').on('click', '.clickDkDien', function (e) {
            window.open('/dangkydien/Index', '_blank');
        });   

        $('body').on('click', '.clickDkNuoc', function (e) {
            window.open('/dangkynuoc/Index', '_blank');
        });

    }

    function queueComplete() {
        // This example uses jQuery so it creates the Dropzone, only when the DOM has
        // loaded.

        // Disabling autoDiscover, otherwise Dropzone will try to attach twice.
        Dropzone.autoDiscover = false;

        // or disable for specific dropzone:
        // Dropzone.options.myDropzone = false;

        var myDropzone = new Dropzone(".dropzone");

        myDropzone.on("queuecomplete", function (file, res) {
            if (myDropzone.files[0].status != Dropzone.SUCCESS) {
                alert('yea baby 1');
            } else {
                alert('cry baby 2 ');

            }
        });
    }

    function loadData() {
        var render = "<option value='0' >Chọn dịch vụ</option>";
        render += "<option value='2' >Nước</option>";
        render += "<option value='3' >Điện</option>";

        $('#ddlDienNuoc').html(render);
    }

    function clearData() {

    }

}