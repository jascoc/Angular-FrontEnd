import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';
import { DogImage } from './dogImage';
import { environment } from 'src/environments/environment';

//i reach the back end through service
@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private url = environment.url;
  private dogUrl = "https://dog.ceo/api/breeds/image/random";

  constructor(private http: HttpClient) {}

  public getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/product`);
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.url}/product/add`, product);
  }

  public deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/product/delete/${id}`);
  }

  public getDogImage(): Observable<DogImage> {
    return this.http.get<DogImage>(`${this.dogUrl}`);
  }
  
}
