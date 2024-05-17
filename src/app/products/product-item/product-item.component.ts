import { Component, Input, OnInit } from '@angular/core';
import { ImageSliderComponent } from '../../image-slider/image-slider.component';
import { CartButtonComponent } from '../../buttons/cart-button/cart-button.component';
import { WishlistButtonComponent } from '../../buttons/wishlist-button/wishlist-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import {ProductI, ImageI} from '../../interfaces/productsI';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [ImageSliderComponent, CartButtonComponent, WishlistButtonComponent, MatIconModule, MatButtonModule, CurrencyPipe],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent implements OnInit {

  constructor(private productSrv: ProductsService, private router: Router) {}

  @Input() productType = "";
  imageLocationPrefix: string = "";
  imageList: ImageI[] = [];
  productList: ProductI[] = [];
  selectedProduct: ProductI |  null = null;
  selectedImage: ImageI |  null = null;
  selectedImageID: number = 0;
  defaultImage: ImageI = {imageID: -1, imageURL: `../../../../../assets/images/${this.productType}/${this.productType}_group.JPG`, productID: -1};

  ngOnInit(): void {
    console.log("productType", this.productType)
    if (this.productType.length) {
      this.imageLocationPrefix = `../../../../../assets/images/${this.productType}/`;
      this.defaultImage.imageURL =  `../../../../../assets/images/${this.productType}/${this.productType}_group.JPG`;
      this.getProducts();
    }
  }

  selectDesign(product: ProductI) {
    this.selectedProduct = product;
    this.selectImageData();
  }

  nextImage() {
    this.selectedImageID++;
    this.selectedImage = this.selectedProduct?.images?.[this.selectedImageID] || this.defaultImage;
  }

  prevImage() {
    this.selectedImageID--;
    this.selectedImage = this.selectedProduct?.images?.[this.selectedImageID] || this.defaultImage;
  }

  //get all products per type
  getProducts() {
    console.log("product", this.productType)
    let results = this.productSrv.getProductDetailsByType(this.productType).subscribe({next: (data) => this.formatProductData(data), error: (e) => console.error(e)});
  }

  formatProductData(data: ProductI[]) {
    this.productList = data;
    this.selectedProduct = this.productList[0];
    this.selectImageData();
    console.log("productList", this.productList, this.selectedProduct, this.selectedImage);
    console.log("imageLocationPrefix", this.imageLocationPrefix)
  }

  selectImageData() {
    this.selectedImageID = 0;
    if (this.selectedProduct?.images?.[0]) {
      this.selectedImage = this.selectedProduct?.images?.[0];
    } else {
      this.selectedImage = this.defaultImage;
    }
  }

  getWholeImagePath(imageName: string) {
    console.log("imageName", imageName)
    if (imageName) {
      return `${this.imageLocationPrefix}/${imageName}`;
    } 
    return "";
  }

  back() {
    this.router.navigate([`/products`]);
  }
  
}


