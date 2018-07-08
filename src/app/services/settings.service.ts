
import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class SettingsService {

    private storagePrefix = 'smitty_';
    constructor(
        public afStore: AngularFirestore
    ) {
        // User settings
    }

    getStorage (key, defaultVal?) {
        return window.localStorage[this.storagePrefix + key] ?
            JSON.parse(window.localStorage[this.storagePrefix + key]) : defaultVal || false;
    }

    setStorage (key, val) {
        window.localStorage.setItem(this.storagePrefix + key, JSON.stringify(val));
    }
}

