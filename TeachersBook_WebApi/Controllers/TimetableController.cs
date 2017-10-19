using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using TeachersBook_WebApi.InternalClasses.Timetable;

namespace TeachersBook_WebApi.Controllers
{
    public class TimetableController : ApiController
    {

        [Authorize]
        [HttpGet]
        [Route("api/Timetable/getTest")]
        public IHttpActionResult getTest()
        {
            return Ok("Test");
        }
        
        [Authorize]
        [HttpGet]
        [Route("api/Timetable/getComplete")]
        public IHttpActionResult GetComplete(string schoolYear)
        {
            using (var ctx = new TeachersBookEntities2())
            {
                var identity = (ClaimsIdentity)User.Identity;
                var id = ((ClaimsIdentity)User.Identity).FindFirst("id");

                var userQuery =
                    from u in ctx.UserData
                    where u.id.ToString() == id.Value.ToString()
                    select u;

                var user = userQuery.FirstOrDefault<UserData>();

                var schoolYearsQuery =
                    from sy in user.SchoolYears
                    where sy.schoolYear.ToString() == schoolYear
                    select sy;

                var _schoolYear = schoolYearsQuery.FirstOrDefault<SchoolYears>();

                var timetabel = _schoolYear.TimeTables.FirstOrDefault<TimeTables>();

                var returnObj = new BLTimetable();

                foreach(var timetablerow in timetabel.TimeTableRows.OrderBy(x => x.rowNo))
                {
                    BLSubjectsRow newRow = new BLSubjectsRow();
                    newRow.id = timetablerow.id.ToString();
                    int currentRowNo = timetablerow.rowNo ?? default(int);

                    BLSubjectsRowItem TeachersBookDescriptionItem = new BLSubjectsRowItem();
                    TeachersBookDescriptionItem.day = 0;
                    TeachersBookDescriptionItem.hour = currentRowNo;
                    TeachersBookDescriptionItem.description = timetablerow.start + " - " + timetablerow.end;

                    newRow.subjects.Add(TeachersBookDescriptionItem);

                    var items = timetablerow.TimeTableIItems.ToList<TimeTableIItems>();

                    foreach(TimeTableIItems item in items)
                    {
                        if(item.type == "subject")
                        {
                            newRow.rowType = "subject";
                            BLSubjectsRowItem newRowItem = new BLSubjectsRowItem();
                            newRowItem.day = item.day ?? default(int);
                            newRowItem.hour = currentRowNo;
                            newRowItem.description = item.description;
                            newRowItem.id = item.id.ToString();

                            BLLesson newLesson = new BLLesson();
                            newLesson.id = item.SubjectToTimeTableHours.Subjects.id.ToString();
                            newLesson.name = item.SubjectToTimeTableHours.Subjects.description;
                            newLesson.color = item.SubjectToTimeTableHours.Subjects.color;

                            BLClass newClass = new BLClass();
                            newClass.name = item.SubjectToTimeTableHours.Subjects.Classes.name;

                            newLesson.blClass = newClass;
                            newRowItem.lesson = newLesson;

                            newRow.subjects.Add(newRowItem);
                        }
                        else
                        {
                            newRow.rowType = "break";
                            BLSubjectsRowItem newRowItem = new BLSubjectsRowItem();
                            newRowItem.id = item.id.ToString();
                            newRowItem.day = item.day ?? default(int);
                            newRowItem.hour = currentRowNo;
                            newRowItem.description = item.description;

                            newRow.subjects.Add(newRowItem);
                        }
                    }

                    returnObj.rows.Add(newRow);
                }

                return Ok(returnObj);
            }
        }
        
        [Authorize]
        [HttpGet]
        [Route("api/Timetable/getAllSubjects")]
        public IHttpActionResult GetAllSubjects(string schoolYear)
        {
            using (var ctx = new TeachersBookEntities2())
            {
                var identity = (ClaimsIdentity)User.Identity;
                var id = ((ClaimsIdentity)User.Identity).FindFirst("id");

                var returnObj = new List<BLLesson>();

                var userQuery =
                    from u in ctx.UserData
                    where u.id.ToString() == id.Value.ToString()
                    select u;

                var user = userQuery.FirstOrDefault<UserData>();

                var schoolYearsQuery =
                    from sy in user.SchoolYears
                    where sy.schoolYear.ToString() == schoolYear
                    select sy;

                var _schoolYear = schoolYearsQuery.FirstOrDefault<SchoolYears>();
                var subjects = _schoolYear.Subjects.ToList<Subjects>();
                
                foreach (var subject in subjects.OrderBy(x => x.description))
                {
                    BLLesson subjectToAdd = new BLLesson();
                    subjectToAdd.id = subject.id.ToString();
                    subjectToAdd.name = subject.description;
                    subjectToAdd.color = subject.color;

                    returnObj.Add(subjectToAdd);
                }

                return Ok(returnObj);
            }
        }

        [Authorize]
        [HttpPost]
        [Route("api/Timetable/setAllSubjects")]
        public HttpResponseMessage SetAllSubjects([FromBody] BLTimetable timetable )
        {

            return Request.CreateResponse(HttpStatusCode.OK, "success");
        }

        [Authorize(Roles = "admin")]
        [HttpGet]
        [Route("api/Timetable/authorize")]
        public IHttpActionResult GetForAdmin()
        {
            var identity = (ClaimsIdentity)User.Identity;
            var roles = identity.Claims
                        .Where(c => c.Type == ClaimTypes.Role)
                        .Select(c => c.Value);
            return Ok("Hello " + identity.Name + " Role: " + string.Join(",", roles.ToList()));
        }
    }
}
