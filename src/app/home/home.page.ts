import {Component} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import {CredenciaisDTO} from '../../models/credenciais.DTO';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  creds: CredenciaisDTO = {
    email: '',
    senha: ''
  };

  constructor(public menu: MenuController,
              public navCtrl: NavController) {}

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }

  login() {
    console.log(this.creds)
    this.navCtrl.navigateForward('/categorias');
  }

}
