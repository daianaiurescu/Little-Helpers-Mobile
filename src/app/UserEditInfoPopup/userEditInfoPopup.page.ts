import {Component, OnInit} from '@angular/core';
import {User} from '../Models/User.interface';
import {ModalController} from '@ionic/angular';
import {UserService} from '../services/userService';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-userEditInfoPopup',
  templateUrl: './userEditInfoPopup.page.html',
  styleUrls: ['./userEditInfoPopup.page.scss'],
})
export class UserEditInfoPopupPage{
  user: User;
  constructor(private modalController: ModalController, private userService: UserService) {
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CloseModal() {
    this.modalController.dismiss();
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  SaveUserDetails(lastName, email): void {
    const data = {
      firstName: this.user.lastName,
      lastName: lastName.value,
      emailAddress: email.value
    };
    this.userService.editUserInfo(data).subscribe(
      response => {
        console.log('Good' + response);
        this.user.firstName = lastName.value;
        this.user.emailAddress = email.value;
      },
      error => {
        console.log('Bad' + error);
      }
    );
  }
}
