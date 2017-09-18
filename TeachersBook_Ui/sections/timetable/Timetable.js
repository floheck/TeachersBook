(function (TeachersBook) {
	(function (Section) {
		(function (Timetable) {

			Timetable.ViewModel = function (configuration, languageResource) {

                var viewModel = this;

                TeachersBook.Section.Timetable.authenticationToken = TeachersBook.Helper.getUrlParameter("accesstoken");

                TeachersBook.CommonFunctions.addCultureSpecificTexts(languageResource);

                jQuery('#cp2').colorpicker();
                
                viewModel.timetable = ko.observableArray();
                viewModel.afterRenderCounter = 1;
                viewModel.lastElementIdEdited = "-1";
                viewModel.lastValueBeforeChanged = "";
                viewModel.lastValueHasSaved = false;
                viewModel.lastElementEdited = ko.observable();

                viewModel.newSubjectName = ko.observable();
                viewModel.newSubjectSchoolGrade = ko.observable();
                viewModel.newSubjectColor = ko.observable("#00AABB");

                viewModel.subjects = ko.observableArray();

		        viewModel.dragItem = ko.observable();

                viewModel.clickSubjectLabel = function (value, event) {
                    if(value.inlineEditingAllowed) {
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
                    if (event.type == "click" || (event.type == "keyup" && event.key == "Enter")) {
                        viewModel.lastElementEdited().isNew = true;
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
                    viewModel.timetable()[data.hour].subjects()[data.day].content.schoolGrade(viewModel.dragItem().schoolGrade);
                    viewModel.timetable()[data.hour].subjects()[data.day].hasSubject(true);
                    viewModel.timetable()[data.hour].subjects()[data.day].isNew = true;
                    viewModel.timetable()[data.hour].subjects()[data.day].id = viewModel.dragItem().id;
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

                viewModel.deleteSubject = function(data, event) {
                    viewModel.timetable()[data.hour].subjects()[data.day].content.name("&nbsp;");
                    viewModel.timetable()[data.hour].subjects()[data.day].content.color("");
                    viewModel.timetable()[data.hour].subjects()[data.day].content.schoolGrade("");
                    viewModel.timetable()[data.hour].subjects()[data.day].hasSubject(false);
                    viewModel.timetable()[data.hour].subjects()[data.day].isNew = true;
                    jQuery(".timetable-remove-subject").style("opacity", "0");
                }

                viewModel.addNewSubjectRow = function(data, event) {
                    var newRow = {
                     rowtype: "subjects",
                     subjects : ko.observableArray([
                        {hour: data.hour + 1, day: 0, hasSubject: ko.observable(false), labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), isNew: true, content: {name : ko.observable("&nbsp;"), color: "transparent"}},
                        { hour: data.hour + 1, day: 1, hasSubject: ko.observable(false), labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), isNew: true, content: {name : ko.observable("&nbsp;"), schoolGrade : ko.observable(""), color : ko.observable("")}},
                        { hour: data.hour + 1, day: 2, hasSubject: ko.observable(true), labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), isNew: true, content: {name : ko.observable("&nbsp;"), schoolGrade: new ko.observable(""), color : new ko.observable("")}},
                        { hour: data.hour + 1, day: 3, hasSubject: ko.observable(true), labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), isNew: true, content: {name : ko.observable("&nbsp;"), schoolGrade: new ko.observable(""), color : new ko.observable("")}},
                        { hour: data.hour + 1, day: 4, hasSubject: ko.observable(true), labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), isNew: true, content: {name : ko.observable("&nbsp;"), schoolGrade: new ko.observable(""), color : new ko.observable("")}},
                        { hour: data.hour + 1, day: 5, hasSubject: ko.observable(true), labelVisible: ko.observable(true), inlineEditingVisible: ko.observable(false), isNew: true, content: {name : ko.observable("&nbsp;"), schoolGrade: new ko.observable(""), color : new ko.observable("")}}
                     ]),
                     isNew: true
                    };
                    debugger;
                    viewModel.timetable.splice(data.hour + 1, 0, newRow);
                    
                    for(var i = data.hour + 2; i<viewModel.timetable().length;i++) {
                        for(var j=0;j<viewModel.timetable()[i].subjects().length;j++) {
                            viewModel.timetable()[i].subjects()[j].hour = viewModel.timetable()[i].subjects()[j].hour + 1;
                        }
                    }
                }

                var getCompleteTimetable = jQuery.ajax({
                    url: "http://teachersbookwebapi.azurewebsites.net/api/Timetable/getComplete",
                    type: "GET",
                    headers: { "Authorization": "bearer " + TeachersBook.Section.Timetable.authenticationToken},
                    cache: false
                });

                var getAllSubjects = jQuery.ajax({
                    url: "http://teachersbookwebapi.azurewebsites.net/api/Timetable/getAllSubjects",
                    type: "GET",
                    headers: { "Authorization": "bearer " + TeachersBook.Section.Timetable.authenticationToken },
                    cache: false
                });
                
                waitingDialog.show();

                jQuery.when(getCompleteTimetable, getAllSubjects).done(function (dataTimeTable, dataSubjects) {
                    debugger;
                    for (var i = 0; i < dataTimeTable[0].rows.length; i++) {
                        var newRow = {
                            id: dataTimeTable[0].rows[i].id,
                            rowtype: dataTimeTable[0].rows[i].rowType,
                            subjects: ko.observableArray(),
                            isNew: false
                        }
                        
                        for (var j = 0; j < dataTimeTable[0].rows[i].subjects.length - 1; j++) {
                            var itemHasSubject = dataTimeTable[0].rows[i].subjects[j].day == 0 && dataTimeTable[0].rows[i].rowType == 'subjects' ? false : true;
                            var itemId = itemHasSubject ? dataTimeTable[0].rows[i].subjects[j].lesson.id : null;
                            var itemName = j == 0 || dataTimeTable[0].rows[i].rowType == 'break' ? dataTimeTable[0].rows[i].subjects[j].description : dataTimeTable[0].rows[i].subjects[j].lesson.name;
                            var itemColor = j == 0 || dataTimeTable[0].rows[i].rowType == 'break' ? "transparent" : "#" + dataTimeTable[0].rows[i].subjects[j].lesson.color;
                            var inlineEditingAllowed = j == 0 || dataTimeTable[0].rows[i].rowType == 'break' ? true : false;
                            var newSubject = { id: itemId, hour: dataTimeTable[0].rows[i].subjects[j].hour, day: dataTimeTable[0].rows[i].subjects[j].day, hasSubject: ko.observable(itemHasSubject), labelVisible: ko.observable(true), inlineEditingAllowed : inlineEditingAllowed, inlineEditingVisible: ko.observable(false), isNew: false, content: { name: ko.observable(itemName), schoolGrade: ko.observable(""), color: ko.observable(itemColor) } };
                            newRow.subjects.push(newSubject);
                        }
                        viewModel.timetable.push(newRow);
                    }
                    
                    for (var j = 0; j < dataSubjects[0].length; j++) {
                        var newSubject = { id: dataSubjects[0][j].id, name: dataSubjects[0][j].name, schoolGrade: "", color: "#" + dataSubjects[0][j].color };
                        viewModel.subjects.push(newSubject);
                    }
                    waitingDialog.hide();
                });

                getCompleteTimetable.fail(function (data) {
                    waitingDialog.hide();
                    debugger;
                });

                viewModel.saveChanges = function () {

                    for (var i = 0; i < viewModel.timetable.length; i++) {
                        var rows = new Array();
                        for (var j = 0; j < viewModel.timetable[i]().subjects.length; j++) {
                            var subjects = new Array();
                            if (viewModel.timetable[i]().subjects[j]().hasSubject())
                            var subject = {
                                "lesson": {
                                    "id": viewModel.timetable[i]().subjects[j]().content
                                }
                            }
                        }
                    }

                    var timetableWithChanges = {
                        "rows": [
                            {
                                "id": "",
                                "rowType": "",
                                "subjects": [
                                    {
                                        "lesson": null,
                                        "description": "",
                                        "id": "",
                                        "hour": 0,
                                        "day": 0,
                                    },
                                    {
                                        "lesson":
                                        {
                                            "id": "",
                                            "name": "",
                                            "blClass": null,
                                            "color": ""
                                        },
                                        "description": null,
                                        "id": "",
                                        "hour": 0,
                                        "day": 1
                                    },
                                    {
                                        "lesson":
                                        {
                                            "id": "",
                                            "name": "",
                                            "blClass": null,
                                            "color": ""
                                        },
                                        "description": null,
                                        "id": "",
                                        "hour": 0,
                                        "day": 2
                                    },
                                    {
                                        "lesson":
                                        {
                                            "id": "",
                                            "name": "",
                                            "blClass": null,
                                            "color": ""
                                        },
                                        "description": null,
                                        "id": "",
                                        "hour": 0,
                                        "day": 3
                                    },
                                    {
                                        "lesson":
                                        {
                                            "id": "",
                                            "name": "",
                                            "blClass": null,
                                            "color": ""
                                        },
                                        "description": null,
                                        "id": "",
                                        "hour": 0,
                                        "day": 4
                                    },
                                    {
                                        "lesson":
                                        {
                                            "id": "",
                                            "name": "",
                                            "blClass": null,
                                            "color": ""
                                        },
                                        "description": null,
                                        "id": "",
                                        "hour": 0,
                                        "day": 5
                                    },
                                    {
                                        "lesson":
                                        {
                                            "id": "",
                                            "name": "",
                                            "blClass": null,
                                            "color": ""
                                        },
                                        "description": null,
                                        "id": "",
                                        "hour": 0,
                                        "day": 6
                                    }
                                ]
                            }
                        ]
                    };
                }
			}

		}(Section.Timetable = Section.Timetable || {}));
	}(TeachersBook.Section = TeachersBook.Section || {}));
}(window.TeachersBook = window.TeachersBook || {}));
