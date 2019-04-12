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

                var returnObj = new Timetable();

                foreach (var timetablerow in timetabel.TimeTableRows.OrderBy(x => x.rowNo))
                {
                    TtSubjectsRow newRow = new TtSubjectsRow();
                    newRow.id = timetablerow.id.ToString();
                    newRow.start = timetablerow.start;
                    newRow.end = timetablerow.end;
                    int currentRowNo = timetablerow.rowNo ?? default(int);

                    TtSubjectsRowItem TeachersBookDescriptionItem = new TtSubjectsRowItem();
                    TeachersBookDescriptionItem.day = 0;
                    TeachersBookDescriptionItem.hour = currentRowNo;
                    TeachersBookDescriptionItem.description = timetablerow.start + " - " + timetablerow.end;

                    newRow.subjects.Add(TeachersBookDescriptionItem);

                    var items = timetablerow.TimeTableIItems.ToList<TimeTableIItems>();

                    foreach (TimeTableIItems item in items)
                    {
                        if (item.type == "subject")
                        {
                            newRow.rowType = "subject";
                            TtSubjectsRowItem newRowItem = new TtSubjectsRowItem();
                            newRowItem.day = item.day ?? default(int);
                            newRowItem.hour = currentRowNo;
                            newRowItem.description = item.description;
                            newRowItem.id = item.id.ToString();

                            TtLesson newLesson = new TtLesson();
                            newLesson.id = item.SubjectToTimeTableHours.Subjects.id.ToString();
                            newLesson.name = item.SubjectToTimeTableHours.Subjects.description;
                            newLesson.color = item.SubjectToTimeTableHours.Subjects.color;

                            TtClass newClass = new TtClass();
                            newClass.id = item.SubjectToTimeTableHours.Subjects.Classes.id.ToString();
                            newClass.name = item.SubjectToTimeTableHours.Subjects.Classes.name;

                            newLesson.TtClass = newClass;
                            newRowItem.lesson = newLesson;

                            newRow.subjects.Add(newRowItem);
                        }
                        else
                        {
                            newRow.rowType = "break";
                            TtSubjectsRowItem newRowItem = new TtSubjectsRowItem();
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

                var returnObj = new List<TtLesson>();

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
                    TtLesson subjectToAdd = new TtLesson();
                    subjectToAdd.id = subject.id.ToString();
                    subjectToAdd.name = subject.description;
                    subjectToAdd.color = subject.color;
                    var subjectClass = new TtClass();
                    subjectClass.id = subject.Classes.id.ToString();
                    subjectClass.name = subject.Classes.name;
                    subjectToAdd.TtClass = subjectClass;

                    returnObj.Add(subjectToAdd);
                }

                return Ok(returnObj);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("api/Timetable/getAllClasses")]
        public IHttpActionResult GetAllClasses(string schoolYear)
        {
            using (var ctx = new TeachersBookEntities2())
            {
                var identity = (ClaimsIdentity)User.Identity;
                var id = ((ClaimsIdentity)User.Identity).FindFirst("id");

                var returnObj = new List<TtClass>();

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
                var subjects = _schoolYear.Classes.ToList<Classes>();

                foreach (var schoolClass in subjects.OrderBy(x => x.name))
                {
                    TtClass schoolClassToAdd = new TtClass();
                    schoolClassToAdd.id = schoolClass.id.ToString();
                    schoolClassToAdd.name = schoolClass.name;

                    returnObj.Add(schoolClassToAdd);
                }

                return Ok(returnObj);
            }
        }

        [Authorize]
        [HttpPost]
        [Route("api/Timetable/addSubject")]
        public HttpResponseMessage AddSubject([FromBody] TtLesson newSubject, [FromUri] string schoolYear)
        {
            try
            {
                using (var ctx = new TeachersBookEntities2())
                {
                    var identity = (ClaimsIdentity)User.Identity;
                    var id = ((ClaimsIdentity)User.Identity).FindFirst("id");

                    var returnObj = new List<TtLesson>();

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

                    var currentSchoolClass =
                        from sy in ctx.Classes
                        where sy.SchoolYears.schoolYear == schoolYear && sy.id.ToString() == newSubject.TtClass.id
                        select sy;

                    var newSubjectItem = new Subjects();
                    newSubjectItem.color = newSubject.color;
                    newSubjectItem.description = newSubject.name;
                    newSubjectItem.id = Guid.NewGuid();
                    newSubjectItem.@class = currentSchoolClass.FirstOrDefault<Classes>().id;
                    _schoolYear.Subjects.Add(newSubjectItem);

                    ctx.SaveChanges();

                    return Request.CreateResponse(HttpStatusCode.OK, "success! New item id: " + newSubjectItem.id.ToString());
                }
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "error: "+ ex.Message.ToString());
            }
        }

        [Authorize]
        [HttpDelete]
        [Route("api/Timetable/removeSubject")]
        public HttpResponseMessage RemoveSubject([FromUri] string subjectToRemoveId, [FromUri] string schoolYear)
        {
            try
            {
                using (var ctx = new TeachersBookEntities2())
                {
                    var identity = (ClaimsIdentity)User.Identity;
                    var id = ((ClaimsIdentity)User.Identity).FindFirst("id");

                    var returnObj = new List<TtLesson>();

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

                    var subjectToRemoveQuery =
                        from su in _schoolYear.Subjects
                        where su.id.ToString() == subjectToRemoveId
                        select su;

                    var subjectItemToRemove = subjectToRemoveQuery.FirstOrDefault<Subjects>();
                    
                    ctx.Subjects.Remove(subjectItemToRemove);

                    ctx.SaveChanges();

                    return Request.CreateResponse(HttpStatusCode.OK, "success");
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "error: " + ex.Message.ToString());
            }
        }

        [Authorize]
        [HttpPost]
        [Route("api/Timetable/setAllSubjects")]
        public HttpResponseMessage SetAllSubjects([FromBody] Timetable timetable, [FromUri] string schoolYear)
        {
            int rowCounter = 0;
            int columnCounter = 0;

            try
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

                    var timetabelDb = _schoolYear.TimeTables.FirstOrDefault<TimeTables>();
                    var timetableRowsDb = timetabelDb.TimeTableRows.OrderBy(x => x.rowNo).ToList();

                    foreach (var timetablerow in timetable.rows)
                    {
                        if (rowCounter > timetableRowsDb.Count - 1)
                        {
                            //last row is new
                            AddNewRowToTimetable(ctx, rowCounter, timetabelDb, timetablerow);
                        }
                        else
                        {
                            if (timetableRowsDb[rowCounter].id.ToString() != timetablerow.id)
                            {
                                //rowNo chnaged
                            }

                            if (timetablerow.isNew)
                            {
                                //row is new
                                AddNewRowToTimetable(ctx, rowCounter, timetabelDb, timetablerow);
                            }
                        }

                        //TtSubjectsRowItem TeachersBookDescriptionItem = new TtSubjectsRowItem();
                        //TeachersBookDescriptionItem.day = 0;
                        //TeachersBookDescriptionItem.hour = currentRowNo;
                        //TeachersBookDescriptionItem.description = timetablerowDb.start + " - " + timetablerowDb.end;

                        //timetableRow.subjects.Add(TeachersBookDescriptionItem);

                        //var items = timetablerowDb.TimeTableIItems.ToList<TimeTableIItems>();

                        //foreach (TimeTableIItems item in items)
                        //{
                        //    if (item.type == "subject")
                        //    {
                        //        timetableRow.rowType = "subject";
                        //        TtSubjectsRowItem newRowItem = new TtSubjectsRowItem();
                        //        newRowItem.day = item.day ?? default(int);
                        //        newRowItem.hour = currentRowNo;
                        //        newRowItem.description = item.description;
                        //        newRowItem.id = item.id.ToString();

                        //        TtLesson newLesson = new TtLesson();
                        //        newLesson.id = item.SubjectToTimeTableHours.Subjects.id.ToString();
                        //        newLesson.name = item.SubjectToTimeTableHours.Subjects.description;
                        //        newLesson.color = item.SubjectToTimeTableHours.Subjects.color;

                        //        TtClass newClass = new TtClass();
                        //        newClass.id = item.SubjectToTimeTableHours.Subjects.Classes.id.ToString();
                        //        newClass.name = item.SubjectToTimeTableHours.Subjects.Classes.name;

                        //        newLesson.TtClass = newClass;
                        //        newRowItem.lesson = newLesson;

                        //        timetableRow.subjects.Add(newRowItem);
                        //    }
                        //    else
                        //    {
                        //        timetableRow.rowType = "break";
                        //        TtSubjectsRowItem newRowItem = new TtSubjectsRowItem();
                        //        newRowItem.id = item.id.ToString();
                        //        newRowItem.day = item.day ?? default(int);
                        //        newRowItem.hour = currentRowNo;
                        //        newRowItem.description = item.description;

                        //        timetableRow.subjects.Add(newRowItem);
                        //    }
                        //}

                        rowCounter++;
                    }

                    ctx.SaveChanges();
                }

                return Request.CreateResponse(HttpStatusCode.OK, "success");
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, string.Format("Error while saving timetable! Error occured at row {0}. Message: '{1}'", rowCounter.ToString(), ex.Message));
            }
        }

        private static void AddNewRowToTimetable(TeachersBookEntities2 ctx, int rowCounter, TimeTables timetabelDb, TtSubjectsRow timetablerow)
        {
            try
            {
                TimeTableRows newRowDb = new TimeTableRows();
                newRowDb.id = Guid.NewGuid();
                newRowDb.rowNo = rowCounter;
                newRowDb.timetable = timetabelDb.id;
                var startEnd = timetablerow.subjects[0].description.Split('-');
                newRowDb.start = startEnd[0].Trim();
                newRowDb.end = startEnd.Length > 1 ? startEnd[1].Trim() : "";
                ctx.TimeTableRows.Add(newRowDb);
            }
            catch(Exception ex)
            {
                Console.WriteLine("Error");
            }
        }

        private static void AddAllSubjectsOfNewRowToTimetable(TimeTableRows newRow, TeachersBookEntities2 ctx, int rowCounter, TtSubjectsRow timetablerow)
        {
            int counter = 0;

            foreach (var subject in timetablerow.subjects) {
                if (counter > 1)
                {
                    TimeTableIItems newTimetableItem = new TimeTableIItems();
                    newTimetableItem.id = Guid.NewGuid();
                    newTimetableItem.day = counter;
                    newTimetableItem.type = "subject";

                    SubjectToTimeTableHours newTimetableItemDetails = new SubjectToTimeTableHours();
                    newTimetableItemDetails.timetableId = newTimetableItem.id;
                    newTimetableItemDetails.subjectId = Guid.Parse(subject.lesson.id);
                    
                    newRow.TimeTableIItems.Add(newTimetableItem);

                    counter++;
                }
            }
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
