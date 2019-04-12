import { Timetable, TtSubjectRow, TtSubjectRowItem } from "../model/timetable";
import { TtLesson } from "../model/lesson";
import { TtClass } from "../model/tbClass";
import { CultureSpecificTexts } from "../model/cultureSpecificTexts";
import { DataInterface } from "../dataInterface";
import { TimetableRowViewModel } from "./timetableRowViewModel";
import { TimetableSubjectViewModel } from "./timetableSubjectViewModel";
import { TimetableSubjectContentViewModel } from "./timetableSubjectContentViewModel";
import { TimetableClassViewModel } from "./timetableClassViewModel";
import { Helper } from "../helper";

export class SchoolClassViewModel {
    id = ko.observable<string>();
    name = ko.observable<string>();
}

export class SubjectAdministrationViewModel {
    constructor(texts: CultureSpecificTexts) {
        this.addNewSubjectDialogViewModel = new AddNewSubjectModalDialogViewModel(texts);
        this.fromModel();
    }

    private _texts = new CultureSpecificTexts();

    public addNewSubjectDialogViewModel: AddNewSubjectModalDialogViewModel = null;

    public subjects = ko.observableArray<TimetableSubjectContentViewModel>();
    
    public async fromModel(): Promise<void> {
        try {
            let subjectsModelArray = await DataInterface.getAllSubjects("2017/2018");
            for (let row of subjectsModelArray) {
                let subject = new TimetableSubjectContentViewModel();
                subject.id(row.id);
                subject.name(row.name);
                subject.color(row.color);
                subject.schoolGrade(row.TtClass.name);
                let newClassModel = new TimetableClassViewModel();
                newClassModel.id(row.TtClass.id);
                newClassModel.name(row.TtClass.name);
                subject.tTClass(newClassModel);
                this.subjects.push(subject);
            }
            console.log(this.subjects());
        }
        catch (Error) {
            console.log("Error while reading data from lesson model! Message: " + Error.message);
        }
    }

    public async addNewSubject(data: any, event: any) {
        let target = event.target || event.srcElement;
        let subjectAdminViewModel: SubjectAdministrationViewModel = ko.contextFor(target).$parent;
        let helper = new Helper();
        if (helper.validateMandatoryFormFields("addNewSubjectForm")) {
            let timestamp = Date.now().toString();
            let newSubject = new TimetableSubjectContentViewModel();
            let newLessonModel = new TtLesson();
            newSubject.name(data.newSubjectName().toString());
            newLessonModel.name = data.newSubjectName().toString()
            newSubject.schoolGrade(data.newSubjectSchoolClass().name().toString());
            let newClassModel = new TtClass();
            newClassModel.id = data.newSubjectSchoolClass().id().toString();
            newClassModel.name = data.newSubjectSchoolClass().name().toString();
            newLessonModel.TtClass = newClassModel;
            newSubject.color(data.newSubjectColor().toString());
            newLessonModel.color = data.newSubjectColor().toString();
            newSubject.id(timestamp);
            subjectAdminViewModel.subjects.push(newSubject);
            subjectAdminViewModel.subjects(subjectAdminViewModel.subjects().sort((a: any, b: any) => {
                return (a.name() > b.name()) ? 1 : ((b.name() > a.name()) ? -1 : 0);
            }));
            jQuery("#modal-AddSubject").modal("toggle");
            console.log(JSON.stringify(newLessonModel));
            let apiResponse = await DataInterface.addSubject("2017/2018", newLessonModel);
            subjectAdminViewModel.subjects().filter(item => item.id() == timestamp)[0].id(apiResponse.newId);
            console.log(subjectAdminViewModel.subjects());
        }
    }

    public deleteSubject(data: any, event: any) {
        let target = event.target || event.srcElement;
        let subjectAdminViewModel: SubjectAdministrationViewModel = ko.contextFor(target).$parent;
        subjectAdminViewModel.subjects(subjectAdminViewModel.subjects().filter(item => item.id() !== data.id()));
        DataInterface.deleteSubject("2017/2018", data.id());
    }

    public activateTooltips() {
        jQuery('[data-toggle="tooltip"]').tooltip();
    }
}

export class TimetableViewMode {

    public timetable = ko.observableArray<TimetableRowViewModel>();

    afterRenderCounter: number = 1;
    lastElementIdEdited: string = "-1";
    lastValueBeforeChanged: string = "";
    lastValueHasSaved: boolean = false;

