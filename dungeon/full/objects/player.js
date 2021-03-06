import { GameObject } from './game-object.js';
import { tweenTint } from '../utils/tween-tint.js';

//** Player Game Object */
export class Player extends GameObject {


    constructor(game, x, y) {

        super(game);

        // Set player attributes 
        this.hasWeapon = false;
        this.inventory = [];
        this.health = 100;

        // Enable physics
        this.enableBody = true;
        this.immovable = true;

        // Create Player
        this.player = this.game.add.sprite(x, y, 'player_m');
        this.player.scale.setTo(1.6, 1.8);
        this.player.anchor.setTo(0.5, 0.5);
        this.add(this.player);

        this.game.camera.follow(this.player);

        // Create sword
        this.weapon = this.game.add.sprite(0, 0, 'player_m');
        this.weapon.anchor.setTo(0.5, 0.5);
        this.weapon.scale.setTo(1.6, 1.8);
        this.weapon.frame = 25;
        this.add(this.weapon);

        // Player animations
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
        this.player.body.collideWorldBounds = true;

        // Input 
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.hitKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);

        this.playerSpeed = 100;

    }

    update() {

        super.update();

        this.player.body.velocity.setTo(0, 0);

        // Set the weapon to invisible
        this.weapon.visible = false;

        // Move the player
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

        // hit Key pressed, then set up the weapon
        if (this.hitKey.isDown && this.hasWeapon) {

            // Set the weapn to visible
            this.weapon.visible = true;

            // Reset the hit points on the weapon
            this.weaponHitPoint = 5;

            // Stop the player, running with weapons is dangerous
            this.player.body.velocity.setTo(0, 0);

            if (this.cursors.left.isDown) {
                this.player.animations.play('left_strike');
                this.setWeaponPostion(-22, 3);
                this.weapon.angle = -90;
            } else if (this.cursors.right.isDown) {
                this.player.animations.play('right_strike');
                this.setWeaponPostion(22, 3);
                this.weapon.angle = 90;
            } else if (this.cursors.up.isDown) {

                this.player.animations.play('up_strike');
                this.setWeaponPostion(-4, -23);
                this.weapon.angle = 0;

                // Flip the order, by removing and adding back to the group
                this.remove(this.player);
                this.add(this.player);
            } else {

                this.player.animations.play('down_strike');
                this.setWeaponPostion(5, 23);
                this.weapon.angle = 180;
            }

        }

    }

    /** Set the weapon position, based on the player and an offset */
    setWeaponPostion(xOffset, yOffset) {
        const x = this.player.position.x + xOffset;
        const y = this.player.position.y + yOffset;
        this.weapon.position.setTo(x, y);
    }

    /** Add inventory items */
    addInventory(items) {

        if (Array.isArray(items)) {
            items.forEach((item) => this.processItem(item));
        } else {
            this.processItem(items);
        }

    }

    processItem(item) {

        switch (item) {
            case 'sword':
                this.hasWeapon = true;
                break;
            case 'gem':
                this.gems++;
                break;
            case 'coins':
                this.coins++;
                break;
            case 'key_blue':
            case 'key_red':
            case 'key_green':
            case 'key_gold':
                this.inventory.push(item);
                break;
            default:
                console.error('Inventory item not found', item);
                break;
        }

    }

    hasKey(lock) {
        const keyRequired = 'key_' + lock;
        return this.inventory.includes(keyRequired);
    }

    hitByMonster(hitPoints) {
        this.health = this.health - hitPoints;

        tweenTint(this.game, this.player, 0xff0000, 0xffffff, 250);
    }

}


