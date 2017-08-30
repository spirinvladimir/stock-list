import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {StockService} from './stock.service';
import {StockComponent} from './stock.component';
import {Stock} from './stock';

@Component({
  selector: 'app-root',
  template: `
    <h3><u>Create new stock</u></h3>
    <md-input-container>
        <input #name mdInput placeholder="Stock Name" type="text">
    </md-input-container>
    <md-input-container>
        <input #price mdInput placeholder="Stock Price" type="number">
    </md-input-container>
    <button md-mini-fab (click)="add(name.value, price.value)"><b>+</b></button>
    <h3><u>Stock list</u></h3>
    <md-list>
        <stock *ngFor="let stock of stocks" [stock]="stock"></stock>
    </md-list>
  `,
  providers: [StockService]
})

export class AppComponent implements OnInit {
  @ViewChild("name") name : ElementRef
  @ViewChild("price") price : ElementRef
  stocks: Stock[] = [];

  constructor(private stockService: StockService) {}

  add(name: string, price: number): void {
      if (name && price > 0) {
          this.name.nativeElement.value = '';
          this.price.nativeElement.value = '';
          this.stockService
            .add(name, price)
            .then(stock => this.stocks.unshift(stock));
      }
  }

  ngOnInit(): void {
    this.stockService.getStocks().then((stocks) => {
        this.stocks = stocks;
    });
  }
}
