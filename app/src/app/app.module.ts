import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthHttpInterceptorService } from './auth/auth.http.interceptor.service';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		AppRoutingModule,
		AuthModule,
		BrowserModule,
		DashboardModule,
		HttpClientModule
	],
	providers: [
		{
		  provide: HTTP_INTERCEPTORS,
		  useClass: AuthHttpInterceptorService,
		  multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
