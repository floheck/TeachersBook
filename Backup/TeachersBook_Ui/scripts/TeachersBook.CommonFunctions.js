"use strict";
(function (TeachersBook) {
        (function (CommonFunctions) {

        CommonFunctions.addCultureSpecificTexts = function (textMappings) {
            for(var i=0; textMappings.length > i; i++) {
                jQuery("#lst_" + textMappings[i].id).text(textMappings[i].text);
            }
        }

        CommonFunctions.validateMandatoryFormFields = function(formId) {
            var mandatoryFieldEmpty = true;
            var mandatoryFields = jQuery("form#" + formId + " input[required=required]");
            for(var i=0; mandatoryFields.length > i; i++) {
                if(jQuery(mandatoryFields[i]).val() == "" || jQuery(mandatoryFields[i]).val() == "Bitte ausfüllen!") {
                    jQuery(mandatoryFields[i]).addClass("mandatoryFieldNotFilled");
                    jQuery(mandatoryFields[i]).val("Bitte ausfüllen!");
                    mandatoryFieldEmpty = false;
                }
                else {
                    jQuery(mandatoryFields[i]).removeClass("mandatoryFieldNotFilled");
                }
            }
            return mandatoryFieldEmpty;
        }

        }(TeachersBook.CommonFunctions = TeachersBook.CommonFunctions || {}));
}(window.TeachersBook = window.TeachersBook || {}));
