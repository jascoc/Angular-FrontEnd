import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public products: Product[] | undefined;
  
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  public getProducts(): void {
    this.productService.getProduct().subscribe(
      (response: Product[]) => {
        response.forEach(element => {
          element.image = 'data:image/png;base64,' + element.image;
        });
        this.products = response;
        //this.products[0].image = 'data:image/png;base64,' + this.products[0].image;*/
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      (response: void) => {
        this.getProducts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    console.log(id);
  }

}
