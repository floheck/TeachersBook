(function (TeachersBook) {
	(function (Section) {
		(function (Timetable) {

			Timetable.ViewModel = function (configuration) {

				var viewModel = this;

				viewModel.drag_start_index = ko.observable();
			        viewModel.drag_target_index = ko.observable();
			        viewModel.dragging = ko.computed(function() {
			            return viewModel.drag_start_index() >= 0;
			        });
			        viewModel.dragItem = ko.observable();

				viewModel.subjects = ko.observableArray([
					{name : "Mathe", class: "1A", color : "#e86f6f"}, 
					{name : "Deutsch", class: "3C", color : "#98e299"}
			  	]);

			  	viewModel.replaceSubjectInTimetable = function (data, event) {
		  		    viewModel.timetable()[data.hour].subjects()[data.day].content.name(viewModel.dragItem().name);
		  		    viewModel.timetable()[data.hour].subjects()[data.day].content.color(viewModel.dragItem().color);
			  	}

			  	viewModel.swap = function(from, to) {
			  	debugger;
			           if (to > viewModel.subjects().length - 1 || to < 0) return;

			            var fromObj = viewModel.subjects()[from];
			            var toObj = viewModel.subjects()[to];
			            viewModel.subjects()[to] = fromObj;
			            viewModel.subjects()[from] = toObj;
			            viewModel.subjects.valueHasMutated()
			        }

				viewModel.timetable = ko.observableArray([
					{subjects : ko.observableArray([
						{hour: 0, day: 0, content: {name : "7:30 - 8:15", color: "transparent"}},
						{hour: 0, day: 1, content: {name : new ko.observable(""), class : ko.observable(""), color : ko.observable("")}},
						{hour: 0, day: 2, content: {name : new ko.observable("Deutsch"), class: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 0, day: 3, content: {name : new ko.observable("Mathe"), class: new ko.observable("1A"), color : new ko.observable("#e86f6f")}},
						{hour: 0, day: 4, content: {name : new ko.observable("Deutsch"), class: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 0, day: 5, content: {name : new ko.observable("Mathe"), class: new ko.observable("1A"), color : new ko.observable("#e86f6f")}}
					])},
					{subjects : ko.observableArray([
						{hour: 1, day: 0, content: {name : "8:20 - 9:05", color: "transparent"}},
						{hour: 1, day: 1, content: {name : new ko.observable("Deutsch"), class: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 1, day: 2, content: {name : new ko.observable("Deutsch"), class: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 1, day: 3, content: {name : new ko.observable("Mathe"), class: new ko.observable("1A"), color : new ko.observable("#e86f6f")}},
						{hour: 1, day: 4, content: {name : new ko.observable("Deutsch"), class: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 1, day: 5, content: {name : new ko.observable("Mathe"), class: new ko.observable("1A"), color : new ko.observable("#e86f6f")}}
					])},
					{subjects : ko.observableArray([
						{hour: 2, day: 0, content: {name : "9:25 - 10:10", color: "transparent"}},
						{hour: 2, day: 1, content: {name : new ko.observable("Deutsch"), class: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 2, day: 2, content: {name : new ko.observable("Deutsch"), class: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 2, day: 3, content: {name : new ko.observable("Mathe"), class: new ko.observable("1A"), color : new ko.observable("#e86f6f")}},
						{hour: 2, day: 4, content: {name : new ko.observable("Deutsch"), class: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 2, day: 5, content: {name : new ko.observable("Mathe"), class: new ko.observable("1A"), color : new ko.observable("#e86f6f")}}
					])},
					{subjects : ko.observableArray([
						{hour: 3, day: 0, content: {name : "10:15 - 11:00", color: "transparent"}},
						{hour: 3, day: 1, content: {name : new ko.observable("Deutsch"), class: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 3, day: 2, content: {name : new ko.observable("Deutsch"), class: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 3, day: 3, content: {name : new ko.observable("Mathe"), class: new ko.observable("1A"), color : new ko.observable("#e86f6f")}},
						{hour: 3, day: 4, content: {name : new ko.observable("Deutsch"), class: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 3, day: 5, content: {name : new ko.observable("Mathe"), class: new ko.observable("1A"), color : new ko.observable("#e86f6f")}}
					])},
					{subjects : ko.observableArray([
						{hour: 4, day: 0, content: {name : "11:10 - 11:55", color: "transparent"}},
						{hour: 4, day: 1, content: {name : new ko.observable("Deutsch"), class: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 4, day: 2, content: {name : new ko.observable("Deutsch"), class: new ko.observable("3C"), color : new ko.observable("#98e299")}},
						{hour: 4, day: 3, content: {name : new ko.observable("Mathe"), class: new ko.observable("1A"), color : new ko.observable("#e86f6f")}},
						{hour: 4, day: 4, content: {name : "Deutsch", class: "3C", color : "#98e299"}},
						{hour: 4, day: 5, content: {name : new ko.observable(""), class : new ko.observable(""), color : new ko.observable("")}}
					])}
				]);
			}

			ko.bindingHandlers.flash = {
			    init: function(element) {
			        $(element).hide();
			    },
			    update: function(element, valueAccessor) {
			        var value = ko.utils.unwrapObservable(valueAccessor());
			        if (value) {
			            $(element).stop().hide().text(value).fadeIn(function() {
			                clearTimeout($(element).data("timeout"));
			                $(element).data("timeout", setTimeout(function() {
			                    $(element).fadeOut();
			                    valueAccessor()(null);
			                }, 3000));
			            });
			        }
			    },
			    timeout: null
			};

			//ko.bindingHandlers.sortable.beforeMove = vm.verifyAssignment;
			//ko.bindingHandlers.sortable.afterMove = vm.updateLastAction;

		}(Section.Timetable = Section.Timetable || {}));
	}(TeachersBook.Section = TeachersBook.Section || {}));
}(window.TeachersBook = window.TeachersBook || {}));
