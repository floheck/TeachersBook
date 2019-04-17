(function (TeachersBookWeb) {
    (function (Custom) {

        Custom.token = "";

        jQuery(document).ready(function () {
            jQuery("#openLogin").on("click", function () {
                jQuery("#username").val("");
                jQuery("#password").val("");
                jQuery("#modal-login").modal("show");
            });

            jQuery("#login").on("click", function () {
                TeachersBookWeb.Custom.Login(jQuery("#username"), jQuery("#password"));
            });
        });

        Custom.Login = function (username, password) {
            var loginUser = jQuery.ajax({
                url: "http://teachersbookwebapi.azurewebsites.net/token",
                data: {
                    "username": username.val(),
                    "password": password.val(),
                    "grant_type": "password"
                },
                type: "POST",
                cache: false
            });

            loginUser.done(function (data) {
                jQuery("#modal-login").modal("toggle");
                Custom.token = data.access_token;
                var win = window.open('http://teachersbookfrontend.azurewebsites.net?accesstoken=' + data.access_token, '_blank');
                if (win) {
                    //Browser has allowed it to be opened
                    win.focus();
                } else {
                    //Browser has blocked it
                    alert('Please allow popups for this website');
                }
            });

            loginUser.fail(function (error, e) {
                debugger;
            });
        }

    }(TeachersBookWeb.Custom = TeachersBookWeb.Custom || {}));
}(window.TeachersBookWeb = window.TeachersBookWeb || {}));