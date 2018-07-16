import { Component, OnInit, Input } from '@angular/core';

import { faHome, faWallet, faBuilding, faComments, faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input('current')
  current;
  faHome = faHome
  faWallet = faWallet
  faBuilding = faBuilding
  faComments = faComments
  faEnvelope = faEnvelope

  constructor() {
  }

  ngOnInit() {
  }

}
