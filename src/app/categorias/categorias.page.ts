import {Component, OnInit} from '@angular/core';
import {CategoriaService} from '../../services/domain/categoria.service';
import {CategoriaDTO} from '../../models/categoria.DTO';
import {API_CONFIG} from "../../config/api.config";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-categorias',
  templateUrl: 'categorias.page.html',
  styleUrls: ['categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: CategoriaDTO[];

  constructor(public categoriaService: CategoriaService,
              public navCtrl: NavController) {}

  ionViewDidEnter() {
    this.categoriaService.findAll().subscribe(response => {
      this.items = response;
    },
    error => {
      console.log(error);
    });
  }

  showProdutos (categoria_id: string) {
    this.navCtrl.navigateForward(['produtos'], {queryParams: {categoria: categoria_id}});

  }

  ngOnInit(): void {}
}
