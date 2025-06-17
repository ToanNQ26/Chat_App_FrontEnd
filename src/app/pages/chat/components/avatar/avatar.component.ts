import { Component, Input } from '@angular/core';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent {
  avatarUrl: string = '';
  defaultAvatar: string = 'assets/images/defautAvatar.jpg';
  @Input() user: User | null = null;

  ngOnInit(): void {

    console.log(this.user, "oauis")
    if (this.user && this.user.avatar) {
      this.avatarUrl = `${environment.apiUrl}/images/${this.user.avatar}`;
    } else {
      this.avatarUrl = this.defaultAvatar;
    }
  }
}
