import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operator/takeUntil';
import { wedService } from './wedService';
import { IStoreElement } from './IStoreElement';
import { StoreElement } from './StoreElement';
import { wedPack } from './WedPack';
import { WedVenue } from './WedVenue';

/*
  Generated class for the StoreDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StoreDataProvider {
  public _services:StoreElement[]; /*a list of services*/
  public _packs:wedPack[]; /*a list of packs*/
  public _venues:WedVenue[]; /*a list of venues*/
  public _currecies:iCurrency[]; /* a list of currencies*/
  public _states:iState[];
  public actualCurrency:iCurrency;
  public actualState:iState;
  public actualCurrencyISO:string; //actual currency string for show.
  public acutalStateISO:string; //values for show on store
  public actualStateName:string; //values for show on store
  public actualPackage:string; //elementID for current package
  public actualVenue:string; //elementID for current venue
  public packShowPrice:number; 
  public venueShowPrice:number;

  public total:number;
  public calculatedPackCost:number;
  public grandTotal:number;




  constructor() {
    /* do the http request to get the data from the store.*/

    this._packs = new Array();
    this._venues = new Array();
    this._services = new Array();
    this._currecies = new Array();
    this._states = new Array();
    this.setPack(true, 'none');
    this.setVenue(true, 'none');
    this.testStuff();
  }

  private testStuff(){
    this.total = 0;
    this.calculatedPackCost = 0;
    this.grandTotal = this.total;
    
    

    /*Test stuff*/ 
    /*do for in http*/
    let auxService = new StoreElement();
    auxService.elementID = 'Service1';
    auxService.name = "Cassual Session";
    auxService.description = "CEO of WedProduction, I love movies since I can remember, I've been producing films and commercials the last years and now I'm putting all that experience and all the internet advances for the most important day of your life: Your Wedding!";
    auxService.imageUrl = 'http://vmi118470.contaboserver.net/~wedproduction/sites/default/files/2017-10/drone.png';
    auxService.basePrice = 100;
    auxService.active = true;
    auxService.optionRequiered = true;
    auxService.paxRequiered = true;
    auxService.minPax = 10;
    auxService.maxPax = 20;
    auxService.actualPax = auxService.minPax;
    auxService._paxStatePrices.push({'available': true,
    'state': 'default',
    'price': 25});
    auxService._statePrices.push(
      {'available': true,
        'state': 'SON',
        'price': 10}
    );

    let auxOption = new StoreElement();
    auxOption.elementID ='option1';
    auxOption.name = 'lugar a';
    auxOption.imageUrl = "http://vmi118470.contaboserver.net/~wedproduction/sites/default/files/images/profile/wp-display-1441132843.png";
    auxOption.description = "okai ke pedo con este servicio esta bien chido we xd"
    auxOption._statePrices.push(
      {'available': true,
        'state': 'SON',
        'price': 20}
    );
    auxOption._statePrices.push(
      {'available': true,
        'state': 'default',
        'price': 25}
    );
    
    auxService._options.push(auxOption);
    auxOption = new StoreElement();
    auxOption.elementID ='option2';
    auxOption.name = 'lugar b';
    auxOption._statePrices.push(
      {'available': true,
        'state': 'CDMX',
        'price': 200}
    );
    auxOption._statePrices.push(
      {'available': true,
        'state': 'default',
        'price': 35}
    );
    auxService._options.push(auxOption);
    this._services.push(auxService);

   

    auxService = new StoreElement();
    auxService.elementID = '2';
    auxService.name = "Hard Drive";
    auxService.basePrice = 200;
    auxService.imageUrl = 'http://vmi118470.contaboserver.net/~wedproduction/sites/default/files/2017-10/drone.png';
    this._services.push(auxService);

    auxService = new StoreElement();
    auxService.elementID = 'Service3';
    auxService.name = "TestService";
    auxService.basePrice = 100;
    auxService.active = true;
    auxService.imageUrl = 'http://vmi118470.contaboserver.net/~wedproduction/sites/default/files/2017-10/drone.png';
    auxService._statePrices.push(
      {'available': true,
        'state': 'SON',
        'price': 10}
    );
    this._services.push(auxService);

    this._currecies.push({'ISO':'USD', 'value':1 });
    this._currecies.push({'ISO':'MXN', 'value':18 });

    this._states.push({
      'ISO':'default',
      'name':'default'});

      this._states.push({
        'ISO':'SON',
        'name':'Sonora'});

    this.loadPackages();
    this.loadVenues('elbicho');
    this.loadVenues('otracosa');

    this.setActualCurrency('USD');
    this.setActualState('default');
  }



  public loadPackages(){
    let auxElement = new wedPack();
    auxElement.elementID = 'packAwesome';
    auxElement.name = "Awesome";
    auxElement.description = "CEO of WedProduction, I love movies since I can remember, I've been producing films and commercials the last years and now I'm putting all that experience and all the internet advances for the most important day of your life: Your Wedding!";
    auxElement.basePrice = 2000;
    auxElement.optionRequiered = true;
    auxElement.paxRequiered = false;
    auxElement._elementLinks = new Array();
    auxElement._elementLinks.push('Service1');
    auxElement._statePrices = new Array();
    auxElement._statePrices.push(
      {'available': true,
        'state': 'SON',
        'price': 100}
    );
    auxElement.colorBase = '#289BC1';
    auxElement.colorSecondary = '#BCDFEC';
    auxElement.colorComplement = '#5EAFD1';

    auxElement.optionForce = true;
    auxElement.optionsEnabled = true;
    auxElement._options = new Array();
    
    let auxElementOpt = new StoreElement();
    auxElementOpt.elementID = 'packAwesomePhoto';
    auxElementOpt.name = "Photo";
    auxElementOpt.basePrice = 1000;
    auxElementOpt.active = auxElement.optionsEnabled;
    auxElementOpt._statePrices = new Array();
    auxElementOpt._statePrices.push(
      {'available': true,
        'state': 'SON',
        'price': 250}
    );
    auxElementOpt.hearts = new Array();
    auxElementOpt.hearts.push('Photographer');
    auxElementOpt.hearts.push('Photographer Assistant');
    auxElementOpt.hearts.push('150 Retouched Pictures');
    auxElementOpt.hearts.push('All Camera Material');
    auxElementOpt.hearts.push('Producer');
    auxElementOpt.hearts.push('4 Hours Service');
    auxElementOpt.hearts.push('4 Hours ServiceWedProduction Event');

    auxElement._options.push(auxElementOpt);


     auxElementOpt = new StoreElement();
    auxElementOpt.elementID = 'packAwesomeVideo';
    auxElementOpt.name = "Video";
    auxElementOpt.active = auxElement.optionsEnabled;
    auxElementOpt.basePrice = 1500;
    auxElementOpt._statePrices = new Array();
    auxElementOpt._statePrices.push(
      {'available': true,
        'state': 'SON',
        'price': 250}
    );
    auxElementOpt.hearts = new Array();
    auxElementOpt.hearts.push('Cinematographer');
    auxElementOpt.hearts.push('Cinematographer Assistant');
    auxElementOpt.hearts.push('150 Retouched Pictures');
    auxElementOpt.hearts.push('All Camera Material');
    auxElementOpt.hearts.push('Producer');
    auxElementOpt.hearts.push('4 Hours Service');
    auxElementOpt.hearts.push('4 Hours ServiceWedProduction Event');
    auxElement._options.push(auxElementOpt);

    console.log('pushing pack', auxElement);
    this._packs.push(auxElement);

  }


  public loadVenues(elementID){
    let auxVenue = new WedVenue();
    auxVenue.elementID = elementID;
    auxVenue.name = 'The Beach Oh';
    auxVenue.paxRequiered = true;
    auxVenue.optionRequiered = true;
    auxVenue.optionForce = true;
    auxVenue.combinationRequiered = true;
    auxVenue._optionCombinations = new Array();
    auxVenue._options = new Array();
    auxVenue.minPax = 10;
    auxVenue.maxPax = 50;
    auxVenue.paxCost = 10;
    auxVenue.actualPax = auxVenue.minPax;
    auxVenue._paxStatePrices = new Array();
    auxVenue._paxStatePrices.push({
      'available': true,
    'state': 'default',
    'price': 14});
    auxVenue.basePrice = 100;
    auxVenue._statePrices= new Array();
    auxVenue._statePrices.push(
      {'available': true,
        'state': 'default',
        'price': 250}
    );

    auxVenue.imageUrl = "http://vmi118470.contaboserver.net/~wedproduction/sites/default/files/images/profile/wp-display-1495729314.png";
    auxVenue.hearts = new Array();
    auxVenue.hearts.push('5 Hours Rent');
    auxVenue.hearts.push('exampleru');
    auxVenue.hearts.push('exampleru');
    auxVenue.hearts.push('exampleru');
    auxVenue.hearts.push('exampleru');
    auxVenue.hearts.push('exampleru');
    auxVenue.heartImageUrl = 'http://vmi118470.contaboserver.net/~wedproduction/modules/wedstore/src/img/HVenues.png';

    let auxOptionComb= new StoreElement();
    auxOptionComb.name = "Premium Open Bar";
    auxOptionComb.elementID =auxVenue.elementID+"comb1";
    auxOptionComb.basePrice = 100;
    auxOptionComb._statePrices = new Array();
    auxOptionComb._statePrices.push({
      'available': true,
    'state': 'default',
    'price': 250});
    auxOptionComb.paxCost = 100;
    auxOptionComb._paxStatePrices = new Array();
    auxOptionComb._paxStatePrices.push({
      'available': true,
    'state': 'default',
    'price': 1000});

    auxVenue._optionCombinations.push(auxOptionComb);

    let auxOption = new StoreElement();
    auxOption.elementID = auxVenue.elementID+'opt1';
    auxOption.name = 'Open Bar';
    auxOption.basePrice = 50;
    auxOption._statePrices = new Array();
    auxOption._statePrices.push(
      {
      'available': true,
    'state': 'default',
    'price': 60});

    auxVenue._options.push(auxOption);

    this._venues.push(auxVenue);

  }


  public updateCost(){
    console.log('updateCost');
    this.total = this.wedStoreGetTotal();
    this.grandTotal = this.total * this.actualCurrency.value;
    console.log('total',this.total);
    console.log('grandTotal',this.grandTotal);
  }

  
  /**
    * getServiceByServiceID
    * returns a service based on the id
   **/
  
  public  getServiceByServiceID( serviceID ){
    console.log('getServiceByServiceID', serviceID);
    return <wedService> this.getStoreElementByID( serviceID , this._services);
  }

  getStoreElementByID( elementID:string, arrayToGet:StoreElement[] ){
    console.log( elementID );
    console.log( arrayToGet );
    for(let i = 0; i < arrayToGet.length; i++ ){
      if(arrayToGet[i].elementID == elementID){
        return arrayToGet[i];
      }
    }
  }


  /**
    * getCurrencyByName
    * returns a currency based on the name
   **/
  public getCurrency( ISO:string ){
    for(let i = 0; i < this._currecies.length; i++ ){
      if(this._currecies[i].ISO === ISO){
        return this._currecies[i];
      }
    }
  }

  public setActualCurrency( ISO:string ){
   this.actualCurrency = this.getCurrency( ISO );
   this.actualCurrencyISO = this.actualCurrency.ISO;
   //console.log('WEDSTORE currency set to ',this.actualCurrency);
  }

  public setActualState( ISO:string ){
    this.actualState = <iState>this._states.find(function (state) { return state.ISO === ISO; });
    this.acutalStateISO = this.actualState.ISO;
    this.actualStateName = this.actualState.name;
  }



   /**
    * wedStoreGetTotal
    * this function gets the total from the store. 
   **/
  public wedStoreGetTotal():number{
    let total = 0;
    total += this.getPackTotal();
    total += this.getVenuesTotal();
    total += this.getServicesTotal();
    return total;
      }

  
   public getSomeArrayTotal( arrayToGet:StoreElement[] ){
     let total = 0;
     arrayToGet.forEach(element => {
      console.log('getting total of',element.elementID); 
      total += element.getTotal( this.actualState.ISO ); 
       console.log('total got on iteration ', total);
     });
     console.log('getSomeArrayTotal',total);
     return total;
   }
   public getPackTotal (){return this.getSomeArrayTotal(this._packs);}
   public getVenuesTotal (){return this.getSomeArrayTotal(this._venues);}
   public getServicesTotal (){return this.getSomeArrayTotal(this._services);}

   public setPack( setTo:boolean, elementID:string ){StoreElement.setOption(elementID, setTo, false, this._packs); this.actualPackage = elementID; }
   public setVenue( setTo:boolean, elementID:string  ){StoreElement.setOption(elementID, setTo, false, this._venues); this.actualVenue = elementID; }
   public setService( setTo:boolean, elementID:string  ){StoreElement.setOption(elementID, setTo, true, this._services);}

   public calculatePackShowPrice(){
    console.log("cpsp1");
       this.packShowPrice = 0;
       this.packShowPrice = this.getPackTotal();
       console.log('pack raw price',this.packShowPrice);
       console.log("cpsp2");
       if(this.actualPackage != 'none'){
        console.log("cpsp3");
       let pack = this.getStoreElementByID(this.actualPackage, this._packs);
       if(pack){
        console.log("cpsp4");
        pack._elementLinks.forEach( link => {
          console.log("cpsp5");
         let service = this.getServiceByServiceID(link);
         this.packShowPrice += service.getTotal( this.actualState.ISO );
       });
      }
      }
      console.log("cpsp");
     
   }

}


interface iCurrency {  
  ISO: string;
  value: number;
}

interface iState
  { 
    ISO:string;
    name:string;
   }
