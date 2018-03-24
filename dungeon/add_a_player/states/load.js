
export class Load extends Phaser.State {

    preload() {

        console.log('load');

        // Display a loading message
        var loadingMessage = this.game.add.text(80, 150, "Loading....", { font: '30px Courier', fill: '#fff' });

        // Load the menu background
        this.game.load.image('background', 'assets/background.jpg');

    }

    create() {

        this.game.state.start('menu');

    }

}
