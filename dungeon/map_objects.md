# The Dungeon

You can find our more by starting at the [beginning](readme.md).

## Add stuff to the map

In this section we are going to add objects to the map to make it a more interesting place to be.  We will start a group of objects that the player can't walk through such as rocks, tables and general scenery items.  We will use this as a foundation for adding things like doors, chests and monsters in the future.  The objects will be defined in the tile map data in an object layer.

If you want to jump right in you can use the code in the ```map_objects``` folder as a starting point for the steps below.

1. We are going to create another base class that all out map objects. Add a new file named ```map-group.js``` to the objects folder.

1. Next we are going to create a class that extends from our ```GameObject```.  Add the following code for the class.

```javascript
import { GameObject } from './game-object.js';

export class MapGroup extends GameObject {
    constructor(game, map) {
        super(game);

    }
}
```

1. In the constructor we can set default properties for all objects that extend from it.  We will enableBody and set immovable to true so we can detect collisions.  We will also give it a reference to the map object.

```javascript
import { GameObject } from './game-object.js';

export class MapGroup extends GameObject {
    constructor(game, map) {
        super(game);

        this.enableBody = true;
        this.immovable = true;

        this.map = map;

    }

}
```

1. In a previous set we create a constant that will contain the scale of we are drawing the map at.  We will import this and use it to set the scale of the group.  Add the import statement and update the constructor.

```javascript
import { GameObject } from './game-object.js';
import { MAPSCALE } from './map.js';

export class MapGroup extends GameObject {
    constructor(game, map) {
        super(game);

        this.enableBody = true;
        this.immovable = true;

        this.map = map;

        this.scale.set(MAPSCALE);

    }

}
```

1. Lets add a method we call call to check for collisions.  It won't do anything for now, but we can add a different code for different objects in the future.

```javascript
import { GameObject } from './game-object.js';

export class MapGroup extends GameObject {
    constructor(game, map) {
        super(game);

        this.enableBody = true;
        this.immovable = true;

        this.map = map;

        this.scale.set(MAPSCALE);

    }

    collide(object, groupItem) {
    }

}
```

1. This phaser group will contain a phaser objects that have been defined in the tile map data.  Phaser tilemaps have a method we can use to read the tile map data and create objects in a group.  This is exactly what we need to do.  Create a new method in the class called ```fillGroup```.  In here add a call to the maps createFromObjects method.  You can read more about this function [here](https://photonstorm.github.io/phaser-ce/Phaser.Tilemap.html).

```javascript
import { GameObject } from './game-object.js';
import { MAPSCALE } from './map.js';

export class MapGroup extends GameObject {
    constructor(game, map) {
        super(game);

        this.enableBody = true;
        this.immovable = true;

        this.map = map;

        this.scale.set(MAPSCALE);

    }

    fillGroup(id, spriteSheet, spriteID) {

        this.map.createFromObjects('Objects', id, spriteSheet, spriteID, true, false, this);

    }

    collide(object, groupItem) {
    }

}
```

1. Each time we add objects to the group, we need to set the physics for the object along with its scale.  We can do that as shown below.

```javascript
import { GameObject } from './game-object.js';
import { MAPSCALE } from './map.js';

export class MapGroup extends GameObject {
    constructor(game, map) {
        super(game);

        this.enableBody = true;
        this.immovable = true;

        this.map = map;

        this.scale.set(MAPSCALE);

    }

    fillGroup(id, spriteSheet, spriteID) {

        this.map.createFromObjects('Objects', id, spriteSheet, spriteID, true, false, this);

        this.setAll('body.immovable', true);
        this.setAll('enableBody', true);

        this.forEach((sprite) => { sprite.body.setSize(sprite.width * MAPSCALE, sprite.height * MAPSCALE); });

    }

    collide(object, groupItem) {
    }

}
```

1. OK, lets use this class to to create a blocking group class.  Add a new file to the object directory called ```blocking-group.js```.

1. This class will extend from the ```MapGroup``` we created earlier.  Add the following code.  You can see we are calling the ```fillGroup``` method we created to add rocks to this group.

```javascript
import { MapGroup } from "./map-group.js";

export class BlockingGroup extends MapGroup {

    constructor(game, map) {

        super(game, map);
        
        this.fillGroup(59, 'tiles', 58); // rocks
        

    }
   
}
```

1. We are going to use the Map class to create all our map groups.  Open up the ```map.js``` add an import statement for the ```BlockingGroup``` at the top of the file.

```javascript
import { BlockingGroup } from './blocking-group.js';
```

1. In the maps constructor we can create an instance of the ```BlockingGroup```.

```javascript
    /** Blocking objects */
    this.blockingObjects = new BlockingGroup(this.game, this.map);
```


1. In the maps update we need to call the physics engine to check for collisions between the player and blocking objects.

```javascript
    /** Player collides with blocking objects */
    this.game.physics.arcade.collide(this.game.player, this.blockingObjects, this.blockingObjects.collide);
```

1.  The map class should look like this now.

```javascript
import { GameObject } from './game-object.js';
import { BlockingGroup } from './blocking-group.js';

export const MAPSCALE = 2;

export class Map extends GameObject {

    constructor(game) {

        super(game);

        this.map = this.game.add.tilemap('test_map');
        this.map.addTilesetImage('basic', 'basic_tiles');

        this.mineLayer = this.map.createLayer('Mine');
        this.mineLayer.setScale(MAPSCALE);
        this.mineLayer.resizeWorld();

        this.map.setCollisionBetween(0, 7, true, this.mineLayer);

        /** Blocking objects */
        this.blockingObjects = new BlockingGroup(this.game, this.map);

    }

    update() {

        super.update();

        /** Check to see if the player hits the mine layer */
        this.game.physics.arcade.collide(this.game.player, this.mineLayer);

        /** Player collides with blocking objects */
        this.game.physics.arcade.collide(this.game.player, this.blockingObjects, this.blockingObjects.collide);

    }
}
```

1. Save everything and run the game.  You should now have rocks !!!

1. We can add more blocking things to our ```BlockingGroup```  Add the following to its constructor.

```javascript
this.fillGroup(55, 'tiles', 54); // table
this.fillGroup(46, 'tiles', 45); // bed head
this.fillGroup(54, 'tiles', 53); // bed foot
this.fillGroup(40, 'tiles', 39); // column
this.fillGroup(32, 'tiles', 31); // well
this.fillGroup(48, 'tiles', 47); // statue
this.fillGroup(47, 'tiles', 46); // chair
```

1. Save everything and run the game.  You should now have more stuff !!!
