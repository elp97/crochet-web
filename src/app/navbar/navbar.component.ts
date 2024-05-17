import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent  {
  
  constructor(private router: Router, private productSrv: ProductsService) {
    console.log("construtor", this.router.url)
  }


  menuTopics: string[] = ["Home", "Products", "About", "Blog"];
  selectedRoute: string = this.getCorrectRoute();
  searchText: string = "";

  btnClick(event: any) {
    console.log("event", event)
    this.selectedRoute = event;
    this.router.navigate([`/${event.toLowerCase()}`]);
  }

  getCorrectRoute() {
    console.log("url: ", this.router.url?.substring(1))
    return this.router.url?.substring(1);
  }

  search() {
    console.log("searchText", this.searchText)
    this.productSrv.search(this.searchText);
    //need to show search result - how?
  }
}
