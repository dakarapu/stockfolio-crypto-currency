/**
 * Created by ApolloYr on 2/25/2018.
 */

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Validate } from "../services/validate.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { SettingsService } from "../services/settings.service";
import { NotifyService } from "../services/notify.service";
import { Api } from "../services/api.service";
import { MatDialog } from "@angular/material";
@Component({
    templateUrl: './login.component.html',
    selector: 'page-login',
    styleUrls: ['./login.component.scss']
})
export class LoginPage implements OnInit {

    loginForm: FormGroup

    loginInfo = {
        email: '',
        password: '',
        remember: false,
    }


    constructor(
        public formBuilder: FormBuilder,
        public validate: Validate,
        public router: Router,
        private fAuth: AngularFireAuth,
        public setting: SettingsService,
        public notify: NotifyService,
        public api: Api,
        public dialog: MatDialog
    ) {

    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            remember: [false]
        });
    }

    login() {
        if (this.loginForm.valid) {
            this.setting.showLoading();
            this.api.fbLogin(this.loginInfo)
                .then(res => {

                    this.setting.hideLoading()

                    this.setting.loginInfo = res;
                    this.setting.isLoggedin = true;

                    this.setting.loginPassword = this.loginInfo.password;

                    if (this.loginInfo.remember) {
                        this.setting.setStorage('email', this.loginInfo.email);
                        this.setting.setStorage('password', this.loginInfo.password);
                    }

                    this.notify.showNotification('success', "Login efetuado com sucesso.");

                    this.router.navigate(['/home']);
                }).catch(err => {
                    this.setting.hideLoading();
                    this.notify.showNotification('warn', "Invalid Credentical");
                });

        }
    }


}
