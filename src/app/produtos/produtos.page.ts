import {Component, OnInit} from '@angular/core';
import {ProdutoDTO} from "../../models/produto.DTO";
import {ProdutoService} from "../../services/domain/produto.service";
import {ActivatedRoute} from "@angular/router";
import {API_CONFIG} from "../../config/api.config";

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDTO[];

  constructor(public produtoService: ProdutoService,
              public route: ActivatedRoute){
  }

  loadImageUrls () {
      for (var i=0; i<this.items.length; i++) {
          let item = this.items[i];
          this.produtoService.getSmallImageFromBucket(item.id)
              .subscribe(response => {
                  item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
              },
              error => {});
      }
  }

  ngOnInit() {
      this.route.queryParams.subscribe(parametros => {if (parametros['categoria']) {
          let cat_id = parametros['categoria'];
          this.produtoService.findByCategoria(cat_id)
              .subscribe(response => {
                  this.items = response['content'];
                  this.loadImageUrls();
              },
              error => {});
        }
      else {
          this.produtoService.findAll()
              .subscribe(response => {
                  this.items = (<ProdutoDTO[]>response);
                  this.loadImageUrls();
              },
              error => {});
      }});
  }
}
