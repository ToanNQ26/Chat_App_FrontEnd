import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../../../../models/user';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';
//import { ConversationListComponent } from '../../conversation/conversation-list/conversation-list.component';
import { FriendListComponent } from '../../friend/friend-list/friend-list.component';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../../chat/chat.component';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AvatarComponent } from '../avatar/avatar.component';
import { AvatarUploadComponent } from '../avatar-upload/avatar-upload.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [ CommonModule, RouterLink, RouterLinkActive, AvatarComponent, AvatarUploadComponent ]
})
export class SidebarComponent {
  @Output() openAddFriend = new EventEmitter<void>();
  @Output() opendCreateConversation = new EventEmitter<void>();
  showUploadAvatar = false;
  user: User | null = null;

  constructor(private userService: UserService, private router: Router){}

  ngOnInit(){
    this.user = this.userService.getUser();
    console.log(this.user, "oaisheb")
  }

  menus = [
    { icon: '💬', value: 'chat', route: '/chat' },
    { icon: '📙', value: 'friends', route: '/friends' },
    { icon: '👥', value: 'conversation', route: '/conversation' },
    { icon: '🟢', value: 'online-users', route: '/online-users' },
    { icon: 'assets/icons/add-friend.png', value: 'add-friend', action: 'openAddFriend', isImage:true},
    { icon: 'assets/icons/creategroup.png', value: 'create-conversation', action: 'openCreateConversation', isImage: true},
    { icon: '⚙️', value: 'settings',  },
    { icon: 'assets/icons/logout.png', value: 'logout', action: 'logout', isImage: true }
  ];
  
  handleClick(menu: any) {
    if (menu.route) {
      // Điều hướng như cũ
    } else if (menu.action === 'openAddFriend') {
      this.openAddFriend.emit();
    } else if (menu.action === 'openCreateConversation') {
      this.opendCreateConversation.emit();
    } else if (menu.action === 'logout') {
      this.logout();
    }
  }

  logout() {
  // Bạn có thể thêm xóa token hoặc xử lý logout nếu cần ở đây
  // Ví dụ: localStorage.removeItem('token');

  this.router.navigate(['/login']);
}


  uploadAvatar(){
    this.showUploadAvatar = true;
  }

  closeUploadAvatar(){
    this.showUploadAvatar = false
  }
}
