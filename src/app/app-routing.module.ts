import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./users-list/users-list.module').then(x=>x.UsersListModule)
  },
  {
    path:'**',
    loadChildren: () => import('./not-found/not-found.module').then(x=>x.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
