import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';
import { FriendShip } from '../../../../models/friend-ship';
import { FriendService } from '../../../../services/friend.service';
import { FriendInfoModalComponent } from '../../components/friend-info-modal/friend-info-modal.component';
import { Message } from '@stomp/stompjs';
import { SocketService } from '../../../../services/socket.service';
import { ConversationService } from '../../../../services/conversation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AvatarComponent } from '../../components/avatar/avatar.component';

@Component({
  selector: 'app-friend-list',
  imports: [CommonModule, FriendInfoModalComponent, AvatarComponent],
  templateUrl: './friend-list.component.html',
  styleUrl: './friend-list.component.css'
})
export class FriendListComponent implements OnInit {
  friends: FriendShip[] = [];
  user!: User;
  friendUsers: User[] = [];
  selectedFriend: User | null = null;
  selectFriendShip: FriendShip | null = null;
  viewedFriend: User | null = null;
  

  constructor(private friendService: FriendService, 
              private userService: UserService, 
              private conversationService: ConversationService,
              private router: Router,
              private route: ActivatedRoute,) {}

  ngOnInit() {
    this.user = this.userService.getUser()!;
    this.loadFriendList();
  }

  loadFriendList(): void{
    this.friendService.getFriendListAPI(this.user.userId).subscribe(data=>{
      console.log(data, "lalsp")
      this.friendUsers = data.result;
      for(const friend of data.result){
        this.userService.setFriendUser(friend)
      }
    })

    // this.friends = this.friendService.getFriend();
    // this.friendUsers = this.userService.getFriendUser();
    console.log(this.friendUsers, "hdhdh")
  }

  toggleMenu(friend: User) {
    this.selectedFriend = this.selectedFriend === friend ? null : friend;
  }

  viewInfo(friend: User) {
    console.log("Xem thông tin của", friend.fullName);
    // ví dụ: điều hướng đến trang profile
    this.viewedFriend = friend;
  }

  closeModal() {
    this.viewedFriend = null;
  }

  removeFriend(friend: User) {
    console.log("Xóa kết bạn với", friend.fullName);
    const indexFriendShip = this.friendUsers.findIndex(r=> r.userId === friend.userId);
    const curretFriend = this.friendUsers[indexFriendShip];
    // gọi API xóa
    this.friendService.deleteFriendShip(this.user.userId, curretFriend.userId).subscribe(()=>{
      this.friendUsers = this.friendUsers.filter(r=> r!== friend)
    })
  }

  routConversation(friend: User){
    this.conversationService.getUserConversation([friend.userId, this.user.userId]).subscribe({
      next: data=>{
        const conversationWithFriend = data.result;
        this.router.navigate(['/chat', conversationWithFriend.conversationId]);
      },
      error: ()=> {
        alert("chưa tồn tại đoạn hoại thoại với người này. Vui lòng tạo đoạn hội thoại trước")
      }
    })
  }
  
}
