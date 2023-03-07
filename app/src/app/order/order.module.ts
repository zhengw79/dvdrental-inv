import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order/order.component';
import { LayoutModule } from '../layout/layout.module';
import { RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { CustomerComponent } from './customer/customer.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OrderComponent,
    CustomersComponent,
    CustomerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    OrderRoutingModule,
    ReactiveFormsModule,
    LayoutModule
  ]
})
export class OrderModule { }