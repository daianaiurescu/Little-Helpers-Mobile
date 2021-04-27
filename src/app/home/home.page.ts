import { Component} from '@angular/core';
import {ModalController} from '@ionic/angular';
import { ModalpopupPage } from '../modalpopup/modalpopup.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage{

  constructor(private modalController: ModalController) {}

  OpenModal(){
    this.modalController.create({component: ModalpopupPage}).then((modalElement) => {
      modalElement.present();
    })
  }
}