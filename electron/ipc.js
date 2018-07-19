"use strict";
exports.__esModule = true;
var ipcMain = require('electron').ipcMain;
var crypto_1 = require("@vigcoin/crypto");
// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   event.returnValue = 'pong'
// })
function initIPC() {
    ipcMain.on('open-wallet', function (event, filename, password) {
        console.log('主线程 111');
        console.log(filename, password); // prints "ping"
        var wallet = new crypto_1.Wallet(filename, password);
        wallet.read().then(function () {
            var address = wallet.getAddress();
            console.log(event.returnValue);
            event.sender.send('open-wallet', address);
        })["catch"](function (e) {
            console.log(e);
        });
    });
}
exports.initIPC = initIPC;
