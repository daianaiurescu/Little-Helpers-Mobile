import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {OrderService} from '../services/orderService';
import {Order} from '../Models/Order.interface';
import {Organisation} from '../Models/Organisation.interface';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-orgOrderPopup',
  templateUrl: './orgOrderPopup.page.html',
  styleUrls: ['./orgOrderPopup.page.scss'],
})
export class OrgOrderPopupPage implements OnInit{
  organisation: Organisation;
  orders: Order[];
  constructor(private orderService: OrderService, private modalController: ModalController) {
  }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(orders => this.orders = orders);
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CloseModal() {
    console.log(this.orders);
    this.modalController.dismiss();
  }
}
