import {Component, OnInit} from '@angular/core';
import {ProdutoDTO} from "../../models/produto.DTO";
import {ProdutoService} from "../../services/domain/produto.service";
import {ActivatedRoute} from "@angular/router";

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

  ngOnInit() {
    this.route.queryParams.subscribe(parametros => {if (parametros['categoria']) {
      let cat_id = parametros['categoria'];
      console.log('passou por aqui tbm');
      console.log(cat_id);
      this.produtoService.findByCategoria(cat_id)
          .subscribe(response => {
                this.items = response['content'];
              },
              error => {});
    }
    else {
        console.log('passou por aqui');
        this.produtoService.findAll()
            .subscribe(response => {
                    this.items = (<ProdutoDTO[]>response);
                },
                error => {});
    }});
  }

}
