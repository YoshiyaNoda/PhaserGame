require('./bootstrap');

// window.message = require("../ts/app").message;

import Phaser from 'phaser';
import EntryScene from './scenes/entryScene';
import MakeSessionScene from './scenes/makeSessionScene';
import BattleScene from './scenes/battleScene';
import ExitScene from './scenes/exitScene';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 }
        }
    },
    //配列の中にMySceneを入れてもいい
    scene: [EntryScene, MakeSessionScene, BattleScene, ExitScene]
};

window.onload = () => {
    const game = new Phaser.Game(config);
};
