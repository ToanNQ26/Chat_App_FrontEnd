import { Component } from '@angular/core';
import { FriendService } from '../../../../services/friend.service';
import { UserService } from '../../../../services/user.service';

import { User } from '../../../../models/user';
import { forkJoin, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FriendRequest } from '../../../../models/friend-request';
import { Conversation } from '../../../../models/conversation';
import { ConversationService } from '../../../../services/conversation.service';

@Component({
  selector: 'app-friend-request',
  imports: [CommonModule],
  templateUrl: './friend-request.component.html',
  styleUrl: './friend-request.component.css'
})
export class FriendRequestComponent {
  friendRequests: FriendRequest[] = [];
  sentFriendRequest: FriendRequest[] = [];
  selectedRequest!: FriendRequest;
  listUserId: string[] = [];
  currentUser!: User;
  friendUsers: User[] = [];
  sentFriendUsers: User[] = [];
  activeTab: 'received' | 'sent' = 'received';
  private dragStartX: number | null = null;
  private dragDelta: number = 0;

  constructor(
    private friendService: FriendService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getUser()!;
    this.loadFriendRequests();
    this.loadSentFriendRequests();
  }

  loadFriendRequests(): void {
    this.friendService.getFriendRequest(this.currentUser.userId).subscribe(requests => {
      console.log("Friend requests:", requests); 
      this.friendRequests = requests.result;
      console.log(requests.result, "lal");

      // Lấy danh sách user tương ứng với từng request
      const userObservables = (requests.result as FriendRequest[]).map((req: FriendRequest) => 
        this.userService.getUserList(req.senderId)

      );

      console.log(userObservables, "iha")

        forkJoin(userObservables).subscribe(users => {
          console.log('Users resolved:', users);
          this.friendUsers = users;
        });
    });
  }

  loadSentFriendRequests(): void {
    this.friendService.sentFriendRequest(this.currentUser.userId).subscribe(requests => {
      console.log("Sent Friend requests:", requests); 
      this.sentFriendRequest = requests.result;
      console.log(requests.result, "lal");

      // Lấy danh sách user tương ứng với từng request
      const userObservables = (requests.result as FriendRequest[]).map((req: FriendRequest) => 
        this.userService.getUserList(req.receiverId)

      );

      console.log(userObservables, "iha")

        forkJoin(userObservables).subscribe(users => {
          console.log('Users resolved:', users);
          this.sentFriendUsers = users;
        });
    });
  }

  accept(request: FriendRequest) {
    this.selectedRequest = request;
    this.friendService.acceptFriendRequest(
      request.id
    ).subscribe(() => {
      this.userService.getUserList(request.senderId).subscribe(data=>{
        const friendList = this.userService.getFriendUser();
        friendList.push(data[0]);
        this.userService.setFriendUser(data[0])
      });
      console.log(request.id, "haha");
      this.removeRequestFromList(request.id);
    });
  }
  
  refuse(request: FriendRequest) {
    this.selectedRequest = request;
    console.log(request, "kjhsa")
    this.friendService.refuseFriendRequest(
      request.senderId,
      request.receiverId
    ).subscribe(() => {
      this.removeRequestFromList(request.id);
    });
  }

  // selectRequest(request: FriendRequest): void {
  //   this.selectedRequest = request;
  // }

  // private removeRequestFromList(requestId: number): void {
  //   const indexToRemove = this.friendRequests.findIndex(r => r.id === requestId);
  //   if (indexToRemove !== -1) {
  //     this.friendRequests.splice(indexToRemove, 1);
  //     this.friendUsers.splice(indexToRemove, 1);
  //   }
  // }

  private removeRequestFromList(requestId: number): void {
  if (this.activeTab === 'received') {
    const indexToRemove = this.friendRequests.findIndex(r => r.id === requestId);
    if (indexToRemove !== -1) {
      this.friendRequests.splice(indexToRemove, 1);
      this.friendUsers.splice(indexToRemove, 1);
    }
  } else if (this.activeTab === 'sent') {
    const indexToRemove = this.sentFriendRequest.findIndex(r => r.id === requestId);
    if (indexToRemove !== -1) {
      this.sentFriendRequest.splice(indexToRemove, 1);
      this.sentFriendUsers.splice(indexToRemove, 1);
    }
  }
}

  onDragStart(event: MouseEvent | TouchEvent) {
    this.dragStartX = (event instanceof MouseEvent) ? event.clientX : event.touches[0].clientX;
    this.dragDelta = 0;
  }
  onDrag(event: MouseEvent | TouchEvent) {
    if (this.dragStartX === null) return;
    let clientX = (event instanceof MouseEvent) ? event.clientX : event.touches[0].clientX;
    this.dragDelta = clientX - this.dragStartX;
  }

    onDragEnd() {
    if (this.dragStartX === null) return;
    if (this.dragDelta > 60) {
      this.activeTab = 'received';
    }
    if (this.dragDelta < -60) {
      this.activeTab = 'sent';
    }
    this.dragStartX = null;
    this.dragDelta = 0;
  }
  
}

