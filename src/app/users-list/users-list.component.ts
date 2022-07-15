import { UserDetailsFnService } from './services/user-details-fn.service';
import { UsersListFacadeService } from './services/users-list-facade.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { AllUser } from './users-list.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: AllUser[];

  constructor(
    private usersListFacadeService: UsersListFacadeService,
    public userDetailsFnService:UserDetailsFnService
  ) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.usersListFacadeService.onWindowScroll(this);
  };

  ngOnInit() {
    this.usersListFacadeService.getUsersList(this);
  }

}
