import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { read } from 'fs';

import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  unit = 'VIG';
  balance = '0.0';
  unacknowledged = '0.0';
  total = '0.0';

  file;
  address = '';

  password = '';

  error = false;


  constructor(private ref: ChangeDetectorRef, public es: ElectronService) {

  }

  ngOnInit() {
    if (this.es.isElectron()) {
      const { ipcRenderer } = this.es;
      ipcRenderer.on('open-wallet', (event, address) => {
        this.address = address;
        this.ref.detectChanges();
        console.log(address); // prints "pong"
      });

      ipcRenderer.on('on-error-password', (event) => {
        console.log(event);

        this.error = true;
        // if (this.password && this.file.path) {
        //   ipcRenderer.send('open-wallet', this.file.path, password);
        // }
        console.log('on error password'); // prints "pong"
      });
      ipcRenderer.send('get-address');
    }
  }

  fileChangeEvent(fileInput: any) {

    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      const file = fileInput.target.files[0];
      console.log(file.path);
      this.file = file;
    }
  }

  loadWallet() {
    try {
      if (this.es.isElectron()) {
        this.error = false;
        const { ipcRenderer } = this.es;
        ipcRenderer.send('open-wallet', this.file.path, this.password);
      }
    } catch (e) {
      console.log(e);
    }
  }

  fileOpenDialog() {
    // dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] });
    // return false;
  }

}
