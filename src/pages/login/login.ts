import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UsersDataProvider } from '../../providers/users-data/users-data';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentialsForm: FormGroup;
  public errorState:boolean;
  public errorMsg:string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController, 
              public usersData:UsersDataProvider,
              public alertCtrl: AlertController,
              private formBuilder: FormBuilder) {
  this.credentialsForm = this.formBuilder.group({
    user: ['',Validators.required],
    pass: ['',Validators.required]
  });

}

onLogin(){
  this.errorState = false;
  let user = this.credentialsForm.controls.user.value;
  let pass = this.credentialsForm.controls.pass.value;
  let login_observer = this.usersData.Login(user,pass);
  login_observer.subscribe(
    (val) => {
        //console.log("calling observer on loginpage", val);
        /*getUser*/
        this.viewCtrl.dismiss();
    },
    response => {
        //console.log("POST call in error", response);
        /*set error msg*/
        this.errorState = true;
        this.errorMsg =response['error']['message'];
    },
    () => {
        //console.log("The POST observable is now completed.");
    });
}
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }



}
