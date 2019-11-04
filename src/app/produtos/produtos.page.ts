import { Component, OnInit } from '@angular/core';
import {ProdutoDTO} from "../../models/produto.DTO";
import {NavController, NavParams} from "@ionic/angular";

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items : ProdutoDTO[];

  constructor() {
  }

  ionViewDidEnter() {
    this.items = [
      {
        id: "1",
        nome: 'Mouse',
        preco: 80.99
      },
      {
        id: "2",
        nome: 'Teclado',
        preco: 100.00
      }
    ]
  };

  ngOnInit() {
  }

}
