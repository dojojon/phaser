
import { Player } from '../objects/player.js';
import { Map } from '../objects/map.js';
import { HeadsUpDisplay } from '../ui/heads-up-display.js';
import { HealthBar } from '../ui/health-bar.js';

export class Play extends Phaser.State {

    create() {

        this.game.camera.roundPx = true;

        this.map = new Map(this.game);

        this.player = new Player(this.game, 100, 100);

        this.game.player = this.player;

        this.headUpDisplay = new HeadsUpDisplay(this.game);
        this.healthBar = new HealthBar(this.game);

    }

    update() {

        // Check to see if the player is alive, if not change state
        if (this.player.health < 1) {
            this.game.state.start('menu');
        }

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