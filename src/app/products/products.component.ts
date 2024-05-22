import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { ProductsService } from '../services/products.service';
import { Observable, map } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgOptimizedImage, AsyncPipe } from '@angular/common'
import { ProductTypes, ProductTypesResponse } from '../interfaces/productTypeI';
import { DataMapperService } from '../services/data-mapper.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ImageSliderComponent, MatGridListModule, NgOptimizedImage, AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  constructor(private router: Router, private productSrv: ProductsService, private dataMapperSrv: DataMapperService) {}

  productsList$!: Observable<ProductTypes[]>;

  ngOnInit(): void {
    this.getProductTypes();
  }

  selectProduct(event: string) {
   this.router.navigate([`/product`, {productType: event.toLowerCase()}]);
  }
  
  getProductTypes() {
    this.productsList$ = this.productSrv.getProductTypes().pipe(
      map((productTypes: ProductTypesResponse[]) => this.dataMapperSrv.formatProductTypesData(productTypes))
    )
  }

}
