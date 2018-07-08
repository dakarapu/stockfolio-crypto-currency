import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginPage } from "./login/login.component";
import { ServicesModule } from "./services/services.module";
import { RouterModule } from "@angular/router";
import { AppRoutes } from "./app.routing";
import { SharedModule } from "./shared/shared.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MaterialModule } from "./shared/material.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DataTablesModule } from "angular-datatables";
import { AngularFireModule } from "angularfire2";
import { environment } from "../environments/environment";
import { AngularFireAuthModule } from "angularfire2/auth";
import { GrowlModule } from "primeng/growl";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { NgxMaskModule } from "ngx-mask";
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from "@angular/common";
import { DashboardPage } from './dashboard/dashboard.component';

registerLocaleData(localePt);

@NgModule({
    declarations: [
        AppComponent,
        LoginPage,
        DashboardPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(AppRoutes),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        NgbModule.forRoot(),
        ServicesModule,
        SharedModule,
        FlexLayoutModule,
        MaterialModule,
        DataTablesModule,
        GrowlModule,
        NgxMaskModule.forRoot(),
    ],
    providers: [
        { provide: LOCALE_ID, useValue: "pt-BR" },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
