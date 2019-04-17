import { BaseViewModel } from '../baseViewModel';
import { TableViewModel } from '../Table/tableViewModel';
import { TableRowViewModel } from '../Table/tableRowViewModel';
import { PupilViewModel } from '../PupilViewModel/PupilViewModel';
import { TableCellViewModel } from '../Table/tableCellViewModel';
import { Guid } from 'src/Utils/guid';

export class ClassViewModel extends BaseViewModel{
    public id: string;
    public pupils = new Array<PupilViewModel>();
    public pupilsTable = new TableViewModel();
    public name: string;

    // public fromModel() {

    // }

    // public toModel() {

    // }

    public addPupil(nickname: string, firstname: string, surname: string, address?: string, zipcode?: string, city?: string, phone?: string, email?: string) {
        const newPupil = new PupilViewModel();
        newPupil.id = Guid.newGuid();
        newPupil.nickname = nickname;
        newPupil.firstname = firstname;
        newPupil.surname = surname;
        newPupil.address = address === undefined ? "" : address;
        newPupil.zipCode = zipcode === undefined ? "" : zipcode;
        newPupil.city = city === undefined ? "" : city;
        newPupil.phone = phone === undefined ? "" : phone;
        newPupil.email = email === undefined ? "" : email;
        this.pupils.push(newPupil);
        this.pupilsTable = this.getPupilsAsTable();
        this.pupilsTable.update = true;
    }

    public addPupilViewModel(newPupil: PupilViewModel) {
        this.pupils.push(newPupil);
        this.pupilsTable = this.getPupilsAsTable();
        this.pupilsTable.update = true;
    }

    public updatePupil(id: string, updatedPupil: PupilViewModel) {
        for(let pupil of this.pupils) {
            if(pupil.id === id) {
                pupil = updatedPupil;
                break;
            }
        }
        this.pupilsTable = this.getPupilsAsTable();
        this.pupilsTable.update = true;
    }
    
    private getPupilsAsTable(): TableViewModel {
        const newTable = new TableViewModel();
        let counter = 1;
        
        newTable.header.cells.push(new TableCellViewModel(1, "Nachname", false));
        newTable.header.cells.push(new TableCellViewModel(2, "Vorname", false));
        newTable.header.cells.push(new TableCellViewModel(3, "Geschlecht", true));
        newTable.header.cells.push(new TableCellViewModel(4, "Telefon", false));
        newTable.header.cells.push(new TableCellViewModel(5, "E-Mail", true));
        newTable.header.cells.push(new TableCellViewModel(6, "Adresse", true));

        for(const pupil of this.pupils) {
            const newTalbeRow = new TableRowViewModel();
            newTalbeRow.id = pupil.id;
            newTalbeRow.cells.push(new TableCellViewModel(counter, pupil.surname, false));
            newTalbeRow.cells.push(new TableCellViewModel(counter, pupil.firstname, false));
            newTalbeRow.cells.push(new TableCellViewModel(counter, pupil.sex, true));
            newTalbeRow.cells.push(new TableCellViewModel(counter, pupil.phone, false));
            newTalbeRow.cells.push(new TableCellViewModel(counter, pupil.email, true));
            newTalbeRow.cells.push(new TableCellViewModel(counter, pupil.address + ", " + pupil.zipCode + " " + pupil.city, true));
            newTalbeRow.update = pupil.update;
            newTable.body.push(newTalbeRow);
            
            counter++;
        }

        return newTable;
    }
}