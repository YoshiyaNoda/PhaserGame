import { iteratee } from "lodash";


export default class Weapon extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y,'robotWeapon');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.lastDownisDown = true;　//downを押している間のみweaponを出す
        this.weaponPosition = true; //どっち向きに出すかを判別
        this.setAccelerationY(-900);


    }
    create(){


    }
    update(x,y,position,para){
        
        //paraは関数の引数にしないと使えないみたい
        //downを押すと自身の前にweaponを出して速度を与える、速度はcharactersで設定
        //重力を無視するために加速度を設定している
        if(this.lastDownisDown){
            this.lastDownisDown = false;
            if(this.cursors.shift.isDown && position){
                this.weaponPosition = true ;
                this.x = x  + 50;
                this.y = y;
                this.setVelocityX(para.weaponV);
                this.anims.play('weaponLeft');
                console.log('shootleft');
            }else if(this.cursors.shift.isDown && !position){
                this.weaponPosition = false ;
                this.x = x - 50;
                this.y = y;
                this.setVelocityX(-para.weaponV);
                this.anims.play('weaponRight');
                console.log('shootRight');
            }
        }

        //速度０にして壁の中に隠しておく
        if(this.cursors.shift.isUp){
            this.setVelocityX(0);
            this.setVelocityY(0);
            this.x = 1000;
            this.y = 1000;
            this.lastDownisDown = true;
        }
    }
}