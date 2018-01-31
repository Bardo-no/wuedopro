import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { UsersDataProvider } from '../../providers/users-data/users-data';
import { UserPage } from '../../pages/user/user';


/**
 * Generated class for the WedHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'wed-header',
  templateUrl: 'wed-header.html',
})
export class WedHeaderComponent {

  text: string;

  constructor(public Navi:NavController, public usersData:UsersDataProvider) {
  }

  openMyUserPage(){
   this.Navi.setRoot(UserPage, this.usersData.getLoggedUser());
  }

}
