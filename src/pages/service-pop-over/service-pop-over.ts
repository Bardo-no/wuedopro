import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { StoreDataProvider } from '../../providers/store-data/store-data';
import { wedService } from '../../providers/store-data/wedService';
import { elementDef } from '@angular/core/src/view/element';
import { MANAGE_PAX_ACTIONS, StoreElement } from '../../providers/store-data/StoreElement';


/**
 * Generated class for the ServicePopOverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-service-pop-over',
  templateUrl: 'service-pop-over.html',
})
export class ServicePopOverPage {
  public activeService:wedService;
  public serviceCost:number;
  public addServiceNamedColor:string = 'light';
  public addServiceText:string = 'Add to my package';
  


  constructor(public wedstore:StoreDataProvider, public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {
    console.log('loading servicePopOver on', navParams.data.serviceID);
    this.activeService = this.wedstore.getServiceByServiceID(navParams.data.serviceID);
    this.addServiceUpdateUI();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicePopOverPage');
  }

  public closeModal(){
    this.viewCtrl.dismiss();
}

addServiceUpdateUI(){
  //set add button
  if(!this.activeService.active){ 
    this.addServiceNamedColor = 'light';
    
    this.addServiceText = 'Add to my package';
  }
  else{
    this.addServiceNamedColor = 'primary';
    this.addServiceText = 'Remove from my package';
  }

  this.serviceCost = this.activeService.getTotalCost( this.wedstore.actualState.ISO );
  console.log(this.activeService._options);
  console.log('cost', this.serviceCost);
}

addServiceClick(){
  //this.activeService.active = !this.activeService.active;
  this.wedstore.setService(!this.activeService.active, this.activeService.elementID);
  this.addServiceUpdateUI();
}

setOption( elementID:string ){
  //console.log('setting option', elementID);
  StoreElement.setOption(elementID , true, this.activeService.multiOption, this.activeService._options);
  //console.log(this.activeService._options); 
  this.addServiceUpdateUI();
  }

addPax(){
  this.activeService.managePax(MANAGE_PAX_ACTIONS.ADD);
  this.addServiceUpdateUI();
}

removePax(){
  this.activeService.managePax(MANAGE_PAX_ACTIONS.REMOVE);
  this.addServiceUpdateUI();
}

}
