import {Component} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import {CredenciaisDTO} from '../../models/credenciais.DTO';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  creds: CredenciaisDTO = {
    email: '',
    password: ''
  };

  constructor(public menu: MenuController,
              public auth: AuthService,
              public navCtrl: NavController) {}

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }

  login() {
    console.log(this.creds);
    this.auth.authenticate(this.creds).subscribe(
        response => {
          console.log(response.headers.get('Authorization'));
          this.navCtrl.navigateForward('/categorias');
        },
        error => {});
  }

}
