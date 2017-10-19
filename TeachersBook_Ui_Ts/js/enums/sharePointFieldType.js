"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SharePointField = (function () {
    function SharePointField(inputType) {
        this.FieldType = inputType;
    }
    return SharePointField;
}());
exports.SharePointField = SharePointField;
(function (SharePointField) {
    var FieldType;
    (function (FieldType) {
        FieldType[FieldType["Text"] = 0] = "Text";
        FieldType[FieldType["Number"] = 1] = "Number";
        FieldType[FieldType["Date"] = 2] = "Date";
        FieldType[FieldType["Choice"] = 3] = "Choice";
        FieldType[FieldType["PeoplePicker"] = 4] = "PeoplePicker";
    })(FieldType = SharePointField.FieldType || (SharePointField.FieldType = {}));
})(SharePointField = exports.SharePointField || (exports.SharePointField = {}));
exports.SharePointField = SharePointField;
//# sourceMappingURL=sharePointFieldType.js.map