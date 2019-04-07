import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { faHome, faWallet, faBuilding, faComments, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import * as $ from 'jquery';
// import * as bootstrap from 'bootstrap';
// import * as bootstrapSelect from 'bootstrap-select';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterContentChecked {

  @Input() current;

  supportedLanguages = ['en', 'zh'];

  faHome = faHome;
  faWallet = faWallet;
  faBuilding = faBuilding;
  faComments = faComments;
  faEnvelope = faEnvelope;

  constructor(
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    // $('.selectpicker').selectpicker();

  }

  ngAfterContentChecked() {
    let locale = localStorage.getItem('locale');
    console.log('locale = ', locale);
    if (!locale) {
      locale = this.getLocaleString();
    }
    this.setLocale(locale);

    $('.selectpicker').on('changed.bs.select', (e) => {
      console.log('change detected!');
      // console.log(e.target.value);
      // this.setLocale(e.target.value);
    });
  }
  getLocaleString() {
    let locale = navigator.language;
    if (this.supportedLanguages.indexOf(locale) !== -1) {
      return locale;
    }
    locale = locale.split('-')[0];
    if (this.supportedLanguages.indexOf(locale) !== -1) {
      return locale;
    }
    return 'en';
  }

  setLocale(locale: string) {
    this.translate.setDefaultLang(locale);
    this.translate.use(locale);
    $('select').val(locale);
    // $('.selectpicker').selectpicker('refresh');
    localStorage.setItem('locale', locale);
  }
}
