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

    collide(playerSprite, door) {

        super.collide(playerSprite, door);

        const player = playerSprite.parent;

        console.debug('Key Required', door.key);
        const hasKey = player.hasKey(door.key);
        console.debug('hasKey', hasKey);

        if (door.locked && hasKey) {
            door.animations.play('open');
            door.locked = false;
            door.body.enable = false;
        }

    }
}