import { BaseViewModel } from '../baseViewModel';

export class NavigationViewModel implements BaseViewModel {

    public navBarExpanded: boolean = true;

    constructor() {
        this.toggleNavbar = this.toggleNavbar.bind(this);
    }

    public toggleNavbar(): void {
        this.navBarExpanded = !this.navBarExpanded;
    }
}