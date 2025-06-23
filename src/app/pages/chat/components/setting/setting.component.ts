import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvatarUploadComponent } from '../avatar-upload/avatar-upload.component';
import { UserService } from '../../../../services/user.service';
import { UpdateUser } from '../../../../models/dto/UpdateUser';
import { UpdatePassword } from '../../../../models/dto/UpdatePassword'; 

@Component({
  selector: 'app-setting',
  imports: [CommonModule, FormsModule, AvatarUploadComponent],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent implements OnInit {

  constructor(private userService: UserService) {}

  showUploadAvatar = false;
  user!: UpdateUser;
  passwordForm: UpdatePassword = {
    userId: '',
    password: '',
    newPassword: '',
    confirmPassword: ''
  };

  userAvatar = 'assets/images/defautAvatar.jpg';

  ngOnInit() {
    this.loadUserData();
  }

loadUserData() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.user = JSON.parse(userData);
      if (this.user.avatar) {
        this.userAvatar = this.user.avatar;
      }
    }
  }

changeAvatar() {
    this.showUploadAvatar = true;
  }
  
closeUploadAvatar() {
    this.showUploadAvatar = false;
  }

saveProfile() {
  const currentUser = this.userService.getUser();
  if (!currentUser) {
    alert('Không tìm thấy thông tin người dùng!');
    return;
  }

  this.userService.updateUser(currentUser.userId, this.user).subscribe({
    next: (response) => {
      console.log('Profile updated:', response);
      const updatedUser = { ...currentUser, ...this.user };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      this.userService.setUser(updatedUser);
      alert('Thông tin đã được cập nhật thành công!');
    },
    error: (err) => {
      console.error('Lỗi khi cập nhật thông tin:', err);
      alert('Đã xảy ra lỗi khi cập nhật thông tin!');
    }
  });
}


savePassword() {
    if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
      alert('Mật khẩu mới không khớp!');
      return;
    }
    
    if (this.passwordForm.newPassword.length < 5) {
      alert('Mật khẩu phải có ít nhất 5 ký tự!');
      return;
    }

    if (!this.passwordForm.password) {
      alert('Vui lòng nhập mật khẩu hiện tại!');
      return;
    }

    const currentUser = this.userService.getUser();
    if (!currentUser) {
      alert('Không tìm thấy thông tin người dùng!');
      return;
    }

    this.passwordForm.userId = currentUser.userId;

    this.userService.updatePassword(this.passwordForm).subscribe({
    next: (response) => {
      console.log('Profile updated:', response);
      alert('Thông tin đã được cập nhật thành công!');
      this.passwordForm = {
          userId: '',
          password: '',
          newPassword: '',
          confirmPassword: ''
        };
    },
    error: (err) => {
        //console.log(err); 
        console.log(err.error);
        console.log('typeof err.error = ', typeof err.error);
        
        try {
          const parsedError = JSON.parse(err.error);

          if(parsedError.code == '1005') {
            alert('Mật khẩu không đúng');
          }
          //alert(parsedError.message);
        } catch (e) {
          console.error('Không parse được err.error:', e);
          alert('Đã xảy ra lỗi!');
        }
    }
  });
    
    
  }
}
