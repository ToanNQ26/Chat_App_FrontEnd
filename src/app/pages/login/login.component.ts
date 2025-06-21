import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { switchMap, tap } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { ConversationService } from '../../services/conversation.service';
import { FriendService } from '../../services/friend.service';
import { LoadingButtonComponent } from '../../component/loading-page/loading-page.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, LoadingButtonComponent]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
            private authService: AuthService,
            private userService: UserService,
            private router: Router,
            private conversationService: ConversationService,
            private friendService: FriendService ) {
    this.loginForm = this.fb.group({
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { phone, password } = this.loginForm.value;
      this.authService.logout();
      this.conversationService.clearConversations();
      this.friendService.clearFriend();
      this.userService.clearFriendUser();

      this.loading = true;

      this.authService.login(phone, password).subscribe({
        next: res => {
        this.authService.saveToken(res.result.token);
        console.log(res.result);
        
        this.loading = false;
        this.userService.getUserApi(phone).pipe(
          tap(user => this.userService.setUser(user)),
            switchMap(user =>
              this.conversationService.getConversationApi(user.userId).pipe(
                tap(res => {
                  if (res.result.length) {
                    const firstConvoId = res.result[0].conversationId;
                    this.router.navigate(['/chat', firstConvoId]); // ✅ Điều hướng thẳng đến convo đầu tiên
                  } else {
                    this.router.navigate(['/chat']); // Nếu chưa có convo nào
                  }
                })
              )
            )
          ).subscribe({
            error: err => {
              console.log('Lỗi khi lấy user hoặc conversations: ', err);
            }
          });
      },
      error: ()=>{
        alert('Vui lòng nhập lại số điện thoại hoặc mật khẩu')
        this.loading = false;
      }
      });
      
    } else {
      this.loginForm.markAllAsTouched();
      alert("Vui lòng điền đầy đủ thông tin")
    }
  }
}
