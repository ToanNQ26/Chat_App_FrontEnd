import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';
import { FriendService } from '../../../../services/friend.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FriendInfoModalComponent } from '../../components/friend-info-modal/friend-info-modal.component';

@Component({
  selector: 'app-add-friend',
  imports: [CommonModule, FormsModule, FriendInfoModalComponent],
  templateUrl: './add-friend.component.html',
  styleUrl: './add-friend.component.css'
})
export class AddFriendComponent {
  phone: string = '';
  selectedUser: User | null = null;
  currentUser: User | null = null;
  searchDone: boolean = false;
  @Output() close = new EventEmitter<void>();

  constructor(
    private userService: UserService,
    private friendService: FriendService
  ) {
    this.currentUser = this.userService.getUser();
  }

  searchUser() {
    this.userService.getUserApi(this.phone).subscribe({
      next: (users) => {
        this.selectedUser = users;
  
        if (!this.selectedUser) {
          alert('Không tìm thấy người dùng');
        } else {
          this.searchDone = true; // ẩn phần tìm kiếm, chỉ hiện thông tin bạn
        }
      },
      error: () => {
        alert('Lỗi khi tìm người dùng');
      }
    });
  }
  
  closeModal() {
    this.selectedUser = null;
    this.searchDone = false; // reset lại hiển thị để quay lại màn tìm
  }

  onClose() {
    this.close.emit();
  }

  sendFriendRequest() {
    if (!this.currentUser || !this.selectedUser) return;

    this.friendService.sendFriendRequest(this.currentUser.userId, this.selectedUser.userId)
      .subscribe({
        next: () => {
          alert('Đã gửi lời mời kết bạn');
          this.selectedUser = null;
          this.searchDone = false;
        },
        error: () => {
          alert('Gửi lời mời thất bại');
        }
      });
  }
}
