const { ipcMain } = require('electron');

import { Wallet } from '@vigcoin/crypto';

let wallet;

function readWallet(event, walletIn) {
  walletIn.read().then(() => {
    const address = walletIn.getAddress();
    console.log(event.returnValue);
    event.sender.send('open-wallet', address);
  }).catch((e) => {
    event.sender.send('on-error-password', e.message);
    console.log(e);
  });
}

export function initIPC() {
  ipcMain.on('open-wallet', (event, filename, password) => {
    console.log('主线程 111');
    console.log(filename, password); // prints "ping"
    wallet = new Wallet(filename, password);
    readWallet(event, wallet);
  });

  ipcMain.on('get-address', (event) => {
    console.log('inside get address');
    if (wallet) {
      readWallet(event, wallet);
    }

  });

  ipcMain.on('get-keys', (event) => {
    console.log('inside get keys');
    if (wallet) {
      const keys = wallet.getSecretKeys();
      console.log("keys ");
      console.log(keys);
      event.sender.send('get-keys', keys.send, keys.view);
    }
  });
}
