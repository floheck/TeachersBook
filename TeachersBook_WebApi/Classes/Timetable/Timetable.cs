using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TeachersBook_WebApi.InternalClasses.Timetable
{
    public class BLTimetable
    {
        List<BLSubjectsRow> _rows;
        public List<BLSubjectsRow> rows
        {
            get
            {
                return _rows;
            }
            set
            {
                _rows = value;
            }
        } 
        
        public BLTimetable()
        {
            _rows = new List<BLSubjectsRow>();
        }
    }

    public class BLSubjectsRow
    {
        List<BLSubjectsRowItem> _subjects;

        public string rowType { get; set; }
        public List<BLSubjectsRowItem> subjects
        {
            get
            {
                return _subjects;
            }
            set
            {
                _subjects = value;
            }
        }

        public BLSubjectsRow()
        {
            _subjects = new List<BLSubjectsRowItem>();
        }
    }

    public class BLSubjectsRowItem
    {
        public int hour { get; set; }
        public int day { get; set; }
    }

    public class BLSubjects : BLSubjectsRowItem
    {
        public BLLesson lesson { get; set; }
    }

    public class BLBreak : BLSubjectsRowItem
    {
        public string description { get; set; }
    }

    public class BLLesson
    {
        public string name { get; set; }
        public BLClass blClass { get; set; }
        public string color { get; set; }
    }

    public class BLClass
    {
        public string name { get; set; }
    }
}