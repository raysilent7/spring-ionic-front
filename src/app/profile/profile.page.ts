import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {ClienteDTO} from '../../models/cliente.DTO';
import {ClienteService} from '../../services/domain/cliente.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cliente: ClienteDTO

  constructor(public storage: StorageService,
              public clienteService: ClienteService) { }

  ionViewDidEnter() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
          .subscribe(response => {
            this.cliente = response;
            },
            error => {});
    }
  }

  ngOnInit() {}

}
