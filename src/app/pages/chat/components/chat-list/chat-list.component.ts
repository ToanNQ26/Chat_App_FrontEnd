import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Conversation } from '../../../../models/conversation';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css'],
  imports: [FormsModule, CommonModule],
})
export class ChatListComponent {
  @Input() conversations: Conversation[] = [];
  @Input() selectedConversationId: string = '';
  @Output() conversationSelected = new EventEmitter<Conversation>();

  searchTerm = '';

  get filteredConversations() {
    return this.conversations.filter(c =>
      c.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectConversation(convo: Conversation) {
    this.conversationSelected.emit(convo);
  }
}
