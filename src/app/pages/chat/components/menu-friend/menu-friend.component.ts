import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FriendRequestComponent } from '../../friend/friend-request/friend-request.component';
import { FriendListComponent } from '../../friend/friend-list/friend-list.component';

@Component({
  selector: 'app-menu-friend',
  imports: [CommonModule, FriendListComponent, FriendRequestComponent],
  templateUrl: './menu-friend.component.html',
  styleUrl: './menu-friend.component.css'
})
export class MenuFriendComponent {

  selectedMenu: string = 'friend-list';

  menus = [
    { label: 'Danh sách bạn bè', value: 'friend-list' },
    {  label: 'Lời mời kết bạn', value: 'friend-request'},
  ];

  changeMenu(menu: string) {
    this.selectedMenu = menu;
  }
}
