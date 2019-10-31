import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CidadeService} from '../../services/domain/cidade.service';
import {EstadoService} from '../../services/domain/estado.service';
import {EstadoDTO} from '../../models/estado.DTO';
import {CidadeDTO} from '../../models/cidade.DTO';
import {ClienteService} from '../../services/domain/cliente.service';
import {AlertController, MenuController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formGroup: FormGroup;
  states: EstadoDTO[];
  cities: CidadeDTO[];

  constructor(public formBuilder: FormBuilder,
              public menu: MenuController,
              public cidadeService: CidadeService,
              public estadoService: EstadoService,
              public clienteService: ClienteService,
              public alertCtrl: AlertController,
              public navCtrl: NavController) {
    this.formGroup = this.formBuilder.group({
      name: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      type : ['1', [Validators.required]],
      cpfOrCnpj : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      password : ['123456', [Validators.required]],
      location : ['Rua Via', [Validators.required]],
      number : ['25', [Validators.required]],
      complement : ['Apto 3', []],
      neighbr : ['Copacabana', []],
      cep : ['10828333', [Validators.required]],
      phone1 : ['977261827', [Validators.required]],
      phone2 : ['', []],
      phone3 : ['', []],
      stateId : [null, [Validators.required]],
      cityId : [null, [Validators.required]]
    });
  }

  ionViewDidEnter() {
    this.menu.enable(false);
    this.estadoService.findAll()
        .subscribe(response => {
          this.states = response;
        },
        error => {});
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

  updateCidades() {
    let stateId = this.formGroup.value.stateId;
    this.cidadeService.findAll(stateId)
        .subscribe(response => {
          this.cities = response;
          this.formGroup.controls.cityId.setValue(1);
        },
        error => {});
  }

  signupUser() {
    this.clienteService.insert(this.formGroup.value)
        .subscribe(response => {
          this.showInsertOk();
        },
        error => {});
  }

  async showInsertOk() {
    const alert = await this.alertCtrl.create({
      header: 'Aviso',
      subHeader: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.navigateForward('/home');
          }
        }
      ]
    });
    await alert.present();
  }

  backToHome() {
    this.navCtrl.navigateForward('/home');
  }

  ngOnInit() {
  }
}
