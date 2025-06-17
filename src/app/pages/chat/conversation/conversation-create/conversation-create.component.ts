import { Component, EventEmitter, Output, output } from '@angular/core';
import { ConversationService } from '../../../../services/conversation.service';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user';
import { Conversation } from '../../../../models/conversation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-conversation-create',
  imports: [CommonModule, FormsModule],
  templateUrl: './conversation-create.component.html',
  styleUrl: './conversation-create.component.css'
})
export class ConversationCreateComponent {
  userFriends: User[] = [];
  selectedFriendIds: string[] = [];
  serchTerm: string = '';
  conversationName: string = '';
  selectFriend: User | null = null;
  @Output() close1 = new EventEmitter<void>();

  constructor(private conversationService: ConversationService, private userService: UserService){
    this.userFriends = this.userService.getFriendUser();
    const userid = this.userService.getUser()?.userId;
    this.selectedFriendIds.push(userid!);
  }
  
  get filterFriends(){
    const result = this.userFriends.filter(c =>
      c.fullName?.toLowerCase().includes(this.serchTerm.toLowerCase())
    );
    return result;
  }

 // Toggle friend chọn hoặc bỏ chọn
  toggleFriend(friend: User) {
    const index = this.selectedFriendIds.indexOf(friend.userId);
    if (index > -1) {
      this.selectedFriendIds.splice(index, 1); // Bỏ ra
    } else {
      this.selectedFriendIds.push(friend.userId); // Thêm vào
    }
  }

  // Kiểm tra 1 friend đã được chọn chưa
  isSelected(friend: User): boolean {
    return this.selectedFriendIds.includes(friend.userId);
  }

  // Gửi API tạo nhóm
  createGroup() {
    if (!this.conversationName.trim() || this.selectedFriendIds.length ===1) {
      alert('Tên và thành viên là bắt buộc');
      return;
    }

    const conversation: Conversation = {
      conversationId: '',
      name: this.conversationName,
    };

    this.conversationService.addConversationApi(conversation.conversationId, conversation.name, this.selectedFriendIds)
      .subscribe({
        next: () => {
          alert('Tạo nhóm thành công!');
        },
        error: err => {
          console.error(err, "osuyf");
          alert('Tạo nhóm thất bại!');
        }
      });
  }

  onClose() {
    this.close1.emit();
  }
}
