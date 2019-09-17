import {Component, OnInit} from '@angular/core';
import {CategoriaService} from '../../services/domain/categoria.service';
import {CategoriaDTO} from '../../models/categoria.DTO';

@Component({
  selector: 'app-categorias',
  templateUrl: 'categorias.page.html',
  styleUrls: ['categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  items: CategoriaDTO[];

  constructor(public categoriaService: CategoriaService) {}

  ionViewDidEnter() {
    this.categoriaService.findAll().subscribe(response => {
      this.items = response;
    },
    error => {
      console.log(error);
    });
  }

  ngOnInit(): void {}
}
