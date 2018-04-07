import { GameObject } from './game-object.js';

//** Player Game Object */
export class Player extends GameObject {


    constructor(game, x, y) {

        super(game);

        // Enable physics
        this.enableBody = true;
        this.immovable = true;

        // Create Player
        this.player = this.game.add.sprite(x, y, 'player_f');
        this.player.scale.setTo(1.6, 1.8);
        this.player.anchor.setTo(0.5, 0.5);
        this.add(this.player);

        this.game.camera.follow(this.player);

        // Player animations
        this.player.animations.add('down', [1, 2], 10, true);
        this.player.animations.add('left', [7, 8], 10, true);
        this.player.animations.add('right', [13, 14], 10, true);
        this.player.animations.add('up', [19, 20], 10, true);

        this.player.animations.add('down_strike', [4], 10, true);
        this.player.animations.add('left_strike', [10], 10, true);
        this.player.animations.add('right_strike', [16], 10, true);
        this.player.animations.add('up_strike', [22], 10, true);

        this.player.animations.add('stand', [2], 10, true);
        this.player.animations.play('stand');

        // Collide player with the world.
        this.player.body.collideWorldBounds = true;

        // Input 
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.playerSpeed = 100;

    }

    update() {
        
        super.update();
        
        this.player.body.velocity.setTo(0, 0);

        // // Move the player
        if (this.cursors.left.isDown) {
            this.player.body.velocity.setTo(-this.playerSpeed, 0);
            this.player.animations.play('left');
        } else if (this.cursors.right.isDown) {
            this.player.body.velocity.setTo(this.playerSpeed, 0);
            this.player.animations.play('right');
        } else if (this.cursors.up.isDown) {
            this.player.body.velocity.setTo(0, -this.playerSpeed);
            this.player.animations.play('up');
        } else if (this.cursors.down.isDown) {
            this.player.body.velocity.setTo(0, this.playerSpeed);
            this.player.animations.play('down');
        } else {
            this.player.animations.play('stand');
        }

    }

}


