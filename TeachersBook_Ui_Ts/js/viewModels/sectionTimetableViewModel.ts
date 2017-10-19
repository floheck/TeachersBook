import { Timetable, SubjectRow, SubjectRowItem } from "../model/timetable";
import { Lesson } from "../model/lesson";
import { TbClass } from "../model/tbClass";
import { DataInterface } from "../dataInterface";
import { TimetableRowViewModel } from "./timetableRowViewModel";
import { TimetableSubjectViewModel } from "./timetableSubjectViewModel";
import { TimetableSubjectContentViewModel } from "./timetableSubjectContentViewModel";
import { Helper } from "../helper"

export class SubjectAdministrationViewModel {
    constructor() {
        this.fromModel();
    }

    public subjects = ko.observableArray<TimetableSubjectContentViewModel>();

    newSubjectName = ko.observable<string>();
    newSubjectSchoolGrade = ko.observable<string>();
    newSubjectColor = ko.observable<string>("#00AABB");

    public async fromModel(): Promise<void> {
        try {
            let subjectsModelArray = await DataInterface.getAllSubjects("2017/2018");

            for (let row of subjectsModelArray) {
                let subject = new TimetableSubjectContentViewModel();
                subject.id(row.id);
                subject.name(row.name);
                subject.color("#" + row.color);
                subject.schoolGrade(null);
                this.subjects.push(subject);
            }
        }
        catch (Error) {
            console.log("Error while reading data from lesson model! Message: " + Error.message);
        }
    }

    activateTooltips() {
        jQuery('[data-toggle="tooltip"]').tooltip();
    }

    openAddNewSubjectDialog() {
        jQuery("#modal-AddSubject").modal("show");
        this.newSubjectName("");
        this.newSubjectSchoolGrade("");
        this.newSubjectColor("#00AABB");
    }

    addNewSubject() {
        let helper = new Helper();
        if (helper.validateMandatoryFormFields("addNewSubjectForm")) {
            let newSubject = new TimetableSubjectContentViewModel();
            newSubject.name(this.newSubjectName().toString());
            newSubject.schoolGrade(this.newSubjectSchoolGrade.toString());
            newSubject.color(this.newSubjectColor.toString());
            this.subjects.push(newSubject);
            jQuery("#modal-AddSubject").modal("toggle");
        }
    }

}

export class TimetableViewMode {

    public timetable = ko.observableArray<TimetableRowViewModel>();

    afterRenderCounter: number = 1;
    lastElementIdEdited: string = "-1";
    lastValueBeforeChanged: string = "";
    lastValueHasSaved: boolean = false;
    public lastElementEdited = ko.observable<TimetableSubjectViewModel>();

    constructor() {
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
                        newItemContent.color("#" + rowItem.lesson.color);
                        newItemContent.schoolGrade(rowItem.lesson.tbClass.name);
                        newRowItem.hasSubject(true);
                    }
                    else {
                        newItemContent.name(rowItem.description);
                    }
                    newRowItem.content(newItemContent);

                    newRow.subjects.push(newRowItem);
                }
                this.timetable.push(newRow);
            }
            console.log(this.timetable());
        }
        catch (Error) {
            console.log("Error while reading data from timetable model! Message: " + Error.message);
        }
    }

    addNewSubjectRow(data: any, event: any) {
        let newRow1 = new TimetableRowViewModel();
        newRow1.rowType("subjects");
        newRow1.isNew(true);
        for (let i = 0; i <= 5; i++) {
            let newRowItem = new TimetableSubjectViewModel();
            newRowItem.hour(data.hour() + 1);
            newRowItem.day(i);
            newRowItem.hasSubject(i == 0 ? false : true);
            newRowItem.labelVisible(true);
            newRowItem.inlineEditingVisible(false);
            newRowItem.isNew(true);
            let newSubjectItemContetn = new TimetableSubjectContentViewModel();
            newSubjectItemContetn.name("&nbsp;");
            newSubjectItemContetn.color("transparent");
            newSubjectItemContetn.schoolGrade("");
            newRowItem.content(newSubjectItemContetn);
            newRow1.subjects.push(newRowItem);

        }
        //var newRow = {
        //    rowtype: "subjects",
        //    subjects: ko.observableArray([
        //        { hour: data.hour + 1, day: 0, hasSubject: ko.observable(false), labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), isNew: true, content: { name: ko.observable("&nbsp;"), color: "transparent" } },
        //        { hour: data.hour + 1, day: 1, hasSubject: ko.observable(false), labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), isNew: true, content: { name: ko.observable("&nbsp;"), schoolGrade: ko.observable(""), color: ko.observable("") } },
        //        { hour: data.hour + 1, day: 2, hasSubject: ko.observable(true), labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), isNew: true, content: { name: ko.observable("&nbsp;"), schoolGrade: new ko.observable(""), color: new ko.observable("") } },
        //        { hour: data.hour + 1, day: 3, hasSubject: ko.observable(true), labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), isNew: true, content: { name: ko.observable("&nbsp;"), schoolGrade: new ko.observable(""), color: new ko.observable("") } },
        //        { hour: data.hour + 1, day: 4, hasSubject: ko.observable(true), labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), isNew: true, content: { name: ko.observable("&nbsp;"), schoolGrade: new ko.observable(""), color: new ko.observable("") } },
        //        { hour: data.hour + 1, day: 5, hasSubject: ko.observable(true), labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), isNew: true, content: { name: ko.observable("&nbsp;"), schoolGrade: new ko.observable(""), color: new ko.observable("") } }
        //    ]),
        //    isNew: true
        //};
        debugger;
        this.timetable.splice(data.hour + 1, 0, newRow1);

        for (var i = data.hour + 2; i < this.timetable().length; i++) {
            for (var j = 0; j < this.timetable()[i].subjects().length; j++) {
                this.timetable()[i].subjects()[j].hour(this.timetable()[i].subjects()[j].hour() + 1);
            }
        }
    }
}

