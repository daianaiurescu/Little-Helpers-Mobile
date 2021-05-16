import {Component, OnInit} from '@angular/core';
import {User} from '../Models/User.interface';
import {ModalController} from '@ionic/angular';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-userInformationPopup',
  templateUrl: './userInformationPopup.page.html',
  styleUrls: ['./userInformationPopup.page.scss'],
})
export class UserInformationPopupPage{
  user: User;
  constructor(private modalController: ModalController) {
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CloseModal() {
    this.modalController.dismiss();
  }
}
