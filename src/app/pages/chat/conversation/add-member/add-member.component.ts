import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../models/user';
import { ConversationService } from '../../../../services/conversation.service';
import { UserService } from '../../../../services/user.service';
import { Conversation } from '../../../../models/conversation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-member',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.css'
})
export class AddMemberComponent {
  userFriends: User[] = [];
  selectedFriendIds: string[] = [];
  serchTerm: string = '';
  conversationName: string = '';
  selectFriend: User | null = null;
  @Input() selectConversation!: Conversation;
  @Output() close1 = new EventEmitter<void>();

  constructor(private conversationService: ConversationService, private userService: UserService){
    this.userFriends = this.userService.getFriendUser();
    const userid = this.userService.getUser()?.userId;
    //this.selectedFriendIds.push(userid!);
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
    console.log(this.selectConversation, "khas");
    console.log(this.selectedFriendIds, "jhys");
    this.conversationService.addMemberConversationApi(this.selectConversation.conversationId, this.selectedFriendIds)
      .subscribe({
        next: () => {
          alert('Thêm thành công!');
        },
        error: err => {
          console.error(err);
          alert('Thêm thất bại!');
        }
      });
  }

  onClose() {
    this.close1.emit();
  }
}
