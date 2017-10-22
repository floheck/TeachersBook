import { Timetable, SubjectRow, SubjectRowItem } from "./model/timetable";
import { Lesson } from "./model/lesson";
import { TbClass } from "./model/tbClass";
import { Helper } from "./helper";

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

    export async function getAllSubjects(test: string): Promise<Lesson[]> {
        console.log(test);
        let helper = new Helper();

        let allSubjectsResult = await jQuery.ajax({
            url: "http://teachersbookwebapi.azurewebsites.net/api/Timetable/getAllSubjects?schoolYear=" + encodeURI(test),
            type: "GET",
            headers: { "Authorization": "bearer " + helper.getUrlParameter("accesstoken") },
            cache: false
        });

        let allSubjects = mapSubjectsToModel(allSubjectsResult);

        return allSubjects;
    }

    async function mapTimetableToModel(timetableFromApi: any): Promise<Timetable> {
        try {
            let timetable = new Timetable();

            console.log(timetableFromApi);

            for (let row of timetableFromApi.rows) {
                let newRow = new SubjectRow();
                newRow.id = row.id;
                newRow.rowType = row.rowType;

                let newRowItems = new Array<SubjectRowItem>();
                for (let rowItem of row.subjects) {
                    let newRowItem = new SubjectRowItem();
                    newRowItem.id = rowItem.id;
                    newRowItem.hour = rowItem.hour;
                    newRowItem.day = rowItem.day;
                    newRowItem.description = rowItem.description;
                    
                    if (rowItem.lesson != null) {
                        let newLesson = new Lesson();
                        newLesson.id = rowItem.lesson.id;
                        newLesson.name = rowItem.lesson.name;
                        newLesson.color = rowItem.lesson.color;
                        let newClass = new TbClass();
                        newClass.name = rowItem.lesson.blClass.name;
                        newLesson.tbClass = newClass;
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

    async function mapSubjectsToModel(subjectsFromApi: any): Promise<Lesson[]> {
        let returnValue = new Array<Lesson>();
        
        for (let item of subjectsFromApi) {
            let newSubject = new Lesson();
            newSubject.id = item.id;
            newSubject.name = item.name;
            newSubject.color = item.color;
            newSubject.tbClass = item.blClass;
            returnValue.push(newSubject);
        }

        return returnValue;
    }
}