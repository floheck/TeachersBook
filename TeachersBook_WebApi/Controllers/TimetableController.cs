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
        //[AllowAnonymous]
        //[HttpGet]
        //[Route("api/Timetable/forall")]
        //public IHttpActionResult Get()
        //{
        //    return Ok("Now server time is: " + DateTime.Now.ToString());
        //}

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
                    newRow.rowType = timetablerow.rowType;
                    if (timetablerow.rowType == "lesson")
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
            BLBreak rowDesc = CreateRowDesc(timetablerow);
            BLBreak breakMon = CreateBreakMon(timetablerow);
            BLBreak breakTue = CreateBreakTue(timetablerow);
            BLBreak breakWed = CreateBreakWed(timetablerow);
            BLBreak breakThu = CreateBreakThu(timetablerow);
            BLBreak breakFri = CreateBreakFri(timetablerow);
            BLBreak breakSat = CreateBreakSat(timetablerow);

            newRow.subjects.Add(rowDesc);
            newRow.subjects.Add(breakMon);
            newRow.subjects.Add(breakTue);
            newRow.subjects.Add(breakWed);
            newRow.subjects.Add(breakThu);
            newRow.subjects.Add(breakFri);
            newRow.subjects.Add(breakSat);
        }

        private static BLBreak CreateBreakMon(TimeTableRows timetablerow)
        {
            BLBreak TeachersBookBreak = new BLBreak();
            TeachersBookBreak.day = 1;
            TeachersBookBreak.hour = timetablerow.lessonNo;
            TeachersBookBreak.description = timetablerow.TimeTableBreaks1.mon;
            return TeachersBookBreak;
        }

        private static BLBreak CreateBreakTue(TimeTableRows timetablerow)
        {
            BLBreak TeachersBookBreak = new BLBreak();
            TeachersBookBreak.day = 2;
            TeachersBookBreak.hour = timetablerow.lessonNo;
            TeachersBookBreak.description = timetablerow.TimeTableBreaks1.tue;
            return TeachersBookBreak;
        }

        private static BLBreak CreateBreakWed(TimeTableRows timetablerow)
        {
            BLBreak TeachersBookBreak = new BLBreak();
            TeachersBookBreak.day = 3;
            TeachersBookBreak.hour = timetablerow.lessonNo;
            TeachersBookBreak.description = timetablerow.TimeTableBreaks1.wed;
            return TeachersBookBreak;
        }

        private static BLBreak CreateBreakThu(TimeTableRows timetablerow)
        {
            BLBreak TeachersBookBreak = new BLBreak();
            TeachersBookBreak.day = 4;
            TeachersBookBreak.hour = timetablerow.lessonNo;
            TeachersBookBreak.description = timetablerow.TimeTableBreaks1.thu;
            return TeachersBookBreak;
        }

        private static BLBreak CreateBreakFri(TimeTableRows timetablerow)
        {
            BLBreak TeachersBookBreak = new BLBreak();
            TeachersBookBreak.day = 5;
            TeachersBookBreak.hour = timetablerow.lessonNo;
            TeachersBookBreak.description = timetablerow.TimeTableBreaks1.fri;
            return TeachersBookBreak;
        }

        private static BLBreak CreateBreakSat(TimeTableRows timetablerow)
        {
            BLBreak TeachersBookBreak = new BLBreak();
            TeachersBookBreak.day = 6;
            TeachersBookBreak.hour = timetablerow.lessonNo;
            TeachersBookBreak.description = timetablerow.TimeTableBreaks1.sat;
            return TeachersBookBreak;
        }

        private static BLBreak CreateRowDesc(TimeTableRows timetablerow)
        {
            BLBreak TeachersBookBreak = new BLBreak();
            TeachersBookBreak.day = 0;
            TeachersBookBreak.hour = timetablerow.lessonNo;
            TeachersBookBreak.description = timetablerow.rowType == "lesson" ? timetablerow.time : "break";

            return TeachersBookBreak;
        }

        #endregion

        #region Create lesson row

        private static void CreateLessonsRow(TimeTableRows timetablerow, BLSubjectsRow newRow)
        {
            BLBreak rowDesc = CreateRowDesc(timetablerow);
            BLSubjects subjectMon = CreateSubjectMon(timetablerow);
            BLSubjects subjectTue = CreateSubjectTue(timetablerow);
            BLSubjects subjectWed = CreateSubjectWed(timetablerow);
            BLSubjects subjectThu = CreateSubjectThu(timetablerow);
            BLSubjects subjectFri = CreateSubjectFri(timetablerow);
            BLSubjects subjectSat = CreateSubjectSat(timetablerow);

            newRow.subjects.Add(rowDesc);
            newRow.subjects.Add(subjectMon);
            newRow.subjects.Add(subjectTue);
            newRow.subjects.Add(subjectWed);
            newRow.subjects.Add(subjectThu);
            newRow.subjects.Add(subjectFri);
            newRow.subjects.Add(subjectSat);
        }

        private static BLSubjects CreateSubjectMon(TimeTableRows timetablerow)
        {
            BLSubjects subject = new BLSubjects();
            subject.day = 1;
            subject.hour = timetablerow.lessonNo;

            BLLesson lesson = new BLLesson();
            lesson.name = timetablerow.TimeTableSubjects1.Subjects != null ? timetablerow.TimeTableSubjects1.Subjects.description : null;
            lesson.color = timetablerow.TimeTableSubjects1.Subjects != null ? timetablerow.TimeTableSubjects1.Subjects.color : null;
            subject.lesson = lesson;
            return subject;
        }

        private static BLSubjects CreateSubjectTue(TimeTableRows timetablerow)
        {
            BLSubjects subject = new BLSubjects();
            subject.day = 2;
            subject.hour = timetablerow.lessonNo;

            BLLesson lesson = new BLLesson();
            lesson.name = timetablerow.TimeTableSubjects1.Subjects1 != null ? timetablerow.TimeTableSubjects1.Subjects1.description : null;
            lesson.color = timetablerow.TimeTableSubjects1.Subjects1 != null ? timetablerow.TimeTableSubjects1.Subjects1.color : null;
            subject.lesson = lesson;
            return subject;
        }

        private static BLSubjects CreateSubjectWed(TimeTableRows timetablerow)
        {
            BLSubjects subject = new BLSubjects();
            subject.day = 3;
            subject.hour = timetablerow.lessonNo;

            BLLesson lesson = new BLLesson();
            lesson.name = timetablerow.TimeTableSubjects1.Subjects2 != null ? timetablerow.TimeTableSubjects1.Subjects2.description : null;
            lesson.color = timetablerow.TimeTableSubjects1.Subjects2 != null ? timetablerow.TimeTableSubjects1.Subjects2.color : null;
            subject.lesson = lesson;
            return subject;
        }

        private static BLSubjects CreateSubjectThu(TimeTableRows timetablerow)
        {
            BLSubjects subject = new BLSubjects();
            subject.day = 4;
            subject.hour = timetablerow.lessonNo;

            BLLesson lesson = new BLLesson();
            lesson.name = timetablerow.TimeTableSubjects1.Subjects3 != null ? timetablerow.TimeTableSubjects1.Subjects3.description : null;
            lesson.color = timetablerow.TimeTableSubjects1.Subjects3 != null ? timetablerow.TimeTableSubjects1.Subjects3.color : null;
            subject.lesson = lesson;
            return subject;
        }

        private static BLSubjects CreateSubjectFri(TimeTableRows timetablerow)
        {
            BLSubjects subject = new BLSubjects();
            subject.day = 5;
            subject.hour = timetablerow.lessonNo;

            BLLesson lesson = new BLLesson();
            lesson.name = timetablerow.TimeTableSubjects1.Subjects4 != null ? timetablerow.TimeTableSubjects1.Subjects4.description : null;
            lesson.color = timetablerow.TimeTableSubjects1.Subjects4 != null ? timetablerow.TimeTableSubjects1.Subjects4.color: null;
            subject.lesson = lesson;
            return subject;
        }

        private static BLSubjects CreateSubjectSat(TimeTableRows timetablerow)
        {
            BLSubjects subject = new BLSubjects();
            subject.day = 6;
            subject.hour = timetablerow.lessonNo;

            BLLesson lesson = new BLLesson();
            lesson.name = timetablerow.TimeTableSubjects1.Subjects5 != null ? timetablerow.TimeTableSubjects1.Subjects5.description : null;
            lesson.color = timetablerow.TimeTableSubjects1.Subjects5 != null ? timetablerow.TimeTableSubjects1.Subjects5.color : null;
            subject.lesson = lesson;
            return subject;
        }

        #endregion

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
