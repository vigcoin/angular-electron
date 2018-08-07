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


  constructor(private ref: ChangeDetectorRef, public es: ElectronService) {

  }

  ngOnInit() {
    const { ipcRenderer } = this.es;
    ipcRenderer.on('open-wallet', (event, address) => {
      this.address = address;
      this.ref.detectChanges();
      console.log(address); // prints "pong"
    });

    ipcRenderer.on('on-error-password', (event) => {
      console.log('on error password'); // prints "pong"
    });
    ipcRenderer.send('get-address');
  }

  fileChangeEvent(fileInput: any) {

    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      const file = fileInput.target.files[0];
      console.log(file.path);
      this.file = file;
      try {
        const { ipcRenderer } = this.es;
        ipcRenderer.send('open-wallet', file.path, '');
      } catch (e) {
        console.log(e);
      }
    }
  }

  fileOpenDialog() {
    // dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] });
    // return false;
  }

}
