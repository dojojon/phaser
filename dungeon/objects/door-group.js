import { MapGroup } from "./map-group.js";

export class DoorGroup extends MapGroup {

    constructor(game, map) {

        super(game, map);

        this.fillGroup(49, 'things', 1);

    }

    fillGroup(id, spriteSheet, spriteID) {

        super.fillGroup(id, spriteSheet, spriteID);
        this.callAll('animations.add', 'animations', 'open', [0, 12, 24, 36], 20, false);

    }

    collide(player, door) {

        super.collide(player, door);

        if (!door.isOpen) {
            door.animations.play('open');
            door.isOpen = true;
            door.body.enable = false;
        }

    }
}