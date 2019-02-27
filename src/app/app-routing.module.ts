import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { ForumComponent } from './components/forum/forum.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'wallet',
    component: WalletComponent
  },
  {
    path: 'exchange',
    component: ExchangeComponent
  },
  {
    path: 'forum',
    component: ForumComponent
  },
  {
    path: 'feedback',
    component: FeedbackComponent
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
