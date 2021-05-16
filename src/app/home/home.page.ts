import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import { ModalpopupPage } from '../modalpopup/modalpopup.page';
import {User} from '../Models/User.interface';
import {Subscription} from 'rxjs';
import {UserService} from '../services/userService';
import {Router} from '@angular/router';
import {ForgotpasswordPage} from '../ForgotPasswordPopup/forgotpassword.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  forgotPasswordPopupVisible: boolean;
  createAnAccountPopupVisible: boolean;
  user: User;
  users: User[];
  email: string;
  getAllUsersSubscription: Subscription;
  errorSignUp: string;
  errorSignIn: string;
  errorSignInFail = false;
  roles = ['user', 'organisation'];
  selectedRole: string;
  constructor(private userService: UserService, private router: Router, private modalController: ModalController) {
  }
  ngOnInit(): void {
    this.getAllUsersSubscription = this.userService.getUsers().subscribe( response => {
      this.users = response;
    });

  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  SingIn(email, password): void {
    const data = {
      username : email.value,
      password : password.value
    };
    this.userService.signin(data)
      .subscribe(
        response => {
          this.user = response;
          this.userService.authHandler(this.user);
          this.router.navigate(['/welcome']);
        },
        error => {
          this.errorSignInFail = true;
          this.errorSignIn = 'Invalid username/password';
        });
  }
  setUserRole($event): void{
    this.selectedRole = $event;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  OpenModal(){
    this.modalController.create({component: ModalpopupPage}).then((modalElement) => {
      modalElement.present();
    });
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  OpenForgotPasswordModal(){
    this.modalController.create({component: ForgotpasswordPage}).then((modalElement) => {
      modalElement.present();
    });
  }
}
