import {NgModule} from '@angular/core';
import {SettingsService} from "./settings.service";
import {MessageService} from 'primeng/components/common/messageservice';
import {Api} from "./api.service";


@NgModule({
    imports: [],
    declarations: [],
    providers: [
        Api,
        SettingsService,
        MessageService,
    ],
    exports: []
})
export class ServicesModule {

}
