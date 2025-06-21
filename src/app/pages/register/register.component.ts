import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { LoadingButtonComponent } from '../../component/loading-page/loading-page.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, LoadingButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService){
    this.registerForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      dateofbirth: ['', Validators.required],
      phone: ['', Validators.required],

    })
  }

  onClick(){
    if(this.registerForm.valid){
      const {fullname, email, password, dateofbirth, phone} = this.registerForm.value;

      this.loading = true;

      this.authService.register(fullname, email, password, dateofbirth, phone).subscribe({
        next: ()=> {
          console.log('dang ky thanh cong');
          alert("Đăng ký thành công")
          this.loading = false;
        },
        error: (err)=> {
          console.log('dang ky that bai', err);
          alert("Đăng ký thất bại")
          this.loading = false;
        },
      })
    } else {
      this.registerForm.markAllAsTouched();
      alert("Vui lòng điền đầy đủ thông tin")
    }
  }
}
