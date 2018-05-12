import { ChestGroup } from './chest-group.js';
import { DoorGroup } from './door-group.js';
import { MapGroup } from './map-group.js';
import { MonsterGroup } from './monster-group.js';
import { GameObject } from './game-object.js';
import { CoinGroup } from './coin-group.js';

export const MAPSCALE = 2;

export class Map extends GameObject {

    constructor(game) {

        super(game);

        this.map = this.game.add.tilemap('test_map');
        this.map.addTilesetImage('basic', 'basic_tiles');

        this.mineLayer = this.map.createLayer('Mine');
        this.mineLayer.setScale(MAPSCALE);
        this.mineLayer.resizeWorld();

        this.mineLayer.debug = false;

        this.map.setCollisionBetween(0, 7, true, this.mineLayer);

        /** Create objects from the object layers  */

        /** Coins */
        this.coinsGroup = new CoinGroup(this.game, this.map);

        /** Gems */        
        this.gemGroup = new GemGroup(this.game, this.map);

        /** Blocking objects */
        this.blockingObjects = new BlockingGroup(this.game, this.map);
        
        /** Monster group */
        this.monsterGroup = new MonsterGroup(this.game, this.map);

        /** Doors have an additional animation */
        this.doorsGroup = new DoorGroup(this.game, this.map);

        /** Chests have an additional animation */
        this.chestsGroup = new ChestGroup(this.game, this.map);;

    }

    update() {

        // Check to see if the player hits the mine layer
        this.game.physics.arcade.collide(this.game.player, this.mineLayer);

        // Player collides with coins and gems
        this.game.physics.arcade.collide(this.game.player, this.coinsGroup, this.coinsGroup.collide);
        this.game.physics.arcade.collide(this.game.player, this.gemGroup, this.gemGroup.collide);

        // Player collides with blocking objects, doors and chests
        this.game.physics.arcade.collide(this.game.player, this.blockingObjects, this.blockingObjects.collide);
        this.game.physics.arcade.collide(this.game.player, this.doorsGroup, this.doorsGroup.collide);
        this.game.physics.arcade.collide(this.game.player, this.chestsGroup, this.chestsGroup.collide);

        // Check to see if the player weapon hits a monster.
        this.game.physics.arcade.overlap(this.game.player.weapon, this.monsterGroup, this.monsterGroup.monsterHit);

        // Monster collisions
        this.game.physics.arcade.collide(this.monsterGroup, this.monsterGroup);
        this.game.physics.arcade.collide(this.game.player, this.monsterGroup, this.monsterGroup.monsterHitPlayer);

        this.game.physics.arcade.collide(this.monsterGroup, this.mineLayer);
        this.game.physics.arcade.collide(this.monsterGroup, this.blockingObjects);
        this.game.physics.arcade.collide(this.monsterGroup, this.doorsGroup);


    }
}