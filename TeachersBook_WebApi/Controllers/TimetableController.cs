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
        public IHttpActionResult GetComplete()
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
                var timetabel = user.TimeTables.FirstOrDefault<TimeTables>();

                var returnObj = new BLTimetable();

                foreach(var timetablerow in timetabel.TimeTableRows.OrderBy(x => x.lessonNo))
                {
                    BLSubjectsRow newRow = new BLSubjectsRow();
                    newRow.id = timetablerow.id.ToString();
                    newRow.rowType = timetablerow.rowType;
                    if (timetablerow.rowType == "subjects")
                    {
                        CreateLessonsRow(timetablerow, newRow);
                    }
                    else
                    {
                        CreateBreaksRow(timetablerow, newRow);
                    }

                    returnObj.rows.Add(newRow);
                }

                return Ok(returnObj);
            }
        }

        #region Create break row
        private static void CreateBreaksRow(TimeTableRows timetablerow, BLSubjectsRow newRow)
        {
            BLSubjectsRowItem rowDesc = CreateRowDesc(timetablerow);
            BLSubjectsRowItem breakMon = CreateBreakMon(timetablerow);
            BLSubjectsRowItem breakTue = CreateBreakTue(timetablerow);
            BLSubjectsRowItem breakWed = CreateBreakWed(timetablerow);
            BLSubjectsRowItem breakThu = CreateBreakThu(timetablerow);
            BLSubjectsRowItem breakFri = CreateBreakFri(timetablerow);
            BLSubjectsRowItem breakSat = CreateBreakSat(timetablerow);
            
            newRow.subjects.Add(rowDesc);
            newRow.subjects.Add(breakMon);
            newRow.subjects.Add(breakTue);
            newRow.subjects.Add(breakWed);
            newRow.subjects.Add(breakThu);
            newRow.subjects.Add(breakFri);
            newRow.subjects.Add(breakSat);
        }

        private static BLSubjectsRowItem CreateBreakMon(TimeTableRows timetablerow)
        {
            BLSubjectsRowItem TeachersBookBreak = new BLSubjectsRowItem();
            TeachersBookBreak.id = timetablerow.TimeTableBreaks1.id.ToString();
            TeachersBookBreak.day = 1;
            TeachersBookBreak.hour = timetablerow.lessonNo;
            TeachersBookBreak.description = timetablerow.TimeTableBreaks1.mon;
            return TeachersBookBreak;
        }

        private static BLSubjectsRowItem CreateBreakTue(TimeTableRows timetablerow)
        {
            BLSubjectsRowItem TeachersBookBreak = new BLSubjectsRowItem();
            TeachersBookBreak.id = timetablerow.TimeTableBreaks1.id.ToString();
            TeachersBookBreak.day = 2;
            TeachersBookBreak.hour = timetablerow.lessonNo;
            TeachersBookBreak.description = timetablerow.TimeTableBreaks1.tue;
            return TeachersBookBreak;
        }

        private static BLSubjectsRowItem CreateBreakWed(TimeTableRows timetablerow)
        {
            BLSubjectsRowItem TeachersBookBreak = new BLSubjectsRowItem();
            TeachersBookBreak.id = timetablerow.TimeTableBreaks1.id.ToString();
            TeachersBookBreak.day = 3;
            TeachersBookBreak.hour = timetablerow.lessonNo;
            TeachersBookBreak.description = timetablerow.TimeTableBreaks1.wed;
            return TeachersBookBreak;
        }

        private static BLSubjectsRowItem CreateBreakThu(TimeTableRows timetablerow)
        {
            BLSubjectsRowItem TeachersBookBreak = new BLSubjectsRowItem();
            TeachersBookBreak.id = timetablerow.TimeTableBreaks1.id.ToString();
            TeachersBookBreak.day = 4;
            TeachersBookBreak.hour = timetablerow.lessonNo;
            TeachersBookBreak.description = timetablerow.TimeTableBreaks1.thu;
            return TeachersBookBreak;
        }

        private static BLSubjectsRowItem CreateBreakFri(TimeTableRows timetablerow)
        {
            BLSubjectsRowItem TeachersBookBreak = new BLSubjectsRowItem();
            TeachersBookBreak.id = timetablerow.TimeTableBreaks1.id.ToString();
            TeachersBookBreak.day = 5;
            TeachersBookBreak.hour = timetablerow.lessonNo;
            TeachersBookBreak.description = timetablerow.TimeTableBreaks1.fri;
            return TeachersBookBreak;
        }

        private static BLSubjectsRowItem CreateBreakSat(TimeTableRows timetablerow)
        {
            BLSubjectsRowItem TeachersBookBreak = new BLSubjectsRowItem();
            TeachersBookBreak.id = timetablerow.TimeTableBreaks1.id.ToString();
            TeachersBookBreak.day = 6;
            TeachersBookBreak.hour = timetablerow.lessonNo;
            TeachersBookBreak.description = timetablerow.TimeTableBreaks1.sat;
            return TeachersBookBreak;
        }

        private static BLSubjectsRowItem CreateRowDesc(TimeTableRows timetablerow)
        {
            BLSubjectsRowItem TeachersBookBreak = new BLSubjectsRowItem();
            TeachersBookBreak.day = 0;
            TeachersBookBreak.hour = timetablerow.lessonNo;
            TeachersBookBreak.description = timetablerow.time;

            return TeachersBookBreak;
        }

        #endregion

        #region Create lesson row

        private static void CreateLessonsRow(TimeTableRows timetablerow, BLSubjectsRow newRow)
        {
            BLSubjectsRowItem rowDesc = CreateRowDesc(timetablerow);
            BLSubjectsRowItem subjectMon = CreateSubjectMon(timetablerow);
            BLSubjectsRowItem subjectTue = CreateSubjectTue(timetablerow);
            BLSubjectsRowItem subjectWed = CreateSubjectWed(timetablerow);
            BLSubjectsRowItem subjectThu = CreateSubjectThu(timetablerow);
            BLSubjectsRowItem subjectFri = CreateSubjectFri(timetablerow);
            BLSubjectsRowItem subjectSat = CreateSubjectSat(timetablerow);

            newRow.id = timetablerow.id.ToString();
            newRow.subjects.Add(rowDesc);
            newRow.subjects.Add(subjectMon);
            newRow.subjects.Add(subjectTue);
            newRow.subjects.Add(subjectWed);
            newRow.subjects.Add(subjectThu);
            newRow.subjects.Add(subjectFri);
            newRow.subjects.Add(subjectSat);
        }

        private static BLSubjectsRowItem CreateSubjectMon(TimeTableRows timetablerow)
        {
            BLSubjectsRowItem subject = new BLSubjectsRowItem();
            subject.id = timetablerow.TimeTableSubjects1.id.ToString();
            subject.day = 1;
            subject.hour = timetablerow.lessonNo;

            BLLesson lesson = new BLLesson();
            lesson.id = timetablerow.TimeTableSubjects1.Subjects != null ? timetablerow.TimeTableSubjects1.Subjects.id.ToString() : null;
            lesson.name = timetablerow.TimeTableSubjects1.Subjects != null ? timetablerow.TimeTableSubjects1.Subjects.description : null;
            lesson.color = timetablerow.TimeTableSubjects1.Subjects != null ? timetablerow.TimeTableSubjects1.Subjects.color : null;
            subject.lesson = lesson;
            return subject;
        }

        private static BLSubjectsRowItem CreateSubjectTue(TimeTableRows timetablerow)
        {
            BLSubjectsRowItem subject = new BLSubjectsRowItem();
            subject.id = timetablerow.TimeTableSubjects1.id.ToString();
            subject.day = 2;
            subject.hour = timetablerow.lessonNo;

            BLLesson lesson = new BLLesson();
            lesson.id = timetablerow.TimeTableSubjects1.Subjects1 != null ? timetablerow.TimeTableSubjects1.Subjects1.id.ToString() : null;
            lesson.name = timetablerow.TimeTableSubjects1.Subjects1 != null ? timetablerow.TimeTableSubjects1.Subjects1.description : null;
            lesson.color = timetablerow.TimeTableSubjects1.Subjects1 != null ? timetablerow.TimeTableSubjects1.Subjects1.color : null;
            subject.lesson = lesson;
            return subject;
        }

        private static BLSubjectsRowItem CreateSubjectWed(TimeTableRows timetablerow)
        {
            BLSubjectsRowItem subject = new BLSubjectsRowItem();
            subject.id = timetablerow.TimeTableSubjects1.id.ToString();
            subject.day = 3;
            subject.hour = timetablerow.lessonNo;

            BLLesson lesson = new BLLesson();
            lesson.id = timetablerow.TimeTableSubjects1.Subjects2 != null ? timetablerow.TimeTableSubjects1.Subjects2.id.ToString() : null;
            lesson.name = timetablerow.TimeTableSubjects1.Subjects2 != null ? timetablerow.TimeTableSubjects1.Subjects2.description : null;
            lesson.color = timetablerow.TimeTableSubjects1.Subjects2 != null ? timetablerow.TimeTableSubjects1.Subjects2.color : null;
            subject.lesson = lesson;
            return subject;
        }

        private static BLSubjectsRowItem CreateSubjectThu(TimeTableRows timetablerow)
        {
            BLSubjectsRowItem subject = new BLSubjectsRowItem();
            subject.id = timetablerow.TimeTableSubjects1.id.ToString();
            subject.day = 4;
            subject.hour = timetablerow.lessonNo;

            BLLesson lesson = new BLLesson();
            lesson.id = timetablerow.TimeTableSubjects1.Subjects3 != null ? timetablerow.TimeTableSubjects1.Subjects3.id.ToString() : null;
            lesson.name = timetablerow.TimeTableSubjects1.Subjects3 != null ? timetablerow.TimeTableSubjects1.Subjects3.description : null;
            lesson.color = timetablerow.TimeTableSubjects1.Subjects3 != null ? timetablerow.TimeTableSubjects1.Subjects3.color : null;
            subject.lesson = lesson;
            return subject;
        }

        private static BLSubjectsRowItem CreateSubjectFri(TimeTableRows timetablerow)
        {
            BLSubjectsRowItem subject = new BLSubjectsRowItem();
            subject.id = timetablerow.TimeTableSubjects1.id.ToString();
            subject.day = 5;
            subject.hour = timetablerow.lessonNo;

            BLLesson lesson = new BLLesson();
            lesson.id = timetablerow.TimeTableSubjects1.Subjects4 != null ? timetablerow.TimeTableSubjects1.Subjects4.id.ToString() : null;
            lesson.name = timetablerow.TimeTableSubjects1.Subjects4 != null ? timetablerow.TimeTableSubjects1.Subjects4.description : null;
            lesson.color = timetablerow.TimeTableSubjects1.Subjects4 != null ? timetablerow.TimeTableSubjects1.Subjects4.color: null;
            subject.lesson = lesson;
            return subject;
        }

        private static BLSubjectsRowItem CreateSubjectSat(TimeTableRows timetablerow)
        {
            BLSubjectsRowItem subject = new BLSubjectsRowItem();
            subject.id = timetablerow.TimeTableSubjects1.id.ToString();
            subject.day = 6;
            subject.hour = timetablerow.lessonNo;

            BLLesson lesson = new BLLesson();
            lesson.id = timetablerow.TimeTableSubjects1.Subjects5 != null ? timetablerow.TimeTableSubjects1.Subjects5.id.ToString() : null;
            lesson.name = timetablerow.TimeTableSubjects1.Subjects5 != null ? timetablerow.TimeTableSubjects1.Subjects5.description : null;
            lesson.color = timetablerow.TimeTableSubjects1.Subjects5 != null ? timetablerow.TimeTableSubjects1.Subjects5.color : null;
            subject.lesson = lesson;
            return subject;
        }

        #endregion

        [Authorize]
        [HttpGet]
        [Route("api/Timetable/getAllSubjects")]
        public IHttpActionResult GetAllSubjects()
        {
            using (var ctx = new TeachersBookEntities2())
            {
                var identity = (ClaimsIdentity)User.Identity;
                var id = ((ClaimsIdentity)User.Identity).FindFirst("id");

                var returnObj = new List<BLLesson>();

                var subjectsQuery =
                    from u in ctx.Subjects
                    where u.userId.ToString() == id.Value.ToString()
                    select u;

                var subjects = subjectsQuery.ToList<Subjects>();

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
