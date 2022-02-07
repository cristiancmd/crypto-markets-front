import { LandingComponent } from './modules/landing/landing.component';
import { GuardGuard } from './modules/guard.guard';

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
import { ProfileComponent } from './modules/profile/profile.component';

const routes: Routes = [

  { path: 'coins/new', component: CoinNewComponent, canActivate:[GuardGuard] },

  { path: 'coins', component: CoinsComponent },

  {
    path: 'coins/:id', component: CoinDetailComponent, canActivate:[GuardGuard]
  },
  {
    path: '',
    redirectTo: 'mycoins',
    pathMatch: 'full'
  },
  { path: 'exchanges', component: ExchangesComponent, canActivate:[GuardGuard] },

  { path: 'exchanges', component: ExchangesComponent, canActivate:[GuardGuard] },
  { path: 'exchanges/new/:id', component: ExchangeNewComponent, canActivate:[GuardGuard] },
  { path: 'mycoins', component: MyCoinsComponent , canActivate:[GuardGuard]},
  // { path: 'login', component: LoginComponent  },
  { path: 'about', component: AboutComponent },
  { path: 'profile', component: ProfileComponent, canActivate:[GuardGuard] },
  { path: 'home', component: LandingComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
