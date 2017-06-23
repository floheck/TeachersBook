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

                viewModel.newSubjectName = ko.observable();
                viewModel.newSubjectSchoolGrade = ko.observable();
                viewModel.newSubjectColor = ko.observable("#00AABB");

		        viewModel.dragItem = ko.observable();

                viewModel.timetableIsRendered = function(elements, data, item) {
                    if(viewModel.afterRenderCounter == viewModel.timetable().length){
                        jQuery("#timetable input:text").parent().prev("li").on("click", function() {
                            if(!viewModel.lastValueHasSaved) {
                                var temp = viewModel.lastElementIdEdited.substring(viewModel.lastElementIdEdited.indexOf('_') + 1);
                                var hour = temp.substring(0, temp.indexOf('_'));
                                var day = temp.substring(temp.lastIndexOf('_') + 1);
                                if(day > -1) {
                                    viewModel.timetable()[hour].subjects()[day].content.name(viewModel.lastValueBeforeChanged);
                                }
                            }
                            jQuery(".timetable-inline-edit-wrapper").hide();
                            jQuery(".draggable.timetable-subject").show();
                            jQuery(".timetable-subject.timetable-no-border").show();
                            jQuery(this).hide();
                            jQuery(this).next().show();
                            viewModel.lastValueBeforeChanged = jQuery(this).next().find("input").val();
                            viewModel.lastElementIdEdited = jQuery(this).next().find("input")[0].id;
                            viewModel.lastValueHasSaved = false;
                        });
                    }
                    viewModel.afterRenderCounter++;
                }

                viewModel.saveInlineEditingChanges = function() {
                    viewModel.lastValueHasSaved = true;
                    jQuery(".timetable-inline-edit-wrapper").hide();
                    jQuery(".draggable.timetable-subject").show();
                    jQuery(".timetable-subject.timetable-no-border").show();
                }

                viewModel.discardInlineEditingChanges = function(value, event) {
                    viewModel.lastValueHasSaved = false;
                    viewModel.timetable()[value.hour].subjects()[value.day].content.name(viewModel.lastValueBeforeChanged);
                    jQuery(".timetable-inline-edit-wrapper").hide();
                    jQuery(".draggable.timetable-subject").show();
                    jQuery(".timetable-subject.timetable-no-border").show();
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
						{hour: 0, day: 0, content: {name : ko.observable("7:30 - 8:15"), color: "transparent"}},
						{hour: 0, day: 1, content: {name : ko.observable("&nbsp;"), schoolGrade : ko.observable(""), color : ko.observable("")}},
						{hour: 0, day: 2, content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 0, day: 3, content: {name : ko.observable("Mathe"), schoolGrade: new ko.observable("1A"), color : new ko.observable("#e86f6f")}},
						{hour: 0, day: 4, content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 0, day: 5, content: {name : ko.observable("Mathe"), schoolGrade: new ko.observable("1A"), color : new ko.observable("#e86f6f")}}
					])},
					{rowtype: "subjects",
                     subjects : ko.observableArray([
						{hour: 1, day: 0, content: {name : ko.observable("8:20 - 9:05"), color: "transparent"}},
						{hour: 1, day: 1, content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 1, day: 2, content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 1, day: 3, content: {name : ko.observable("Mathe"), schoolGrade: new ko.observable("1A"), color : new ko.observable("#e86f6f")}},
						{hour: 1, day: 4, content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 1, day: 5, content: {name : ko.observable("Mathe"), schoolGrade: new ko.observable("1A"), color : new ko.observable("#e86f6f")}}
					])},
                    {rowtype: "break",
                     subjects : ko.observableArray([
                        {hour: 2, day: 0, content: {name : ko.observable("Pause"), color: "transparent"}},
                        {hour: 2, day: 1, content: {name : ko.observable("FHE"), color: "transparent"}},
                        {hour: 2, day: 2, content: {name : ko.observable("FHE"), color: "transparent"}},
                        {hour: 2, day: 3, content: {name : ko.observable("FHE"), color: "transparent"}},
                        {hour: 2, day: 4, content: {name : ko.observable("FHE"), color: "transparent"}},
                        {hour: 2, day: 5, content: {name : ko.observable("FHE"), color: "transparent"}}
                    ])},
					{rowtype: "subjects",
                     subjects : ko.observableArray([
						{hour: 3, day: 0, content: {name : ko.observable("9:25 - 10:10"), color: "transparent"}},
						{hour: 3, day: 1, content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 3, day: 2, content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 3, day: 3, content: {name : ko.observable("Mathe"), schoolGrade: new ko.observable("1A"), color : new ko.observable("#e86f6f")}},
						{hour: 3, day: 4, content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 3, day: 5, content: {name : ko.observable("Mathe"), schoolGrade: new ko.observable("1A"), color : new ko.observable("#e86f6f")}}
					])},
					{rowtype: "subjects",
                     subjects : ko.observableArray([
						{hour: 4, day: 0, content: {name : ko.observable("10:15 - 11:00"), color: "transparent"}},
						{hour: 4, day: 1, content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 4, day: 2, content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 4, day: 3, content: {name : ko.observable("Mathe"), schoolGrade: new ko.observable("1A"), color : new ko.observable("#e86f6f")}},
						{hour: 4, day: 4, content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 4, day: 5, content: {name : ko.observable("Mathe"), schoolGrade: new ko.observable("1A"), color : new ko.observable("#e86f6f")}}
					])},
					{rowtype: "subjects",
                     subjects : ko.observableArray([
						{hour: 5, day: 0, content: {name : ko.observable("11:10 - 11:55"), color: "transparent"}},
						{hour: 5, day: 1, content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 5, day: 2, content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 5, day: 3, content: {name : ko.observable("Mathe"), schoolGrade: new ko.observable("1A"), color : new ko.observable("#e86f6f")}},
						{hour: 5, day: 4, content: {name : ko.observable("Deutsch"), schoolGrade: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 5, day: 5, content: {name : ko.observable("&nbsp;"), schoolGrade : new ko.observable(""), color : new ko.observable("")}}
					])}
				]);
			}

		}(Section.Timetable = Section.Timetable || {}));
	}(TeachersBook.Section = TeachersBook.Section || {}));
}(window.TeachersBook = window.TeachersBook || {}));
