
export class Load extends Phaser.State {

    preload() {

        console.log('load');

        // Display a loading message
        var loadingMessage = this.game.add.text(80, 150, "Loading....", { font: '30px Courier', fill: '#fff' });

        // Load the menu background
        this.game.load.image('background', 'assets/background.jpg');

        // Male Player
        this.game.load.spritesheet('player_m', 'assets/Tiny16-ExpandedMaleSprites.png', 16, 16);

        // Female Player
        this.game.load.spritesheet('player_f', 'assets/Tiny16-ExpandedFemaleSprites.png', 16, 16);

    }

    create() {

        this.game.state.start('menu');

    }

}
