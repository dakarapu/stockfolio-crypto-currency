import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Api } from '../services/api.service';
import { SettingsService } from '../services/settings.service';

@Component({
  templateUrl: './dashboard.component.html',
  selector: 'page-dashboard',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardPage implements OnInit {

  public shares = [];
  public cashInfo: any;
  public sharesRef: any;
  public cashRef: any;
  public selectedShareId: any;
  public selectedShare: any;
  public price: any;

  public buyInfo = {
    buyAmount: 0,
    cashAmount: 0
  };

  public sellInfo = {
    sellAmount: 0,
    cashAmount: 0
  };

  public ar_amount = 0;

  constructor(
    public afs: AngularFirestore,
    public api: Api,
    public setting: SettingsService
  ) {
  }

  ngOnInit() {
    this.getBalance().subscribe(res => {
      this.cashInfo = res[0];
      console.log(this.cashInfo);
    });
    this.getSharesData().subscribe(res => {
      this.shares = res;
      console.log(this.shares);
      for (let i = 0; i < this.shares.length; i++) {
        if (this.shares[i]['id'] === this.selectedShareId) {
          this.selectedShare = this.shares[i];
        }
      }
    });
  }

  getBalance() {
    this.cashRef = this.afs.collection('cash');
    return this.cashRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return { id: id, data: data };
      });
    });
  }

  getSharesData() {
    this.sharesRef = this.afs.collection('shares');
    return this.sharesRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return { id: id, data: data };
      });
    });
  }

  getExchangeRate(coin) {
    this.api.getExchangeRate(coin).subscribe(res => {
      this.price = res.rate;
    });
  }

  selectShare(item) {
    this.selectedShareId = item.id;
    console.log(item.id);
    this.selectedShare = item;
    this.getExchangeRate(this.selectedShare.data.name);
    this.setting.setStorage('sharedId', this.selectedShareId);
    this.initForm();
  }

  initForm() {
    this.buyInfo.buyAmount = 0;
    this.buyInfo.cashAmount = 0;
    this.sellInfo.sellAmount = 0;
    this.sellInfo.cashAmount = 0;
  }

  changeBuyOrderAmount() {
    this.buyInfo.cashAmount = this.buyInfo.buyAmount * this.price;
  }

  changeSellOrderAmount() {
    this.sellInfo.cashAmount = this.sellInfo.sellAmount * this.price;
  }

  addCash() {
    const new_balance = Number(this.cashInfo.data.balance) + this.ar_amount;
    console.log(12 - 11.4);
    console.log(new_balance);
    const ref = this.afs.collection('cash').doc(this.cashInfo.id);
    ref.update({
      name: this.cashInfo.data.name,
      balance: new_balance
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }

  removeCash() {
    if (this.cashInfo.data.balance < this.ar_amount) {
      alert('Your balance is less than ' + this.ar_amount);
      return;
    }
    const new_balance = Number(this.cashInfo.data.balance) - this.ar_amount;
    console.log(new_balance);
    const ref = this.afs.collection('cash').doc(this.cashInfo.id);
    ref.update({
      name: this.cashInfo.data.name,
      balance: new_balance
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }

  buyOrder() {
    console.log(this.buyInfo);
    if (this.buyInfo.cashAmount > this.cashInfo.data.balance) {
      alert('You do not have enough cash');
      return;
    }
    let ref = this.afs.collection('cash').doc(this.cashInfo.id);
    ref.update({
      name: this.cashInfo.data.name,
      balance: this.cashInfo.data.balance - this.buyInfo.cashAmount
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });

    ref = this.afs.collection('shares').doc(this.selectedShareId);
    ref.update({
      balance: this.selectedShare.data.balance + this.buyInfo.buyAmount
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });

  }

  sellOrder() {
    console.log(this.sellInfo);
    if (this.sellInfo.sellAmount > this.selectedShare.data.balance) {
      alert('You do not have enough coins');
      return;
    }
    let ref = this.afs.collection('cash').doc(this.cashInfo.id);
    ref.update({
      name: this.cashInfo.data.name,
      balance: this.cashInfo.data.balance + this.sellInfo.cashAmount
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });

    ref = this.afs.collection('shares').doc(this.selectedShareId);
    ref.update({
      balance: this.selectedShare.data.balance - this.sellInfo.sellAmount
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }
}
