
import { Player } from '../objects/player.js';
import { Map } from '../objects/map.js';
import { HeadsUpDisplay } from '../ui/heads-up-display.js';

export class Play extends Phaser.State {

    create() {

        this.game.camera.roundPx = true;

        this.map = new Map(this.game, this.player);

        this.player = new Player(this.game, 100, 100);

        this.headUpDisplay = new HeadsUpDisplay(this.game, this.player);

    }

    update() {

        this.map.update(this.player);

        this.player.update();

    }

    render() {

        if (1 == 2) {

            this.game.debug.body(this.player);
            if (this.doorsGroup) {

                this.doorsGroup.forEach((door) => {

                    if (door.isOpen) {
                        this.game.debug.body(door, '#ff000088');
                    } else {
                        this.game.debug.body(door, '#0000ff88');
                    }
                });
            }

        }
    }

}