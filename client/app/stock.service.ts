import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Stock} from "./stock";
import {Headers, Http} from '@angular/http';

@Injectable()
export class StockService {

  private host = window.location.hostname;
  private headers = new Headers({'Content-Type': 'application/json'});
  private stocksURL = '/api/stocks';

  constructor(private http: Http) {};

  getStocks(): Promise<Stock[]> {
    return this.http.get(this.stocksURL)
      .toPromise()
      .then(response => response.json() as Stock[]);
  }

  getStock(id: number): Promise<Stock> {
    const url = `${this.stocksURL}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Stock);
  }

  add(name: string, currentPrice: number): Promise<Stock>{
    return this.http.post(this.stocksURL, JSON.stringify({name: name, currentPrice: currentPrice}), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Stock);
  }

  update(id: number, currentPrice: number): Promise<number>{
    return this.http.put(`${this.stocksURL}/${id}`, JSON.stringify({currentPrice: currentPrice}), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as number);
  }
}
