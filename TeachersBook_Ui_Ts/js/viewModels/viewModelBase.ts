
/**
 * This class represents a generic viewmodel as a base class.
 */
export abstract class ModelViewModel<T> {

    protected internalModel: T;

    /**
     * Creates a new viewmodel.
     * @param model: the model the viewmodel is based on
     */
    constructor(model: T) {
        if (model) {
            this.internalModel = model;
        }
    }
}