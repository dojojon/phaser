# The Dungeon

In this tutorial we are going to create a game called the The Dungeon using Phaser.  The game will be using javascript classes to organise the code, Phase States to help structure the game and a Phaser Tile Map to edit the data.  This is an advanced project, but its been broken down into small steps that will walk you through each set of changes we make.

![Dungeon](/dungeon/screenshots/dungeon1.png?raw=true "Spiders!")

## Pre Requisites

As mentioned, this is an advances javascript and phaser tutorial.  Best if you have some experience before starting so I suggest you work through the Donkey game. 

https://github.com/dojojon/phaser/tree/master/donkey

You can use what ever IDE you prefer for web development, but I recommed VSCode.  

You will need to run a local web server.  We use Python 3 to do this, but the choice is yours.

```python -m http.server```

##  Source code.

You can find this tutorial on github.

https://github.com/dojojon/phaser/tree/master/dungeon

You will need to clone this repository or download this code from the root of the github project.

https://github.com/dojojon/phaser

## Steps

This project has been broken down into chunks will help up build up the game as we go along.  Each section has a staring folder, so if you want to jump in at ```Creating a Player``` skipping earlier steps you can.  

If you want to look at the completed game, check out the source code in full subfolder.

### Project Structure and Phaser States

In this section we are going to set up the folder stucture for the game, create the initial Phaser States and load some assets.  The section does not have a starting folder as we are going to set things up from scratch.

1.  Create a directory for your project, I suggest calling it ```dungeon``` but you can call it what ever you want as long as it does not have spaces in it.  Spaces tend to make using the command line harder, so lets avoid them if we can.  Using the terminal you can create a directory using:

```mkdir dungeon```

You can then move into this directory using:

```cd dungeon```

2. Next we are going to create a number of sub directories which we will use to organise our code. 

Assets will be used to put images and sound files used in the game.
```mkdir assets```

We will put the phaser library into this directory.
```mkdir js```

We are going to put our game states into here.
```mkdir states```

3.  Next we are going to copy the phaser library into js folder.  Take a look in the ```full/js``` directory for a file called ```phaser.min.js```.  Copy this to the ```js``` directory you created above.

4.  Open up your IDE in the ```dungeon``` directoy and create a ```index.html``` file.



### Creating a Player


### Tile Map

### Map Objects

### Monsters

