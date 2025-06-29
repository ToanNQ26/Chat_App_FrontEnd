// src/app/pages/chat/chat.component.ts
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Conversation } from '../../../models/conversation';
import { Message } from '../../../models/message';
import { ConversationService } from '../../../services/conversation.service';
import { SocketService } from '../../../services/socket.service';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { ChatService } from '../../../services/chat.service';
import { ChatListComponent } from '../components/chat-list/chat-list.component';
import { ChatWindowComponent } from '../components/chat-window/chat-window.component';
import { CommonModule, formatDate } from '@angular/common';
import { Subscription, timestamp } from 'rxjs';
import { FriendService } from '../../../services/friend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConversationInfoComponent } from '../components/conversation-info/conversation-info.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [ChatListComponent, ChatWindowComponent, CommonModule, ConversationInfoComponent],
})
export class ChatComponent implements OnInit, OnDestroy {
  conversations: Conversation[] = [];
  selectedConversation!: Conversation;
  messages: Message[] = [];
  user!: User;
  private messageSubscription!: Subscription;
  

  constructor(
    private conversationService: ConversationService,
    private socketService: SocketService,
    private userService: UserService,
    private chatService: ChatService,
    private ngzone: NgZone,
    private friendService: FriendService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser()!;
    
    this.route.params.subscribe(params => {
      const convoId = params['conversationId'];
      this.loadConversationsAndSelect(convoId);
    });

    this.socketService.onMessage().subscribe(msg => {
      this.ngzone.run(() => {
        if (
          this.selectedConversation &&
          msg.conversationId.conversationId === this.selectedConversation.conversationId
        ) {
          this.messages.push({
            ...msg,
            timeStamp: new Date(msg.timeStamp),
          });
        }
      });
    });
  }


  loadConversationsAndSelect(convoId?: string): void {
    this.conversationService.getConversationApi(this.user.userId).subscribe(res => {
      this.conversations = res.result;

      // Nếu có convoId từ route
      if (convoId) {
        const found = this.conversations.find(c => c.conversationId === convoId);
        if (found) {
          this.selectConversation(found, false); // Không navigate lại vì URL đã đúng
          return;
        }
      }

      // Nếu không có convoId, chọn conversation đầu tiên và điều hướng
      if (this.conversations.length) {
        this.selectConversation(this.conversations[0], true);
      }
    });
  }


  selectConversation(convo: Conversation, navigate: boolean = true) {
    // Nếu đang chọn rồi thì không làm lại
    if (this.selectedConversation?.conversationId === convo.conversationId) return;

    // Unsubscribe nếu có
    if (this.selectedConversation) {
      this.socketService.unsubscribeFromConversation(this.selectedConversation.conversationId);
    }

    this.selectedConversation = convo;

    // Navigate nếu cần (thường chỉ dùng khi người dùng click vào list)
    if (navigate) {
      this.router.navigate(['/chat', convo.conversationId]);
    }

    this.chatService.getMessages(convo.conversationId).subscribe(res => {
      this.messages = res.result;
    });

    this.socketService.subscribeToConversation(convo.conversationId);
  }



  onSendMessage(content: string) {
    if (!this.selectedConversation) return;
    
    // const formattedTime = formatDate(new Date(), 'dd/MM/yyyy HH:mm:ss', 'en-US');

    const newMsg: Message = {
        content,
        conversationId: this.selectedConversation,
        senderId: this.user, // Lấy từ authService nếu có
        timeStamp: new Date().toISOString(),
    };
    this.socketService.sendMessage(newMsg);
    //this.router.navigate(['/chat', this.selectedConversation.conversationId]);
  }

  ngOnDestroy(): void {
    this.socketService.unsubscribeAll();
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}
