const { ipcMain } = require('electron');

import { Wallet } from '@vigcoin/neon';
// import * as neon from 'neon-vigcoin';

let wallet;

let prefix = 0x3d;

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
  console.log("initIPC");
  ipcMain.on('open-wallet', (event, filename, password = "") => {
    console.log('主线程 111');
    console.log(filename, password); // prints 'ping'
    try {
      wallet = new Wallet(filename, password);
      console.log(" success")
      event.sender.send('open-wallet', false, wallet);
    } catch (e) {
      console.log(e);
      event.sender.send('open-wallet', true, e.message);
    }
  });

  ipcMain.on('get-address', (event) => {
    console.log('inside get address');
    if (wallet) {
      let address = wallet.getAddress(prefix)
      event.sender.send('get-address', false, address);
    } else {
      event.sender.send('get-address', true, 'Wallet not found!');
    }
  });

  ipcMain.on('get-keys', (event) => {
    console.log('inside get keys');
    if (wallet) {
      const keys = wallet.getSecretKeys();
      console.log('keys ');
      console.log(keys);
      event.sender.send('get-keys', keys.send, keys.view);
    }
  });
}
