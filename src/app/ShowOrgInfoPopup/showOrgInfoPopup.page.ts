import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-showOrgInfoPopup',
  templateUrl: './showOrgInfoPopup.page.html',
  styleUrls: ['./showOrgInfoPopup.page.scss'],
})

export class ShowOrgInfoPopupPage{
  organisation: any;
  constructor(private modalController: ModalController){}
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CloseModal() {
    this.modalController.dismiss();
  }
}
