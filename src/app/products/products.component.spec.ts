import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ProductTypes } from '../interfaces/productTypeI';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let testProductData: ProductTypes = {
    id: "1",
    type: "test",
    count: 1,
    productImage: "",
    background: "green"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('no product messaged is showed', () => {
    const noProductsMsg = fixture.debugElement.query(
      By.css('[data-testid="no-products-msg"')
    );
    expect(noProductsMsg).toBeTruthy();
  });

  it('message not shown when data is present', () => {
    const testData: ProductTypes[] = [testProductData];
    component.productsList$ = of(testData);

    fixture.detectChanges();
    
    const noProductsMsg = fixture.debugElement.query(
      By.css('[data-testid="no-products-msg"')
    );
    expect(noProductsMsg).toBeFalsy();
  });

});
