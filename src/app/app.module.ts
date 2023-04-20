import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxSliderModule} from "@angular-slider/ngx-slider";

import {GenresComponent} from './components/tools/filters/genres/genres.component';
import {ShowMeComponent} from './components/tools/filters/show-me/show-me.component';
import {LanguageComponent} from './components/tools/filters/language/language.component';
import {ExtrasComponent} from './components/tools/filters/extras/extras.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {RegisterComponent} from './components/register/register.component';
import {ApiService, AuthService} from "./services";


registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainLayoutComponent,
    MainPageComponent,
    RegisterComponent,
    GenresComponent,
    ShowMeComponent,
    LanguageComponent,
    ExtrasComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSliderModule

  ],
  providers: [HttpClient, AuthService, ApiService,
    {provide: LOCALE_ID, useValue: 'ru-Ru'}
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
