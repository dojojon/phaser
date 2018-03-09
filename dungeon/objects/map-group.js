import { GameObject } from './game-object.js';
import { MAPSCALE } from '../settings.js';

export class MapGroup extends GameObject {
    constructor(game, map) {
        super(game);

        this.enableBody = true;
        this.immovable = true;

        this.map = map;

        this.scale.set(MAPSCALE);

    }

    fillGroup(id, spriteSheet, spriteID) {

        this.map.createFromObjects('Objects', id, spriteSheet, spriteID, true, false, this);

        this.setAll('body.immovable', true);
        this.setAll('enableBody', true);

        this.forEach((sprite) => { sprite.body.setSize(sprite.width * MAPSCALE, sprite.height * MAPSCALE); });

    }

}