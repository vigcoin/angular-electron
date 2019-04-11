import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcMain, ipcRenderer, webFrame, remote, shell, dialog } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';

@Injectable()
export class ElectronService {

  ipcMain: typeof ipcMain;
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  shell: typeof shell;
  dialog: typeof dialog;

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcMain = window.require('electron').ipcMain;
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.shell = window.require('electron').shell;

      this.dialog = require('electron').remote.dialog;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    }
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

  public on(event, cb) {
    if (this.isElectron()) {
      this.ipcRenderer.on(event, cb);
    }
  }

  // Util

  public messageBox(message) {
    if (this.isElectron()) {
      const dialog = require('electron').remote.dialog;
      console.log(dialog);
      console.log(message);
      dialog.showMessageBox({message});
    }
  }

  public openWallet(filename, password) {
    if (this.isElectron()) {
      this.ipcRenderer.send('open-wallet', filename.path, password);
    }
  }

  public openLink(link) {
    if (this.isElectron()) {
      this.shell.openExternal(link);
      return false;
    }
    return true;
  }

}
