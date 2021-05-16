import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Organisation } from '../Models/Organisation.interface';

@Component({
  selector: 'app-modalpopupvol',
  templateUrl: './modalpopupvol.page.html',
  styleUrls: ['./modalpopupvol.page.scss'],
})
@Injectable({
  providedIn: 'root'
})
export class ModalpopupvolPage implements OnInit {

  @Input()
  selectedOrganisation: Organisation;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.selectedOrganisation);

  }

  CloseModal() {
    this.modalController.dismiss();
  }
}
