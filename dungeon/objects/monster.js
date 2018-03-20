import { GameObject } from "./game-object.js";
import { MAPSCALE } from "../settings.js";
import { tweenTint } from '../utils/tween-tint.js';

export class Monster extends Phaser.Sprite {

    constructor(game, x, y, key, frame) {

        super(game, x, y, key, frame);

        // this.anchor.setTo(0.5, 0.5);
        this.enableBody = true;
        this.health = 50;

        // Monster animations
        const monsterID = frame - 1
        this.animations.add('down', [monsterID, monsterID + 1, monsterID + 2], 10, true);
        this.animations.add('left', [monsterID + 12, monsterID + 13, monsterID + 14], 10, true);
        this.animations.add('right', [monsterID + 24, monsterID + 25, monsterID + 26], 10, true);
        this.animations.add('up', [monsterID + 36, monsterID + 37, monsterID + 38], 10, true);

        this.animations.add('stand', [monsterID + 1], 10, true);
        this.animations.play('stand');

    }

    update() {

        let distanceToPlayer = 10000;

        if (this.game.player) {
            distanceToPlayer = Phaser.Math.distance(this.game.player.player.world.x, this.game.player.player.world.y, this.world.x, this.world.y);
        }

        // Check to see if the monster is in range of the player
        if (distanceToPlayer < 200) {

            this.game.physics.arcade.moveToXY(this, this.game.player.player.world.x / MAPSCALE, this.game.player.player.world.y / MAPSCALE, 20);


            //Set the animations

            // Calculate the diffence between monster and player
            const diff = this.world.subtract(this.game.player.player.world.x, this.game.player.player.world.y);

            // If the horizontal distance is greater, then show this animation
            if (Math.abs(diff.x) > Math.abs(diff.y)) {

                if (this.body.velocity.x < 0) {
                    this.animations.play('left');
                } else if (this.body.velocity.x > 0) {
                    this.animations.play('right');
                }

            } else {

                if (this.body.velocity.y < 0) {
                    this.animations.play('up');

                } else if (this.body.velocity.y > 0) {
                    this.animations.play('down');
                }
            }

        } else {

            this.body.velocity.setTo(0, 0);
            this.animations.play('stand');

        }

    }

    collide(monster, object) {
        this.checkHealth();
    }

    monsterHitPlayer(player, monster) {

        if (player === this.game.player.player) {
            console.log('monster hit player', this.body.blocked);
            this.game.player.hitByMonster(5);
            this.health = this.health - 5;
        }

    }

    monsterHit(object, monster) {
        console.log('Monster hit');
        this.health = this.health - 5;
        tweenTint(this.game, this, 0xff0000, 0xffffff, 150);
        this.checkHealth();
    }

    checkHealth() {
        if (this.health < 1) {
            this.kill();
        }
    }

} 
