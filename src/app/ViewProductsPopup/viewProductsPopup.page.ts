import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ProductService} from '../services/productService';
import {Product} from '../Models/Product.Interface';
import {Organisation} from '../Models/Organisation.interface';
import {ModalController} from '@ionic/angular';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-viewProductsPopup',
  templateUrl: './viewProductsPopup.page.html',
  styleUrls: ['./viewProductsPopup.page.scss'],
})

export class ViewProductsPopupPage implements OnInit{
  organisation: Organisation;
  getAllProductsSubscription: Subscription;
  products: Product[];
  constructor(private productService: ProductService, private modalController: ModalController) {
  }
  ngOnInit(){
    this.getAllProductsSubscription = this.productService.getProducts().subscribe(response => {
      this.products = response.filter(product => product.sold_by === this.organisation?.title);
    });
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CloseModal() {
    this.modalController.dismiss();
  }
  viewProducts(): void {
    this.getAllProductsSubscription = this.productService.getProducts().subscribe(response => {
      this.products = response.filter(product => product.sold_by === this.organisation?.title);
    });
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  DeleteProduct(product){
    const data = {
      title: product.title
    };
    this.productService.delete(data).subscribe(response => {
        console.log(response);
        this.viewProducts();
      },
      error => {
        console.log(error);
      });
  }
}
