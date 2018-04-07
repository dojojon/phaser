
export class Menu extends Phaser.State {

    create() {

        // Add a background image 
        var background = this.game.add.sprite(0, 0, 'background');

        // Set a font that we will use on the menu state.
        var menuFont = { font: '60px Courier', fill: '#cc2222' };

        // We will align the title and menu 60 pixels in.
        var menuLeft = 60;

        // Display the game tile and instructions
        this.game.add.text(menuLeft, 100, "The Dungeon", menuFont);
        this.game.add.text(menuLeft, this.game.camera.height - 100, "Press 'S' to start", menuFont);

        // Set up a handler for the key press
        var startKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        startKey.onDown.addOnce(this.start, this);
    }

    start() {
        this.game.state.start('play');
    }

}
