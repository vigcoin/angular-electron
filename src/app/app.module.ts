import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { ForumComponent } from './components/forum/forum.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    WalletComponent,
    ExchangeComponent,
    ForumComponent,
    FeedbackComponent,
    NavbarComponent,
    WebviewDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
