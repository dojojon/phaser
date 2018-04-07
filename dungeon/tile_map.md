# The Dungeon

You can find our more by starting at the [beginning](readme.md).

## Add a Player

In this section we are going to add a tilemap. Tilemaps are a very popular technique in 2D game development, consisting of building the game world or level map out of small, regular-shaped images called tiles.   If you want to jump right in you can use the code in the ```add_a_player``` folder as a starting point for the steps below.

We are going to use [Tiled](http://www.mapeditor.org/), a free, easy to use and flexible tile map editor to create the maps.  One has already been included in the full assets directory to get you going for now.

1. Lets copy over the assets required for the map.  In the ```full/assets``` directory copy the following files to your assets folder.

    ```
    basictiles.png
    things.png
    test_map.json
    ```

1. To use the assets we copied over we need to get Phaser to load them.  Lets updated ```load.js``` to load them.  Add the following to the preload.


    ```javascript
    /** Tile map data */
    this.game.load.tilemap('test_map', 'assets/test_map.json', null, Phaser.Tilemap.TILED_JSON);

    /** Tile map tiles */
    this.game.load.image('basic_tiles', 'assets/basictiles.png');

    /** Sprite sheet of the tiles */
    this.game.load.spritesheet('tiles', 'assets/basictiles.png', 16, 16);

    /** Sprite sheet of things */
    this.game.load.spritesheet('things', 'assets/things.png', 16, 16);
    ```

    Notice that we are loading the same image twice, once as an image and again as a spritesheet.  There is probably a better way to do this, but for now it works.

1. Next we are going to create a new class for our map.  It will extend the ```GameObject``` class.  Add a new file named ```map.js to the objects directory.  Add the following to the file.

    ```javascript

    import { GameObject } from './game-object.js';

    export class Map extends GameObject {

        constructor(game) {

            super(game);

        }

        update() {

            super.update();

        }
    }
    ```

1. Often in development you need to share values in multiple places.  One way of doing this in javascript is to create a constant (a value that can not be changed) and export this.  Add the following outside of the map class.  ```MAPSCALE``` will be used when we need to access the scale of the map. 

    ```javascript
    export const MAPSCALE = 2;
    ```

1. In the constructor we are going to add a tilemap.  Add the following.  The first two lines create the tilemap and add the Tileset image.  The next 3 create a map layer we can use for collision detection with the player.  We use the constant we declared earlier to set the scale.  The last line resizes the game world to fit the map.

    ```javascript
    this.map = this.game.add.tilemap('test_map');
    this.map.addTilesetImage('basic', 'basic_tiles');

    this.mineLayer = this.map.createLayer('Mine');
    this.mineLayer.setScale(MAPSCALE);
    this.mineLayer.resizeWorld();
    ```

1. To use the map class we need to update the **Playing** state.  First we need to import the class into the ```play.js``` file.  Add the following to the top.

    ```javascript
    import { Map } from '../objects/map.js';
    ```

1. Next we need to update the constructor to create the map.  Important that we add this above the line that create the player.  To keep things simple we are using the order objects are created for the order they are drawn.

    ```javascript
    this.map = new Map(this.game);
    ```

    Save all the files.  In your browser, reload and you should now see our hero in the dungeon.  If not check the developer console (F12 on windows in most browsers) for any errors.

    Try walking around.  Oh No!  We can walk through walls.  Lets fix that next.


1. The phaser tilemap object supports using the phaser Arcade physics engine.  We can specify tiles that we collide with.  Take a look at the ```basictiles.png``` image.  The first row, containing 8 tiles are going to be walls.  Add the following line to the constructor to enable collision detection.

    ```javascript
    this.map.setCollisionBetween(0, 7, true, this.mineLayer);
    ```


1. Last of all we need to check for collisions between the player and the map tiles.  Add the following to the map class ```update``` method.

    ```javascript
    /** Check to see if the player hits the mine layer */
    this.game.physics.arcade.collide(this.game.player, this.mineLayer);
    ```


    Save all the files.  In your browser, reload and you should now see our hero in the dungeon.  Try walking around.  You should collide with the walls.  Cool.