    addNewSubjectRowButtonLabel = ko.observable<string>();
    addNewPauseRowButtonLabel = ko.observable<string>();

    public lastElementEdited = ko.observable<TimetableSubjectViewModel>();

    constructor(texts: CultureSpecificTexts) {
        this.addNewSubjectRowButtonLabel(texts.texts.filter(item => item.id == "AddNewSubjectRowButtonLabel")[0].text);
        this.addNewPauseRowButtonLabel(texts.texts.filter(item => item.id == "AddNewPauseRowButtonLabel")[0].text);
        this.fromModel();
    }

    public async fromModel(): Promise<void> {

        try {
            let timetableModel = await DataInterface.getCompleteTimetable("2017/2018");

            for (let row of timetableModel.rows) {
                let newRow = new TimetableRowViewModel();
                let subjects = new Array<TimetableSubjectViewModel>();
                newRow.id(row.id);
                newRow.rowType(row.rowType);

                for (let rowItem of row.subjects) {
                    let newRowItem = new TimetableSubjectViewModel();
                    newRowItem.id(rowItem.id);
                    newRowItem.day(rowItem.day);
                    newRowItem.hour(rowItem.hour);

                    let newItemContent = new TimetableSubjectContentViewModel();
                    if (rowItem.lesson != null) {
                        newItemContent.id(rowItem.lesson.id);
                        newItemContent.name(rowItem.lesson.name);
                        newItemContent.color(rowItem.lesson.color);
                        let newClassItem = new TimetableClassViewModel();
                        newClassItem.id(rowItem.lesson.TtClass.id);
                        newClassItem.name(rowItem.lesson.TtClass.name);
                        newItemContent.tTClass(newClassItem);
                        newItemContent.schoolGrade(rowItem.lesson.TtClass.name);
                        newRowItem.hasSubject(true);
                    }
                    else {
                        newItemContent.name(rowItem.description);
                        newRowItem.inlineEditingAllowed(true);
                        newRowItem.start(row.start);
                        newRowItem.end(row.end);
                    }
                    newRowItem.content(newItemContent);

                    newRow.subjects.push(newRowItem);
                }
                this.timetable.push(newRow);
            }
        }
        catch (Error) {
            console.log("Error while reading data from timetable model! Message: " + Error.message);
        }
    }

    public toModel(): Timetable {
        let newTimetableModel = new Timetable();

        try {
            for (let row of this.timetable()) {
                let newRow = new TtSubjectRow();

                newRow.id = row.id();
                newRow.rowType = row.rowType();
                newRow.isNew = row.isNew();
                for (let rowItem of row.subjects()) {
                    let newSubjectRowItem = new TtSubjectRowItem();
                    newSubjectRowItem.id = rowItem.id();
                    newSubjectRowItem.day = rowItem.day();
                    newSubjectRowItem.hour = rowItem.hour();

                    if (rowItem.hasSubject()) {
                        let newLesson = new TtLesson();
                        newLesson.id = rowItem.content().id();
                        newLesson.name = rowItem.content().name();
                        newLesson.color = rowItem.content().color();
                        newLesson.isNew = rowItem.content().isNew();

                        let newClass = new TtClass();
                        newClass.name = rowItem.content().tTClass().name();
                        newClass.id = rowItem.content().tTClass().id();

                        newLesson.TtClass = newClass;
                        newSubjectRowItem.lesson = newLesson;
                    }
                    else {
                        newSubjectRowItem.id = rowItem.content().id();
                        newSubjectRowItem.description = rowItem.content().name();
                    }

                    newRow.subjects.push(newSubjectRowItem);
                }
                newTimetableModel.rows.push(newRow);
            }
        }
        catch (Error) {
            console.log("Error while writing data from view model back to model! Message: " + Error.message);
        }

        return newTimetableModel;
    }

    addNewSubjectRow(data: any, event: any) {
        let target = event.target || event.srcElement;
        let timetableViewModel: TimetableViewMode = ko.contextFor(target).$parents[1];
        timetableViewModel.createNewRow(data, "subject", timetableViewModel);
    }

    addNewPauseRow(data: any, event: any) {
        let target = event.target || event.srcElement;
        let timetableViewModel: TimetableViewMode = ko.contextFor(target).$parents[1];
        timetableViewModel.createNewRow(data, "break", timetableViewModel);
    }

