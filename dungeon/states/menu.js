var menuState = {

    preload: function () {

        console.log('menu');

        var background = game.add.sprite(0, 0, 'background');

        var menuFont = { font: '60px Courier', fill: '#000' };

        var menuLeft = 60;
        var menuTitle = game.add.text(menuLeft, 100, "Wizard", menuFont);
        var pressToStart = game.add.text(menuLeft, game.camera.height - 100, "Press 'S' to start.", menuFont);
        var startKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        startKey.onDown.addOnce(this.start, this);
    },

    start: function () {
        game.state.start('play');
    }
}   