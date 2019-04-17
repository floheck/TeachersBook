export class SharePointField {
    readonly FieldType: SharePointField.FieldType;

    constructor(inputType: SharePointField.FieldType) {
        this.FieldType = inputType;
    }
}
export namespace SharePointField {
    export enum FieldType { Text, Number, Date, Choice, PeoplePicker }
}