import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentLang = 'en';

  constructor(public translate: TranslateService) {}

  ngOnInit(): void {
    this.translate.getStreamOnTranslationChange('TASK_MANAGMENT_SYSTEM').subscribe(res => {
      console.log("res", res)
      console.log("instant",  this.translate.instant('TASK_MANAGMENT_SYSTEM'))
    })
   
  }
  changeCurrentLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('currentLanguage', lang);
    console.log('event.lang');

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      document.documentElement.lang = event.lang;
      console.log('event.lang', event.lang);
      event.lang == 'ar'
        ? (document.documentElement.dir = 'rtl')
        : (document.documentElement.dir = 'ltr');
    });
  }
}
