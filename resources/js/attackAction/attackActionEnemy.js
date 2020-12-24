import Robot from '../characters/robot'

//meとenemyの関係が逆になっていることに注意！！！

export default class attackActionEnemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,me,enemy,weapon) {
    super(scene, x, y);
    this.me = me;
    this.enemy = enemy;
    this.weapon = weapon;
    
}


preload(){

}

create(){
    this.para = new Robot();
}

update() {

        //通常攻撃

        //一定のフレーム経つと攻撃ができるようになる
        if(this.me.keys.keyQ.isDown && this.enemy.cursors.down.isUp){
            this.countSpace ++;
            if(this.countSpace>15 && this.me.x>=this.enemy.x && !this.me.position){
                this.attackPermission = true;
            }
            if(this.countSpace>15 && this.me.x<this.enemy.x && this.me.position){
                this.attackPermission = true;
            }
        }

        //downを押すと攻撃が無効化
        if(this.enemy.cursors.down.isDown){
            this.attackPermission = false ;
        }

        //spaceを押して、meとenemyの距離が65以下の時に攻撃ができる
        if (this.me.keys.keyQ.isDown && Math.abs(this.me.x-this.enemy.x)<50 && Math.abs(this.me.y-this.enemy.y)<50 && !this.me.lastSpaceDown)
        { 
            if(this.attackPermission){
                this.me.lastSpaceDown = true;
                //damageに応じて飛んでいく距離が変わる
                //meが右側にいるとき
                if (this.me.x>=this.enemy.x){
                    if(Math.abs(this.me.x-this.enemy.x)<35){
                        this.enemy.x = this.enemy.x - 200*this.enemy.damage/100;
                        this.enemy.y = this.enemy.y - 200*this.enemy.damage/100;
                        if(this.enemy.position){this.enemy.anims.play('turnRight',true);}
                        if(!this.enemy.position){this.enemy.anims.play('turnLeft',true)}
                        this.enemy.damage += this.para.attackDamage1;
                    }else{
                        this.enemy.x = this.enemy.x - 60*this.enemy.damage/100;
                        this.enemy.y = this.enemy.y - 200*this.enemy.damage/100;
                        this.enemy.anims.play('turnRight',true);
                        this.enemy.damage += this.para.attackDamage2;
                    }
                    console.log('damage:'+this.enemy.damage);

                //meが左側にいる時
                }else{
                    if(Math.abs(this.me.x-this.enemy.x)<35){
                        this.enemy.x = this.enemy.x + 200*this.enemy.damage/100;
                        this.enemy.y = this.enemy.y - 200*this.enemy.damage/100;
                        this.enemy.anims.play('turnRight',true);
                        this.enemy.damage += this.para.attackDamage1;
                    }else{
                        this.enemy.x = this.enemy.x + 60*this.enemy.damage/100;
                        this.enemy.y = this.enemy.y - 200*this.enemy.damage/100;
                        this.enemy.anims.play('turnRight',true);
                        this.enemy.damage += this.para.attackDamage2;
                    }
                    console.log('damage:'+this.enemy.damage);
                }
            }
        }

        //spaceをあげると全ての値をリセット
        if(this.me.keys.keyQ.isUp) {
            this.attackPermission = false;
            this.countSpace = 0;
            this.me.lastSpaceDown = false;
        }

        //飛び攻撃
        //shiftを押すと飛び攻撃
        //downを押している間は攻撃無効
        if(this.weapon.keys.keyE.isDown　&& this.enemy.cursors.down.isUp){
            if(Math.abs(this.enemy.x-this.weapon.x)<50 && Math.abs(this.enemy.y-this.weapon.y)<50){
                if(this.weapon.weaponPosition){
                    this.enemy.setVelocityX(100);
                    if(this.enemy.position){
                        this.enemy.anims.play('turnRight',true);
                    }else if(!this.enemy.position){
                        this.enemy.anims.play('turnLeft',true);
                    }            
                    this.enemy.damage += this.para.weaponDamage;
                }
                if(!this.weapon.weaponPosition){
                    this.enemy.setVelocityX(-100);
                    if(this.enemy.position){
                        this.enemy.anims.play('turnRight',true);
                    }else if(!this.enemy.position){
                        this.enemy.anims.play('turnLeft',true);
                    }            
                    this.enemy.damage += this.para.weaponDamage;
                }
                console.log('damage:'+this.enemy.damage);
            }
        }



}
}