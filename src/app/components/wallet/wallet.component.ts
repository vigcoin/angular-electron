import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  keys = {
    sendKey: '',
    viewKey: ''
  };
  constructor(private ref: ChangeDetectorRef, public es: ElectronService) { }

  ngOnInit() {

    if (this.es.isElectron()) {
      const { ipcRenderer } = this.es;
      ipcRenderer.on('get-keys', (event, sendKey, viewKey) => {
        this.keys.sendKey = sendKey;
        this.keys.viewKey = viewKey;
        console.log(this.keys);
        this.ref.detectChanges();
      });
      ipcRenderer.send('get-keys');
    }
  }

}
