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
var timetable_1 = require("../model/timetable");
var lesson_1 = require("../model/lesson");
var tbClass_1 = require("../model/tbClass");
var cultureSpecificTexts_1 = require("../model/cultureSpecificTexts");
var dataInterface_1 = require("../dataInterface");
var timetableRowViewModel_1 = require("./timetableRowViewModel");
var timetableSubjectViewModel_1 = require("./timetableSubjectViewModel");
var timetableSubjectContentViewModel_1 = require("./timetableSubjectContentViewModel");
var timetableClassViewModel_1 = require("./timetableClassViewModel");
var helper_1 = require("../helper");
var SchoolClassViewModel = (function () {
    function SchoolClassViewModel() {
        this.id = ko.observable();
        this.name = ko.observable();
    }
    return SchoolClassViewModel;
}());
exports.SchoolClassViewModel = SchoolClassViewModel;
var SubjectAdministrationViewModel = (function () {
    function SubjectAdministrationViewModel(texts) {
        this._texts = new cultureSpecificTexts_1.CultureSpecificTexts();
        this.addNewSubjectDialogViewModel = null;
        this.subjects = ko.observableArray();
        this.addNewSubjectDialogViewModel = new AddNewSubjectModalDialogViewModel(texts);
        this.fromModel();
    }
    SubjectAdministrationViewModel.prototype.fromModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var subjectsModelArray, _i, subjectsModelArray_1, row, subject, newClassModel, Error_1;
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
                            subject.color(row.color);
                            subject.schoolGrade(row.TtClass.name);
                            newClassModel = new timetableClassViewModel_1.TimetableClassViewModel();
                            newClassModel.id(row.TtClass.id);
                            newClassModel.name(row.TtClass.name);
                            subject.tTClass(newClassModel);
                            this.subjects.push(subject);
                        }
                        console.log(this.subjects());
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
    SubjectAdministrationViewModel.prototype.addNewSubject = function (data, event) {
        return __awaiter(this, void 0, void 0, function () {
            var target, subjectAdminViewModel, helper, timestamp_1, newSubject, newLessonModel, newClassModel, apiResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        target = event.target || event.srcElement;
                        subjectAdminViewModel = ko.contextFor(target).$parent;
                        helper = new helper_1.Helper();
                        if (!helper.validateMandatoryFormFields("addNewSubjectForm")) return [3 /*break*/, 2];
                        timestamp_1 = Date.now().toString();
                        newSubject = new timetableSubjectContentViewModel_1.TimetableSubjectContentViewModel();
                        newLessonModel = new lesson_1.TtLesson();
                        newSubject.name(data.newSubjectName().toString());
                        newLessonModel.name = data.newSubjectName().toString();
                        newSubject.schoolGrade(data.newSubjectSchoolClass().name().toString());
                        newClassModel = new tbClass_1.TtClass();
                        newClassModel.id = data.newSubjectSchoolClass().id().toString();
                        newClassModel.name = data.newSubjectSchoolClass().name().toString();
                        newLessonModel.TtClass = newClassModel;
                        newSubject.color(data.newSubjectColor().toString());
                        newLessonModel.color = data.newSubjectColor().toString();
                        newSubject.id(timestamp_1);
                        subjectAdminViewModel.subjects.push(newSubject);
                        subjectAdminViewModel.subjects(subjectAdminViewModel.subjects().sort(function (a, b) {
                            return (a.name() > b.name()) ? 1 : ((b.name() > a.name()) ? -1 : 0);
                        }));
                        jQuery("#modal-AddSubject").modal("toggle");
                        console.log(JSON.stringify(newLessonModel));
                        return [4 /*yield*/, dataInterface_1.DataInterface.addSubject("2017/2018", newLessonModel)];
                    case 1:
                        apiResponse = _a.sent();
                        subjectAdminViewModel.subjects().filter(function (item) { return item.id() == timestamp_1; })[0].id(apiResponse.newId);
                        console.log(subjectAdminViewModel.subjects());
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    SubjectAdministrationViewModel.prototype.deleteSubject = function (data, event) {
        var target = event.target || event.srcElement;
        var subjectAdminViewModel = ko.contextFor(target).$parent;
        subjectAdminViewModel.subjects(subjectAdminViewModel.subjects().filter(function (item) { return item.id() !== data.id(); }));
        dataInterface_1.DataInterface.deleteSubject("2017/2018", data.id());
    };
    SubjectAdministrationViewModel.prototype.activateTooltips = function () {
        jQuery('[data-toggle="tooltip"]').tooltip();
    };
    return SubjectAdministrationViewModel;
}());
exports.SubjectAdministrationViewModel = SubjectAdministrationViewModel;
var TimetableViewMode = (function () {
    function TimetableViewMode(texts) {
        this.timetable = ko.observableArray();
        this.afterRenderCounter = 1;
        this.lastElementIdEdited = "-1";
        this.lastValueBeforeChanged = "";
        this.lastValueHasSaved = false;
        this.addNewSubjectRowButtonLabel = ko.observable();
        this.addNewPauseRowButtonLabel = ko.observable();
        this.lastElementEdited = ko.observable();
        this.addNewSubjectRowButtonLabel(texts.texts.filter(function (item) { return item.id == "AddNewSubjectRowButtonLabel"; })[0].text);
        this.addNewPauseRowButtonLabel(texts.texts.filter(function (item) { return item.id == "AddNewPauseRowButtonLabel"; })[0].text);
        this.fromModel();
    }
    TimetableViewMode.prototype.fromModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var timetableModel, _i, _a, row, newRow, subjects, _b, _c, rowItem, newRowItem, newItemContent, newClassItem, Error_2;
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
                                    newItemContent.color(rowItem.lesson.color);
                                    newClassItem = new timetableClassViewModel_1.TimetableClassViewModel();
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
    TimetableViewMode.prototype.toModel = function () {
        var newTimetableModel = new timetable_1.Timetable();
        try {
            for (var _i = 0, _a = this.timetable(); _i < _a.length; _i++) {
                var row = _a[_i];
                var newRow = new timetable_1.TtSubjectRow();
                newRow.id = row.id();
                newRow.rowType = row.rowType();
                newRow.isNew = row.isNew();
                for (var _b = 0, _c = row.subjects(); _b < _c.length; _b++) {
                    var rowItem = _c[_b];
                    var newSubjectRowItem = new timetable_1.TtSubjectRowItem();
                    newSubjectRowItem.id = rowItem.id();
                    newSubjectRowItem.day = rowItem.day();
                    newSubjectRowItem.hour = rowItem.hour();
                    if (rowItem.hasSubject()) {
                        var newLesson = new lesson_1.TtLesson();
                        newLesson.id = rowItem.content().id();
                        newLesson.name = rowItem.content().name();
                        newLesson.color = rowItem.content().color();
                        newLesson.isNew = rowItem.content().isNew();
                        var newClass = new tbClass_1.TtClass();
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
    };
    TimetableViewMode.prototype.addNewSubjectRow = function (data, event) {
        var target = event.target || event.srcElement;
        var timetableViewModel = ko.contextFor(target).$parents[1];
        timetableViewModel.createNewRow(data, "subject", timetableViewModel);
    };
    TimetableViewMode.prototype.addNewPauseRow = function (data, event) {
        var target = event.target || event.srcElement;
        var timetableViewModel = ko.contextFor(target).$parents[1];
        timetableViewModel.createNewRow(data, "break", timetableViewModel);
    };
    TimetableViewMode.prototype.createNewRow = function (data, rowType, timetableViewModel) {
        var newRow1 = new timetableRowViewModel_1.TimetableRowViewModel();
        newRow1.rowType(rowType);
        newRow1.isNew(true);
        for (var i = 0; i <= 5; i++) {
            var newRowItem = new timetableSubjectViewModel_1.TimetableSubjectViewModel();
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
            var newSubjectItemContetn = new timetableSubjectContentViewModel_1.TimetableSubjectContentViewModel();
            newSubjectItemContetn.name("");
            newSubjectItemContetn.color("transparent");
            newSubjectItemContetn.tTClass(new timetableClassViewModel_1.TimetableClassViewModel());
            newSubjectItemContetn.schoolGrade("");
            newRowItem.content(newSubjectItemContetn);
            newRow1.subjects.push(newRowItem);
        }
        timetableViewModel.timetable.splice(data.hour() + 1, 0, newRow1);
        for (var i = data.hour() + 2; i < timetableViewModel.timetable().length; i++) {
            for (var j = 0; j < timetableViewModel.timetable()[i].subjects().length; j++) {
                timetableViewModel.timetable()[i].subjects()[j].hour(timetableViewModel.timetable()[i].subjects()[j].hour() + 1);
            }
        }
    };
    return TimetableViewMode;
}());
exports.TimetableViewMode = TimetableViewMode;
var AddNewSubjectModalDialogViewModel = (function () {
    function AddNewSubjectModalDialogViewModel(texts) {
        this.lblModalDialogTitle = ko.observable();
        this.lblAddSubjectNameLabel = ko.observable();
        this.lblAddSubjectClassLabel = ko.observable();
        this.lblAddSubjectColorLabel = ko.observable();
        this.lblAddNewSubjectButtonLabel = ko.observable();
        this.schoolClassesSection = ko.observableArray();
        this.newSubjectName = ko.observable();
        this.newSubjectSchoolClass = ko.observable();
        this.newSubjectColor = ko.observable("#00AABB");
        this.lblModalDialogTitle(texts.texts.filter(function (item) { return item.id == "AddSubjectModalDialogHeader"; })[0].text);
        this.lblAddSubjectNameLabel(texts.texts.filter(function (item) { return item.id == "AddSubjectNameLabel"; })[0].text);
        this.lblAddSubjectClassLabel(texts.texts.filter(function (item) { return item.id == "AddSubjectClassLabel"; })[0].text);
        this.lblAddSubjectColorLabel(texts.texts.filter(function (item) { return item.id == "AddSubjectColorLabel"; })[0].text);
        this.lblAddNewSubjectButtonLabel(texts.texts.filter(function (item) { return item.id == "AddNewSubjectButtonLabel"; })[0].text);
        this.fromModel();
        jQuery("#cp2").colorpicker("");
    }
    AddNewSubjectModalDialogViewModel.prototype.fromModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var schoolClassesModelArray, _i, schoolClassesModelArray_1, row, schoolClass, Error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, dataInterface_1.DataInterface.getAllClasses("2017/2018")];
                    case 1:
                        schoolClassesModelArray = _a.sent();
                        for (_i = 0, schoolClassesModelArray_1 = schoolClassesModelArray; _i < schoolClassesModelArray_1.length; _i++) {
                            row = schoolClassesModelArray_1[_i];
                            schoolClass = new SchoolClassViewModel();
                            schoolClass.id(row.id);
                            schoolClass.name(row.name);
                            this.schoolClassesSection.push(schoolClass);
                        }
                        console.log(this.schoolClassesSection());
                        return [3 /*break*/, 3];
                    case 2:
                        Error_3 = _a.sent();
                        console.log("Error while reading data from lesson model! Message: " + Error_3.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AddNewSubjectModalDialogViewModel;
}());
exports.AddNewSubjectModalDialogViewModel = AddNewSubjectModalDialogViewModel;
var SectionTimetableViewModel = (function () {
    function SectionTimetableViewModel(texts) {
        this._texts = new cultureSpecificTexts_1.CultureSpecificTexts();
        this.subjectAdministrationViewModel = null;
        this.timetableViewModel = null;
        this.isInEditMode = ko.observable(false);
        this.dragItem = ko.observable();
        console.log(texts);
        this.timetableViewModel = new TimetableViewMode(texts);
        this.subjectAdministrationViewModel = new SubjectAdministrationViewModel(texts);
    }
    SectionTimetableViewModel.prototype.deleteSubject = function (data, event, parent) {
        var target = event.target || event.srcElement;
        var timetableViewModel = ko.contextFor(target).$parents[1];
        timetableViewModel.timetable()[data.hour()].subjects()[data.day()].content().name("");
        timetableViewModel.timetable()[data.hour()].subjects()[data.day()].content().color("transparent");
        timetableViewModel.timetable()[data.hour()].subjects()[data.day()].content().schoolGrade("");
        timetableViewModel.timetable()[data.hour()].subjects()[data.day()].content().isNew(true);
        timetableViewModel.timetable()[data.hour()].subjects()[data.day()].labelVisible(true);
        timetableViewModel.timetable()[data.hour()].subjects()[data.day()].hasSubject(false);
        console.log(timetableViewModel.timetable()[data.hour()].subjects()[data.day()]);
    };
    SectionTimetableViewModel.prototype.replaceSubjectInTimetable = function (data, event) {
        var target = event.target || event.srcElement;
        var timetableViewModel = ko.contextFor(target).$parents[1];
        timetableViewModel.timetable()[data.hour()].subjects()[data.day()].content().name(this.dragItem().name().toString());
        timetableViewModel.timetable()[data.hour()].subjects()[data.day()].content().color(this.dragItem().color().toString());
        timetableViewModel.timetable()[data.hour()].subjects()[data.day()].content().tTClass(this.dragItem().tTClass());
        timetableViewModel.timetable()[data.hour()].subjects()[data.day()].content().isNew(true);
        timetableViewModel.timetable()[data.hour()].subjects()[data.day()].hasSubject(true);
        timetableViewModel.timetable()[data.hour()].subjects()[data.day()].content().id(this.dragItem().id().toString());
    };
    SectionTimetableViewModel.prototype.clickSubjectLabel = function (value, event) {
        var target = event.target || event.srcElement;
        var timetableViewModel = ko.contextFor(target).$parents[1];
        var rootViewModel = ko.contextFor(target).$root;
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
    };
    SectionTimetableViewModel.prototype.saveInlineEditingChanges = function (value, event) {
        var target = event.target || event.srcElement;
        var timetableViewModel = ko.contextFor(target).$parents[1];
        if (event.type == "click" || (event.type == "keyup" && event.key == "Enter")) {
            timetableViewModel.lastElementEdited().isNew(true);
            timetableViewModel.lastValueHasSaved = true;
            value.inlineEditingVisible(false);
            value.labelVisible(true);
        }
    };
    SectionTimetableViewModel.prototype.discardInlineEditingChanges = function (value, event) {
        var target = event.target || event.srcElement;
        var timetableViewModel = ko.contextFor(target).$parents[1];
        timetableViewModel.lastValueHasSaved = false;
        timetableViewModel.lastElementEdited().content().name(timetableViewModel.lastValueBeforeChanged);
        value.inlineEditingVisible(false);
        value.labelVisible(true);
    };
    SectionTimetableViewModel.prototype.openAddNewSubjectDialog = function (data, event) {
        jQuery("#modal-AddSubject").modal("show");
        data.addNewSubjectDialogViewModel.newSubjectName("");
        data.addNewSubjectDialogViewModel.newSubjectSchoolClass("");
        data.addNewSubjectDialogViewModel.newSubjectColor("#00AABB");
    };
    SectionTimetableViewModel.prototype.toggleEditMode = function (data, event) {
        var target = event.target || event.srcElement;
        var rootViewModel = ko.contextFor(target).$root;
        if (rootViewModel.isInEditMode()) {
            console.log(JSON.stringify(rootViewModel.timetableViewModel.toModel()));
        }
        rootViewModel.isInEditMode(!rootViewModel.isInEditMode());
    };
    return SectionTimetableViewModel;
}());
exports.SectionTimetableViewModel = SectionTimetableViewModel;
//# sourceMappingURL=sectionTimetableViewModel.js.map