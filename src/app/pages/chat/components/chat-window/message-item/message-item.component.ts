import { Component, Input } from '@angular/core';


import { Message } from '../../../../../models/message';
import { User } from '../../../../../models/user';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../../services/user.service';
import { AvatarComponent } from '../../avatar/avatar.component';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
  imports: [CommonModule, AvatarComponent]
})
export class MessageItemComponent {
  @Input() message!: Message;
  @Input() currentUser!: User;
  sender!: User;

  constructor(private userService: UserService){}

   ngOnInit(): void {
    this.getSender();
  }

  isMyMessage(): boolean {
    return this.message.senderId.userId === this.currentUser.userId;
  }

  getSender(){
    this.sender = this.message.senderId;
    //console.log(this.sender, "jhsau")
  }

  formatLocalTime(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

}
  