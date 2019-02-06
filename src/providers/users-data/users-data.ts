import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { User } from './user';
import { NavController, App } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



/*
  Generated class for the UsersDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersDataProvider {
  private urlbase = "http://vmi118470.contaboserver.net";
  private navCtrl: NavController;
  public loggedUser:User;
  public isAuth:boolean;
  public errorLog;
  public users:User[];

  constructor(private http:HttpClient, 
              private app:App, 
              private storage: Storage,
              private sanitizer: DomSanitizer) {
    console.log('Hello UsersDataProvider Provider');
    this.navCtrl = app.getActiveNav();
    this.users = new Array();
    this.isAuth = false;
    this.loadLoggedUser();
    //this.Login('lucia','123456');
    }

  public loadLoggedUser(){
    let token = false;
    this.storage.get('usertoken').then((val) => {
      token = val;
    });
    console.log('token',token);
    console.log('run token get current logged user');
  }

  public getLoggedUser():User{
    return this.loggedUser;
  }
  public getLoggedUserID():string{
    return this.loggedUser.userID;
  }

  public getUserByID( userID ){
  }



  public Login(user:string, pass:string){
    let body = '{"name":"'+user+'", "pass":"'+pass+'"}';
    console.log(body);
    let url = this.urlbase+'/~wedproduction/user/login?_format=json';
    let headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    let login_observer = this.http.post(url,body,{headers});
    login_observer.subscribe(
      (val) => {
          console.log("POST call successful value returned in body", val);
          this.storage.set('usertoken',val['csrf_token']).then((resp) => {
            console.log('response is', resp);
          });
          this.loggedUser = new User();
          this.loggedUser.setToken(val['csrf_token']);
          this.loggedUser.setLogoutToken(val['logout_token']);
          this.loggedUser.name = val['current_user']['name'];
          this.loggedUser.userID = val['current_user']['uid'];
          this.isAuth = true;
          console.log( this.storage.get('usertoken')  );
      },
      response => {
          //console.log("POST call in error", response);
      },
      () => {
          //console.log("The POST observable is now completed.");
      });
      return login_observer;
  }

  

  /*public requestUserData( uid ){
    console.log('requesting user_data', uid);
    let url = 'http://vmi118470.contaboserver.net/~wedproduction/user/'+this.loggedUser.userID+'?_format=json';
    let headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    let observer = this.http.get(url,{headers});
    return observer;
  }*/

  public fillUserdata ( user:User ){
    console.log('requesting user_data', user.userID);
    let url = this.urlbase+'/~wedproduction/app_user/'+this.loggedUser.userID+'?_format=json';
    let headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    let user_observer = this.http.get(url,{headers});
    user_observer.subscribe(
      (val) => {
        val=val[0];
          console.log("user got", val); 
          console.log(val['uid']); 
          user.userID = val['uid'];
          user.name = val['name'];
          user.proType = val['field_typ'];
          user.description = val['field_about_me_2'];
          user.services = val['field_services'];
          user.displayImgUrl = val['user_picture'];
          //user.displayImgUrl = "http://vmi118470.contaboserver.net/~wedproduction/sites/default/files/images/profile/wp-display-1441132843.png";
          user.coverImgUrl = val['field_cover'];
          //user.coverImgUrl = "http://vmi118470.contaboserver.net/~wedproduction/sites/default/files/styles/cover_profile_/public/images/mediapro/1504800511a8eae00c-7a08-4e7c-86eb-6c18fa908a7e.JPG?itok=w4-YhMB_";
        },response => {},() => {});
  }

  
  public fillUserGallery( user:User ){
    console.log('requesting user_gallery', user.userID);
    let url = 'http://vmi118470.contaboserver.net/~wedproduction/fotospro/'+user.userID+'?_format=json';
    let headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    let observer_fotos = this.http.get(url,{headers});
    observer_fotos.subscribe(
      (val) => {
         
          user.PhotoGallery = Object.keys(val).map(function(index){
            return val[index]['field_photos_pros'];
          });
          console.log(user.PhotoGallery); 
      },response => {},() => {});
       url = 'http://vmi118470.contaboserver.net/~wedproduction/videospro/'+user.userID+'?_format=json';
    let observer_videos = this.http.get(url,{headers});
    let sanitizer_auxref = this.sanitizer;
    observer_videos.subscribe(
      (val) => {
         
          user.VideoGallery = Object.keys(val).map(function(index){
            return val[index]['field_embed_pros'].replace("https://vimeo.com/","");
            /*return sanitizer_auxref.bypassSecurityTrustResourceUrl(
              'https://player.vimeo.com/video/'+val[index]['field_embed_pros'].replace("https://vimeo.com/","")
           )*/
            
          });
          console.log(user.VideoGallery); 
      },response => {},() => {});
  }



  public getServicesString( service_id ){
    console.log('getting service string',service_id);
    let ret = '';
    switch(service_id){
      case '1': ret = "Photographer"; break;
      case '2': ret = "Cinematographer"; break;
      case '3': ret = "Wedding Planner"; break;
      case '4': ret = "Producer"; break;
      case '5': ret = "Drone Operator"; break;
      case '6': ret = "Makeup Artist"; break;
      case '7': ret = "Photo Editor"; break;
      case '8': ret = "Video Editor"; break;
      case '9': ret = "Submarine Photographer"; break;
      case '10': ret = "Driver Coach"; break;
      case '11': ret = "Designer"; break;
      case '12': ret = "Photoboot"; break;
      case '13': ret = "Classic Car"; break;
      case '14': ret = "Travel Agent"; break;
      case '15': ret = "Promoter"; break;
      case '16': ret = "Venue"; break;
      case '17': ret = "Hotel"; break;
      default: ret = '';
    }
    return ret;

 
  }

}
