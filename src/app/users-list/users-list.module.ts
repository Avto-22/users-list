import { UserDetailsFnService } from './services/user-details-fn.service';
import { LoadingService } from './../services/loading.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list.component';
import { UsersListRoutingModule } from './users-list-routing.module';
import { UserApiService, USER_API_BASE_URL } from './services/user-api.service';
import { environment } from 'src/environments/environment';
import { UserDetailsComponent } from './user-details/user-details.component'
import { FriendsComponent } from './user-details/friends/friends.component';

@NgModule({
  imports: [
    CommonModule,
    UsersListRoutingModule,
  ],
  declarations: [UsersListComponent, UserDetailsComponent, FriendsComponent],
  providers:[
    LoadingService,
    UserDetailsFnService,
    UserApiService,
    {
      provide: USER_API_BASE_URL,
      useValue: environment.userApiBaseUrl
    }
  ]
})
export class UsersListModule { }
