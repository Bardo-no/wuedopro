import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { User } from './user';

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
  public loggedUser:User;
  private authUser:string;
  private authPassword:string;
  public users:User[];

  constructor(private http:HttpClient) {
    console.log('Hello UsersDataProvider Provider');
    this.users = new Array();
    this.loadLoggedUser();
    }

  public loadLoggedUser(){
    this.loggedUser = new User();
    this.loggedUser.userID = "user1";
    this.loggedUser.name = "juan Carlos Elias";
    this.loggedUser.proType = "Cinematographer";
    this.loggedUser.description = "CEO of WedProduction, I love movies since I can remember, I've been producing films and commercials the last years and now I'm putting all that experience and all the internet advances for the most important day of your life: Your Wedding!"
    this.loggedUser.services = "Producer Photographer Cinematographer"
    this.loggedUser.displayImgUrl = "http://vmi118470.contaboserver.net/~wedproduction/sites/default/files/images/profile/wp-display-1441132843.png";
    this.loggedUser.coverImgUrl = "http://vmi118470.contaboserver.net/~wedproduction/sites/default/files/styles/cover_profile_/public/images/mediapro/1504800511a8eae00c-7a08-4e7c-86eb-6c18fa908a7e.JPG?itok=w4-YhMB_";
    this.loggedUser.socialFacebookUrl="http://www.facebook.com/sharer.php?u=http://vmi118470.contaboserver.net/~wedproduction/professional/juan-carlos-elias";
    this.loggedUser.socialTwitterUrl="https://twitter.com/share?text=Professionals Wed Production:&hashtags=WEDPRODUCTION&via=wedproduction&url=http://vmi118470.contaboserver.net/~wedproduction/professional/juan-carlos-elias";
    this.loggedUser.socialPinterestUrl="http://pinterest.com/pin/create/link/?url=http://vmi118470.contaboserver.net/~wedproduction/professional/juan-carlos-elias&media=http://vmi118470.contaboserver.net//~wedproduction/sites/default/files/images/mediapro/1504800511a8eae00c-7a08-4e7c-86eb-6c18fa908a7e.JPG&description=''";
    this.loggedUser.socialMailUrl="mailto:?subject=Name - Wedding&body=http://vmi118470.contaboserver.net/~wedproduction/professional/juan-carlos-elias";
    this.users.push(this.loggedUser);
  }

  public getLoggedUser():User{
    return this.loggedUser
  }
  public getLoggedUserID():string{
    return this.loggedUser.userID;
  }

  public getUserByID( userID ){
  }



  public Login(user:string, pass:string){
    this.authUser = user;
    this.authPassword = pass;
  }
}
