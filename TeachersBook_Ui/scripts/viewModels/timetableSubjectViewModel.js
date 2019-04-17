System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TimetableSubjectViewModel;
    return {
        setters: [],
        execute: function () {
            TimetableSubjectViewModel = (function () {
                function TimetableSubjectViewModel() {
                    this.id = null;
                    this.hour = null;
                    this.day = null;
                    this.inlineEditingAllowed = false;
                    this.isNew = false;
                    this.content = null;
                }
                return TimetableSubjectViewModel;
            }());
            exports_1("TimetableSubjectViewModel", TimetableSubjectViewModel);
        }
    };
});
//# sourceMappingURL=timetableSubjectViewModel.js.map