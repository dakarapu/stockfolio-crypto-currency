import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {SettingsService} from "./services/settings.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    constructor(private translate: TranslateService,
                public setting: SettingsService
    ) {
        // Add languages
        this.translate.addLangs(['en', 'pt']);

        ///
        let lang = setting.getStorage('lang', "pt");

        // Set the default language
        this.translate.setDefaultLang(lang);

        // Use a language
        this.translate.use(lang);

    }
}
