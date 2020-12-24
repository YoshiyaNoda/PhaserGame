import Robot from '../characters/robot'
import Girl from '../characters/girl'

window.countDown;
window.meX;
window.meY;

export default class Me extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y,'robot');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true)
        .setBounce(0.2)
        .setInteractive()
        .on('pointerdown', () => {
            this.setVelocityY(-400)
        });
        this.x = 200; //初期位置
        this.cursors = scene.input.keyboard.createCursorKeys(); //up,down,right,left,shift,spaceが使える
        this.lastShiftDown = false; //shiftの長押しを防ぐために使う
        this.damage= 0; //damegeを集計
        this.position = true; //trueは右向き、falseは左向き
        // window.countDown = 0;
        this.lifeCount = 3;
        this.cursorsStatus = {
            'space': {
                'isDown': false,
                'isUp': false
            },
            'shift': {
                'isDown': false,
                'isUp': false
            },
            'down': {
                'isDown': false,
                'isUp': false
            }
        };

    }




    create() {
        //定数だとローカルになってしまう
        if(window.characterSelect == 0){
            this.para = new Robot();
        }else if(window.characterSelect == 1){
            this.para = new Girl();
        }

    }


    update() {
        window.meX = this.x;
        window.meY = this.y;
        this.cursorsStatus = {
            'space': {
                'isDown': this.cursors.space.isDown,
                'isUp': this.cursors.space.isUp
            },
            'shift': {
                'isDown': this.cursors.shift.isDown,
                'isUp': this.cursors.shift.isUp
            },
            'down': {
                'isDown': this.cursors.down.isDown,
                'isUp': this.cursors.down.isUp
            }
        };
       
        //leftを押すと向きを左に、左に移動、速さはキャラごとに定義
        if (this.cursors.left.isDown)
        {
            this.position = false;
            this.setVelocityX(this.para.runLeftV);
            this.anims.play('left', true);
        }

        //rightを押すと向きを右に,右に移動、速さはキャラごとに定義
        else if (this.cursors.right.isDown)
        {
            this.position = true;
            this.setVelocityX(this.para.runRightV);
            this.anims.play('right', true);
        }

        //shift押すとshootアクションする
        else if(this.cursors.shift.isDown){
            this.setVelocityX(0);//これがないとleft,right押した直後にdownを押すと速度が維持されてしまう
            if(this.position){
                this.anims.play('shootRight',true);
            }else{
                this.anims.play('shootLeft',true);
            }
            
        }

        //spaceを押すと向いている向きに攻撃アクション、速度を0にしないと走った直後にspace押すと動き続けてしまう。
        else if(this.cursors.space.isDown){
            if (this.position){
                this.setVelocityX(0);
                this.anims.play(`attackRight`,true);
            }else{
                this.setVelocityX(0);
                this.anims.play(`attackLeft`,true);
            }
        }

        //upを押すとジャンプする、速度はキャラごとに定義、空中にいるとジャンプはできない
        else if (this.cursors.up.isDown && this.body.touching.down)
        {
            this.setVelocityY(this.para.jumpV);
        }

        //ジャンプ時のアクション
        else if (this.cursors.up.isDown)
        {
            if(this.position){this.anims.play('jumpRight',true)}
            if(!this.position){this.anims.play('jumpLeft',true)}
        }

        //ガードを続けるとダウンしてダメージが入る
        else if (this.cursors.down.isDown && window.countDown >80){
            if(this.position){
                this.anims.play('deadRight',true);
            }else{
                this.anims.play('deadLeft',true);
            }
            this.damage += 0.1;
        }

        //何も押していない時は向いている向きにidle
        else
        {
            this.setVelocityX(0);
            if(this.position){
                this.anims.play('turnRight',true);
            }else{
                this.anims.play('turnLeft',true)
            }
        }

        //downを戻すと再び下の動きができるようにする
        if(this.cursors.down.isUp) {
            this.lastShiftDown = false;
            window.countDown = 0;
        }
        else if(this.cursors.down.isDown){
            window.countDown ++;

            //downと左or右を押すと瞬間移動できる
            if (this.cursors.down.isDown && this.cursors.right.isDown && !this.lastShiftDown)
            {
                this.lastShiftDown = true;
                this.setVelocityX(3000);
                this.anims.play('escape',true);
            }
            else if (this.cursors.down.isDown && this.cursors.left.isDown && !this.lastShiftDown)
            {
                this.lastShiftDown = true;
                this.setVelocityX(-3000);
                this.anims.play('escape',true);
            }
        }

        if (this.damage > 100){
            this.x = 200;
            this.y = 0;
            this.lifeCount -= 1;
            this.damage =0;
        }
        if (this.y > 560){
            this.x = 200;
            this.y = 0;
            this.lifeCount -= 1;
            this.damage =0;
        }
        

    }

}
