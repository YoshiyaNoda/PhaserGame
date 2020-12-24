import Robot from '../characters/robot'
import Girl from '../characters/girl'

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'robot');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true)
        .setBounce(0.2)
        .setInteractive()
        .on('pointerdown', () => {
            this.setVelocityY(-400)
        });
        this.x = 600;
        this.lastShiftDown = false; //shiftの長押しを防ぐために使う
        this.damage = 0; //damageを集計
        this.position = true; //trueは右向き、falseは左向き
        this.countDown = 0;
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

        this.keys = Phaser.Input.Keyboard. KeyboardPlugin;
        this.keys.keyW = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);//up
        this.keys.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);//left
        this.keys.keyS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);//down
        this.keys.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);//right
        this.keys.keyQ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);//space
        this.keys.keyE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);//shift

        if(window.characterSelect == 0){
            this.para = new Robot();
        }else if(window.characterSelect == 1){
            this.para = new Girl();
        }

    }

    update() {
             //leftを押すと向きを左に、左に移動、速さはキャラごとに定義
             if (this.keys.keyA.isDown)
             {
                 this.position = false;
                 this.setVelocityX(this.para.runLeftV);
                 this.anims.play('left', true);
                 
             }
 
             //rightを押すと向きを右に,右に移動、速さはキャラごとに定義
             else if (this.keys.keyD.isDown)
             {
                 this.position = true;
                 this.setVelocityX(this.para.runRightV);
                 this.anims.play('right', true);
             }
 
             //shift押すとshootアクションする
             else if(this.keys.keyE.isDown || this.cursorsStatus.shift.isDown){
                 this.setVelocityX(0);//これがないとleft,right押した直後にdownを押すと速度が維持されてしまう
                 if(this.position){
                     this.anims.play('shootRight',true);
                 }else{
                     this.anims.play('shootLeft',true);
                 }
                 
             }
 
             //spaceを押すと向いている向きに攻撃アクション、速度を0にしないと走った直後にspace押すと動き続けてしまう。
             else if(this.keys.keyQ.isDown || this.cursorsStatus.space.isDown){
                 if (this.position){
                     this.setVelocityX(0);
                     this.anims.play(`attackRight`,true);
                 }else{
                     this.setVelocityX(0);
                     this.anims.play(`attackLeft`,true);
                 }
             }
     
             //upを押すとジャンプする、速度はキャラごとに定義、空中にいるとジャンプはできない
             else if (this.keys.keyW.isDown && this.body.touching.down)
             {
                 this.setVelocityY(this.para.jumpV);
             }
 
             //ジャンプ時のアクション
             else if (this.keys.keyW.isDown)
             {
                 if(this.position){this.anims.play('jumpRight',true)}
                 if(!this.position){this.anims.play('jumpLeft',true)}
             }

             //ガードを続けるとダウンしてダメージが入る
            else if ((this.keys.keyS.isDown || this.cursorsStatus.down.isDown) && this.countDown >80){
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
            //  通信ように編集
             if(this.cursorsStatus.down.isUp) {
                 this.lastShiftDown = false;
                 this.countDown = 0;
             }
            //  if(this.keys.keyS.isUp) {
            //      this.lastShiftDown = false;
            //      this.countDown = 0;
            //  }
 
             else if((this.keys.keyS.isDown || this.cursorsStatus.down.isDown)){
                 this.countDown ++ ;
             //downと左or右を押すと瞬間移動できる
                if ((this.keys.keyS.isDown || this.cursorsStatus.down.isDown) && this.keys.keyD.isDown && !this.lastShiftDown)
                {
                    this.lastShiftDown = true;
                    this.setVelocityX(3000);
                    this.anims.play('escape',true);
                }
                else if ((this.keys.keyS.isDown || this.cursorsStatus.down.isDown) && this.keys.keyA.isDown && !this.lastShiftDown)
                {
                    this.lastShiftDown = true;
                    this.setVelocityX(-3000);
                    this.anims.play('escape',true);
                }
            }
            if (this.damage > 100){
                this.x = 600;
                this.y = 0;
                this.lifeCount -= 1;
                this.damage =0;
            }
            if (this.y > 560){
                this.x = 600;
                this.y = 0;
                this.lifeCount -= 1;
                this.damage =0;
            }
       
    }
}