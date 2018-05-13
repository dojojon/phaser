import { MapGroup } from "./map-group.js";

export class GemGroup extends MapGroup {

    constructor(game, map) {

        super(game, map);
        
        this.fillGroup(70, 'tiles', 68); 

    }
   
}