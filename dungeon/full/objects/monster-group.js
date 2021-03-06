import { MapGroup } from "./map-group.js";
import { Monster } from "./monster.js";
import { MAPSCALE } from './map.js';

export class MonsterGroup extends MapGroup {


    constructor(game, map) {

        super(game, map);

        // Tilesheet ID for the monsters
        const ids = [130, 169, 172, 175, 178]

        // Call fill to create monsters from the object layer
        ids.forEach((id) => {
            this.fillGroup(id, 'characters', id - 120);
        });

    }

    fillGroup(id, spriteSheet, spriteID) {

        this.map.createFromObjects('Monsters', id, spriteSheet, spriteID, true, false, this, Monster);
        this.setAll('body.immovable', true);
        this.setAll('enableBody', true);
        this.forEach((sprite) => { sprite.body.setSize(sprite.width * MAPSCALE, sprite.height * MAPSCALE); });

    }

    collide(object, monster) {
        monster.collide();
    }

    monsterHit(object, monster) {
        monster.monsterHit(object, monster);
    }

    monsterHitPlayer(player, monster) {
        monster.monsterHitPlayer(player, monster);
    }
}