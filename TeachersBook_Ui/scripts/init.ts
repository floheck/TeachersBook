class TeachersBookApplication {
    init() {

    }
}

jQuery(() => {
    console.debug("initial application");
    var application = new TeachersBookApplication();
    application.init();
    console.debug("initialized application");
})