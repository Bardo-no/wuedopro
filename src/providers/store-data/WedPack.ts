import { StoreElement } from "./StoreElement";

export class wedPack extends StoreElement{
   
    
    constructor(){
        super();
    }

    /**
     * el paquete calcula su costo diferente, ya que su precio base se usa solo si el paquete esta completo.
     * **/
    getTotalCost( state:string = 'default' ){
        
        let total = 0;
        //obtener precios segun estado.
        let bp = this.getStatePriceByName(state, this._statePrices);
        let pp = this.getStatePriceByName(state, this._paxStatePrices);
        if(bp == -1){ bp = this.basePrice;}
        if(pp == -1){ pp = this.paxCost; }

        console.log('obtained bp and pp on getTotalCost: '+bp + ' - '+ pp);

        
        if( this.paxRequiered ){
            total += pp*this.actualPax;
        }
        //sumar precio de opciones si es requerido.
        console.log('optionsrequiered', this.optionRequiered);
        if(this.optionRequiered){ 
            this.calculateFullOptions();
            if(this.fullOptions){ //si el paquete esta completo usar precio base
                console.log('options completed');
                total += bp;
            }else{ //si no obtener costo de opciones seleccionadas.
                console.log('getting options cost.');
            total += this.getOptionsCost(this._options,state); 
        }
        }
        if(this.combinationRequiered){  total += this.getOptionsCost(this._optionCombinations,state); }

        //retorna el total obtenido. 
        console.log('WEDPACK TOTALCOST', total);
        console.log('thispack is active? ',this.active);
        return total;
    }


}