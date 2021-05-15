import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {UserService} from '../services/userService';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  errorChangePassword: string;
  errorChangePasswordFail: boolean;
  constructor(private modalController: ModalController, private userService: UserService) { }
  ngOnInit(): void {
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ChangePassword(email, password): void {
    const data = {
      username : email.value,
      password : password.value
    };
    this.userService.changePassword(data).subscribe(
      response => {
        console.log('Good' + response);
      },
      error => {
        this.errorChangePasswordFail = true;
        if (error.error.text === undefined) {
          this.errorChangePassword = error.error;
        }
        else { this.errorChangePassword = 'Changed password'; }
      }
    );
    console.log(this.errorChangePassword);
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CloseModal() {
    this.modalController.dismiss();
  }

}
