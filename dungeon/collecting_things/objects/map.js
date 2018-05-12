import { GameObject } from './game-object.js';
import { BlockingGroup } from './blocking-group.js';

export const MAPSCALE = 2;

export class Map extends GameObject {

    constructor(game) {

        super(game);

        this.map = this.game.add.tilemap('test_map');
        this.map.addTilesetImage('basic', 'basic_tiles');

        this.mineLayer = this.map.createLayer('Mine');
        this.mineLayer.setScale(MAPSCALE);
        this.mineLayer.resizeWorld();

        this.map.setCollisionBetween(0, 7, true, this.mineLayer);

        /** Blocking objects */
        this.blockingObjects = new BlockingGroup(this.game, this.map);

    }

    update() {

        super.update();

        /** Check to see if the player hits the mine layer */
        this.game.physics.arcade.collide(this.game.player, this.mineLayer);

        /** Player collides with blocking objects */
        this.game.physics.arcade.collide(this.game.player, this.blockingObjects, this.blockingObjects.collide);

    }
}