import { PupilsViewModel } from './Pupils/PupilsViewModel';
import { ClassViewModel } from './ClassViewModel/ClassViewModel';
import { PupilViewModel } from './PupilViewModel/PupilViewModel';

export class ViewModelFactory {
    public loadPupilsViewModel(): PupilsViewModel {
        const newPupilsViewModel = new PupilsViewModel();
        const class1 = new ClassViewModel();
        const class2 = new ClassViewModel();

        class1.name = "Klasse 1";
        for(let counter = 0; counter < 24; counter++) {
            const newPupil = new PupilViewModel();
            newPupil.nickname = "Mini";
            newPupil.firstname = "Marc";
            newPupil.surname = "Müller";
            newPupil.address = "Oberkollenbach 7c";
            newPupil.zipCode = 51515;
            newPupil.city = "Kürten";
            newPupil.class = class1;
            class1.pupils.push(newPupil);
        }
        
        class2.name = "Klasse 2";
        for(let counter = 0; counter < 24; counter++) {
            const newPupil = new PupilViewModel();
            newPupil.nickname = "Mini";
            newPupil.firstname = "Marc";
            newPupil.surname = "Müller";
            newPupil.address = "Oberkollenbach 7c";
            newPupil.zipCode = 51515;
            newPupil.city = "Kürten";
            newPupil.class = class2;
            class2.pupils.push(newPupil);
        }
        
        newPupilsViewModel.addClass(class1);
        newPupilsViewModel.addClass(class2);

        return newPupilsViewModel;
    }
}