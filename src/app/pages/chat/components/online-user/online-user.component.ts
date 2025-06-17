import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/user';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-online-users',
  imports : [AvatarComponent ,CommonModule],
  templateUrl: './online-user.component.html',
  styleUrls: ['./online-user.component.css']
})
export class OnlineUsersComponent implements OnInit {
  onlineUsers: User[] = [];

  constructor(private authService : AuthService) {
    
  }

  ngOnInit() {

    this.authService.getUserOnline().subscribe(user => {
      this.onlineUsers = user;
    })
    // Gọi API hoặc service ở đây để lấy danh sách người online
    // Dưới đây là ví dụ tĩnh
    //this.onlineUsers = ['Alice', 'Bob', 'Charlie'];
  }
  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/defautAvatar.jpg'; // đường dẫn ảnh local bạn muốn dùng thay thế
  }
}
