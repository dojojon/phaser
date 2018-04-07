import { GameObject } from "./game-object.js";

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

    }

    update() {
        super.update();

        /** Check to see if the player hits the mine layer */
        this.game.physics.arcade.collide(this.game.player, this.mineLayer)
    }

}