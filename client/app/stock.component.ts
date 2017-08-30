import {Component, Input} from '@angular/core';
import {Stock} from './stock';
import {StockService} from './stock.service';

@Component({
  selector: 'stock',
  template: `
    <md-list-item class="row">
        <md-input-container><input mdInput value="{{stock.id}}" placeholder="ID" type="number" disabled></md-input-container>
        <md-input-container><input mdInput value="{{stock.name}}" placeholder="Name" type="text" disabled></md-input-container>
        <md-input-container><input mdInput value="{{stock.currentPrice}}" #input (change)="edit(input.value)" placeholder="Current Price" type="number"></md-input-container>
        <md-input-container><input mdInput value="{{stock.lastUpdate}}" placeholder="Last Update" type="text" disabled></md-input-container>
        <md-slide-toggle #toggle (change)="autoUpdate(toggle.checked)">Sync</md-slide-toggle>
    </md-list-item>
  `,
  providers: [StockService]
})

export class StockComponent {
    @Input() stock: Stock;
    private idTimeout: number;
    private shouldUpdate = false;
    private pollingInterval = 3000;

    constructor(private stockService: StockService) {}

    autoUpdate(checked: boolean): void {
        this.shouldUpdate = checked;
        clearTimeout(this.idTimeout);
        this.update();
    }

    update(): void {
        if (this.shouldUpdate) {
            this.idTimeout = setTimeout(() => {
                this.stockService.getStock(this.stock.id).then((stock) => {
                    this.stock = stock;
                    this.update();
                });
            }, this.pollingInterval);
        }
    }

    edit(currentPrice: number): void {
        this.stockService.update(this.stock.id, currentPrice).then((lastUpdate) => {
            this.stock.lastUpdate = lastUpdate;
        })
    }
}
