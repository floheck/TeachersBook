import { Section } from "./sections";
import { SectionTimetableViewModel } from "./viewModels/sectionTimetableViewModel";

export class SectionLoader {

    public async init(sections: Section[]): Promise<void> {
        let configLink: string = "../content/data/TeachersBook.Configuration.js";
        let sectionIdPrefix:string = "sec-";

        let config = await jQuery.ajax({
            url: configLink,
            dataType: "json",
            cache: false,
            async: false
        });

        for (let section of sections) {
            let sectionHtmlPath = section.path + section.name + ".html";
            let sectionScriptPath = section.path + section.name + ".js";
            let sectionTranslationPath = section.path + section.name + ".json.js";
            
            let sectionContent = await jQuery.ajax({
                url: sectionHtmlPath,
                dataType: "html",
                cache: false
            });
            
            let sectionTranslation = await jQuery.ajax({
                url: sectionTranslationPath,
                dataType: "json",
                cache: false
            });
            
            jQuery("#" + section.id).html(sectionContent);

            this.initSectionViewModel(section);
        }
    }

    private async initSectionViewModel(section: Section): Promise<void> {
        switch (section.name) {
            case "Timetable":
                let viewModel = new SectionTimetableViewModel();
                ko.applyBindings(viewModel, jQuery("#" + section.id)[0]);
                break;
        }
    }
}