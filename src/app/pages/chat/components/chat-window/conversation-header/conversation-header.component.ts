import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Conversation } from '../../../../../models/conversation';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddMemberComponent } from '../../../conversation/add-member/add-member.component';
import { ConversationService } from '../../../../../services/conversation.service';
import { User } from '../../../../../models/user';


@Component({
  selector: 'app-conversation-header',
  templateUrl: './conversation-header.component.html',
  styleUrls: ['./conversation-header.component.css'],
  imports: [CommonModule, RouterModule, AddMemberComponent]
})
export class ConversationHeaderComponent {
  showAddMember = false;
  listMember: User[] = [];
  @Input() conversation!: Conversation;
  @Input() user!: User;

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

  get isGroupConversation(): boolean {
    return this.listMember?.length >= 3;
  }

  openAddMemberModal(){
    this.showAddMember = true;
    console.log(this.conversation, "khsu")
  }

  closeAddMember(){
    this.showAddMember = false;
  }

  
}
