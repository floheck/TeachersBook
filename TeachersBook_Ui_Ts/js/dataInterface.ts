import { Timetable, TtSubjectRow, TtSubjectRowItem } from "./model/timetable";
import { TtLesson } from "./model/lesson";
import { TtClass } from "./model/tbClass";
import { Helper } from "./helper";
import { WebApiAddItemResponse } from "./model/webApiResponse";

export module DataInterface {
    export async function getCompleteTimetable(schoolYear: string): Promise<Timetable> {

        let helper = new Helper(); 

        let timetableResult = await jQuery.ajax({
            url: "http://teachersbookwebapi.azurewebsites.net/api/Timetable/getComplete?schoolYear=" + encodeURI(schoolYear),
            type: "GET",
            headers: { "Authorization": "bearer " + helper.getUrlParameter("accesstoken") },
            cache: false
        });

        let timetable = mapTimetableToModel(timetableResult);

        return timetable;
    }

    export async function getAllSubjects(schoolYear: string): Promise<TtLesson[]> {
        let helper = new Helper();

        let allSubjectsResult = await jQuery.ajax({
            url: "http://teachersbookwebapi.azurewebsites.net/api/Timetable/getAllSubjects?schoolYear=" + encodeURI(schoolYear),
            type: "GET",
            headers: { "Authorization": "bearer " + helper.getUrlParameter("accesstoken") },
            cache: false
        });

        let allSubjects = mapSubjectsToModel(allSubjectsResult);

        return allSubjects;
    }

    export async function getAllClasses(schoolYear: string): Promise<TtClass[]> {
        let helper = new Helper();

        let allSchoolClassesResult = await jQuery.ajax({
            url: "http://teachersbookwebapi.azurewebsites.net/api/Timetable/getAllClasses?schoolYear=" + encodeURI(schoolYear),
            type: "GET",
            headers: { "Authorization": "bearer " + helper.getUrlParameter("accesstoken") },
            cache: false
        });

        let allSubjects = mapSchoolClassesToModel(allSchoolClassesResult);

        return allSubjects;
    }

    export async function addSubject(schoolYear: string, newSubject: TtLesson): Promise<WebApiAddItemResponse> {
        let helper = new Helper();
        let returnValue = new WebApiAddItemResponse();

        let addSubjectsResult = await jQuery.ajax({
            url: "http://teachersbookwebapi.azurewebsites.net/api/Timetable/addSubject?schoolYear=" + encodeURI(schoolYear),
            type: "POST",
            headers: { "Authorization": "bearer " + helper.getUrlParameter("accesstoken") },
            dataType: "json",
            data: newSubject
        });
        console.log(addSubjectsResult);
        returnValue.status = addSubjectsResult.substring(0, addSubjectsResult.indexOf("!"));
        returnValue.newId = addSubjectsResult.substring(addSubjectsResult.indexOf(":") + 1).trim();
        console.log(returnValue);
        return returnValue;
    }

    export async function updateTimetable(schoolYear: string, timetable: Timetable): Promise<WebApiAddItemResponse> {
        let helper = new Helper();
        let returnValue = new WebApiAddItemResponse();

        return returnValue;
    }

    export async function deleteSubject(schoolYear: string, subjectToDeleteId: string): Promise<boolean> {
        let helper = new Helper();
        let success: boolean = false;
        
        let addSubjectsResult = await jQuery.ajax({
            url: "http://teachersbookwebapi.azurewebsites.net/api/Timetable/removeSubject?schoolYear=" + encodeURI(schoolYear) + "&subjectToRemoveId=" + subjectToDeleteId,
            type: "DELETE",
            headers: { "Authorization": "bearer " + helper.getUrlParameter("accesstoken") },
        });
        console.log(addSubjectsResult);
        return success;
    }

    async function mapTimetableToModel(timetableFromApi: any): Promise<Timetable> {
        try {
            let timetable = new Timetable();

            console.log(timetableFromApi);

            for (let row of timetableFromApi.rows) {
                let newRow = new TtSubjectRow();
                newRow.id = row.id;
                newRow.start = row.start;
                newRow.end = row.end;
                newRow.rowType = row.rowType;

                let newRowItems = new Array<TtSubjectRowItem>();
                for (let rowItem of row.subjects) {
                    let newRowItem = new TtSubjectRowItem();
                    newRowItem.id = rowItem.id;
                    newRowItem.hour = rowItem.hour;
                    newRowItem.day = rowItem.day;
                    newRowItem.description = rowItem.description;
                    
                    if (rowItem.lesson != null) {
                        let newLesson = new TtLesson();
                        newLesson.id = rowItem.lesson.id;
                        newLesson.name = rowItem.lesson.name;
                        newLesson.color = rowItem.lesson.color;
                        let newClass = new TtClass();
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

            return timetable;
        }
        catch (Error) {
            console.log("Error while pasing getCompleteTimetable result into model. Message: " + Error.Message);
        }
    }

    async function mapSubjectsToModel(subjectsFromApi: any): Promise<TtLesson[]> {
        let returnValue = new Array<TtLesson>();
        
        for (let item of subjectsFromApi) {
            let newSubject = new TtLesson();
            newSubject.id = item.id;
            newSubject.name = item.name;
            newSubject.color = item.color;
            newSubject.TtClass = item.TtClass;
            returnValue.push(newSubject);
        }

        return returnValue;
    }

    async function mapSchoolClassesToModel(classesFromApi: any): Promise<TtClass[]> {
        let returnValue = new Array<TtClass>();

        for (let item of classesFromApi) {
            let newClasse = new TtClass();
            newClasse.id = item.id;
            newClasse.name = item.name;
            returnValue.push(newClasse);
        }

        return returnValue;
    }
}