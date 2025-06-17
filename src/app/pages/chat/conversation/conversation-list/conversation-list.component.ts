import { Component, OnInit } from '@angular/core';
import { Conversation } from '../../../../models/conversation';
import { ConversationService } from '../../../../services/conversation.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-conversation-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './conversation-list.component.html',
  styleUrl: './conversation-list.component.css'
})
export class ConversationListComponent implements OnInit {
  conversations: Conversation[] = [];

  constructor(private conversationService: ConversationService, private userService: UserService) {}

  showChatWindow = false;

  ngOnInit() {
    const currentUser = this.userService.getUser()!;
    this.conversationService.getGroupConversationApi(currentUser.userId).subscribe(data=> {
      this.conversations = data.result;
      console.log(currentUser, "oais");
      console.log(this.conversations, "oiaysgv")
    })
  }


}
