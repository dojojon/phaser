import { MapGroup } from "./map-group.js";

export class BlockingGroup extends MapGroup {

    constructor(game, map) {

        super(game, map);
        
        this.fillGroup(59, 'tiles', 58); // rocks
        this.fillGroup(55, 'tiles', 54); // table
        this.fillGroup(46, 'tiles', 45); // bed head
        this.fillGroup(54, 'tiles', 53); // bed foot
        this.fillGroup(40, 'tiles', 39); // column
        this.fillGroup(32, 'tiles', 31); // well
        this.fillGroup(48, 'tiles', 47); // statue
        this.fillGroup(47, 'tiles', 46); // chair

    }
   
}