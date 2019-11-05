import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {IonicModule, NavParams} from '@ionic/angular';

import { CategoriasPage } from './categorias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CategoriasPage
      }
    ])
  ],
  declarations: [CategoriasPage]
})
export class CategoriasPageModule {}
