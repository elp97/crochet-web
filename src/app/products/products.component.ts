import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { ProductsService } from '../services/products.service';
import { Subscription } from 'rxjs';
import {MatGridListModule} from '@angular/material/grid-list';
import {NgOptimizedImage} from '@angular/common'

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ImageSliderComponent, MatGridListModule, NgOptimizedImage],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private productSrv: ProductsService) {
  }

  oldproductsList: string[] = ["Badger", "Moose"];
  productsList: ProductTypes[] = [];
  subscription: Subscription = new Subscription;
  testVar: string = "not clicked";
  colourSelection: string[] = ["#d1a7c8", "#a7c7d1", "#acd1a7"];

  ngOnInit(): void {
    this.getProductTypes();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectProduct(event: string) {
   this.router.navigate([`/product`, {productType: event.toLowerCase()}]);
  }

  getData() {
    const dataSub = this.productSrv.fetchAllData().subscribe({next: (data) => console.log("d", data), error: (error) => console.error(error)});
    this.subscription.add(dataSub);
  }

  getProductTypes() {
    const productTypessub = this.productSrv.getProductTypes().subscribe({next: (data) => this.formatProductTypes(data), error: (e) => console.error(e)});
    this.subscription.add(productTypessub);
  }

  formatProductTypes(data: any) {
    
    this.productsList = data.map((item: ProductTypes) => {
      item.productImage = `../../../assets/images/${item.type.toLowerCase()}/${item.type.toLowerCase()}_group.JPG`;
      item.colSpace = Math.floor(Math.random() * 2) + 1;
      item.rowSpace = Math.max(2, Math.floor(Math.random() * 5) + 1);
      item.background = this.colourSelection[this.randomInteger(1, this.colourSelection.length-1)];
      return item;
    })
    //.sort((a: ProductTypes, b: ProductTypes) => a.type.localeCompare(b.type));
    console.log("product types ", data, this.productsList)
  }

  randomInteger(min: number = 1, max: number = 5) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


}

interface ProductTypes {
  id: string,
  type: string;
  count: number;
  productImage: string;
  colSpace: number;
  rowSpace: number;
  background: string;
}
