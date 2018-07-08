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

    constructor(
                public setting: SettingsService
    ) {

    }
}
