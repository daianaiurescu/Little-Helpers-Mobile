import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {OrderService} from '../services/orderService';
import {Order} from '../Models/Order.interface';
import {User} from '../Models/User.interface';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-userOrderPopup',
  templateUrl: './userOrderPopup.page.html',
  styleUrls: ['./userOrderPopup.page.scss'],
})
export class UserOrderPopupPage implements OnInit{
  user: User;
  userOrders: Order[];
  constructor(private orderService: OrderService, private modalController: ModalController) {
  }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(orders =>
      this.userOrders =  orders.filter(order => order.email === this.user.emailAddress )
    );
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CloseModal() {
    this.modalController.dismiss();
  }
}
