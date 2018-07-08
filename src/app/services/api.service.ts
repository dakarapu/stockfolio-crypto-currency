
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { SettingsService } from './settings.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class Api {

    public coinApiKey = environment.coinApiKey;

    constructor(
        public settings: SettingsService,
        private http: HttpClient,
    ) {
    }

    getExchangeRate(coin) {
        const headers = new HttpHeaders().set('X-CoinAPI-Key', this.coinApiKey);

        return this.http.get('https://rest.coinapi.io/v1/exchangerate/' + coin + '/USD', {
            headers
        }).map(res => res).catch((error: any) => this.handleError(this, error));
    }

    handleError(_parent, error: any) {
        if ((error.status === 401 || error.status === 400) && error.url && !error.url.endsWith('/login')) {
            console.log('unauthorized');
        }
        return Observable.throw(error);
    }

}
