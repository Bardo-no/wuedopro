import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/users-data/user';
import { UsersDataProvider } from '../../providers/users-data/users-data';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.  static component: any;
  static component: any;

 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  public actualUser:User;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public usersData:UsersDataProvider,
    public sanitizer: DomSanitizer
  ) {
    this.actualUser = <User> navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
    /*let user_observer = this.usersData.requestUserData( this.actualUser.userID ); 
    user_observer
    .subscribe(
      (val) => {
          console.log("Getting user data: ", val);
          this.usersData.fillUserdata( this.actualUser , val );
      },
      response => {
          //console.log("POST call in error", response);
      },
      () => {
          //console.log("The POST observable is now completed.");
      });*/
      this.usersData.fillUserdata( this.actualUser );
      this.usersData.fillUserGallery(this.actualUser);
  }

}
