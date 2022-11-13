import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExempleTableComponent } from './pages/exemple-table/exemple-table.component';
import { PersonComponent } from './pages/person/person.component';

const routes: Routes = [
  {path:'', component: PersonComponent},
  {path:'exemple', component: ExempleTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
