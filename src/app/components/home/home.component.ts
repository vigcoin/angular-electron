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

  constructor(private es: ElectronService) { }

  ngOnInit() {
  }

  onOpenLink(e) {
    console.log("opening " + e);
    return this.es.openLink(e)
  }

  onOpenWallet() {
    console.log("file = " + this.file);
    console.log("password = " + this.password);
  }
  
  onSelectWallet(files) {
    console.log(files);
    let upload = files[0];
    this.fileSelected = true;
    if (upload.path) {
      console.log(upload.path);
    }
  }
}
