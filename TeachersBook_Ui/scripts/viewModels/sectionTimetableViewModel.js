System.register(["./timetableRowViewModel", "./timetableSubjectViewModel", "./timetableSubjectContentViewModel", "../helper"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var timetableRowViewModel_1, timetableSubjectViewModel_1, timetableSubjectContentViewModel_1, helper_1, SectionTimetableViewModel;
    return {
        setters: [
            function (timetableRowViewModel_1_1) {
                timetableRowViewModel_1 = timetableRowViewModel_1_1;
            },
            function (timetableSubjectViewModel_1_1) {
                timetableSubjectViewModel_1 = timetableSubjectViewModel_1_1;
            },
            function (timetableSubjectContentViewModel_1_1) {
                timetableSubjectContentViewModel_1 = timetableSubjectContentViewModel_1_1;
            },
            function (helper_1_1) {
                helper_1 = helper_1_1;
            }
        ],
        execute: function () {
            SectionTimetableViewModel = (function () {
                function SectionTimetableViewModel() {
                    this.afterRenderCounter = 1;
                    this.lastElementIdEdited = "-1";
                    this.lastValueBeforeChanged = "";
                    this.lastValueHasSaved = false;
                    this.newSubjectColor = ko.observable("#00AABB");
                }
                SectionTimetableViewModel.prototype.clickSubjectLabel = function (value, event) {
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
                };
                SectionTimetableViewModel.prototype.saveInlineEditingChanges = function (value, event) {
                    if (event.type == "click" || (event.type == "keyup" && event.key == "Enter")) {
                        this.lastElementEdited().isNew = true;
                        this.lastValueHasSaved = true;
                        value.inlineEditingVisible(false);
                        value.labelVisible(true);
                    }
                };
                SectionTimetableViewModel.prototype.discardInlineEditingChanges = function (value, event) {
                    this.lastValueHasSaved = false;
                    this.lastElementEdited().content.name(this.lastValueBeforeChanged);
                    value.inlineEditingVisible(false);
                    value.labelVisible(true);
                };
                SectionTimetableViewModel.prototype.activateTooltips = function () {
                    jQuery('[data-toggle="tooltip"]').tooltip();
                };
                SectionTimetableViewModel.prototype.replaceSubjectInTimetable = function (data, event) {
                    this.timetable()[data.hour].subjects()[data.day].content.name(this.dragItem().name.toString());
                    this.timetable()[data.hour].subjects()[data.day].content.color(this.dragItem().color.toString());
                    this.timetable()[data.hour].subjects()[data.day].content.schoolGrade(this.dragItem().schoolGrade.toString());
                    this.timetable()[data.hour].subjects()[data.day].hasSubject(true);
                    this.timetable()[data.hour].subjects()[data.day].isNew = true;
                    this.timetable()[data.hour].subjects()[data.day].id = this.dragItem().id.toString();
                };
                SectionTimetableViewModel.prototype.openAddNewSubjectDialog = function () {
                    jQuery("#modal-AddSubject").modal("show");
                    this.newSubjectName("");
                    this.newSubjectSchoolGrade("");
                    this.newSubjectColor("#00AABB");
                };
                SectionTimetableViewModel.prototype.addNewSubject = function () {
                    var helper = new helper_1.Helper();
                    if (helper.validateMandatoryFormFields("addNewSubjectForm")) {
                        var newSubject = new timetableSubjectContentViewModel_1.TimetableSubjectContentViewModel();
                        newSubject.name(this.newSubjectName().toString());
                        newSubject.schoolGrade(this.newSubjectSchoolGrade.toString());
                        newSubject.color(this.newSubjectColor.toString());
                        this.subjects.push(newSubject);
                        jQuery("#modal-AddSubject").modal("toggle");
                    }
                };
                SectionTimetableViewModel.prototype.deleteSubject = function (data, event) {
                    this.timetable()[data.hour].subjects()[data.day].content.name("&nbsp;");
                    this.timetable()[data.hour].subjects()[data.day].content.color("");
                    this.timetable()[data.hour].subjects()[data.day].content.schoolGrade("");
                    this.timetable()[data.hour].subjects()[data.day].hasSubject(false);
                    this.timetable()[data.hour].subjects()[data.day].isNew = true;
                    jQuery(".timetable-remove-subject").style("opacity", "0");
                };
                SectionTimetableViewModel.prototype.addNewSubjectRow = function (data, event) {
                    var newRow1 = new timetableRowViewModel_1.TimetableRowViewModel();
                    newRow1.rowType = "subjects";
                    newRow1.isNew = true;
                    for (var i_1 = 0; i_1 <= 5; i_1++) {
                        var newRowItem = new timetableSubjectViewModel_1.TimetableSubjectViewModel();
                        newRowItem.hour = data.hour + 1;
                        newRowItem.day = i_1;
                        newRowItem.hasSubject(i_1 == 0 ? false : true);
                        newRowItem.labelVisible(true);
                        newRowItem.inlineEditingVisible(false);
                        newRowItem.isNew = true;
                        var newSubjectItemContetn = new timetableSubjectContentViewModel_1.TimetableSubjectContentViewModel();
                        newSubjectItemContetn.name("&nbsp;");
                        newSubjectItemContetn.color("transparent");
                        newSubjectItemContetn.schoolGrade("");
                        newRowItem.content = newSubjectItemContetn;
                        newRow1.subjects.push(newRowItem);
                    }
                    debugger;
                    this.timetable.splice(data.hour + 1, 0, newRow1);
                    for (var i = data.hour + 2; i < this.timetable().length; i++) {
                        for (var j = 0; j < this.timetable()[i].subjects().length; j++) {
                            this.timetable()[i].subjects()[j].hour = this.timetable()[i].subjects()[j].hour + 1;
                        }
                    }
                };
                return SectionTimetableViewModel;
            }());
            exports_1("SectionTimetableViewModel", SectionTimetableViewModel);
        }
    };
});
//# sourceMappingURL=sectionTimetableViewModel.js.map