(function (TeachersBook) {
	(function (Section) {
		(function (Timetable) {

			Timetable.ViewModel = function (configuration, languageResource) {

				var viewModel = this;

                TeachersBook.CommonFunctions.addCultureSpecificTexts(languageResource);

                jQuery('#cp2').colorpicker();

                viewModel.afterRenderCounter = 1;
                viewModel.lastElementIdEdited = "-1";
                viewModel.lastValueBeforeChanged = "";
                viewModel.lastValueHasSaved = false;
                viewModel.lastElementEdited = ko.observable();

                viewModel.newSubjectName = ko.observable();
                viewModel.newSubjectSchoolGrade = ko.observable();
                viewModel.newSubjectColor = ko.observable("#00AABB");

		        viewModel.dragItem = ko.observable();

                viewModel.clickSubjectLabel = function (value, event) {
                    if(value.day == 0 || value.content.schoolGrade == undefined) {
		                if(!viewModel.lastValueHasSaved) {
		                    if(viewModel.lastElementEdited() != undefined) {
		                        viewModel.lastElementEdited().content.name(viewModel.lastValueBeforeChanged);
		                    }
		                }
		                value.inlineEditingVisible(true);
		                value.labelVisible(false);
		                if(viewModel.lastElementEdited() != undefined && viewModel.lastElementEdited() !== value) {
			                viewModel.lastElementEdited().inlineEditingVisible(false);
			                viewModel.lastElementEdited().labelVisible(true);
		                }

		                viewModel.lastValueBeforeChanged = value.content.name();
		                viewModel.lastElementEdited(value);
		                viewModel.lastValueHasSaved = false;
                    }
                }

                viewModel.saveInlineEditingChanges = function(value, event) {
                    if(event.type == "click" || (event.type == "keyup" && event.key == "Enter")) {
	                    viewModel.lastValueHasSaved = true;
	                    value.inlineEditingVisible(false);
	                    value.labelVisible(true);
                    }
                }

                viewModel.discardInlineEditingChanges = function(value, event) {
                    viewModel.lastValueHasSaved = false;
                    viewModel.lastElementEdited().content.name(viewModel.lastValueBeforeChanged);
                    value.inlineEditingVisible(false);
                    value.labelVisible(true);
                }

                viewModel.activateTooltips = function () {
                    jQuery('[data-toggle="tooltip"]').tooltip();
                }

			  	viewModel.replaceSubjectInTimetable = function (data, event) {
		  		    viewModel.timetable()[data.hour].subjects()[data.day].content.name(viewModel.dragItem().name);
		  		    viewModel.timetable()[data.hour].subjects()[data.day].content.color(viewModel.dragItem().color);
			  	}

                viewModel.openAddNewSubjectDialog = function () {
                    jQuery("#modal-AddSubject").modal("show");
                    viewModel.newSubjectName("");
                    viewModel.newSubjectSchoolGrade("");
                    viewModel.newSubjectColor("#00AABB");
                }

                viewModel.addNewSubject = function() {
                    if(TeachersBook.CommonFunctions.validateMandatoryFormFields("addNewSubjectForm")) {
                        viewModel.subjects.push({name: viewModel.newSubjectName(), schoolGrade: viewModel.newSubjectSchoolGrade(), color: viewModel.newSubjectColor()});
                        jQuery("#modal-AddSubject").modal("toggle");
                    }
                }

                viewModel.subjects = ko.observableArray([
                    {name : "Mathe", schoolGrade: "1A", color : "#e86f6f"}, 
                    {name : "Deutsch", schoolGrade: "3C", color : "#98e299"}
                ]);
                
				viewModel.timetable = ko.observableArray([
					{rowtype: "subjects",
                     subjects : ko.observableArray([
						{hour: 0, day: 0, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("7:30 - 8:15"), color: "transparent"}},
						{hour: 0, day: 1, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("&nbsp;"), schoolGrade : ko.observable(""), color : ko.observable("")}},
						{hour: 0, day: 2, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 0, day: 3, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("Mathe"), schoolGrade: new ko.observable("1A"), color : new ko.observable("#e86f6f")}},
						{hour: 0, day: 4, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 0, day: 5, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("Mathe"), schoolGrade: new ko.observable("1A"), color : new ko.observable("#e86f6f")}}
					])},
					{rowtype: "subjects",
                     subjects : ko.observableArray([
						{hour: 1, day: 0, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("8:20 - 9:05"), color: "transparent"}},
						{hour: 1, day: 1, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 1, day: 2, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 1, day: 3, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("Mathe"), schoolGrade: new ko.observable("1A"), color : new ko.observable("#e86f6f")}},
						{hour: 1, day: 4, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 1, day: 5, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("Mathe"), schoolGrade: new ko.observable("1A"), color : new ko.observable("#e86f6f")}}
					])},
                    {rowtype: "break",
                     subjects : ko.observableArray([
                        {hour: 2, day: 0, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("Pause"), color: "transparent"}},
                        {hour: 2, day: 1, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("FHE"), color: "transparent"}},
                        {hour: 2, day: 2, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("FHE"), color: "transparent"}},
                        {hour: 2, day: 3, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("FHE"), color: "transparent"}},
                        {hour: 2, day: 4, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("FHE"), color: "transparent"}},
                        {hour: 2, day: 5, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("FHE"), color: "transparent"}}
                    ])},
					{rowtype: "subjects",
                     subjects : ko.observableArray([
						{hour: 3, day: 0, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("9:25 - 10:10"), color: "transparent"}},
						{hour: 3, day: 1, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 3, day: 2, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 3, day: 3, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("Mathe"), schoolGrade: new ko.observable("1A"), color : new ko.observable("#e86f6f")}},
						{hour: 3, day: 4, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 3, day: 5, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("Mathe"), schoolGrade: new ko.observable("1A"), color : new ko.observable("#e86f6f")}}
					])},
					{rowtype: "subjects",
                     subjects : ko.observableArray([
						{hour: 4, day: 0, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("10:15 - 11:00"), color: "transparent"}},
						{hour: 4, day: 1, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 4, day: 2, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 4, day: 3, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("Mathe"), schoolGrade: new ko.observable("1A"), color : new ko.observable("#e86f6f")}},
						{hour: 4, day: 4, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 4, day: 5, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("Mathe"), schoolGrade: new ko.observable("1A"), color : new ko.observable("#e86f6f")}}
					])},
					{rowtype: "subjects",
                     subjects : ko.observableArray([
						{hour: 5, day: 0, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("11:10 - 11:55"), color: "transparent"}},
						{hour: 5, day: 1, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 5, day: 2, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 5, day: 3, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("Mathe"), schoolGrade: new ko.observable("1A"), color : new ko.observable("#e86f6f")}},
						{hour: 5, day: 4, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 5, day: 5, labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), content: {name : ko.observable("&nbsp;"), schoolGrade : new ko.observable(""), color : new ko.observable("")}}
					])}
				]);
			}

		}(Section.Timetable = Section.Timetable || {}));
	}(TeachersBook.Section = TeachersBook.Section || {}));
}(window.TeachersBook = window.TeachersBook || {}));
