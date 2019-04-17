"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This class represents a generic viewmodel as a base class.
 */
var ModelViewModel = (function () {
    /**
     * Creates a new viewmodel.
     * @param model: the model the viewmodel is based on
     */
    function ModelViewModel(model) {
        if (model) {
            this.internalModel = model;
        }
    }
    return ModelViewModel;
}());
exports.ModelViewModel = ModelViewModel;
//# sourceMappingURL=viewModelBase.js.map