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

      // reader.onload = function (e : any) {
      //     $('#preview').attr('src', e.target.result);
      // }

      console.log(fileInput.target.files[0]);
      console.log(URL.createObjectURL(fileInput.target.files[0]));

      reader.readAsDataURL(fileInput.target.files[0]);

      console.log(reader);
  }
  }

}
