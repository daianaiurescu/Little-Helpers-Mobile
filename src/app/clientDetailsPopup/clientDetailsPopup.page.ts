import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ProductService} from '../services/productService';
import {AngularFireStorage} from '@angular/fire/storage';
import {delay, finalize} from 'rxjs/operators';
import {OrderService} from '../services/orderService';
import {Router} from '@angular/router';
import {CartService} from '../services/cartService';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-clientDetailsPopup',
  templateUrl: './clientDetailsPopup.page.html',
  styleUrls: ['./clientDetailsPopup.page.scss'],
})
export class ClientDetailsPopupPage{
  total: number;
  cartDetails: any;
  cartNumber: number;
  constructor(private modalController: ModalController,
              private productService: ProductService,
              private storage: AngularFireStorage,
              private orderService: OrderService,
              private router: Router,
              private cartService: CartService){}
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CloseModal() {
    this.modalController.dismiss();
  }
  removeAll(): void{
    localStorage.removeItem('localCart');
    this.cartDetails = [];
    this.total = 0;
    this.cartNumber = 0;
    this.cartService.cartSubject.next(this.cartNumber);
  }
  placeOrder(fName, lName, email, phone, address): void {
    const data = {
      firstName: fName.value,
      lastName: lName.value,
      email: email.value,
      phone: phone.value,
      address: address.value,
      total: this.total,
      products: this.cartDetails
    };
    console.log(data);
    this.orderService.addOrder(data).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
    this.router.navigate(['shop']);
    delay(10000);
    this.removeAll();
    this.CloseModal();
  }
}
