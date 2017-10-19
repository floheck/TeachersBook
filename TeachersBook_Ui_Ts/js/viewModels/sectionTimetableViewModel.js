"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dataInterface_1 = require("../dataInterface");
var timetableRowViewModel_1 = require("./timetableRowViewModel");
var timetableSubjectViewModel_1 = require("./timetableSubjectViewModel");
var timetableSubjectContentViewModel_1 = require("./timetableSubjectContentViewModel");
var helper_1 = require("../helper");
var SubjectAdministrationViewModel = (function () {
    function SubjectAdministrationViewModel() {
        this.subjects = ko.observableArray();
        this.newSubjectName = ko.observable();
        this.newSubjectSchoolGrade = ko.observable();
        this.newSubjectColor = ko.observable("#00AABB");
        this.fromModel();
    }
    SubjectAdministrationViewModel.prototype.fromModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var subjectsModelArray, _i, subjectsModelArray_1, row, subject, Error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, dataInterface_1.DataInterface.getAllSubjects("2017/2018")];
                    case 1:
                        subjectsModelArray = _a.sent();
                        for (_i = 0, subjectsModelArray_1 = subjectsModelArray; _i < subjectsModelArray_1.length; _i++) {
                            row = subjectsModelArray_1[_i];
                            subject = new timetableSubjectContentViewModel_1.TimetableSubjectContentViewModel();
                            subject.id(row.id);
                            subject.name(row.name);
                            subject.color("#" + row.color);
                            subject.schoolGrade(null);
                            this.subjects.push(subject);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        Error_1 = _a.sent();
                        console.log("Error while reading data from lesson model! Message: " + Error_1.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SubjectAdministrationViewModel.prototype.activateTooltips = function () {
        jQuery('[data-toggle="tooltip"]').tooltip();
    };
    SubjectAdministrationViewModel.prototype.openAddNewSubjectDialog = function () {
        jQuery("#modal-AddSubject").modal("show");
        this.newSubjectName("");
        this.newSubjectSchoolGrade("");
        this.newSubjectColor("#00AABB");
    };
    SubjectAdministrationViewModel.prototype.addNewSubject = function () {
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
    return SubjectAdministrationViewModel;
}());
exports.SubjectAdministrationViewModel = SubjectAdministrationViewModel;
var TimetableViewMode = (function () {
    function TimetableViewMode() {
        this.timetable = ko.observableArray();
        this.afterRenderCounter = 1;
        this.lastElementIdEdited = "-1";
        this.lastValueBeforeChanged = "";
        this.lastValueHasSaved = false;
        this.lastElementEdited = ko.observable();
        this.fromModel();
    }
    TimetableViewMode.prototype.fromModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var timetableModel, _i, _a, row, newRow, subjects, _b, _c, rowItem, newRowItem, newItemContent, Error_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, dataInterface_1.DataInterface.getCompleteTimetable("2017/2018")];
                    case 1:
                        timetableModel = _d.sent();
                        for (_i = 0, _a = timetableModel.rows; _i < _a.length; _i++) {
                            row = _a[_i];
                            newRow = new timetableRowViewModel_1.TimetableRowViewModel();
                            subjects = new Array();
                            newRow.id(row.id);
                            newRow.rowType(row.rowType);
                            for (_b = 0, _c = row.subjects; _b < _c.length; _b++) {
                                rowItem = _c[_b];
                                newRowItem = new timetableSubjectViewModel_1.TimetableSubjectViewModel();
                                newRowItem.id(rowItem.id);
                                newRowItem.day(rowItem.day);
                                newRowItem.hour(rowItem.hour);
                                newItemContent = new timetableSubjectContentViewModel_1.TimetableSubjectContentViewModel();
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
                        return [3 /*break*/, 3];
                    case 2:
                        Error_2 = _d.sent();
                        console.log("Error while reading data from timetable model! Message: " + Error_2.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TimetableViewMode.prototype.addNewSubjectRow = function (data, event) {
        var newRow1 = new timetableRowViewModel_1.TimetableRowViewModel();
        newRow1.rowType("subjects");
        newRow1.isNew(true);
        for (var i_1 = 0; i_1 <= 5; i_1++) {
            var newRowItem = new timetableSubjectViewModel_1.TimetableSubjectViewModel();
            newRowItem.hour(data.hour() + 1);
            newRowItem.day(i_1);
            newRowItem.hasSubject(i_1 == 0 ? false : true);
            newRowItem.labelVisible(true);
            newRowItem.inlineEditingVisible(false);
            newRowItem.isNew(true);
            var newSubjectItemContetn = new timetableSubjectContentViewModel_1.TimetableSubjectContentViewModel();
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
    };
    return TimetableViewMode;
}());
exports.TimetableViewMode = TimetableViewMode;
var SectionTimetableViewModel = (function () {
    function SectionTimetableViewModel() {
        this.subjectAdministrationViewModel = new SubjectAdministrationViewModel();
        this.timetableViewModel = new TimetableViewMode();
        this.dragItem = ko.observable();
    }
    SectionTimetableViewModel.prototype.deleteSubject = function (data, event, parent) {
        var target = event.target || event.srcElement;
        var rootViewModel = ko.contextFor(target).$parents[1];
        rootViewModel.timetable()[data.hour()].subjects()[data.day()].content().name("&nbsp;");
        rootViewModel.timetable()[data.hour()].subjects()[data.day()].content().color("");
        rootViewModel.timetable()[data.hour()].subjects()[data.day()].content().schoolGrade("");
        rootViewModel.timetable()[data.hour()].subjects()[data.day()].labelVisible(true);
        rootViewModel.timetable()[data.hour()].subjects()[data.day()].hasSubject(false);
        rootViewModel.timetable()[data.hour()].subjects()[data.day()].isNew(true);
        //jQuery(".timetable-remove-subject").style("opacity", "0");
        console.log(rootViewModel.timetable()[data.hour()].subjects()[data.day()]);
    };
    SectionTimetableViewModel.prototype.replaceSubjectInTimetable = function (data, event) {
        var target = event.target || event.srcElement;
        var rootViewModel = ko.contextFor(target).$parents[1];
        rootViewModel.timetable()[data.hour()].subjects()[data.day()].content().name(this.dragItem().name().toString());
        rootViewModel.timetable()[data.hour()].subjects()[data.day()].content().color(this.dragItem().color().toString());
        rootViewModel.timetable()[data.hour()].subjects()[data.day()].content().schoolGrade(this.dragItem().schoolGrade().toString());
        rootViewModel.timetable()[data.hour()].subjects()[data.day()].hasSubject(true);
        rootViewModel.timetable()[data.hour()].subjects()[data.day()].isNew(true);
        rootViewModel.timetable()[data.hour()].subjects()[data.day()].id(this.dragItem().id().toString());
    };
    SectionTimetableViewModel.prototype.clickSubjectLabel = function (value, event) {
        var target = event.target || event.srcElement;
        var rootViewModel = ko.contextFor(target).$parents[1];
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
    };
    SectionTimetableViewModel.prototype.saveInlineEditingChanges = function (value, event) {
        var target = event.target || event.srcElement;
        var rootViewModel = ko.contextFor(target).$parents[1];
        if (event.type == "click" || (event.type == "keyup" && event.key == "Enter")) {
            rootViewModel.lastElementEdited().isNew(true);
            rootViewModel.lastValueHasSaved = true;
            value.inlineEditingVisible(false);
            value.labelVisible(true);
        }
    };
    SectionTimetableViewModel.prototype.discardInlineEditingChanges = function (value, event) {
        var target = event.target || event.srcElement;
        var rootViewModel = ko.contextFor(target).$parents[1];
        rootViewModel.lastValueHasSaved = false;
        rootViewModel.lastElementEdited().content().name(rootViewModel.lastValueBeforeChanged);
        value.inlineEditingVisible(false);
        value.labelVisible(true);
    };
    return SectionTimetableViewModel;
}());
exports.SectionTimetableViewModel = SectionTimetableViewModel;
//# sourceMappingURL=sectionTimetableViewModel.js.map