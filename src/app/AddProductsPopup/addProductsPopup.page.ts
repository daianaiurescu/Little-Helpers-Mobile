import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ProductService} from '../services/productService';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-addProductsPopup',
  templateUrl: './addProductsPopup.page.html',
  styleUrls: ['./addProductsPopup.page.scss'],
})

export class AddProductsPopupPage{
  organisation: any;
  selectedImage: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Image: string;
  constructor(private modalController: ModalController, private productService: ProductService, private storage: AngularFireStorage){}
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CloseModal() {
    this.modalController.dismiss();
  }
  upload($event): void {
    this.selectedImage = $event.target.files[0];
    this.createRecord();
  }

  createRecord(): void {
    // tslint:disable-next-line:prefer-const
    const filePath = `/files/_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.Image = url;
        });
      })
    ).subscribe();
  }
  saveProduct(title, category, price, stock, description): void {
    const data = {
      title: title.value,
      category: category.value,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      sold_by: this.organisation.title,
      price: price.value,
      stock: stock.value,
      description: description.value,
      photo: this.Image,
      quantity: 1
    };
    this.productService.addProduct(data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }
}
