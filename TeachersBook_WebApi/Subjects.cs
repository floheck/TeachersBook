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
    
    public partial class Subjects
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Subjects()
        {
            this.Ratings = new HashSet<Ratings>();
            this.SubjectToTimeTableHours = new HashSet<SubjectToTimeTableHours>();
        }
    
        public System.Guid id { get; set; }
        public Nullable<System.Guid> @class { get; set; }
        public string description { get; set; }
        public string color { get; set; }
        public System.Guid schoolYearId { get; set; }
    
        public virtual Classes Classes { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Ratings> Ratings { get; set; }
        public virtual SchoolYears SchoolYears { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SubjectToTimeTableHours> SubjectToTimeTableHours { get; set; }
    }
}
