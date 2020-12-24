const express = require("express");
// const cors = require('cors');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const app  = express();
const port = 3478;

function getUniqueStr(myStrong){
    const strong = 1000;
    if (myStrong) strong = myStrong;
    return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
}

// let waitKeys = [];
// let keysOwnedByMoreThan2Players = [];
// let battles = []; //{battleId: hoge, player1: {Id: hoge, jsonData: hoge}, player2: {Id: hoge, jsonData: hoge}},

// app.use(cors);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// ルーティングの設定
app.get("/", (req, res) =>{
    //res.send('Hello World!!!');
    res.json({'msg': 'Hello NodeJS'});
});
app.post("/sample", jsonParser, (req, res) =>{
    //res.send('Hello World!!!');
    res.json({'msg': 'Hello NodeJS'});
});

// POSTにすることで、同じ人が二回アクセスする現象を制御する
// app.post("/seek_rival", jsonParser, (req, res) =>{
//     if(req.body == null) {
//         if(waitKeys.length === 0) {
//             const uuid = getUniqueStr();
//             waitKeys.push(uuid);
//             res.json({'battleId': uuid, 'result': 'Wait'});
//         } else {
//             // 待ってる人がいたらひとり選んで対戦
//             // 同じ人が二回アクセスしたらおかしくなる
//             const uuid = waitKeys.shift();
//             keysOwnedByMoreThan2Players.push(uuid);
//             console.log(keysOwnedByMoreThan2Players);
//             res.json({'battleId': uuid, 'result': 'Find'});
//         }
//     }
// });

// app.post('/search_person_who_has_the_same_id', function (req, res) {
//     // IDをもらった後、このルーティングで同じIDをもつ人を探す
//     // 特殊な事情がない場合必ずいる
//     // 失敗したらwaitedkeyに自分のキーを追加
//     const mine = req.body;
//     console.log('mine', mine);
//     let condition = false;
//     keysOwnedByMoreThan2Players.forEach(key => {
//         if(key === mine) {
//             condition = true;
//         }
//     });
//     if(condition) {
//         // マッチしたので、対戦を始める
//         // 各々にplayerIdを発行
//         // これでplayerはbattleIdとplayerIdを持つことになる
//         // 次に、持ってるIDを元にデータをやりとりするルートに行くが、その前にもしなければ、battlesにデータ共有インスタンスを追加
//         let battleCondition = false;
//         let battleYouSeek = null;
//         const playerId = getUniqueStr();
//         let result = '';
//         battles.forEach(battle => {
//             if(battle.battleId === mine) {
//                 battleCondition = true;
//                 battleYouSeek = battle;
//             }
//         });
//         if(battleCondition) {
//             battleYouSeek.player2.id = playerId;
//             battleYouSeek.status = true;
//             result = 'player2'; //対戦開始routeへ
//         } else {
//             battles.push({battleId: mine, player1: {id: playerId, data: null}, player2: {id: '', data: null}, status: false});
//             result = 'player1'; //=>まつルーティングwait_for_starting_battleへ
//         }
//         // ２人ともこのrouteにアクセスすれば、これでバトルインスタンスを作成完了
//         res.json({'result': result, 'playerId': playerId, 'status': battleYouSeek.status});

//     } else {
//         // waitedKeysに追加する
//         waitKeys.push(mine);
//         // Failをもらったら、このrouteに再度アクセスしてもらう
//         res.json({'result': 'Fail'});
//     }
// });

// app.post('/wait_for_starting_battle', function (req, res) {
//     // 理論上battleYouSeekは必ず存在する
//     let battleYouSeek = null;
//     const mine = req.body;
//     battles.forEach(battle => {
//         if(battle.battleId === mine) {
//             battleYouSeek = battle;
//         }
//     });
//     res.json({'status': battleYouSeek.status});
// });

// fetchでここからenemyを探す
let waintingPlayerIds = [];
let player1XY = {x: 0, y: 0};
let player2XY = {x: 0, y: 0};

// waitしているやつはここから状況確認

app.get("/fetch_id", (req, res) =>{
    const id = getUniqueStr();
    let enemyId = '';
    let status = 'wait';
    let playerNum = 1;
    if(waintingPlayerIds.length === 0) {
        waintingPlayerIds.push(id);
    } else {
        enemyId = waintingPlayerIds.shift();
        status = 'find';
        playerNum = 2;
    }
    res.json({'playerId': id, 'enemyId': enemyId, 'status': status, 'playerNum': playerNum});
});

app.post("/post_position", jsonParser, (req, res) =>{
    const playerNum = req.body.playerNum;
    const x = req.body.x;
    const y = req.body.y;
    if(playerNum == 1) {
        player1XY = {x: x, y: y};
        // console.log('player1: ', player1XY, '\nplayer2: ', player2XY);
        res.json(player2XY);
    } else {
        player2XY = {x: x, y: y};
        // console.log('player1: ', player1XY, '\nplayer2: ', player2XY);
        res.json(player1XY);
    }
    // res.json({'msg': 'Hello NodeJS'});

});

// HTTPサーバを起動する
app.listen(port, () => {
  //console.log(`listening at http://localhost:${port}`);
});