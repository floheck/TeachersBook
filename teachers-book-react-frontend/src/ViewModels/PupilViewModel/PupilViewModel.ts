import { BaseViewModel } from '../baseViewModel';
import { ClassViewModel } from '../ClassViewModel/ClassViewModel';

export class PupilViewModel extends BaseViewModel {
    public nickname: string;
    public firstname: string;
    public surname: string;
    public address: string;
    public zipCode: number;
    public city: string;
    public email: string;
    public phone: string;
    public sex: string;
    public contactPerson: string;
    public class = new ClassViewModel();
}