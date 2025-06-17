import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-avatar-upload',
  imports: [],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.css'
})
export class AvatarUploadComponent {
  selectedFile!: File;
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient, private userService: UserService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  upload(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post(this.apiUrl+'/api/users/upload-avatar', formData, {
      headers: headers,
      responseType: 'text'
    }).subscribe({
      next: response => {
        alert('Upload thành công!');

        const currentUser = this.userService.getUser();
        if (!currentUser) return;

        // Gọi lại API để lấy thông tin user mới nhất (bao gồm avatar)
        this.userService.getUserList(currentUser.userId).subscribe({
          next: updatedUser => {
            this.userService.setUser(updatedUser); // ✅ cập nhật user mới
          },
          error: err => {
            console.error('Lỗi khi lấy user sau upload:', err);
          }
        });
      },
      error: err => {
        alert('Upload thất bại!');
        console.error(err);
      }
    });
  }
}
