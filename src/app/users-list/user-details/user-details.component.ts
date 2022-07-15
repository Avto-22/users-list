import { UserDetailsFriendsFacadeService } from './user-details-friends-facade.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../users-list.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute,
    private userDetailsFriendsFacadeService:UserDetailsFriendsFacadeService,
  ) {}

  userId:number=this.activatedRoute.snapshot.params['id'];
  user:User;

  ngOnInit() {
      this.userDetailsFriendsFacadeService.getUser(this);
  }
}