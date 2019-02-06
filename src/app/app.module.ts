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
import { LoginPage } from '../pages/login/login';
import { EventsPage } from '../pages/events/events';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StoreDataProvider } from '../providers/store-data/store-data';
import { UsersDataProvider } from '../providers/users-data/users-data';
import { ComponentsModule } from '../components/components.module';
import { IonicStorageModule } from '@ionic/storage';
import { EventsDataProvider } from '../providers/events-data/events-data';





@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ProfessionalsPage,
    WedstorePage,
    ServicePopOverPage,
    UserPage,
    LoginPage,
    EventsPage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
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
    UserPage,
    LoginPage,
    EventsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StoreDataProvider,
    UsersDataProvider,
    EventsDataProvider,
  ]
})
export class AppModule {}
