import { MapGroup } from "./map-group.js";

export class ChestGroup extends MapGroup {

    constructor(game, map) {

        super(game, map);
        this.fillGroup(37, 'things', 6);

    }

    fillGroup(id, spriteSheet, spriteID) {

        super.fillGroup(id, spriteSheet, spriteID);
        this.callAll('animations.add', 'animations', 'open', [6, 18, 30, 42], 20, false)

    }

    collide(player, chest) {

        super.collide(player, chest);
        if (!chest.isOpen) {
            chest.animations.play('open');
            chest.isOpen = true;
        }

    }
}