import { SpinnerInterceptor } from './public/interceptors/spinner.interceptor';
import { SpinnerModule } from './public/spinner/spinner.module';
import { CoinsComponent } from './modules/coins/coins.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './public/templates/header/header.component';
import { FooterComponent } from './public/templates/footer/footer.component';
import { NotFoundComponent } from './public/errors/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { CoinDetailComponent } from './modules/coin-detail/coin-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoinNewComponent } from './modules/coin-new/coin-new.component';
import { ExchangeNewComponent } from './modules/exchange-new/exchange-new.component';
import { ExchangeDetailComponent } from './modules/exchange-detail/exchange-detail.component';
import { ExchangesComponent } from './modules/exchanges/exchanges.component';
import { ChartComponent } from './modules/chart/chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './modules/login/login.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { AboutComponent } from './modules/about/about.component';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { AvatarModule } from 'ngx-avatar';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { MyCoinsComponent } from './modules/my-coins/my-coins.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    CoinsComponent,
    CoinDetailComponent,
    CoinNewComponent,
    ExchangeNewComponent,
    ExchangeDetailComponent,
    ExchangesComponent,
    ChartComponent,
    LoginComponent,
    AboutComponent,
    MyCoinsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SpinnerModule,
    ToastrModule.forRoot(),
    AuthModule.forRoot({ //pasar a env
      domain: 'dev-nq15j8cp.us.auth0.com',
      clientId: '3BAudvlOWVBvtgiPXgIblLhtzORKZ6T8',
      cacheLocation: 'localstorage',
      useRefreshTokens: true,
      audience: 'test-api-iaw',
      httpInterceptor: {

        allowedList: [
          {
            uri: 'https://crypto-markets-api.herokuapp.com/*',
            allowAnonymous: true
          },
          {
            uri: 'http://localhost:3000/*',
            allowAnonymous: true
          }

        ],

      },


    }),
    AvatarModule,
    CodemirrorModule,
    NgbModule,
    NgSelectModule,


  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
