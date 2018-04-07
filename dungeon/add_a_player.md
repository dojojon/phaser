# The Dungeon

You can find our more by starting at the [beginning](readme.md).

## Add a Player

In this section we are going to add a player to the game.  This builds on the project structure and states we created in the previous step.  If you want to jump right in you can use the code in the ```add_a_player``` folder as a starting point for the steps below.

1. First lets tell Phaser to load our sprite sheets containing the player.  In the ```load.js``` game state add the following to the ```preload()``` method.  One sprite sheet contains a male charater, the other female.  Save the file.

    ```javascript

    /** Male Player */
    this.game.load.spritesheet('player_m','assets/Tiny16-ExpandedMaleSprites.png', 16, 16);

    /** Female Player */
    this.game.load.spritesheet('player_f', 'assets/Tiny16-ExpandedFemaleSprites.png', 16, 16);

    ```

1. Copy the two files from the full assets folders into your assets folder.

    ```bash
    Tiny16-ExpandedFemaleSprites.png
    Tiny16-ExpandedMaleSprites.png
    ```

1. Create a directory in the root directory to put game objects into.

    ```bash
    mkdir objects
    ```

1. We are going to create a base class for all our other game objects to extend from.  We can then use this to add common code that can be used by all objects in the game.

    This class will extend from ```Phaser.Grouyp```.  This means we can use the functionally of a group with our game objects.

    Add a file in the objects directory names ```game-object.js```.  Add the following to the file.

    ```javascript
    export class GameObject extends Phaser.Group {

        constructor(game) {

            super(game);

        }

    }
    ```

1. Next we are going to add a player class that extends from our ```GameObject```.  Add a new file named ```player.js``` into the objects directory.  We wil add code into the ```constructor()``` and ```update()``` methods to make this class the player.  The ```constructor()``` has three parameters, the Phaser game object and x,y coordinates for the world starting position.

    ```javascript
    import { GameObject } from './game-object.js';

    export class Player extends GameObject {

        constructor(game, x, y) {

            super(game);

        }

        update() {
            super.update();
        }
    }

    ```

1. The ```constructor()``` is a special method that gets called when a class is created.  We can use this to set up the group and  add sprites to the player class for the player and there weapons.  We are going to use the Phaser Arcade physics engine to detect when the player collides with walls and chests.  Add the two lines below to the constructor.

     ```javascript
    /** Enable physics */
    this.enableBody = true;
    this.immovable = true;

    ```
1. Next we are going to add a player sprite to the group.  Add the following code to the constructor.  The first line creates a sprite using the sprite sheet we loaded earlier.  Next we set the scale of the sprite.  We want the player to be able to move between door ways, so lets make him a little smaller than the map tiles.  We now need to add the sprite to the player group, we do this with the add statement.

     ```javascript

    /** Create Player */
    this.player = this.game.add.sprite(x, y, 'player_m');
    this.player.scale.setTo(1.6, 1.8);
    this.player.anchor.setTo(0.5, 0.5);
    this.add(this.player);

    ```
    If you want to have a female hero, then replace ```'player_m'``` with ```'player_f'``` to load the female sprite sheet.

1. We want the camera to follow the player around, add the following line to the constructor method.

     ```javascript

    this.game.camera.follow(this.player);

    ```
    Save your changes.

1. Lets update the **Playing** state to create a player object for us.  We need to import the class into the ```play.js``` file.  Add the following to the top.

    ```javascript
    import { Player } from '../objects/player.js';
    ```

1. Next we need to update the constructor to create the player.  Remove the temporary code we had to print the word playing and add the following to the constructor.

    ```javascript
    this.player = new Player(this.game, 100, 100);
    this.game.player = this.player;
    ```

    The second statement will allow us to access the player from the game instance.
    
    Save the file.  In your browser, reload and you should now see our hero in the top left of the screen.  If not check the developer console (F12 on windows in most browsers) for any errors.

1. Cool, but not much of a game.  Lets animate the sprite and add the ability to move them around.  The following code should be added to the ```constructor()``` below the existing code.  It creates animations for the player sprite.

    ```javascript

    /** Player animations */
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

    ```
1. Next we will add a cursors object that will let us control the player with the keyboard.  The following code should be added to the ```constructor()``` below the existing code.  We will also add a variable for the player speed.

     ```javascript

        /** Input */
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.playerSpeed = 100;

    ```
1. We will use the cursors object created in the constructor to check if the player i holding down a cursor key.  If they are we will set the players velocity to the appropriate speed for the direction the player needs to move in.  We can also set the animation to be played as well.  The complete code for the update method is below.  Add this to the player class replacing the existing update method.

    ```javascript
        update() {
            super.update();
            this.player.body.velocity.setTo(0, 0);

            /** Move the player */
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
    ```
1. Save and test in your browser.  You should be able to control the player using the cursor keys.