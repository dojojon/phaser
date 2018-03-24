
export class Play extends Phaser.State {

    create() {

        // Set a font that we will use on the menu state.
        var font = { font: '100px Courier', fill: '#007700' };

        // Display some text
        this.game.add.text(100, 100, "Playing", font);

    }

}
