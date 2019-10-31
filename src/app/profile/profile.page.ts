import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {ClienteDTO} from '../../models/cliente.DTO';
import {ClienteService} from '../../services/domain/cliente.service';
import {NavController} from "@ionic/angular";
import {API_CONFIG} from "../../config/api.config";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cliente: ClienteDTO

  constructor(public storage: StorageService,
              public navCtrl: NavController,
              public clienteService: ClienteService) { }

  ionViewDidEnter() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
          .subscribe(response => {
            this.cliente = response;
            this.getImageIfExists();
            },
            error => {
              if (error.status == 403) {
                this.navCtrl.navigateBack('/home');
              }
            });
    }
    else {
      this.navCtrl.navigateBack('/home');
    }
  }

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
        .subscribe(response => {
              this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
            },
            error => {});
  }

  ngOnInit() {}

}
