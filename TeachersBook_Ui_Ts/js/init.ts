import { SectionLoader } from "./sectionLoader";
import { Section } from "./sections";

class Application {
    init() {
        let sectionLoader = new SectionLoader();
        let allSections = new Array<Section>();
        let timeTableSection = new Section();

        timeTableSection.id = "timetable";
        timeTableSection.menu = "Stundenplan";
        timeTableSection.name = "Timetable";
        timeTableSection.path = "sections/timetable/";
        timeTableSection.fontAwsome = null;

        allSections.push(timeTableSection);

        sectionLoader.init(allSections);
    }
}

$(() => {
    console.debug("initial application");
    var application = new Application();
    application.init();
    console.debug("initialized application");
})