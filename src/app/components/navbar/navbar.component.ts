import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { faHome, faWallet, faBuilding, faComments, faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() current;

  supportedLanguages = [{ name: 'en', language: 'English', icon: 'us' }, { name: 'zh', language: '中文', icon: 'cn' }];

  faHome = faHome;
  faWallet = faWallet;
  faBuilding = faBuilding;
  faComments = faComments;
  faEnvelope = faEnvelope;
  selectedLanguage = 'en';
  constructor(
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    let locale = localStorage.getItem('locale');
    console.log('locale = ', locale);
    if (!locale) {
      locale = this.getLocaleString();
    }
    this.setLocale(locale);
  }

  getSupportedLanguage(locale: String) {
    let found = null;
    this.supportedLanguages.forEach((item) => {
      if (item.name === locale) {
        found = item;
      }
    });
    return found;
  }
  getLocaleString() {
    let locale = navigator.language;
    let found = this.getSupportedLanguage(locale);

    if (found) {
      return found.name;
    }
    locale = locale.split('-')[0];
    found = this.getSupportedLanguage(locale);
    if (found) {
      return found.name;
    }
    return 'en';
  }

  setLocale(locale: string) {
    this.translate.setDefaultLang(locale);
    this.translate.use(locale);
    localStorage.setItem('locale', locale);
    this.selectedLanguage = locale;
  }

  onChange(item) {
    console.log(item);
    this.setLocale(item.name);
  }
}