    createNewRow(data: any, rowType: string, timetableViewModel: TimetableViewMode): void {
        let newRow1 = new TimetableRowViewModel();
        newRow1.rowType(rowType);
        newRow1.isNew(true);
        for (let i = 0; i <= 5; i++) {
            let newRowItem = new TimetableSubjectViewModel();
            newRowItem.hour(data.hour() + 1);
            newRowItem.day(i);
            newRowItem.hasSubject(i == 0 ? false : true);
            newRowItem.labelVisible(true);
            newRowItem.inlineEditingVisible(false);
            if (rowType == "subject") {
                newRowItem.inlineEditingAllowed(i == 0 ? true : false);
            }
            else {
                newRowItem.inlineEditingAllowed(true);
            }
            newRowItem.isNew(true);
            let newSubjectItemContetn = new TimetableSubjectContentViewModel();
            newSubjectItemContetn.name("");
            newSubjectItemContetn.color("transparent");
            newSubjectItemContetn.tTClass(new TimetableClassViewModel());
            newSubjectItemContetn.schoolGrade("");
            newRowItem.content(newSubjectItemContetn);
            newRow1.subjects.push(newRowItem);

        }
        timetableViewModel.timetable.splice(data.hour() + 1, 0, newRow1);

        for (let i = data.hour() + 2; i < timetableViewModel.timetable().length; i++) {
            for (let j = 0; j < timetableViewModel.timetable()[i].subjects().length; j++) {
                timetableViewModel.timetable()[i].subjects()[j].hour(timetableViewModel.timetable()[i].subjects()[j].hour() + 1);
            }
        }
    }
}

export class AddNewSubjectModalDialogViewModel {

    constructor(texts: CultureSpecificTexts) {
        this.lblModalDialogTitle(texts.texts.filter(item => item.id == "AddSubjectModalDialogHeader")[0].text);
        this.lblAddSubjectNameLabel(texts.texts.filter(item => item.id == "AddSubjectNameLabel")[0].text);
        this.lblAddSubjectClassLabel(texts.texts.filter(item => item.id == "AddSubjectClassLabel")[0].text);
        this.lblAddSubjectColorLabel(texts.texts.filter(item => item.id == "AddSubjectColorLabel")[0].text);
        this.lblAddNewSubjectButtonLabel(texts.texts.filter(item => item.id == "AddNewSubjectButtonLabel")[0].text);

        this.fromModel();

        jQuery("#cp2").colorpicker("");

    }

    public async fromModel(): Promise<void> {
        try {
            let schoolClassesModelArray = await DataInterface.getAllClasses("2017/2018");

            for (let row of schoolClassesModelArray) {
                let schoolClass = new SchoolClassViewModel();
                schoolClass.id(row.id);
                schoolClass.name(row.name);
                this.schoolClassesSection.push(schoolClass);
            }

            console.log(this.schoolClassesSection())
        }
        catch (Error) {
            console.log("Error while reading data from lesson model! Message: " + Error.message);
        }
    }

    lblModalDialogTitle = ko.observable<string>();
    lblAddSubjectNameLabel = ko.observable<string>();
    lblAddSubjectClassLabel = ko.observable<string>();
    lblAddSubjectColorLabel = ko.observable<string>();
    lblAddNewSubjectButtonLabel = ko.observable<string>();

    schoolClassesSection = ko.observableArray<SchoolClassViewModel>();

    newSubjectName = ko.observable<string>();
    newSubjectSchoolClass = ko.observable<string>();
    newSubjectColor = ko.observable<string>("#00AABB");
}

export class SectionTimetableViewModel {

    constructor(texts: CultureSpecificTexts) {
        console.log(texts);
        this.timetableViewModel = new TimetableViewMode(texts);
        this.subjectAdministrationViewModel = new SubjectAdministrationViewModel(texts);
    }

    private _texts = new CultureSpecificTexts();

    public subjectAdministrationViewModel: SubjectAdministrationViewModel = null;
    public timetableViewModel: TimetableViewMode = null;
    
    public isInEditMode = ko.observable(false);
    public dragItem = ko.observable<TimetableSubjectContentViewModel>();

