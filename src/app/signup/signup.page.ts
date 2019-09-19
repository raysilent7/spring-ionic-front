import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CidadeService} from '../../services/domain/cidade.service';
import {EstadoService} from '../../services/domain/estado.service';
import {EstadoDTO} from '../../models/estado.DTO';
import {CidadeDTO} from '../../models/cidade.DTO';

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
              public cidadeService: CidadeService,
              public estadoService: EstadoService) {
    this.formGroup = this.formBuilder.group({
      name: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      type : ['1', [Validators.required]],
      cpfOrCnpj : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      password : ['123', [Validators.required]],
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
    this.estadoService.findAll()
        .subscribe(response => {
          this.states = response;
          this.formGroup.controls.stateId.setValue(this.states[0].id);
          this.updateCidades();
        },
        error => {});
  }

  updateCidades() {
    let stateId = this.formGroup.value.stateId;
    this.cidadeService.findAll(stateId)
        .subscribe(response => {
          this.cities = response;
          this.formGroup.controls.cityId.setValue(null);
        },
        error => {});
  }

  signupUser() {
    console.log('conta criada com sucesso');
  }

  ngOnInit() {
  }

}
