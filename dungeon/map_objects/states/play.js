import { Player } from '../objects/player.js';
import { Map } from '../objects/map.js';

export class Play extends Phaser.State {

    create() {

        this.map = new Map(this.game);

        this.player = new Player(this.game, 100, 100);
        this.game.player = this.player;
     
    }

}
