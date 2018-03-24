import { Boot } from '/states/boot.js';
import { Load } from '/states/load.js';
import { Menu } from '/states/menu.js';
import { Play } from '/states/play.js';

class Game extends Phaser.Game {

    constructor() {

        super(800, 600, Phaser.AUTO, 'gameDiv');

        this.state.add('boot', Boot, false);
        this.state.add('load', Load, false);
        this.state.add('menu', Menu, false);
        this.state.add('play', Play, false);

        this.state.start('boot');
    }

}

new Game();