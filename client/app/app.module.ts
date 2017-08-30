import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule,
        MdListModule,
        MdInputModule,
        MdSlideToggleModule} from '@angular/material';
import {HttpModule} from '@angular/http';


import {AppComponent} from './app.component';
import {StockComponent} from './stock.component';

import {StockService} from './stock.service';

@NgModule({
  declarations: [
    AppComponent,
    StockComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
    HttpModule,
    MdListModule,
    MdInputModule,
    MdSlideToggleModule
  ],
  providers: [StockService, StockComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
