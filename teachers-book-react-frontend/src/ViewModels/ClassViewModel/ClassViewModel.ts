import { BaseViewModel } from '../baseViewModel';
import { TableViewModel } from '../Table/tableViewModel';
import { TableRowViewModel } from '../Table/tableRowViewModel';
import { PupilViewModel } from '../PupilViewModel/PupilViewModel';
import { TableCellViewModel } from '../Table/tableCellViewModel';

export class ClassViewModel extends BaseViewModel{
    public pupils = new Array<PupilViewModel>();
    public pupilsTable = new TableViewModel();
    public name: string;

    // public fromModel() {

    // }

    // public toModel() {

    // }

    public addPupil(nickname: string, firstname: string, surname: string, address?: string, zipcode?: number, city?: string) {
        const newPupil = new PupilViewModel();
        newPupil.nickname = nickname;
        newPupil.firstname = firstname;
        newPupil.surname = surname;
        newPupil.address = address === undefined ? "" : address;
        newPupil.zipCode = zipcode === undefined ? -1 : zipcode;
        newPupil.city = city === undefined ? "" : city;
        this.pupils.push(newPupil);
    }

    
    public getPupilsAsTable(): TableViewModel {
        const newTable = new TableViewModel();
        let counter = 1;
        
        newTable.header.cells.push(new TableCellViewModel(1, "Nachname", true));
        newTable.header.cells.push(new TableCellViewModel(2, "Vorname", true));
        newTable.header.cells.push(new TableCellViewModel(3, "Geschlecht", false));
        newTable.header.cells.push(new TableCellViewModel(4, "Telefon", true));
        newTable.header.cells.push(new TableCellViewModel(5, "E-Mail", false));
        newTable.header.cells.push(new TableCellViewModel(6, "Adresse", false));

        for(const pupil of this.pupils) {
            const newTalbeRow = new TableRowViewModel();
            newTalbeRow.cells.push(new TableCellViewModel(counter, pupil.surname, true));
            newTalbeRow.cells.push(new TableCellViewModel(counter, pupil.firstname, true));
            newTalbeRow.cells.push(new TableCellViewModel(counter, pupil.sex, false));
            newTalbeRow.cells.push(new TableCellViewModel(counter, pupil.phone, true));
            newTalbeRow.cells.push(new TableCellViewModel(counter, pupil.email, false));
            newTalbeRow.cells.push(new TableCellViewModel(counter, pupil.address + ", " + pupil.zipCode + " " + pupil.city, false));
            newTable.body.push(newTalbeRow);

            counter++;
        }

        return newTable;
    }
}