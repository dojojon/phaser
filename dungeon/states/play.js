import { MAPSCALE } from '../settings.js';
import { MapGroup } from '../objects/map-group.js';
import { Player } from '../objects/player.js';

export class Play extends Phaser.State {

    create() {

        this.game.camera.roundPx = true;

        this.createMap();
        this.player = new Player(this.game, 100, 100);

    }

    createMap() {
        this.mapScale = MAPSCALE;

        this.map = this.game.add.tilemap('test_map');
        this.map.addTilesetImage('basic', 'basic_tiles');

        this.mineLayer = this.map.createLayer('Mine');
        this.mineLayer.setScale(this.mapScale);
        this.mineLayer.resizeWorld();

        this.mineLayer.debug = false;

        this.map.setCollisionBetween(0, 7, true, this.mineLayer);

        // Create objects from the object layers
        this.coinsGroup = this.createObjectGroup();
        this.coinsGroup.fillGroup(69, 'tiles', 68);

        this.gemGroup = this.createObjectGroup();
        this.coinsGroup.fillGroup(70, 'tiles', 69);

        this.blockingObjects = this.createObjectGroup();
        this.blockingObjects.fillGroup(59, 'tiles', 58); // rocks
        this.blockingObjects.fillGroup(55, 'tiles', 54); // table
        this.blockingObjects.fillGroup(46, 'tiles', 45); // bed head
        this.blockingObjects.fillGroup(54, 'tiles', 53); // bed foot
        this.blockingObjects.fillGroup(40, 'tiles', 39); // column
        this.blockingObjects.fillGroup(32, 'tiles', 31); // well
        this.blockingObjects.fillGroup(48, 'tiles', 47); // statue
        this.blockingObjects.fillGroup(47, 'tiles', 46); // chair

        // Doors have an additional animation
        this.doorsGroup = this.createObjectGroup();
        this.doorsGroup.fillGroup(49, 'things', 1);
        // this.doorsGroup.callAll('animations.add', 'animations', 'open', [0, 12, 24, 36], 20, false);

        // Chests have an additional animation
        this.chestsGroup = this.createObjectGroup();
        this.chestsGroup.fillGroup(37, 'things', 6);
        // this.chestsGroup.callAll('animations.add', 'animations', 'open', [6, 18, 30, 42], 20, false);

    }

    createObjectGroup() {

        return new MapGroup(this.game, this.map);
        // const group = this.game.add.group();
        // group.enableBody = true;
        // group.immovable = true;
        // return group;
    }

    // fillGroup(id, spriteSheet, spriteID,  group) {

    //     this.map.createFromObjects('Objects', id, spriteSheet, spriteID, true, false, group);

    //     group.setAll('body.immovable', true);
    //     group.setAll('enableBody', true);
    //     group.scale.set( this.mapScale);
    //     group.forEach(function (sprite) { sprite.body.setSize(sprite.width * group.scale.x, sprite.height * group.scale.y) })

    //     return group;

    // }

    doorCheck(player, door) {
        if (!door.isOpen) {
            door.animations.play('open');
            door.isOpen = true;
            door.body.enable = false;
        }
    }

    chestCheck(player, chest) {
        if (!chest.isOpen) {
            chest.animations.play('open');
            chest.isOpen = true;
        }
    }

    update() {

        this.game.physics.arcade.collide(this.player, this.mineLayer);
        this.game.physics.arcade.collide(this.player, this.coinsGroup);
        this.game.physics.arcade.collide(this.player, this.gemGroup);
        this.game.physics.arcade.collide(this.player, );
        this.game.physics.arcade.collide(this.player, this.doorsGroup, this.doorCheck);
        this.game.physics.arcade.collide(this.player, this.chestsGroup, this.chestCheck);

        this.player.update();

    }

    render() {

        if (1 == 2) {

            this.game.debug.body(this.player);
            if (this.doorsGroup) {

                this.doorsGroup.forEach((door) => {

                    if (door.isOpen) {
                        this.game.debug.body(door, '#ff000088');
                    } else {
                        this.game.debug.body(door, '#0000ff88');
                    }
                });
            }

        }
    }

}