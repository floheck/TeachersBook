"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sectionLoader_1 = require("./sectionLoader");
var sections_1 = require("./sections");
var Application = (function () {
    function Application() {
    }
    Application.prototype.init = function () {
        var sectionLoader = new sectionLoader_1.SectionLoader();
        var allSections = new Array();
        var timeTableSection = new sections_1.Section();
        timeTableSection.id = "timetable";
        timeTableSection.menu = "Stundenplan";
        timeTableSection.name = "Timetable";
        timeTableSection.path = "sections/timetable/";
        timeTableSection.fontAwsome = null;
        allSections.push(timeTableSection);
        sectionLoader.init(allSections);
    };
    return Application;
}());
$(function () {
    console.debug("initial application");
    var application = new Application();
    application.init();
    console.debug("initialized application");
});
//# sourceMappingURL=init.js.map