import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  companies = ['Trishala', 'Shanti', 'F-31'];
  loggedIn: boolean | undefined;
  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private formBuilder: FormBuilder) {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/admin/home']);
    }
  }

  ngOnInit(): void {
    this.initForm()
  }
  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
      company:['',Validators.required]
    })
  }
  get f() { return this.loginForm.controls; }

  LoginProcess() {
    const formdata = new FormData
    formdata.append('email', this.loginForm.get('email')?.value)
    formdata.append('password', this.loginForm.get('password')?.value)
    formdata.append('company_name', this.loginForm.get('company')?.value)
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    }
    this.loading = true;
    this.authService.login(formdata)
      .subscribe((result: any) => {
        if (result.status == 'success') {
          this.router.navigate(['/admin/home'])
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          })
          Toast.fire({
            icon: 'success',
            iconColor: '#d90000',
            title: result.message
          })
        } if(result.status == 'failed') {
          Swal.fire({ icon: 'error', title: result.message, confirmButtonColor: '#d90000' }).then(() => {
            this.router.navigate(['/register'])
          });
        }
      })


  }
  signup() {
    this.router.navigate(['/signup'])
  }
}

