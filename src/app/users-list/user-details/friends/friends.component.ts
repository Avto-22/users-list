import { UserDetailsFnService } from './../../services/user-details-fn.service';
import { UserDetailsFriendsFacadeService } from './../user-details-friends-facade.service';
import { AllUser, HistoryUser } from './../../users-list.model';
import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  @Input() userId: number;
  users:HistoryUser[]=JSON.parse(localStorage.getItem('users'));
  friends: AllUser[];

  constructor(
    private userDetailsFriendsFacadeService: UserDetailsFriendsFacadeService,
    public userDetailsFnService: UserDetailsFnService,
  ) { }

  ngOnInit() {
    this.userDetailsFriendsFacadeService.getFriendsList(this);
  }

  @HostListener('window:scroll', [])
  onWinsowScroll() {
    this.userDetailsFriendsFacadeService.onWinsowScroll(this);
  }
}
