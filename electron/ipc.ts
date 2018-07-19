const { ipcMain } = require('electron');
import { Wallet } from '@vigcoin/crypto';



// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   event.returnValue = 'pong'
// })


export function initIPC() {
  ipcMain.on('open-wallet', (event, filename, password) => {
    console.log('主线程 111');
    console.log(filename, password); // prints "ping"

    const wallet = new Wallet(filename, password);
    wallet.read().then(() => {
      const address = wallet.getAddress();
      console.log(event.returnValue);
      event.sender.send('open-wallet', address);
    }).catch((e) => {
      console.log(e);
    });
  });
}
