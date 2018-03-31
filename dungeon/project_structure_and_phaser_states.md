# The Dungeon

You can find our more by starting at the [beginining](readme.md).

## Project Structure and Phaser States

In this section we are going to set up the folder stucture for the game, create the initial Phaser States and load some assets.  The section does not have a starting folder as we are going to set things up from scratch.

1. Create a directory for your project, I suggest calling it ```dungeon``` but you can call it what ever you want as long as it does not have spaces in it.  Spaces tend to make using the command line harder, so lets avoid them if we can.  Using the terminal you can create a directory using:

    ```bash
    mkdir dungeon
    ```

    You can then move into this directory using:

    ```bash
    cd dungeon
    ```

2. Next we are going to create a number of sub directories which we will use to organise our code. 

    Assets will be used to put images and sound files used in the game.

    ```bash
    mkdir assets
    ```

    We will put the phaser library into this directory.

    ```bash
    mkdir js
    ```

    We are going to put our game states into here.
    
    ```bash
    mkdir states
    ```

3. Next we are going to copy the phaser library into js folder.  Take a look in the ```full/js``` directory for a file called ```phaser.min.js```.  Copy this to the ```js``` directory you created above.

4. Open up your IDE in the ```dungeon``` directoy and create a ```index.html``` file. Add the following to the file. This is a basic html file, it sets the page title and adds a div tag that Phaser will use to render its contents on.

    ```html
    <!doctype html>
    <html lang="en">

    <head>
        <meta charset="UTF-8" />
        <title>The Dungeon</title> 
    </head>

    <body>
        <div id="gameDiv"></div>
    </body>

    </html>

    ```

    Save the file and start up the web server. 

    ```bash
    python -m http.server
    ```

    Test the page loads in your browser by navigating to ```http://localhost:8000```

5. Ok lets add references to the Phaser javascript library and the main.js file we will create in a later step.  Add the following to the head section of the ```index.html``` file.

    ```html
    <script type="text/javascript" src="js/phaser.min.js"></script>
    <script type="module" src="main.js"></script>
    ```

6. Before we move on a create our ```main.js``` file we will add a some styles to make the page black and center the game in the page.  Add the following to the head section of the ```index.html```.

    ```html
    <style type="text/css">
        body {
            margin: 0;
            background: green;
        }

        canvas {
            display: block;
            margin: auto;
        }
    </style>
    ```

7. Ok.  Now we are going to add our main javascript file.  This will contain code that defines out game, the states it uses.  Create a new file in the same directory as ```index.html``` and call it ```main.js```.  Add the following to the file.

    ```javascript
    class Game extends Phaser.Game {

        constructor() {

            super(800, 600, Phaser.AUTO, 'gameDiv');

        }
    }

    new Game();
    ```

    This code defines class ```Game``` that extends the Phaser.Game class.  In the constructor it calls the Phaser.Game constructor passing in the width (800 px), height (600px).  The ```Phaser.AUTO``` tells the Phaser engine to use WebGL if available or to use a HTML Canvas if not.  Last of all we give it the id of the html element to use to draw inside.

    Save the file and reload in the browser.  You should see a black box now inside the page. 

8. Great, but not very exciting.  We are going to use Phaser States and State Manager to help organise code in out app.  First in the states folder add a file called ```boot.js```.  We will use the **Boot** state to set up things like the Phaser physics engine.  Add the following to this file. (Tip: You can copy this and paste it into the file. )

    ```javascript
    export class Boot extends Phaser.State {

        create() {

            console.log('boot');

            // Start  up the physics
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            // Stop the smooth scaling of our sprites, to retain the pixel art.
            this.game.stage.smoothed = false;

            // Move onto load
            this.game.state.start('load');
        }

    }
    ```

    The last line of the ```create()``` function tells the Phase Statemanager to change to the **Load** state.

9. Next add another file to the states folder.  This time name it ```load.js```.  This state will be used to load our game assets, such as sprite sheets, maps and music.  We will also display a message that we are loading stuff, so the user knows something is happening.  Once ```preload()``` has completed, Phaser will then run the ```create()``` method.  He we tell the Phase state manager to move onto the next state **Menu**.


    ```javascript
    export class Load extends Phaser.State {

        preload() {

            console.log('load');

            // Display a loading message
            var loadingMessage = this.game.add.text(80, 150, "Loading....", { font: '30px Courier', fill: '#fff' });

            // Load the menu background
            this.game.load.image('background', 'assets/background.jpg');

        }

        create() {

            this.game.state.start('menu');

        }

    }
    ```

10. Lets add a state for the game menu.  We will name this file  ```menu.js```.  Add the following to this file.

    ```javascript
    export class Menu extends Phaser.State {

        create() {

            // Add a background image
            var background = this.game.add.sprite(0, 0, 'background');

            // Set a font that we will use on the menu state.
            var menuFont = { font: '60px Courier', fill: '#cc2222' };

            // We will align the title and menu 60 pixels in.
            var menuLeft = 60;

            // Display the game tile and instructions
            this.game.add.text(menuLeft, 100, "The Dungeon", menuFont);
            this.game.add.text(menuLeft, this.game.camera.height - 100, "Press 'S' to start", menuFont);

            // Set up a handler for the key press
            var startKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
            startKey.onDown.addOnce(this.start, this);
        }

        start() {
            this.game.state.start('play');
        }

    }
    ```

    The last couple lines of the ```create()``` methong set up a keyboard handler.  When the player presses 'S' it runs the ```start()``` method.  The ```start()``` method tells the Phase state manager to move onto the **Play** state.

11. Last of all we will add a state for playing the game in. We will name this file  ```play.js```.  Add the following code to the file.  This state will just display the text Playing for now.

    ```javascript
    export class Play extends Phaser.State {

        create() {

            // Set a font that we will use on the menu state.
            var font = { font: '100px Courier', fill: '#007700' };

            // Display some text
            this.game.add.text(100, 100, "Playing", font);

        }
    }
    ```

12. Save everything and reload the game in the browser.  See any change? Nope, well thats expected.  We need to update our Game class in the ```main.js``` file to use the states.  Add the following to the top of the file to import the state classes we have defined.

    ```javascript
    import { Boot } from '/states/boot.js';
    import { Load } from '/states/load.js';
    import { Menu } from '/states/menu.js';
    import { Play } from '/states/play.js';
    ```

     We need to tell the Phaser Game class about the states.  Add the following into the constructor.

    ```javascript
    this.state.add('boot', Boot, false);
    this.state.add('load', Load, false);
    this.state.add('menu', Menu, false);
    this.state.add('play', Play, false);

    this.state.start('boot');
    ```

    The last statement you see above tells Phaser to start using the state we defined as ```'boot'```.  This means phaser will execute the code **Boot** state.

13. Save the files and reload in the browser.  If everything is working you should see the game qucikly go to the **Loading** state and onto the  **Menu** state.  The **Menu** should be displaying a background and some text.  When you press 'S' it should move onto the **Play** state.  Cool we have implemented our game states.  

     For example, whilst we are developing we just want to go directly into the game.  We can change the ```Load``` state to go directly to the ***Play** state, skipping the menu.  Make the changes and save and reload.  You can see now we have gone directly to the **Play** state and not shown the menu.  Handy.

     This will allow us to organise our code better and add in new states, such as **Game Over** or **High Scores** without having to change the other state.  This is a common approach in game development and a good design.
