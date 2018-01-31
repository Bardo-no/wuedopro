import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';  

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ProfessionalsPage } from '../pages/professionals/professionals';
import { WedstorePage } from '../pages/wedstore/wedstore';
import { ServicePopOverPage } from '../pages/service-pop-over/service-pop-over';
import { UserPage } from '../pages/user/user';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StoreDataProvider } from '../providers/store-data/store-data';
import { UsersDataProvider } from '../providers/users-data/users-data';
import { ComponentsModule } from '../components/components.module';





@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ProfessionalsPage,
    WedstorePage,
    ServicePopOverPage,
    UserPage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ProfessionalsPage,
    WedstorePage,
    ServicePopOverPage,
    UserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StoreDataProvider,
    UsersDataProvider,
  ]
})
export class AppModule {}
