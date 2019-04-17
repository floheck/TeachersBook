var TeachersBookApplication = (function () {
    function TeachersBookApplication() {
    }
    TeachersBookApplication.prototype.init = function () {
    };
    return TeachersBookApplication;
}());
jQuery(function () {
    console.debug("initial application");
    var application = new TeachersBookApplication();
    application.init();
    console.debug("initialized application");
});
//# sourceMappingURL=init.js.map