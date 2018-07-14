import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { read } from 'fs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  fileChangeEvent(fileInput: any) {

    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      const file = fileInput.target.files[0];
      console.log(file.path);

      try {

        const electron = window.require('electron');

        const { dialog, ipcRenderer } = electron;
        ipcRenderer.send('open-wallet', file.path, '');
        ipcRenderer.on('open-wallet', (event, arg) => {
          console.log(arg); // prints "pong"
        });
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
