var http = require('http');
var server = http.createServer();
let count = 0;

server.on('request', function(req, res) {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.header('Accesee-Control-Allow-Origin', "*");
    //res.write('hello world');
    const json = {'msg': 'Hello, World!!'+count};
    const json_str = JSON.stringify(json);
    res.write(json_str);
    count += 1;
    res.end();
});

// サーバを待ち受け状態にする
// 第1引数: ポート番号
// 第2引数: IPアドレス
server.listen(3478);