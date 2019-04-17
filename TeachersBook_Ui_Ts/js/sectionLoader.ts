import { Section } from "./sections";
import { SectionTimetableViewModel } from "./viewModels/sectionTimetableViewModel";
import { CultureSpecificTexts, Texts } from "./model/cultureSpecificTexts";

export class SectionLoader {

    public async init(sections: Section[]): Promise<void> {
        let configLink: string = "../content/data/TeachersBook.Configuration.js";
        let sectionIdPrefix: string = "sec-";
        let sectionTexts = new CultureSpecificTexts();

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

            var userLang = navigator.language;
            switch (userLang) {
                case "de":
                    for (let languageItem of sectionTranslation["de"]) {
                        let textItem = new Texts();
                        textItem.id = languageItem.id;
                        textItem.text = languageItem.text;
                        sectionTexts.texts.push(textItem);
                    }
                    break;

                default:
                    for (let languageItem of sectionTranslation["en"]) {
                        let textItem = new Texts();
                        textItem.id = languageItem.id;
                        textItem.text = languageItem.text;
                        sectionTexts.texts.push(textItem);
                    }
                    break;
            }
            console.log(sectionTexts)
            jQuery("#" + section.id).html(sectionContent);

            this.initSectionViewModel(section, sectionTexts);
        }
    }

    private async initSectionViewModel(section: Section, translations: CultureSpecificTexts): Promise<void> {
        switch (section.name) {
            case "Timetable":
                let viewModel = new SectionTimetableViewModel(translations);
                ko.applyBindings(viewModel, jQuery("#" + section.id)[0]);
                break;
        }
    }
}