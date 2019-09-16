import {Component} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  constructor(public menu: MenuController,
              public navCtrl: NavController) {}

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }

  login() {
    this.navCtrl.navigateForward('/categorias');
  }

}
