import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order/order.component';
import { LayoutModule } from '../layout/layout.module';
import { RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { CustomerComponent } from './customer/customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchAddressComponent } from './components/search.address/search.address.component';
import { CustomerInfoComponent } from './components/customer.info/customer.info.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  declarations: [
    OrderComponent,
    CustomersComponent,
    CustomerComponent,
    SearchAddressComponent,
    CustomerInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    OrderRoutingModule,
    ReactiveFormsModule,
    LayoutModule,
    InfiniteScrollModule
  ]
})
export class OrderModule { }
