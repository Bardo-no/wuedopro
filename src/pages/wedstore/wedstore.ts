import { Component, Input, ViewChild, ElementRef} from '@angular/core';
import { PopoverController, ModalController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { ServicePopOverPage } from '../service-pop-over/service-pop-over';
import { StoreDataProvider } from '../../providers/store-data/store-data';
import * as $ from 'jquery';
import { StoreElement, MANAGE_PAX_ACTIONS } from '../../providers/store-data/StoreElement';
import { wedPack } from '../../providers/store-data/WedPack';





/**
 * Generated class for the WedstorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@Component({
  selector: 'page-wedstore',
  templateUrl: 'wedstore.html',
  
})

export class WedstorePage {
  public latestUpdateUiPack:string; //compares latest pack and do not do changes on pack shown if is the same.
  public latestUpdateUiVenue:string;

  constructor(public wedstore: StoreDataProvider, public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public modalCtrl : ModalController) {
    console.log(this.wedstore._services);
    this.latestUpdateUiPack="start"
  }

  ionViewWillEnter(){
    this.wedStoreUpdateUi();
    console.log('venues',this.wedstore._venues);
  }


  presentServicePopOver(serviceID) {
    //console.log(event);
    //let popover = this.popoverCtrl.create(ServicePopOverPage,{serviceID});
    //popover.present();
    //this.wedstorecart.printServices();


    var modalPage = this.modalCtrl.create(ServicePopOverPage,{serviceID});
    modalPage.onDidDismiss(data => {
      this.wedStoreUpdateUi();
    });
    modalPage.present();
  }



  wedStoreCheckClick(serviceID ){
    console.log('wedStoreCheckClick', serviceID);
    let wedservice =  this.wedstore.getServiceByServiceID(serviceID);
    let checkbox = $('#wedServiceCheck'+serviceID);
    checkbox.prop('checked', wedservice.active );
    this.presentServicePopOver(wedservice.elementID);
  }

  packSelectorClick( elementID ){
    console.log("clicking pack selector", elementID);
    console.log(this.wedstore.actualPackage);
    if(this.wedstore.actualPackage === elementID){
      this.wedstore.setPack(true, 'none');
    }else{
      this.wedstore.setPack(true, elementID);
      //this.wedstore.actualPackage=elementID;
    }
    this.wedStoreUpdateUi();
  }


  selectVenue(elementID:string){
    console.log("selecting venue", elementID);
    if(this.wedstore.actualVenue === elementID){
    this.wedstore.actualVenue = 'none';
    }else{
    this.wedstore.setVenue(true,elementID);
     }
    this.wedStoreUpdateUi();
  }

  setVenueOption( optionElementID:string, venueElementID:string ){
    let venue = this.wedstore.getStoreElementByID(venueElementID,this.wedstore._venues);
    StoreElement.setOption(optionElementID,true,false,venue._options,true);
    console.log('setting option',venue._options);
    this.wedStoreUpdateUi();
  }

  setVenueComb( optionElementID:string, venueElementID:string ){
    let venue = this.wedstore.getStoreElementByID(venueElementID,this.wedstore._venues);
    let comb = this.wedstore.getStoreElementByID(optionElementID,venue._optionCombinations);
    StoreElement.setOption(optionElementID,!comb.active,false,venue._optionCombinations,false);
    console.log('setting Comb',venue._optionCombinations);
    this.wedStoreUpdateUi();
  }

  removeVenuePax( elementID:string ){
    let selectedVenue = this.wedstore.getStoreElementByID(elementID,this.wedstore._venues);
    selectedVenue.managePax(MANAGE_PAX_ACTIONS.REMOVE);
    this.wedStoreUpdateUi();
  }

  addVenuePax( elementID:string ){
    let selectedVenue = this.wedstore.getStoreElementByID(elementID,this.wedstore._venues);
    selectedVenue.managePax(MANAGE_PAX_ACTIONS.ADD);
    this.wedStoreUpdateUi();
  }

  sectBoxClick( sect:string , pack:string){
    console.log('sectBoxClick');
    let wedpack = this.wedstore.getStoreElementByID(pack,this.wedstore._packs);
    let sectaux = this.wedstore.getStoreElementByID(sect,wedpack._options);
    let checkbox = $('.wedSectCheck'+sect);
    StoreElement.setOption(sect,!sectaux.active,true,wedpack._options,wedpack.optionForce);
    checkbox.prop('checked', sectaux.active );
  }

  getServiceShortcutName( elementID:string  ){
    return this.wedstore.getServiceByServiceID(elementID).name;
  }


  printopo( input ){
    console.log('printopo', input );
  }

  wedStoreUpdateUi(){
    console.log('wedStoreUpdateUi');
    this.wedstore._services.forEach( service => {
      let checkbox = $('.wedServiceCheck'+service.elementID);
      let serviceThumb = $('#wedServiceThumb'+service.elementID);
      checkbox.prop('checked', service.active );
      if( service.active ){ serviceThumb.fadeIn(); }else{ serviceThumb.fadeOut(); }
    });
    /* update Cost on store*/
    this.wedstore.updateCost();
    /* update pack cost on store */
    if(this.wedstore.actualPackage != 'none'){
      this.wedstore.calculatePackShowPrice()
    };
    /* show or hide pack*/
    if( this.latestUpdateUiPack !== this.wedstore.actualPackage ){
    $('.wedStorePack').fadeOut();
    $('#wedStorePack'+this.wedstore.actualPackage).fadeIn();
    this.latestUpdateUiPack = this.wedstore.actualPackage;
    }

    /* show selectedVenue*/
    if(this.latestUpdateUiVenue != this.wedstore.actualVenue){
      $('.venueshow').fadeOut();
      $('.venueshow'+this.wedstore.actualVenue).fadeIn();
      this.latestUpdateUiVenue = this.wedstore.actualVenue;
    }

    /*Update Venue checkboxes */
    $('.venue_selector_checkbox').prop('checked',false);
    
    
    if(this.wedstore.actualVenue !== 'none'){

    $('.venueSelectCheck'+this.wedstore.actualVenue).prop('checked',true);
    $('.wedOptionVenueCheck').prop('checked',false);
    $('.wedcombVenueCheck').prop('checked',false);
    let selectedVenue = this.wedstore.getStoreElementByID(this.wedstore.actualVenue,this.wedstore._venues);
    selectedVenue._options.forEach(venueOption => {
      console.log('updateUI venue options check:',venueOption);
      $('.wedOptionVenueCheck'+venueOption.elementID).prop('checked',venueOption.active);
    });
    selectedVenue._optionCombinations.forEach(venueComb => {
      console.log('updateUI venue options check:',venueComb);
      $('.wedcombVenueCheck'+venueComb.elementID).prop('checked',venueComb.active);
    });

    this.wedstore.venueShowPrice = this.wedstore.getVenuesTotal();
    }
  }


  /**
   * Change State and Currency select events 
  **/ 
  
  changeCurrency(){
    this.wedstore.setActualCurrency(this.wedstore.actualCurrencyISO);
    this.wedStoreUpdateUi();
  }

  changeState(){
    this.wedstore.setActualState(this.wedstore.acutalStateISO);
    this.wedStoreUpdateUi();
  }
}
