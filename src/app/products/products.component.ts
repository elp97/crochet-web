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
  
  getProductTypes() {
    const productTypessub = this.productSrv.getProductTypes().subscribe({next: (data) => this.formatProductTypes(data), error: (e) => console.error(e)});
    this.subscription.add(productTypessub);
  }

  formatProductTypes(data: any) {
    
    this.productsList = data.map((item: ProductTypes) => {
      item.productImage = `../../../assets/images/${item.type.toLowerCase()}/${item.type.toLowerCase()}_group.JPG`;
      item.background = this.colourSelection[this.randomInteger(1, this.colourSelection.length-1)];
      return item;
    })
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
  background: string;
}
