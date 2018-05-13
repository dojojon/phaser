import { MapGroup } from "./map-group.js";

export class CoinGroup extends MapGroup {

    constructor(game, map) {

        super(game, map);
        
        this.fillGroup(69, 'tiles', 69); 

    }
   
}