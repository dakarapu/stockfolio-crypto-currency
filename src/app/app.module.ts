import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';


import { AppComponent } from './app.component';
import { ServicesModule } from "./services/services.module";
import { RouterModule } from "@angular/router";
import { AppRoutes } from "./app.routing";
import { SharedModule } from "./shared/shared.module";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DataTablesModule } from "angular-datatables";
import { AngularFireModule } from "angularfire2";
import { environment } from "../environments/environment";
import { AngularFireAuthModule } from "angularfire2/auth";
import { GrowlModule } from "primeng/growl";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { DashboardPage } from './dashboard/dashboard.component';

@NgModule({
    declarations: [
        AppComponent,
        DashboardPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(AppRoutes),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        NgbModule.forRoot(),
        ServicesModule,
        SharedModule,
        DataTablesModule,
        GrowlModule,
    ],
    providers: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}