    public deleteSubject(data: any, event: any, parent: any) {
        let target = event.target || event.srcElement;
        let timetableViewModel: TimetableViewMode = ko.contextFor(target).$parents[1];
        timetableViewModel.timetable()[data.hour()].subjects()[data.day()].content().name("");
        timetableViewModel.timetable()[data.hour()].subjects()[data.day()].content().color("transparent");
        timetableViewModel.timetable()[data.hour()].subjects()[data.day()].content().schoolGrade("");
        timetableViewModel.timetable()[data.hour()].subjects()[data.day()].content().isNew(true);
        timetableViewModel.timetable()[data.hour()].subjects()[data.day()].labelVisible(true);
        timetableViewModel.timetable()[data.hour()].subjects()[data.day()].hasSubject(false);
        console.log(timetableViewModel.timetable()[data.hour()].subjects()[data.day()]);
    }

    public replaceSubjectInTimetable(data: any, event: any) {
        let target = event.target || event.srcElement;
        let timetableViewModel: TimetableViewMode = ko.contextFor(target).$parents[1];
        timetableViewModel.timetable()[data.hour()].subjects()[data.day()].content().name(this.dragItem().name().toString());
        timetableViewModel.timetable()[data.hour()].subjects()[data.day()].content().color(this.dragItem().color().toString());
        timetableViewModel.timetable()[data.hour()].subjects()[data.day()].content().tTClass(this.dragItem().tTClass());
        timetableViewModel.timetable()[data.hour()].subjects()[data.day()].content().isNew(true);
        timetableViewModel.timetable()[data.hour()].subjects()[data.day()].hasSubject(true);
        timetableViewModel.timetable()[data.hour()].subjects()[data.day()].content().id(this.dragItem().id().toString());
    }

    public clickSubjectLabel(value: any, event: any) {
        let target = event.target || event.srcElement;
        let timetableViewModel: TimetableViewMode = ko.contextFor(target).$parents[1];
        let rootViewModel: SectionTimetableViewModel = ko.contextFor(target).$root;
        if (value.inlineEditingAllowed() && rootViewModel.isInEditMode()) {
            if (!timetableViewModel.lastValueHasSaved) {
                if (timetableViewModel.lastElementEdited() != undefined) {
                    timetableViewModel.lastElementEdited().content().name(timetableViewModel.lastValueBeforeChanged);
                }
            }
            value.inlineEditingVisible(true);
            value.labelVisible(false);
            if (timetableViewModel.lastElementEdited() != undefined && timetableViewModel.lastElementEdited() !== value) {
                timetableViewModel.lastElementEdited().inlineEditingVisible(false);
                timetableViewModel.lastElementEdited().labelVisible(true);
            }

            timetableViewModel.lastValueBeforeChanged = value.content().name();
            timetableViewModel.lastElementEdited(value);
            timetableViewModel.lastValueHasSaved = false;
        }
    }

    public saveInlineEditingChanges(value: any, event: any) {
        let target = event.target || event.srcElement;
        let timetableViewModel: TimetableViewMode = ko.contextFor(target).$parents[1];
        if (event.type == "click" || (event.type == "keyup" && event.key == "Enter")) {
            timetableViewModel.lastElementEdited().isNew(true);
            timetableViewModel.lastValueHasSaved = true;
            value.inlineEditingVisible(false);
            value.labelVisible(true);
        }
    }

    public discardInlineEditingChanges(value: any, event: any) {
        let target = event.target || event.srcElement;
        let timetableViewModel: TimetableViewMode = ko.contextFor(target).$parents[1];
        timetableViewModel.lastValueHasSaved = false;
        timetableViewModel.lastElementEdited().content().name(timetableViewModel.lastValueBeforeChanged);
        value.inlineEditingVisible(false);
        value.labelVisible(true);
    }

    public openAddNewSubjectDialog(data: any, event: any) {
        jQuery("#modal-AddSubject").modal("show");
        data.addNewSubjectDialogViewModel.newSubjectName("");
        data.addNewSubjectDialogViewModel.newSubjectSchoolClass("");
        data.addNewSubjectDialogViewModel.newSubjectColor("#00AABB");
    }

    public toggleEditMode(data: any, event: any) {
        let target = event.target || event.srcElement;
        let rootViewModel: SectionTimetableViewModel = ko.contextFor(target).$root;

        if (rootViewModel.isInEditMode()) {
            console.log(JSON.stringify(rootViewModel.timetableViewModel.toModel()));
        }

        rootViewModel.isInEditMode(!rootViewModel.isInEditMode());
    }
}