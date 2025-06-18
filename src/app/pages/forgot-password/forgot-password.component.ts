import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
    forgotForm: FormGroup;
    user : User| null = null;

    constructor(private fg: FormBuilder, private router: Router , private authService : AuthService, private userService : UserService) {
    this.forgotForm = this.fg.group({
      phone: ['', [Validators.required]],
    });
  }

 onSubmit() {
  if (this.forgotForm.valid) {
    const { phone } = this.forgotForm.value;

    this.userService.getUserApi(phone).subscribe({
      next: (res: User) => {
        this.user = res;

        this.authService.registerForgot(this.user.email).subscribe({
          next: (response) => {
            console.log('✅ Đã gửi email thành công:', response);
            alert('Gửi yêu cầu đặt lại mật khẩu thành công!');
          },
          error: (error) => {
            console.error('❌ Lỗi khi gửi email:', error);
            alert('Đã xảy ra lỗi khi gửi email.');
          }
        });
      },
      error: (err) => {
        console.error('❌ Không tìm thấy người dùng:', err);
        alert('Không tìm thấy tài khoản với số điện thoại này.');
      }
    });
  } else {
      this.forgotForm.markAllAsTouched();
      alert("Vui lòng điền đầy đủ thông tin")
    }
}

}
