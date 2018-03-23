
export class Menu extends Phaser.State {

    create() {

        console.log('menu');

        var background = this.game.add.sprite(0, 0, 'background');

        var menuFont = { font: '60px Courier', fill: '#cc2222' };

        var menuLeft = 60;
        var menuTitle = this.game.add.text(menuLeft, 100, "The Dungeon", menuFont);
        var pressToStart = this.game.add.text(menuLeft, this.game.camera.height - 100, "Press 'S' to start", menuFont);
        var startKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        startKey.onDown.addOnce(this.start, this);
    }

    update() {

    }

    start() {
        this.game.state.start('play');
    }

}
