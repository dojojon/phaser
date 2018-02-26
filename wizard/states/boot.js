var bootState = {

    create: function () {

        console.log('boot');

        // Start  up the physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Stop the smooth scaling of our sprites, to retain the pixel art.
        game.stage.smoothed = false;

        // Move onto load
        game.state.start('load');
    }
}