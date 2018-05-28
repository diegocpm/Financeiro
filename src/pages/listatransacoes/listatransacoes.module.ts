import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListatransacoesPage } from './listatransacoes';

@NgModule({
  declarations: [
    ListatransacoesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListatransacoesPage),
  ],
})
export class ListatransacoesPageModule {}
