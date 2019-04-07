"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ipcMain = require('electron').ipcMain;
var crypto_1 = require("@vigcoin/crypto");
var wallet;
function readWallet(event, walletIn) {
    walletIn.read().then(function () {
        var address = walletIn.getAddress();
        console.log(event.returnValue);
        event.sender.send('open-wallet', address);
    }).catch(function (e) {
        event.sender.send('on-error-password', e.message);
        console.log(e);
    });
}
function initIPC() {
    ipcMain.on('open-wallet', function (event, filename, password) {
        console.log('主线程 111');
        console.log(filename, password); // prints 'ping'
        wallet = new crypto_1.Wallet(filename, password);
        readWallet(event, wallet);
    });
    ipcMain.on('get-address', function (event) {
        console.log('inside get address');
        if (wallet) {
            readWallet(event, wallet);
        }
    });
    ipcMain.on('get-keys', function (event) {
        console.log('inside get keys');
        if (wallet) {
            var keys = wallet.getSecretKeys();
            console.log('keys ');
            console.log(keys);
            event.sender.send('get-keys', keys.send, keys.view);
        }
    });
}
exports.initIPC = initIPC;
//# sourceMappingURL=ipc.js.map