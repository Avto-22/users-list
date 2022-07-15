import { UsersListComponent } from './users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component'
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component: UsersListComponent
  },
  {
    path:'user/:id',
    component: UserDetailsComponent
  }
];

@NgModule({
    imports: [RouterModule. forChild(routes)],
    exports: [RouterModule],
})
export class UsersListRoutingModule { }