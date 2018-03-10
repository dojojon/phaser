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

    collide(playerSprite, chest) {

        super.collide(playerSprite, chest);

        if (!chest.isOpen) {
            chest.animations.play('open');
            chest.isOpen = true;

            if (chest.inventory) {
                console.debug('Inventory', chest.inventory);
                const parsed = JSON.parse(chest.inventory);

                const player = playerSprite.parent;
                playerSprite.parent.addInventory(parsed);

            } else {
                console.debug('No Inventory');
            }

        }

    }
}