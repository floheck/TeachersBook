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
var timetable_1 = require("./model/timetable");
var lesson_1 = require("./model/lesson");
var tbClass_1 = require("./model/tbClass");
var helper_1 = require("./helper");
var webApiResponse_1 = require("./model/webApiResponse");
var DataInterface;
(function (DataInterface) {
    function getCompleteTimetable(schoolYear) {
        return __awaiter(this, void 0, void 0, function () {
            var helper, timetableResult, timetable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        helper = new helper_1.Helper();
                        return [4 /*yield*/, jQuery.ajax({
                                url: "http://teachersbookwebapi.azurewebsites.net/api/Timetable/getComplete?schoolYear=" + encodeURI(schoolYear),
                                type: "GET",
                                headers: { "Authorization": "bearer " + helper.getUrlParameter("accesstoken") },
                                cache: false
                            })];
                    case 1:
                        timetableResult = _a.sent();
                        timetable = mapTimetableToModel(timetableResult);
                        return [2 /*return*/, timetable];
                }
            });
        });
    }
    DataInterface.getCompleteTimetable = getCompleteTimetable;
    function getAllSubjects(schoolYear) {
        return __awaiter(this, void 0, void 0, function () {
            var helper, allSubjectsResult, allSubjects;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        helper = new helper_1.Helper();
                        return [4 /*yield*/, jQuery.ajax({
                                url: "http://teachersbookwebapi.azurewebsites.net/api/Timetable/getAllSubjects?schoolYear=" + encodeURI(schoolYear),
                                type: "GET",
                                headers: { "Authorization": "bearer " + helper.getUrlParameter("accesstoken") },
                                cache: false
                            })];
                    case 1:
                        allSubjectsResult = _a.sent();
                        allSubjects = mapSubjectsToModel(allSubjectsResult);
                        return [2 /*return*/, allSubjects];
                }
            });
        });
    }
    DataInterface.getAllSubjects = getAllSubjects;
    function getAllClasses(schoolYear) {
        return __awaiter(this, void 0, void 0, function () {
            var helper, allSchoolClassesResult, allSubjects;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        helper = new helper_1.Helper();
                        return [4 /*yield*/, jQuery.ajax({
                                url: "http://teachersbookwebapi.azurewebsites.net/api/Timetable/getAllClasses?schoolYear=" + encodeURI(schoolYear),
                                type: "GET",
                                headers: { "Authorization": "bearer " + helper.getUrlParameter("accesstoken") },
                                cache: false
                            })];
                    case 1:
                        allSchoolClassesResult = _a.sent();
                        allSubjects = mapSchoolClassesToModel(allSchoolClassesResult);
                        return [2 /*return*/, allSubjects];
                }
            });
        });
    }
    DataInterface.getAllClasses = getAllClasses;
    function addSubject(schoolYear, newSubject) {
        return __awaiter(this, void 0, void 0, function () {
            var helper, returnValue, addSubjectsResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        helper = new helper_1.Helper();
                        returnValue = new webApiResponse_1.WebApiAddItemResponse();
                        return [4 /*yield*/, jQuery.ajax({
                                url: "http://teachersbookwebapi.azurewebsites.net/api/Timetable/addSubject?schoolYear=" + encodeURI(schoolYear),
                                type: "POST",
                                headers: { "Authorization": "bearer " + helper.getUrlParameter("accesstoken") },
                                dataType: "json",
                                data: newSubject
                            })];
                    case 1:
                        addSubjectsResult = _a.sent();
                        console.log(addSubjectsResult);
                        returnValue.status = addSubjectsResult.substring(0, addSubjectsResult.indexOf("!"));
                        returnValue.newId = addSubjectsResult.substring(addSubjectsResult.indexOf(":") + 1).trim();
                        console.log(returnValue);
                        return [2 /*return*/, returnValue];
                }
            });
        });
    }
    DataInterface.addSubject = addSubject;
    function updateTimetable(schoolYear, timetable) {
        return __awaiter(this, void 0, void 0, function () {
            var helper, returnValue;
            return __generator(this, function (_a) {
                helper = new helper_1.Helper();
                returnValue = new webApiResponse_1.WebApiAddItemResponse();
                return [2 /*return*/, returnValue];
            });
        });
    }
    DataInterface.updateTimetable = updateTimetable;
    function deleteSubject(schoolYear, subjectToDeleteId) {
        return __awaiter(this, void 0, void 0, function () {
            var helper, success, addSubjectsResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        helper = new helper_1.Helper();
                        success = false;
                        return [4 /*yield*/, jQuery.ajax({
                                url: "http://teachersbookwebapi.azurewebsites.net/api/Timetable/removeSubject?schoolYear=" + encodeURI(schoolYear) + "&subjectToRemoveId=" + subjectToDeleteId,
                                type: "DELETE",
                                headers: { "Authorization": "bearer " + helper.getUrlParameter("accesstoken") },
                            })];
                    case 1:
                        addSubjectsResult = _a.sent();
                        console.log(addSubjectsResult);
                        return [2 /*return*/, success];
                }
            });
        });
    }
    DataInterface.deleteSubject = deleteSubject;
    function mapTimetableToModel(timetableFromApi) {
        return __awaiter(this, void 0, void 0, function () {
            var timetable, _i, _a, row, newRow, newRowItems, _b, _c, rowItem, newRowItem, newLesson, newClass;
            return __generator(this, function (_d) {
                try {
                    timetable = new timetable_1.Timetable();
                    console.log(timetableFromApi);
                    for (_i = 0, _a = timetableFromApi.rows; _i < _a.length; _i++) {
                        row = _a[_i];
                        newRow = new timetable_1.TtSubjectRow();
                        newRow.id = row.id;
                        newRow.start = row.start;
                        newRow.end = row.end;
                        newRow.rowType = row.rowType;
                        newRowItems = new Array();
                        for (_b = 0, _c = row.subjects; _b < _c.length; _b++) {
                            rowItem = _c[_b];
                            newRowItem = new timetable_1.TtSubjectRowItem();
                            newRowItem.id = rowItem.id;
                            newRowItem.hour = rowItem.hour;
                            newRowItem.day = rowItem.day;
                            newRowItem.description = rowItem.description;
                            if (rowItem.lesson != null) {
                                newLesson = new lesson_1.TtLesson();
                                newLesson.id = rowItem.lesson.id;
                                newLesson.name = rowItem.lesson.name;
                                newLesson.color = rowItem.lesson.color;
                                newClass = new tbClass_1.TtClass();
                                newClass.id = rowItem.lesson.TtClass.id;
                                newClass.name = rowItem.lesson.TtClass.name;
                                newLesson.TtClass = newClass;
                                newRowItem.lesson = newLesson;
                            }
                            else {
                                newRowItem.lesson = null;
                            }
                            newRowItems.push(newRowItem);
                        }
                        newRow.subjects = newRowItems;
                        timetable.rows.push(newRow);
                    }
                    return [2 /*return*/, timetable];
                }
                catch (Error) {
                    console.log("Error while pasing getCompleteTimetable result into model. Message: " + Error.Message);
                }
                return [2 /*return*/];
            });
        });
    }
    function mapSubjectsToModel(subjectsFromApi) {
        return __awaiter(this, void 0, void 0, function () {
            var returnValue, _i, subjectsFromApi_1, item, newSubject;
            return __generator(this, function (_a) {
                returnValue = new Array();
                for (_i = 0, subjectsFromApi_1 = subjectsFromApi; _i < subjectsFromApi_1.length; _i++) {
                    item = subjectsFromApi_1[_i];
                    newSubject = new lesson_1.TtLesson();
                    newSubject.id = item.id;
                    newSubject.name = item.name;
                    newSubject.color = item.color;
                    newSubject.TtClass = item.TtClass;
                    returnValue.push(newSubject);
                }
                return [2 /*return*/, returnValue];
            });
        });
    }
    function mapSchoolClassesToModel(classesFromApi) {
        return __awaiter(this, void 0, void 0, function () {
            var returnValue, _i, classesFromApi_1, item, newClasse;
            return __generator(this, function (_a) {
                returnValue = new Array();
                for (_i = 0, classesFromApi_1 = classesFromApi; _i < classesFromApi_1.length; _i++) {
                    item = classesFromApi_1[_i];
                    newClasse = new tbClass_1.TtClass();
                    newClasse.id = item.id;
                    newClasse.name = item.name;
                    returnValue.push(newClasse);
                }
                return [2 /*return*/, returnValue];
            });
        });
    }
})(DataInterface = exports.DataInterface || (exports.DataInterface = {}));
//# sourceMappingURL=dataInterface.js.map