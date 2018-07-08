/**
 * Created by ApolloYr on 11/17/2017.
 */
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {AngularFirestore} from "angularfire2/firestore";

@Injectable()
export class SettingsService {

    public loading = false;

    public selectedPage = '';

    private storagePrefix = 'smitty_';

    public loginInfo: any;
    public isLoggedin = false;

    public loginPassword = '';

    public products = [];

    public isAddNewProduct = true;
    public selectedProductId = '';
    public selectedProduct: any;

    constructor(
        public afStore: AngularFirestore
    ) {
        // User settings

        this.loadFBStore();
    }

    loadFBStore() {
        let proColRef = this.afStore.collection('products');
        proColRef.valueChanges().subscribe(res => {
            this.products = res;
            console.log(this.products);
        });
    }

    init() {
        this.loading = false;
        this.selectedPage = '';

        this.loginInfo = null;
        this.isLoggedin = false;
        this.setStorage('email', false);
        this.setStorage('password', false);
    }

    clearUserSetting() {
        this.setStorage('user', false);
    }

    getStorage (key, defaultVal?) {
        return window.localStorage[this.storagePrefix + key] ?
            JSON.parse(window.localStorage[this.storagePrefix + key]) : defaultVal || false;
    }

    setStorage (key, val) {
        window.localStorage.setItem(this.storagePrefix + key, JSON.stringify(val));
    }

    showLoading() {
        this.loading = true;
    }

    hideLoading() {
        this.loading = false;
    }
}

