import { Component, Input, SimpleChanges } from '@angular/core';
import { Conversation } from '../../../../models/conversation';
import { User } from '../../../../models/user';
import { ConversationService } from '../../../../services/conversation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conversation-info',
  imports: [CommonModule ],
  templateUrl: './conversation-info.component.html',
  styleUrl: './conversation-info.component.css'
})
export class ConversationInfoComponent {
  @Input() conversation!: Conversation;
  @Input() user!: User;
  listMember: User[] = [];
  selectedMember!: User;

  constructor(private conversationService: ConversationService){}

  ngOnInit(): void {
    this.loadMember();
    console.log(this.listMember, "oyus")
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['conversation'] && !changes['conversation'].firstChange) {
      this.loadMember(); // Tải lại thành viên khi chuyển conversation
    }
  }

  loadMember(){
    this.conversationService.getMembers(this.conversation.conversationId).subscribe(data=>{
      this.listMember = data.result;
      console.log(this.listMember, "iahs")
    })
  }

  leaveGroup() {
    this.openConfirm('Are you sure you want to leave this group?', () => {
      this.conversationService.leaveGroup(this.conversation.conversationId, this.user.userId).subscribe({
        next: () => {
        // có thể emit event hoặc reload nếu cần
        this.loadMember();
        },
        error: (err) => {
          alert("Không thể rời vì nhóm không thể ít hơn 3 người")
        }
      });
    });
  }


  deleteMember(member: User) {
    this.openConfirm(`Remove ${member.fullName} from the group?`, () => {
      this.conversationService.leaveGroup(this.conversation.conversationId, member.userId).subscribe({
        next : () => {
          this.loadMember(); // tải lại danh sách nếu cần
        },
        error: () =>{
          alert("Không thể xóa thành viên vì nhóm không thể ít hơn 3 người")
        }
      });
    });
  }

  deleteGroup(){
    this.conversationService.deleteGroup(this.conversation.conversationId).subscribe(()=>{
      console.log("oaisuxg")
    })
  }

  selectMember(member: User) {
    this.selectedMember = member;
  }

  get isGroupConversation(): boolean {
    return this.listMember?.length > 3;
  }

  showConfirmModal = false;
confirmMessage = '';
confirmAction!: () => void;

openConfirm(message: string, action: () => void) {
  this.confirmMessage = message;
  this.confirmAction = action;
  this.showConfirmModal = true;
}

confirm() {
  if (this.confirmAction) this.confirmAction();
  this.showConfirmModal = false;
}

cancelConfirm() {
  this.showConfirmModal = false;
}

}
