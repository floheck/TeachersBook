(function(TeachersBook) {

	TeachersBook.Sections = [
		{
			id: "sec-timetable",
			section: "Timetable",
			sectionPath: "../sections/timetable/",
			sectionMenu: "Stundenplan",
			sectionMenuFontAwsome: "fa fa-table"
		}
	];

	TeachersBook.SectionLoader.init();

}(window.TeachersBook = window.TeachersBook || {}));