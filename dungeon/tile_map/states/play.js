import { Player } from '../objects/player.js';

export class Play extends Phaser.State {

    create() {

        this.player = new Player(this.game, 100, 100);
     
    }

}
