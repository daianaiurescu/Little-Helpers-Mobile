import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {UserService} from '../services/userService';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.page.html',
  styleUrls: ['./modalpopup.page.scss'],
})
export class ModalpopupPage implements OnInit {

  errorSignUp: string;
  errorSignUpFail = false;
  roles = ['user', 'organisation'];
  constructor(private modalController: ModalController, private userService: UserService) { }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  SignUp(firstName, lastName, email, password, role): void {

    const data = {
      firstName: firstName.value,
      lastName: lastName.value,
      emailAddress: email.value,
      password: password.value,
      role: role.value
    };
    this.userService.create(data)
      .subscribe(
        response => {
          this.errorSignUp = 'Registration Complete';
        },
        error => {
          if (error.error.text === undefined) {
            this.errorSignUp =  error.error;
          }
          else { this.errorSignUp = 'Registration complete'; }
          this.errorSignUpFail = true;
        });
  }

  ngOnInit() {
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  CloseModal() {
    this.modalController.dismiss();
  }

}
