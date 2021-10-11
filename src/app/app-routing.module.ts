import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardCreateComponent } from './card-create/card-create.component';
import { CardEditComponent } from './card-edit/card-edit.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'card/:id', component: CardEditComponent},
  {path: 'card', component: IndexComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
