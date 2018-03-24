export class Boot extends Phaser.State {

    create() {

        console.log('boot');

        // Start  up the physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Stop the smooth scaling of our sprites, to retain the pixel art.
        this.game.stage.smoothed = false;

        // Move onto load
        this.game.state.start('load');
    }


}