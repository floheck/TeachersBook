using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TeachersBook_WebApi.InternalClasses.Timetable
{
    public class Timetable
    {
        List<TtSubjectsRow> _rows;
        public List<TtSubjectsRow> rows
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
        
        public Timetable()
        {
            _rows = new List<TtSubjectsRow>();
        }
    }

    public class TtSubjectsRow
    {
        List<TtSubjectsRowItem> _subjects;

        public string id { get; set; }
        public string rowType { get; set; }
        public List<TtSubjectsRowItem> subjects
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
        public bool isNew { get; set; }
        public string start { get; set; }
        public string end { get; set; }

        public TtSubjectsRow()
        {
            _subjects = new List<TtSubjectsRowItem>();
        }
    }

    public class TtSubjectsRowItem
    {
        public string id { get; set; }
        public int hour { get; set; }
        public int day { get; set; }
        public TtLesson lesson { get; set; }
        public string description { get; set; }
    }

    // Wegen Schwirigkeiten bei der Rückgabe an den Webservice als JSON Objekt erstmal wieder eine Klasse daraus gemacht!
    //public class BLSubjects : BLSubjectsRowItem
    //{
    //    public BLLesson lesson { get; set; }
    //}

    //public class BLBreak : BLSubjectsRowItem
    //{
    //    public string description { get; set; }
    //}

    public class TtLesson
    {
        public string id { get; set; }
        public string name { get; set; }
        public TtClass TtClass { get; set; }
        public string color { get; set; }
        public bool isNew { get; set; }
    }

    public class TtClass
    {
        public string id { get; set; }
        public string name { get; set; }
    }
}