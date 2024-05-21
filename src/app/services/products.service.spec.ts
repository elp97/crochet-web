import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { ProductTypes } from '../interfaces/productTypeI';
import { ProductI } from '../interfaces/productsI';

const inputtedType = "testA";
const productTypesExpectedURL = `${environment.apiUrl}/products/getTypes`;
const byTypeExpectedURL = `${environment.apiUrl}/products/getProductsByType/${inputtedType}`;

const productTypeA: ProductTypes = {
  id: "1",
  type: "testA",
  count: 1,
  productImage: "testA.png",
  background: "testA"
}

const productTypes : ProductTypes[] = [productTypeA];

const productA: ProductI = {
  productID: 0,
  name: 'test',
  price: 0,
  description_Small: ''
}
const productsPerType : ProductI[] = [productA];

describe('ProductsService', () => {
  let service: ProductsService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductsService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('product types should be returned', () => {
    let actualData = [] as any || undefined;
    service.getProductTypes().subscribe((fetchedData) => {
      actualData = fetchedData;
    });
    const request = controller.expectOne(productTypesExpectedURL);
    request.flush(productTypes);
    expect(actualData).toEqual(productTypes);
  });

  it('products for inputted type should be returned', () => {
    let actualData = [] as any || undefined;
    service.getProductsPerType(inputtedType).subscribe((fetchedData) => {
      actualData = fetchedData;
    });
    const request = controller.expectOne(byTypeExpectedURL);
    request.flush(productsPerType);
    expect(actualData).toEqual(productsPerType);
  });
});
