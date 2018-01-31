import {IStoreElement} from "./IstoreElement";
import {IStatePrice} from "./IStatePrice";

/** 
 * Esta clase engloba todos los tipos de elementos de la tienda en uno solo. 
 * y crea una funcionalidad base que pueden usar todos los elementos.
 * como precios por estado y precios anidados, opciones.
 * incluye datos generales.
 * 
 * **/
export class StoreElement implements IStoreElement{
    //identifier and base info.
    public elementID:string;
    public name:string;
    public description:string;
    public hearts:string[];
    public heartImageUrl:string;
    public imageUrl:string;
    public _options:StoreElement[];
    public _optionCombinations:StoreElement[];
    public _elementLinks:string[]; // contains ids to other elements, used on service links for packs
    
    //style options
    public colorBase:string;
    public colorSecondary:string;
    public colorComplement:string;

    //cart calculator info
    public active: boolean;
    public actualPax: number;
    public optionRequiered: boolean;
    public optionForce: boolean; //sets  this element to requiere at least 1 option; so the options cant be deselected.
    public optionsEnabled: boolean; //sets this element options default value
    public multiOption: boolean;
    public combinationRequiered: boolean;
    public multiCombination: boolean;
    public fullOptions: boolean; //defines if all options are set.

    //prices
    public basePrice:number;
    public paxCost:number;
    public _statePrices:IStatePrice[];
    public _paxStatePrices:IStatePrice[];

    //pax info
    public paxRequiered:boolean;
    public minPax:number;
    public maxPax:number;

    constructor(){
        this.elementID = 'none';
        this.active = false;
        this.actualPax = 0;
        this.basePrice = 0;
        this.paxCost = 0;
        this._paxStatePrices = new Array();
        this._statePrices = new Array();
        this._options = new Array();
        this._optionCombinations = new Array();
        this.paxRequiered = false;
        this.minPax = 0;
        this.maxPax = 0;
        this.optionRequiered = false;
        this.multiOption = false;
        this.combinationRequiered = false;
        this.multiCombination = false;
        this.optionsEnabled = false;
        this. optionForce = false;
    }
    

    getTotal( state: string ): number {
        console.log('getting total:'+this.elementID+' / '+state);
        console.log(this._statePrices);
        console.log(this.active);
        console.log(this.getTotalCost( state ));
        //retorna el precio si este elemento esta activo.
        if(!this.active) return 0;
        return this.getTotalCost( state );
    }

    getTotalCost( state:string ){
        
        let total = 0;
        //obtener precios segun estado.
        let bp = this.getStatePriceByName(state, this._statePrices);
        let pp = this.getStatePriceByName(state, this._paxStatePrices);
        if(bp == -1){ bp = this.basePrice;}
        if(pp == -1){ pp = this.paxCost; }

        console.log('obtained bp and pp on getTotalCost: '+bp + ' - '+ pp);

        //asignar precio base.
        total = bp;
        //supar precio de paxes, si es requerido
        if( this.paxRequiered ){
            total += pp*this.actualPax;
        }
        //sumar precio de opciones si es requerido.
        if(this.optionRequiered){ total += this.getOptionsCost(this._options,state); }
        if(this.combinationRequiered){  total += this.getOptionsCost(this._optionCombinations,state); }

        //retorna el total obtenido. 
        return total;
    }
    

    getOptionsCost( options:StoreElement[], state:string):number {
        //da el total de las opciones especificadas si estan activas.
        let total = 0;
        options.forEach(option => {
            total += option.getTotal( state );
        });
        console.log('given option cost', total );
        return total;
    }

    static setOption(elementID:string, set:boolean, multi:boolean , options:StoreElement[], forceOption:boolean = false){
        let optionSelected = null;
        let activeOptionNumber = 0;
        options.forEach(option => {
            if(option.elementID == elementID ){
                
                option.active = set;
                optionSelected = option;
                console.log('optionSelected',optionSelected);
            }else{
                console.log("not it, must "+set+" and "+multi);
                if(set && !multi){
                    //si no es el elemento indicado, y se pretendo setear en activo, y no se permiten multiopciones, se coloca false, ya que solo se acepta una opcion y no es esta.
                    option.active = false;
                }
            }
            if(option.active) activeOptionNumber++;
        });
        console.log('check force 0vs'+activeOptionNumber+'  truevs'+forceOption+' falsevs'+set)
        if(activeOptionNumber == 0 && forceOption && !set){
            optionSelected.active = true; 
        }

    }

    static getActiveOptionCount(options:StoreElement[]){
        let activeOptionNumber = 0;
        options.forEach(option => {
            if(option.active) activeOptionNumber++;
        });
        return activeOptionNumber;
    }

    calculateFullOptions(){
        console.log('calculateFullOptions');
        let activeOptionNumber = StoreElement.getActiveOptionCount(this._options);
        console.log('activeOptionNumber'+ activeOptionNumber+ 'vs'+ this._options.length);
        if( activeOptionNumber === this._options.length){ this.fullOptions = true; }
        else{ this.fullOptions = false; }
    }


    getStatePriceByName( state:string, statePrices:IStatePrice[] ): number{
        console.log('getStatePriceByName: '+state);
        console.log(statePrices);
        let ret = -1;
        statePrices.forEach(statePrice => {
          if(statePrice.state === state && statePrice.available == true){
              console.log('state price found');
              ret= statePrice.price;
          }
     });
     return ret;
    }


    managePax( action:MANAGE_PAX_ACTIONS ){
        switch(action) {
            case MANAGE_PAX_ACTIONS.ADD:
                this.actualPax ++;
                if(this.maxPax > 0 && this.actualPax > this.maxPax) this.actualPax = this.maxPax;
            break;
            case MANAGE_PAX_ACTIONS.REMOVE:
            this.actualPax --;
            if(this.minPax >= 0 && this.actualPax < this.minPax) this.actualPax = this.minPax;
            break;
        } 
    }
    
}

export enum MANAGE_PAX_ACTIONS {
    ADD = 1,
    REMOVE = 0
}