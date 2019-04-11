import { Component, OnInit, Input } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  fileSelected = false;
  file;
  password;
  wallet;

  constructor(private es: ElectronService) { }

  ngOnInit() {
    this.es.on('open-wallet', (event, error, wallet) => {
      console.log(" on open wallet, ", event, error, wallet);
      if (error) {
        this.es.messageBox("密码错误!");
      } else {
        this.openWallet(wallet);
      }
    });
  }

  openWallet(wallet) {
    this.wallet = wallet;
  }

  onOpenLink(e) {
    console.log("opening " + e);
    return this.es.openLink(e)
  }

  onOpenWallet() {
    let file = this.file;
    console.log("file = " + file);
    console.log("file = " + this.file);
    console.log("password = " + this.password);
    if (!this.password) {
      return this.es.openWallet(this.file, '');
    }
    return this.es.openWallet(this.file, this.password);
  }

  onSelectWallet(files) {
    console.log(files);
    let upload = files[0];
    this.fileSelected = true;
    if (upload.path) {
      this.file = upload;
    }
  }
}
