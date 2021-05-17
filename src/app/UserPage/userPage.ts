import {Component, OnInit} from '@angular/core';
import {User} from '../Models/User.interface';
import {Organisation} from '../Models/Organisation.interface';
import {Subscription} from 'rxjs';
import {UserService} from '../services/userService';
import {ActivatedRoute} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {UserInformationPopupPage} from '../UserInformationPopup/userInformationPopup.page';
import {UserEditInfoPopupPage} from '../UserEditInfoPopup/userEditInfoPopup.page';
import {UserShowOrgPopupPage} from '../UserShowOrgPopup/userShowOrgPopup.page';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-userPage',
  templateUrl: './userPage.html',
  styleUrls: ['./userPage.scss'],
})

export class UserPage implements  OnInit{
  user: User;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  InfopopupVisible = false;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  EditpopupVisible = false;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ViewOrgVisible: boolean;
  failViewOrgVisible: boolean;
  organisations: Organisation[];
  getAllOrganisationsSubscription: Subscription;
  idUser: string = this.route.snapshot.paramMap.get('id');
  subscriptionUserService: Subscription;
  constructor(private userService: UserService , private route: ActivatedRoute, private modalController: ModalController) {}
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
  async viewOrg(){
    const modal = await  this.modalController.create({
      component: UserShowOrgPopupPage,
      componentProps: { user: this.user }
    });
    return await modal.present();
  }
  onLogout():void {
    this.userService.logout();
  }
}
