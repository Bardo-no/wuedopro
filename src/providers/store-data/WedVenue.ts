import { StoreElement } from "./StoreElement";

export class WedVenue extends StoreElement{
    
    getTotalCost( state:string = 'default'){
      //obtenemos el costo normal
      let total = super.getTotalCost(state);
     

  
      //sumamos el paxcost para todas las opciones activas.
      let alloptions = this._options.concat(this._optionCombinations);
        alloptions.forEach(option => {
            if(option.active){
                let pp = this.getStatePriceByName(state, option._paxStatePrices);
                if(pp == -1){ pp = option.paxCost; }
                total += (this.actualPax * pp); //added pax cost for each option active.
            }
        });

        return total;
    }
}