export class SectionTimetableViewModel {
    
    public subjectAdministrationViewModel = new SubjectAdministrationViewModel();
    public timetableViewModel = new TimetableViewMode();
    
    public dragItem = ko.observable<TimetableSubjectContentViewModel>();

    deleteSubject(data: any, event: any, parent: any) {
        let target = event.target || event.srcElement;
        let rootViewModel = ko.contextFor(target).$parents[1];
        rootViewModel.timetable()[data.hour()].subjects()[data.day()].content().name("&nbsp;");
        rootViewModel.timetable()[data.hour()].subjects()[data.day()].content().color("");
        rootViewModel.timetable()[data.hour()].subjects()[data.day()].content().schoolGrade("");
        rootViewModel.timetable()[data.hour()].subjects()[data.day()].labelVisible(true);
        rootViewModel.timetable()[data.hour()].subjects()[data.day()].hasSubject(false);
        rootViewModel.timetable()[data.hour()].subjects()[data.day()].isNew(true);
        //jQuery(".timetable-remove-subject").style("opacity", "0");
        console.log(rootViewModel.timetable()[data.hour()].subjects()[data.day()]);
    }

    replaceSubjectInTimetable(data: any, event: any) {
        let target = event.target || event.srcElement;
        let rootViewModel = ko.contextFor(target).$parents[1];
        rootViewModel.timetable()[data.hour()].subjects()[data.day()].content().name(this.dragItem().name().toString());
        rootViewModel.timetable()[data.hour()].subjects()[data.day()].content().color(this.dragItem().color().toString());
        rootViewModel.timetable()[data.hour()].subjects()[data.day()].content().schoolGrade(this.dragItem().schoolGrade().toString());
        rootViewModel.timetable()[data.hour()].subjects()[data.day()].hasSubject(true);
        rootViewModel.timetable()[data.hour()].subjects()[data.day()].isNew(true);
        rootViewModel.timetable()[data.hour()].subjects()[data.day()].id(this.dragItem().id().toString());
    }

    clickSubjectLabel(value: any, event: any) {
        let target = event.target || event.srcElement;
        let rootViewModel = ko.contextFor(target).$parents[1];
        if (value.inlineEditingAllowed()) {
            if (!rootViewModel.lastValueHasSaved) {
                if (rootViewModel.lastElementEdited() != undefined) {
                    rootViewModel.lastElementEdited().content().name(rootViewModel.lastValueBeforeChanged);
                }
            }
            value.inlineEditingVisible(true);
            debugger;
            value.labelVisible(false);
            if (rootViewModel.lastElementEdited() != undefined && rootViewModel.lastElementEdited() !== value) {
                rootViewModel.lastElementEdited().inlineEditingVisible(false);
                rootViewModel.lastElementEdited().labelVisible(true);
            }

            rootViewModel.lastValueBeforeChanged = value.content().name();
            rootViewModel.lastElementEdited(value);
            rootViewModel.lastValueHasSaved = false;
        }
    }

    saveInlineEditingChanges(value: any, event: any) {
        let target = event.target || event.srcElement;
        let rootViewModel = ko.contextFor(target).$parents[1];
        if (event.type == "click" || (event.type == "keyup" && event.key == "Enter")) {
            rootViewModel.lastElementEdited().isNew(true);
            rootViewModel.lastValueHasSaved = true;
            value.inlineEditingVisible(false);
            value.labelVisible(true);
        }
    }

    discardInlineEditingChanges(value: any, event: any) {
        let target = event.target || event.srcElement;
        let rootViewModel = ko.contextFor(target).$parents[1];
        rootViewModel.lastValueHasSaved = false;
        rootViewModel.lastElementEdited().content().name(rootViewModel.lastValueBeforeChanged);
        value.inlineEditingVisible(false);
        value.labelVisible(true);
    }

}