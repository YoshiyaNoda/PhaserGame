import { iteratee } from "lodash";


export default class WeaponEnemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y,'robotWeapon');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.lastDownisDown = true;
        this.countDown = 0;
        this.weaponPermission = false;
        this.weaponPosition = true;
        this.setAccelerationY(-900);

    }
    create(){

        //keyを追加
        this.keys = Phaser.Input.Keyboard. KeyboardPlugin;
        this.keys.keyW = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);//up
        this.keys.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);//left
        this.keys.keyS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);//down
        this.keys.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);//right
        this.keys.keyQ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);//space
        this.keys.keyE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);//shift

    }
    update(x,y,position,para, cursorsStatus){
        
        //paraは関数の引数にしないと使えないみたい
        //keyEを押すと自身の前にweaponを出して速度を与える、速度はcharactersで設定
        //lastDownDownなどはweapon.jsを丸コピしてる
        if(this.lastDownisDown){
            this.lastDownisDown = false;
            if((this.keys.keyE.isDown || cursorsStatus.shift.isDown) && position){
                this.weaponPosition = true ;
                this.x = x  + 50;
                this.y = y;
                this.setVelocityX(para.weaponV);
                this.anims.play('weaponLeft');
                console.log('shootleft');
            }else if((this.keys.keyE.isDown || cursorsStatus.shift.isDown) && !position){
                this.weaponPosition = false ;
                this.x = x - 50;
                this.y = y;
                this.setVelocityX(-para.weaponV);
                this.anims.play('weaponRight');
                console.log('shootRight');
            }
        }

        //速度０にして壁の中に隠しておく
        // isUpは || でつなげても意味的に正しくならない
        if(cursorsStatus.shift.isUp){
            this.setVelocityX(0);
            this.setVelocityY(0);
            this.x = 1000;
            this.y = 1000;
            this.lastDownisDown = true;
            this.countDown =0 ;
        }
        // if(this.keys.keyE.isUp){
        //     this.setVelocityX(0);
        //     this.setVelocityY(0);
        //     this.x = 1000;
        //     this.y = 1000;
        //     this.lastDownisDown = true;
        //     this.countDown =0 ;
        // }
    }
}