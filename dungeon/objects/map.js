import { ChestGroup } from './chest-group.js';
import { DoorGroup } from './door-group.js';
import { MAPSCALE } from '../settings.js';
import { MapGroup } from './map-group.js';
import { MonsterGroup } from './monster-group.js';

export class Map {

    constructor(game) {

        this.game = game;

        this.map = this.game.add.tilemap('test_map');
        this.map.addTilesetImage('basic', 'basic_tiles');

        this.mineLayer = this.map.createLayer('Mine');
        this.mineLayer.setScale(MAPSCALE);
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

        //Monster group
        this.monsterGroup = new MonsterGroup(this.game, this.map);

        // Doors have an additional animation
        this.doorsGroup = new DoorGroup(this.game, this.map);

        // Chests have an additional animation
        this.chestsGroup = new ChestGroup(this.game, this.map);;

    }

    createObjectGroup() {

        return new MapGroup(this.game, this.map);

    }

    update(player) {

        // Check to see if the player hits the mine layer
        this.game.physics.arcade.collide(player, this.mineLayer);

        // Player collides with coins and gems
        this.game.physics.arcade.collide(player, this.coinsGroup, this.coinsGroup.collide);
        this.game.physics.arcade.collide(player, this.gemGroup, this.gemGroup.collide);

        // Player collides with blocking objects, doors and chests
        this.game.physics.arcade.collide(player, this.blockingObjects, this.blockingObjects.collide);
        this.game.physics.arcade.collide(player, this.doorsGroup, this.doorsGroup.collide);
        this.game.physics.arcade.collide(player, this.chestsGroup, this.chestsGroup.collide);

        // Monster collisions
        this.game.physics.arcade.collide(this.monsterGroup, this.monsterGroup);

        this.game.physics.arcade.collide(this.monsterGroup, this.mineLayer);
        this.game.physics.arcade.collide(this.monsterGroup, this.blockingObjects);
        this.game.physics.arcade.collide(this.monsterGroup, this.doorsGroup);


    }
}