
var playState = {

    map: {},
    player: {},
    mineLayer: {},
    coinsGroup: {},
    gemGroup: {},
    doorsGroup: {},
    chestsGroup: {},
    blockingObjects: {},

    preload: function () {

        console.log('play');
        var loadingMessage = game.add.text(80, 150, "Playing....", { font: '30px Courier', fill: '#ff0000' });
    },

    create: function () {
        game.camera.roundPx = true;

        this.createMap();
        this.createPlayer();

    },


    createPlayer: function () {

        // Create Player
        this.player = game.add.sprite(100, 100, 'characters');
        this.player.scale.setTo(1.6, 1.8);

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

        playerSpeed = 100;
    },

    createMap: function () {
        const mapScale = 2;
        this.map = game.add.tilemap('test_map');
        this.map.addTilesetImage('basic', 'basic_tiles');

        this.mineLayer = this.map.createLayer('Mine');
        this.mineLayer.setScale(mapScale);
        this.mineLayer.resizeWorld();

        this.mineLayer.debug = false;

        this.map.setCollisionBetween(0, 7, true, this.mineLayer);

        // Create objects from the object layers
        this.coinsGroup = this.createObjectGroup();
        this.fillGroup(69, 'tiles', 68, mapScale, this.coinsGroup);

        this.gemGroup = this.createObjectGroup();
        this.fillGroup(70, 'tiles', 69, mapScale, this.gemGroup);

        this.blockingObjects = this.createObjectGroup();
        this.fillGroup(59, 'tiles', 58, mapScale, this.blockingObjects); // rocks
        this.fillGroup(55, 'tiles', 54, mapScale, this.blockingObjects); // table
        this.fillGroup(46, 'tiles', 45, mapScale, this.blockingObjects); // bed head
        this.fillGroup(54, 'tiles', 53, mapScale, this.blockingObjects); // bed foot
        this.fillGroup(40, 'tiles', 39, mapScale, this.blockingObjects); // column
        this.fillGroup(32, 'tiles', 31, mapScale, this.blockingObjects); // well
        this.fillGroup(48, 'tiles', 47, mapScale, this.blockingObjects); // statue
        this.fillGroup(47, 'tiles', 46, mapScale, this.blockingObjects); // chair

        // Doors have an additional animation
        this.doorsGroup = this.createObjectGroup();
        this.fillGroup(49, 'things', 1, mapScale, this.doorsGroup);
        this.doorsGroup.callAll('animations.add', 'animations', 'open', [0, 12, 24, 36], 20, false);

        // Chests have an additional animation
        this.chestsGroup = this.createObjectGroup();
        this.fillGroup(37, 'things', 6, mapScale, this.chestsGroup);
        this.chestsGroup.callAll('animations.add', 'animations', 'open', [6, 18, 30, 42], 20, false);

    },

    createObjectGroup: function () {
        const group = game.add.group();
        group.enableBody = true;
        group.immovable = true;
        return group;
    },

    fillGroup: function (id, spriteSheet, spriteID, mapScale, group) {

        this.map.createFromObjects('Objects', id, spriteSheet, spriteID, true, false, group);

        group.setAll('body.immovable', true);
        group.setAll('enableBody', true);
        group.scale.set(mapScale, mapScale);
        group.forEach(function (sprite) { sprite.body.setSize(sprite.width * group.scale.x, sprite.height * group.scale.y) })

        return group;

    },

    doorCheck: function (player, door) {
        if (!door.isOpen) {
            door.animations.play('open');
            door.isOpen = true;
            door.body.enable = false;
        }
    },

    chestCheck: function (player, chest) {
        if (!chest.isOpen) {
            chest.animations.play('open');
            chest.isOpen = true;
        }
    },

    update: function () {

        game.physics.arcade.collide(this.player, this.mineLayer);
        game.physics.arcade.collide(this.player, this.coinsGroup);
        game.physics.arcade.collide(this.player, this.gemGroup);
        game.physics.arcade.collide(this.player, this.blockingObjects);
        game.physics.arcade.collide(this.player, this.doorsGroup, this.doorCheck);
        game.physics.arcade.collide(this.player, this.chestsGroup, this.chestCheck);

        this.player.body.velocity.setTo(0, 0);

        if (cursors.left.isDown) {
            this.player.body.velocity.setTo(-playerSpeed, 0);
            this.player.animations.play('left');

        }
        else if (cursors.right.isDown) {
            this.player.body.velocity.setTo(playerSpeed, 0);
            this.player.animations.play('right');
        }
        else if (cursors.up.isDown) {
            this.player.body.velocity.setTo(0, -playerSpeed);
            this.player.animations.play('up');

        }
        else if (cursors.down.isDown) {
            this.player.body.velocity.setTo(0, playerSpeed);
            this.player.animations.play('down');
        } else {
            this.player.animations.play('stand');

        }

    },

    render: function () {

        if (1 == 2) {

            game.debug.body(this.player);
            if (this.doorsGroup) {

                this.doorsGroup.forEach((door) => {


                    if (door.isOpen) {
                        game.debug.body(door, '#ff000088');
                    } else {
                        game.debug.body(door, '#0000ff88');
                    }
                });
            }

        }
    }
}               