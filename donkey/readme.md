# Donkey

In this tutorial we are going to make a simple game using Phaser.io base on [DONKEY.BAS](https://en.wikipedia.org/wiki/DONKEY.BAS)  a game written in 1981 and included with early versions of the PC DOS operating system distributed with the original IBM PC. It is a driving game in which the player must avoid hitting donkeys. The game was written by Microsoft co-founder Bill Gates and Neil Konzen.

In our updated version we are replacing Donkies with Unicorns and will have different mechanics for the car.


## Pre Requistites

IDE VS Code, Python3 for a web server.

## Steps

All the assets for this tutorial along with the javascript library are in this directory.  Create you game file in this folder too.

###  Step 1

Make a copy of the step1.html file and name it game.html.  You will add your code to this copy of the file as we go along.  

Looking in this file you will see the following line of code.  This sets up phaser, creating a variable called game that is 800 wide by 600 tall.  We also set up functions that will get call by phaser that we can put our code in 

```
     var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
```

You can try running your game.  To start the web server, run the following command in a terminal window.

```
python -m http.server
```

You should then be able to open the page in a web browser.

```
http://localhost:8000/game.html
```

You should see a black square in the browser.

###  Step 2

Next we need to load up our assets.  To start with we just going to have images that we will use as sprites.  In later steps we will add sound effects.

In the ```preload()``` function add the following:

```
            // Load the game assets
            game.load.image('road', 'assets/road.png');
            game.load.image('unicorn', 'assets/unicorn.png');
            game.load.image('car', 'assets/car.png');
```

To check everything is working lets add a sprite to the game.  Below the line that creates the game add the following variable.   This will allow us to reference the player object in other functions.

```
   var player;
```

Next are going to add a player sprite.  In the ```create()``` function

```
    player = game.add.sprite(game.world.centerX, game.world.height - 100, 'car');
    player.anchor.setTo(0.5, 0.5);

```

Save the file and reload the browser.  Now we should see the players car displayed on the screen.

### Step 3

Cool, we have a car but its floating in space.  Lets add a road for it to drive on.  For the road we are going to use a TileSprite.  A TileSprite is a Sprite that has a repeating texture. Textures will automatically wrap and are designed so that you can create game backdrops using seamless textures as a source.  Sounds perfect for our endless scrolling road.

Add the following to the ```create()``` function.

```
    //Set up road
    road = game.add.tileSprite(0, 0, 800, 20000, 'road');
    game.world.setBounds(0, 0, 800, 20000);
```

We will also tell phaser to always point the camera at the player.  Below the code we used to create the player add the following;

```
    game.camera.follow(player); 
```

Save and run the game.  You should see the car on top of the road.


### Step 4

Lets get the car moving.  We are going to use the build in arcade phyics engine.   This will allow us set the speed (velocity) of spites in the game and detect when hit each other.

At the top of the create function add the following to enable the physics engine.

```
    game.physics.startSystem(Phaser.Physics.Arcade);
```

Next we need to make the physics engine aware of our player sprite.  Add the following line to the create function below the camera set up we added in the previous step.

``` 
    game.physics.arcade.enable(player);
```

Next we need to add a variable for the cars speed.  Up at the top of the file, add a variable called speed and set it to 200;

```
    var speed = -200;
```

We can use this variable to set the speed of the player.  In the update() function add the following.

```
    player.body.velocity.y = speed;
```

Save and run the game.  You should see the car on top of the road start to move.


### Step 5

Next we going to the ability to controll the car using the cursor keys.

Add another variable to the top the file.

```
   var cursors;
```

In the ```create()``` function we will add the code to set up the cursors.

```
    cursors = game.input.keyboard.createCursorKeys();
```

To change the position of the car we can use an if statement to check to see if a cursor key pressed down.  In the ```update()``` function add the following below the code that sets the players speed.

```
    player.body.velocity.x = 0;

    if (cursors.right.isDown) {
        player.body.velocity.x = 250;
    }
    if (cursors.left.isDown) {
        player.body.velocity.x = -250;
    }

```

Save and run the game.  You should be able to contol the car using the cursor keys.


Step 6 

As you can image there is a lot going on in the game that is hidden from us.  Each sprite has a position and a bunch of other properties that set define what it looks like and how it is drawn (render).

Phaser has some helper debug functions we can use to display this whilst the game is running.  Lets see what the player debug info looks like.

In the ```render()``` function add the following.

```
    game.debug.spriteInfo(player);
```

Save and run the game.  You should see debug information displayed at the top of the screen.  Try moving the can to see the x position change.

You probably don't want this information displayed all the time.  So you can comment out the code using ```//``.  That way it easy to add it back in when needed.

```
    // game.debug.spriteInfo(player);
```
