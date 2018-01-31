import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/users-data/user';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.actualUser = <User> navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

}
