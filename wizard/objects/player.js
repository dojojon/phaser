export class Player extends Phaser.Sprite {

    constructor(game, x, y) {

        super(game);

        // Enable physics



        // Create Player
        this.player = game.add.sprite(x, y, 'player_m');
        this.player.scale.setTo(1.6, 1.8);
        this.player.anchor.setTo(0.5, 0.5);

        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

        this.weapon = this.game.add.sprite(0, 0, 'player_m', );
        this.weapon.anchor.setTo(0.5, 0.5);
        this.weapon.scale.setTo(1, 1);
        this.weapon.frame = 25;
        this.weapon.visible = false;
        this.player.addChild(this.weapon);


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
        this.player.body.collideWorldBounds = true;

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.hitKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);

        this.game.camera.follow(this.player);

        this.playerSpeed = 100;

    }

    update() {

        this.player.body.velocity.setTo(0, 0);

        const hitKeyPressed = this.hitKey.isDown;

        if (hitKeyPressed) {

            this.weapon.visible = true;
            this.game.world.bringToTop(this.player);
            this.game.world.bringToTop(this.weapon);
            if (this.cursors.left.isDown) {
                this.player.animations.play('left_strike');
                this.weapon.position.setTo(-13, 2);
                this.weapon.angle = -90;
            }
            else if (this.cursors.right.isDown) {
                this.player.animations.play('right_strike');
                this.weapon.position.setTo(13, 2);
                this.weapon.angle = 90;
            }
            else if (this.cursors.up.isDown) {
                this.player.animations.play('up_strike');
                this.weapon.position.setTo(4, -12);
                this.weapon.z = -10;
                this.weapon.angle = 0;

                this.game.world.moveDown(this.weapon);
                this.game.world.moveUp(this.player);
            }
            else {
                // if (this.cursors.down.isDown) {
                this.player.animations.play('down_strike');
                this.weapon.position.setTo(3, 12);

                this.weapon.angle = 180;

                // } else {
                //     this.player.animations.play('stand');
            }

        } else {

            this.weapon.visible = false;

            if (this.cursors.left.isDown) {
                this.player.body.velocity.setTo(-this.playerSpeed, 0);
                this.player.animations.play('left');
            }
            else if (this.cursors.right.isDown) {
                this.player.body.velocity.setTo(this.playerSpeed, 0);
                this.player.animations.play('right');
            }
            else if (this.cursors.up.isDown) {
                this.player.body.velocity.setTo(0, -this.playerSpeed);
                this.player.animations.play('up');

            }
            else if (this.cursors.down.isDown) {
                this.player.body.velocity.setTo(0, this.playerSpeed);
                this.player.animations.play('down');
            } else {
                this.player.animations.play('stand');

            }
        }


    }


}

