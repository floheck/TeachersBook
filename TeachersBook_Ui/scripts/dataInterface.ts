import { Timetable } from "./model/timetable";
import { Lesson } from "./model/lesson";
import { TbClass } from "./model/tbClass";
import { Helper } from "./helper";

export class DataInterface {
    public async getCompleteTimetable(): Promise<void> {

        let helper = new Helper();

        let timetable = await jQuery.ajax({
            url: "http://teachersbookwebapi.azurewebsites.net/api/Timetable/getComplete",
            type: "GET",
            headers: { "Authorization": "bearer " + helper.getUrlParameter("accesstoken") },
            cache: false
        });

        return timetable;
    }
    public async getAllSubjects(): Promise<void> {

        let helper = new Helper();

        let allSubjects = await jQuery.ajax({
            url: "http://teachersbookwebapi.azurewebsites.net/api/Timetable/getAllSubjects",
            type: "GET",
            headers: { "Authorization": "bearer " + helper.getUrlParameter("accesstoken") },
            cache: false
        });

        return allSubjects;
    }
}