//------------------------------------------------------------------------------
// <auto-generated>
//     Der Code wurde von einer Vorlage generiert.
//
//     Manuelle Änderungen an dieser Datei führen möglicherweise zu unerwartetem Verhalten der Anwendung.
//     Manuelle Änderungen an dieser Datei werden überschrieben, wenn der Code neu generiert wird.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TeachersBook_WebApi
{
    using System;
    using System.Collections.Generic;
    
    public partial class Ratings
    {
        public System.Guid id { get; set; }
        public Nullable<int> rating { get; set; }
        public string comment { get; set; }
        public System.Guid subjectId { get; set; }
        public System.Guid pupilId { get; set; }
    
        public virtual Pupils Pupils { get; set; }
        public virtual Subjects Subjects { get; set; }
    }
}
