/**
 * Created by ApolloYr on 11/18/2017.
 */

import {NgModule} from '@angular/core';
import {AuthGuard} from "./authguard.service";
import {Validate} from "./validate.service";
import {SettingsService} from "./settings.service";
import {NotifyService} from "./notify.service";
import {MessageService} from 'primeng/components/common/messageservice';
import {Api} from "./api.service";


@NgModule({
    imports: [],
    declarations: [],
    providers: [
        Api,
        AuthGuard,
        Validate,
        SettingsService,
        NotifyService,
        MessageService,
    ],
    exports: []
})
export class ServicesModule {

}
