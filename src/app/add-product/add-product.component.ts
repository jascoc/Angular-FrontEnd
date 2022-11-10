import { Component, OnInit } from '@angular/core';
import { DogImage } from '../dogImage';
import { ProductService } from '../product.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../product';
import { NgForm }   from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {
  
  public dogImage!: DogImage;
  public image = new String(); 
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getDogImage();
  }

  public getDogImage(): void {
    this.productService.getDogImage().subscribe(
      (response: DogImage) => {
        this.dogImage = response;
        this.image = response.message;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddProduct(addForm: NgForm): void {
    addForm.value.image=this.dogImage.message;
    console.log('i am sending: ' + JSON.stringify(addForm.value))
    this.productService.addProduct(addForm.value).subscribe(
      (res: Product) => {
        console.log(JSON.stringify(res));
        this.router.navigateByUrl('/homepage');
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
    );
  }

}
