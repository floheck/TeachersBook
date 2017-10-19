import { Timetable, SubjectRow, SubjectRowItem } from "../model/timetable";
import { Lesson } from "../model/lesson";
import { TbClass } from "../model/tbClass";
import { DataInterface } from "../dataInterface";
import { TimetableRowViewModel } from "./timetableRowViewModel";
import { TimetableSubjectViewModel } from "./timetableSubjectViewModel";
import { TimetableSubjectContentViewModel } from "./timetableSubjectContentViewModel";
import { Helper } from "../helper"

export class SectionTimetableViewModel {
    constructor() {

    }

    timetable: KnockoutObservableArray<TimetableRowViewModel>;
    afterRenderCounter: number = 1;
    lastElementIdEdited: string = "-1";
    lastValueBeforeChanged: string = "";
    lastValueHasSaved: boolean = false;
    lastElementEdited: KnockoutObservable<TimetableSubjectViewModel>;

    newSubjectName: KnockoutObservable<string>;
    newSubjectSchoolGrade: KnockoutObservable<string>;
    newSubjectColor: KnockoutObservable<string> = ko.observable("#00AABB");

    subjects: KnockoutObservableArray<TimetableSubjectContentViewModel>;

    dragItem: KnockoutObservable<TimetableSubjectContentViewModel>;

    clickSubjectLabel(value: any, event: any) {
        if (value.inlineEditingAllowed) {
            if (!this.lastValueHasSaved) {
                if (this.lastElementEdited() != undefined) {
                    this.lastElementEdited().content.name(this.lastValueBeforeChanged);
                }
            }
            value.inlineEditingVisible(true);
            value.labelVisible(false);
            if (this.lastElementEdited() != undefined && this.lastElementEdited() !== value) {
                this.lastElementEdited().inlineEditingVisible(false);
                this.lastElementEdited().labelVisible(true);
            }

            this.lastValueBeforeChanged = value.content.name();
            this.lastElementEdited(value);
            this.lastValueHasSaved = false;
        }
    }

    saveInlineEditingChanges(value: any, event: any) {
        if (event.type == "click" || (event.type == "keyup" && event.key == "Enter")) {
            this.lastElementEdited().isNew = true;
            this.lastValueHasSaved = true;
            value.inlineEditingVisible(false);
            value.labelVisible(true);
        }
    }

    discardInlineEditingChanges(value: any, event: any) {
        this.lastValueHasSaved = false;
        this.lastElementEdited().content.name(this.lastValueBeforeChanged);
        value.inlineEditingVisible(false);
        value.labelVisible(true);
    }

    activateTooltips() {
        jQuery('[data-toggle="tooltip"]').tooltip();
    }

    replaceSubjectInTimetable(data: any, event: any) {
        this.timetable()[data.hour].subjects()[data.day].content.name(this.dragItem().name.toString());
        this.timetable()[data.hour].subjects()[data.day].content.color(this.dragItem().color.toString());
        this.timetable()[data.hour].subjects()[data.day].content.schoolGrade(this.dragItem().schoolGrade.toString());
        this.timetable()[data.hour].subjects()[data.day].hasSubject(true);
        this.timetable()[data.hour].subjects()[data.day].isNew = true;
        this.timetable()[data.hour].subjects()[data.day].id = this.dragItem().id.toString();
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

    deleteSubject(data: any, event: any) {
        this.timetable()[data.hour].subjects()[data.day].content.name("&nbsp;");
        this.timetable()[data.hour].subjects()[data.day].content.color("");
        this.timetable()[data.hour].subjects()[data.day].content.schoolGrade("");
        this.timetable()[data.hour].subjects()[data.day].hasSubject(false);
        this.timetable()[data.hour].subjects()[data.day].isNew = true;
        jQuery(".timetable-remove-subject").style("opacity", "0");
    }

    addNewSubjectRow(data: any, event: any) {
        let newRow1 = new TimetableRowViewModel();
        newRow1.rowType = "subjects";
        newRow1.isNew = true;
        for (let i = 0; i <= 5; i++) {
            let newRowItem = new TimetableSubjectViewModel();
            newRowItem.hour = data.hour + 1;
            newRowItem.day = i;
            newRowItem.hasSubject(i == 0 ? false : true);
            newRowItem.labelVisible(true);
            newRowItem.inlineEditingVisible(false);
            newRowItem.isNew = true;
            let newSubjectItemContetn = new TimetableSubjectContentViewModel();
            newSubjectItemContetn.name("&nbsp;");
            newSubjectItemContetn.color("transparent");
            newSubjectItemContetn.schoolGrade("");
            newRowItem.content = newSubjectItemContetn;
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
                this.timetable()[i].subjects()[j].hour = this.timetable()[i].subjects()[j].hour + 1;
            }
        }
    }
}