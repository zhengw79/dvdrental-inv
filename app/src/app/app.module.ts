import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from "apollo-angular/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthHttpInterceptorService } from './auth/auth.http.interceptor.service';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { setContext } from '@apollo/client/link/context';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		ApolloModule,
		AppRoutingModule,
		AuthModule,
		BrowserModule,
		// DashboardModule,
		HttpClientModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthHttpInterceptorService,
			multi: true
		},
		{
			provide: APOLLO_OPTIONS,
			useFactory(httpLink: HttpLink) {
				const basic = setContext((operation, context) => ({
					headers: {
						Accept: 'charset=utf-8'
					}
				}));

				const auth = setContext((operation, context) => {
					const token = localStorage.getItem('access_token');

					if (token === null) {
						return {};
					} else {
						return {
							headers: {
								Authorization: `Bearer ${token}`
							}
						};
					}
				});

				const link = ApolloLink.from([
					basic,
					auth,
					httpLink.create({ uri: 'graphql' })]);
				const cache = new InMemoryCache();

				return {
					link,
					cache,
					defaultOptions: {
						watchQuery: {
							fetchPolicy: 'no-cache',
							errorPolicy: "ignore"
						},
						query: {
							fetchPolicy: "no-cache",
							errorPolicy: "all"
						}
					}
				}
			},
			deps: [HttpLink]
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
