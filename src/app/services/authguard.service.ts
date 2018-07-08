/**
 * Created by ApolloYr on 11/17/2017.
 */
import {Injectable} from '@angular/core';
import {Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {SettingsService} from "./settings.service";
import {AngularFireAuth} from "angularfire2/auth";

@Injectable()
export class AuthGuard implements Resolve<any> {

    constructor(
        private router: Router,
        public setting: SettingsService,
        private fAuth: AngularFireAuth,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.setting.isLoggedin) {
                resolve(true);
            } else {
                let email = this.setting.getStorage('email');
                let password = this.setting.getStorage('password');

                if (email && password) {
                    this.fAuth.auth.signInWithEmailAndPassword(email, password).then(res => {

                        this.setting.loginInfo = res;
                        this.setting.isLoggedin = true;

                        this.setting.loginPassword = password;

                        resolve(true);
                    }).catch(err => {
                        this.setting.setStorage('email', false);
                        this.setting.setStorage('password', false);

                        reject('not logged in');
                        this.router.navigate(['/login']);
                    })
                } else {
                    reject('not logged in');
                    this.router.navigate(['/login']);
                }
            }
            // reject('not logged in');
            // this.router.navigate(['/login']);
        });
    }
}

