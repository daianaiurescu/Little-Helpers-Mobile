import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalpopupvolPage } from '../modalpopupvol/modalpopupvol.page';
import { Organisation } from '../Models/Organisation.interface';

@Component({
  selector: 'app-modalpopuporg',
  templateUrl: './modalpopuporg.page.html',
  styleUrls: ['./modalpopuporg.page.scss'],
})
@Injectable({
  providedIn: 'root'
})
export class ModalpopuporgPage implements OnInit {

  @Input()
  selectedOrganisation: Organisation;
  constructor(private modalController: ModalController) { }

  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  ngOnInit() {}

  // eslint-disable-next-line @typescript-eslint/naming-convention
  CloseModal() {
    this.modalController.dismiss();
  }

  async OpenModal(){
    const modal = await  this.modalController.create({
      component: ModalpopupvolPage,
      componentProps: { selectedOrganisation: this.selectedOrganisation }
    });
    return await modal.present();
  }
}
