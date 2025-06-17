import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../pages/chat/components/sidebar/sidebar.component';
import { AddFriendComponent } from '../../pages/chat/friend/add-friend/add-friend.component';
import { CommonModule } from '@angular/common';
import { ConversationCreateComponent } from '../../pages/chat/conversation/conversation-create/conversation-create.component';
//import { ConversationCreateComponent } from '../../pages/chat/conversation/conversation-create/conversation-create.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, AddFriendComponent, CommonModule, ConversationCreateComponent],
  templateUrl:'./main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  showAddFriend = false;
  showCreateConversation = false;

  openAddFriendModal() {
    this.showAddFriend = true;
  }

  closeAddFriendModal() {
    this.showAddFriend = false;
  }

  openCreateConversationModal() {
    console.log("lalska")
    this.showCreateConversation = true;
  }

  closeCreateConversationModal() {
    console.log("lals")
    this.showCreateConversation = false;
  }
}
