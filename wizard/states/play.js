
var playState = {

    map: {},
    player: {},
    mineLayer: {},
    preload: function () {

        console.log('play');
        var loadingMessage = game.add.text(80, 150, "Playing....", { font: '30px Courier', fill: '#ff0000' });
    },

    create: function () {

        this.map = game.add.tilemap('test_map');
        this.map.addTilesetImage('basic', 'basic_tiles');


        this.mineLayer = this.map.createLayer('Mine');
        this.mineLayer.setScale(4);
        this.mineLayer.resizeWorld();
        // this.mineLayer.debug = true;

        this.map.setCollisionBetween(0, 7, true, 'Mine');

        // Create Player
        this.player = game.add.sprite(200, 250, 'characters');
        this.player.scale.setTo(4, 4);

        game.physics.enable(this.player, Phaser.Physics.ARCADE);

        this.player.animations.add('down', [3, 4, 5], 10, true);
        this.player.animations.add('left', [17, 16, 15], 10, true);
        this.player.animations.add('right', [29, 28, 27], 10, true);
        this.player.animations.add('up', [39, 40, 41], 10, true);
        this.player.animations.add('stand', [4], 10, true);
        this.player.animations.play('stand');
        this.player.body.collideWorldBounds = true;

        cursors = game.input.keyboard.createCursorKeys();

        game.camera.follow(this.player);

        playerSpeed = 250;

    },

    worldCollide: function (thingA, thingB) {
        console.log('hit stuff', thingA, thingB);
    },

    update: function () {

        game.physics.arcade.collide(this.player, this.mineLayer);

        this.player.body.velocity.setTo(0, 0);

        if (cursors.up.isDown) {
            this.player.body.velocity.setTo(0, -playerSpeed);
            this.player.animations.play('up');

        }
        else if (cursors.down.isDown) {
            this.player.body.velocity.setTo(0, playerSpeed);
            this.player.animations.play('down');

        }

        else if (cursors.left.isDown) {
            this.player.body.velocity.setTo(-playerSpeed, 0);
            this.player.animations.play('left');

        }
        else if (cursors.right.isDown) {
            this.player.body.velocity.setTo(playerSpeed, 0);
            this.player.animations.play('right');

        } else {
            this.player.animations.play('stand');

        }



    }
}