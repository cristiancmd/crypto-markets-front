
import { LoginComponent } from './modules/login/login.component';
import { ExchangeNewComponent } from './modules/exchange-new/exchange-new.component';
import { ChartComponent } from './modules/chart/chart.component';
import { ExchangesComponent } from './modules/exchanges/exchanges.component';
import { CoinNewComponent } from './modules/coin-new/coin-new.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinDetailComponent } from './modules/coin-detail/coin-detail.component';
import { CoinsComponent } from './modules/coins/coins.component';
import { AboutComponent } from './modules/about/about.component';
import { MyCoinsComponent } from './modules/my-coins/my-coins.component';

const routes: Routes = [

  { path: 'coins/new', component: CoinNewComponent },

  { path: 'coins', component: CoinsComponent },

  {
    path:'coins/:id',component: CoinDetailComponent
  },
  {
    path: '',
    redirectTo: 'coins',
    pathMatch: 'full'
  },
  { path: 'exchanges', component: ExchangesComponent },
  // { path: 'chart', component: ChartComponent },
  { path: 'exchanges', component: ExchangesComponent },
  { path: 'exchanges/new/:id', component: ExchangeNewComponent },
  { path: 'mycoins', component: MyCoinsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
