export class Helper {
    getUrlParameter(sParam: string): string {
        let sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] == undefined ? "true" : sParameterName[1];
            }
        }
    }

    addCultureSpecificTexts(textMappings: any) {
        for (let i = 0; textMappings.length > i; i++) {
            jQuery("#lst_" + textMappings[i].id).text(textMappings[i].text);
        }
    }

    validateMandatoryFormFields(formId: string) {
        let mandatoryFieldEmpty = true;
        let mandatoryFields = jQuery("form#" + formId + " input[required=required]");
        for (let i = 0; mandatoryFields.length > i; i++) {
            if (jQuery(mandatoryFields[i]).val() == "" || jQuery(mandatoryFields[i]).val() == "Bitte ausfüllen!") {
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
}