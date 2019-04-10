"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ipcMain = require('electron').ipcMain;
var neon_1 = require("@vigcoin/neon");
// import * as neon from 'neon-vigcoin';
var wallet;
var prefix = 0x3d;
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
    console.log("initIPC");
    ipcMain.on('open-wallet', function (event, filename, password) {
        if (password === void 0) { password = ""; }
        console.log('主线程 111');
        console.log(filename, password); // prints 'ping'
        try {
            wallet = new neon_1.Wallet(filename, password);
            console.log(" success");
            event.sender.send('open-wallet', false, wallet);
        }
        catch (e) {
            console.log(e);
            event.sender.send('open-wallet', true, e.message);
        }
    });
    ipcMain.on('get-address', function (event) {
        console.log('inside get address');
        if (wallet) {
            var address = wallet.getAddress(prefix);
            event.sender.send('get-address', false, address);
        }
        else {
            event.sender.send('get-address', true, 'Wallet not found!');
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