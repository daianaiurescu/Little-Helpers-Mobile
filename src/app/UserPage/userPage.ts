import {Component, OnInit} from '@angular/core';
import {User} from '../Models/User.interface';
import {Organisation} from '../Models/Organisation.interface';
import {Subscription} from 'rxjs';
import {UserService} from '../services/userService';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {UserInformationPopupPage} from '../UserInformationPopup/userInformationPopup.page';
import {UserEditInfoPopupPage} from '../UserEditInfoPopup/userEditInfoPopup.page';
import {UserShowOrgPopupPage} from '../UserShowOrgPopup/userShowOrgPopup.page';
import {UserOrderPopupPage} from '../userOrdersPopup/userOrderPopup.page';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-userPage',
  templateUrl: './userPage.html',
  styleUrls: ['./userPage.scss'],
})

export class UserPage implements  OnInit{
  user: User;
  organisations: Organisation[];
  subscriptionUserService: Subscription;
  constructor(private userService: UserService , private route: ActivatedRoute, private modalController: ModalController, private router: Router) {}
  ngOnInit(): void {

    this.subscriptionUserService = this.userService.user
      .subscribe(user => {
        this.user = user;
      });
  }
  async showInfo(){
    const modal = await  this.modalController.create({
      component: UserInformationPopupPage,
      componentProps: { user: this.user }
    });
    return await modal.present();
  }
  async editInfo(){
    const modal = await  this.modalController.create({
      component: UserEditInfoPopupPage,
      componentProps: { user: this.user }
    });
    return await modal.present();
  }
  async viewOrders(){
    const modal = await  this.modalController.create({
      component: UserOrderPopupPage,
      componentProps: { user: this.user }
    });
    return await modal.present();
  }
  async viewOrg(){
    const modal = await  this.modalController.create({
      component: UserShowOrgPopupPage,
      componentProps: { user: this.user }
    });
    return await modal.present();
  }
  onLogout(): void {
    this.userService.logout();
  }
  goToCart(){
    this.router.navigate(['cart']);
  }
}
